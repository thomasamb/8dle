import { Answer } from "./answer";

export default class GameState {
  round: number;
  answer: Answer;
  guesses: number;
  constructor(round = 0, answer: Answer) {
    this.round = round;
    this.answer = answer;
    this.guesses = 0;
  }
}