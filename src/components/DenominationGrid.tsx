import { formatCurrency } from "../lib/currency";
import { getCopy, type Language } from "../i18n/translations";
import type { CashState, Denomination } from "../lib/types";

type Props = {
  denominations: readonly Denomination[];
  counts: CashState;
  onSelect: (_denom: Denomination) => void;
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
  const sectionLabel = copy.gridSectionLabel;

  return (
    <section aria-label={sectionLabel} className="mt-7 grid grid-cols-3 gap-3 sm:gap-4">
      {denominations.map((denom) => {
        const count = counts[denom] ?? 0;
        const isRecent = recentDenom === denom;
        const subtotal = denom * count;
        const formattedDenom = formatCurrency(denom);
        const hasValue = count > 0;
        return (
          <button
            key={denom}
            type="button"
            onClick={() => onSelect(denom)}
            className={`group flex h-30 flex-col items-center justify-center space-y-2 rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition-all duration-150 hover:-translate-y-1 hover:shadow-md active:scale-[0.99] dark:border-zinc-700 dark:bg-zinc-800 ${
              isRecent ? "animate-pulse-scale" : ""
            }`}
            aria-label={copy.gridSelectAria(formattedDenom, count)}
          >
            <span className="flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white">
              {formattedDenom}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {copy.gridCountBadge(count)}
            </span>
            <span
              className={`text-sm font-medium ${
                hasValue ? "text-slate-700 dark:text-slate-300" : "text-neutral-400 dark:text-neutral-500"
              }`}
            >
              {formatCurrency(subtotal)}
            </span>
          </button>
        );
      })}
    </section>
  );
};
