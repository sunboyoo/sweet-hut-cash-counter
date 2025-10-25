import { useState } from "react";
import { useLanguage } from "../contexts/LanguagecContext";
import { type Language } from "../../i18n/translations";

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "vi", label: t.vietnamese, flag: "🇻🇳" },
    { code: "en", label: t.english, flag: "🇬🇧" },
    { code: "zh", label: t.chinese, flag: "🇨🇳" },
  ];

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span className="text-lg">{currentLang?.flag}</span>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label={t.closeLanguageMenu}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full left-0 z-20 mb-2 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            {languages.map((lang) => (
              <button
                type="button"
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center space-x-2 px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
                  language === lang.code
                    ? "bg-blue-50 font-medium text-primary"
                    : "text-gray-700"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
