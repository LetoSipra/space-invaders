import { canvas, ctx } from './main';
import { parallaxConstructor } from './typings';

type coordinates = {
  x: number;
  y: number;
};

type posvel = {
  position: coordinates;
  velocity: coordinates;
};

interface shipConstructor extends posvel {
  health?: number;
  sprites: any;
  imageSrc: string;
  frames: number;
  offset: coordinates;
}

export class Parallax {
  x: number;
  y: number;
  width: number;
  height: number;
  y2: number;
  image: HTMLImageElement;
  speedModifier: number;
  speed: number;

  constructor({ image, speedModifier }: parallaxConstructor) {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.y2 = this.height;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = 5 * this.speedModifier;
  }

  update() {
    console.log(this.y, this.y2);
    this.speed = 1 * this.speedModifier;
    if (this.y <= -this.height) {
      this.y = this.height + this.y2 - this.speed;
    }
    if (this.y2 <= -this.height) {
      this.y2 = this.height + this.y - this.speed;
    }
    this.y = Math.ceil(this.y + this.speed);
    this.y2 = Math.ceil(this.y2 + this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x, this.y2, this.width, this.height);
  }
}

export class Ship {
  position: coordinates;
  velocity: coordinates;
  width: number;
  height: number;
  health: number;
  lasers: Laser[];
  cooldown: number;
  cooldownId: number;
  offset: coordinates;
  sprites: any;
  image: HTMLImageElement;
  currentFrame: number;
  frames: number;
  frameCount: number;
  frame: number;

  constructor({
    position,
    velocity,
    health = 100,
    sprites,
    imageSrc,
    frames,
    offset = {
      x: 0,
      y: 0,
    },
  }: shipConstructor) {
    this.position = position;
    this.velocity = velocity;
    this.width = 60;
    this.height = 60;
    this.health = health;
    this.lasers = [];
    this.cooldown = 0;
    this.cooldownId = 10;
    this.offset = offset;
    this.sprites = sprites;
    this.image = new Image();
    this.image.src = imageSrc;
    this.currentFrame = 0;
    this.frames = frames;
    this.frameCount = 0;
    this.frame = 5;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  animateFrames() {
    this.frameCount++;
    if (this.frameCount % this.frame === 0) {
      if (this.currentFrame < this.frames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      0,
      this.currentFrame * (this.image.height / this.frames),
      this.image.width,
      this.image.height / this.frames,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.image.width,
      this.image.height / this.frames
    );
  }

  update() {
    this.draw();
    this.animateFrames();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  cooldownTick() {
    if (this.cooldown > 0) {
      this.cooldownId = setTimeout(this.cooldownTick.bind(this), 100);
      this.cooldown -= 0.5;
    }
  }

  attack() {
    if (this.cooldown <= 0) {
      clearTimeout(this.cooldownId);
      this.cooldown = 1;
      this.cooldownTick();
      this.lasers.push(
        new Laser({
          position: {
            x: this.position.x - this.width / 7,
            y: this.position.y - this.height,
          },
          velocity: {
            x: 0,
            y: -10,
          },
        })
      );
    }
  }
  spriteState(sprite: string) {
    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image!;
          this.frames = this.sprites.idle.frames;
          this.currentFrame = 0;
        }
        break;
      case 'turnLeft':
        if (this.image !== this.sprites.turnLeft.image) {
          this.image = this.sprites.turnLeft.image!;
          this.frames = this.sprites.turnLeft.frames;
          this.currentFrame = 0;
        }
        break;
      case 'turnRight':
        if (this.image !== this.sprites.turnRight.image) {
          this.image = this.sprites.turnRight.image!;
          this.frames = this.sprites.turnRight.frames;
          this.currentFrame = 0;
        }
        break;
      case 'boost':
        if (this.image !== this.sprites.boost.image) {
          this.image = this.sprites.boost.image!;
          this.frames = this.sprites.boost.frames;
          this.currentFrame = 0;
        }
        break;
      case 'evasion':
        if (this.image !== this.sprites.evasion.image) {
          this.image = this.sprites.evasion.image!;
          this.frames = this.sprites.evasion.frames;
          this.currentFrame = 0;
        }
        break;
    }
  }
}

class Laser {
  position: coordinates;
  velocity: coordinates;
  width: number;
  height: number;

  constructor({ position, velocity }: posvel) {
    this.position = position;
    this.velocity = velocity;
    this.width = 10;
    this.height = 20;
  }
  draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
  }
}
