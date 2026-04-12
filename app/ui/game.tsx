"use client";
import Search from "./search";
import GameState from "../lib/gameState";
import Clue from "./clue";
import { useState } from "react";
import GameHandler from "../lib/gameHandler";

export default function Game() {
  const [gameHandler, setGameHandler] = useState(new GameHandler());
  const [gameState, setGameState] = useState(gameHandler.gameState);
  return (
    <>
      <GameHeader gameState={gameState} />
      <Clue gameState={gameState} />
      <RoundTracker gameState={gameState} />
      <Search gameState={gameState} setGameState={setGameState} gameHandler={gameHandler} />
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
      "Round Error"
      break;
  }
  return (
    <div id="gameHeader">
      <h1 id="gameHeaderH1">{headerText}</h1>
      <h2 id="gameHeaderH2">{subHeaderText}</h2>
    </div>
  );
}
