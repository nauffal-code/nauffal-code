"use client";

interface MainMenuProps {
  onPlay: () => void;
}

export default function MainMenu({ onPlay }: MainMenuProps) {
  return (
    <div className="flex flex-col items-center gap-6 animate-fadeIn">
      <h1 className="font-display text-7xl text-center tracking-tight drop-shadow-lg">
        <span className="text-green-200">Hebi</span>
        <span className="text-sky-300">.io</span>
      </h1>
      <p className="text-amber-100/70 font-body text-sm tracking-widest uppercase">
        Classic Snake — Reimagined
      </p>
      <button
        onClick={onPlay}
        className="mt-2 px-8 py-3 bg-sky-400 hover:bg-sky-300 text-white font-display text-lg rounded-lg border border-sky-300 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-sky-900/30"
      >
        Play
      </button>
    </div>
  );
}
