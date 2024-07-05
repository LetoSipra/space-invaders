import { ctx } from '../main';
import { Laser } from './laser';

export class Ship {
  position: Coordinates;
  velocity: Coordinates;
  width: number;
  height: number;
  offset: Coordinates;
  sprites: any;
  image: HTMLImageElement;
  frames: number;
  framesElapsed: number;
  currentFrame: number;
  scale: number;
  lasers: Laser[];
  cooldownId: number;
  cooldownTime: number;

  constructor({
    position,
    velocity,
    sprites,
    imageSrc,
    offset = { x: 0, y: 0 },
    frames,
    scale,
  }: ShipConstructor) {
    this.position = position;
    this.velocity = velocity;
    this.width = 60;
    this.height = 60;
    this.offset = offset;
    this.sprites = sprites;
    this.image = new Image();
    this.image.src = imageSrc!;
    this.frames = frames;
    this.framesElapsed = 0;
    this.currentFrame = 0;
    this.scale = scale;
    this.lasers = [];
    this.cooldownId = 0;
    this.cooldownTime = 0;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
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
      this.image.width * this.scale,
      (this.image.height / this.frames) * this.scale
    );
  }
  update() {
    this.draw();
    this.animateFrames();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.frames === 0) {
      if (this.currentFrame < this.frames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
}
