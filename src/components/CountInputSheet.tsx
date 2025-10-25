import { useEffect, useMemo, useRef, useState } from "react";
import { formatCurrency } from "../lib/currency";
import { getCopy, type Language } from "../i18n/translations";
import type { Denomination } from "../lib/types";

const MAX_COUNT = 9999;

type Props = {
  denom: Denomination;
  initialCount: number;
  onClose: () => void;
  onSave: (_count: number) => void;
  onRemove: () => void;
  language: Language;
};

const clamp = (value: number) => Math.max(0, Math.min(MAX_COUNT, value));

export const CountInputSheet = ({
  denom,
  initialCount,
  onClose,
  onSave,
  onRemove,
  language,
}: Props) => {
  const [count, setCount] = useState(() => clamp(initialCount));
  const [showStepper, setShowStepper] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const repeatTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const copy = getCopy(language);
  const locale = language === "vi" ? "vi-VN" : language === "en" ? "en-US" : "zh-CN";
  const maxDisplay = MAX_COUNT.toLocaleString(locale);
  const formattedDenom = formatCurrency(denom);

  useEffect(() => {
    setCount(clamp(initialCount));
  }, [initialCount]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!showStepper && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showStepper]);

  useEffect(() => {
    return () => {
      if (repeatTimer.current) {
        clearInterval(repeatTimer.current);
        repeatTimer.current = null;
      }
    };
  }, []);

  const subtotal = useMemo(() => count * denom, [count, denom]);

  const commit = () => {
    if (Number.isNaN(count) || count < 0) {
      setError(copy.sheet.invalidCount);
      return;
    }
    if (count > MAX_COUNT) {
      setError(copy.sheet.maxCount(maxDisplay));
      return;
    }
    setError(null);
    onSave(count);
    onClose();
  };

  const adjustCount = (delta: number) => {
    setCount((current) => clamp(current + delta));
  };

  const handlePointerHold = (delta: number) => {
    adjustCount(delta);
    if (repeatTimer.current) {
      clearInterval(repeatTimer.current);
    }
    repeatTimer.current = setInterval(() => adjustCount(delta), 140);
  };

  const stopHold = () => {
    if (repeatTimer.current) {
      clearInterval(repeatTimer.current);
      repeatTimer.current = null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-neutral-900/40 backdrop-blur-sm" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label={copy.sheet.cancel}
        className="flex-1"
        onClick={onClose}
      />
      <div className="safe-bottom rounded-t-3xl bg-white p-4 shadow-2xl dark:bg-neutral-950">
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <header className="mb-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">{copy.sheet.denominationLabel}</div>
            <div className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">{formattedDenom}</div>
          </div>
          <button
            type="button"
            className="rounded-full bg-neutral-100 px-3 py-2 text-sm text-neutral-500 transition active:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
            onClick={() => setShowStepper((prev) => !prev)}
          >
            {showStepper ? copy.sheet.toggleDirect : copy.sheet.toggleStepper}
          </button>
        </header>

        {showStepper ? (
          <div className="mb-3 flex items-center justify-between rounded-3xl bg-neutral-100 px-4 py-3 dark:bg-neutral-900">
            <HoldButton
              ariaLabel={copy.sheet.decrementAria}
              onPress={() => adjustCount(-1)}
              onHold={() => handlePointerHold(-1)}
              onRelease={stopHold}
              icon="−"
              disabled={count === 0}
            />
            <div className="flex flex-col items-center">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">{copy.sheet.countLabel}</span>
              <span className="text-4xl font-semibold text-neutral-900 dark:text-neutral-50">
                {count.toLocaleString(locale)}
              </span>
            </div>
            <HoldButton
              ariaLabel={copy.sheet.incrementAria}
              onPress={() => adjustCount(1)}
              onHold={() => handlePointerHold(1)}
              onRelease={stopHold}
              icon="+"
              disabled={count >= MAX_COUNT}
            />
          </div>
        ) : (
          <div className="mb-3">
            <label className="mb-2 block text-sm text-neutral-500 dark:text-neutral-400" htmlFor="count-input">
              {copy.sheet.inputLabel(maxDisplay)}
            </label>
            <input
              ref={inputRef}
              id="count-input"
              inputMode="numeric"
              pattern="\\d*"
              aria-label={copy.sheet.directInputAria}
              className="w-full rounded-2xl border border-primary/20 bg-white px-4 py-3 text-3xl font-semibold text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
              value={count === 0 ? "" : count.toString()}
              placeholder="0"
              onChange={(event) => {
                const raw = event.target.value.replace(/[^0-9]/g, "");
                if (!raw) {
                  setCount(0);
                } else {
                  setCount(clamp(Number.parseInt(raw, 10)));
                }
              }}
            />
          </div>
        )}

        <div className="mb-4 flex items-center justify-between rounded-2xl bg-primary/10 px-4 py-3 text-sm text-primary-dark dark:bg-primary/20 dark:text-primary-light">
          <span>{copy.sheet.subtotalLabel}</span>
          <span className="text-lg font-semibold">{formatCurrency(subtotal)}</span>
        </div>

        {error && <p className="mb-2 text-sm text-accent-dark">{error}</p>}

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="touch-target rounded-3xl bg-primary px-4 py-3 text-lg font-semibold text-white shadow-card transition active:bg-primary-dark"
            onClick={commit}
          >
            {copy.sheet.confirm}
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 touch-target rounded-3xl border border-primary/20 px-4 py-3 text-base font-medium text-primary-dark transition active:bg-primary/10"
              onClick={onClose}
            >
              {copy.sheet.cancel}
            </button>
            <button
              type="button"
              className="flex-1 touch-target rounded-3xl border border-accent-dark px-4 py-3 text-base font-semibold text-accent-dark transition active:bg-accent/20"
              onClick={() => {
                setCount(0);
                onRemove();
                onClose();
              }}
            >
              {copy.sheet.delete}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type HoldButtonProps = {
  ariaLabel: string;
  icon: string;
  onPress: () => void;
  onHold: () => void;
  onRelease: () => void;
  disabled?: boolean;
};

const HoldButton = ({ ariaLabel, icon, onPress, onHold, onRelease, disabled }: HoldButtonProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    if (disabled) return;
    onPress();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onHold();
    }, 320);
  };

  const stop = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onRelease();
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      className="touch-target flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-4xl font-semibold text-primary shadow-sm transition active:scale-95 disabled:opacity-40 dark:bg-neutral-950"
      onPointerDown={(event) => {
        event.preventDefault();
        start();
      }}
      onPointerUp={(event) => {
        event.preventDefault();
        stop();
      }}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          onPress();
        }
      }}
      onKeyUp={(event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          stop();
        }
      }}
      onClick={(event) => event.preventDefault()}
    >
      {icon}
    </button>
  );
};
