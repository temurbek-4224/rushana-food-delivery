"use client";

import Link from "next/link";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Restaurant = {
  id: string;
  name: string;
  description: string | null;
  address: string;
  phone: string | null;
  imageUrl: string | null;
  isOpen: boolean;
  _count?: { categories: number };
};

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: Props) {
  const { t } = useLanguage();

  return (
    <div className="group flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Image */}
      <div className="relative h-48 bg-orange-50 overflow-hidden flex-shrink-0">
        {restaurant.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl select-none">
            🍴
          </div>
        )}

        {/* Open / Closed badge */}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow ${
            restaurant.isOpen ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {restaurant.isOpen ? t("openNow") : t("closed")}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 gap-2">
        <h3 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-orange-500 transition-colors">
          {restaurant.name}
        </h3>

        {restaurant.description && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto pt-3 flex flex-col gap-1.5 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-orange-400" />
            <span className="truncate">{restaurant.address}</span>
          </span>
          {restaurant.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 flex-shrink-0 text-orange-400" />
              {restaurant.phone}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/restaurants/${restaurant.id}`}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 active:scale-95 transition-all"
        >
          {t("viewMenu")}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
