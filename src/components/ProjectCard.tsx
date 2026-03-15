import { motion, useReducedMotion } from 'framer-motion';
import { Project } from '../content/projects';

const accentMap = {
  olive: 'highlight-olive text-olive',
  rust: 'highlight-rust text-rust',
  ink: 'highlight-blue text-blue',
};

const washMap = {
  olive: 'wash-sage',
  rust: 'wash-peach',
  ink: 'wash-lavender',
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[2rem] bg-white/34 px-5 py-8 shadow-[0_18px_44px_rgba(26,24,22,0.035)] sm:grid sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] sm:gap-10 sm:px-8 sm:py-10"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <span aria-hidden="true" className={`pastel-wash ${washMap[project.accent]} left-[-2%] top-4 h-28 w-36 opacity-70`} />
      <span aria-hidden="true" className={`pastel-wash ${washMap[project.accent]} right-[10%] top-[55%] hidden h-24 w-32 opacity-45 sm:block`} />

      <div className="relative">
        <div className="mb-9 flex items-start gap-4 sm:mb-10 sm:gap-5">
          <span aria-hidden="true" className="font-serif text-[clamp(2.8rem,7vw,4.8rem)] leading-[0.85] tracking-[-0.05em] text-ink/16">
            0{index + 1}
          </span>
          <div className="pt-2 sm:pt-3">
            <p className="eyebrow">Study</p>
            <h3 className="relative mt-3 font-serif text-4xl leading-none text-ink sm:text-[3.25rem]">
              {project.name}
            </h3>
          </div>
        </div>

        <p className="max-w-xl text-lg leading-8 text-ink sm:text-[1.4rem]">{project.tagline}</p>
      </div>

      <div className="relative max-w-xl">
        <span className={`soft-highlight mb-5 inline-block px-1 text-[0.68rem] font-medium uppercase tracking-[0.24em] ${accentMap[project.accent]}`}>
          in progress
        </span>
        <p className="text-base leading-8 text-ash sm:text-lg">{project.summary}</p>
        <p className="mt-5 text-sm leading-7 text-ash/92 sm:text-[0.98rem]">
          {project.detail}
        </p>
      </div>
    </motion.article>
  );
}
