import { useState, useEffect } from "react";
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
      case 2:
        return (
          <div id="round2">
            <Image
              src={gameState.answer.screenshotPath}
              alt="Track screenshot"
              height={100}
              width={100}
            />
          </div>
        );
      case 3:
        return (
          <div id="round3">
            <Image
              src={gameState.answer.cupImagePath}
              alt={gameState.answer.cup}
              height={100}
              width={100}
            />
          </div>
        );
      case 4:
        return TrackSong({ gameState });
    }
  }
  return <div id="clue">{roundSwitch(gameState.round)}</div>;
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
