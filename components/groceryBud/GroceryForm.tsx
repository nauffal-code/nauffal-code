"use client";

interface GroceryFormProps {
  inputValue: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function GroceryForm({
  inputValue,
  isEditing,
  onChange,
  onSubmit,
}: GroceryFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {/* Title */}
      <span
        className="text-center font-bold tracking-widest uppercase text-xs"
        style={{
          color: "var(--color1)",
          fontFamily: "var(--primaryFont)",
          fontSize: "1.5rem",
        }}
      >
        Grocery Bud
      </span>

      {/* Input row */}
      <div className="flex justify-center">
        <input
          type="text"
          id="grocery"
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. eggs"
          autoFocus
          autoComplete="off"
          className="
            flex-1 px-2 py-1 text-sm outline-none border-b-2
            transition-colors duration-200
            placeholder:text-gray-400
          "
          style={{ borderBottomColor: "var(--color1)" }}
        />
        <button
          type="submit"
          className="
            px-4 py-2 text-sm text-white font-medium
            transition-all duration-200
            hover:opacity-85 active:scale-95
          "
          style={{
            backgroundColor: "var(--color1)",
            border: `1.5px solid var(--color1)`,
          }}
        >
          {isEditing ? "Edit" : "Submit"}
        </button>
      </div>
    </form>
  );
}
