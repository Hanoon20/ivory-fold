import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextReveal } from './ui/Reveal';
import { PlaneIcon } from './ui/Label';
import { useWedding } from '../context/WeddingContext';

export default function Timeline() {
  const { timeline } = useWedding();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 65%'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="itinerary" className="relative overflow-hidden bg-navy navy-grain py-24 sm:py-32">
      <PlaneIcon className="absolute right-8 top-16 h-6 w-6 text-cream/50 animate-drift" />

      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-center font-serif text-[clamp(1.8rem,6vw,2.8rem)] uppercase tracking-[0.16em] text-ivory">
          <TextReveal text="Timeline" />
        </h2>
        <p className="mt-3 text-center label text-cream/50">Saturday, the day itself</p>

        <div ref={ref} className="relative mt-14 pl-8">
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-1 h-full w-px bg-cream/20"
          />
          <motion.span
            aria-hidden="true"
            style={{ height }}
            className="absolute left-[5px] top-1 w-px bg-cream"
          />

          {timeline.map((item, i) => (
            <motion.div
              key={item.label}
              className="relative mb-9 flex items-baseline justify-between gap-6 last:mb-0"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                aria-hidden="true"
                className="absolute -left-8 top-2 h-2.5 w-2.5 rounded-full border border-cream bg-navy"
              />
              <div>
                <h3 className="font-serif text-xl tracking-wide text-ivory sm:text-2xl">
                  {item.label}
                </h3>
                <p className="mt-1 text-sm font-light text-cream/60">{item.note}</p>
              </div>
              <p className="shrink-0 font-serif text-lg text-cream/90 sm:text-xl">{item.time}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
