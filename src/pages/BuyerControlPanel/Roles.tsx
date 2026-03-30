import type { RoleItem } from './data';

type RolesProps = {
  items: RoleItem[];
};

export default function Roles({ items }: RolesProps) {
  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-title">Who's involved & when</p>
          <h2 className="mt-2 font-display text-2xl text-ink-950">Your support roles</h2>
        </div>
        <span className="stat-pill">Informational only</span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((role) => (
          <div key={role.name} className="rounded-2xl bg-fog-50 p-5">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-ink-950">{role.name}</p>
              <span className={`text-xs font-medium ${role.assigned ? "text-emerald-600" : "text-amber-600"}`}>
                {role.assigned ? "Assigned" : "Not assigned"}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-600">Enters at: {role.entersAt}</p>
            <p className="mt-3 text-sm text-ink-600">{role.summary}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ink-400">Typically asks for</p>
            <p className="mt-2 text-sm text-ink-800">{role.asksFor}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
