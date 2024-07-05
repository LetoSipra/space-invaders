import { Laser } from './laser';
import { Ship } from './ship';

export class PlayerShip extends Ship {
  constructor({
    position,
    velocity,
    sprites,
    imageSrc,
    offset = { x: 0, y: 0 },
    frames,
    scale,
  }: PlayerShipConstructor) {
    super({
      position,
      velocity,
      sprites,
      imageSrc,
      offset,
      frames,
      scale,
    });
  }

  cooldown() {
    if (this.cooldownId > 0) {
      this.cooldownTime = setTimeout(this.cooldown.bind(this), 100);
      this.cooldownId -= 0.5;
    }
  }

  attack() {
    if (this.cooldownId <= 0) {
      clearTimeout(this.cooldownTime);
      this.cooldownId = 1;
      this.cooldown();
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
    }
  }
}
