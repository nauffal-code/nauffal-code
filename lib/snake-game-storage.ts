import type { GameMode, HighScores } from "@/types/snake-game";

const STORAGE_KEYS: Record<GameMode, string> = {
  easy: "hebi_highscore_easy",
  normal: "hebi_highscore_normal",
  hard: "hebi_highscore_hard",
};

export function getHighScores(): HighScores {
  if (typeof window === "undefined") return { easy: 0, normal: 0, hard: 0 };
  return {
    easy: Number(localStorage.getItem(STORAGE_KEYS.easy) ?? 0),
    normal: Number(localStorage.getItem(STORAGE_KEYS.normal) ?? 0),
    hard: Number(localStorage.getItem(STORAGE_KEYS.hard) ?? 0),
  };
}

export function saveHighScore(mode: GameMode, score: number): number {
  if (typeof window === "undefined") return score;
  const current = Number(localStorage.getItem(STORAGE_KEYS[mode]) ?? 0);
  const updated = Math.max(current, score);
  localStorage.setItem(STORAGE_KEYS[mode], String(updated));
  return updated;
}
