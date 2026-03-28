"use client";

interface MobileControlsProps {
  onDirection: (key: string) => void;
}

export default function MobileControls({ onDirection }: MobileControlsProps) {
  return (
    <div className="grid grid-cols-3 w-36 h-36 gap-1 md:hidden">
      <div />
      <button
        onClick={() => onDirection("ArrowUp")}
        className="flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded-lg active:scale-95 transition-all"
        aria-label="Up"
      >
        ↑
      </button>
      <div />
      <button
        onClick={() => onDirection("ArrowLeft")}
        className="flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded-lg active:scale-95 transition-all"
        aria-label="Left"
      >
        ←
      </button>
      <div className="bg-neutral-300 rounded-full" />
      <button
        onClick={() => onDirection("ArrowRight")}
        className="flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded-lg active:scale-95 transition-all"
        aria-label="Right"
      >
        →
      </button>
      <div />
      <button
        onClick={() => onDirection("ArrowDown")}
        className="flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded-lg active:scale-95 transition-all"
        aria-label="Down"
      >
        ↓
      </button>
      <div />
    </div>
  );
}
