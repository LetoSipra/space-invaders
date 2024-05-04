export type spriteSources = {
  imageSrc: string;
  frames: number;
  image?: HTMLImageElement;
};

export interface Sprites {
  idle: spriteSources;
}
