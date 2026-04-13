import GameState from "../lib/gameState";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

export default function RoundTracker({ gameState }: { gameState: GameState }) {
  const filledHeart = <FaHeart />;
  const emptyHeart = <FaRegHeart />;
  const heart = (idx: number) => {
    if (idx < gameState.round) {
      return emptyHeart;
    }
    return filledHeart;
  };
  return (
    <div id="roundTracker" className="d-flex gap-2">
      <span>{heart(4)}</span>
      <span>{heart(3)}</span>
      <span>{heart(2)}</span>
      <span>{heart(1)}</span>
    </div>
  );
}
