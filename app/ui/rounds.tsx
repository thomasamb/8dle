import GameState from "../lib/gameState";
import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export function Round1({ gameState }: { gameState: GameState }): ReactNode {
  return (
    <div id="round1">
      <Image
        src={gameState.answer.trackLayoutPath}
        alt="Track layout"
        height={100}
        width={100}
        quality={100}
        unoptimized
        className="trackLayoutImage"
      />
    </div>
  );
}

export function Round2({ gameState }: { gameState: GameState }): ReactNode {
  return (
    <div id="round2">
      <Image
        src={gameState.answer.consolePath}
        alt={gameState.answer.consoleOrigin}
        height={100}
        width={200}
        className="consoleImage"
      />
    </div>
  );
}

export function Round3({ gameState }: { gameState: GameState }): ReactNode {
  return (
    <div id="round3">
      <Image
        src={gameState.answer.cupImagePath}
        alt={gameState.answer.cup}
        height={100}
        width={100}
        className="cupImage"
      />
    </div>
  );
}

export function Round4({ gameState }: { gameState: GameState }) {
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

    useEffect(() => {
      return () => {
        audio.pause();
        setPlaying(false);
      };
    }, []);

    return [playing, toggle];
  };
  const [playing, toggle] = useAudio();

  return (
    <div id="round4">
      <Button id="songButton" onClick={toggle}>
        {playing ? "Stop" : "Play"} Song
      </Button>
    </div>
  );
}

export function Round5({ gameState }: { gameState: GameState }): ReactNode {
  return (
    <div id="round5">
      <Image
        src={gameState.answer.screenshotPath}
        unoptimized
        alt="Track screenshot"
        quality={100}
        height={100}
        width={100}
        className="trackScreenshotImage"
      />
    </div>
  );
}
