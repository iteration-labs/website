type SnapshotHeaderProps = {
  currentStage: string;
  completedCount: number;
  remainingCount: number;
  nextStage: string;
  nextStageSummary: string;
  readinessSummary: string;
  upcomingRoles: string[];
  documentsRequiredNext: string[];
};

export default function SnapshotHeader({
  currentStage,
  completedCount,
  remainingCount,
  nextStage,
  nextStageSummary,
  readinessSummary,
  upcomingRoles,
  documentsRequiredNext
}: SnapshotHeaderProps) {
  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-title">Snapshot</p>
            <h2 className="mt-2 font-display text-2xl text-ink-950 sm:text-3xl">
              {currentStage}
            </h2>
            <p className="mt-2 text-sm text-ink-600">
              {completedCount} done · {remainingCount} remaining
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-ink-600">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              {readinessSummary}
            </span>
            <span className="stat-pill">Estimates only · Not financial advice</span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-fog-50 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-400">Next stage</p>
            <p className="mt-2 text-lg font-semibold text-ink-950">{nextStage}</p>
            <p className="mt-1 text-sm text-ink-600">{nextStageSummary}</p>
          </div>
          <div className="rounded-2xl bg-fog-50 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-400">
              Documents required next
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {documentsRequiredNext.length === 0 ? (
                <span className="text-sm text-ink-600">No documents required next.</span>
              ) : (
                documentsRequiredNext.map((doc) => (
                  <span key={doc} className="stat-pill">{doc}</span>
                ))
              )}
            </div>
          </div>
          <div className="rounded-2xl bg-fog-50 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-400">Roles upcoming</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {upcomingRoles.length === 0 ? (
                <span className="text-sm text-ink-600">No new roles expected imminently.</span>
              ) : (
                upcomingRoles.map((role) => (
                  <span key={role} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    {role} · not assigned
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
