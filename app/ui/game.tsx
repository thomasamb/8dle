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
      <Clue gameState={gameState} />
      <RoundTracker gameState={gameState} />
      <Search gameState={gameState} setGameState={setGameState} />
    </>
  );
}

function RoundTracker({gameState}: any) {
  return (
    <>
      <p>Round</p>
    </>
  );
}
