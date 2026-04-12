import { useState, useEffect } from "react";
import GameState from "../lib/gameState";
import Image from "next/image";
import { ReactNode } from "react";

export default function Clue({ gameState }: { gameState: GameState }) {
  const Round1 = (): ReactNode => {
    return (
      <div id="round1">
        <Image
          src={gameState.answer.trackLayoutPath}
          alt="Track layout"
          height={100}
          width={100}
          className="clueImage"
        />
      </div>
    );
  };

  const Round2 = (): ReactNode => {
    return (
      <div id="round2">
        <Image
          src={gameState.answer.screenshotPath}
          alt="Track screenshot"
          height={100}
          width={100}
          className="clueImage"
        />
      </div>
    );
  };

  const Round3 = (): ReactNode => {
    return (
      <div id="round3">
        <Image
          src={gameState.answer.cupImagePath}
          alt={gameState.answer.cup}
          height={100}
          width={100}
          className="clueImage"
        />
      </div>
    );
  };

  const Round4 = (): ReactNode => {
    return TrackSong({ gameState });
  };

  function renderRound(idx: number): ReactNode {
    const roundComponents = [Round1, Round2, Round3, Round4];
    if (idx <= gameState.round) {
      const RoundComponent = roundComponents[idx - 1];
      return <RoundComponent />;
    }
  }

  return (
    <div id="clues">
      {renderRound(1)}
      {renderRound(2)}
      {renderRound(3)}
      {renderRound(4)}
    </div>
  );
}

function TrackSong({ gameState }: { gameState: GameState }) {
  const useAudio = (): [boolean, () => void] => {
    const [audio] = useState(new Audio(gameState.answer.song));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }, []);
    return [playing, toggle];
  };
  const [playing, toggle] = useAudio();

  return (
    <div id="round4">
      <button onClick={toggle}>{playing ? "Stop" : "Play"} Song</button>
    </div>
  );
}
