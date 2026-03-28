"use client";

import type { GameState, HighScores } from "@/types/snake-game";

interface GameBoardProps {
  gameState: GameState;
  highScores: HighScores;
}

const GRID_SIZE = 30;

export default function GameBoard({ gameState, highScores }: GameBoardProps) {
  const { snakeBody, foodPosition, obstacles, score, mode } = gameState;

  const currentHigh = mode ? highScores[mode] : 0;

  // Build a lookup for O(1) cell rendering
  const snakeSet = new Set(snakeBody.map((p) => `${p.x},${p.y}`));
  const obstacleSet = new Set(obstacles.map((p) => `${p.x},${p.y}`));
  const isHead =
    snakeBody.length > 0 ? `${snakeBody[0].x},${snakeBody[0].y}` : null;
  const foodKey = `${foodPosition.x},${foodPosition.y}`;

  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
    const x = (i % GRID_SIZE) + 1;
    const y = Math.floor(i / GRID_SIZE) + 1;
    const key = `${x},${y}`;

    let cellClass = "bg-transparent";
    if (key === foodKey) cellClass = "bg-red-500 rounded-sm";
    else if (key === isHead) cellClass = "bg-sky-300 rounded-sm";
    else if (snakeSet.has(key)) cellClass = "bg-sky-400/80 rounded-sm";
    else if (obstacleSet.has(key)) cellClass = "bg-purple-500 rounded-sm";

    return <div key={key} className={`w-full h-full ${cellClass}`} />;
  });

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden bg-neutral-800 shadow-2xl shadow-black/50"
      style={{ width: "70vmin", height: "85vmin" }}
    >
      {/* Scoreboard */}
      <div className="flex justify-between items-center px-5 py-3 text-neutral-300 font-body text-sm shrink-0">
        <span>
          Score: <strong className="text-white">{score}</strong>
        </span>
        <span className="capitalize text-amber-300/80 font-display">
          {mode}
        </span>
        <span>
          Best: <strong className="text-white">{currentHigh}</strong>
        </span>
      </div>

      {/* Grid */}
      <div
        className="grid flex-1"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          backgroundColor: "#111",
        }}
      >
        {cells}
      </div>
    </div>
  );
}
