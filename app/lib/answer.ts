export type Answer = {
  trackName: string;
  song: string;
  trackLayoutPath: string;
  cup: string;
  screenshotPath: string;
  trackMainImagePath: string;
  cupImagePath: string;
  consoleOrigin: Console;
  consolePath: string;
};

export enum Console {
  WiiU = "Wii U",
  Switch = "Switch",
  N3DS = "3DS",
  DS = "DS",
  GBA = "Gamebody Advancece",
  N64 = "Nintendo 64",
  SNES = "Super Nintendo Entertainment System",
  GameCube = "GameCube",
  Tour = "Tour",
  Wii = "Wii",
}
