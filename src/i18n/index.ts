import en from "./en";
import uz from "./uz";
import ru from "./ru";
import type { Language, Translations } from "./types";

export const translations: Record<Language, Translations> = { en, uz, ru };
export type { Language, Translations };
