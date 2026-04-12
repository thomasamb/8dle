import GameState from "../lib/gameState";
import { FaRegCircle } from "react-icons/fa"; // hollow circle
import { FaCircle } from "react-icons/fa"; // opaque circle

export default function RoundTracker({ gameState }: { gameState: GameState }) {
  const opaqueCircle = <FaCircle color="blue" />;
  const hollowCircle = <FaRegCircle />;
  const circle = (idx: number) => {
    if (idx <= gameState.round) {
      return opaqueCircle;
    }
    return hollowCircle;
  };
  return (
    <div id="roundTracker" className="d-flex gap-2">
      <span>{circle(1)}</span>
      <span>{circle(2)}</span>
      <span>{circle(3)}</span>
      <span>{circle(4)}</span>
    </div>
  );
}
