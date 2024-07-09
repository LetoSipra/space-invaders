import { ctx } from '../main';
import { Laser } from './laser';

export class Ship {
  position: Coordinates;
  velocity: Coordinates;
  width: number;
  height: number;
  sprites: any;
  image: HTMLImageElement;
  frames: number;
  framesElapsed: number;
  currentFrame: number;
  scale: number;
  lasers: Laser[];
  cooldownId: number;
  cooldownTime: number;
  health: number;

  constructor({
    position,
    velocity,
    sprites,
    imageSrc,
    frames,
    scale,
    health,
  }: ShipConstructor) {
    this.position = position;
    this.velocity = velocity;
    this.width = 60;
    this.height = 60;
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
    this.health = health;

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
      this.position.x,
      this.position.y,
      this.image.width * this.scale,
      (this.image.height / this.frames) * this.scale
    );
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(
      this.position.x + 70,
      this.position.y + 50,
      this.image.width - 140,
      this.image.height / this.frames - 100
    );
  }
  update() {
    this.draw();
    this.animateFrames();
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
