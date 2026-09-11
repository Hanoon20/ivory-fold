import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TextReveal } from './ui/Reveal';
import { useWedding } from '../context/WeddingContext';

export default function Gallery() {
  const { gallery } = useWedding();
  const [index, setIndex] = useState(-1);
  const touchX = useRef(null);

  const close = useCallback(() => setIndex(-1), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % gallery.length), [gallery.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [gallery.length]
  );

  useEffect(() => {
    if (index < 0) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [index, close, next, prev]);

  return (
    <section id="gallery" className="bg-navy navy-grain py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="label text-cream/50">Moments so far</p>
        <h2 className="mt-4 font-serif text-[clamp(1.8rem,6vw,2.8rem)] uppercase tracking-[0.1em] text-ivory">
          <TextReveal text="Gallery" />
        </h2>

        <div className="mt-12 columns-2 gap-4 sm:gap-6 lg:columns-3">
          {gallery.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 1, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden sm:mb-6"
              aria-label={`Open image: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition-transform duration-[1.6s] ease-silk group-hover:scale-[1.06] ${
                  img.span === 'tall'
                    ? 'aspect-[3/4.4]'
                    : img.span === 'wide'
                    ? 'aspect-[4/3]'
                    : 'aspect-square'
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index >= 0 && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-navy-deep/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current == null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (dx < -50) next();
              if (dx > 50) prev();
              touchX.current = null;
            }}
          >
            <button
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute right-5 top-5 rounded-full border border-ivory/25 p-2.5 text-ivory"
            >
              <X size={18} strokeWidth={1.3} />
            </button>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 rounded-full border border-ivory/20 p-3 text-ivory sm:left-8"
            >
              <ChevronLeft size={20} strokeWidth={1.2} />
            </button>
            <motion.img
              key={gallery[index].src}
              src={gallery[index].src}
              alt={gallery[index].alt}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[82vh] max-w-[86vw] object-contain"
            />
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 rounded-full border border-ivory/20 p-3 text-ivory sm:right-8"
            >
              <ChevronRight size={20} strokeWidth={1.2} />
            </button>
            <p className="absolute bottom-6 label text-ivory/60">
              {index + 1} / {gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
