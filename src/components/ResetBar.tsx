import { getCopy, type Language } from "../lib/i18n";

interface Props {
  onReset: () => void;
  isDisabled: boolean;
  language: Language;
  onLanguageChange: (_language: Language) => void;
}

export const ResetBar = ({ onReset, isDisabled, language, onLanguageChange }: Props) => {
  const copy = getCopy(language);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className="touch-target w-full rounded-3xl border border-red-400 bg-red-50 px-4 py-3 text-base font-semibold text-red-500 transition active:bg-red-100 disabled:opacity-60 dark:border-red-500/60 dark:bg-red-950/40 dark:text-red-400"
        onClick={onReset}
        disabled={isDisabled}
      >
        {copy.reset.button}
      </button>
      <div className="flex gap-2">
        <LanguageButton
          label={copy.language.vi}
          isActive={language === "vi"}
          onClick={() => onLanguageChange("vi")}
        />
        <LanguageButton
          label={copy.language.zh}
          isActive={language === "zh"}
          onClick={() => onLanguageChange("zh")}
        />
      </div>
    </div>
  );
};

type LanguageButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const LanguageButton = ({ label, isActive, onClick }: LanguageButtonProps) => (
  <button
    type="button"
    className={`flex-1 rounded-2xl border px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "border-primary bg-primary text-white shadow-card"
        : "border-primary/20 bg-neutral-100 text-neutral-600 active:bg-primary/10 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);
