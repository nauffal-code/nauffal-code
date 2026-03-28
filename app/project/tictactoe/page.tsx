"use client";

import { useState, useCallback, useEffect } from "react";
import CloseGame from "@/components/CloseGame";

// Types
type Player = "X" | "O" | null;
type GameStatus = "menu" | "playing" | "result";
type Winner = "X" | "O" | "draw" | null;

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  // Game State
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gameStatus, setGameStatus] = useState<GameStatus>("menu");
  const [winner, setWinner] = useState<Winner>(null);
  const [playerChoice, setPlayerChoice] = useState<"X" | "O" | null>(null);
  const [isBotActive, setIsBotActive] = useState(true);

  // Check for winner
  const checkWinner = useCallback((currentBoard: Player[]): Winner => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a] as "X" | "O";
      }
    }
    return null;
  }, []);

  // Check for draw
  const checkDraw = useCallback((currentBoard: Player[]): boolean => {
    return currentBoard.every((cell) => cell !== null);
  }, []);

  // Handle cell click
  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] || winner || gameStatus !== "playing") return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      // Check for winner
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        setGameStatus("result");
        return;
      }

      // Check for draw
      if (checkDraw(newBoard)) {
        setWinner("draw");
        setGameStatus("result");
        return;
      }

      // Switch player
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    },
    [board, currentPlayer, winner, gameStatus, checkWinner, checkDraw],
  );

  // Bot move
  const makeBotMove = useCallback(() => {
    if (!isBotActive || winner || gameStatus !== "playing") return;

    // Find empty cells
    const emptyIndices = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null) as number[];

    if (emptyIndices.length === 0) return;

    // Simple AI: random move (can be improved with minimax)
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    const newBoard = [...board];
    newBoard[randomIndex] = "O";
    setBoard(newBoard);

    // Check for winner
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameStatus("result");
      return;
    }

    // Check for draw
    if (checkDraw(newBoard)) {
      setWinner("draw");
      setGameStatus("result");
      return;
    }

    // Switch player
    setCurrentPlayer("X");
  }, [board, isBotActive, winner, gameStatus, checkWinner, checkDraw]);

  // Bot effect
  useEffect(() => {
    if (
      gameStatus === "playing" &&
      isBotActive &&
      currentPlayer === "O" &&
      !winner
    ) {
      const delay = Math.random() * 800 + 400;
      const timer = setTimeout(makeBotMove, delay);
      return () => clearTimeout(timer);
    }
  }, [gameStatus, currentPlayer, winner, isBotActive, makeBotMove]);

  // Start game
  const startGame = useCallback((choice: "X" | "O") => {
    setPlayerChoice(choice);
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setGameStatus("playing");
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setGameStatus("playing");
  }, []);

  // Get cell class
  const getCellClass = (index: number) => {
    const baseClass =
      "w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl md:text-5xl font-bold rounded-lg transition-all duration-300 cursor-pointer hover:scale-105";

    if (board[index] === "X") {
      return `${baseClass} bg-[#f8f1f1] text-[#e57c23]`;
    }
    if (board[index] === "O") {
      return `${baseClass} bg-[#f8f1f1] text-[#e57c23]`;
    }
    return `${baseClass} bg-[#f8f1f1] text-[#e57c23] hover:bg-[#e8aa42]`;
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: "#e57c23" }}
    >
      {/* Close Button */}
      <CloseGame />

      {/* Main Menu */}
      {gameStatus === "menu" && (
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[#025464] p-8 rounded-xl shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-[#f8f1f1] text-center mb-6 border-b-2 border-[#f8f1f1] pb-4">
              Tic Tac Toe
            </h1>
            <p className="text-[#f8f1f1] text-center mb-6 text-lg">
              Select which one you want to be?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => startGame("X")}
                className="px-6 py-3 bg-[#e8aa42] text-[#f8f1f1] font-semibold rounded-lg transition-all duration-300 hover:bg-[#f8f1f1] hover:text-[#e8aa42] hover:scale-105"
              >
                Player X
              </button>
              <button
                onClick={() => startGame("O")}
                className="px-6 py-3 bg-[#e8aa42] text-[#f8f1f1] font-semibold rounded-lg transition-all duration-300 hover:bg-[#f8f1f1] hover:text-[#e8aa42] hover:scale-105"
              >
                Player O
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Board */}
      {gameStatus === "playing" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {/* Player Turn Indicator */}
          <div className="bg-[#f8f1f1] px-6 py-3 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <span
                className={`text-lg font-semibold transition-colors duration-300 ${
                  currentPlayer === "X" ? "text-[#e57c23]" : "text-[#f8f1f1]"
                }`}
              >
                X's turn
              </span>
              <span
                className={`text-lg font-semibold transition-colors duration-300 ${
                  currentPlayer === "O" ? "text-[#e57c23]" : "text-[#f8f1f1]"
                }`}
              >
                O's turn
              </span>
              <div
                className={`w-1/2 h-full bg-[#025464] rounded-lg transition-all duration-300 ${
                  currentPlayer === "O" ? "left-1/2" : "left-0"
                }`}
              />
            </div>
          </div>

          {/* Game Board */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {board.slice(0, 3).map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  disabled={!!cell || !!winner || currentPlayer === "O"}
                  className={getCellClass(index)}
                  aria-label={`Cell ${index + 1}, ${cell ? cell : "empty"}`}
                >
                  {cell}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {board.slice(3, 6).map((cell, index) => (
                <button
                  key={index + 3}
                  onClick={() => handleCellClick(index + 3)}
                  disabled={!!cell || !!winner || currentPlayer === "O"}
                  className={getCellClass(index + 3)}
                  aria-label={`Cell ${index + 4}, ${cell ? cell : "empty"}`}
                >
                  {cell}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {board.slice(6, 9).map((cell, index) => (
                <button
                  key={index + 6}
                  onClick={() => handleCellClick(index + 6)}
                  disabled={!!cell || !!winner || currentPlayer === "O"}
                  className={getCellClass(index + 6)}
                  aria-label={`Cell ${index + 7}, ${cell ? cell : "empty"}`}
                >
                  {cell}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result Screen */}
      {gameStatus === "result" && (
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[#f8f1f1] p-8 rounded-xl shadow-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#e8aa42] mb-6">
              {winner === "draw"
                ? "Match has been drawn!"
                : `Player ${winner} won the game!`}
            </h2>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-[#138636] text-[#f8f1f1] font-semibold rounded-lg transition-all duration-300 hover:bg-transparent hover:text-[#138636] hover:scale-105"
            >
              Replay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
