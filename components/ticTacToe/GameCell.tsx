"use client";

import { Cell } from "@/lib/tictactoe";

interface GameCellProps {
  cell: Cell;
  index: number;
  isWinning: boolean;
  isDisabled: boolean;
  onClick: (index: number) => void;
}

export default function GameCell({
  cell,
  index,
  isWinning,
  isDisabled,
  onClick,
}: GameCellProps) {
  const base =
    "w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl md:text-5xl font-black rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8aa42]";

  const colorMap: Record<string, string> = {
    X: "text-[#e57c23]",
    O: "text-[#025464]",
  };

  const bgClass = isWinning
    ? "bg-[#e8aa42] scale-105 shadow-xl"
    : cell
      ? "bg-[#f8f1f1] shadow-md"
      : "bg-[#f8f1f1] shadow-md hover:bg-[#e8aa42]/30 hover:scale-105 cursor-pointer";

  return (
    <button
      onClick={() => onClick(index)}
      disabled={isDisabled}
      className={`${base} ${bgClass} ${cell ? colorMap[cell] : ""}`}
      aria-label={`Cell ${index + 1}, ${cell ?? "empty"}`}
    >
      {cell}
    </button>
  );
}
