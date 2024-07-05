type Coordinates = {
  x: number;
  y: number;
};

type PosVel = {
  position: coordinates;
  velocity: coordinates;
};

interface ShipConstructor extends PosVel {
  sprites: any;
  imageSrc: string;
  offset: coordinates;
  frames: number;
  scale: number;
}

interface LaserConstructor extends PosVel {
  playerAmmo: string;
}
interface ParallaxBackgroundConstructor {
  imageSrc: string;
  speed: number;
}

interface PlayerShipConstructor extends ShipConstructor {}
