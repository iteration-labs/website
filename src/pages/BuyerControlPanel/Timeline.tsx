import type { TimelineStage } from './data';

type TimelineProps = {
  stages: TimelineStage[];
};

const statusTone: Record<TimelineStage["status"], string> = {
  done: "text-ink-400",
  current: "text-ink-950",
  upcoming: "text-ink-600"
};

export default function Timeline({ stages }: TimelineProps) {
  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-title">Journey timeline</p>
          <h2 className="mt-2 font-display text-2xl text-ink-950">Your purchase journey</h2>
        </div>
        <p className="text-xs text-ink-400">Updated manually · MVP view</p>
      </div>

      <div className="mt-6 space-y-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold ${
                  stage.status === "current"
                    ? "border-reed-500 bg-white text-reed-500 animate-glow"
                    : stage.status === "done"
                    ? "border-transparent bg-emerald-100 text-emerald-600"
                    : "border-fog-200 bg-white text-ink-600"
                }`}
              >
                {stage.status === "done" ? "✓" : index + 1}
              </div>
              {index < stages.length - 1 && (
                <div className="mt-2 h-full w-px bg-fog-200" />
              )}
            </div>
            <div
              className={`flex-1 rounded-2xl px-4 py-3 ${
                stage.status === "current" ? "bg-white shadow-bcp-soft" : "bg-transparent"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className={`text-base font-semibold ${statusTone[stage.status]}`}>
                  {stage.name}
                </p>
                {stage.status === "current" && (
                  <span className="stat-pill bg-reed-200 text-ink-900">Current stage</span>
                )}
                {stage.status === "upcoming" && stage.weeksUntil !== undefined && (
                  <span className="text-xs text-ink-400">~{stage.weeksUntil} weeks</span>
                )}
              </div>
              <p className="mt-1 text-sm text-ink-600">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
