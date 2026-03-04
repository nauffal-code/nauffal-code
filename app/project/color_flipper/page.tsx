"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

type ColorMode = "hex" | "primary";

const PRIMARY_COLORS = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "blue",
  "violet",
  "purple",
] as const;

const HEX_CHARS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
] as const;

export default function ColorFlipper() {
  const [colorMode, setColorMode] = useState<ColorMode>("primary");
  const [currentColor, setCurrentColor] = useState("#f1f5f8");

  // Generate random hex color
  const generateHexColor = useCallback(() => {
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * HEX_CHARS.length);
      hexColor += HEX_CHARS[randomIndex];
    }
    return hexColor;
  }, []);

  // Generate random primary color
  const generatePrimaryColor = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * PRIMARY_COLORS.length);
    return PRIMARY_COLORS[randomIndex];
  }, []);

  // Handle color flip
  const handleFlip = useCallback(() => {
    const newColor =
      colorMode === "hex" ? generateHexColor() : generatePrimaryColor();
    setCurrentColor(newColor);
  }, [colorMode, generateHexColor, generatePrimaryColor]);

  // Handle mode change
  const handleModeChange = useCallback(
    (mode: ColorMode) => {
      setColorMode(mode);
      const newColor =
        mode === "hex" ? generateHexColor() : generatePrimaryColor();
      setCurrentColor(newColor);
    },
    [generateHexColor, generatePrimaryColor],
  );

  return (
    <div className="wrapper" style={{ backgroundColor: currentColor }}>
      <div className="content">
        {/* Close Button */}
        <Link
          href="/work"
          className="fixed bottom-5 right-5 flex items-center gap-2 bg-red-500 text-gray-100 no-underline px-5 py-3 rounded-full z-50 hover:bg-red-600 transition-all duration-300 hover:scale-105"
        >
          <span className="text-sm font-medium">Close the app</span>
          <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5" />
        </Link>

        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Color Flipper
        </h1>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <span className="bg-black text-white text-3xl md:text-4xl font-bold px-4 py-2 rounded-lg">
            Background Color:{" "}
            <span className="text-main uppercase">{currentColor}</span>
          </span>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => handleModeChange("hex")}
              className={`px-4 py-2 text-lg border-2 rounded-md transition-all duration-300 ${
                colorMode === "hex"
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              Hex
            </button>
            <button
              onClick={() => handleModeChange("primary")}
              className={`px-4 py-2 text-lg border-2 rounded-md transition-all duration-300 ${
                colorMode === "primary"
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              Primary Color
            </button>
          </div>

          {/* Flip Button */}
          <button
            onClick={handleFlip}
            className="px-8 py-3 bg-main text-white text-lg font-medium rounded-lg  transition-colors duration-300"
          >
            Flip Color
          </button>
        </div>
      </div>
    </div>
  );
}
