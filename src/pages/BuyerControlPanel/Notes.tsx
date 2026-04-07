import { useState } from 'react';
import type { FaqItem } from './data';

type CommonQuestionsProps = {
  items: FaqItem[];
};

export default function CommonQuestions({ items }: CommonQuestionsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-card p-6 sm:p-8">
      <div>
        <p className="section-title">Common questions</p>
        <h2 className="mt-2 font-display text-2xl text-ink-950">Things buyers always ask</h2>
        <p className="mt-1 text-sm text-ink-400">
          So you don't have to ask Mallika again.
        </p>
      </div>

      <div className="mt-6 space-y-2">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-colors ${
                isOpen ? "border-fog-200 bg-white shadow-bcp-soft" : "border-transparent bg-fog-50"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <p className="text-sm font-semibold text-ink-950">{item.question}</p>
                <span className="shrink-0 text-xs text-ink-400">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-ink-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
