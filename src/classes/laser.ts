import { ctx } from '../main';

export class Laser {
  position: Coordinates;
  velocity: Coordinates;
  width: number;
  height: number;
  playerAmmo: string;
  image: HTMLImageElement;

  constructor({ position, velocity, playerAmmo }: LaserConstructor) {
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
