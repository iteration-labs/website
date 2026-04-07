import type { DocumentItem } from './data';

type DocumentIndexProps = {
  items: DocumentItem[];
};

const statusTone: Record<DocumentItem["status"], string> = {
  Submitted: "bg-emerald-100 text-emerald-700",
  Ready: "bg-fog-200 text-ink-700",
  "Not ready": "bg-amber-100 text-amber-700",
};

export default function DocumentIndex({ items }: DocumentIndexProps) {
  const submitted = items.filter((d) => d.requiredWindow === "done");
  const now = items.filter((d) => d.requiredWindow === "now");
  const later = items.filter((d) => d.requiredWindow === "later");

  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-title">Document checklist</p>
          <h2 className="mt-2 font-display text-2xl text-ink-950">What's needed & when</h2>
          <p className="mt-1 text-sm text-ink-400">Files are not stored here. Links are for your own reference.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Submitted (done) */}
        <div className="rounded-2xl bg-fog-50 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-ink-400">Submitted</p>
          <p className="mt-1 text-xs text-ink-400">Pre-approval documents — all done</p>
          <div className="mt-4 space-y-2">
            {submitted.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-3">
                <p className="text-sm text-ink-500">{item.name}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusTone[item.status]}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Now */}
        <div className="rounded-2xl bg-white shadow-bcp-soft p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-ink-400">Right now</p>
          <p className="mt-1 text-xs text-ink-400">Action needed at current stage</p>
          <div className="mt-4 space-y-4">
            {now.length === 0 ? (
              <p className="text-sm text-ink-500">Nothing outstanding right now.</p>
            ) : (
              now.map((item) => (
                <div key={item.name} className="rounded-xl bg-fog-50 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-ink-950">{item.name}</p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusTone[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  {item.note && <p className="mt-1 text-xs text-ink-500">{item.note}</p>}
                  <input
                    type="url"
                    defaultValue={item.link}
                    placeholder="Paste a secure share link"
                    className="mt-3 w-full rounded-xl border border-fog-200 bg-white/90 px-3 py-2 text-sm text-ink-800 focus:border-reed-500 focus:outline-none"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Later */}
        <div className="rounded-2xl bg-fog-50 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-ink-400">At transfer</p>
          <p className="mt-1 text-xs text-ink-400">Prepare these ahead of transfer</p>
          <div className="mt-4 space-y-4">
            {later.map((item) => (
              <div key={item.name} className="rounded-xl bg-white/80 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink-950">{item.name}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusTone[item.status]}`}>
                    {item.status}
                  </span>
                </div>
                {item.note && <p className="mt-1 text-xs text-ink-500">{item.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
