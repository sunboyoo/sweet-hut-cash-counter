import { formatCurrency } from "../lib/currency";
import { getCopy, type Language } from "../i18n/translations";
import type { BillEntry } from "../lib/types";

type Props = {
  entries: BillEntry[];
  onEdit: (_denom: BillEntry["denom"]) => void;
  language: Language;
};

export const EnteredList = ({ entries, onEdit, language }: Props) => {
  const copy = getCopy(language);

  if (entries.length === 0) {
    return (
      <div className="px-4 pb-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {copy.emptyListHint}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3 px-4 pb-6">
      {entries.map((entry) => {
        const subtotal = entry.denom * entry.count;
        return (
          <li key={entry.denom}>
            <button
              type="button"
              onClick={() => onEdit(entry.denom)}
              className="touch-target w-full rounded-3xl border border-primary/10 bg-white px-4 py-3 text-left shadow-sm transition active:bg-primary/10 dark:border-neutral-700 dark:bg-neutral-900"
              aria-label={copy.listEditAria(formatCurrency(entry.denom), entry.count)}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                    {formatCurrency(entry.denom)}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {copy.listCountLabel(entry.count)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">{copy.listSubtotalLabel}</div>
                  <div className="text-lg font-semibold text-primary-dark dark:text-primary-light">
                    {formatCurrency(subtotal)}
                  </div>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
