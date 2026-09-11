import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from './ui/Reveal';
import { useWedding } from '../context/WeddingContext';

export default function GuestBook() {
  const config = useWedding();
  const [notes, setNotes] = useState(config.guestbook);
  const [form, setForm] = useState({ name: config.guest || '', message: '' });
  const [status, setStatus] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setStatus('Add your name and a short note to sign the book.');
      return;
    }
    // Replace with a POST to your backend; the shape stays the same.
    setNotes((n) => [{ ...form }, ...n]);
    setForm({ name: form.name, message: '' });
    setStatus('Your note is in the book.');
  };

  return (
    <section id="guestbook" className="bg-navy navy-grain py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center font-serif text-[clamp(1.7rem,5.5vw,2.6rem)] uppercase leading-tight tracking-[0.1em] text-ivory">
          <TextReveal text="Leave a note for the couple" />
        </h2>

        <form onSubmit={submit} className="mx-auto mt-11 max-w-lg space-y-5">
          <div>
            <label htmlFor="gb-name" className="label text-cream/50">
              Your name
            </label>
            <input
              id="gb-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full border-b border-cream/25 bg-transparent py-2.5 font-serif text-lg text-ivory placeholder:text-cream/30 focus:border-cream focus:outline-none"
              placeholder="Who is writing?"
            />
          </div>
          <div>
            <label htmlFor="gb-message" className="label text-cream/50">
              Your message
            </label>
            <textarea
              id="gb-message"
              rows={3}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full resize-none border-b border-cream/25 bg-transparent py-2.5 font-serif text-lg text-ivory placeholder:text-cream/30 focus:border-cream focus:outline-none"
              placeholder="A wish, a memory, an inside joke"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <p aria-live="polite" className="text-sm font-light text-cream/60">
              {status}
            </p>
            <button
              type="submit"
              className="border border-cream/35 px-7 py-3 label text-ivory transition hover:bg-cream hover:text-navy"
            >
              Sign the book
            </button>
          </div>
        </form>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          <AnimatePresence initial={false}>
            {notes.map((note, i) => (
              <motion.li
                key={`${note.name}-${i}-${note.message.slice(0, 8)}`}
                layout
                initial={{ opacity: 0, y: 18, rotate: i % 2 ? 0.6 : -0.6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="paper px-6 py-6"
              >
                <p className="font-serif text-[17px] font-light leading-[1.75] text-navy/85">
                  {note.message}
                </p>
                <p className="mt-4 font-script text-2xl text-navy">{note.name}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
