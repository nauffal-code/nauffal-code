"use client";

import { GroceryItem as GroceryItemType } from "@/hooks/useGrocery";

interface GroceryItemProps {
  item: GroceryItemType;
  onEdit: (item: GroceryItemType) => void;
  onDelete: (id: string) => void;
}

export default function GroceryItem({
  item,
  onEdit,
  onDelete,
}: GroceryItemProps) {
  return (
    <article
      data-id={item.id}
      className="flex flex-row items-center justify-between w-full gap-2 py-1
        border-b border-gray-100 last:border-b-0
        animate-fadeIn"
    >
      <p
        className="text-sm flex-1"
        style={{ fontFamily: "var(--secondaryFont)" }}
      >
        {item.value}
      </p>

      <div className="flex gap-2">
        {/* Edit */}
        <button
          type="button"
          onClick={() => onEdit(item)}
          aria-label={`Edit ${item.value}`}
          className="text-orange-400 hover:text-orange-500 hover:scale-110
            transition-all duration-150 bg-transparent border-none text-base p-1"
        >
          <i className="fas fa-edit" />
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          aria-label={`Delete ${item.value}`}
          className="text-red-400 hover:text-red-500 hover:scale-110
            transition-all duration-150 bg-transparent border-none text-base p-1"
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </article>
  );
}
