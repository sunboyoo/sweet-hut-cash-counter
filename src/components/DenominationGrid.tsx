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
    <section
      aria-label={sectionLabel}
      className="mt-6 grid grid-cols-3 gap-2"
    >
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
            className={`flex h-24 flex-col justify-between rounded-3xl border border-primary/10 bg-white/95 p-3 text-left shadow-sm transition-all active:bg-primary/10 dark:bg-neutral-900/90 dark:border-neutral-700 ${
              isRecent ? "animate-pulse-scale shadow-card" : ""
            }`}
            aria-label={copy.gridSelectAria(formattedDenom, count)}
          >
            <div className="flex flex-col gap-1">
              <span className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                {formattedDenom}
              </span>
              {count > 0 && (
                <div className="flex items-center justify-between rounded-2xl bg-primary/10 px-2 py-1 text-[13px] font-medium text-primary-dark dark:bg-primary/20 dark:text-primary-light">
                  <span>{copy.gridCountBadge(count)}</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </section>
  );
};
