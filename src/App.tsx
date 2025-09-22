import { useEffect, useMemo, useRef, useState } from "react";
import { CountInputSheet } from "./components/CountInputSheet";
import { DenominationGrid } from "./components/DenominationGrid";
import { EnteredList } from "./components/EnteredList";
import { ResetBar } from "./components/ResetBar";
import { ResetConfirmSheet } from "./components/ResetConfirmSheet";
import { useAnimatedNumber } from "./hooks/useAnimatedNumber";
import { formatCurrency } from "./lib/currency";
import { getCopy, type Language } from "./lib/i18n";
import type { CashState, Denomination } from "./lib/types";

const DENOMINATIONS: Denomination[] = [
  500000,
  200000,
  100000,
  50000,
  20000,
  10000,
  5000,
  2000,
  1000,
];

const STORAGE_KEY = "cash-counter-state";
const RESET_SKIP_KEY = "cash-counter-reset-skip";
const LANGUAGE_KEY = "cash-counter-language";

const loadCashState = (): CashState => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CashState;
    return parsed ?? {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

const loadResetSkip = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(RESET_SKIP_KEY) === "true";
};

const loadLanguage = (): Language => {
  if (typeof window === "undefined") return "vi";
  const stored = window.localStorage.getItem(LANGUAGE_KEY);
  return stored === "zh" ? "zh" : "vi";
};

export default function App() {
  const [cashState, setCashState] = useState<CashState>(() => loadCashState());
  const [skipResetConfirm, setSkipResetConfirm] = useState(() => loadResetSkip());
  const [language, setLanguage] = useState<Language>(() => loadLanguage());
  const [activeDenom, setActiveDenom] = useState<Denomination | null>(null);
  const [recentDenom, setRecentDenom] = useState<Denomination | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const recentTimerRef = useRef<number | null>(null);
  const copy = getCopy(language);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cashState));
  }, [cashState]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(RESET_SKIP_KEY, String(skipResetConfirm));
  }, [skipResetConfirm]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const entries = useMemo(() => {
    return DENOMINATIONS.filter((denom) => (cashState[denom] ?? 0) > 0).map((denom) => ({
      denom,
      count: cashState[denom] ?? 0,
    }));
  }, [cashState]);

  const totalNotes = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.count, 0),
    [entries],
  );

  const totalAmount = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.count * entry.denom, 0),
    [entries],
  );

  const displayTotal = useAnimatedNumber(totalAmount);

  const handleCountChange = (denom: Denomination, count: number) => {
    setCashState((prev) => {
      const next = { ...prev } as CashState;
      if (count > 0) {
        next[denom] = count;
      } else {
        delete next[denom];
      }
      return next;
    });
    if (recentTimerRef.current) {
      window.clearTimeout(recentTimerRef.current);
    }
    setRecentDenom(denom);
    recentTimerRef.current = window.setTimeout(() => {
      setRecentDenom(null);
      recentTimerRef.current = null;
    }, 900);
  };

  const handleRemoveDenom = (denom: Denomination) => {
    setCashState((prev) => {
      const next = { ...prev } as CashState;
      delete next[denom];
      return next;
    });
  };

  const handleResetRequest = () => {
    if (entries.length === 0 && !totalAmount) return;
    if (skipResetConfirm) {
      performReset();
    } else {
      setShowResetConfirm(true);
    }
  };

  const performReset = () => {
    setCashState({});
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface via-white to-surface dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col px-4 pb-16">
        <header className="pt-[calc(1.2rem+env(safe-area-inset-top))] text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-primary-dark dark:text-primary-light">
            {`SWEET HUT ${copy.titleSuffix}`}
          </h1>
          <div className="mt-4 rounded-3xl bg-white/90 p-6 shadow-card backdrop-blur-sm dark:bg-neutral-900/90">
            <div className="text-sm text-neutral-500 dark:text-neutral-400">{copy.totalLabel}</div>
            <div className="mt-2 text-3xl font-bold text-primary-dark dark:text-primary-light">
              {formatCurrency(displayTotal)}
            </div>
            <div className="mt-2 flex items-center justify-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary-dark dark:bg-primary/20 dark:text-primary-light">
                {copy.notesCount(totalNotes)}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-200">
                {copy.denominationsCount(entries.length)}
              </span>
            </div>
          </div>
        </header>

        <DenominationGrid
          denominations={DENOMINATIONS}
          counts={cashState}
          onSelect={(denom) => setActiveDenom(denom)}
          recentDenom={recentDenom}
          language={language}
        />

        <div className="mt-8 flex flex-col gap-4 pb-6">
          <ResetBar
            onReset={handleResetRequest}
            isDisabled={entries.length === 0}
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {activeDenom && (
          <CountInputSheet
            denom={activeDenom}
            initialCount={cashState[activeDenom] ?? 0}
            onClose={() => setActiveDenom(null)}
            onSave={(count) => handleCountChange(activeDenom, count)}
            onRemove={() => handleRemoveDenom(activeDenom)}
            language={language}
          />
        )}

        {showResetConfirm && (
          <ResetConfirmSheet
            onCancel={() => setShowResetConfirm(false)}
            onConfirm={({ skipNext }) => {
              setSkipResetConfirm(skipNext);
              performReset();
            }}
            language={language}
          />
        )}
      </div>
    </div>
  );
}
