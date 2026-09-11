import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PlaneIcon } from './ui/Label';
import { useWedding } from '../context/WeddingContext';

const EASE = [0.22, 1, 0.36, 1];

// The one orchestrated moment of the site: the guest taps, a plane climbs from
// the bottom of the screen to the top, and the curtain lifts into the hero.
export default function LoadingScreen({ onOpen }) {
  const config = useWedding();
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), reduce ? 300 : 2600);
    return () => clearTimeout(t);
  }, [reduce]);

  const open = () => {
    if (!ready || opening) return;
    setOpening(true);
    setTimeout(onOpen, reduce ? 100 : 2000);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') open();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <AnimatePresence>
      {opening && !reduce ? (
        <motion.div
          key="takeoff"
          className="fixed inset-0 z-[100] overflow-hidden bg-navy-deep navy-grain"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 1.15, delay: 0.85, ease: EASE }}
        >
          {/* dotted vapour trail drawing upward */}
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 origin-bottom
                       border-l border-dashed border-cream/35"
            initial={{ height: 0 }}
            animate={{ height: '92%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2"
            initial={{ bottom: '-12%', opacity: 0 }}
            animate={{ bottom: '104%', opacity: [0, 1, 1, 0.5] }}
            transition={{ duration: 1.6, ease: [0.5, 0, 0.35, 1] }}
          >
            <PlaneIcon className="h-6 w-6 -rotate-90 text-cream" />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-navy-deep navy-grain px-6 text-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.div
            className="absolute left-0 top-1/2 w-full"
            initial={{ x: '-60%', opacity: 0 }}
            animate={{ x: '60%', opacity: [0, 0.6, 0] }}
            transition={{ duration: 3.2, ease: 'easeInOut' }}
          >
            <PlaneIcon className="h-5 w-5 text-cream" />
          </motion.div>

          <motion.p
            className="label text-cream/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            {config.wedding.tagline}
          </motion.p>

          <motion.h1
            className="mt-7 w-full max-w-[22ch] break-words font-serif text-[clamp(1.7rem,10vw,4rem)] uppercase leading-[1.08] tracking-[0.08em] text-ivory sm:tracking-[0.12em]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
          >
            <span className="block">{config.couple.groom.first}</span>
            <span className="my-1 block font-script text-[clamp(1.1rem,5.5vw,2rem)] lowercase tracking-normal text-cream/75">
              and
            </span>
            <span className="block">{config.couple.bride.first}</span>
          </motion.h1>

          <motion.div
            className="mt-9 h-px w-32 origin-left bg-cream/40 sm:w-56"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />

          <motion.button
            type="button"
            onClick={open}
            className="mt-10 max-w-full border border-cream/35 px-6 py-3 label text-cream transition-colors duration-500 hover:bg-cream hover:text-navy disabled:opacity-40 sm:px-7"
            disabled={!ready}
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0.35 }}
            transition={{ duration: 0.8 }}
          >
            {ready ? 'Tap to open invitation' : 'Preparing your seat'}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
