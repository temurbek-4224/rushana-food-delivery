"use client";

import { useState } from "react";
import { Loader2, Plus, Pencil, Trash2, X, ImageOff } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

type Category = { id: string; name: string };

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  categoryId: string;
};

type FormState = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  isAvailable: boolean;
  categoryId: string;
};

const emptyForm = (defaultCategoryId = ""): FormState => ({
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  isAvailable: true,
  categoryId: defaultCategoryId,
});

const inputCls =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-400";

const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

type Props = {
  restaurantId: string;
  categories: Category[];
  initialItems: MenuItem[];
};

export default function MenuItemManager({
  restaurantId,
  categories,
  initialItems,
}: Props) {
  const { t } = useLanguage();
  const [items,      setItems]      = useState<MenuItem[]>(initialItems);
  const [showForm,   setShowForm]   = useState(false);
  const [editingId,  setEditingId]  = useState<string | null>(null);
  const [form,       setForm]       = useState<FormState>(emptyForm(categories[0]?.id));
  const [loading,    setLoading]    = useState(false);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function openAdd() {
    setEditingId(null);
    setForm(emptyForm(categories[0]?.id ?? ""));
    setShowForm(true);
  }

  function openEdit(item: MenuItem) {
    setEditingId(item.id);
    setForm({
      name:        item.name,
      description: item.description ?? "",
      price:       String(item.price),
      imageUrl:    item.imageUrl ?? "",
      isAvailable: item.isAvailable,
      categoryId:  item.categoryId,
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
  }

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  // ── Submit (add or update) ────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim())    { toast.error("Name is required.");     return; }
    if (!form.categoryId)     { toast.error("Category is required."); return; }
    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      toast.error("Enter a valid price.");
      return;
    }

    const body = {
      name:        form.name.trim(),
      description: form.description.trim() || null,
      price:       priceNum,
      imageUrl:    form.imageUrl.trim() || null,
      isAvailable: form.isAvailable,
      categoryId:  form.categoryId,
    };

    setLoading(true);
    try {
      let res: Response;
      if (editingId) {
        res = await fetch(`/api/admin/menu-items/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch(`/api/admin/restaurants/${restaurantId}/menu-items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Something went wrong."); return; }

      const saved = data.menuItem as { id: string; name: string; description: string | null; price: { toString(): string } | number; imageUrl: string | null; isAvailable: boolean; categoryId: string };
      const normalized: MenuItem = {
        ...saved,
        price: typeof saved.price === "number" ? saved.price : parseFloat(saved.price.toString()),
      };

      if (editingId) {
        setItems((prev) => prev.map((it) => (it.id === editingId ? normalized : it)));
        toast.success("Menu item updated!");
      } else {
        setItems((prev) => [...prev, normalized]);
        toast.success("Menu item added!");
      }
      closeForm();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/menu-items/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Failed to delete."); return; }
      setItems((prev) => prev.filter((it) => it.id !== id));
      toast.success("Menu item deleted.");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // ── Lookup helpers ────────────────────────────────────────────────────────
  function categoryName(id: string) {
    return categories.find((c) => c.id === id)?.name ?? "—";
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900">
          {t("menuItems")}{" "}
          <span className="text-gray-400 font-normal text-sm">({items.length})</span>
        </h2>
        {!showForm && (
          <button
            onClick={openAdd}
            disabled={categories.length === 0}
            title={categories.length === 0 ? t("addCategoryFirst") : t("addItem")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            {t("addItem")}
          </button>
        )}
      </div>

      {categories.length === 0 && (
        <p className="text-sm text-orange-600 bg-orange-50 rounded-xl px-4 py-3 mb-4">
          {t("addCategoryFirst")}
        </p>
      )}

      {/* ── Add / Edit Form ──────────────────────────────────────────────── */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-xl border border-orange-100 bg-orange-50/40 p-5 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-800 text-sm">
              {editingId ? t("editMenuItem") : t("addNewMenuItem")}
            </h3>
            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Name + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                {t("nameLabel")} <span className="text-red-400 normal-case font-normal">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="e.g. Cheeseburger"
                className={inputCls}
                disabled={loading}
              />
            </div>

            <div>
              <label className={labelCls}>
                {t("categoryLabel")} <span className="text-red-400 normal-case font-normal">*</span>
              </label>
              <select
                value={form.categoryId}
                onChange={set("categoryId")}
                className={inputCls}
                disabled={loading}
              >
                <option value="">{t("selectCategory")}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price + imageUrl */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                {t("priceLabel")} <span className="text-red-400 normal-case font-normal">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={set("price")}
                placeholder="0.00"
                className={inputCls}
                disabled={loading}
              />
            </div>

            <div>
              <label className={labelCls}>
                {t("imageUrlLabel")}{" "}
                <span className="text-gray-400 normal-case font-normal">{t("optional")}</span>
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={set("imageUrl")}
                placeholder="https://..."
                className={inputCls}
                disabled={loading}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>
              {t("descriptionLabel")}{" "}
              <span className="text-gray-400 normal-case font-normal">{t("optional")}</span>
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              placeholder="Short description…"
              rows={2}
              className={cn(inputCls, "resize-none")}
              disabled={loading}
            />
          </div>

          {/* isAvailable toggle */}
          <div>
            <label className={labelCls}>{t("availability")}</label>
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <div
                className="relative"
                onClick={() =>
                  !loading &&
                  setForm((prev) => ({ ...prev, isAvailable: !prev.isAvailable }))
                }
              >
                <div
                  className={cn(
                    "h-6 w-11 rounded-full transition-colors",
                    form.isAvailable ? "bg-orange-500" : "bg-gray-200"
                  )}
                />
                <div
                  className={cn(
                    "absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform",
                    form.isAvailable ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </div>
              <span className="text-sm text-gray-700">
                {form.isAvailable ? t("availableToOrder") : t("unavailableHidden")}
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("saving")}
                </>
              ) : editingId ? (
                t("updateItem")
              ) : (
                t("addItem")
              )}
            </button>
            <button
              type="button"
              onClick={closeForm}
              disabled={loading}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      )}

      {/* ── Items table ──────────────────────────────────────────────────── */}
      {items.length === 0 && !showForm ? (
        <p className="text-sm text-gray-400 py-4">
          {t("noMenuItemsYet")}
        </p>
      ) : items.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100">
              <tr>
                <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4 w-12" />
                <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">{t("nameLabel")}</th>
                <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">{t("categoryLabel")}</th>
                <th className="text-right text-xs text-gray-400 font-medium pb-3 pr-4">{t("priceLabel")}</th>
                <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">{t("availability")}</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="group">
                  {/* Thumbnail */}
                  <td className="py-3 pr-4">
                    <div className="h-10 w-10 rounded-lg overflow-hidden bg-orange-50 flex-shrink-0 flex items-center justify-center">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageOff className="h-4 w-4 text-gray-300" />
                      )}
                    </div>
                  </td>

                  <td className="py-3 pr-4">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    {item.description && (
                      <p className="text-xs text-gray-400 truncate max-w-[180px]">
                        {item.description}
                      </p>
                    )}
                  </td>

                  <td className="py-3 pr-4 text-gray-600 text-xs">
                    {categoryName(item.categoryId)}
                  </td>

                  <td className="py-3 pr-4 text-right font-semibold text-gray-800">
                    {formatPrice(item.price)}
                  </td>

                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                        item.isAvailable
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {item.isAvailable ? t("yes") : t("no")}
                    </span>
                  </td>

                  <td className="py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(item)}
                        disabled={loading}
                        title="Edit"
                        className="rounded-lg p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors disabled:opacity-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={loading}
                        title="Delete"
                        className="rounded-lg p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
