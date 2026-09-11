import Modal from './ui/Modal';
import { useWedding } from '../context/WeddingContext';

export default function MapModal({ open, onClose }) {
  const { venue } = useWedding();

  return (
    <Modal open={open} onClose={onClose} title="How to get to the venue" wide>
      <div className="p-6 sm:p-8">
        <p className="label text-navy/50">Venue</p>
        <h3 className="mt-2 font-serif text-2xl uppercase tracking-[0.08em] text-navy">
          {venue.name}
        </h3>
        <p className="mt-1 text-sm font-light text-navy/70">{venue.address}</p>

        <div className="mt-6 aspect-[16/10] w-full overflow-hidden border border-navy/20">
          <iframe
            title={`Map of ${venue.name}`}
            src={venue.mapsEmbed}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <dl className="mt-6 space-y-4 text-navy/80">
          <div>
            <dt className="label text-navy/45">Directions</dt>
            <dd className="mt-1 text-[15px] font-light leading-relaxed">{venue.directions}</dd>
          </div>
          <div>
            <dt className="label text-navy/45">Nearby landmarks</dt>
            <dd className="mt-1 text-[15px] font-light leading-relaxed">{venue.landmarks}</dd>
          </div>
          <div>
            <dt className="label text-navy/45">Parking</dt>
            <dd className="mt-1 text-[15px] font-light leading-relaxed">{venue.parking}</dd>
          </div>
        </dl>

        <a
          href={venue.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          data-autofocus
          className="mt-7 inline-block bg-navy px-7 py-3.5 label text-ivory transition hover:bg-navy-soft"
        >
          Open in Google Maps
        </a>
      </div>
    </Modal>
  );
}
