import { useState } from "react";
import { getCopy, type Language } from "../i18n/translations";

interface Props {
  onCancel: () => void;
  onConfirm: (_options: { skipNext: boolean }) => void;
  language: Language;
}

export const ResetConfirmSheet = ({ onCancel, onConfirm, language }: Props) => {
  const [skipNext, setSkipNext] = useState(false);
  const copy = getCopy(language);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-neutral-900/40 backdrop-blur-sm" role="dialog" aria-modal="true">
      <button type="button" aria-label={copy.reset.cancel} className="flex-1" onClick={onCancel} />
      <div className="safe-bottom rounded-t-3xl bg-white p-5 shadow-2xl dark:bg-neutral-950">
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{copy.reset.confirmTitle}</h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{copy.reset.confirmMessage}</p>
        <label className="mt-4 flex items-center gap-3 rounded-2xl bg-neutral-100 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border border-neutral-300 text-primary focus:ring-primary"
            checked={skipNext}
            onChange={(event) => setSkipNext(event.target.checked)}
          />
          {copy.reset.skipLabel}
        </label>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            className="flex-1 touch-target rounded-3xl border border-primary/20 px-4 py-3 text-base font-medium text-primary-dark transition active:bg-primary/10"
            onClick={onCancel}
          >
            {copy.reset.cancel}
          </button>
          <button
            type="button"
            className="flex-1 touch-target rounded-3xl border border-red-400 bg-red-500 px-4 py-3 text-base font-semibold text-white transition active:bg-red-600"
            onClick={() => onConfirm({ skipNext })}
          >
            {copy.reset.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};
