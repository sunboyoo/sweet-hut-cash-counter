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
          className="touch-target block rounded-3xl p-4 text-white shadow-lg transition-transform active:scale-95"
          style={{ backgroundColor: card.color }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">{card.title}</h3>
              <p className="mt-1 text-sm opacity-90">{card.description}</p>
            </div>
            <svg
              className="h-6 w-6 opacity-75"
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

