import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWedding } from '../context/WeddingContext';

gsap.registerPlugin(ScrollTrigger);

// Vertical scroll drives a horizontal filmstrip. Pinning is skipped on small
// screens and for reduced motion, where the strip becomes a swipeable row.
export default function PhotoScroll() {
  const { photoScroll } = useWedding();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.matchMedia('(max-width: 767px)').matches;
    if (reduced || isSmall) return undefined;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const distance = () => track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        '[data-strip-image]',
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-deep navy-grain py-16 md:h-[100svh] md:py-0"
    >
      <div className="flex h-full flex-col justify-center">
        <p className="label px-6 text-cream/50 md:px-12">The long way here</p>
        <div
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mt-10 md:snap-none md:overflow-visible md:px-12 md:pb-0"
        >
          {photoScroll.map((item) => (
            <figure
              key={item.src}
              className="w-[78vw] shrink-0 snap-center md:w-[46vw] lg:w-[34vw]"
            >
              <div className="overflow-hidden">
                <img
                  data-strip-image
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
                />
              </div>
              <figcaption className="label mt-4 text-cream/55">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
