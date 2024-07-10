import { ctx } from '../main';

export class Laser {
  position: Coordinates;
  velocity: Coordinates;
  width: number;
  height: number;
  image: HTMLImageElement;

  constructor({ position, velocity, imageSrc }: LaserConstructor) {
    this.position = position;
    this.velocity = velocity;
    this.width = 10;
    this.height = 20;
    this.image = new Image();
    this.image.src = imageSrc;
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
