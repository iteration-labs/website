import type { RoleItem } from './data';

type RolesProps = {
  items: RoleItem[];
};

export default function Roles({ items }: RolesProps) {
  return (
    <section className="section-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-title">Key people</p>
          <h2 className="mt-2 font-display text-2xl text-ink-950">Who's involved & when</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((role) => (
          <div
            key={role.name}
            className={`rounded-2xl p-5 ${
              role.name === "Mallika Boobna"
                ? "bg-ink-950 text-white"
                : "bg-fog-50"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`text-base font-semibold ${role.name === "Mallika Boobna" ? "text-white" : "text-ink-950"}`}>
                  {role.name}
                </p>
                <p className={`mt-0.5 text-xs ${role.name === "Mallika Boobna" ? "text-white/60" : "text-ink-400"}`}>
                  {role.title}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  role.assigned
                    ? role.name === "Mallika Boobna"
                      ? "bg-white/20 text-white"
                      : "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {role.assigned ? "Active" : "Enters later"}
              </span>
            </div>

            <p className={`mt-3 text-sm ${role.name === "Mallika Boobna" ? "text-white/80" : "text-ink-600"}`}>
              {role.summary}
            </p>

            {role.entersAt !== "Day one" && (
              <p className={`mt-3 text-xs ${role.name === "Mallika Boobna" ? "text-white/50" : "text-ink-400"}`}>
                Enters at: {role.entersAt}
              </p>
            )}

            {role.asksFor && (
              <div className="mt-3">
                <p className={`text-xs uppercase tracking-[0.2em] ${role.name === "Mallika Boobna" ? "text-white/50" : "text-ink-400"}`}>
                  Typically asks for
                </p>
                <p className={`mt-1 text-xs ${role.name === "Mallika Boobna" ? "text-white/70" : "text-ink-600"}`}>
                  {role.asksFor}
                </p>
              </div>
            )}

            {/* Contact buttons for Mallika */}
            {(role.phone || role.email) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {role.phone && (
                  <a
                    href={`tel:${role.phone}`}
                    className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/25"
                  >
                    Call
                  </a>
                )}
                {role.email && (
                  <a
                    href={`mailto:${role.email}`}
                    className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/25"
                  >
                    Email
                  </a>
                )}
                {role.website && (
                  <a
                    href={`https://${role.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/25"
                  >
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
