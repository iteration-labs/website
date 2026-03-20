import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import {
  secondNatureAlerts,
  secondNatureCatalog,
  secondNatureDeliveryMix,
  secondNatureIntegratedModel,
  secondNatureJourney,
  secondNatureMetrics,
  secondNatureOrdersByChannel,
  secondNaturePillars,
  secondNatureProofPoints,
  secondNatureShipments,
  secondNatureTimeline,
  secondNatureTopProducts,
  secondNatureWhyBuy,
} from '../content/secondNatureDemo';

const sectionLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Model', href: '#operating-model' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Shipments', href: '#shipments' },
  { label: 'Catalog', href: '#catalog' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Proof', href: '#proof' },
] as const;

function toneClass(tone: string) {
  if (tone === 'olive') return 'text-olive';
  if (tone === 'rust') return 'text-rust';
  return 'text-blue';
}

export function SecondNatureDemo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="paper-noise relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(186,208,184,0.08),transparent_26%),radial-gradient(circle_at_82%_8%,rgba(170,196,255,0.12),transparent_22%),linear-gradient(180deg,#fbfbf8_0%,#f5f2ec_100%)]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_20%_0%,rgba(118,128,108,0.14),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(154,107,82,0.12),transparent_22%)]"
        animate={prefersReducedMotion ? undefined : { opacity: [0.8, 1, 0.84] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <header className="container-shell relative z-20 flex items-center justify-between py-6 sm:py-8">
        <a href="/" className="font-serif text-2xl tracking-tight text-ink">
          Iteration Labs
        </a>
        <div className="hidden items-center gap-3 md:flex">
          <span className="rounded-full border border-line/80 bg-paper/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ash">
            Demo experience
          </span>
          <span className="rounded-full border border-line/80 bg-paper/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ash">
            Powered by Iteration Labs
          </span>
        </div>
      </header>

      <main>
        <section id="overview" className="container-shell relative pt-8 sm:pt-12 lg:pt-16">
          <span aria-hidden="true" className="pastel-wash wash-sage left-[6%] top-12 hidden h-28 w-44 lg:block" />
          <span aria-hidden="true" className="pastel-wash wash-blue right-[12%] top-28 hidden h-24 w-36 lg:block" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_24rem] lg:items-start">
            <div className="max-w-5xl">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow rounded-full border border-line/80 bg-paper/85 px-3 py-1 text-[0.7rem] text-ash">
                    Second Nature
                  </span>
                  <span className="rounded-full border border-line/70 bg-white/70 px-3 py-1 text-xs text-ash">
                    Demo experience
                  </span>
                  <span className="rounded-full border border-line/70 bg-white/70 px-3 py-1 text-xs text-ash">
                    Powered by Iteration Labs
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3.6rem,9vw,7.25rem)] font-semibold leading-[0.92] tracking-manifesto text-ink">
                  An import-export business, <span className="soft-highlight highlight-olive">powered end-to-end.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-8 max-w-3xl text-lg leading-8 text-ash sm:text-xl">
                  Powered by Iteration Labs. A unified import-export operating system that combines sourcing coordination, shipment oversight, inventory visibility, order control, and delivery orchestration in one commercial model.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#dashboard"
                    className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Explore Demo Dashboard
                  </a>
                  <a
                    href="#operating-model"
                    className="inline-flex items-center justify-center rounded-full border border-line bg-paper/70 px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ash hover:bg-paper"
                  >
                    See Operating Model
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="lg:pt-8">
              <div className="editorial-panel overflow-hidden rounded-[2rem] border-line/80 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink">Founder pulse</p>
                    <p className="mt-1 text-xs text-ash">Last sync: Mar 20, 2026 · 11:24 AM SGT</p>
                  </div>
                  <span className="rounded-full bg-olive/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-olive">
                    Live mock
                  </span>
                </div>

                <div className="mt-5 grid gap-3">
                  {secondNatureAlerts.map((alert) => (
                    <div key={alert.title} className="rounded-[1.4rem] border border-line/70 bg-white/75 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-ink">{alert.title}</p>
                        <span className="h-2.5 w-2.5 rounded-full bg-olive" />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ash">{alert.detail}</p>
                      <p className="mt-3 text-xs text-ash">{alert.timestamp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="container-shell mt-16 sm:mt-20">
          <Reveal>
            <div className="grid gap-4 rounded-[2rem] border border-line/70 bg-paper/70 p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
              {secondNaturePillars.map((pillar) => (
                <div key={pillar.title} className="rounded-[1.5rem] border border-line/60 bg-white/70 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">{pillar.title}</p>
                  <p className="mt-3 text-sm leading-6 text-ash">{pillar.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="sticky top-0 z-30 mt-10 border-y border-line/60 bg-paper/85 backdrop-blur">
          <div className="container-shell flex gap-5 overflow-x-auto py-3 text-sm text-ash">
            {sectionLinks.map((link) => (
              <a key={link.href} href={link.href} className="whitespace-nowrap transition-colors hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <section id="operating-model" className="container-shell mt-20 sm:mt-24">
          <div className="section-rule">
            <Reveal className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
              <p className="eyebrow">Operating Model</p>
              <div className="max-w-4xl">
                <h2 className="section-heading">
                  A visible workflow from <span className="soft-highlight highlight-blue">supplier coordination</span> to <span className="soft-highlight highlight-yellow">repeat orders</span>.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-ash sm:text-lg">
                  Second Nature is framed as a real import-export operation. The product, the logistics, and the founder dashboard are part of one system, not separate conversations.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-4 lg:grid-cols-8">
                {secondNatureJourney.map((step, index) => (
                  <div key={step} className="editorial-panel rounded-[1.5rem] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-ash">0{index + 1}</p>
                    <p className="mt-4 text-sm font-semibold leading-6 text-ink">{step}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="dashboard" className="container-shell mt-20 sm:mt-24">
          <div className="section-rule">
            <Reveal className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
              <p className="eyebrow">Dashboard Preview</p>
              <div className="max-w-4xl">
                <h2 className="section-heading">
                  The founder cockpit for a brand that needs <span className="soft-highlight highlight-rust">clarity, timing, and control</span>.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-ash sm:text-lg">
                  A commercial operating view that makes the business legible across sourcing, inbound flow, stock, orders, and delivery without fragmenting the system behind the scenes.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {secondNatureMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="editorial-panel rounded-[1.5rem] p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <p className="text-sm text-ash">{metric.label}</p>
                    <p className="mt-4 text-3xl font-semibold tracking-tight text-ink">{metric.value}</p>
                    <p className={`mt-3 text-sm ${toneClass(metric.tone)}`}>{metric.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
              <Reveal delay={0.1} className="editorial-panel rounded-[2rem] p-6">
                <div className="flex flex-col gap-3 border-b border-line/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-ink">Shipment tracker</p>
                    <p className="mt-1 text-sm text-ash">Morning operations view · refreshed Mar 20, 11:24 AM SGT</p>
                  </div>
                  <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
                    4 active batches
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {secondNatureShipments.map((shipment) => (
                    <div key={shipment.batch} className="rounded-[1.4rem] border border-line/65 bg-white/70 p-4">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-ink">
                            {shipment.batch} · {shipment.product}
                          </p>
                          <p className="mt-1 text-sm text-ash">
                            {shipment.origin} to {shipment.destination}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="rounded-full bg-paper px-3 py-1 text-ash">{shipment.status}</span>
                          <span className="text-ink">{shipment.eta}</span>
                        </div>
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-chalk">
                        <div className="h-full rounded-full bg-ink" style={{ width: `${shipment.progress}%` }} />
                      </div>
                      <p className="mt-3 text-sm text-ash">{shipment.note}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="grid gap-5">
                <Reveal delay={0.14} className="editorial-panel rounded-[2rem] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-ink">Inventory health</p>
                      <p className="mt-1 text-sm text-ash">Warehouse readiness by product group</p>
                    </div>
                    <span className="text-xs text-ash">Updated 8 min ago</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {secondNatureTopProducts.map((product) => (
                      <div key={product.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-ink">{product.name}</span>
                          <span className="text-ash">{product.revenue}</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-chalk">
                          <div className="h-full rounded-full bg-olive" style={{ width: `${product.share}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.18} className="editorial-panel rounded-[2rem] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-ink">Orders by channel</p>
                      <p className="mt-1 text-sm text-ash">Where demand is landing this week</p>
                    </div>
                    <span className="text-xs text-ash">Week 12</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {secondNatureOrdersByChannel.map((item) => (
                      <div key={item.channel}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-ink">{item.channel}</span>
                          <span className="text-ash">{item.orders} orders</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-chalk">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(item.orders / 1.6, 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.22} className="editorial-panel rounded-[2rem] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-ink">Delivery status</p>
                      <p className="mt-1 text-sm text-ash">Last-mile performance mix</p>
                    </div>
                    <span className="text-xs text-ash">Last 30 days</span>
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center">
                    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-[14px] border-olive bg-white/70 text-center">
                      <div>
                        <p className="text-3xl font-semibold text-ink">96%</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-ash">on time</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {secondNatureDeliveryMix.map((item) => (
                        <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                          <div className="flex items-center gap-3">
                            <span className={`h-3 w-3 rounded-full ${item.tone}`} />
                            <span className="text-ink">{item.label}</span>
                          </div>
                          <span className="text-ash">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="shipments" className="container-shell mt-20 sm:mt-24">
          <div className="section-rule">
            <Reveal className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
              <p className="eyebrow">Shipment Visibility</p>
              <div className="max-w-4xl">
                <h2 className="section-heading">
                  Track movement from India to Singapore with enough detail to <span className="soft-highlight highlight-blue">act early</span>.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-ash sm:text-lg">
                  Batch visibility is the bridge between sourcing decisions and sales confidence. Founders should know what is late, what is clearing, and what is ready to allocate.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <Reveal delay={0.08} className="grid gap-4">
                {secondNatureShipments.map((shipment) => (
                  <div key={shipment.batch} className="editorial-panel rounded-[1.75rem] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ash">{shipment.batch}</p>
                        <h3 className="mt-2 text-xl font-semibold text-ink">{shipment.product}</h3>
                      </div>
                      <span className="rounded-full border border-line/70 bg-white/75 px-3 py-1 text-sm text-ink">
                        {shipment.status}
                      </span>
                    </div>
                    <div className="mt-5 grid gap-3 text-sm text-ash sm:grid-cols-3">
                      <p>
                        <span className="block text-xs uppercase tracking-[0.16em] text-ash">Origin</span>
                        {shipment.origin}
                      </p>
                      <p>
                        <span className="block text-xs uppercase tracking-[0.16em] text-ash">Destination</span>
                        {shipment.destination}
                      </p>
                      <p>
                        <span className="block text-xs uppercase tracking-[0.16em] text-ash">ETA</span>
                        {shipment.eta}
                      </p>
                    </div>
                  </div>
                ))}
              </Reveal>

              <Reveal delay={0.12} className="editorial-panel rounded-[2rem] p-6">
                <p className="text-lg font-semibold text-ink">Current shipment timeline</p>
                <p className="mt-1 text-sm text-ash">SN-026 · Jaggery Granola</p>
                <div className="mt-8 space-y-5">
                  {secondNatureTimeline.map((step, index) => (
                    <div key={step.label} className="grid grid-cols-[1.25rem_minmax(0,1fr)_4rem] items-start gap-4">
                      <div className="flex flex-col items-center">
                        <span
                          className={`h-4 w-4 rounded-full ${
                            step.state === 'done' ? 'bg-ink' : step.state === 'active' ? 'bg-olive ring-4 ring-olive/10' : 'border border-line bg-white'
                          }`}
                        />
                        {index < secondNatureTimeline.length - 1 ? <span className="mt-2 h-12 w-px bg-line" /> : null}
                      </div>
                      <div>
                        <p className="font-medium text-ink">{step.label}</p>
                        <p className="mt-1 text-sm text-ash">
                          {step.state === 'done'
                            ? 'Completed'
                            : step.state === 'active'
                              ? 'In progress'
                              : 'Queued next'}
                        </p>
                      </div>
                      <p className="text-right text-sm text-ash">{step.date}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="catalog" className="container-shell mt-20 sm:mt-24">
          <div className="section-rule">
            <Reveal className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
              <p className="eyebrow">Catalog Control</p>
              <div className="max-w-4xl">
                <h2 className="section-heading">
                  Product, stock, and channel control for a premium pantry brand built to move with <span className="soft-highlight highlight-lavender">precision and control</span>.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-ash sm:text-lg">
                  Keep catalogue control simple. Every product card here uses local mock data so pricing, stock, naming, or channel logic can be adjusted without touching the wider site.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {secondNatureCatalog.map((item, index) => (
                  <div
                    key={item.sku}
                    className="editorial-panel rounded-[1.75rem] p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(118,128,108,0.18),rgba(170,196,255,0.12),rgba(245,201,167,0.16))] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-ash">SKU {item.sku}</p>
                      <h3 className="mt-6 text-2xl font-semibold text-ink">{item.name}</h3>
                      <p className="mt-2 text-sm text-ash">Batch {item.batch}</p>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-ash">Stock</p>
                        <p className="mt-1 font-medium text-ink">{item.stock}</p>
                      </div>
                      <div>
                        <p className="text-ash">Status</p>
                        <p className="mt-1 font-medium text-ink">{item.status}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.channels.map((channel) => (
                        <span key={channel} className="rounded-full bg-paper px-3 py-1 text-xs text-ash">
                          {channel}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-ash">Activity log #{index + 41} updated today</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="proof" className="container-shell mt-20 sm:mt-24">
          <div className="section-rule">
            <Reveal className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
              <p className="eyebrow">Roots Matter</p>
              <div className="max-w-4xl">
                <h2 className="section-heading">
                  Roots Matter is a proof point, not the hero. It shows this model can live in the real world.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-ash sm:text-lg">
                  The trust signal is simple: Iteration Labs is already thinking in terms of the full business system, where physical operations and digital visibility reinforce each other.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-12 grid gap-5 lg:grid-cols-3">
                {secondNatureProofPoints.map((point) => (
                  <div key={point.title} className="editorial-panel rounded-[1.75rem] p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">{point.title}</p>
                    <p className="mt-4 text-sm leading-7 text-ash">{point.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="ecosystem" className="container-shell mt-20 sm:mt-24">
          <div className="section-rule">
            <Reveal className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
              <p className="eyebrow">Integrated Model</p>
              <div className="max-w-4xl">
                <h2 className="section-heading">
                  Import-export as a <span className="soft-highlight highlight-olive">service.</span>
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-ash sm:text-lg">
                  Clients plug into an existing Iteration Labs operating ecosystem. Sourcing, shipment flow, inventory visibility, order oversight, and delivery coordination are connected through one accountable system, so founders do not have to assemble vendors, tools, and workflows themselves.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
                {secondNatureIntegratedModel.map((item) => (
                  <div key={item.title} className="editorial-panel rounded-[1.9rem] p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ash">{item.title}</p>
                    <p className="mt-4 text-sm leading-7 text-ash">{item.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {secondNatureWhyBuy.map((item) => (
                  <div key={item} className="editorial-panel rounded-[1.5rem] p-5">
                    <p className="text-lg font-medium text-ink">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16} className="mt-5 editorial-panel rounded-[2rem] p-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
                <div>
                  <p className="text-lg font-semibold text-ink">One system, one operating layer</p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-ash">
                    You are not buying disconnected tools. You are stepping into a working system where the software layer and the operating layer are combined into one accountable model. From sourcing to shipment to stock to delivery, the ecosystem runs as one.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-line/70 bg-white/70 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-ash">Client outcome</p>
                  <p className="mt-3 text-sm leading-7 text-ink">
                    A founder sees one operating view even when multiple execution layers sit behind it, reducing fragmentation, delays, and day-to-day overhead.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="container-shell mt-20 pb-16 pt-8 sm:mt-24 sm:pb-24">
          <Reveal className="editorial-panel rounded-[2.25rem] px-6 py-8 sm:px-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div>
                <p className="eyebrow">Final CTA</p>
                <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[3.6rem]">
                  Build your import-export business on a real operating system.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-ash sm:text-lg">
                  Second Nature is shown here as a premium, founder-led business stepping into a connected Iteration Labs ecosystem where software, operations, and delivery execution already work as one model.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href="tel:+6593514560"
                  className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Talk to Iteration Labs
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
