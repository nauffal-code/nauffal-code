import type { CARD_IMAGES } from "@/constants/memory-game";

export type CardValue = (typeof CARD_IMAGES)[number]; // 1 | 2 | … | 8

export type GameMode = "normal" | "advanced";

export type GameState = "menu" | "mode" | "ready" | "playing";

export interface Card {
  id: number;
  value: CardValue;
  isFlipped: boolean;
  isMatched: boolean;
}
