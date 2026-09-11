import { useEffect, useState, lazy, Suspense } from 'react';
import useLenis from './hooks/useLenis';
import { useWedding } from './context/WeddingContext';

import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CoupleIntro from './components/CoupleIntro';
import Story from './components/Story';
import Destination from './components/Destination';
import Venue from './components/Venue';
import Timeline from './components/Timeline';
import Countdown from './components/Countdown';
import SaveTheDate from './components/SaveTheDate';
import FlightPath from './components/FlightPath';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

// Below-the-fold, heavier sections are split out of the first bundle.
const DressCode = lazy(() => import('./components/DressCode'));
const PhotoScroll = lazy(() => import('./components/PhotoScroll'));
const TravelInfo = lazy(() => import('./components/TravelInfo'));
const Gallery = lazy(() => import('./components/Gallery'));
const RSVP = lazy(() => import('./components/RSVP'));
const GuestBook = lazy(() => import('./components/GuestBook'));
const FinalSection = lazy(() => import('./components/FinalSection'));

export default function InvitationPage() {
  const config = useWedding();
  const [opened, setOpened] = useState(false);
  useLenis(opened);

  // Hold the page still until the guest opens the invitation.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  useEffect(() => {
    const groom = config.couple.groom.first;
    const bride = config.couple.bride.first;
    document.title = `${groom} & ${bride} — Wedding Invitation`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        `${config.wedding.tagline}. Join ${groom} and ${bride} in ${config.destination.city}, ${config.destination.country} on ${config.wedding.dateLabel}.`
      );
  }, [config]);

  return (
    <>
      {!opened && <LoadingScreen onOpen={() => setOpened(true)} />}

      <div aria-hidden={!opened} className={opened ? '' : 'pointer-events-none'}>
        <Navigation />
        <FlightPath />

        <main>
          <Hero />
          <CoupleIntro />
          <Story />
          <Countdown />
          <Destination />
          <Venue />
          <Timeline />
          <SaveTheDate />

          <Suspense fallback={<div className="h-[40vh] bg-navy" />}>
            <PhotoScroll />
            <DressCode />
            <Gallery />
            <TravelInfo />
            <RSVP />
            <GuestBook />
            <FinalSection />
          </Suspense>
        </main>

        <Footer />
        <MusicPlayer />
      </div>
    </>
  );
}
