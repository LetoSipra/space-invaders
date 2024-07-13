import { Ship } from './ship';

export class BossShip extends Ship {
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
}
