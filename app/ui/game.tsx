import Search from "./search";
import GameState from "../lib/gameState";

export default function Game() {
  return (
    <>
      <p>Game</p>
      <RoundTracker />
    </>
  );
}

function RoundTracker() {
    return <><p>Round</p></>
}