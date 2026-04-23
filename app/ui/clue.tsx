import { useState, useEffect } from "react";
import GameState from "../lib/gameState";
import { Pagination } from "react-bootstrap";
import { Round1, Round2, Round3, Round4, Round5 } from "./rounds";

export default function Clue({ gameState }: { gameState: GameState }) {
  const [page, setPage] = useState<1 | 2 | 3 | 4 | 5>(1);
  useEffect(() => {
    setPage(gameState.round as 1 | 2 | 3 | 4 | 5);
  }, [gameState.round]);
  const pages = [
    { key: "Layout", round: 1 },
    { key: "Console", round: 2 },
    { key: "Cup", round: 3 },
    { key: "Screenshot", round: 4 },
    { key: "Music", round: 5 },
  ];
  /*
  Round 1: Layout
  Round 2: Console
  Round 3: Cup
  Round 4: Screenshot
  Round 5: Music
  */
  const roundPageMapping = {
    1: <Round1 gameState={gameState} />,
    2: <Round2 gameState={gameState} />,
    3: <Round3 gameState={gameState} />,
    4: <Round4 gameState={gameState} />,
    5: <Round5 gameState={gameState} />,
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
