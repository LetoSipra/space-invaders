const canvas = <HTMLCanvasElement>document.querySelector('canvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

ctx.fillRect(0, 0, canvas.width, canvas.height);

type coordinates = {
  x: number;
  y: number;
};

interface posvel {
  position: coordinates;
  velocity: coordinates;
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
};

class Sprite {
  position: coordinates;
  velocity: coordinates;
  width: number;
  height: number;

  constructor({ position, velocity }: posvel) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 50;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const player = new Sprite({
  position: {
    x: 50,
    y: 50,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
player.draw();

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();

  player.velocity.x = 0;
  player.velocity.y = 0;

  if (keys.a.pressed && player.position.x - player.velocity.x > 0) {
    player.velocity.x = -10;
  } else if (
    keys.d.pressed &&
    player.position.x + player.velocity.x + 50 < canvas.width
  ) {
    player.velocity.x = 10;
  }
  if (keys.w.pressed && player.position.y - player.velocity.y > 0) {
    player.velocity.y = -10;
  } else if (
    keys.s.pressed &&
    player.position.y + player.velocity.y + 50 < canvas.height
  ) {
    player.velocity.y = 10;
  }
}

window.addEventListener('keydown', (event) => {
  switch (event.key) {
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
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
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
  }
});

animate();
