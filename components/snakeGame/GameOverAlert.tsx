"use client";

interface GameOverAlertProps {
  message: string;
  onExit: () => void;
}

export default function GameOverAlert({ message, onExit }: GameOverAlertProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-40">
      <div className="flex flex-col items-center bg-white rounded-2xl px-8 py-6 w-72 shadow-2xl gap-3 animate-fadeIn">
        <h2 className="font-display text-4xl text-gray-800">YOU LOSE!!</h2>
        <p className="text-gray-500 font-body text-sm text-center">{message}</p>
        <button
          onClick={onExit}
          className="mt-2 px-5 py-2 bg-red-500 hover:bg-white text-white hover:text-red-500 border-2 border-red-500 rounded-lg font-body text-base transition-all duration-200"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
