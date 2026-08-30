import { useState, useEffect } from "react";

export type RevealedClue = {
  round: number;
  clueType: string;
  value: string;
  name: string | null;
};

export function useRevealedClue(round: number) {
  const [clue, setClue] = useState<RevealedClue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(`/api/reveal/${round}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch clue");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setClue(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [round]);

  return { clue, loading, error };
}
