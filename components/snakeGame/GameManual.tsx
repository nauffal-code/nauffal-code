"use client";

import { useEffect, useState } from "react";

export default function GameManual() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-30"
      onClick={() => setVisible(false)}
    >
      <div
        className="relative bg-white rounded-xl p-5 max-w-sm mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg transition-colors"
          aria-label="Close manual"
        >
          ✕
        </button>

        <h2 className="font-display text-2xl text-gray-800 mb-3">Manual</h2>

        <ul className="space-y-1 text-sm font-body text-gray-600 mb-4">
          <li className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-sm bg-sky-300" />
            Snake
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-sm bg-red-500" />
            Food
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-sm bg-purple-500" />
            Obstacle
          </li>
        </ul>

        <div className="border-t border-gray-100 pt-3">
          <ul className="space-y-1.5 text-xs font-body text-gray-500">
            <li>1. The snake grows each time it eats food.</li>
            <li>2. Hitting a wall (or yourself) ends the game.</li>
            <li>3. Obstacles appear after 5 points.</li>
            <li>4. A new obstacle is added every 5 points (max 4).</li>
            <li>
              5. Press <kbd className="bg-gray-100 px-1 rounded">Esc</kbd> to
              pause.
            </li>
          </ul>
        </div>

        <p className="text-right text-gray-300 text-xs mt-3 font-body">
          Click anywhere to dismiss
        </p>
      </div>
    </div>
  );
}
