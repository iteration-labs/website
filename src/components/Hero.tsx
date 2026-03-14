import { motion, useReducedMotion } from 'framer-motion';
import { FoldNote } from './Scribbles';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="top" className="container-shell relative pt-10 sm:pt-16 lg:pt-20">
      <span aria-hidden="true" className="pastel-wash wash-peach left-[8%] top-20 hidden h-24 w-40 lg:block" />
      <span aria-hidden="true" className="pastel-wash wash-blue right-[20%] top-48 hidden h-20 w-32 lg:block" />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="max-w-5xl">
          <p className="eyebrow mb-6">Creative technology studio. Open draft. Mild refusal.</p>
          <motion.h1
            className="font-serif text-[clamp(4.2rem,10.7vw,8.7rem)] font-semibold leading-[0.9] tracking-manifesto text-ink"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Why are we so practiced at <span className="soft-highlight highlight-rust">consuming</span> and still so <span className="soft-highlight highlight-lavender">hesitant</span> to make?
          </motion.h1>

          <motion.p
            className="mt-12 max-w-2xl text-lg leading-8 text-ash sm:text-xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Iteration Labs is a place for ideas that should not remain tidy, <span className="soft-highlight highlight-blue">private</span>, or <span className="soft-highlight highlight-yellow">theoretical</span>.
          </motion.p>
        </div>

        <motion.div
          className="hidden lg:block"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <FoldNote />
        </motion.div>
      </div>
    </section>
  );
}
