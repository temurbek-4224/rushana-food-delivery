"use client";

import { useState } from "react";
import { Loader2, Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

export type Category = { id: string; name: string };

type Props = {
  restaurantId: string;
  categories: Category[];
  onCategoriesChange: (cats: Category[]) => void;
};

export default function CategoryManager({
  restaurantId,
  categories,
  onCategoriesChange,
}: Props) {
  const { t } = useLanguage();
  const [newName,     setNewName]     = useState("");
  const [editingId,   setEditingId]   = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [loading,     setLoading]     = useState(false);

  // ── Add ──────────────────────────────────────────────────────────────────
  async function handleAdd() {
    if (!newName.trim()) { toast.error("Enter a category name."); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/restaurants/${restaurantId}/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName.trim() }),
        }
      );
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Failed to add category."); return; }
      onCategoriesChange([...categories, data.category as Category]);
      setNewName("");
      toast.success("Category added!");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // ── Rename ────────────────────────────────────────────────────────────────
  async function handleRename(id: string) {
    if (!editingName.trim()) { toast.error("Enter a category name."); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Failed to rename."); return; }
      onCategoriesChange(
        categories.map((c) => (c.id === id ? { ...c, name: editingName.trim() } : c))
      );
      setEditingId(null);
      toast.success("Category renamed!");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  async function handleDelete(id: string, name: string) {
    if (
      !confirm(
        `Delete category "${name}"?\n\nAll its menu items will also be deleted.`
      )
    )
      return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Failed to delete."); return; }
      onCategoriesChange(categories.filter((c) => c.id !== id));
      toast.success("Category deleted.");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
      <h2 className="font-bold text-gray-900 mb-4">
        {t("categories")}{" "}
        <span className="text-gray-400 font-normal text-sm">
          ({categories.length})
        </span>
      </h2>

      {/* List */}
      {categories.length === 0 ? (
        <p className="text-sm text-gray-400 mb-4">
          {t("noCategoriesYet")}
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-50 mb-4">
          {categories.map((cat) => (
            <li key={cat.id} className="flex items-center gap-2 py-2.5">
              {editingId === cat.id ? (
                /* ── inline rename ── */
                <>
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRename(cat.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    autoFocus
                    disabled={loading}
                  />
                  <button
                    onClick={() => handleRename(cat.id)}
                    disabled={loading}
                    title="Save"
                    className="rounded-lg p-1.5 text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    disabled={loading}
                    title={t("cancel")}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                /* ── display row ── */
                <>
                  <span className="flex-1 text-sm font-medium text-gray-800">
                    {cat.name}
                  </span>
                  <button
                    onClick={() => {
                      setEditingId(cat.id);
                      setEditingName(cat.name);
                    }}
                    disabled={loading}
                    title="Rename"
                    className="rounded-lg p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors disabled:opacity-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    disabled={loading}
                    title="Delete"
                    className="rounded-lg p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Add form */}
      <div className="flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdd(); } }}
          placeholder={t("newCategoryPlaceholder")}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50"
          disabled={loading}
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {t("add")}
        </button>
      </div>
    </div>
  );
}
