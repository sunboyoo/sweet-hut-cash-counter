import { getCopy, type Language } from "../lib/i18n";

type Props = {
  language: Language;
};

export const LinkCards = ({ language }: Props) => {
  const copy = getCopy(language);
  const { cards } = copy.links;

  return (
    <div className="mt-8 flex flex-col gap-3 pb-8">
      {cards.map((card) => (
        <a
          key={card.id}
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target block rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-sm transition-all active:scale-98 active:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:active:bg-neutral-800"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{card.title}</h3>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{card.description}</p>
            </div>
            <svg
              className="h-5 w-5 flex-shrink-0 text-neutral-400 dark:text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </a>
      ))}
    </div>
  );
};

