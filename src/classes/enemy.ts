import { Laser } from './laser';
import { Ship } from './ship';

export class Enemy extends Ship {
  enemies: Enemy[];
  laserCooldownId: number;
  laserCooldownTime: number;
  speed: number;
  spawnSpeed: number;
  isDead: boolean;

  constructor({
    position,
    velocity,
    sprites,
    imageSrc,
    frames,
    scale,
    health,
  }: EnemyShipConstructor) {
    super({ position, velocity, sprites, imageSrc, frames, scale, health });
    this.enemies = [];
    this.laserCooldownId = 0;
    this.laserCooldownTime = 0;
    this.speed = 2;
    this.spawnSpeed = 0.1;
    this.isDead = false;
  }

  movementMechanics() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  enemyAttack() {
    if (this.enemies.length > 0) {
      if (this.laserCooldownTime > 0) {
        this.laserCooldownId = setTimeout(this.enemyAttack.bind(this), 100);
        this.laserCooldownTime -= this.spawnSpeed;
      } else if (this.laserCooldownTime <= 0) {
        clearTimeout(this.laserCooldownId);
        this.laserCooldownTime = 0.9;
        let randomIndex = Math.floor(Math.random() * this.enemies.length);
        let randomEnemyShip = this.enemies[randomIndex];

        randomEnemyShip.lasers.push(
          new Laser({
            position: {
              x: randomEnemyShip.position.x + randomEnemyShip.width + 31,
              y: randomEnemyShip.position.y + randomEnemyShip.height + 80,
            },
            velocity: {
              x: 0,
              y: this.speed + 5,
            },
            imageSrc: '../assets/Bomber/Charge_1.png',
          })
        );
        this.enemyAttack();
      }
    }
  }

  enemySpawn() {
    if (this.cooldownTime > 0) {
      this.cooldownId = setTimeout(this.enemySpawn.bind(this), 100);
      this.cooldownTime -= this.spawnSpeed;
    } else if (this.cooldownTime <= 0) {
      clearTimeout(this.cooldownId);
      this.cooldownTime = 0.9;
      this.enemySpawn();
      this.enemies.push(
        new Enemy({
          position: {
            x: Math.floor(Math.random() * (750 + 1)) - 70,
            y: -200,
          },
          velocity: {
            x: 0,
            y: this.speed,
          },
          imageSrc: '../assets/Bomber/Idle.png',
          frames: 6,
          scale: 1,
          sprites: {
            destroyed: {
              imageSrc: '../assets/Bomber/Destroyed.png',
              frames: 10,
            },
          },
          health: 100,
        })
      );
    }
  }
  spriteState(sprite: string) {
    switch (sprite) {
      case 'destroyed':
        if (this.image !== this.sprites.destroyed.image) {
          this.image = this.sprites.destroyed.image;
          this.frames = this.sprites.destroyed.frames;
          this.currentFrame = 0;
          this.isDead = true;
        }
        break;
    }
  }
}
