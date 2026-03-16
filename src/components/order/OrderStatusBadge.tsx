"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import type { Translations } from "@/i18n/types";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

const config: Record<
  OrderStatus,
  { i18nKey: keyof Translations; classes: string; dot: string }
> = {
  PENDING:    { i18nKey: "pending",    classes: "bg-yellow-50 text-yellow-700 border-yellow-200", dot: "bg-yellow-400"  },
  CONFIRMED:  { i18nKey: "confirmed",  classes: "bg-blue-50   text-blue-700   border-blue-200",   dot: "bg-blue-400"    },
  PREPARING:  { i18nKey: "preparing",  classes: "bg-orange-50 text-orange-700 border-orange-200", dot: "bg-orange-400"  },
  ON_THE_WAY: { i18nKey: "onTheWay",  classes: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-400"  },
  DELIVERED:  { i18nKey: "delivered",  classes: "bg-green-50  text-green-700  border-green-200",  dot: "bg-green-400"   },
  CANCELLED:  { i18nKey: "cancelled",  classes: "bg-gray-100  text-gray-500   border-gray-200",   dot: "bg-gray-400"    },
};

export default function OrderStatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const { t } = useLanguage();
  const cfg = config[status as OrderStatus] ?? config.PENDING;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        cfg.classes,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {t(cfg.i18nKey)}
    </span>
  );
}
