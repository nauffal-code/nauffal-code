"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import type { Card, GameMode } from "@/types/memory-game";

interface GameBoardProps {
  cards: Card[];
  gameMode: GameMode;
  flips: number;
  timeLeft: number;
  isShuffling: boolean;
  onCardClick: (cardId: number) => void;
  onShuffle: () => void;
  onSurrender: () => void;
}

export default function GameBoard({
  cards,
  gameMode,
  flips,
  timeLeft,
  isShuffling,
  onCardClick,
  onShuffle,
  onSurrender,
}: GameBoardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Level Title */}
      <h1 className="text-white text-3xl font-bold">
        Level:{" "}
        <span className="text-[#e8aa42]">
          {gameMode === "normal" ? "Normal" : "Advanced"}
        </span>
      </h1>

      {/* Grid */}
      <div
        className={`grid grid-cols-4 gap-2 p-6 bg-[#f8f8f8] rounded-xl shadow-lg ${
          isShuffling ? "animate-pulse" : ""
        }`}
        style={{
          width: "min(90%, 400px)",
          height: gameMode === "normal" ? "400px" : "450px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onCardClick(card.id)}
            className="relative w-full aspect-square cursor-pointer"
            style={{
              perspective: "800px",
            }}
          >
            {/* Inner wrapper handles the flip transform */}
            <div
              className="absolute inset-0 transition-transform duration-300"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  card.isFlipped || card.isMatched
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
              }}
            >
              {/* Front — hidden face (question mark / globe icon) */}
              <div
                className="absolute inset-0 bg-white rounded-lg shadow-md flex items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-[#6563ff] text-4xl"
                />
              </div>

              {/* Back — revealed face (image) */}
              <div
                className="absolute inset-0 bg-white rounded-lg shadow-md flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Image
                  src={`/images/projects/memoryGame/img-${card.value}.png`}
                  alt={`Card ${card.value}`}
                  width={44}
                  height={44}
                  className="w-11 h-11 object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced stats bar */}
      {gameMode === "advanced" && (
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-lg shadow-md">
          <span className="text-gray-700 font-medium">
            Time: <span className="text-[#6563ff] font-bold">{timeLeft}s</span>
          </span>
          <span className="text-gray-700 font-medium border-x px-4">
            Flips: <span className="text-[#6563ff] font-bold">{flips}</span>
          </span>
          <button
            onClick={onShuffle}
            className="px-4 py-2 text-[#6563ff] border-2 border-[#6563ff] rounded-lg hover:bg-[#6563ff] hover:text-white transition-colors"
          >
            Refresh
          </button>
        </div>
      )}

      {/* Surrender */}
      <button
        onClick={onSurrender}
        className="px-6 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#6563ff] transition-colors"
      >
        Surrender
      </button>
    </div>
  );
}
