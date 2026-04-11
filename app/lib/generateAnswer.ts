import { Answer } from "./answer";
import { answerSet } from "./answerSet";

export default function generateAnswer(): Answer {
  let answerLength = answerSet.length;
  let randomIdx = getRandomInt(answerLength);
  return answerSet[randomIdx];
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
