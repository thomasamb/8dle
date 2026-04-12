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
      <GameHeader />
      <RoundTracker gameState={gameState} />
      <Clue gameState={gameState} />
      <Search
        gameState={gameState}
        setGameState={setGameState}
        gameHandler={gameHandler}
      />
      <GameEndModal gameState={gameState} />
    </div>
  );
}

function GameHeader() {
  return (
    <div id="gameHeader">
      <h1 id="gameHeaderH1">Guess the track!</h1>
    </div>
  );
}

function GameEndModal({ gameState }: { gameState: GameState }) {
  const [hidden, setHidden] = useState(false);
  const show = (gameState.won || gameState.lost) && !hidden;

  let modalHeaderText = "";
  let modalBodyText = "";
  if (gameState.won) {
    modalHeaderText = `You guessed it! The track was ${gameState.answer.trackName}.`;
    modalBodyText = `You guessed it in ${gameState.guesses} guess${gameState.guesses === 1 ? "" : "es"}!`;
  } else if (gameState.lost) {
    modalHeaderText = `You lost. The track was ${gameState.answer.trackName}.`;
  }

  return (
    <Modal show={show} onHide={() => setHidden(true)}>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeaderText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalBodyText}</p>
        <Image
          src={gameState.answer.trackMainImagePath}
          alt={gameState.answer.trackName}
          height={100}
          width={100}
        />
      </Modal.Body>
    </Modal>
  );
}
