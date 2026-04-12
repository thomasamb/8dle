"use client";
import Search from "./search";
import GameState from "../lib/gameState";
import Clue from "./clue";
import { useState } from "react";
import GameHandler from "../lib/gameHandler";
import { Modal } from "react-bootstrap";
import Image from "next/image";

export default function Game() {
  const [gameHandler, setGameHandler] = useState(new GameHandler());
  const [gameState, setGameState] = useState(gameHandler.gameState);
  return (
    <>
      <GameHeader gameState={gameState} />
      <Clue gameState={gameState} />
      <RoundTracker gameState={gameState} />
      <Search
        gameState={gameState}
        setGameState={setGameState}
        gameHandler={gameHandler}
      />
      <GameEndModal gameState={gameState} />
    </>
  );
}

function RoundTracker({ gameState }: { gameState: GameState }) {
  return (
    <>
      <p>Round</p>
    </>
  );
}

function GameHeader({ gameState }: { gameState: GameState }) {
  let headerText = "Guess the track!";
  let subHeaderText = "";
  switch (gameState.round) {
    case 1:
      subHeaderText = "Track Layout";
      break;
    case 2:
      subHeaderText = "Screenshot";
      break;
    case 3:
      subHeaderText = "Cup";
      break;
    case 4:
      subHeaderText = "Track Song";
      break;
    default:
      "Round Error";
      break;
  }
  return (
    <div id="gameHeader">
      <h1 id="gameHeaderH1">{headerText}</h1>
      <h2 id="gameHeaderH2">{subHeaderText}</h2>
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
