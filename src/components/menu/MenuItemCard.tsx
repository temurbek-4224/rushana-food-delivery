"use client";

import { useState } from "react";
import { ShoppingCart, ImageOff } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  imageUrl: string | null;
  isAvailable: boolean;
};

type Props = {
  item: MenuItem;
};

export default function MenuItemCard({ item }: Props) {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  async function handleAddToCart() {
    setLoading(true);
    try {
      const res = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuItemId: item.id, quantity: 1 }),
      });

      if (res.status === 401) {
        toast.error("Please login to add items to your cart.");
        return;
      }
      if (!res.ok) {
        toast.error("Failed to add item. Please try again.");
        return;
      }

      toast.success(`${item.name} added to cart!`);
      window.dispatchEvent(new Event("cart:updated"));
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`flex flex-col rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden transition-opacity ${
        !item.isAvailable ? "opacity-60" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-40 bg-orange-50 flex-shrink-0 overflow-hidden">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">
            <ImageOff className="h-10 w-10" />
          </div>
        )}

        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-600">
              {t("unavailable")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 gap-1">
        <h4 className="font-semibold text-gray-900 text-sm leading-snug">
          {item.name}
        </h4>

        {item.description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <span className="font-bold text-orange-500 text-sm">
            {formatPrice(item.price)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={!item.isAvailable || loading}
            className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {loading ? t("adding") : t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}
