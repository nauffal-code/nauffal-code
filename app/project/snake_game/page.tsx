"use client";

import { useState } from "react";
import type { GameMode, GameScreen } from "@/types/snake-game";
import { useSnakeGame } from "@/hooks/useSnakeGame";
import MainMenu from "@/components/snakeGame/MainMenu";
import ModeMenu from "@/components/snakeGame/ModeMenu";
import GameBoard from "@/components/snakeGame/GameBoard";
import GameManual from "@/components/snakeGame/GameManual";
import GameOverAlert from "@/components/snakeGame/GameOverAlert";
import MobileControls from "@/components/snakeGame/MobileControls";
import PauseNav from "@/components/snakeGame/PauseNav";
import CloseGame from "@/components/CloseGame";

export default function HomePage() {
  const [screen, setScreen] = useState<GameScreen>("main-menu");
  const [showManual, setShowManual] = useState(false);

  const {
    gameState,
    highScores,
    startGame,
    changeDirection,
    togglePause,
    resetGame,
    stopGame,
  } = useSnakeGame();

  const handlePlay = () => setScreen("mode-menu");

  const handleSelectMode = (mode: GameMode) => {
    startGame(mode);
    setShowManual(true);
    setScreen("game");
  };

  const handleExit = () => {
    stopGame();
    resetGame();
    setShowManual(false);
    setScreen("main-menu");
  };

  const handleGameOver = () => {
    handleExit();
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-amber-50 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,theme(colors.sky.200/30),transparent_60%),radial-gradient(ellipse_at_bottom_right,theme(colors.green.200/20),transparent_60%)]" />

      {/* Close Game Button */}
      <CloseGame />

      {/* MAIN MENU */}
      {screen === "main-menu" && <MainMenu onPlay={handlePlay} />}

      {/* MODE MENU */}
      {screen === "mode-menu" && (
        <ModeMenu
          onSelectMode={handleSelectMode}
          onBack={() => setScreen("main-menu")}
        />
      )}

      {/* GAME */}
      {screen === "game" && (
        <>
          <PauseNav
            isPaused={gameState.isPaused}
            onTogglePause={togglePause}
            onExit={handleExit}
          />

          <div className="flex flex-col items-center gap-4">
            <GameBoard gameState={gameState} highScores={highScores} />
            <MobileControls onDirection={changeDirection} />
          </div>

          {showManual && <GameManual />}

          {gameState.isGameOver && (
            <GameOverAlert
              message={gameState.gameOverMessage}
              onExit={handleGameOver}
            />
          )}
        </>
      )}

      {/* Credits */}
      {screen === "main-menu" && (
        <footer className="fixed bottom-5 left-0 right-0 flex justify-between items-center px-5 text-sm font-body text-amber-900/50">
          <span>&copy; nauffal</span>
          <span className="text-xs tracking-widest uppercase opacity-50">
            hebi.io
          </span>
        </footer>
      )}
    </main>
  );
}
