import { ctx } from './main';

type coordinates = {
  x: number;
  y: number;
};

type posvel = {
  position: coordinates;
  velocity: coordinates;
};

interface shipConstructor extends posvel {
  health?: number;
}

export class Ship {
  position: coordinates;
  velocity: coordinates;
  width: number;
  height: number;
  health: number;
  lasers: any[];
  cooldown: number;
  cooldownId: number;

  constructor({ position, velocity, health = 100 }: shipConstructor) {
    this.position = position;
    this.velocity = velocity;
    this.width = 60;
    this.height = 60;
    this.health = health;
    this.lasers = [];
    this.cooldown = 0;
    this.cooldownId = 10;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
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
            x: this.position.x + this.width / 2,
            y: this.position.y - this.height / 2,
          },
          velocity: {
            x: 0,
            y: -10,
          },
        })
      );
    }
  }
}

class Laser {
  position: coordinates;
  velocity: coordinates;
  width: number;
  height: number;

  constructor({ position, velocity }: posvel) {
    this.position = position;
    this.velocity = velocity;
    this.width = 10;
    this.height = 20;
  }
  draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
  }
}
