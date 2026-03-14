import { motion, useReducedMotion } from 'framer-motion';
import { Closing } from './components/Closing';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Projects } from './components/Projects';
import { PageConnector } from './components/Scribbles';

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="paper-noise relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_22%_14%,rgba(154,107,82,0.03),transparent_22%),radial-gradient(circle_at_78%_9%,rgba(127,140,149,0.035),transparent_18%)]"
        animate={prefersReducedMotion ? undefined : { opacity: [0.8, 1, 0.86] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <PageConnector />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Projects />
        <Closing />
      </main>
    </div>
  );
}
