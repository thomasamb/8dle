import GameState from "../lib/gameState";
import { RWebShare } from "react-web-share";
import { Button } from "react-bootstrap";
import { SlShareAlt } from "react-icons/sl";

export default function Share({ gameState }: { gameState: GameState }) {
  const websiteUrl = "https://8dle.io";
  function getRoundResult(round: number) {
    if (gameState.lost) {
      return `❌`;
    } else {
      if (gameState.round == round) {
        return `✅`;
      } else if (round > gameState.round) {
        return "-";
      } else {
        return `❌`;
      }
    }
  }
  const shareText = `
  1. ${getRoundResult(1)}
  2. ${getRoundResult(2)}
  3.${getRoundResult(3)}
  4.${getRoundResult(4)}
  Play on ${websiteUrl}`;
  return (
    <div id="shareContainer">
      <RWebShare
        data={{
          title: "8dle",
          url: shareText,
        }}
        onClick={() => console.log("Share")}
      >
        <Button variant="primary">Share Results</Button>
      </RWebShare>
    </div>
  );
}
