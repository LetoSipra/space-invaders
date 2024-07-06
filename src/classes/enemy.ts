import { canvas } from '../main';
import { Ship } from './ship';

export class Enemy extends Ship {
  enemies: Enemy[];
  constructor({
    position,
    velocity,
    sprites,
    imageSrc,
    frames,
    scale,
  }: EnemyShipConstructor) {
    super({ position, velocity, sprites, imageSrc, frames, scale });
    this.enemies = [];
  }
  movementMechanics() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  getRandomInteger() {
    let x = Math.floor(Math.random() * canvas.width);
    while (x < 25 || x > 775) {
      x = Math.floor(Math.random() * canvas.width);
    }
    return x;
  }

  enemySpawn() {
    if (this.cooldownTime > 0) {
      this.cooldownId = setTimeout(this.enemySpawn.bind(this), 100);
      this.cooldownTime -= 0.05;
    } else if (this.cooldownTime <= 0) {
      clearTimeout(this.cooldownId);
      this.cooldownTime = 0.9;
      this.enemySpawn();
      this.enemies.push(
        new Enemy({
          position: {
            x: this.getRandomInteger(),
            y: 50,
          },
          velocity: {
            x: 0,
            y: 2,
          },
          imageSrc: '../assets/Bomber/Move.png',
          frames: 6,
          scale: 1,
          sprites: {},
        })
      );
    }
  }
}
