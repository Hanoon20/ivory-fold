import { useState } from 'react';
import { Link2, Share2, MessageCircle, Facebook } from 'lucide-react';
import { copyLink, nativeShare, whatsappUrl } from '../utils/share';
import { useWedding } from '../context/WeddingContext';

export default function ShareInvitation({ tone = 'ivory' }) {
  const config = useWedding();
  const [note, setNote] = useState('');
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = `${config.couple.groom.first} & ${config.couple.bride.first} — Wedding Invitation`;

  const flash = (msg) => {
    setNote(msg);
    setTimeout(() => setNote(''), 2600);
  };

  const base =
    tone === 'navy'
      ? 'border-navy/30 text-navy hover:bg-navy hover:text-ivory'
      : 'border-cream/30 text-cream hover:bg-cream hover:text-navy';

  return (
    <div className="text-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={whatsappUrl(config.contact.whatsapp, `${title} — ${url}`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 border px-5 py-3 label transition ${base}`}
        >
          <MessageCircle size={13} strokeWidth={1.4} /> WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 border px-5 py-3 label transition ${base}`}
        >
          <Facebook size={13} strokeWidth={1.4} /> Facebook
        </a>
        <button
          type="button"
          onClick={async () => flash((await copyLink(url)) ? 'Invitation link copied' : 'Copy failed — long-press the address bar instead')}
          className={`flex items-center gap-2 border px-5 py-3 label transition ${base}`}
        >
          <Link2 size={13} strokeWidth={1.4} /> Copy link
        </button>
        <button
          type="button"
          onClick={async () => {
            const res = await nativeShare({ title, text: config.wedding.tagline, url });
            if (res === 'unsupported') flash('Sharing is not available on this browser');
          }}
          className={`flex items-center gap-2 border px-5 py-3 label transition ${base}`}
        >
          <Share2 size={13} strokeWidth={1.4} /> Share
        </button>
      </div>
      <p aria-live="polite" className="mt-4 h-4 text-xs font-light tracking-wide opacity-70">
        {note}
      </p>
    </div>
  );
}
