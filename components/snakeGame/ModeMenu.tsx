"use client";

import type { GameMode } from "@/types/snake-game";
import { MODE_CONFIGS } from "@/types/snake-game";

interface ModeMenuProps {
  onSelectMode: (mode: GameMode) => void;
  onBack: () => void;
}

export default function ModeMenu({ onSelectMode, onBack }: ModeMenuProps) {
  const modes = Object.entries(MODE_CONFIGS) as [
    GameMode,
    (typeof MODE_CONFIGS)[GameMode],
  ][];

  return (
    <div className="flex flex-col items-center gap-8 animate-fadeIn">
      <h2 className="font-display text-4xl text-white/90 drop-shadow">
        Choose Mode
      </h2>

      <div className="flex gap-5 flex-wrap justify-center">
        {modes.map(([mode, config]) => (
          <div key={mode} className="group relative flex flex-col items-center">
            <button
              onClick={() => onSelectMode(mode)}
              className={`
                px-6 py-4 rounded-lg border text-lg font-display
                transition-all duration-200 hover:scale-105 active:scale-95 shadow-md
                ${config.colorClass} ${config.hoverClass}
              `}
            >
              {config.label}
            </button>
            {/* Tooltip */}
            <div className="absolute top-full mt-2 w-44 bg-amber-50 text-gray-700 text-xs font-body px-3 py-2 rounded-lg border border-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-md text-center">
              {config.description}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-2 text-amber-100/60 hover:text-amber-100 font-body text-sm transition-colors flex items-center gap-2"
      >
        ← Back
      </button>
    </div>
  );
}
