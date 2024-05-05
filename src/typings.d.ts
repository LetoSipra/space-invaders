export type spriteSources = {
  imageSrc: string;
  frames: number;
  image?: HTMLImageElement;
};

export interface Sprites {
  idle: spriteSources;
  turnLeft: spriteSources;
  turnRight: spriteSources;
}

export interface parallaxConstructor {
  image: HTMLImageElement;
  speedModifier: number;
}