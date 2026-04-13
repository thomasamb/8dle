"use client";
import Search from "./search";
import GameState from "../lib/gameState";
import Clue from "./clue";
import { useState } from "react";
import GameHandler from "../lib/gameHandler";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import RoundTracker from "./roundTracker";

export default function Game() {
  const [gameHandler, setGameHandler] = useState(new GameHandler());
  const [gameState, setGameState] = useState(gameHandler.gameState);
  return (
    <div id="game">
      <GameHeader gameState={gameState} />
      <RoundTracker gameState={gameState} />
      <Clue gameState={gameState} />
      {!gameState.won && !gameState.lost && (
        <Search
          gameState={gameState}
          setGameState={setGameState}
          gameHandler={gameHandler}
        />
      )}
      <GameEndModal gameState={gameState} />
    </div>
  );
}

function GameHeader({ gameState }: { gameState: GameState }) {
  const neutralText = "Guess the track!";
  const loserText = "You lost...";
  const winnerText = `You guessed ${gameState.answer.trackName} in ${gameState.guesses} ${gameState.guesses === 1 ? "guess" : "guesses"}!`;
  return (
    <div id="gameHeader">
      <h1 id="gameHeaderH1">
        {gameState.won ? winnerText : gameState.lost ? loserText : neutralText}
      </h1>
      {(gameState.won || gameState.lost) && (
        <h2 id="gameHeaderH2">{gameState.answer.trackName}</h2>
      )}
    </div>
  );
}

function GameEndModal({ gameState }: { gameState: GameState }) {
  const [hidden, setHidden] = useState(false);
  const show = (gameState.won || gameState.lost) && !hidden;
  let modalBodyTextWin = `You guessed it in ${gameState.guesses} guess${gameState.guesses === 1 ? "" : "es"}!`;
  let modalHeaderText = "";
  if (gameState.won) {
    modalHeaderText = `You guessed it! The track was ${gameState.answer.trackName}.`;
  } else if (gameState.lost) {
    modalHeaderText = `You lost. The track was ${gameState.answer.trackName}.`;
  }

  return (
    <Modal
      dialogClassName="gameEndModalDialog"
      id="gameEndModal"
      show={show}
      onHide={() => setHidden(true)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalHeaderText}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="gameEndModalBody">
        {gameState.won && <p>{modalBodyTextWin}</p>}
        <Image
          src={gameState.answer.trackMainImagePath}
          alt={gameState.answer.trackName}
          height={100}
          width={100}
          className="modalTrackImage"
        />
      </Modal.Body>
    </Modal>
  );
}
