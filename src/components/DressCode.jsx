import { motion } from 'framer-motion';
import Reveal, { ImageReveal, TextReveal } from './ui/Reveal';
import { useWedding } from '../context/WeddingContext';

export default function DressCode() {
  const { dressCode } = useWedding();

  return (
    <section id="dress-code" className="paper py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-serif text-[clamp(1.8rem,6vw,2.8rem)] uppercase tracking-[0.16em] text-navy">
          <TextReveal text="Dress code" />
        </h2>
        <div className="dotted-line mx-auto mt-4 h-px w-24 text-navy/50" />

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[44ch] text-[15px] font-light leading-[1.9] text-navy/70">
            {dressCode.note}
          </p>
        </Reveal>

        <ul className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-6 sm:gap-9">
          {dressCode.palette.map((c, i) => (
            <motion.li
              key={c.name}
              className="text-center"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
            >
              <motion.span
                whileHover={{ scale: 1.09, y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block h-12 w-12 rounded-full border border-navy/20 shadow-[0_10px_20px_-14px_rgba(0,0,0,0.7)] sm:h-14 sm:w-14"
                style={{ backgroundColor: c.hex }}
              />
              <span className="label mt-3 block text-navy/60">{c.name}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 text-left sm:grid-cols-2">
          {[
            { key: 'women', title: 'Women', data: dressCode.women },
            { key: 'men', title: 'Men', data: dressCode.men },
          ].map(({ key, title, data }) => (
            <div key={key}>
              <ImageReveal
                src={data.image}
                alt={`${title}'s attire suggestion`}
                className="border border-navy/15"
                imgClassName="aspect-[3/4]"
              />
              <h3 className="mt-5 font-serif text-2xl uppercase tracking-[0.18em] text-navy">
                {title}
              </h3>
              <p className="mt-2 max-w-[42ch] text-[15px] font-light leading-[1.85] text-navy/70">
                {data.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
