import { getCopy } from "../i18n/translations";
import { useLanguage } from "./contexts/LanguagecContext";

interface Props {
  onReset: () => void;
  isDisabled: boolean;
}

export const ResetBar = ({ onReset, isDisabled }: Props) => {
  const { language } = useLanguage();
  const copy = getCopy(language);

  return (
    <footer className="pt-6 pb-2">
      <button
        type="button"
        className="touch-target flex w-full items-center justify-center space-x-2 rounded-full bg-red-500 py-3 px-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-red-600 active:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800"
        onClick={onReset}
        disabled={isDisabled}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m-4 0h12"
          />
        </svg>
        <span>{copy.reset.button}</span>
      </button>
    </footer>
  );
};
