"use client";

import Image from "next/image";

import { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faRightFromBracket,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import type { Card, CardValue, GameMode, GameState } from "@/types/memory-game";

import CloseGame from "@/components/CloseGame";

const CARD_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function MemoryGame() {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState(0);
  const [flips, setFlips] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [isShuffling, setIsShuffling] = useState(false);

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize cards
  const initializeCards = useCallback(() => {
    const doubledCards = [...CARD_IMAGES, ...CARD_IMAGES];
    const shuffled = [...doubledCards].sort(() => Math.random() - 0.5);
    return shuffled.map((value, index) => ({
      id: index,
      value: value as CardValue,
      isFlipped: false,
      isMatched: false,
    }));
  }, []);

  // Start game
  const startGame = useCallback(
    (mode: GameMode) => {
      setGameMode(mode);
      setCards(initializeCards());
      setMatchedCards(0);
      setFlips(0);
      setTimeLeft(30);
      setFlippedCards([]);
      setGameState("ready");
    },
    [initializeCards],
  );

  // Countdown animation
  const startCountdown = useCallback(() => {
    setShowCountdown(true);
    setCountdownValue(3);

    countdownRef.current = setTimeout(() => {
      setCountdownValue(2);
    }, 500);

    countdownRef.current = setTimeout(() => {
      setCountdownValue(1);
    }, 2500);

    countdownRef.current = setTimeout(() => {
      setShowCountdown(false);
      setGameState("playing");
      setIsCountingDown(true);
    }, 4500);
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === "playing" && isCountingDown && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState, isCountingDown, timeLeft]);

  // Check for matches
  const checkForMatch = useCallback(() => {
    if (flippedCards.length !== 2) return;

    const [first, second] = flippedCards;
    const firstCard = cards[first];
    const secondCard = cards[second];

    if (firstCard.value === secondCard.value) {
      // Match found
      setCards((prev) =>
        prev.map((card) =>
          card.id === first || card.id === second
            ? { ...card, isMatched: true, isFlipped: true }
            : card,
        ),
      );
      setMatchedCards((prev) => prev + 1);
      setFlippedCards([]);

      // Check if all matched
      if (matchedCards + 1 === 8) {
        if (gameMode === "normal") {
          setTimeout(() => shuffleCards(), 1000);
        } else {
          endGame();
        }
      }
    } else {
      // No match - shake animation
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card,
          ),
        );
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, cards, matchedCards, gameMode]);

  // Handle card click
  const handleCardClick = useCallback(
    (cardId: number) => {
      if (
        flippedCards.length >= 2 ||
        cards[cardId].isFlipped ||
        cards[cardId].isMatched ||
        gameState !== "playing"
      )
        return;

      setCards((prev) =>
        prev.map((card) =>
          card.id === cardId ? { ...card, isFlipped: true } : card,
        ),
      );
      setFlippedCards((prev) => [...prev, cardId]);
      setFlips((prev) => prev + 1);
    },
    [flippedCards, cards, gameState],
  );

  // Shuffle cards
  const shuffleCards = useCallback(() => {
    setIsShuffling(true);
    setCards(initializeCards());
    setMatchedCards(0);
    setFlips(0);
    setTimeLeft(30);
    setFlippedCards([]);
    setIsCountingDown(false);

    if (gameMode === "advanced") {
      setTimeout(() => {
        setIsShuffling(false);
        startCountdown();
      }, 1000);
    } else {
      setTimeout(() => {
        setIsShuffling(false);
        setGameState("playing");
        setIsCountingDown(true);
      }, 1000);
    }
  }, [initializeCards, gameMode, startCountdown]);

  // End game
  const endGame = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearTimeout(countdownRef.current);
    setGameState("menu");
    setGameMode(null);
    setIsCountingDown(false);
  }, []);

  // Go back to menu
  const goBackToMenu = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearTimeout(countdownRef.current);
    setGameState("menu");
    setGameMode(null);
    setIsCountingDown(false);
  }, []);

  // Render game board
  const renderGameBoard = () => (
    <div className="flex flex-col items-center gap-4">
      {/* Level Title */}
      <h1 className="text-white text-3xl font-bold">
        Level:{" "}
        <span className="text-[#e8aa42]">
          {gameMode === "normal" ? "Normal" : "Advanced"}
        </span>
      </h1>

      {/* Game Board */}
      <div
        className={`grid grid-cols-4 gap-2 p-6 bg-[#f8f8f8] rounded-xl shadow-lg ${
          isShuffling ? "animate-pulse" : ""
        }`}
        style={{
          width: "min(90%, 400px)",
          height: gameMode === "normal" ? "400px" : "450px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`relative w-full aspect-square cursor-pointer perspective-800 transition-transform duration-300 ${
              card.isFlipped || card.isMatched ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform:
                card.isFlipped || card.isMatched
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
            }}
          >
            {/* Front View (Question Mark) */}
            <div
              className="absolute inset-0 bg-white rounded-lg shadow-md flex items-center justify-center backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-[#6563ff] text-4xl"
              />
            </div>

            {/* Back View (Image) */}
            <div
              className="absolute inset-0 bg-white rounded-lg shadow-md flex items-center justify-center backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <Image
                src={`/images/projects/img-${card.value}.png`}
                alt={`Card ${card.value}`}
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Features */}
      {gameMode === "advanced" && (
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-lg shadow-md">
          <span className="text-gray-700 font-medium">
            Time: <span className="text-[#6563ff] font-bold">{timeLeft}s</span>
          </span>
          <span className="text-gray-700 font-medium border-x px-4">
            Flips: <span className="text-[#6563ff] font-bold">{flips}</span>
          </span>
          <button
            onClick={shuffleCards}
            className="px-4 py-2 text-[#6563ff] border-2 border-[#6563ff] rounded-lg hover:bg-[#6563ff] hover:text-white transition-colors"
          >
            Refresh
          </button>
        </div>
      )}

      {/* Surrender Button */}
      <button
        onClick={endGame}
        className="px-6 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#6563ff] transition-colors"
      >
        Surrender
      </button>
    </div>
  );

  return (
    <div className="wrapper">
      <div className="content">
        <div
          className="min-h-screen flex flex-col relative"
          style={{ backgroundColor: "#6563ff" }}
        >
          {/* Close Button */}
          <CloseGame />

          {/* Main Menu */}
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

          {/* Mode Selection */}
          {gameState === "mode" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <h1 className="text-white text-5xl font-bold mb-4">Difficulty</h1>
              <div className="flex gap-6">
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
              <button
                onClick={goBackToMenu}
                className="absolute top-5 left-5 text-white text-2xl hover:text-gray-300 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </button>
            </div>
          )}

          {/* Ready Screen */}
          {gameState === "ready" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
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
                <div
                  className="text-white text-7xl font-bold animate-fade-in"
                  style={{ animation: "fadeOut 0.3s ease" }}
                >
                  {countdownValue}
                </div>
              )}
              <button
                onClick={goBackToMenu}
                className="absolute top-5 left-5 text-white text-2xl hover:text-gray-300 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </button>
            </div>
          )}

          {/* Game Board */}
          {gameState === "playing" && renderGameBoard()}

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

          {/* Back Button */}
          {gameState === "mode" && (
            <button
              onClick={goBackToMenu}
              className="absolute top-5 left-5 text-white text-2xl hover:text-gray-300 transition-colors"
              aria-label="Go back"
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          )}

          {/* Exit Button */}
          {gameState === "playing" && (
            <button
              onClick={endGame}
              className="absolute top-5 left-5 text-white text-2xl hover:text-gray-300 transition-colors"
              aria-label="Exit game"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          )}

          {/* Custom Animations */}
          <style jsx global>{`
            @keyframes fadeOut {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
            @keyframes fadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
            .animate-fade-in {
              animation: fadeIn 0.3s ease;
            }
            .animate-fade-out {
              animation: fadeOut 0.3s ease;
            }
            .rotate-y-180 {
              transform: rotateY(180deg);
            }
            .backface-hidden {
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            .perspective-800 {
              perspective: 800px;
            }
            .rotate-y-180 {
              transform: rotateY(180deg);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
