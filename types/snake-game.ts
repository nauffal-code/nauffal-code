export type GameState = "menu" | "mode" | "playing" | "paused" | "gameover";
export type GameMode = "easy" | "normal" | "hard";

export interface Position {
  x: number;
  y: number;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
