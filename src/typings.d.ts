type coordinates = {
  x: number;
  y: number;
};

type posvel = {
  position: coordinates;
  velocity: coordinates;
};

interface parallaxConstructor {
  imageSource: string;
  speed: number;
}

interface shipConstructor extends posvel {
  health?: number;
  sprites: any;
  imageSrc: string;
  frames: number;
  offset: coordinates;
}
interface spriteConstructor {
  position: coordinates;
  imageSrc: string;
  scale: number;
  framesMax: number;
  offset: coordinates;
}
