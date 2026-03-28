"use client";

import { Cell, Player } from "@/lib/tictactoe";
import GameCell from "./GameCell";
import TurnIndicator from "./TurnIndicator";

interface GameBoardProps {
  board: Cell[];
  currentPlayer: Player;
  winningCells: number[] | null;
  isBotTurn: boolean;
  onCellClick: (index: number) => void;
}

export default function GameBoard({
  board,
  currentPlayer,
  winningCells,
  isBotTurn,
  onCellClick,
}: GameBoardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <TurnIndicator currentPlayer={currentPlayer} isBotTurn={isBotTurn} />

      {/* 3×3 grid */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <GameCell
            key={index}
            cell={cell}
            index={index}
            isWinning={winningCells?.includes(index) ?? false}
            isDisabled={!!cell || isBotTurn}
            onClick={onCellClick}
          />
        ))}
      </div>
    </div>
  );
}
