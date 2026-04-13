import { useState, useEffect } from "react";
import GameState from "../lib/gameState";
import { Pagination } from "react-bootstrap";
import { Round1, Round2, Round3, Round4 } from "./rounds";

export default function Clue({ gameState }: { gameState: GameState }) {
  const [page, setPage] = useState<1 | 2 | 3 | 4>(1);
  useEffect(() => {
    setPage(gameState.round as 1 | 2 | 3 | 4);
  }, [gameState.round]);
  const pages = [
    { key: "Track Layout", round: 1 },
    { key: "Screenshot", round: 2 },
    { key: "Cup", round: 3 },
    { key: "Track Song", round: 4 },
  ];
  const roundPageMapping = {
    1: <Round1 gameState={gameState} />,
    2: <Round2 gameState={gameState} />,
    3: <Round3 gameState={gameState} />,
    4: <Round4 gameState={gameState} />,
  };

  return (
    <div id="cluesContainer">
      {roundPageMapping[page]}
      <div id="cluesPagination">
        <Pagination>
          {pages.map((p) => (
            <Pagination.Item
              key={p.key}
              active={page === p.round}
              disabled={p.round > gameState.round}
              onClick={() => setPage(p.round as 1 | 2 | 3 | 4)}
            >
              {p.key}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}
