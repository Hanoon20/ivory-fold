import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '../hooks/useLenis';
import useSectionObserver from '../hooks/useSectionObserver';
import { useWedding } from '../context/WeddingContext';

const ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our story' },
  { id: 'venue', label: 'Venue' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
];

export default function Navigation() {
  const config = useWedding();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useSectionObserver(ITEMS.map((i) => i.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToSection(id), open ? 380 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk ${
          scrolled ? 'bg-navy-deep/85 py-3 backdrop-blur-md' : 'py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => go('home')}
            className="font-serif text-sm uppercase tracking-[0.3em] text-ivory"
          >
            {config.couple.monogram}
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={`label link-underline transition-colors duration-500 ${
                    active === item.id ? 'text-gold' : 'text-ivory/70 hover:text-ivory'
                  }`}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="lg:hidden rounded-full border border-ivory/25 p-2.5 text-ivory"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={17} strokeWidth={1.3} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-navy-deep navy-grain px-7 pb-14 pt-6"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-ivory/25 p-2.5 text-ivory"
              >
                <X size={17} strokeWidth={1.3} />
              </button>
            </div>
            <ul className="mt-auto space-y-6">
              {ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.6 }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className="font-serif text-4xl font-light text-ivory"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <p className="label mt-14 text-ivory/45">{config.wedding.dateLabel}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
