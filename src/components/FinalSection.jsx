import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { TextReveal } from './ui/Reveal';
import { PlaneIcon } from './ui/Label';
import ShareInvitation from './ShareInvitation';
import { useWedding } from '../context/WeddingContext';

export default function FinalSection() {
  const config = useWedding();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const planeX = useTransform(scrollYProgress, [0.15, 0.9], ['-12%', '112%']);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[95svh] items-center justify-center overflow-hidden py-28"
    >
      <motion.img
        src={config.images.closing}
        alt=""
        aria-hidden="true"
        style={reduce ? undefined : { y: imgY }}
        loading="lazy"
        className="absolute inset-0 h-[112%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy-deep/88" />
      <div className="absolute inset-0 navy-grain" />

      <motion.div
        aria-hidden="true"
        style={{ x: planeX }}
        className="absolute top-[22%] left-0 hidden sm:block"
      >
        <PlaneIcon className="h-5 w-5 text-cream/50" />
      </motion.div>

      <div className="relative z-10 px-6 text-center">
        <h2 className="font-serif text-[clamp(2.4rem,11vw,6rem)] uppercase leading-[0.98] tracking-[0.06em] text-ivory">
          <TextReveal text="We are waiting" />
          <br />
          <TextReveal text="for you" delay={0.2} />
        </h2>

        <div className="dotted-line mx-auto mt-10 h-px w-32 text-cream/50" />

        <p className="mt-8 font-script text-3xl text-cream sm:text-4xl">With love,</p>
        <p className="mt-3 font-serif text-xl uppercase tracking-[0.22em] text-ivory sm:text-2xl">
          {config.couple.groom.first} &amp; {config.couple.bride.first}
        </p>
        <p className="label mt-4 text-cream/55">{config.wedding.dateShort}</p>

        <div className="mt-12">
          <ShareInvitation />
        </div>
      </div>
    </section>
  );
}
