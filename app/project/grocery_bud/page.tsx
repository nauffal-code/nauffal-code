"use client";

import Alert from "@/components/groceryBud/Alert";
import GroceryForm from "@/components/groceryBud/GroceryForm";
import GroceryList from "@/components/groceryBud/GroceryList";
import { useGrocery } from "@/hooks/useGrocery";

export default function GroceryBud() {
  const {
    items,
    inputValue,
    setInputValue,
    alert,
    isEditing,
    handleSubmit,
    deleteItem,
    editItem,
    clearItems,
  } = useGrocery();

  return (
    <main
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "var(--color3)" }}
    >
      <section className="relative flex flex-col gap-4 w-[400px] max-w-[90vw] bg-white p-5 rounded-sm shadow-md">
        {/* Alert — absolutely positioned above the card */}
        <Alert alert={alert} />

        {/* Form */}
        <GroceryForm
          inputValue={inputValue}
          isEditing={isEditing}
          onChange={setInputValue}
          onSubmit={handleSubmit}
        />

        {/* List */}
        <GroceryList
          items={items}
          onEdit={editItem}
          onDelete={deleteItem}
          onClear={clearItems}
        />
      </section>
    </main>
  );
}
