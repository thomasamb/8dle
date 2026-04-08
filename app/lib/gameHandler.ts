import GameState from "./gameState";
import { Answer } from "./answer";
import { answerSet } from "./answerSet";

class GameHandler {
  gameState: GameState;

  constructor() {
    this.gameState = new GameState(0, 0, this.getNewAnswer());
  }

  getNewAnswer(): Answer {
    return answerSet[0];
  }

  submitGuess(guess: string) {
    this.gameState.guesses++;
    if (guess === this.gameState.answer.trackName) {
      this.gameState.won = true;
      this.gameWon();
    } else {
      if (this.gameState.guesses >= 5) {
        this.gameState.lost = true;
        this.gameLost();
      }
    }
  }

  gameWon() {}

  gameLost() {}
}
