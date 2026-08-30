import { useState, useEffect } from "react";
import GameState from "../lib/gameState";
import { Pagination } from "react-bootstrap";
import { Round1, Round2, Round3, Round4, Round5 } from "./rounds";
import { RevealedClue } from "../lib/revealedClue";

export default function Clue({ gameState }: { gameState: GameState }) {
  const [page, setPage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [clueCache, setClueCache] = useState<Record<number, RevealedClue>>({});
  const [loadingRounds, setLoadingRounds] = useState<Record<number, boolean>>(
    {},
  );
  const [errorRounds, setErrorRounds] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setPage(gameState.round as 1 | 2 | 3 | 4 | 5);
  }, [gameState.round]);

  useEffect(() => {
    if (clueCache[page] || loadingRounds[page]) return;

    setLoadingRounds((prev) => ({ ...prev, [page]: true }));
    setErrorRounds((prev) => ({ ...prev, [page]: false }));

    fetch(`/api/reveal/${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch clue");
        return res.json();
      })
      .then((data: RevealedClue) => {
        setClueCache((prev) => ({ ...prev, [page]: data }));
      })
      .catch(() => {
        setErrorRounds((prev) => ({ ...prev, [page]: true }));
      })
      .finally(() => {
        setLoadingRounds((prev) => ({ ...prev, [page]: false }));
      });
  }, [page, clueCache, loadingRounds]);

  const pages = [
    { key: "Layout", round: 1 },
    { key: "Console", round: 2 },
    { key: "Cup", round: 3 },
    { key: "Music", round: 4 },
    { key: "Screenshot", round: 5 },
  ];

  const currentClue = clueCache[page];
  const currentLoading = loadingRounds[page] ?? true;
  const currentError = errorRounds[page] ?? false;

  const roundPageMapping = {
    1: (
      <Round1
        clue={currentClue}
        loading={currentLoading}
        error={currentError}
      />
    ),
    2: (
      <Round2
        clue={currentClue}
        loading={currentLoading}
        error={currentError}
      />
    ),
    3: (
      <Round3
        clue={currentClue}
        loading={currentLoading}
        error={currentError}
      />
    ),
    4: (
      <Round4
        clue={currentClue}
        loading={currentLoading}
        error={currentError}
      />
    ),
    5: (
      <Round5
        clue={currentClue}
        loading={currentLoading}
        error={currentError}
      />
    ),
  };

  return (
    <div id="cluesContainer">
      <div id="clueDisplay">{roundPageMapping[page]}</div>
      <div id="cluesPagination">
        <Pagination>
          {pages.map((p) => (
            <Pagination.Item
              key={p.key}
              active={page === p.round}
              disabled={
                p.round > gameState.round && !(gameState.won || gameState.lost)
              }
              onClick={() => setPage(p.round as 1 | 2 | 3 | 4 | 5)}
              className="pageButton"
            >
              {p.key}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}
