import { ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";
import { Stats } from "../lib/stats";
import { useState } from "react";
import { Result } from "../lib/stats";

export default function StatsModal({
  showModal,
  onHide,
  stats,
  onDelete,
}: {
  showModal: boolean;
  onHide: () => void;
  stats: Stats;
  onDelete: () => void;
}): ReactNode {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <div id={showDeleteModal ? "darkOverlay" : ""}>
      <DeleteModal
        onHide={() => setShowDeleteModal(false)}
        onDelete={onDelete}
        showModal={showDeleteModal}
      />
      <Modal
        style={showDeleteModal ? { opacity: 0.5 } : {}}
        dialogClassName="statsModalDialog"
        show={showModal}
        onHide={onHide}
        scrollable={true}
        className={showDeleteModal ? "darkOverlay" : ""}
      >
        <Modal.Header closeButton>
          <h1>Stats</h1>
        </Modal.Header>
        <Modal.Body className="statsModalBody">
          <p>Wins: {stats.wins}</p>
          <p>Losses: {stats.losses}</p>
          <p>Win Pct: {String(stats.winPct)}%</p>
          <p>Average Guesses: {String(stats.avgGuesses)}</p>
          <p>Total Games: {stats.gamesPlayed}</p>
          <GameLog stats={stats} />
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
            Reset Stats
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

function GameLog({ stats }: { stats: Stats }): ReactNode {
  const constructLog = (stat: Array<Result>): string => {
    let emojiArray = [];
    for (let i = 0; i < stat.length; i++) {
      switch (stat[i]) {
        case Result.Right:
          emojiArray.push(`✔️`);
          break;
        case Result.Wrong:
          emojiArray.push(`❌`);
          break;
        case Result.NA:
          emojiArray.push(`➖`);
          break;
        default:
          emojiArray.push(`➖`);
          break;
      }
    }
    return `${emojiArray[0]} | ${emojiArray[1]} | ${emojiArray[2]} | ${emojiArray[3]} | ${emojiArray[4]}`;
  };

  const sortedEntries = Array.from(stats.history.entries()).sort(
    ([dateA], [dateB]) => dateB.localeCompare(dateA),
  );

  return (
    <div id="history">
      <p>Game Logs</p>
      <ul>
        {sortedEntries.map(([date, log]) => (
          <li key={date}>
            {date}: {constructLog(log)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeleteModal({
  showModal,
  onHide,
  onDelete,
}: {
  showModal: boolean;
  onHide: () => void;
  onDelete: () => void;
}) {
  return (
    <div id="deleteContainer">
      <Modal
        dialogClassName="deleteModalDialog"
        show={showModal}
        onHide={onHide}
        backdrop={true}
      >
        <Modal.Header closeButton>
          <h1>Delete Stats</h1>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to reset your stats?</p>
          <p>This action cannot be undone.</p>
          <Button
            variant="danger"
            onClick={() => {
              onDelete();
              onHide();
            }}
          >
            Reset Stats
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
