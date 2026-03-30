import { useState } from 'react';
import type { CostItem } from './data';

type CostLedgerProps = {
  items: CostItem[];
  currentStage: string;
  nextStage: string;
};

export default function CostLedger({ items, currentStage, nextStage }: CostLedgerProps) {
  const requiredNow = items.filter((item) => item.dueStage === currentStage);
  const requiredNext = items.filter((item) => item.dueStage === nextStage);
  const majorUpcoming = items.filter((item) =>
    item.dueStage.toLowerCase().includes("transfer")
  );

  const [openKey, setOpenKey] = useState<"now" | "next" | "transfer" | null>("next");

  const headlineAmount = (list: CostItem[]) => {
    if (list.length === 0) return "None";
    const primary = list[0].expectedRange;
    return list.length > 1 ? `${primary} +` : primary;
  };

  const timingHint = (item: CostItem) => {
    if (item.dueStage === currentStage) return "Now";
    if (item.dueStage === nextStage) return "Next ~1–2 weeks";
    if (item.dueStage.toLowerCase().includes("transfer")) return "At transfer";
    return `Later · ~${item.dueInWeeks} weeks`;
  };

  const parseAED = (value?: string) => {
    if (!value) return 0;
    const normalized = value.replace(/,/g, "").toLowerCase();
    const number = Number(normalized.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(number)) return 0;
    if (normalized.includes("k")) return number * 1000;
    if (normalized.includes("m")) return number * 1_000_000;
    return number;
  };

  const estimatedTotal = items.reduce((sum, item) => sum + parseAED(item.quotedAmount), 0);
  const formatAED = (amount: number) => {
    if (amount >= 1_000_000) return `AED ${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1000) return `AED ${(amount / 1000).toFixed(0)}k`;
    return `AED ${amount.toFixed(0)}`;
  };

  const checkpoints: Array<{ key: "now" | "next" | "transfer"; label: string; items: CostItem[] }> = [
    { key: "now", label: "Now", items: requiredNow },
    { key: "next", label: "Next", items: requiredNext },
    { key: "transfer", label: "Transfer", items: majorUpcoming }
  ];

  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-title">Cost ledger</p>
          <h2 className="mt-2 font-display text-2xl text-ink-950">Cost expectations</h2>
          <p className="mt-1 text-sm text-ink-600">Estimates only; final amounts can change.</p>
        </div>
        <span className="stat-pill">Cash readiness</span>
      </div>

      <div className="mt-6 rounded-2xl bg-fog-50 px-5 py-4">
        <div className="relative mt-2 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="absolute left-0 top-5 hidden h-px w-full bg-fog-200 md:block" />
          {checkpoints.map((checkpoint, index) => {
            const isOpen = openKey === checkpoint.key;
            return (
              <button
                key={checkpoint.key}
                type="button"
                onClick={() => setOpenKey(isOpen ? null : checkpoint.key)}
                className="relative z-10 flex w-full flex-col gap-2 rounded-2xl bg-white/80 px-4 py-3 text-left transition hover:bg-white md:w-1/3"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      index === 0 ? "bg-amber-500" : index === 1 ? "bg-reed-500" : "bg-ink-200"
                    }`}
                  />
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-400">
                    {checkpoint.label}
                  </p>
                </div>
                <p className={`text-base font-semibold ${checkpoint.key === "now" ? "text-amber-700" : "text-ink-950"}`}>
                  {headlineAmount(checkpoint.items)}
                </p>
                <p className="text-xs text-ink-400">
                  {checkpoint.key === "now" ? "Have ready now" : checkpoint.key === "next" ? "Coming up next" : "At transfer"}
                </p>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm font-medium text-ink-600">
          Estimated total acquisition cost:{" "}
          <span className="font-semibold text-ink-950">{formatAED(estimatedTotal)}</span>
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {checkpoints.map((checkpoint) => {
          const isOpen = openKey === checkpoint.key;
          if (!isOpen) return null;
          return (
            <div key={checkpoint.key} className="rounded-2xl bg-white/80 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-400">
                {checkpoint.label} breakdown
              </p>
              <div className="mt-3 space-y-3">
                {checkpoint.items.length === 0 ? (
                  <p className="text-sm text-ink-600">No payments expected in this window.</p>
                ) : (
                  checkpoint.items.map((item) => (
                    <div key={item.name} className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-ink-950">{item.name}</p>
                        <p className="text-xs text-ink-400">{timingHint(item)}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${checkpoint.key === "now" ? "text-amber-700" : "text-ink-900"}`}>
                          {item.expectedRange}
                        </p>
                        {item.quotedAmount && item.quotedAmount !== item.expectedRange && (
                          <p className="text-xs text-ink-400">Quoted: {item.quotedAmount}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
