"use client";

import { GroceryItem as GroceryItemType } from "@/hooks/useGrocery";
import GroceryItem from "./GroceryItem";

interface GroceryListProps {
  items: GroceryItemType[];
  onEdit: (item: GroceryItemType) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export default function GroceryList({
  items,
  onEdit,
  onDelete,
  onClear,
}: GroceryListProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Item list */}
      <div className="flex flex-col gap-2 w-full">
        {items.map((item) => (
          <GroceryItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Clear button */}
      <button
        type="button"
        onClick={onClear}
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
        Clear items
      </button>
    </div>
  );
}
