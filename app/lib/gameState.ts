import { Answer } from "./answer";
import getTodayDate from "./dateHelper";

export default class GameState {
  round: number;
  answer: Answer;
  guesses: number;
  won: boolean;
  lost: boolean;
  date: string;
  constructor(round = 1, guesses = 0, answer: Answer) {
    this.round = round;
    this.answer = answer;
    this.guesses = guesses;
    this.won = false;
    this.lost = false;
    this.date = getTodayDate();
  }
}
