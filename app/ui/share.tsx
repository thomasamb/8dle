import GameState from "../lib/gameState";
import { Button } from "react-bootstrap";
import { SlShareAlt } from "react-icons/sl";
import getTodayDate from "../lib/dateHelper";

export default function Share({ gameState }: { gameState: GameState }) {
  const websiteUrl = "https://8dle.app";

  function getRoundResult(round: number) {
    if (gameState.lost) {
      return `❌`;
    } else {
      if (gameState.round == round) {
        return `✔️`;
      } else if (round > gameState.round) {
        return `➖`;
      } else {
        return `❌`;
      }
    }
  }

  const shareText = `8dle ${getTodayDate()}
1. ${getRoundResult(1)}
2. ${getRoundResult(2)}
3. ${getRoundResult(3)}
4. ${getRoundResult(4)}
5. ${getRoundResult(5)}
Guess the Mario Kart 8 Deluxe track at ${websiteUrl}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div id="shareContainer">
      <Button variant="primary" className="shareButton" onClick={handleShare}>
        Share Results <SlShareAlt id="share-icon" />
      </Button>
    </div>
  );
}
