import { useState } from 'react';
import type { CostItem } from './data';
import { AED_TO_SGD, depositCheque } from './data';

type CostLedgerProps = {
  items: CostItem[];
  propertyPriceAED: number;
  downPaymentAED: number;
  loanAmountAED: number;
  currentStageId: number;
};

function fmtAED(n: number): string {
  if (n >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `AED ${Math.round(n / 1_000)}k`;
  return `AED ${n.toLocaleString()}`;
}

function fmtSGD(aed: number): string {
  const sgd = aed * AED_TO_SGD;
  if (sgd >= 1_000_000) return `~SGD ${(sgd / 1_000_000).toFixed(2)}M`;
  if (sgd >= 1_000) return `~SGD ${Math.round(sgd / 1_000)}k`;
  return `~SGD ${Math.round(sgd).toLocaleString()}`;
}

function DualAmount({ aed }: { aed: number }) {
  return (
    <div className="text-right">
      <p className="text-sm font-semibold text-ink-950">{fmtAED(aed)}</p>
      <p className="text-xs text-ink-400">{fmtSGD(aed)}</p>
    </div>
  );
}

export default function CostLedger({
  items,
  propertyPriceAED,
  downPaymentAED,
  loanAmountAED,
  currentStageId,
}: CostLedgerProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const totalClosingCosts = items.reduce((sum, item) => sum + item.amountAED, 0);
  const nextItem = items.find((item) => item.dueStageId > currentStageId);
  const transferItems = items.filter((item) => item.dueStageId === 7);

  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-title">Money plan</p>
          <h2 className="mt-2 font-display text-2xl text-ink-950">What you'll need & when</h2>
          <p className="mt-1 text-sm text-ink-400">Estimates only · Not financial advice · Based on AED 1 ≈ SGD 0.35</p>
        </div>
      </div>

      {/* Investment overview */}
      <div className="mt-6 rounded-2xl bg-fog-50 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-ink-400">Investment overview</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs text-ink-400">Property price</p>
            <p className="mt-1 text-lg font-semibold text-ink-950">{fmtAED(propertyPriceAED)}</p>
            <p className="text-xs text-ink-400">{fmtSGD(propertyPriceAED)}</p>
          </div>
          <div>
            <p className="text-xs text-ink-400">Your down payment (40%)</p>
            <p className="mt-1 text-lg font-semibold text-ink-950">{fmtAED(downPaymentAED)}</p>
            <p className="text-xs text-ink-400">{fmtSGD(downPaymentAED)}</p>
          </div>
          <div>
            <p className="text-xs text-ink-400">Bank loan (60%)</p>
            <p className="mt-1 text-lg font-semibold text-ink-950">{fmtAED(loanAmountAED)}</p>
            <p className="text-xs text-ink-400">{fmtSGD(loanAmountAED)}</p>
          </div>
        </div>
      </div>

      {/* Closing costs by stage */}
      <div className="mt-4 space-y-3">
        {/* Next payment due */}
        {nextItem && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber-600">Next payment due</p>
                <p className="mt-2 text-base font-semibold text-ink-950">{nextItem.name}</p>
                <p className="mt-1 text-xs text-ink-500">At: {nextItem.dueStage}</p>
                <p className="mt-1 text-xs text-ink-500">{nextItem.description}</p>
              </div>
              <DualAmount aed={nextItem.amountAED} />
            </div>
          </div>
        )}

        {/* Transfer costs summary */}
        <div className="rounded-2xl bg-fog-50 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink-400">At transfer</p>
              <p className="mt-2 text-base font-semibold text-ink-950">Closing costs total</p>
              <p className="mt-1 text-xs text-ink-500">DLD fee, broker, trustee, mortgage registration, title deed</p>
            </div>
            <DualAmount aed={transferItems.reduce((s, i) => s + i.amountAED, 0)} />
          </div>

          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="mt-4 text-xs text-ink-400 underline underline-offset-2 transition hover:text-ink-800"
          >
            {showBreakdown ? "Hide breakdown" : "See breakdown"}
          </button>

          {showBreakdown && (
            <div className="mt-4 space-y-3 border-t border-fog-200 pt-4">
              {transferItems.map((item) => (
                <div key={item.name} className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink-800">{item.name}</p>
                    <p className="text-xs text-ink-400">{item.description}</p>
                  </div>
                  <DualAmount aed={item.amountAED} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total closing costs */}
        <div className="rounded-2xl bg-fog-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink-400">Total closing costs</p>
              <p className="mt-1 text-xs text-ink-400">Valuation + DLD + broker + trustee + mortgage reg + title deed</p>
            </div>
            <DualAmount aed={totalClosingCosts} />
          </div>
        </div>

        {/* 10% cheque note */}
        <div className="rounded-2xl border border-fog-200 bg-white/60 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-400">10% Deposit cheque — held, not a cost</p>
          <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
            <p className="max-w-sm text-xs text-ink-500">{depositCheque.description}</p>
            <div className="text-right">
              <p className="text-sm font-medium text-ink-400 line-through">{fmtAED(depositCheque.amountAED)}</p>
              <p className="text-xs text-ink-400">Returned at transfer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
