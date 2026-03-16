"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, FileText, ArrowLeft, Loader2, ImageOff } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

type CartItem = {
  id: string;
  quantity: number;
  menuItem: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    category: { restaurantId: string };
  };
};

type Props = { items: CartItem[] };

export default function CheckoutForm({ items }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  // Detect if items span multiple restaurants (edge case)
  const restaurantIds = [
    ...new Set(items.map((i) => i.menuItem.category.restaurantId)),
  ];
  const multiRestaurant = restaurantIds.length > 1;

  async function handlePlaceOrder() {
    if (!address.trim()) {
      toast.error("Please enter a delivery address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim(), notes: notes.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to place order.");
        return;
      }

      toast.success("Order placed successfully! 🎉");
      // Notify navbar to reset cart badge
      window.dispatchEvent(new Event("cart:updated"));
      router.push("/orders");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToCart")}
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("checkout")}</h1>

      {multiRestaurant && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {t("multiRestaurantWarning")}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Left: Delivery details ────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Address */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-orange-500" />
              <h2 className="font-semibold text-gray-900">{t("deliveryAddress")}</h2>
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("deliveryAddressPlaceholder")}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              disabled={loading}
            />
          </div>

          {/* Notes */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-orange-500" />
              <h2 className="font-semibold text-gray-900">
                {t("orderNotes")}
                <span className="ml-1.5 text-xs font-normal text-gray-400">{t("optional")}</span>
              </h2>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("orderNotesPlaceholder")}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 resize-none"
              disabled={loading}
            />
          </div>
        </div>

        {/* ── Right: Order summary ──────────────────────────────────────── */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-20 rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900">{t("orderSummary")}</h2>

            {/* Items */}
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-orange-50">
                    {item.menuItem.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.menuItem.imageUrl}
                        alt={item.menuItem.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-300">
                        <ImageOff className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.menuItem.name}
                    </p>
                    <p className="text-xs text-gray-400">×{item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                    {formatPrice(item.menuItem.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
              <span className="font-semibold text-gray-700">{t("total")}</span>
              <span className="font-bold text-xl text-orange-500">
                {formatPrice(total)}
              </span>
            </div>

            {/* Place order button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading || multiRestaurant}
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("placingOrder")}
                </>
              ) : (
                t("placeOrder")
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              {t("termsNote")}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
