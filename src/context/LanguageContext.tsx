"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations } from "@/i18n";
import type { Language, Translations } from "@/i18n/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof Translations) => string;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  // Default t() works on server render before provider hydrates
  t: (key) => translations.en[key],
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  // Read persisted language from localStorage after first mount (client-only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rushana_lang") as Language | null;
      if (saved && (saved === "en" || saved === "uz" || saved === "ru")) {
        setLangState(saved);
      }
    } catch {
      // localStorage unavailable in some environments — silently ignore
    }
  }, []);

  function setLang(newLang: Language) {
    setLangState(newLang);
    try {
      localStorage.setItem("rushana_lang", newLang);
    } catch {
      // ignore
    }
  }

  /** Translate a key. Falls back to English, then to the key itself. */
  function t(key: keyof Translations): string {
    return translations[lang][key] ?? translations.en[key] ?? String(key);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/** Use inside any client component to access the current language and translate. */
export function useLanguage() {
  return useContext(LanguageContext);
}
