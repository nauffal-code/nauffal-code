"use client";

import { useTicTacToe } from "@/hooks/useTicTacToe";
import GameMenu from "@/components/ticTacToe/GameMenu";
import GameBoard from "@/components/ticTacToe/GameBoard";
import GameResult from "@/components/ticTacToe/GameResult";
import ScoreBoard from "@/components/ticTacToe/ScoreBoard";
import CloseGame from "@/components/CloseGame";

export default function TicTacToe() {
  const {
    board,
    currentPlayer,
    gameStatus,
    winner,
    winningCells,
    isBotTurn,
    score,
    handleCellClick,
    startGame,
    replayGame,
    goToMenu,
    resetScore,
  } = useTicTacToe();

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: "#e57c23" }}
    >
      <CloseGame />

      {/* Score — visible during play & result */}
      {gameStatus !== "menu" && (
        <div className="flex justify-center pt-5">
          <ScoreBoard score={score} onReset={resetScore} />
        </div>
      )}

      {/* Screens */}
      {gameStatus === "menu" && <GameMenu onStart={startGame} />}

      {gameStatus === "playing" && (
        <div className="flex-1 flex items-center justify-center">
          <GameBoard
            board={board}
            currentPlayer={currentPlayer}
            winningCells={winningCells}
            isBotTurn={isBotTurn}
            onCellClick={handleCellClick}
          />
        </div>
      )}

      {gameStatus === "result" && (
        <GameResult winner={winner} onReplay={replayGame} onMenu={goToMenu} />
      )}
    </div>
  );
}
