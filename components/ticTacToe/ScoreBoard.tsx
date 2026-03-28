"use client";

import { Score } from "@/lib/tictactoe";

interface ScoreBoardProps {
  score: Score;
  onReset: () => void;
}

export default function ScoreBoard({ score, onReset }: ScoreBoardProps) {
  const items = [
    { label: "X", value: score.X, color: "text-[#e57c23]" },
    { label: "Draw", value: score.draw, color: "text-[#f8f1f1]" },
    { label: "O", value: score.O, color: "text-[#e8aa42]" },
  ];

  return (
    <div className="flex items-center gap-4 bg-[#025464]/80 backdrop-blur-sm px-5 py-2 rounded-xl shadow-md">
      {items.map(({ label, value, color }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="text-center">
            <div className={`text-xl font-black ${color}`}>{value}</div>
            <div className="text-[#f8f1f1]/50 text-xs uppercase tracking-widest">
              {label}
            </div>
          </div>
          {i < items.length - 1 && <div className="w-px h-8 bg-[#f8f1f1]/20" />}
        </div>
      ))}
      <div className="w-px h-8 bg-[#f8f1f1]/20" />
      <button
        onClick={onReset}
        className="text-[#f8f1f1]/40 hover:text-[#f8f1f1] text-xs transition-colors duration-200"
        aria-label="Reset score"
        title="Reset score"
      >
        ↺
      </button>
    </div>
  );
}
