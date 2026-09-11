import { scrollToSection } from '../hooks/useLenis';
import { useWedding } from '../context/WeddingContext';

export default function Footer() {
  const config = useWedding();

  return (
    <footer className="border-t border-cream/12 bg-navy-deep px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-lg uppercase tracking-[0.18em] text-ivory">
            {config.couple.groom.first} &amp; {config.couple.bride.first}
          </p>
          <p className="mt-2 text-sm font-light text-cream/60">
            {config.wedding.dateLabel} · {config.venue.name}, {config.destination.city}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => scrollToSection('rsvp')} className="label link-underline text-cream/70 hover:text-ivory">
            RSVP
          </button>
          <button onClick={() => scrollToSection('venue')} className="label link-underline text-cream/70 hover:text-ivory">
            Venue
          </button>
          <button onClick={() => scrollToSection('home')} className="label link-underline text-cream/70 hover:text-ivory">
            Top
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-[11px] font-light tracking-[0.2em] text-cream/30">
        Invitation by{' '}
        <a href={config.brand.url} className="link-underline" target="_blank" rel="noopener noreferrer">
          {config.brand.name}
        </a>
      </p>
    </footer>
  );
}
