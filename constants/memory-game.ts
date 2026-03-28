// Card values — one entry per unique card image
export const CARD_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

// How many unique pairs exist
export const TOTAL_PAIRS = CARD_IMAGES.length; // 8

// Time limit for Advanced mode (seconds)
export const TIME_LIMIT_SECONDS = 30;

// How long to show a non-matching pair before flipping back (ms)
export const MISMATCH_DELAY_MS = 1000;

// How long the shuffle/reset animation plays before resuming (ms)
export const SHUFFLE_DELAY_MS = 1000;

// Countdown sequence: [displayValue, offsetMs]
// The countdown goes 3 → 2 → 1 → GO, then the game starts
export const COUNTDOWN_STEPS: [number, number][] = [
  [3, 0],
  [2, 1000],
  [1, 2000],
];

// After the last countdown step, wait this long before hiding and starting (ms)
export const COUNTDOWN_END_DELAY_MS = 3500;
