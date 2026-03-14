import { motion, useReducedMotion } from 'framer-motion';

export function PageConnector() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 1440 2800"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 hidden h-[2250px] w-full lg:block"
      animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        <linearGradient id="connector-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(26,24,22,0.22)" />
          <stop offset="18%" stopColor="rgba(26,24,22,0.24)" />
          <stop offset="82%" stopColor="rgba(26,24,22,0.22)" />
          <stop offset="100%" stopColor="rgba(26,24,22,0)" />
        </linearGradient>
      </defs>
      <path
        className="connector-path"
        d="M132 64c97-14 187 28 235 96 53 74 56 173 32 257-25 88-66 174-63 267 2 73 35 145 94 189 74 56 173 59 264 55 96-4 193-20 287-4 89 15 178 54 239 121 64 70 95 167 80 261-16 101-81 190-163 251-87 64-192 99-296 129-108 31-221 57-315 124-84 60-147 150-159 254-13 110 31 221 110 298 83 80 198 114 312 119 122 5 243-16 365-18 116-2 239 16 334 86 79 58 128 152 138 248 6 64 1 128-13 190-17 77-16 157 11 231 28 77 86 144 163 182"
        strokeDasharray="5 14"
        stroke="url(#connector-gradient)"
      />
    </motion.svg>
  );
}

export function FoldNote() {
  return (
    <svg viewBox="0 0 240 280" fill="none" aria-hidden="true" className="w-full text-ash">
      <path className="connector-path" d="M42 35h122l35 34v166H42z" />
      <path className="connector-path" d="M164 35v34h35" />
      <path className="connector-path" d="M67 93h108M67 126h78M67 159h96" opacity="0.54" />
      <path className="connector-path" d="M61 188c16-8 39-8 58 0 11 4 19 9 28 10 11 1 20-2 34-8" opacity="0.54" />
      <path className="connector-path" d="M113 86c20-10 38-24 49-42" opacity="0.48" />
      <path d="M68 92c22-11 41-8 58 0" stroke="rgba(245, 201, 167, 0.26)" strokeWidth="9" strokeLinecap="round" />
      <path d="M86 159c17-4 34-4 52 0" stroke="rgba(170, 196, 255, 0.24)" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
