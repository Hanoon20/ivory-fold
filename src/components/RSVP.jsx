import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import Modal from './ui/Modal';
import { TextReveal } from './ui/Reveal';
import { whatsappUrl, rsvpMessage } from '../utils/share';
import { useWedding } from '../context/WeddingContext';

const inputClass =
  'w-full border-b border-navy/25 bg-transparent py-2.5 font-serif text-lg text-navy placeholder:text-navy/35 focus:border-navy focus:outline-none';

export default function RSVP() {
  const config = useWedding();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: config.guest || '',
    contact: '',
    guests: '1',
    attending: 'yes',
    meal: 'No preference',
    message: '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (attending) => {
    // Swap this for a fetch() to your endpoint, Google Sheet or Formspree.
    const payload = { ...form, attending, wedding: config.slug, at: new Date().toISOString() };
    console.info('RSVP submitted', payload);
    setForm((f) => ({ ...f, attending }));
    setSent(true);
  };

  const closeAll = () => {
    setOpen(false);
    setTimeout(() => setSent(false), 500);
  };

  return (
    <section id="rsvp" className="paper py-24 sm:py-32">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="font-serif text-[clamp(2rem,7vw,3.2rem)] uppercase leading-tight tracking-[0.1em] text-navy">
          <TextReveal text="Will you join us?" />
        </h2>
        <p className="mx-auto mt-5 max-w-[42ch] text-[15px] font-light leading-[1.9] text-navy/70">
          Seats are limited and the lagoon is waiting. Kindly reply before{' '}
          {config.contact.rsvpBy}.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            whileHover={{ y: -2 }}
            className="w-full bg-navy px-9 py-4 label text-ivory transition-colors hover:bg-navy-soft sm:w-auto"
          >
            RSVP now
          </motion.button>
          <a
            href={whatsappUrl(config.contact.whatsapp, rsvpMessage(config, config.guest, true))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 border border-navy/30 px-9 py-4 label text-navy transition hover:bg-navy hover:text-ivory sm:w-auto"
          >
            <MessageCircle size={14} strokeWidth={1.4} /> Reply on WhatsApp
          </a>
        </div>
      </div>

      <Modal open={open} onClose={closeAll} title="RSVP">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="px-8 py-16 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-ivory"
              >
                <Check size={22} strokeWidth={1.4} />
              </motion.span>
              <h3 className="mt-7 font-serif text-2xl uppercase tracking-[0.14em] text-navy">
                {form.attending === 'yes' ? 'Your seat is reserved' : 'You will be missed'}
              </h3>
              <p className="mt-3 text-sm font-light text-navy/65">
                {form.attending === 'yes'
                  ? `See you in ${config.destination.city} on ${config.wedding.dateLabel}.`
                  : 'Thank you for letting us know. We will raise a glass to you.'}
              </p>
              <button
                onClick={closeAll}
                data-autofocus
                className="mt-8 border border-navy/30 px-8 py-3 label text-navy transition hover:bg-navy hover:text-ivory"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-7 py-9 sm:px-10"
            >
              <p className="label text-navy/50">Reservation card</p>
              <h3 className="mt-2 font-serif text-2xl uppercase tracking-[0.1em] text-navy">
                {config.couple.groom.first} &amp; {config.couple.bride.first}
              </h3>
              <div className="dotted-line mt-5 h-px w-full text-navy/40" />

              <div className="mt-7 space-y-6 text-left">
                <div>
                  <label htmlFor="rsvp-name" className="label text-navy/50">
                    Guest name
                  </label>
                  <input
                    id="rsvp-name"
                    data-autofocus
                    value={form.name}
                    onChange={set('name')}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="rsvp-contact" className="label text-navy/50">
                    Email or phone
                  </label>
                  <input
                    id="rsvp-contact"
                    value={form.contact}
                    onChange={set('contact')}
                    className={inputClass}
                    placeholder="So we can reach you"
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rsvp-guests" className="label text-navy/50">
                      Number of guests
                    </label>
                    <select
                      id="rsvp-guests"
                      value={form.guests}
                      onChange={set('guests')}
                      className={inputClass}
                    >
                      {['1', '2', '3', '4', '5'].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="rsvp-meal" className="label text-navy/50">
                      Meal preference
                    </label>
                    <select
                      id="rsvp-meal"
                      value={form.meal}
                      onChange={set('meal')}
                      className={inputClass}
                    >
                      {['No preference', 'Chicken', 'Fish', 'Vegetarian'].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="rsvp-message" className="label text-navy/50">
                    A note for the couple
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={2}
                    value={form.message}
                    onChange={set('message')}
                    className={`${inputClass} resize-none`}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => submit('yes')}
                  disabled={!form.name.trim()}
                  className="flex-1 bg-navy px-6 py-4 label text-ivory transition hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Yes, I'll be there
                </button>
                <button
                  type="button"
                  onClick={() => submit('no')}
                  disabled={!form.name.trim()}
                  className="flex-1 border border-navy/30 px-6 py-4 label text-navy transition hover:bg-navy hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Sorry, can't make it
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </section>
  );
}
