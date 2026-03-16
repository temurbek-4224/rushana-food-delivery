"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

type RestaurantData = {
  id: string;
  name: string;
  description: string | null;
  address: string;
  phone: string | null;
  imageUrl: string | null;
  isOpen: boolean;
};

type Props = {
  restaurant?: RestaurantData; // undefined = create mode
};

// ─── Shared input / label styles ─────────────────────────────────────────────
const inputCls =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-400";

const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";

export default function RestaurantForm({ restaurant }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const isEdit = !!restaurant;

  const [name,        setName]        = useState(restaurant?.name        ?? "");
  const [description, setDescription] = useState(restaurant?.description ?? "");
  const [address,     setAddress]     = useState(restaurant?.address     ?? "");
  const [phone,       setPhone]       = useState(restaurant?.phone       ?? "");
  const [imageUrl,    setImageUrl]    = useState(restaurant?.imageUrl    ?? "");
  const [isOpen,      setIsOpen]      = useState(restaurant?.isOpen      ?? true);
  const [loading,     setLoading]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim())    { toast.error("Name is required.");    return; }
    if (!address.trim()) { toast.error("Address is required."); return; }

    const body = {
      name:        name.trim(),
      description: description.trim() || null,
      address:     address.trim(),
      phone:       phone.trim()    || null,
      imageUrl:    imageUrl.trim() || null,
      isOpen,
    };

    setLoading(true);
    try {
      const url    = isEdit ? `/api/admin/restaurants/${restaurant.id}` : "/api/admin/restaurants";
      const method = isEdit ? "PATCH" : "POST";

      const res  = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong.");
        return;
      }

      if (isEdit) {
        toast.success("Restaurant updated!");
      } else {
        toast.success("Restaurant created!");
        router.push(`/admin/restaurants/${(data.restaurant as { id: string }).id}`);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Row: name + phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>
            {t("nameLabel")} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Burger House"
            className={inputCls}
            disabled={loading}
          />
        </div>

        <div>
          <label className={labelCls}>
            {t("phoneLabel")}{" "}
            <span className="text-gray-400 font-normal">{t("optional")}</span>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555-000-0000"
            className={inputCls}
            disabled={loading}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className={labelCls}>
          {t("addressLabel")} <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, City, State"
          className={inputCls}
          disabled={loading}
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelCls}>
          {t("descriptionLabel")}{" "}
          <span className="text-gray-400 font-normal">{t("optional")}</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description shown to customers"
          rows={3}
          className={cn(inputCls, "resize-none")}
          disabled={loading}
        />
      </div>

      {/* Image URL */}
      <div>
        <label className={labelCls}>
          {t("imageUrlLabel")}{" "}
          <span className="text-gray-400 font-normal">{t("optional")}</span>
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className={inputCls}
          disabled={loading}
        />
      </div>

      {/* isOpen toggle */}
      <div>
        <label className={labelCls}>{t("statusLabel")}</label>
        <label className="inline-flex items-center gap-3 cursor-pointer">
          {/* Toggle switch */}
          <div className="relative" onClick={() => !loading && setIsOpen((v) => !v)}>
            <div
              className={cn(
                "h-6 w-11 rounded-full transition-colors",
                isOpen ? "bg-orange-500" : "bg-gray-200"
              )}
            />
            <div
              className={cn(
                "absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform",
                isOpen ? "translate-x-6" : "translate-x-1"
              )}
            />
          </div>
          <span className="text-sm text-gray-700">
            {isOpen ? t("openAccepting") : t("closedNotAccepting")}
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("saving")}
            </>
          ) : isEdit ? (
            t("saveChanges")
          ) : (
            t("createRestaurant")
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/restaurants")}
          disabled={loading}
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
}
