import { motion, useReducedMotion } from 'framer-motion';

export function Closing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="closing" className="container-shell mt-28 pb-16 pt-8 sm:mt-40 sm:pb-24">
      <span aria-hidden="true" className="pastel-wash wash-clay left-[16%] top-10 hidden h-20 w-32 lg:block" />
      <span aria-hidden="true" className="pastel-wash wash-sage right-[14%] top-44 hidden h-24 w-28 lg:block" />
      <div className="section-rule">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow">Closing Note</p>
            <h2 className="section-heading mt-4">
              Build the thing that keeps <span className="soft-highlight highlight-clay">interrupting</span> your thoughts.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-ash sm:text-lg">
              Iteration Labs exists for projects that are not finished, <span className="soft-highlight highlight-yellow">not flawless</span>, and not waiting to become <span className="soft-highlight highlight-rust">respectable first</span>.
            </p>
          </div>

          <motion.div
            className="editorial-panel rounded-[1.75rem] px-6 py-7 text-sm leading-7 text-ash"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-semibold uppercase tracking-[0.22em] text-ink">Iteration Labs</p>
            <p className="mt-4">
              Strange, <span className="soft-highlight highlight-olive">useful</span>, beautiful things rarely arrive with permission slips.
            </p>
          </motion.div>
        </div>

        <footer className="mt-14 flex flex-col gap-4 pt-6 text-sm text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>Iteration Labs</p>
          <p>Creative technology studio for ideas that refuse to stay in draft.</p>
        </footer>
      </div>
    </section>
  );
}
