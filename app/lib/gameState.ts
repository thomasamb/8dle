import { Answer } from "./answer";

export default class GameState {
  round: number;
  answer: Answer;
  guesses: number;
  won: boolean;
  lost: boolean;
  constructor(round = 0, guesses = 0, answer: Answer) {
    this.round = round;
    this.answer = answer;
    this.guesses = guesses;
    this.won = false;
    this.lost = false;
  }
}
