import { motion, useReducedMotion } from 'framer-motion';
import { Project } from '../content/projects';

const accentMap = {
  olive: 'bg-olive/14 text-olive',
  rust: 'bg-rust/14 text-rust',
  ink: 'bg-blue/14 text-blue',
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
      className="group relative grid gap-6 border-t border-line/75 py-8 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] sm:gap-10 sm:py-12"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative">
        <span aria-hidden="true" className={`pastel-wash ${washMap[project.accent]} left-4 top-5 h-14 w-20`} />
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Project 0{index + 1}</p>
            <h3 className="relative mt-3 font-serif text-4xl leading-none text-ink sm:text-[3.25rem]">
              {project.name}
            </h3>
          </div>
        </div>

        <p className="max-w-xl text-lg leading-8 text-ink sm:text-[1.4rem]">{project.tagline}</p>
      </div>

      <div className="relative max-w-xl">
        <span className={`mb-5 inline-flex rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.24em] ${accentMap[project.accent]}`}>
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
