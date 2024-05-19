import { canvas, ctx } from './main';

class Sprite {
  position: coordinates;
  width: number;
  height: number;
  image: HTMLImageElement;
  scale: number;
  frames: number;
  framesCurrent: number;
  framesElapsed: number;
  framesHold: number;
  offset: coordinates;

  constructor({
    position,
    imageSource,
    scale = 1,
    frames = 1,
    offset = { x: 0, y: 0 },
  }: spriteConstructor) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSource;
    this.scale = scale;
    this.frames = frames;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.frames),
      0,
      this.image.width / this.frames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.frames - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

export class Parallax {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  speedModifier: number;
  speed: number;

  constructor({ imageSource, speed }: parallaxConstructor) {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = imageSource;
    this.speedModifier = 1;
    this.speed = speed * this.speedModifier;
  }

  update() {
    this.draw();

    this.y += this.speed;
    if (this.y == canvas.height) {
      this.y = 0;
    }
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x,
      this.y - canvas.height,
      this.width,
      this.height
    );
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
          playerAmmo: '../assets/Fighter/playerAmmo.png',
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
      case 'back':
        if (this.image !== this.sprites.back.image) {
          this.image = this.sprites.back.image!;
          this.frames = this.sprites.back.frames;
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
  playerAmmo: string;
  image: HTMLImageElement;

  constructor({ position, velocity, playerAmmo }: laserConstructor) {
    this.position = position;
    this.velocity = velocity;
    this.width = 10;
    this.height = 20;
    this.playerAmmo = playerAmmo;
    this.image = new Image();
    this.image.src = this.playerAmmo;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
  }
}
