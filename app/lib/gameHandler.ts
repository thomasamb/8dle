import GameState from "./gameState";
import { Answer } from "./answer";
import { answerSet } from "./answerSet";
import generateAnswer from "./generateAnswer";

export default class GameHandler {
  gameState: GameState;

  constructor(gameState: GameState | null = null) {
    if (gameState === null) {
      this.gameState = new GameState(1, 0, generateAnswer());
    } else {
      this.gameState = gameState;
    }
  }

  submitGuess(guess: string) {
    this.gameState.guesses++;
    if (guess === this.gameState.answer.trackName) {
      this.gameState.won = true;
      this.gameWon();
    } else {
      if (this.gameState.guesses >= 4) {
        this.gameState.lost = true;
        this.gameLost();
      }
    }
  }

  gameWon() {}

  gameLost() {}
}
