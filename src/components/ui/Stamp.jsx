import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { PlaneIcon } from './Label';

// Circular vintage passport stamp. Rotates very slightly as the page scrolls.
export default function Stamp({
  top = 'LOVE TRIP',
  bottom = '25 DEC 2026',
  tone = 'navy',
  size = 118,
  tilt = -8,
  className = '',
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [tilt - 5, tilt + 5]);
  const color = tone === 'ivory' ? '#F4EDE0' : '#101F3C';
  const uid = `${top}-${bottom}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none relative select-none ${className}`}
      style={{ width: size, height: size, rotate: reduce ? tilt : rotate, opacity: 0.72 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className="h-full w-full" style={{ color }}>
        <defs>
          <path id={`arc-top-${uid}`} d="M60,60 m-44,0 a44,44 0 1,1 88,0" fill="none" />
          <path id={`arc-bottom-${uid}`} d="M60,60 m-40,0 a40,40 0 1,0 80,0" fill="none" />
        </defs>
        <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 4"
        />
        <text fill="currentColor" fontSize="10" letterSpacing="3.2" fontFamily="Jost, sans-serif">
          <textPath href={`#arc-top-${top}`} startOffset="50%" textAnchor="middle">
            {top}
          </textPath>
        </text>
        <text fill="currentColor" fontSize="9" letterSpacing="2.6" fontFamily="Jost, sans-serif">
          <textPath href={`#arc-bottom-${bottom}`} startOffset="50%" textAnchor="middle">
            {bottom}
          </textPath>
        </text>
      </svg>
      <PlaneIcon
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2"
        style={{ color }}
      />
    </motion.div>
  );
}
