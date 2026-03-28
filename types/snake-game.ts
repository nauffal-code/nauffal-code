export type GameMode = "easy" | "normal" | "hard";
export type GameScreen = "main-menu" | "mode-menu" | "game";
export type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snakeBody: Position[];
  foodPosition: Position;
  obstacles: Position[];
  score: number;
  isGameOver: boolean;
  gameOverMessage: string;
  isPaused: boolean;
  mode: GameMode | null;
}

export interface HighScores {
  easy: number;
  normal: number;
  hard: number;
}

export interface ModeConfig {
  label: string;
  description: string;
  intervalOffset: number;
  colorClass: string;
  hoverClass: string;
}

export const MODE_CONFIGS: Record<GameMode, ModeConfig> = {
  easy: {
    label: "Easy",
    description: "Slow speed — walls wrap around",
    intervalOffset: +20,
    colorClass: "bg-green-500 border-green-500 text-white",
    hoverClass: "hover:bg-white hover:text-green-500",
  },
  normal: {
    label: "Normal",
    description: "Normal speed — walls kill",
    intervalOffset: 0,
    colorClass: "bg-blue-500 border-blue-500 text-white",
    hoverClass: "hover:bg-white hover:text-blue-500",
  },
  hard: {
    label: "Hard",
    description: "Fast speed — obstacles move",
    intervalOffset: -55,
    colorClass: "bg-red-500 border-red-500 text-white",
    hoverClass: "hover:bg-white hover:text-red-500",
  },
};
