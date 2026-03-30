export default function Notes() {
  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-title">Notes</p>
          <h2 className="mt-2 font-display text-2xl text-ink-950">Your decisions and context</h2>
          <p className="mt-1 text-sm text-ink-600">
            Capture anything you want remembered for later stages.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="rounded-full bg-fog-100 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink-400"
        >
          Structure my notes (coming soon)
        </button>
      </div>

      <div className="mt-6">
        <textarea
          rows={6}
          placeholder="Add your notes, priorities, and any decisions made so far."
          className="w-full resize-none rounded-2xl border border-fog-200 bg-white/90 px-4 py-3 text-sm text-ink-800 focus:border-reed-500 focus:outline-none"
        />
        <p className="mt-3 text-xs text-ink-400">
          Notes are private to the buyer unless shared intentionally.
        </p>
      </div>
    </section>
  );
}
