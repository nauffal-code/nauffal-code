"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Cell,
  GameMode,
  GameStatus,
  Player,
  Score,
  Winner,
  checkGameResult,
  getBotMove,
} from "@/lib/tictactoe";

const EMPTY_BOARD: Cell[] = Array(9).fill(null);
const INITIAL_SCORE: Score = { X: 0, O: 0, draw: 0 };
const BOT_SYMBOL: Player = "O";

export function useTicTacToe() {
  const [board, setBoard] = useState<Cell[]>([...EMPTY_BOARD]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [gameStatus, setGameStatus] = useState<GameStatus>("menu");
  const [winner, setWinner] = useState<Winner>(null);
  const [winningCells, setWinningCells] = useState<number[] | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<Player>("X");
  const [gameMode, setGameMode] = useState<GameMode>("bot");
  const [score, setScore] = useState<Score>(INITIAL_SCORE);

  // ─── Resolve result ──────────────────────────────────────────────────────
  const resolveResult = useCallback((newBoard: Cell[]) => {
    const result = checkGameResult(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningCells(result.winningCells);
      setGameStatus("result");
      setScore((prev) => ({
        ...prev,
        [result.winner as string]: prev[result.winner as keyof Score] + 1,
      }));
      return true;
    }
    return false;
  }, []);

  // ─── Handle cell click ───────────────────────────────────────────────────
  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] || winner || gameStatus !== "playing") return;

      // In bot mode, block clicks when it's the bot's turn
      if (gameMode === "bot" && currentPlayer === BOT_SYMBOL) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (!resolveResult(newBoard)) {
        setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
      }
    },
    [board, currentPlayer, winner, gameStatus, gameMode, resolveResult],
  );

  // ─── Bot move via useEffect ──────────────────────────────────────────────
  useEffect(() => {
    if (
      gameMode !== "bot" ||
      gameStatus !== "playing" ||
      currentPlayer !== BOT_SYMBOL ||
      winner
    )
      return;

    const delay = Math.random() * 500 + 300;
    const timer = setTimeout(() => {
      const newBoard = [...board];
      const move = getBotMove(newBoard, BOT_SYMBOL);
      newBoard[move] = BOT_SYMBOL;
      setBoard(newBoard);

      if (!resolveResult(newBoard)) {
        setCurrentPlayer("X");
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [gameMode, gameStatus, currentPlayer, winner, board, resolveResult]);

  // ─── Start game ──────────────────────────────────────────────────────────
  const startGame = useCallback((symbol: Player, mode: GameMode) => {
    setPlayerSymbol(symbol);
    setGameMode(mode);
    setBoard([...EMPTY_BOARD]);
    setCurrentPlayer("X");
    setWinner(null);
    setWinningCells(null);
    setGameStatus("playing");
  }, []);

  // ─── Replay (keep same settings) ────────────────────────────────────────
  const replayGame = useCallback(() => {
    setBoard([...EMPTY_BOARD]);
    setCurrentPlayer("X");
    setWinner(null);
    setWinningCells(null);
    setGameStatus("playing");
  }, []);

  // ─── Back to menu ────────────────────────────────────────────────────────
  const goToMenu = useCallback(() => {
    setBoard([...EMPTY_BOARD]);
    setCurrentPlayer("X");
    setWinner(null);
    setWinningCells(null);
    setGameStatus("menu");
  }, []);

  // ─── Reset score ─────────────────────────────────────────────────────────
  const resetScore = useCallback(() => {
    setScore(INITIAL_SCORE);
  }, []);

  const isBotTurn =
    gameMode === "bot" &&
    currentPlayer === BOT_SYMBOL &&
    gameStatus === "playing";

  return {
    board,
    currentPlayer,
    gameStatus,
    winner,
    winningCells,
    playerSymbol,
    gameMode,
    score,
    isBotTurn,
    handleCellClick,
    startGame,
    replayGame,
    goToMenu,
    resetScore,
  };
}
