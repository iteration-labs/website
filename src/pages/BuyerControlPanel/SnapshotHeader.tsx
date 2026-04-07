import type { TimelineStage } from './data';

type YouAreHereProps = {
  currentStage: TimelineStage;
  nextStage?: TimelineStage;
  travelStage?: TimelineStage;
  completedCount: number;
  totalCount: number;
};

export default function YouAreHere({
  currentStage,
  nextStage,
  travelStage,
  completedCount,
  totalCount,
}: YouAreHereProps) {
  const travelIsComing =
    travelStage && travelStage.id > currentStage.id && travelStage.id - currentStage.id <= 3;

  return (
    <section className="section-card overflow-hidden p-0">
      {/* Stage progress bar */}
      <div className="h-1 bg-fog-100">
        <div
          className="h-1 bg-reed-500 transition-all"
          style={{ width: `${((completedCount) / totalCount) * 100}%` }}
        />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="section-title">You are here</p>
          <span className="text-xs text-ink-400">
            Stage {currentStage.id} of {totalCount}
          </span>
        </div>

        <h2 className="mt-2 font-display text-2xl text-ink-950 sm:text-3xl">
          {currentStage.name}
        </h2>
        <p className="mt-2 text-sm text-ink-600 sm:max-w-xl">{currentStage.description}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Next up */}
          {nextStage && (
            <div className="rounded-2xl bg-fog-50 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-400">Next up</p>
              <p className="mt-2 text-base font-semibold text-ink-950">{nextStage.name}</p>
              <p className="mt-1 text-xs text-ink-500">
                {nextStage.weeksUntil === 1
                  ? "Expected in ~1 week"
                  : nextStage.weeksUntil
                  ? `Expected in ~${nextStage.weeksUntil} weeks`
                  : "Coming up"}
              </p>
              <p className="mt-2 text-sm text-ink-600">{nextStage.description}</p>
            </div>
          )}

          {/* Progress */}
          <div className="rounded-2xl bg-fog-50 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-400">Progress</p>
            <p className="mt-2 text-base font-semibold text-ink-950">
              {completedCount} of {totalCount} stages done
            </p>
            <p className="mt-1 text-xs text-ink-500">{totalCount - completedCount - 1} stages remaining after this one</p>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: totalCount }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < completedCount
                      ? "bg-emerald-400"
                      : i === completedCount
                      ? "bg-reed-500"
                      : "bg-fog-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dubai trip alert or current stage note */}
          {travelIsComing && travelStage ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-600">Plan ahead</p>
              <p className="mt-2 text-base font-semibold text-ink-950">Dubai trip needed</p>
              <p className="mt-1 text-xs text-amber-700">~{travelStage.weeksUntil} weeks away</p>
              <p className="mt-2 text-sm text-ink-600">
                You'll need 1–2 days in Dubai to sign the Final Offer Letter in person at the bank.
              </p>
            </div>
          ) : currentStage.note ? (
            <div className="rounded-2xl bg-fog-50 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink-400">Note</p>
              <p className="mt-2 text-sm text-ink-600">{currentStage.note}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
