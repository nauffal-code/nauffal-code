"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import type { Card, CardValue, GameMode, GameState } from "@/types/memory-game";
import {
  CARD_IMAGES,
  TOTAL_PAIRS,
  TIME_LIMIT_SECONDS,
  MISMATCH_DELAY_MS,
  SHUFFLE_DELAY_MS,
  COUNTDOWN_STEPS,
  COUNTDOWN_END_DELAY_MS,
} from "@/constants/memory-game";

export interface MemoryGameState {
  gameState: GameState;
  gameMode: GameMode | null;
  cards: Card[];
  flips: number;
  timeLeft: number;
  isShuffling: boolean;
  showCountdown: boolean;
  countdownValue: number;
  matchedCards: number;
}

export interface MemoryGameActions {
  startGame: (mode: GameMode) => void;
  startCountdown: () => void;
  handleCardClick: (cardId: number) => void;
  shuffleCards: () => void;
  endGame: () => void;
  goBackToMenu: () => void;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const buildCards = (): Card[] => {
  const doubled = [...CARD_IMAGES, ...CARD_IMAGES];
  return doubled
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({
      id: index,
      value: value as CardValue,
      isFlipped: false,
      isMatched: false,
    }));
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useMemoryGame(): MemoryGameState & MemoryGameActions {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState(0);
  const [flips, setFlips] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(COUNTDOWN_STEPS[0][0]);
  const [isShuffling, setIsShuffling] = useState(false);

  // Stable refs for timeouts so we can always cancel them
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // FIX: store an *array* of timeout IDs for countdown (was overwriting a single ref)
  const countdownTimerIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    countdownTimerIds.current.forEach(clearTimeout);
    countdownTimerIds.current = [];
  }, []);

  const resetGameState = useCallback(
    (mode: GameMode | null = null) => {
      clearAllTimers();
      setGameMode(mode);
      setCards(mode ? buildCards() : []);
      setMatchedCards(0);
      setFlips(0);
      setTimeLeft(TIME_LIMIT_SECONDS);
      setFlippedCards([]);
      setIsCountingDown(false);
      setIsShuffling(false);
    },
    [clearAllTimers],
  );

  // ---------------------------------------------------------------------------
  // endGame — defined BEFORE useEffect so it is in scope for the dep array
  // FIX: was referenced before declaration inside the useEffect below
  // ---------------------------------------------------------------------------

  const endGame = useCallback(() => {
    clearAllTimers();
    setGameState("menu");
    resetGameState(null);
  }, [clearAllTimers, resetGameState]);

  // ---------------------------------------------------------------------------
  // Timer effect (Advanced mode only)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (gameState !== "playing" || !isCountingDown || timeLeft <= 0) {
      if (timeLeft === 0) endGame();
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState, isCountingDown, timeLeft, endGame]);

  // ---------------------------------------------------------------------------
  // FIX: checkForMatch wired via useEffect watching flippedCards
  // (was commented out and never called)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (flippedCards.length !== 2) return;

    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find((c) => c.id === firstId);
    const secondCard = cards.find((c) => c.id === secondId);

    if (!firstCard || !secondCard) return;

    if (firstCard.value === secondCard.value) {
      // Match — mark both as matched
      setCards((prev) =>
        prev.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isMatched: true, isFlipped: true }
            : card,
        ),
      );

      setMatchedCards((prev) => {
        const next = prev + 1;
        if (next === TOTAL_PAIRS) {
          // All matched
          if (gameMode === "normal") {
            setTimeout(shuffleCards, MISMATCH_DELAY_MS);
          } else {
            endGame();
          }
        }
        return next;
      });

      setFlippedCards([]);
    } else {
      // No match — flip back after delay
      const id = setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card,
          ),
        );
        setFlippedCards([]);
      }, MISMATCH_DELAY_MS);

      return () => clearTimeout(id);
    }
    // NOTE: shuffleCards is stable (useCallback with no changing deps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedCards]);

  // ---------------------------------------------------------------------------
  // startCountdown
  // FIX: was overwriting a single countdownRef with each setTimeout;
  //      now we push all IDs into an array so we can cancel them all.
  // ---------------------------------------------------------------------------

  const startCountdown = useCallback(() => {
    setShowCountdown(true);
    setCountdownValue(COUNTDOWN_STEPS[0][0]);

    // Schedule each step
    COUNTDOWN_STEPS.forEach(([value, offset]) => {
      const id = setTimeout(() => setCountdownValue(value), offset);
      countdownTimerIds.current.push(id);
    });

    // Hide countdown and start game
    const endId = setTimeout(() => {
      setShowCountdown(false);
      setGameState("playing");
      setIsCountingDown(true);
      countdownTimerIds.current = [];
    }, COUNTDOWN_END_DELAY_MS);

    countdownTimerIds.current.push(endId);
  }, []);

  // ---------------------------------------------------------------------------
  // startGame
  // ---------------------------------------------------------------------------

  const startGame = useCallback(
    (mode: GameMode) => {
      resetGameState(mode);
      setGameState("ready");
    },
    [resetGameState],
  );

  // ---------------------------------------------------------------------------
  // shuffleCards
  // ---------------------------------------------------------------------------

  const shuffleCards = useCallback(() => {
    setIsShuffling(true);
    setCards(buildCards());
    setMatchedCards(0);
    setFlips(0);
    setTimeLeft(TIME_LIMIT_SECONDS);
    setFlippedCards([]);
    setIsCountingDown(false);

    const id = setTimeout(() => {
      setIsShuffling(false);
      if (gameMode === "advanced") {
        startCountdown();
      } else {
        setGameState("playing");
        setIsCountingDown(true);
      }
    }, SHUFFLE_DELAY_MS);

    countdownTimerIds.current.push(id);
  }, [gameMode, startCountdown]);

  // ---------------------------------------------------------------------------
  // handleCardClick
  // ---------------------------------------------------------------------------

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (gameState !== "playing") return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return;
      if (flippedCards.length >= 2) return;

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)),
      );
      setFlippedCards((prev) => [...prev, cardId]);
      setFlips((prev) => prev + 1);
    },
    [cards, flippedCards, gameState],
  );

  // ---------------------------------------------------------------------------
  // goBackToMenu
  // ---------------------------------------------------------------------------

  const goBackToMenu = useCallback(() => {
    clearAllTimers();
    setGameState("menu");
    resetGameState(null);
  }, [clearAllTimers, resetGameState]);

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    // state
    gameState,
    gameMode,
    cards,
    flips,
    timeLeft,
    isShuffling,
    showCountdown,
    countdownValue,
    matchedCards,
    // actions
    startGame,
    startCountdown,
    handleCardClick,
    shuffleCards,
    endGame,
    goBackToMenu,
    setGameState,
  };
}
