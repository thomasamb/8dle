import GameState from "./gameState";
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

  submitGuess(guess: string): GameState {
    const newGameState = new GameState(
      this.gameState.round,
      this.gameState.guesses + 1,
      this.gameState.answer,
    );
    if (guess === newGameState.answer.trackName) {
      newGameState.won = true;
    } else {
      if (newGameState.guesses >= 5) {
        newGameState.lost = true;
      } else {
        newGameState.round++;
      }
    }
    this.gameState = newGameState;
    return newGameState;
  }
}
