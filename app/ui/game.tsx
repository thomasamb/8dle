"use client";
import Search from "./search";
import GameState from "../lib/gameState";
import Clue from "./clue";
import { useState, useEffect } from "react";
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
import getTodayDate from "../lib/dateHelper";

export default function Game() {
  const numRounds = 5;
  const today = getTodayDate();
  const [mounted, setMounted] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameHandler, setGameHandler] = useState<GameHandler | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [statsUpdated, setStatsUpdated] = useState(false);

  const blankStats = {
    winStreak: 0,
    wins: 0,
    losses: 0,
    winPct: 0,
    history: new Map(),
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
        const parsed = JSON.parse(statsFetch);
        parsed.history = new Map(
          parsed.history.map(([date, log]: [string, Array<Result>]) => [
            date,
            log,
          ]),
        );
        return parsed as Stats;
      } catch (error) {
        console.error("Failed to parse stats from localStorage", error);
      }
    }
    return blankStats;
  });

  useEffect(() => {
    const initGame = async () => {
      const gameStateFetch = localStorage.getItem("gameState");
      if (gameStateFetch) {
        try {
          const parsed = JSON.parse(gameStateFetch) as GameState;
          if (parsed.date === today) {
            const handler = new GameHandler(parsed.answer);
            handler.gameState = parsed;
            setGameHandler(handler);
            setGameState(parsed);
            setStatsUpdated(parsed.won || parsed.lost);
            setMounted(true);
            return;
          }
        } catch (error) {
          console.error("Failed to get gameState from localStorage", error);
        }
      }
      const res = await fetch("/api/today");
      const data = await res.json();
      const handler = new GameHandler(data.answer);
      setGameHandler(handler);
      setGameState(handler.gameState);
      setMounted(true);
    };
    initGame();
  }, []);

  useEffect(() => {
    const serialized = {
      ...stats,
      history: Array.from(stats.history.entries()),
    };
    localStorage.setItem("stats", JSON.stringify(serialized));
  }, [stats]);

  useEffect(() => {
    if (gameState) {
      localStorage.setItem("gameState", JSON.stringify(gameState));
      if (gameHandler) gameHandler.gameState = gameState;
    }
  }, [gameState]);

  useEffect(() => {
    if (!gameState) return;
    if ((gameState.won || gameState.lost) && !statsUpdated) {
      setStatsUpdated(true);
      if (gameState.won) {
        setStats((prev) => {
          const gameResults = [];
          for (let i = 0; i < numRounds; i++) {
            if (i + 1 === gameState.round) {
              gameResults.push(Result.Right);
            } else if (i + 1 > gameState.round) {
              gameResults.push(Result.NA);
            } else {
              gameResults.push(Result.Wrong);
            }
          }
          const newHistory = new Map(prev.history);
          newHistory.set(today, gameResults);
          const newGamesPlayed = prev.gamesPlayed + 1;
          const newTotalGuesses = prev.totalGuesses + gameState.guesses;
          return {
            ...prev,
            winStreak: prev.winStreak + 1,
            wins: prev.wins + 1,
            gamesPlayed: newGamesPlayed,
            winPct: Number(
              (((prev.wins + 1) / newGamesPlayed) * 100).toFixed(2),
            ),
            history: newHistory,
            avgGuesses: Number((newTotalGuesses / newGamesPlayed).toFixed(2)),
            totalGuesses: newTotalGuesses,
          };
        });
      } else if (gameState.lost) {
        setStats((prev) => {
          const newHistory = new Map(prev.history);
          newHistory.set(today, [
            Result.Wrong,
            Result.Wrong,
            Result.Wrong,
            Result.Wrong,
            Result.Wrong,
          ]);
          const newGamesPlayed = prev.gamesPlayed + 1;
          const newTotalGuesses = prev.totalGuesses + gameState.guesses;
          return {
            ...prev,
            winStreak: 0,
            losses: prev.losses + 1,
            gamesPlayed: newGamesPlayed,
            winPct: Number((prev.wins / newGamesPlayed).toFixed(2)) * 100,
            history: newHistory,
            avgGuesses: Number((newTotalGuesses / newGamesPlayed).toFixed(2)),
            totalGuesses: newTotalGuesses,
          };
        });
      }
    }
  }, [gameState?.won, gameState?.lost]);

  function onDelete() {
    setStats({
      winStreak: 0,
      wins: 0,
      losses: 0,
      winPct: 0,
      history: new Map(),
      avgGuesses: 0,
      gamesPlayed: 0,
      totalGuesses: 0,
    });
  }

  if (!mounted || !gameState || !gameHandler) return null;

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
        {/* <Button
          onClick={() => {
            console.log(localStorage.getItem("stats"));
          }}
        >
          Debug
        </Button> */}
        {/* <Button
          onClick={() => {
            const handler = new GameHandler();
            setGameHandler(handler);
            setGameState(handler.gameState);
          }}
        >
          Wipe Game State
        </Button> */}
        <IoIosStats onClick={() => setShowStatsModal(!showStatsModal)} />
      </div>
      <GameHeader gameState={gameState} />
      <RoundTracker gameState={gameState} />
      <Clue gameState={gameState} />
      {!gameState.won && !gameState.lost && (
        <Search
          gameState={gameState}
          setGameState={
            setGameState as React.Dispatch<React.SetStateAction<GameState>>
          }
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
