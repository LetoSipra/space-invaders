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
}

interface parallaxConstructor {
  imageSource: string;
  speed: number;
}

interface spriteConstructor extends posvel {
  imageSource: string;
  scale: number;
  frames: number;
  offset: coordinates;
}
