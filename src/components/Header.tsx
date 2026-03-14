export function Header() {
  return (
    <header className="container-shell relative z-20 flex items-center justify-between py-6 sm:py-8">
      <a href="#top" className="font-serif text-2xl tracking-tight text-ink">
        Iteration Labs
      </a>
      <nav aria-label="Primary" className="hidden gap-8 text-sm text-ash md:flex">
        <a className="transition-colors hover:text-ink" href="#manifesto">
          Manifesto
        </a>
        <a className="transition-colors hover:text-ink" href="#projects">
          Projects
        </a>
        <a className="transition-colors hover:text-ink" href="#closing">
          Closing Note
        </a>
      </nav>
    </header>
  );
}
