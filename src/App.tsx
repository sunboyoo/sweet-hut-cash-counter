import { useEffect, useMemo, useRef, useState } from "react";
import { CountInputSheet } from "./components/CountInputSheet";
import { DenominationGrid } from "./components/DenominationGrid";
import { LanguageSwitcher } from "./components/common/LanguageSwitcher";
import { ResetBar } from "./components/ResetBar";
import { ResetConfirmSheet } from "./components/ResetConfirmSheet";
import { useAnimatedNumber } from "./hooks/useAnimatedNumber";
import { formatCurrency } from "./lib/currency";
import { getCopy } from "./i18n/translations";
import type { CashState, Denomination } from "./lib/types";
import { useLanguage } from "./components/contexts/LanguagecContext";

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

const STORAGE_KEY = "sweet-hut-cash-counter-state";
const RESET_SKIP_KEY = "sweet-hut-cash-counter-reset-skip";
const HOME_LINK_URL = "https://sweet-hut-nav.vercel.app/";

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

export default function App() {
  const { language } = useLanguage();
  const [cashState, setCashState] = useState<CashState>(() => loadCashState());
  const [skipResetConfirm, setSkipResetConfirm] = useState(() => loadResetSkip());
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
    <div className="min-h-screen bg-[#e9eef5] pb-6 transition-colors dark:bg-neutral-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[460px] flex-col px-5 pb-20">
        <header className="pt-[calc(1.6rem+env(safe-area-inset-top))] text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#143f29] drop-shadow-sm dark:text-primary-light">
            {`SWEET HUT ${copy.titleSuffix}`}
          </h1>
          <div className="mt-6 rounded-[28px] border border-white/10 bg-gradient-to-br from-primary-dark to-primary px-8 py-7 text-white shadow-[0_26px_60px_-28px_rgba(18,92,52,0.55)] dark:bg-primary-dark">
            <div className="text-sm font-medium uppercase tracking-[0.12em] text-white/75">
              {copy.totalLabel}
            </div>
            <div className="mt-3 text-5xl font-semibold leading-tight drop-shadow-sm">
              {formatCurrency(displayTotal)}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-4 py-1.5 text-white/90 shadow-inner">
                {copy.notesCount(totalNotes)}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-4 py-1.5 text-white/90 shadow-inner">
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

        <div className="mt-8 flex flex-col gap-4">
          <ResetBar onReset={handleResetRequest} isDisabled={entries.length === 0} />
        </div>

        <div className="mt-6 flex justify-center pb-2">
          <LanguageSwitcher />
        </div>

        <div className="flex justify-center pb-6">
          <a
            href={HOME_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            {copy.homeLinkLabel}
          </a>
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
