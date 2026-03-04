import Link from "next/link";

import { useState, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { GameState, GameMode, Position, Direction } from "@/types/snake-game";

const GRID_SIZE = 30;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = "RIGHT";

export default function SnakeGame() {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [obstacles, setObstacles] = useState<Position[]>([]);

  const generateFood = useCallback(() => {
    const excludePositions = [...snake, ...obstacles];
    setFood(generateRandomPosition(excludePositions));
  });

  const startGame = useCallback(
    (mode: GameMode) => {
      setGameMode(mode);
      setSnake(INITIAL_SNAKE);

      setDirection(INITIAL_DIRECTION);
      directionRef.current = INITIAL_DIRECTION;

      setScore(0);
      setObstacles([]);
      setGameState("playing");
      setIsPaused(false);
      generateFood();
    },
    [generateFood],
  );

  return (
    <div className="wrapper">
      <div className="content">
        <div
          className="min-h-screen flex flex-col relative"
          style={{ backgroundColor: "#faf0d7" }}
        >
          {/* Close Button */}
          <Link
            href="/work"
            className="fixed bottom-5 right-5 flex items-center gap-2 bg-red-500 text-gray-100 no-underline px-5 py-3 rounded-full z-50 hover:bg-red-600 transition-all duration-300 hover:scale-105"
          >
            <span className="text-sm font-medium">Close the game</span>
            <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5" />
          </Link>

          {/* Main Menu */}
          {gameState === "menu" && (
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
                <h1 className="text-5xl font-bold text-[#cceebc] mb-4">
                  Hebi<span className="text-[#8cc0de]">.io</span>
                </h1>
                <button
                  onClick={() => setGameState("mode")}
                  className="px-8 py-3 bg-[#8cc0de] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#7ab0ce] hover:scale-105"
                >
                  Play
                </button>
              </div>
            </div>
          )}

          {/* Mode Selection */}
          {gameState === "mode" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <h1 className="text-white text-5xl font-bold mb-4">Game Mode</h1>
              <div className="flex gap-6">
                <div className="relative group">
                  <button
                    onClick={() => startGame("easy")}
                    className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-green-600 hover:scale-105"
                  >
                    Easy
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ul className="space-y-1">
                      <li>• Slow speed</li>
                      <li>• No wall collision</li>
                      <li>• Wrap around edges</li>
                    </ul>
                  </div>
                </div>
                <div className="relative group">
                  <button
                    onClick={() => startGame("normal")}
                    className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105"
                  >
                    Normal
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ul className="space-y-1">
                      <li>• Normal speed</li>
                      <li>• Wall collision</li>
                      <li>• Obstacles after 5 points</li>
                    </ul>
                  </div>
                </div>
                <div className="relative group">
                  <button
                    onClick={() => startGame("hard")}
                    className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-red-600 hover:scale-105"
                  >
                    Hard
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <ul className="space-y-1">
                      <li>• Fast speed</li>
                      <li>• Wall collision</li>
                      <li>• Obstacles after 5 points</li>
                    </ul>
                  </div>
                </div>
              </div>
              <button
                onClick={goBackToMenu}
                className="absolute top-5 left-5 text-white text-2xl hover:text-gray-300 transition-colors"
                aria-label="Go back"
              >
                <FontAwesomeIcon icon={faBackward} />
              </button>
            </div>
          )}

          {/* Game Screen */}
          {gameState === "playing" && (
            <div className="flex-1 flex flex-col items-center justify-center relative">
              {/* Pause/Exit Controls */}
              <div className="absolute top-5 left-5 flex flex-col gap-3">
                <button
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="p-3 bg-[#8cc0de] text-[#cceebc] rounded-full hover:bg-[#7ab0ce] transition-colors"
                  aria-label={isPaused ? "Resume" : "Pause"}
                >
                  <FontAwesomeIcon
                    icon={isPaused ? faPlay : faPause}
                    className="w-6 h-6"
                  />
                </button>
                <button
                  onClick={goBackToMenu}
                  className="p-3 bg-[#8cc0de] text-[#cceebc] rounded-full hover:bg-[#7ab0ce] transition-colors"
                  aria-label="Exit game"
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="w-6 h-6"
                  />
                </button>
              </div>

              {/* Game Board */}
              {renderGameBoard()}

              {/* Pause Overlay */}
              {isPaused && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      Paused
                    </h2>
                    <button
                      onClick={() => setIsPaused(false)}
                      className="px-6 py-3 bg-[#8cc0de] text-white font-semibold rounded-lg hover:bg-[#7ab0ce] transition-colors"
                    >
                      Resume
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md mx-4">
                <h1 className="text-4xl font-bold text-red-500 mb-4">
                  YOU LOSE!!
                </h1>
                <p className="text-gray-700 text-lg mb-6">
                  {gameOverMessage || "Game Over"}
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Retry
                  </button>
                  <button
                    onClick={goBackToMenu}
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Credits */}
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
                <FontAwesomeIcon icon={faGlobeBrand} />
              </a>
              <a
                href="https://www.instagram.com/nauffal.code/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-300 transition-colors"
                aria-label="Visit Instagram"
              >
                <FontAwesomeIcon icon={faInstagramBrand} />
              </a>
              <a
                href="https://www.linkedin.com/in/nauffal-rizky-3a3b70243/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-300 transition-colors"
                aria-label="Visit LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinBrand} />
              </a>
            </div>
          </div>

          {/* Game Manual */}
          <div className="fixed top-5 right-5 bg-white p-4 rounded-lg shadow-lg max-w-xs">
            <button
              onClick={() => setShowManual((prev) => !prev)}
              className="text-[#8cc0de] font-semibold mb-2"
            >
              {showManual ? "Hide Manual" : "Show Manual"}
            </button>
            {showManual && (
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <span className="bg-sky-400 px-1 rounded">🐍</span> Snake
                </p>
                <p>
                  <span className="bg-red-500 px-1 rounded">🍎</span> Food
                </p>
                <p>
                  <span className="bg-purple-600 px-1 rounded">🟣</span>{" "}
                  Obstacle
                </p>
                <hr className="my-2" />
                <p>1. Eat food to grow</p>
                <p>2. Avoid obstacles and walls</p>
                <p>3. Obstacles appear after 5 points</p>
                <p>4. More obstacles every 5 points</p>
                <p>5. Max 4 obstacles</p>
              </div>
            )}
          </div>

          {/* Custom Animations */}
          <style jsx global>{`
            @keyframes pulse {
              0%,
              100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
            .animate-pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
