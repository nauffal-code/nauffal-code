"use client";

interface PauseNavProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onExit: () => void;
}

export default function PauseNav({
  isPaused,
  onTogglePause,
  onExit,
}: PauseNavProps) {
  return (
    <div className="fixed top-5 left-5 flex flex-col gap-2 z-20">
      {/* Pause / Resume */}
      <div className="group flex items-center gap-2">
        <button
          onClick={onTogglePause}
          className="w-9 h-9 flex items-center justify-center bg-sky-400 text-green-200 rounded-full text-base shadow transition hover:bg-sky-300"
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
        <span className="bg-white text-sky-500 font-body text-xs px-2 py-1 rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow">
          {isPaused ? "Resume" : "Pause"}
        </span>
      </div>

      {/* Exit — only shown when paused */}
      <div
        className={`group flex items-center gap-2 transition-all duration-300 ${
          isPaused
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-6"
        }`}
      >
        <button
          onClick={onExit}
          className="w-9 h-9 flex items-center justify-center bg-sky-400 text-green-200 rounded-full text-base shadow transition hover:bg-sky-300"
          aria-label="Exit to main menu"
        >
          ⏏
        </button>
        <span className="bg-white text-sky-500 font-body text-xs px-2 py-1 rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow">
          Exit
        </span>
      </div>
    </div>
  );
}
