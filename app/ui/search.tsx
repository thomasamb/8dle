import GameState from "../lib/gameState";
import { useActionState } from "react";
import GameHandler from "../lib/gameHandler";

export default function Search({
  gameState,
  setGameState,
  gameHandler,
}: {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameHandler: GameHandler;
}) {
  const [state, formAction] = useActionState(
    (previousState: GameState, formData: FormData) => {
      const guess = formData.get("guess") as string;
      const result: GameState = gameHandler.submitGuess(guess);
      setGameState(result);
      console.log(gameState);
      return result;
    },
    gameState,
  );
  return (
    <>
      <form action={formAction}>
        <input type="text" name="guess" />
        <button type="submit">Guess</button>
      </form>
    </>
  );
}
