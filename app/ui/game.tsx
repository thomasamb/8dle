"use client";
import Search from "./search";
import GameState from "../lib/gameState";
import Clue from "./clue";
import { useState, useEffect, useRef } from "react";
import GameHandler from "../lib/gameHandler";
import { Button, Modal } from "react-bootstrap";
import Image from "next/image";
import RoundTracker from "./roundTracker";
import Share from "./share";
import { PiInfoFill } from "react-icons/pi";
import { IoIosStats } from "react-icons/io";
import InfoModal from "./infoModal";
import StatsModal from "./statsModal";
import { Stats, Result } from "../lib/stats";

export default function Game() {
  const numRounds = 5;
  const [gameHandler, setGameHandler] = useState(new GameHandler());
  const [gameState, setGameState] = useState(gameHandler.gameState);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [statsUpdated, setStatsUpdated] = useState(false);
  const blankStats = {
    winStreak: 0,
    wins: 0,
    losses: 0,
    winPct: 0,
    history: [],
    avgGuesses: 0,
    gamesPlayed: 0,
    totalGuesses: 0,
  };

  const [stats, setStats] = useState<Stats>(() => {
    if (typeof window === "undefined") {
      return blankStats;
    }
    const statsFetch = localStorage.getItem("stats");
    if (statsFetch) {
      try {
        return JSON.parse(statsFetch) as Stats;
      } catch (error) {
        console.error("Failed to parse stats from localStorage", error);
      }
    }
    return blankStats;
  });

  const updateGuessHistory = (prev: Stats) => {
    const oldHistory = prev.history;
    if (gameState.lost) {
      oldHistory.push([
        Result.Wrong,
        Result.Wrong,
        Result.Wrong,
        Result.Wrong,
        Result.Wrong,
      ]);
    } else if (gameState.won) {
      const gameResults = [];
      for (let i = 0; i < numRounds; i++) {
        if (i + 1 == gameState.round) {
          gameResults.push(Result.Right);
        } else if (i + 1 > gameState.round) {
          gameResults.push(Result.NA);
        } else {
          gameResults.push(Result.Wrong);
        }
      }
      oldHistory.push(gameResults);
    }
    return oldHistory;
  };

  const updateAverageGuesses = (prev: Stats): Number => {
    const totalGuesses = prev.totalGuesses + gameState.guesses;
    const gamesPlayed = prev.gamesPlayed + 1;
    return Number((totalGuesses / gamesPlayed).toFixed(2));
  };

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    if ((gameState.won || gameState.lost) && !statsUpdated) {
      setStatsUpdated(true);
      if (gameState.won) {
        setStats((prev) => ({
          ...prev,
          winStreak: prev.winStreak + 1,
          wins: prev.wins + 1,
          gamesPlayed: prev.gamesPlayed + 1,
          winPct: Number(((prev.wins + 1) / prev.losses).toFixed(2)),
          history: updateGuessHistory(prev),
          avgGuesses: updateAverageGuesses(prev),
          totalGuesses: prev.totalGuesses + gameState.guesses,
        }));
      } else if (gameState.lost) {
        setStats((prev) => ({
          ...prev,
          winStreak: 0,
          losses: prev.losses + 1,
          gamesPlayed: prev.gamesPlayed + 1,
          winPct: Number((prev.wins / prev.losses + 1).toFixed(2)),
          history: updateGuessHistory(prev),
          avgGuesses: updateAverageGuesses(prev),
          totalGuesses: prev.totalGuesses + gameState.guesses,
        }));
      }
    }
  }, [gameState.won, gameState.lost]);

  function onDelete() {
    setStats({
      winStreak: 0,
      wins: 0,
      losses: 0,
      winPct: 0,
      history: [],
      avgGuesses: 0,
      gamesPlayed: 0,
      totalGuesses: 0,
    });
  }

  return (
    <div id="game">
      <InfoModal
        showModal={showInfoModal}
        onHide={() => setShowInfoModal(!showInfoModal)}
      />
      <StatsModal
        showModal={showStatsModal}
        onHide={() => setShowStatsModal(!showStatsModal)}
        stats={stats}
        onDelete={onDelete}
      />
      <div id="buttonIcons">
        <PiInfoFill onClick={() => setShowInfoModal(!showInfoModal)} />
        <Button
          onClick={() => {
            console.log(localStorage.getItem("stats"));
          }}
        ></Button>
        <IoIosStats onClick={() => setShowStatsModal(!showStatsModal)} />
      </div>
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
      {(gameState.won || gameState.lost) && <Share gameState={gameState} />}
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
          unoptimized
        />
        <Share gameState={gameState} />
      </Modal.Body>
    </Modal>
  );
}
