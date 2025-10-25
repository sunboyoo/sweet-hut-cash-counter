import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Language, type Translations } from "../../i18n/translations";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "app-language";
const LEGACY_STORAGE_KEY = "sweet-hut-cash-counter-language";
const VALID_LANGUAGES: Language[] = ["vi", "en", "zh"];

const isValidLanguage = (value: string): value is Language =>
  VALID_LANGUAGES.some((lang) => lang === value);

const getSavedLanguage = (): Language => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return "vi";
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    if (saved && isValidLanguage(saved)) {
      return saved as Language;
    }
  } catch (error) {
    console.warn("Failed to read language from localStorage:", error);
  }

  return "vi";
};

const saveLanguage = (lang: Language): void => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, lang);
    localStorage.setItem(LEGACY_STORAGE_KEY, lang);
  } catch (error) {
    console.warn("Failed to save language to localStorage:", error);
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getSavedLanguage);

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (isValidLanguage(lang)) {
      setLanguageState(lang);
    } else {
      console.warn(`Invalid language: ${lang}, using default 'vi'`);
      setLanguageState("vi");
    }
  };

  const t = translations[language] || translations.vi;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
