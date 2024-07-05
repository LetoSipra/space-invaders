import { ParallaxBackground } from './classes/parallaxBackground';
import { PlayerShip } from './classes/player';

export const canvas = <HTMLCanvasElement>document.querySelector('canvas');
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const player = new PlayerShip({
  position: {
    x: 350,
    y: 525,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: '../assets/Fighter/Idle.png',
  frames: 6,
  offset: {
    x: 100,
    y: 100,
  },
  scale: 1,
  sprites: {
    idle: {
      imageSrc: '../assets/Fighter/idle.png',
      frames: 6,
    },
    turnLeft: {
      imageSrc: '../assets/Fighter/turnLeft.png',
      frames: 1,
    },
    turnRight: {
      imageSrc: '../assets/Fighter/turnRight.png',
      frames: 1,
    },
    boost: {
      imageSrc: '../assets/Fighter/boost.png',
      frames: 5,
    },
    back: {
      imageSrc: '../assets/Fighter/back.png',
      frames: 1,
    },
  },
});

const background = new ParallaxBackground({
  imageSrc: '../assets/bg.png',
  speed: 1,
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  window.requestAnimationFrame(animate);
  playerMovement();

  if (keys.space.pressed) {
    player.attack();
  }

  player.lasers.forEach((laser) => {
    laser.update();
    if (laser.position.y < 0) {
      player.lasers.splice(player.lasers.indexOf(laser), 1);
    }
  });
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

function playerMovement() {
  if (keys.a.pressed && player.position.x - player.velocity.x > 0) {
    player.velocity.x = -5;
    player.spriteState('turnLeft');
  } else if (
    keys.d.pressed &&
    player.position.x + player.velocity.x + player.width < canvas.width
  ) {
    player.velocity.x = 5;
    player.spriteState('turnRight');
  } else player.spriteState('idle');

  if (keys.w.pressed && player.position.y - player.velocity.y > 0) {
    player.velocity.y = -5;
    player.spriteState('boost');
  } else if (
    keys.s.pressed &&
    player.position.y + player.velocity.y + player.height < canvas.height
  ) {
    player.velocity.y = 5;
    player.spriteState('back');
  }
}

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
