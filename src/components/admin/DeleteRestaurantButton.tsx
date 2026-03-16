"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";

type Props = { restaurantId: string; restaurantName: string };

export default function DeleteRestaurantButton({
  restaurantId,
  restaurantName,
}: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (
      !confirm(
        `Delete "${restaurantName}"?\n\nAll categories and menu items will also be deleted. This cannot be undone.`
      )
    )
      return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/restaurants/${restaurantId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error((data as { error?: string }).error ?? "Failed to delete.");
        return;
      }

      toast.success("Restaurant deleted.");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
      {t("deleteBtn")}
    </button>
  );
}
