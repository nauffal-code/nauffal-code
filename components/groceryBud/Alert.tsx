"use client";

import { AlertState } from "@/hooks/useGrocery";

interface AlertProps {
  alert: AlertState;
}

export default function Alert({ alert }: AlertProps) {
  return (
    <div
      className={`
        absolute -top-2 left-1/2 w-full -translate-x-1/2 -translate-y-full
        px-3 py-2 text-center text-sm font-medium rounded-sm
        transition-all duration-300
        ${alert.show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        ${
          alert.type === "success"
            ? "bg-[#155724] text-white"
            : alert.type === "danger"
              ? "bg-[#721c24] text-white"
              : "bg-white text-gray-800"
        }
      `}
      role="alert"
      aria-live="polite"
    >
      {alert.message}
    </div>
  );
}
