import { Ship } from './classes';

const canvas = <HTMLCanvasElement>document.querySelector('canvas');
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

ctx.fillRect(0, 0, canvas.width, canvas.height);

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

const player = new Ship({
  position: {
    x: 350,
    y: 525,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.lasers.forEach((laser) => {
    laser.update();
  });
  //Movement && Attack
  if (keys.space.pressed) {
    player.attack();
  }
  if (keys.a.pressed && player.position.x - player.velocity.x > 0) {
    player.velocity.x = -10;
  } else if (
    keys.d.pressed &&
    player.position.x + player.velocity.x + player.width < canvas.width
  ) {
    player.velocity.x = 10;
  }
  if (keys.w.pressed && player.position.y - player.velocity.y > 0) {
    player.velocity.y = -10;
  } else if (
    keys.s.pressed &&
    player.position.y + player.velocity.y + player.height < canvas.height
  ) {
    player.velocity.y = 10;
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
player.draw();
