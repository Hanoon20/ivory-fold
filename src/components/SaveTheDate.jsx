import { Heart, CalendarPlus, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import PaperCard from './ui/PaperCard';
import Reveal from './ui/Reveal';
import { googleCalendarUrl, downloadICS } from '../utils/calendar';
import { useWedding } from '../context/WeddingContext';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function buildMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday-first
  const total = new Date(year, month + 1, 0).getDate();
  return [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
}

export default function SaveTheDate() {
  const config = useWedding();
  const date = new Date(config.wedding.dateISO);
  const cells = buildMonth(date);
  const weddingDay = date.getDate();
  const monthLabel = date
    .toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    .toUpperCase();

  return (
    <section id="save-the-date" className="bg-navy navy-grain px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-md">
        <PaperCard scallop className="px-6 pb-10 pt-10 sm:px-9">
          <p className="text-center font-serif text-lg uppercase tracking-[0.32em] text-navy">
            {monthLabel}
          </p>
          <div className="dotted-line mx-auto mt-5 h-px w-full text-navy/40" />

          <div className="mt-6 grid grid-cols-7 gap-y-3 text-center">
            {DAYS.map((d, i) => (
              <span key={i} className="label text-navy/45">
                {d}
              </span>
            ))}
            {cells.map((day, i) => (
              <span
                key={i}
                className={`relative mx-auto flex h-8 w-8 items-center justify-center font-serif text-[15px] ${
                  day === weddingDay ? 'text-ivory' : 'text-navy/75'
                }`}
              >
                {day === weddingDay && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-navy"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative">{day}</span>
              </span>
            ))}
          </div>

          <div className="dotted-line mt-8 h-px w-full text-navy/40" />

          <Reveal className="mt-6 text-center">
            <p className="label text-navy/55">Save the date</p>
            <p className="mt-3 font-serif text-3xl tracking-[0.14em] text-navy">
              {config.wedding.dateShort}
            </p>
            <motion.span
              className="mt-4 inline-block text-navy"
              animate={{ scale: [1, 1.16, 1] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={14} fill="currentColor" strokeWidth={0} />
            </motion.span>
          </Reveal>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={googleCalendarUrl(config)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 bg-navy px-5 py-3.5 label text-ivory transition hover:bg-navy-soft"
            >
              <CalendarPlus size={14} strokeWidth={1.4} /> Google Calendar
            </a>
            <button
              type="button"
              onClick={() => downloadICS(config)}
              className="flex flex-1 items-center justify-center gap-2 border border-navy/35 px-5 py-3.5 label text-navy transition hover:bg-navy hover:text-ivory"
            >
              <Download size={14} strokeWidth={1.4} /> Download .ics
            </button>
          </div>
        </PaperCard>
      </div>
    </section>
  );
}
