"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ImageOff } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
};

type CartItem = {
  id: string;
  menuItemId: string;
  quantity: number;
  menuItem: MenuItem;
};

type Props = {
  initialItems: CartItem[];
};

export default function CartClient({ initialItems }: Props) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { t } = useLanguage();

  const total = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  async function updateQuantity(itemId: string, newQty: number) {
    if (newQty < 1) { removeItem(itemId); return; }

    setLoadingId(itemId);
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
    );

    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
      });

      if (!res.ok) {
        setItems(initialItems);
        toast.error("Failed to update quantity.");
      } else {
        window.dispatchEvent(new Event("cart:updated"));
      }
    } catch {
      setItems(initialItems);
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  }

  async function removeItem(itemId: string) {
    setLoadingId(itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));

    try {
      const res = await fetch(`/api/cart/items/${itemId}`, { method: "DELETE" });

      if (!res.ok) {
        setItems(initialItems);
        toast.error("Failed to remove item.");
      } else {
        toast.success("Item removed.");
        window.dispatchEvent(new Event("cart:updated"));
      }
    } catch {
      setItems(initialItems);
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  }

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <ShoppingBag className="h-20 w-20 text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">{t("cartEmpty")}</h2>
        <p className="text-gray-400 mb-8">{t("cartEmptyDesc")}</p>
        <Link
          href="/"
          className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          {t("browseRestaurants")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("yourCart")}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Item list ──────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-3">
          {items.map((item) => {
            const isUpdating = loadingId === item.id;
            const subtotal = item.menuItem.price * item.quantity;

            return (
              <div
                key={item.id}
                className={`flex gap-4 rounded-2xl bg-white border border-gray-100 shadow-sm p-4 transition-opacity ${
                  isUpdating ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <div className="h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-orange-50">
                  {item.menuItem.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.menuItem.imageUrl}
                      alt={item.menuItem.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-300">
                      <ImageOff className="h-6 w-6" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">
                      {item.menuItem.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-bold text-orange-500 text-sm">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Order summary ───────────────────────────────────────────────── */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-20 rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 text-base">{t("orderSummary")}</h2>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="truncate max-w-[160px]">
                    {item.menuItem.name}{" "}
                    <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-gray-800 flex-shrink-0">
                    {formatPrice(item.menuItem.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <span className="font-semibold text-gray-700">{t("total")}</span>
              <span className="font-bold text-xl text-orange-500">
                {formatPrice(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 active:scale-95 transition-all"
            >
              {t("proceedToCheckout")}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="text-center text-sm text-gray-400 hover:text-orange-500 transition-colors"
            >
              {t("continueShopping")}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
