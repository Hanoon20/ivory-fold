import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BoardingPass from './BoardingPass';
import Stamp from './ui/Stamp';
import { useWedding } from '../context/WeddingContext';

export default function Hero() {
  const config = useWedding();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden py-28"
    >
      <motion.img
        src={config.images.hero}
        alt=""
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 h-[118%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy-deep/78" />
      <div className="absolute inset-0 navy-grain" />

      <motion.div style={{ y: cardY, opacity: fade }} className="relative z-10 w-full px-5">
        <div className="mx-auto flex max-w-[420px] justify-center">
          <BoardingPass />
        </div>

        <Stamp
          top="Boarding for love"
          bottom={config.wedding.dateShort}
          tone="ivory"
          size={110}
          tilt={-12}
          className="absolute -right-2 top-6 hidden md:block"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ opacity: fade }}
      >
        <p className="label text-ivory/60">Scroll</p>
        <motion.span
          className="mx-auto mt-3 block h-10 w-px bg-ivory/40"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
