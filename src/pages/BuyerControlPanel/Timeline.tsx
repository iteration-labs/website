import type { TimelineStage } from './data';

type TimelineProps = {
  stages: TimelineStage[];
};

export default function Timeline({ stages }: TimelineProps) {
  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="section-title">Journey timeline</p>
          <h2 className="mt-2 font-display text-2xl text-ink-950">Your purchase journey</h2>
        </div>
        <p className="text-xs text-ink-400">Updated by Mallika</p>
      </div>

      <div className="mt-6 space-y-2">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-start gap-4">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                  stage.status === "current"
                    ? "border-reed-500 bg-white text-reed-500 animate-glow"
                    : stage.status === "done"
                    ? "border-transparent bg-emerald-100 text-emerald-600"
                    : "border-fog-200 bg-white text-ink-400"
                }`}
              >
                {stage.status === "done" ? "✓" : stage.id}
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`mt-1 w-px flex-1 ${
                    stage.status === "done" ? "bg-emerald-200" : "bg-fog-200"
                  }`}
                  style={{ minHeight: "24px" }}
                />
              )}
            </div>

            {/* Stage content */}
            <div
              className={`mb-2 flex-1 rounded-2xl px-4 py-3 ${
                stage.status === "current" ? "bg-white shadow-bcp-soft" : "bg-transparent"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className={`text-sm font-semibold ${
                    stage.status === "done"
                      ? "text-ink-400"
                      : stage.status === "current"
                      ? "text-ink-950"
                      : "text-ink-600"
                  }`}
                >
                  {stage.name}
                </p>
                {stage.status === "current" && (
                  <span className="rounded-full bg-reed-200 px-2.5 py-0.5 text-xs font-medium text-ink-900">
                    Current
                  </span>
                )}
                {stage.travelRequired && stage.status === "upcoming" && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                    ✈ Dubai trip required
                  </span>
                )}
                {stage.status === "upcoming" && stage.weeksUntil !== undefined && (
                  <span className="text-xs text-ink-400">~{stage.weeksUntil} weeks</span>
                )}
              </div>

              {stage.status !== "done" && (
                <p className="mt-1 text-xs text-ink-500">{stage.description}</p>
              )}
              {stage.note && stage.status !== "done" && (
                <p className="mt-1 text-xs text-ink-400 italic">{stage.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
