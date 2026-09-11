import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Reveal, { TextReveal } from './ui/Reveal';
import { PlaneIcon } from './ui/Label';
import { useWedding } from '../context/WeddingContext';

export default function Story() {
  const { story } = useWedding();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 65%'] });
  const glide = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.4 });
  const planeTop = useTransform(glide, [0, 1], ['0%', '100%']);
  const drift = useTransform(glide, [0, 0.25, 0.5, 0.75, 1], [0, 5, -4, 5, 0]);
  const trail = useTransform(glide, [0, 1], ['0%', '100%']);

  return (
    <section id="story" className="paper relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <p className="label text-center text-navy/50">Since a delayed flight</p>
        <h2 className="mt-4 text-center font-serif text-[clamp(1.9rem,6vw,3rem)] uppercase tracking-[0.1em] text-navy">
          <TextReveal text="Our story" />
        </h2>

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px border-l border-dashed border-navy/25 sm:left-[13px]"
          />
          <motion.span
            aria-hidden="true"
            style={{ height: reduce ? '100%' : trail }}
            className="absolute left-[7px] top-2 max-h-[calc(100%-1rem)] w-px border-l border-dashed border-navy/70 sm:left-[13px]"
          />
          <motion.div
            aria-hidden="true"
            style={reduce ? { top: 0 } : { top: planeTop, x: drift }}
            className="absolute left-[7px] -ml-[8px] -mt-2 sm:left-[13px]"
          >
            <PlaneIcon className="h-4 w-4 rotate-90 text-navy" />
          </motion.div>

          {story.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="relative mb-12 last:mb-0">
              <span
                aria-hidden="true"
                className="absolute -left-10 top-2 h-2 w-2 rounded-full border border-navy bg-ivory sm:-left-16 sm:ml-[7px]"
              />
              <p className="label text-navy/45">{item.year}</p>
              <h3 className="mt-2 font-serif text-2xl uppercase tracking-[0.08em] text-navy sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-2 max-w-[52ch] text-[15px] font-light leading-[1.85] text-navy/70">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
