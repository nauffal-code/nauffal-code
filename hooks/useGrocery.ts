"use client";

import { useState, useEffect, useCallback } from "react";

export interface GroceryItem {
  id: string;
  value: string;
}

export interface AlertState {
  show: boolean;
  message: string;
  type: "success" | "danger" | "";
}

const LOCAL_STORAGE_KEY = "grocery-bud-list";

export function useGrocery() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    message: "",
    type: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const displayAlert = useCallback(
    (message: string, type: "success" | "danger") => {
      setAlert({ show: true, message, type });
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 2500);
    },
    [],
  );

  const resetForm = useCallback(() => {
    setInputValue("");
    setIsEditing(false);
    setEditId(null);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const value = inputValue.trim();

      if (!value) {
        displayAlert("Please enter a value", "danger");
        return;
      }

      if (isEditing && editId) {
        setItems((prev) =>
          prev.map((item) => (item.id === editId ? { ...item, value } : item)),
        );
        displayAlert("Item updated successfully", "success");
      } else {
        const newItem: GroceryItem = {
          id: new Date().getTime().toString(),
          value,
        };
        setItems((prev) => [...prev, newItem]);
        displayAlert("Item added to the list", "success");
      }

      resetForm();
    },
    [inputValue, isEditing, editId, displayAlert, resetForm],
  );

  const deleteItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      displayAlert("Item removed", "danger");
      if (editId === id) resetForm();
    },
    [displayAlert, editId, resetForm],
  );

  const editItem = useCallback((item: GroceryItem) => {
    setInputValue(item.value);
    setIsEditing(true);
    setEditId(item.id);
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
    displayAlert("List cleared", "danger");
    resetForm();
  }, [displayAlert, resetForm]);

  return {
    items,
    inputValue,
    setInputValue,
    alert,
    isEditing,
    handleSubmit,
    deleteItem,
    editItem,
    clearItems,
  };
}
