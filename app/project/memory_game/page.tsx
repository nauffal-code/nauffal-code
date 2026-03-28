"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faRightFromBracket,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { useMemoryGame } from "@/hooks/useMemoryGame";
import GameBoard from "@/components/memoryGame/GameBoard";
import CloseGame from "@/components/CloseGame";

export default function MemoryGame() {
  const {
    gameState,
    gameMode,
    cards,
    flips,
    timeLeft,
    isShuffling,
    showCountdown,
    countdownValue,
    startGame,
    startCountdown,
    handleCardClick,
    shuffleCards,
    endGame,
    goBackToMenu,
    setGameState,
  } = useMemoryGame();

  return (
    <div className="wrapper">
      <div className="content">
        <div
          className="min-h-screen flex flex-col relative"
          style={{ backgroundColor: "#6563ff" }}
        >
          {/* ── Close Button (always visible) ── */}
          <CloseGame />

          {/* ── Main Menu ── */}
          {gameState === "menu" && (
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  Memory Card
                </h1>
                <button
                  onClick={() => setGameState("mode")}
                  className="px-8 py-3 bg-[#6563ff] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#5653e6] hover:scale-105"
                >
                  Play
                </button>
              </div>
            </div>
          )}

          {/* ── Mode Selection ── */}
          {gameState === "mode" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {/* FIX: back button rendered ONCE here only (was duplicated below) */}
              <button
                onClick={goBackToMenu}
                className="absolute top-5 left-5 text-white text-2xl hover:text-gray-300 transition-colors"
                aria-label="Go back"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </button>

              <h1 className="text-white text-5xl font-bold mb-4">Difficulty</h1>

              <div className="flex gap-6">
                {/* Normal mode */}
                <div className="relative group">
                  <button
                    onClick={() => startGame("normal")}
                    className="px-8 py-4 bg-white text-[#6563ff] font-semibold rounded-lg transition-all duration-300 hover:bg-[#6563ff] hover:text-white"
                  >
                    Normal
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ul className="space-y-1">
                      <li>• Unlimited gameplay</li>
                      <li>• No time limit</li>
                      <li>• Auto shuffle on win</li>
                    </ul>
                  </div>
                </div>

                {/* Advanced mode */}
                <div className="relative group">
                  <button
                    onClick={() => startGame("advanced")}
                    className="px-8 py-4 bg-white text-[#6563ff] font-semibold rounded-lg transition-all duration-300 hover:bg-[#6563ff] hover:text-white"
                  >
                    Advanced
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ul className="space-y-1">
                      <li>• Time limit (30s)</li>
                      <li>• Flip counter</li>
                      <li>• Refresh button</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Ready Screen ── */}
          {gameState === "ready" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <button
                onClick={goBackToMenu}
                className="absolute top-5 left-5 text-white text-2xl hover:text-gray-300 transition-colors"
                aria-label="Go back"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </button>

              <div className="text-center">
                <h1 className="text-white text-5xl font-bold mb-4">
                  Are you ready?
                </h1>
                <button
                  onClick={startCountdown}
                  className="px-8 py-3 text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#6563ff] transition-colors"
                >
                  READY
                </button>
              </div>

              {showCountdown && (
                <div className="text-white text-7xl font-bold animate-fade-in">
                  {countdownValue}
                </div>
              )}
            </div>
          )}

          {/* ── Game Board ── */}
          {gameState === "playing" && gameMode && (
            <>
              {/* Exit button — only in playing state */}
              <button
                onClick={endGame}
                className="absolute top-5 left-5 text-white text-2xl hover:text-gray-300 transition-colors"
                aria-label="Exit game"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>

              <div className="flex-1 flex items-center justify-center">
                <GameBoard
                  cards={cards}
                  gameMode={gameMode}
                  flips={flips}
                  timeLeft={timeLeft}
                  isShuffling={isShuffling}
                  onCardClick={handleCardClick}
                  onShuffle={shuffleCards}
                  onSurrender={endGame}
                />
              </div>
            </>
          )}

          {/* ── Credits (always visible) ── */}
          <div className="fixed bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-between w-[95%] text-white">
            <a
              href="https://nauffal-rizky.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              &copy; nauffal
            </a>
            <div className="flex gap-4">
              <a
                href="https://nauffal-rizky.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-300 transition-colors"
                aria-label="Visit website"
              >
                <FontAwesomeIcon icon={faGlobe} />
              </a>
              <a
                href="https://www.instagram.com/nauffal.code/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-300 transition-colors"
                aria-label="Visit Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.linkedin.com/in/nauffal-rizky-3a3b70243/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-300 transition-colors"
                aria-label="Visit LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>

          {/* ── Global animations ── */}
          <style jsx global>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            .animate-fade-in {
              animation: fadeIn 0.3s ease;
            }
            .animate-fade-out {
              animation: fadeOut 0.3s ease;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
