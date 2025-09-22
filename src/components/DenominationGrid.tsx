import { formatCurrency } from "../lib/currency";
import { getCopy, type Language } from "../lib/i18n";
import type { CashState, Denomination } from "../lib/types";

type Props = {
  denominations: readonly Denomination[];
  counts: CashState;
  onSelect: (denom: Denomination) => void;
  recentDenom?: Denomination | null;
  language: Language;
};

export const DenominationGrid = ({
  denominations,
  counts,
  onSelect,
  recentDenom,
  language,
}: Props) => {
  const copy = getCopy(language);
  const sectionLabel = language === "zh" ? "选择面额" : "Chọn mệnh giá";

  return (
    <section aria-label={sectionLabel} className="mt-6 grid grid-cols-3 gap-2">
      {denominations.map((denom) => {
        const count = counts[denom] ?? 0;
        const isRecent = recentDenom === denom;
        const subtotal = denom * count;
        const formattedDenom = formatCurrency(denom);
        return (
          <button
            key={denom}
            type="button"
            onClick={() => onSelect(denom)}
            className={`flex h-28 flex-col items-center justify-center rounded-3xl border border-primary/10 bg-white/95 p-3 text-center shadow-lg transition-all active:bg-primary/10 dark:bg-neutral-900/90 dark:border-neutral-700 ${
              isRecent ? "animate-pulse-scale shadow-card" : ""
            }`}
            aria-label={copy.gridSelectAria(formattedDenom, count)}
          >
            <span className="text-sm text-neutral-900 dark:text-neutral-50">{formattedDenom}</span>
            <span
              className={`mt-1 w-full rounded-full px-2 py-0.5 text-sm ${
                count > 0
                  ? "bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary-light"
                  : "bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500"
              }`}
            >
              {copy.gridCountBadge(count)}
            </span>
            <span className="mt-1 text-sm font-medium text-primary-dark dark:text-primary-light">
              {formatCurrency(subtotal)}
            </span>
          </button>
        );
      })}
    </section>
  );
};
