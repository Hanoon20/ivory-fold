import { useEffect, useRef, useState } from 'react';
import { Music, Pause } from 'lucide-react';
import { useWedding } from '../context/WeddingContext';

// Never autoplays. Sits above the fold-out nav, out of the way of the thumb.
export default function MusicPlayer() {
  const { music } = useWedding();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => audioRef.current?.pause(), []);

  if (!music?.src) return null;

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={music.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 bg-navy-deep/80 text-cream backdrop-blur transition hover:border-cream/70"
      >
        <span className={playing ? 'animate-spin-slow' : ''}>
          {playing ? <Pause size={15} strokeWidth={1.4} /> : <Music size={15} strokeWidth={1.4} />}
        </span>
      </button>
    </>
  );
}
