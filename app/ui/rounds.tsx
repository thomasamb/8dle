import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { RevealedClue } from "../lib/revealedClue";

type RoundProps = {
  clue: RevealedClue | undefined;
  loading: boolean;
  error: boolean;
};

export function Round1({ clue, loading, error }: RoundProps): ReactNode {
  if (loading) return <div id="round1">Loading...</div>;
  if (error || !clue) return <div id="round1">Failed to load clue.</div>;

  return (
    <div id="round1">
      <Image
        src={`/api/images/${clue.value}`}
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

export function Round2({ clue, loading, error }: RoundProps): ReactNode {
  if (loading) return <div id="round2">Loading...</div>;
  if (error || !clue) return <div id="round2">Failed to load clue.</div>;

  return (
    <div id="round2">
      <img
        src={`/api/images/${clue.value}`}
        alt={clue.name ?? "Console"}
        height={100}
        width={200}
        className="consoleImage"
      />
    </div>
  );
}

export function Round3({ clue, loading, error }: RoundProps): ReactNode {
  if (loading) return <div id="round3">Loading...</div>;
  if (error || !clue) return <div id="round3">Failed to load clue.</div>;

  return (
    <div id="round3">
      <Image
        src={`/api/images/${clue.value}`}
        alt={clue.name ?? "Cup"}
        height={100}
        width={100}
        className="cupImage"
      />
    </div>
  );
}

export function Round4({ clue, loading, error }: RoundProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!clue) return;
    const el = new Audio(`/api/audio/${clue.value}`);
    const onEnded = () => setPlaying(false);
    el.addEventListener("ended", onEnded);
    setAudio(el);

    return () => {
      el.pause();
      el.removeEventListener("ended", onEnded);
    };
  }, [clue?.value]);

  const toggle = () => {
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.error("Playback failed:", err);
        });
    }
  };

  if (loading) return <div id="round4">Loading...</div>;
  if (error || !clue) return <div id="round4">Failed to load clue.</div>;

  return (
    <div id="round4">
      <Button id="songButton" onClick={toggle}>
        {playing ? "Stop" : "Play"} Song
      </Button>
    </div>
  );
}

export function Round5({ clue, loading, error }: RoundProps): ReactNode {
  if (loading) return <div id="round5">Loading...</div>;
  if (error || !clue) return <div id="round5">Failed to load clue.</div>;

  return (
    <div id="round5">
      <Image
        src={`/api/images/${clue.value}`}
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
