import { Enemy } from './classes/enemy';
import { ParallaxBackground } from './classes/parallaxBackground';
import { PlayerShip } from './classes/player';

export const canvas = <HTMLCanvasElement>document.querySelector('canvas');
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.height = 600;
canvas.width = 800;

const player = new PlayerShip({
  position: {
    x: 300,
    y: 400,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: '../assets/Fighter/Idle.png',
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
  },
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
  imageSrc: '../assets/Bomber/Move.png',
  frames: 6,
  scale: 0,
  sprites: {},
});

enemy.enemySpawn();

const background = new ParallaxBackground({
  imageSrc: '../assets/bg.png',
  speed: 1,
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  player.movementMechanics();
  window.requestAnimationFrame(animate);
  playerMovementAttack();
  enemyUpdateClean();
  laserUpdateClean();
  collisionDetection();
}
function laserUpdateClean() {
  player.lasers.forEach((laser) => {
    laser.update();
    if (laser.position.y < 0) {
      player.lasers.splice(player.lasers.indexOf(laser), 1);
    }
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
  enemy.enemies.forEach((enemyShip: Enemy) => {
    if (
      player.position.x + 70 + player.image.width - 140 >=
        enemyShip.position.x + 70 &&
      player.position.x + 70 <=
        enemyShip.position.x + 70 + enemyShip.image.width - 140 &&
      player.position.y + 50 + player.image.height / player.frames - 100 >=
        enemyShip.position.y + 50 &&
      player.position.y + 50 <=
        enemyShip.position.y + 50 + enemyShip.image.height / enemy.frames - 100
    ) {
      enemy.enemies.splice(enemy.enemies.indexOf(enemyShip), 1);
    }
    player.lasers.forEach((laser) => {
      if (
        laser.position.x + laser.width >= enemyShip.position.x + 70 &&
        laser.position.x <=
          enemyShip.position.x + 70 + enemyShip.image.width - 140 &&
        laser.position.y + laser.height >= enemyShip.position.y + 50 &&
        laser.position.y <=
          enemyShip.position.y +
            50 +
            enemyShip.image.height / enemyShip.frames -
            100
      ) {
        enemy.enemies.splice(enemy.enemies.indexOf(enemyShip), 1);
        player.lasers.splice(player.lasers.indexOf(laser), 1);
      }
    });
  });
}

function playerMovementAttack() {
  console.log(player.position);
  if (keys.a.pressed && player.position.x + 70 > 0) {
    player.velocity.x = -5;
    player.spriteState('turnLeft');
  } else if (
    keys.d.pressed &&
    player.position.x + player.velocity.x - 70 + player.image.width <
      canvas.width
  ) {
    player.velocity.x = 5;
    player.spriteState('turnRight');
  } else player.spriteState('idle');

  if (keys.w.pressed && player.position.y - player.velocity.y > 0) {
    player.velocity.y = -5;
    player.spriteState('boost');
  } else if (
    keys.s.pressed &&
    player.position.y +
      player.velocity.y -
      50 +
      player.image.height / player.frames <
      canvas.height
  ) {
    player.velocity.y = 5;
    player.spriteState('back');
  }
  if (keys.space.pressed) {
    player.attack();
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

animate();
