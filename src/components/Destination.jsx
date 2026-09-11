import Reveal, { TextReveal, ImageReveal } from './ui/Reveal';
import Stamp from './ui/Stamp';
import { useWedding } from '../context/WeddingContext';

export default function Destination() {
  const { destination } = useWedding();

  return (
    <section id="destination" className="relative overflow-hidden bg-navy navy-grain py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <ImageReveal
            src={destination.image}
            alt={`${destination.city}, ${destination.country}`}
            className="border border-cream/15"
            imgClassName="aspect-[4/5]"
          />
          <Stamp
            top="Destination wedding"
            bottom={destination.country}
            tone="ivory"
            size={112}
            tilt={-10}
            className="absolute -left-5 -top-8"
          />
        </div>

        <div>
          <p className="label text-cream/55">A destination to remember</p>
          <h2 className="mt-4 font-serif text-[clamp(2.2rem,8vw,4rem)] uppercase leading-[1] tracking-[0.08em] text-ivory">
            <TextReveal text={destination.city} />
          </h2>
          <p className="mt-2 font-script text-3xl text-cream/85">{destination.country}</p>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[50ch] text-[15px] font-light leading-[1.9] text-cream/75">
              {destination.blurb}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <dl className="mt-9 grid gap-px border border-cream/15 bg-cream/15 sm:grid-cols-2">
              <div className="bg-navy px-5 py-5">
                <dt className="label text-cream/45">Weather in December</dt>
                <dd className="mt-2 font-serif text-lg text-ivory">{destination.weather}</dd>
              </div>
              <div className="bg-navy px-5 py-5">
                <dt className="label text-cream/45">Getting there</dt>
                <dd className="mt-2 font-serif text-lg text-ivory">{destination.flightTime}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
