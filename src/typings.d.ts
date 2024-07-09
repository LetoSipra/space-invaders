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
  frames: number;
  scale: number;
  health: number;
}

interface LaserConstructor extends PosVel {
  imageSrc: string;
}
interface ParallaxBackgroundConstructor {
  imageSrc: string;
  speed: number;
}

interface PlayerShipConstructor extends ShipConstructor {}
interface EnemyShipConstructor extends ShipConstructor {}
