import GameState from "../lib/gameState";
import Image from "next/image";

export default function Clue({ gameState }: { gameState: GameState }) {
  function roundSwitch(round: number) {
    switch (round) {
      case 1:
        return (
          <div id="round1">
            <Image
              src={gameState.answer.trackLayoutPath}
              alt="Track layout"
              height={100}
              width={100}
            />
          </div>
        );
    }
  }
  return <div id="clue">{roundSwitch(gameState.round)}</div>;
}
