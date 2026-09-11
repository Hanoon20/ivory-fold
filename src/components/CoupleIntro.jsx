import Reveal, { TextReveal, ImageReveal } from './ui/Reveal';
import Stamp from './ui/Stamp';
import { useWedding } from '../context/WeddingContext';

export default function CoupleIntro() {
  const config = useWedding();
  const guest = config.guest;

  return (
    <section id="invitation" className="relative overflow-hidden bg-navy navy-grain py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        {guest && (
          <Reveal>
            <p className="font-script text-3xl text-cream sm:text-4xl">Dear {guest},</p>
          </Reveal>
        )}

        <h2 className="mt-6 font-serif text-[clamp(1.9rem,6vw,3.1rem)] uppercase leading-[1.15] tracking-[0.1em] text-ivory">
          <TextReveal text="Dear friends and family" />
        </h2>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-[46ch] text-[15px] font-light leading-[1.9] text-cream/75">
            We are thrilled to invite you to join us as we begin the greatest adventure of our
            lives. Your love and support mean the world to us, and we cannot wait to celebrate
            together in a place close to our hearts.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-md">
          <ImageReveal
            src={config.images.portrait}
            alt={`${config.couple.groom.first} and ${config.couple.bride.first}`}
            className="rounded-[26px] border border-cream/15"
            imgClassName="aspect-[4/5] rounded-[26px]"
          />
          <Stamp
            top="Love trip"
            bottom={`${config.destination.city} ${config.wedding.dateShort.slice(-4)}`}
            tone="ivory"
            size={104}
            tilt={9}
            className="absolute -bottom-8 -right-4 sm:-right-10"
          />
        </div>
      </div>
    </section>
  );
}
