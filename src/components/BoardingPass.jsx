import { motion } from 'framer-motion';
import useTilt from '../hooks/useTilt';
import { useWedding } from '../context/WeddingContext';
import { PlaneIcon } from './ui/Label';

function Field({ label, value, className = '' }) {
  return (
    <div className={`px-3 py-2.5 sm:px-4 sm:py-3 ${className}`}>
      <p className="label text-[9px] text-navy/45 sm:text-[10px]">{label}</p>
      <p className="mt-1 font-serif text-[12.5px] uppercase leading-tight tracking-[0.08em] text-navy sm:text-[14px]">
        {value}
      </p>
    </div>
  );
}

function Barcode() {
  const bars = [3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 1, 2, 1, 1, 3, 2, 1, 4, 1, 2, 3, 1, 1, 2];
  return (
    <div className="flex h-7 items-end gap-[2px]" aria-hidden="true">
      {bars.map((w, i) => (
        <span key={i} className="h-full bg-navy/80" style={{ width: `${w}px` }} />
      ))}
    </div>
  );
}

// Inked postmark: circle stamp plus the wavy cancellation lines a real one has.
function Postmark({ names, date }) {
  return (
    <svg viewBox="0 0 190 84" className="h-[74px] w-[168px] text-navy/70" aria-hidden="true">
      <circle cx="42" cy="42" r="34" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="42" cy="42" r="27" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="1.5 3" />
      <path d="M42 30l2.4 8.6 8.6 3.4-8.6 3.4L42 54l-2.4-8.6L31 42l8.6-3.4z" fill="currentColor" opacity="0.85" />
      <text x="42" y="20" textAnchor="middle" fontSize="6.4" letterSpacing="1.1" fill="currentColor" fontFamily="Jost, sans-serif">
        {names}
      </text>
      <text x="42" y="70" textAnchor="middle" fontSize="6.4" letterSpacing="1.1" fill="currentColor" fontFamily="Jost, sans-serif">
        {date}
      </text>
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M84 ${28 + i * 8} q 22 -6 44 0 t 44 0`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.75"
        />
      ))}
    </svg>
  );
}

// A ticket meant to read as printed card stock: cut edges, ink, and a
// light that moves across the paper as the pointer does.
export default function BoardingPass() {
  const config = useWedding();
  const { ref, handlers, style, active, glareX } = useTilt({ max: 7 });
  const { couple, wedding, destination, venue } = config;
  const ticketNo = `${wedding.dateShort.replace(/\./g, '')}-${couple.groom.first
    .slice(0, 2)
    .toUpperCase()}${couple.bride.first.slice(0, 2).toUpperCase()}`;

  return (
    <div
      style={{ perspective: 1400 }}
      className="w-full max-w-[420px] [filter:drop-shadow(0_34px_50px_rgba(0,0,0,0.55))]"
    >
      <motion.article
        ref={ref}
        {...handlers}
        style={{ ...style, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="paper relative scallop-y overflow-hidden"
      >
        {/* paper shading: light at the top edge, weight at the bottom fold */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-navy/[0.07]"
        />
        {active && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background: 'radial-gradient(60% 55% at var(--gx) 30%, rgba(255,255,255,0.85), transparent 70%)',
              '--gx': glareX,
            }}
          />
        )}

        <div className="relative flex">
          {/* departure stub */}
          <div className="relative flex w-9 shrink-0 items-center justify-center sm:w-11">
            <span
              aria-hidden="true"
              className="absolute inset-y-4 right-0 border-r border-dashed border-navy/30"
            />
            <p className="label flex items-center gap-2 rotate-180 text-[9px] text-navy/55 [writing-mode:vertical-rl] sm:text-[10px]">
              <span className="rotate-180 text-navy/70">&#9662;</span> Departure
            </p>
          </div>

          <div className="flex-1 px-4 pb-5 pt-6 sm:px-7 sm:pb-6 sm:pt-7">
            <div className="flex items-center justify-between gap-3">
              <span className="dotted-line h-px flex-1 text-navy/40" />
              <p className="label shrink-0 text-[9px] text-navy/55 sm:text-[10px]">Wedding ticket</p>
              <span className="dotted-line h-px flex-1 text-navy/40" />
            </div>

            <div className="relative mt-6 text-center" style={{ transform: 'translateZ(26px)' }}>
              <svg
                viewBox="0 0 100 100"
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-[56%] text-navy/[0.12] sm:h-[200px] sm:w-[200px]"
              >
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.7" />
                <ellipse cx="50" cy="50" rx="20" ry="42" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <ellipse cx="50" cy="50" rx="36" ry="42" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <line x1="8" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="0.6" />
                <line x1="14" y1="30" x2="86" y2="30" stroke="currentColor" strokeWidth="0.5" />
                <line x1="14" y1="70" x2="86" y2="70" stroke="currentColor" strokeWidth="0.5" />
                <path d="M18 62 q10 -12 22 -4 t20 -6 t22 2" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>

              <PlaneIcon className="relative mx-auto h-4 w-4 text-navy/70" />

              <h1 className="relative mt-4 break-words font-serif text-[clamp(1.75rem,8.5vw,2.8rem)] uppercase leading-[1.02] tracking-[0.07em] text-navy sm:tracking-[0.09em]">
                <span className="block">{couple.groom.first}</span>
                <span className="my-0.5 block font-script text-[22px] lowercase tracking-normal text-navy/70 sm:text-2xl">
                  and
                </span>
                <span className="block">{couple.bride.first}</span>
              </h1>
            </div>

            <div
              className="mt-7 grid grid-cols-2 border border-navy/25 text-left"
              style={{ transform: 'translateZ(14px)' }}
            >
              <Field label="Flight & date" value={wedding.flightDate} className="border-b border-r border-navy/25" />
              <Field label="Class" value={wedding.class} className="border-b border-navy/25" />
              <Field
                label="Destination"
                value={`${destination.city}, ${destination.country}`}
                className="border-r border-navy/25"
              />
              <Field label="Wedding location" value={venue.name} />
            </div>

            <div className="mt-5 flex items-center justify-between gap-2">
              <Postmark
                names={`${couple.groom.first.toUpperCase()} & ${couple.bride.first.toUpperCase()}`}
                date={wedding.dateShort}
              />
              <p className="-mt-3 font-script text-[34px] leading-none text-navy sm:text-4xl">
                {couple.signature}
              </p>
            </div>

            <div className="dotted-line mt-4 h-px w-full text-navy/40" />

            <div className="mt-4 flex items-end justify-between gap-3">
              <Barcode />
              <div className="text-right">
                <p className="label text-[9px] text-navy/45">Ticket no.</p>
                <p className="mt-1 font-sans text-[11px] tracking-[0.18em] text-navy/75">{ticketNo}</p>
              </div>
            </div>

            <p className="label mt-4 text-center text-[9px] text-navy/60 sm:text-[10px]">
              {wedding.tagline}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
