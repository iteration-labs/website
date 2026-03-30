import type { DocumentItem } from './data';

type DocumentIndexProps = {
  items: DocumentItem[];
};

const statusTone: Record<DocumentItem["status"], string> = {
  "Not ready": "bg-amber-100 text-amber-700",
  Ready: "bg-emerald-100 text-emerald-700",
  Shared: "bg-reed-200 text-ink-900"
};

const groupTitles: Record<DocumentItem["requiredWindow"], string> = {
  now: "Required now",
  next: "Required next",
  later: "Later"
};

export default function DocumentIndex({ items }: DocumentIndexProps) {
  const grouped = items.reduce<Record<DocumentItem["requiredWindow"], DocumentItem[]>>(
    (acc, item) => {
      acc[item.requiredWindow].push(item);
      return acc;
    },
    { now: [], next: [], later: [] }
  );

  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-title">Document index</p>
          <h2 className="mt-2 font-display text-2xl text-ink-950">Checklist and links</h2>
          <p className="mt-1 text-sm text-ink-600">Files are not stored here. Add external links only.</p>
        </div>
        <span className="stat-pill">Grouped by timing · Linked to stages</span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {(Object.keys(grouped) as Array<DocumentItem["requiredWindow"]>).map((key) => (
          <div key={key} className="rounded-2xl bg-fog-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-400">{groupTitles[key]}</p>
            <div className="mt-4 space-y-4">
              {grouped[key].map((item) => (
                <div key={item.name} className="rounded-2xl bg-white/80 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink-950">{item.name}</p>
                      <p className="mt-1 text-xs text-ink-400">Stage: {item.stage}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusTone[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <input
                    type="url"
                    defaultValue={item.link}
                    placeholder="Paste a secure share link"
                    className="mt-3 w-full rounded-xl border border-fog-200 bg-white/90 px-3 py-2 text-sm text-ink-800 focus:border-reed-500 focus:outline-none"
                  />
                </div>
              ))}
              {grouped[key].length === 0 && (
                <p className="text-sm text-ink-600">No documents here yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
