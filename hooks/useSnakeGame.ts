"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  GameMode,
  GameState,
  HighScores,
  Position,
} from "@/types/snake-game";
import { getHighScores, saveHighScore } from "@/lib/snake-game-storage";

const GRID_SIZE = 30;
const BASE_INTERVAL = 125;

function randomCell(): number {
  return Math.floor(Math.random() * GRID_SIZE) + 1;
}

function randomPosition(): Position {
  return { x: randomCell(), y: randomCell() };
}

function positionsEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

function generateObstacles(count: number): Position[] {
  return Array.from({ length: count }, () => randomPosition());
}

function getObstacleCount(score: number): number {
  if (score > 30) return 4;
  if (score > 20) return 3;
  if (score > 10) return 2;
  if (score > 5) return 1;
  return 0;
}

const INITIAL_STATE: GameState = {
  snakeBody: [],
  foodPosition: randomPosition(),
  obstacles: [],
  score: 0,
  isGameOver: false,
  gameOverMessage: "",
  isPaused: false,
  mode: null,
};

export function useSnakeGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [highScores, setHighScores] = useState<HighScores>({
    easy: 0,
    normal: 0,
    hard: 0,
  });

  const velocityRef = useRef<Position>({ x: 0, y: 0 });
  const snakeRef = useRef<Position>({ x: 10, y: 10 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const modeRef = useRef<GameMode | null>(null);
  const obstacleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const obstaclesRef = useRef<Position[]>([]);

  // Load high scores once on mount
  useEffect(() => {
    setHighScores(getHighScores());
  }, []);

  const stopGame = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current);
  }, []);

  const tick = useCallback(() => {
    setGameState((prev) => {
      if (prev.isPaused || prev.isGameOver) return prev;

      const vel = velocityRef.current;
      const head = snakeRef.current;

      let newX = head.x + vel.x;
      let newY = head.y + vel.y;

      // Easy mode: wrap walls
      if (modeRef.current === "easy") {
        if (newX < 1) newX = GRID_SIZE;
        else if (newX > GRID_SIZE) newX = 1;
        if (newY < 1) newY = GRID_SIZE;
        else if (newY > GRID_SIZE) newY = 1;
      } else {
        // Normal / Hard: walls kill
        if (newX <= 0 || newY <= 0 || newX > GRID_SIZE || newY > GRID_SIZE) {
          return {
            ...prev,
            isGameOver: true,
            gameOverMessage: "You hit the wall… be more careful!",
          };
        }
      }

      snakeRef.current = { x: newX, y: newY };
      const newHead: Position = { x: newX, y: newY };

      // Build new body
      const newBody: Position[] =
        prev.snakeBody.length > 0
          ? [prev.snakeBody[0], ...prev.snakeBody.slice(1)]
          : [];

      for (let i = newBody.length - 1; i > 0; i--) {
        newBody[i] = newBody[i - 1];
      }
      newBody[0] = newHead;

      // Self-collision
      for (let i = 1; i < newBody.length; i++) {
        if (positionsEqual(newHead, newBody[i])) {
          return {
            ...prev,
            snakeBody: newBody,
            isGameOver: true,
            gameOverMessage: "Don't eat yourself!",
          };
        }
      }

      // Obstacle collision
      const obstacles = obstaclesRef.current;
      for (const obs of obstacles) {
        if (positionsEqual(newHead, obs)) {
          return {
            ...prev,
            snakeBody: newBody,
            obstacles,
            isGameOver: true,
            gameOverMessage: "You hit an obstacle — watch out!",
          };
        }
      }

      // Food eaten
      let newScore = prev.score;
      let newFood = prev.foodPosition;
      let newHighScores = highScores;

      if (positionsEqual(newHead, prev.foodPosition)) {
        newScore = prev.score + 1;
        newFood = randomPosition();
        newBody.push({ ...newBody[newBody.length - 1] });

        if (modeRef.current) {
          const updatedHigh = saveHighScore(modeRef.current, newScore);
          newHighScores = { ...highScores, [modeRef.current]: updatedHigh };
          setHighScores(newHighScores);
        }

        // Refresh obstacles based on new score
        const count = getObstacleCount(newScore);
        obstaclesRef.current = generateObstacles(count);
      }

      return {
        ...prev,
        snakeBody: newBody,
        foodPosition: newFood,
        obstacles: obstaclesRef.current,
        score: newScore,
      };
    });
  }, [highScores]);

  const startGame = useCallback(
    (mode: GameMode) => {
      stopGame();

      modeRef.current = mode;
      snakeRef.current = { x: 10, y: 10 };
      velocityRef.current = { x: 0, y: 0 };
      obstaclesRef.current = [];

      const interval =
        BASE_INTERVAL + (mode === "easy" ? 20 : mode === "hard" ? -55 : 0);

      setGameState({
        ...INITIAL_STATE,
        foodPosition: randomPosition(),
        mode,
      });

      intervalRef.current = setInterval(tick, interval);

      // Hard mode: obstacles move every keypress (handled in changeDirection)
      // Normal/Easy: obstacles refresh on timer
      if (mode !== "hard") {
        obstacleTimerRef.current = setInterval(() => {
          const count = getObstacleCount(
            /* read latest score */ obstaclesRef.current.length,
          );
          obstaclesRef.current = generateObstacles(count);
        }, 3000);
      }
    },
    [stopGame, tick],
  );

  const changeDirection = useCallback((key: string) => {
    const vel = velocityRef.current;

    if (key === "ArrowUp" && vel.y !== 1) {
      velocityRef.current = { x: 0, y: -1 };
    } else if (key === "ArrowDown" && vel.y !== -1) {
      velocityRef.current = { x: 0, y: 1 };
    } else if (key === "ArrowLeft" && vel.x !== 1) {
      velocityRef.current = { x: -1, y: 0 };
    } else if (key === "ArrowRight" && vel.x !== -1) {
      velocityRef.current = { x: 1, y: 0 };
    }

    if (modeRef.current === "hard") {
      obstaclesRef.current = generateObstacles(
        getObstacleCount(0), // will be overridden by score next tick
      );
    }
  }, []);

  const togglePause = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const resetGame = useCallback(() => {
    stopGame();
    snakeRef.current = { x: 10, y: 10 };
    velocityRef.current = { x: 0, y: 0 };
    obstaclesRef.current = [];
    setGameState(INITIAL_STATE);
  }, [stopGame]);

  // Keyboard listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        changeDirection(e.key);
      }
      if (e.key === "Escape") {
        togglePause();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [changeDirection, togglePause]);

  // Cleanup on unmount
  useEffect(() => () => stopGame(), [stopGame]);

  return {
    gameState,
    highScores,
    startGame,
    changeDirection,
    togglePause,
    resetGame,
    stopGame,
  };
}
