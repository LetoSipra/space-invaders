import { canvas, ctx } from '../main';

export class ParallaxBackground {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  speedModifier: number;
  speed: number;

  constructor({ imageSrc, speed }: ParallaxBackgroundConstructor) {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = imageSrc;
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
