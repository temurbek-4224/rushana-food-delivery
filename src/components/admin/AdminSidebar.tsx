"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Store, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

type NavItem = {
  href: string;
  labelKey: "dashboard" | "orders" | "restaurants";
  icon: React.ElementType;
  exact: boolean;
};

const navItems: NavItem[] = [
  { href: "/admin",             labelKey: "dashboard",   icon: LayoutDashboard, exact: true  },
  { href: "/admin/orders",      labelKey: "orders",      icon: ShoppingBag,     exact: false },
  { href: "/admin/restaurants", labelKey: "restaurants", icon: Store,           exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 min-h-screen flex flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
          <ChefHat className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-none">Rushana</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map(({ href, labelKey, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  active ? "text-orange-500" : "text-gray-400"
                )}
              />
              {t(labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-orange-500 transition-colors"
        >
          {t("backToSite")}
        </Link>
      </div>
    </aside>
  );
}
