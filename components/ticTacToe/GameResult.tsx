"use client";

import { Winner } from "@/lib/tictactoe";

interface GameResultProps {
  winner: Winner;
  onReplay: () => void;
  onMenu: () => void;
}

export default function GameResult({
  winner,
  onReplay,
  onMenu,
}: GameResultProps) {
  const headline =
    winner === "draw" ? "It's a Draw!" : `Player ${winner} wins! 🎉`;

  const emoji = winner === "draw" ? "🤝" : winner === "X" ? "✖️" : "⭕";

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-[#f8f1f1] p-8 rounded-2xl shadow-2xl text-center max-w-xs w-full">
        <div className="text-5xl mb-3">{emoji}</div>
        <h2 className="text-2xl md:text-3xl font-black text-[#025464] mb-1">
          {headline}
        </h2>
        <p className="text-[#025464]/50 text-sm mb-8">Game over</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onReplay}
            className="
              w-full py-3 bg-[#138636] text-[#f8f1f1] font-bold rounded-xl
              transition-all duration-200 hover:bg-[#0f6a2b] hover:scale-[1.02]
              shadow-md
            "
          >
            Play Again
          </button>
          <button
            onClick={onMenu}
            className="
              w-full py-3 bg-transparent text-[#025464] font-semibold rounded-xl
              border-2 border-[#025464]/20
              transition-all duration-200 hover:border-[#025464] hover:scale-[1.02]
            "
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
