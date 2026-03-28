"use client";

import { useState } from "react";
import { GameMode, Player } from "@/lib/tictactoe";

interface GameMenuProps {
  onStart: (symbol: Player, mode: GameMode) => void;
}

export default function GameMenu({ onStart }: GameMenuProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>("bot");

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-[#025464] p-8 rounded-2xl shadow-2xl w-80 max-w-[90vw]">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-[#f8f1f1] text-center mb-2 tracking-tight">
          Tic Tac Toe
        </h1>
        <div className="border-b-2 border-[#e8aa42] mb-6" />

        {/* Mode Toggle */}
        <p className="text-[#f8f1f1]/70 text-xs uppercase tracking-widest text-center mb-2">
          Game Mode
        </p>
        <div className="flex bg-[#013a44] rounded-xl p-1 mb-6 gap-1">
          {(["bot", "2player"] as GameMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`
                flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200
                ${
                  selectedMode === mode
                    ? "bg-[#e8aa42] text-[#025464]"
                    : "text-[#f8f1f1]/60 hover:text-[#f8f1f1]"
                }
              `}
            >
              {mode === "bot" ? "vs Bot" : "2 Players"}
            </button>
          ))}
        </div>

        {/* Symbol select */}
        <p className="text-[#f8f1f1]/70 text-xs uppercase tracking-widest text-center mb-2">
          {selectedMode === "bot" ? "Play as" : "First Player"}
        </p>
        <div className="flex gap-3 justify-center">
          {(["X", "O"] as Player[]).map((symbol) => (
            <button
              key={symbol}
              onClick={() => onStart(symbol, selectedMode)}
              className="
                flex-1 py-3 bg-[#e8aa42] text-[#025464] font-black text-xl
                rounded-xl transition-all duration-200
                hover:bg-[#f8f1f1] hover:scale-105 shadow-md
              "
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
