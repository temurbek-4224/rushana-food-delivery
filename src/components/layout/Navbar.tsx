"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingCart,
  UtensilsCrossed,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { t } = useLanguage();
  const user = session?.user;
  const isLoading = status === "loading";

  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = useCallback(async () => {
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        const count: number =
          data.items?.reduce(
            (sum: number, item: { quantity: number }) => sum + item.quantity,
            0
          ) ?? 0;
        setCartCount(count);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (user?.role === "CUSTOMER") {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [user, fetchCartCount]);

  useEffect(() => {
    window.addEventListener("cart:updated", fetchCartCount);
    return () => window.removeEventListener("cart:updated", fetchCartCount);
  }, [fetchCartCount]);

  async function handleLogout() {
    await signOut({ redirect: false });
    setCartCount(0);
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <UtensilsCrossed className="h-6 w-6 text-orange-500" />
          <span className="text-orange-500">Rushana</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language switcher — always visible */}
          <LanguageSwitcher />

          {isLoading ? (
            <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-100" />
          ) : user ? (
            <>
              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("admin")}</span>
                </Link>
              )}

              {user.role === "CUSTOMER" && (
                <>
                  <Link
                    href="/orders"
                    className="hidden sm:block text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    {t("myOrders")}
                  </Link>

                  <Link
                    href="/cart"
                    className="relative flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {/* Avatar + name */}
              <div className="flex items-center gap-2">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name ?? "User"}
                    width={32}
                    height={32}
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full ring-2 ring-orange-100 object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-sm font-bold select-none">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                )}
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
                title={t("logout")}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t("logout")}</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 active:scale-95 transition-all"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" fillOpacity="0.9" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" fillOpacity="0.9" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white" fillOpacity="0.9" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" fillOpacity="0.9" />
              </svg>
              {t("loginWithGoogle")}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
