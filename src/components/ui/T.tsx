"use client";

/**
 * T — Translation component for use inside server-component pages.
 *
 * Usage:
 *   import { T } from "@/components/ui/T";
 *   <h1><T k="myOrdersTitle" /></h1>
 *
 * On the first server render it shows English (the default language).
 * After client-side hydration it updates to the user's saved language.
 */

import { useLanguage } from "@/context/LanguageContext";
import type { Translations } from "@/i18n/types";

export function T({ k }: { k: keyof Translations }) {
  const { t } = useLanguage();
  return <>{t(k)}</>;
}
