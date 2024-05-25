type coordinates = {
  x: number;
  y: number;
};

type posvel = {
  position: coordinates;
  velocity: coordinates;
};

interface laserConstructor extends posvel {
  playerAmmo: string;
}
interface shipConstructor extends posvel {
  health?: number;
  sprites: any;
  imageSrc: string;
  frames: number;
  offset: coordinates;
  scale: number;
  framesMax: number;
}

interface parallaxConstructor {
  imageSrc: string;
  speed: number;
}

interface spriteConstructor {
  position: coordinates;
  imageSrc: string;
  scale: number;
  framesMax: number;
  offset: coordinates;
}
