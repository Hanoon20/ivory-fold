import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { TextReveal } from './ui/Reveal';
import { useWedding } from '../context/WeddingContext';

export default function TravelInfo() {
  const { travel } = useWedding();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="travel" className="bg-navy navy-grain py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <p className="label text-cream/50">Travel guide</p>
        <h2 className="mt-4 font-serif text-[clamp(1.8rem,6vw,2.8rem)] uppercase tracking-[0.1em] text-ivory">
          <TextReveal text="Getting to the wedding" />
        </h2>

        <div className="mt-12 border-t border-cream/15">
          {travel.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.title} className="border-b border-cream/15">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-xl tracking-wide text-ivory sm:text-2xl">
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0 text-cream/70"
                    >
                      <Plus size={18} strokeWidth={1.2} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-7 text-[15px] font-light leading-[1.9] text-cream/70">
                        {item.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
