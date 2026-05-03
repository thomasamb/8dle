import { Answer } from "./answer";
import { answerSet } from "./answerSet";

export default function generateAnswer(): Answer {
  let answerLength = answerSet.length;
  let randomIdx = getRandomInt(answerLength);
  return answerSet[randomIdx];
}

function getRandomInt(max: number): number {
  return 70;
  /**
   * 1 - Wii U
   * 16 - Wii
   * 17 - GBA
   * 18 - DS
   * 19 - N64
   * 20 - GameCube
   * 21 - SNES
   * 23 - 3DS
   * 48 - Tour
   * 63 - Switch
   */
  // return Math.floor(Math.random() * max);```
}
