import { Reveal } from './Reveal';

export function Manifesto() {
  return (
    <section id="manifesto" className="container-shell relative mt-28 sm:mt-40">
      <span aria-hidden="true" className="pastel-wash wash-sage left-[18%] top-28 hidden h-24 w-28 lg:block" />
      <span aria-hidden="true" className="pastel-wash wash-lavender right-[12%] top-40 hidden h-28 w-36 lg:block" />
      <div className="section-rule grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <Reveal>
          <p className="eyebrow">Manifesto</p>
        </Reveal>

        <div className="grid gap-10">
          <Reveal>
            <h2 className="section-heading">
              Iteration Labs is for experiments that <span className="soft-highlight highlight-blue">refuse</span> to stay in draft.
            </h2>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl space-y-7 text-base leading-8 text-ash sm:text-lg">
              <p>
                Too many ideas die as <span className="soft-highlight highlight-lavender">tidy notes</span>, bookmarked domains, or conversations that felt promising for an hour.
              </p>
              <p>
                This studio is built around a simpler bias: <span className="soft-highlight highlight-olive">make the thing</span> before <span className="soft-highlight highlight-yellow">the mood passes</span>.
              </p>
              <p>
                We like work that is <span className="soft-highlight highlight-clay">useful</span>, peculiar, <span className="soft-highlight highlight-blue">rigorous</span>, slightly funny, and human enough to <span className="soft-underline underline-peach">show the seams</span>.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
