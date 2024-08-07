import { Laser } from './laser';
import { Ship } from './ship';

export class PlayerShip extends Ship {
  constructor({
    position,
    velocity,
    sprites,
    imageSrc,
    frames,
    scale,
    health,
  }: ShipConstructor) {
    super({
      position,
      velocity,
      sprites,
      imageSrc,
      frames,
      scale,
      health,
    });
  }

  movementMechanics() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  cooldown() {
    if (this.cooldownTime > 0) {
      this.cooldownId = setTimeout(this.cooldown.bind(this), 100);
      this.cooldownTime -= 0.45;
    }
  }

  attack() {
    if (this.cooldownTime <= 0) {
      clearTimeout(this.cooldownId);
      this.cooldownTime = 0.9;
      this.cooldown();
      this.lasers.push(
        new Laser({
          position: {
            x: this.position.x + this.width + 31,
            y: this.position.y + this.height,
          },
          velocity: {
            x: 0,
            y: -10,
          },
          imageSrc: '../assets/Fighter/PlayerAmmo_2.png',
        })
      );
    }
  }

  spriteState(sprite: string) {
    if (
      this.image === this.sprites.destroyed.image &&
      this.currentFrame < this.sprites.destroyed.frames - 1
    )
      return;
    if (
      this.image === this.sprites.damage.image &&
      this.currentFrame < this.sprites.damage.frames - 1
    )
      return;

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.frames = this.sprites.idle.frames;
          this.currentFrame = 0;
        }
        break;
      case 'turnLeft':
        if (this.image !== this.sprites.turnLeft.image) {
          this.image = this.sprites.turnLeft.image;
          this.frames = this.sprites.turnLeft.frames;
          this.currentFrame = 0;
        }
        break;
      case 'turnRight':
        if (this.image !== this.sprites.turnRight.image) {
          this.image = this.sprites.turnRight.image;
          this.frames = this.sprites.turnRight.frames;
          this.currentFrame = 0;
        }
        break;
      case 'boost':
        if (this.image !== this.sprites.boost.image) {
          this.image = this.sprites.boost.image;
          this.frames = this.sprites.boost.frames;
          this.currentFrame = 0;
        }
        break;
      case 'back':
        if (this.image !== this.sprites.back.image) {
          this.image = this.sprites.back.image;
          this.frames = this.sprites.back.frames;
          this.currentFrame = 0;
        }
        break;
      case 'damage':
        if (this.image !== this.sprites.damage.image) {
          this.image = this.sprites.damage.image;
          this.frames = this.sprites.damage.frames;
          this.currentFrame = 0;
        }
        break;
      case 'destroyed':
        if (this.image !== this.sprites.destroyed.image) {
          this.image = this.sprites.destroyed.image;
          this.frames = this.sprites.destroyed.frames;
          this.currentFrame = 0;
        }
        break;
    }
  }
}
