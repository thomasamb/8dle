import getTodayDate from "./dateHelper";

export default class GameState {
  round: number;
  guesses: number;
  won: boolean;
  lost: boolean;
  date: string;

  constructor(round = 1, guesses = 0) {
    this.round = round;
    this.guesses = guesses;
    this.won = false;
    this.lost = false;
    this.date = getTodayDate();
  }
}
