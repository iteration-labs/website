import { projects } from '../content/projects';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';

export function Projects() {
  return (
    <section id="projects" className="container-shell mt-28 sm:mt-40">
      <span aria-hidden="true" className="pastel-wash wash-yellow left-[10%] top-10 hidden h-16 w-28 lg:block" />
      <span aria-hidden="true" className="pastel-wash wash-blue right-[16%] top-52 hidden h-24 w-24 lg:block" />
      <div className="section-rule">
        <Reveal className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <p className="eyebrow">Projects</p>
          <div className="max-w-3xl">
            <h2 className="section-heading">
              Three studies in making <span className="soft-highlight highlight-yellow">thought visible</span>.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ash sm:text-lg">
              Each project begins with a <span className="soft-highlight highlight-blue">tension worth staying with</span> and a <span className="soft-highlight highlight-lavender">shape worth testing</span>.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-0">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
