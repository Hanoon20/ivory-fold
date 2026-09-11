import { useState } from 'react';
import { motion } from 'framer-motion';
import PaperCard from './ui/PaperCard';
import Reveal, { ImageReveal, TextReveal } from './ui/Reveal';
import Stamp from './ui/Stamp';
import MapModal from './MapModal';
import { useWedding } from '../context/WeddingContext';

export default function Venue() {
  const { venue, destination } = useWedding();
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section id="venue" className="bg-navy navy-grain px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-lg">
        <PaperCard scallop className="relative px-6 pb-10 pt-12 sm:px-10">
          <Stamp
            top={destination.city}
            bottom="Boarding for love"
            size={92}
            tilt={12}
            className="absolute right-4 top-6 sm:right-7"
          />

          <h2 className="text-center font-serif text-[clamp(1.8rem,6vw,2.6rem)] uppercase tracking-[0.16em] text-navy">
            <TextReveal text="Venue" />
          </h2>
          <div className="dotted-line mx-auto mt-4 h-px w-24 text-navy/50" />

          <Reveal delay={0.1} className="mt-7 text-center">
            <p className="font-serif text-xl uppercase tracking-[0.12em] text-navy">{venue.name}</p>
            <p className="mt-2 text-sm font-light text-navy/65">{venue.address}</p>
          </Reveal>

          <div className="mt-7 text-center">
            <motion.button
              type="button"
              onClick={() => setMapOpen(true)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="bg-navy px-8 py-3.5 label text-ivory transition-colors hover:bg-navy-soft"
            >
              How to get there
            </motion.button>
          </div>

          <ImageReveal
            src={venue.image}
            alt={venue.name}
            className="mt-9 border border-navy/15"
            imgClassName="aspect-[4/3]"
            delay={0.1}
          />
        </PaperCard>
      </div>

      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </section>
  );
}
