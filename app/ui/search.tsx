import GameState from "../lib/gameState";

export default function Search({
  gameState,
  setGameState,
}: {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) {
  return (
    <>
      <p>Search</p>
    </>
  );
}
