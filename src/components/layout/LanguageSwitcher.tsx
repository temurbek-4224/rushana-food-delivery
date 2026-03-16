"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import type { Language } from "@/i18n/types";

const LANGS: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "uz", label: "UZ" },
  { value: "ru", label: "RU" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
      {LANGS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setLang(value)}
          className={cn(
            "px-2.5 py-1 text-xs font-semibold transition-colors",
            lang === value
              ? "bg-orange-500 text-white"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
