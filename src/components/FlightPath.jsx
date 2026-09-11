import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';

// The recurring motif: one plane tracing a dotted arc down the whole page.
// Purely decorative, fixed to the right rail, hidden on small screens.
export default function FlightPath() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.4 });
  const y = useTransform(progress, [0, 1], ['4vh', '88vh']);
  const x = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, 26, -12, 22, 0]);
  const rotate = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [8, -6, 10, -4, 6]);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-0 z-30 hidden h-full w-10 xl:block"
    >
      <svg viewBox="0 0 40 800" preserveAspectRatio="none" className="h-full w-full text-cream/20">
        <path
          d="M20 0 C 40 160, 4 300, 20 420 S 38 640, 20 800"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 7"
        />
      </svg>
      <motion.svg
        viewBox="0 0 24 24"
        style={{ y, x, rotate }}
        className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 text-cream/70"
        fill="currentColor"
      >
        <path d="M21.6 11.1 14 9.3 9.9 2.6a.9.9 0 0 0-1.6.1l-.6 1.4a.9.9 0 0 0 .1.9l3 4.6-4.6.4-1.9-2a.9.9 0 0 0-.9-.2l-.9.3a.8.8 0 0 0-.4 1.2L4.4 12l-2.3 3a.8.8 0 0 0 .4 1.2l.9.3a.9.9 0 0 0 .9-.2l1.9-2 4.6.4-3 4.6a.9.9 0 0 0-.1.9l.6 1.4a.9.9 0 0 0 1.6.1L14 14.7l7.6-1.8a.83.83 0 0 0 0-1.8Z" />
      </motion.svg>
    </div>
  );
}
