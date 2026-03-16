"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Translations } from "@/i18n/types";
import toast from "react-hot-toast";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

const STATUS_KEYS: Record<OrderStatus, keyof Translations> = {
  PENDING:    "pending",
  CONFIRMED:  "confirmed",
  PREPARING:  "preparing",
  ON_THE_WAY: "onTheWay",
  DELIVERED:  "delivered",
  CANCELLED:  "cancelled",
};

const STATUS_VALUES: OrderStatus[] = [
  "PENDING", "CONFIRMED", "PREPARING", "ON_THE_WAY", "DELIVERED", "CANCELLED",
];

type Props = {
  orderId: string;
  currentStatus: OrderStatus;
};

export default function OrderStatusUpdater({ orderId, currentStatus }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<OrderStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  const unchanged = selected === currentStatus;

  async function handleUpdate() {
    if (unchanged) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selected }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to update status.");
        return;
      }

      toast.success("Order status updated!");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Select dropdown */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as OrderStatus)}
        disabled={loading}
        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 font-medium shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {STATUS_VALUES.map((value) => (
          <option key={value} value={value}>
            {t(STATUS_KEYS[value])}
          </option>
        ))}
      </select>

      {/* Save button */}
      <button
        onClick={handleUpdate}
        disabled={loading || unchanged}
        className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("updatingStatus")}
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4" />
            {t("updateStatus")}
          </>
        )}
      </button>

      {unchanged && !loading && (
        <span className="text-xs text-gray-400">{t("noChangesToSave")}</span>
      )}
    </div>
  );
}
