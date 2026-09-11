import { AnimatePresence, motion } from 'framer-motion';
import useCountdown from '../hooks/useCountdown';
import { useWedding } from '../context/WeddingContext';

function Unit({ value, label }) {
  const padded = String(value).padStart(2, '0');
  return (
    <div className="text-center">
      <div className="relative h-[clamp(2.6rem,11vw,5rem)] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={padded}
            initial={{ y: '55%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-55%', opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 block font-serif text-[clamp(2.4rem,10vw,4.6rem)] font-light leading-none text-ivory"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="label mt-3 text-cream/50">{label}</p>
    </div>
  );
}

export default function Countdown() {
  const config = useWedding();
  const { days, hours, minutes, seconds, done } = useCountdown(config.wedding.dateISO);

  return (
    <section className="border-y border-cream/10 bg-navy-deep navy-grain py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="label text-cream/50">
          {done ? 'Today is the day' : 'Counting down to the ceremony'}
        </p>
        <div className="mt-9 grid grid-cols-4 gap-3 sm:gap-8">
          <Unit value={days} label="Days" />
          <Unit value={hours} label="Hours" />
          <Unit value={minutes} label="Minutes" />
          <Unit value={seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}
