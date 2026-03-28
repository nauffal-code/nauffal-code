"use client";

import { Player } from "@/lib/tictactoe";

interface TurnIndicatorProps {
  currentPlayer: Player;
  isBotTurn: boolean;
}

export default function TurnIndicator({
  currentPlayer,
  isBotTurn,
}: TurnIndicatorProps) {
  return (
    <div className="relative flex items-center bg-[#025464] rounded-xl p-1 shadow-lg gap-1">
      {/* Sliding pill */}
      <div
        className={`
          absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg
          bg-[#e8aa42] shadow-md
          transition-all duration-300 ease-in-out
          ${currentPlayer === "O" ? "left-[calc(50%+2px)]" : "left-1"}
        `}
      />

      {/* X label */}
      <span
        className={`
          relative z-10 px-6 py-2 text-sm font-bold rounded-lg
          transition-colors duration-300 min-w-[80px] text-center
          ${currentPlayer === "X" ? "text-[#025464]" : "text-[#f8f1f1]/60"}
        `}
      >
        X&apos;s turn
      </span>

      {/* O label */}
      <span
        className={`
          relative z-10 px-6 py-2 text-sm font-bold rounded-lg
          transition-colors duration-300 min-w-[80px] text-center
          ${currentPlayer === "O" ? "text-[#025464]" : "text-[#f8f1f1]/60"}
        `}
      >
        {isBotTurn ? "Bot…" : "O's turn"}
      </span>
    </div>
  );
}
