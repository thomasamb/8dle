import GameState from "./gameState";

export default class GameHandler {
  gameState: GameState;

  constructor(gameState: GameState | null = null) {
    if (gameState === null) {
      this.gameState = new GameState(1, 0);
    } else {
      this.gameState = gameState;
    }
  }

  async submitGuess(guess: string): Promise<GameState> {
    const res = await fetch("/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess }),
    });
    const { correct } = await res.json();

    const newGameState = new GameState(
      this.gameState.round,
      this.gameState.guesses + 1,
    );

    if (correct) {
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
