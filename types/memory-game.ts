export type GameState = "menu" | "mode" | "ready" | "playing" | "gameover";
export type GameMode = "normal" | "advanced";
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Card {
  id: number;
  value: CardValue;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameConfig {
  mode: GameMode;
  timeLimit: number;
  showFlips: boolean;
  showTimer: boolean;
  autoShuffle: boolean;
}
