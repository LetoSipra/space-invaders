import { Enemy } from './classes/enemy';
import { Laser } from './classes/laser';
import { ParallaxBackground } from './classes/parallaxBackground';
import { PlayerShip } from './classes/player';

export const canvas = <HTMLCanvasElement>document.querySelector('canvas');
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.height = 600;
canvas.width = 800;

ctx.font = "20px 'Press Start 2P'";
ctx.fillStyle = 'white';

const player = new PlayerShip({
  position: {
    x: 300,
    y: 400,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: '../assets/Fighter/Bases/Idle.png',
  frames: 6,
  scale: 1,
  sprites: {
    idle: {
      imageSrc: '../assets/Fighter/Idle.png',
      frames: 6,
    },
    turnLeft: {
      imageSrc: '../assets/Fighter/TurnLeft.png',
      frames: 1,
    },
    turnRight: {
      imageSrc: '../assets/Fighter/TurnRight.png',
      frames: 1,
    },
    boost: {
      imageSrc: '../assets/Fighter/Boost.png',
      frames: 5,
    },
    back: {
      imageSrc: '../assets/Fighter/Back.png',
      frames: 1,
    },
    damage: {
      imageSrc: '../assets/Fighter/Damage.png',
      frames: 9,
    },
    destroyed: {
      imageSrc: '../assets/Fighter/Destroyed.png',
      frames: 15,
    },
  },
  health: 100,
});

const enemy = new Enemy({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: '../assets/Bomber/Idle.png',
  frames: 6,
  scale: 0,
  sprites: {
    destroyed: {
      imageSrc: '../assets/Bomber/Destroyed.png',
      frames: 10,
    },
  },
  health: 100,
});

enemy.enemySpawn();
enemy.enemyAttack();

const background = new ParallaxBackground({
  imageSrc: '../assets/bg.png',
  speed: 1,
});

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  window.requestAnimationFrame(main);
  player.movementMechanics();
  player.update();
  collisionDetection();

  if (player.health === 0) {
    playerDead();
  } else playerAlive();
}

function playerDead() {
  if (stageTimer === 0) {
    location.reload();
  }
  player.spriteState('destroyed');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    `Game Over!\nRestarts in ${stageTimer}`,
    canvas.width / 2,
    canvas.height / 2
  );
}
function playerAlive() {
  ctx.textAlign = 'start';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(`Health:${player.health}`, 20, 40);
  ctx.fillText(`Score:${score}`, 20, 70);
  playerMovement();
  player.attack();
  enemyUpdateClean();
  laserUpdateClean();
}

function laserUpdateClean() {
  player.lasers.forEach((laser) => {
    laser.update();
    if (laser.position.y < 0) {
      player.lasers.splice(player.lasers.indexOf(laser), 1);
    }
  });
  enemy.enemies.forEach((enemyShip) => {
    enemyShip.lasers.forEach((laser) => {
      laser.update();
      if (laser.position.y > 700) {
        enemyShip.lasers.splice(enemyShip.lasers.indexOf(laser), 1);
      }
    });
  });
}

function enemyUpdateClean() {
  enemy.enemies.forEach((enemyShip) => {
    enemyShip.update();
    enemyShip.movementMechanics();
    if (enemyShip.position.y > 700) {
      enemy.enemies.splice(enemy.enemies.indexOf(enemyShip), 1);
    }
  });
}

function collisionDetection() {
  // Check collision between enemyShip and playerShip
  enemy.enemies.forEach((enemyShip: Enemy, index) => {
    if (
      player.position.x + 70 + player.image.width - 140 >=
        enemyShip.position.x + 70 &&
      player.position.x + 70 <=
        enemyShip.position.x + 70 + enemyShip.image.width - 140 &&
      player.position.y + 50 + player.image.height / player.frames - 100 >=
        enemyShip.position.y + 50 &&
      player.position.y + 50 <=
        enemyShip.position.y +
          50 +
          enemyShip.image.height / enemy.frames -
          100 &&
      !enemyShip.isDead
    ) {
      enemyShip.spriteState('destroyed');
      setTimeout(function () {
        const index = enemy.enemies.indexOf(enemyShip);
        if (index > -1) {
          enemy.enemies.splice(index, 1);
        }
      }, 500);

      if (player.health > 0) {
        player.health -= 10;
        player.spriteState('damage');
      }
    }
    // Check collision between enemyShip and playerLaser
    player.lasers.forEach((playerLaser) => {
      if (
        playerLaser.position.x + playerLaser.width >=
          enemyShip.position.x + 70 &&
        playerLaser.position.x <=
          enemyShip.position.x + 70 + enemyShip.image.width - 140 &&
        playerLaser.position.y + playerLaser.height >=
          enemyShip.position.y + 50 &&
        playerLaser.position.y <=
          enemyShip.position.y +
            50 +
            enemyShip.image.height / enemyShip.frames -
            100 &&
        !enemyShip.isDead
      ) {
        enemyShip.spriteState('destroyed');
        score += Math.floor(Math.random() * 100) + 1;
        setTimeout(function () {
          const index = enemy.enemies.indexOf(enemyShip);
          if (index > -1) {
            enemy.enemies.splice(index, 1);
          }
        }, 500);
        player.lasers.splice(player.lasers.indexOf(playerLaser), 1);
      }
      // Check collision between enemyLaser and playerLaser
      enemyShip.lasers.forEach((enemyLaser: Laser) => {
        if (
          enemyLaser.position.x + enemyLaser.width >= playerLaser.position.x &&
          enemyLaser.position.x <= playerLaser.position.x + playerLaser.width &&
          enemyLaser.position.y + enemyLaser.height >= playerLaser.position.y &&
          enemyLaser.position.y <= playerLaser.position.y + playerLaser.height
        ) {
          player.lasers.splice(player.lasers.indexOf(playerLaser), 1);
          enemyShip.lasers.splice(enemyShip.lasers.indexOf(enemyLaser), 1);
        }
      });
    });
    // Check collision between enemyLaser and playerShip
    enemyShip.lasers.forEach((enemyLaser) => {
      if (
        enemyLaser.position.x + enemyLaser.width >= player.position.x + 70 &&
        enemyLaser.position.x <=
          player.position.x + 70 + player.image.width - 140 &&
        enemyLaser.position.y + enemyLaser.height >= player.position.y + 50 &&
        enemyLaser.position.y <=
          player.position.y + 50 + player.image.height / player.frames - 100
      ) {
        enemyShip.lasers.splice(enemyShip.lasers.indexOf(enemyLaser), 1);
        if (player.health > 0) {
          player.health -= 10;
          player.spriteState('damage');
        }
      }
    });
    // Check collision between overlapping enemy & create another enemy
    for (let i = index + 1; i < enemy.enemies.length; i++) {
      let enemyShip_2 = enemy.enemies[i];

      if (
        enemyShip.position.x + 70 + enemyShip.image.width - 140 >=
          enemyShip_2.position.x + 70 &&
        enemyShip.position.x + 70 <=
          enemyShip_2.position.x + 70 + enemyShip_2.image.width - 140 &&
        enemyShip.position.y +
          50 +
          enemyShip.image.height / enemyShip.frames -
          100 >=
          enemyShip_2.position.y + 50 &&
        enemyShip.position.y + 50 <=
          enemyShip_2.position.y +
            50 +
            enemyShip_2.image.height / enemy.frames -
            100
      ) {
        enemy.enemies.splice(i, 1);
        enemy.enemies.push(
          new Enemy({
            position: {
              x: Math.floor(Math.random() * (750 + 1)) - 70,
              y: -200,
            },
            velocity: {
              x: 0,
              y: enemy.speed,
            },
            imageSrc: '../assets/Bomber/Idle.png',
            frames: 6,
            scale: 1,
            sprites: {
              destroyed: {
                imageSrc: '../assets/Bomber/Destroyed.png',
                frames: 10,
              },
            },
            health: 100,
          })
        );
        break;
      }
    }
  });
}

function playerMovement() {
  if (keys.a.pressed && player.position.x + 70 > 0) {
    player.velocity.x = -10;
    player.spriteState('turnLeft');
  } else if (
    keys.d.pressed &&
    player.position.x + player.velocity.x - 70 + player.image.width <
      canvas.width
  ) {
    player.velocity.x = 10;
    player.spriteState('turnRight');
  } else player.spriteState('idle');

  if (keys.w.pressed && player.position.y - player.velocity.y > 0) {
    player.velocity.y = -6;
    player.spriteState('boost');
  } else if (
    keys.s.pressed &&
    player.position.y +
      player.velocity.y -
      50 +
      player.image.height / player.frames <
      canvas.height
  ) {
    player.velocity.y = 6;
    player.spriteState('back');
  }
}

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'd':
      keys.d.pressed = true;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'w':
      keys.w.pressed = true;
      break;
    case 's':
      keys.s.pressed = true;
      break;
    case ' ':
      keys.space.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'w':
      keys.w.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case ' ':
      keys.space.pressed = false;
      break;
  }
});

let score = 0;
let stageTimerId: number;
let stageTimer = 10;
function stages() {
  if (stageTimer > 0) {
    stageTimerId = setTimeout(stages, 1000);
    stageTimer -= 1;
  } else if (stageTimer <= 0) {
    clearTimeout(stageTimerId);
    stageTimer = 10;
    enemy.spawnSpeed += 0.1;
    enemy.speed += 2;
    stages();
  }
}

main();
stages();
