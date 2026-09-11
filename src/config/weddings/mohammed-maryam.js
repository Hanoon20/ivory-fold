// One wedding = one file. Copy this file, change the values, register it in
// src/config/weddings/index.js and a new invitation exists at /wedding/<slug>.

const config = {
  slug: 'mohammed-maryam',

  couple: {
    groom: { first: 'Mohammed', full: 'Mohammed Rizwan' },
    bride: { first: 'Maryam', full: 'Maryam Fathima' },
    monogram: 'M & M',
    signature: 'Are One',
  },

  wedding: {
    // ISO with timezone so the countdown is correct everywhere
    dateISO: '2026-12-25T12:00:00+05:30',
    endISO: '2026-12-25T23:00:00+05:30',
    dateLabel: '25 December 2026',
    dateShort: '25.12.2026',
    flightDate: '25.12.2026',
    class: 'First Class',
    time: '12:00 PM',
    tagline: 'Boarding for love',
    hashtag: '#MohammedAndMaryam',
  },

  destination: {
    city: 'Puttalam',
    country: 'Sri Lanka',
    region: 'North Western Province',
    blurb:
      'A quiet stretch of lagoon, salt pans that turn pink at dusk and coconut groves that run to the sea. Two hours north of Colombo, and worth every kilometre.',
    weather: '28–32°C · dry and breezy in December',
    flightTime: '2 hrs by road from Colombo (CMB)',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=70',
  },

  venue: {
    name: 'The Palmyra Estate',
    address: 'Kalpitiya Road, Puttalam 61300, Sri Lanka',
    mapsEmbed:
      'https://www.google.com/maps?q=Puttalam,%20Sri%20Lanka&output=embed',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Puttalam+Sri+Lanka',
    directions: 'Colombo → Negombo → Chilaw → Puttalam on the A3. Signage from the lagoon roundabout.',
    landmarks: 'Opposite the Puttalam lagoon jetty, 400 m past the old salt works.',
    parking: 'Valet parking at the north gate, plus open parking for 120 cars.',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=70',
  },

  contact: {
    whatsapp: '94770000000', // country code + number, digits only
    email: 'hello@dearday.lk',
    rsvpBy: '30 November 2026',
  },

  story: [
    { year: '2021', title: 'How we met', text: 'A delayed flight, two window seats and one shared umbrella in Colombo.' },
    { year: '2022', title: 'The first date', text: 'Crab curry by the water. She ordered for both of us.' },
    { year: '2025', title: 'The proposal', text: 'Sunrise at Kalpitiya, with the fishermen as unplanned witnesses.' },
    { year: '2026', title: 'The wedding', text: 'And now the part where you come along.' },
  ],

  timeline: [
    { time: '12:00', label: 'Guest arrival', note: 'Welcome drinks in the garden' },
    { time: '12:30', label: 'Nikah ceremony', note: 'Under the palm colonnade' },
    { time: '13:30', label: 'Reception', note: 'Photographs and long tables' },
    { time: '19:00', label: 'Dinner', note: 'Sri Lankan feast by the lagoon' },
    { time: '23:00', label: 'End of evening', note: 'Send-off with lanterns' },
  ],

  dressCode: {
    note: 'We would love to see our family and friends in elegant, timeless attire. Our palette for the day:',
    palette: [
      { name: 'Ivory', hex: '#F4EDE0' },
      { name: 'Cream', hex: '#E7DAC4' },
      { name: 'Taupe', hex: '#B3A28C' },
      { name: 'Navy', hex: '#101F3C' },
      { name: 'Black', hex: '#0B1120' },
    ],
    women: {
      text: 'Floor-length saree, kandyan or a flowing gown. Soft fabrics photograph best in the afternoon light.',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=70',
    },
    men: {
      text: 'Linen or light wool suit, national dress or a sherwani. Ties optional, sleeves rolled by sunset.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=70',
    },
  },

  travel: [
    { title: 'How to get there', body: 'Puttalam is 130 km north of Colombo. Roughly 2 hours 30 minutes by car on the A3 coastal road, or 3 hours by intercity coach from Pettah.' },
    { title: 'Airport', body: 'Bandaranaike International (CMB) in Katunayake is the closest airport, 95 km away. Pre-book a transfer at the arrivals desk.' },
    { title: 'Transport on the day', body: 'A shuttle leaves the Puttalam town clock tower at 11:00 and returns after the send-off. No booking needed, just tell us you are coming.' },
    { title: 'Local taxis', body: 'PickMe and Uber both operate from Chilaw upward. Three-wheelers are plentiful in town; agree the fare before you set off.' },
  ],

  gallery: [
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=70', alt: 'The couple at the ceremony', span: 'tall' },
    { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=70', alt: 'Guests celebrating', span: 'wide' },
    { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=70', alt: 'Bridal portrait' },
    { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=70', alt: 'Held hands with rings', span: 'tall' },
    { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=70', alt: 'The first dance' },
    { src: 'https://images.unsplash.com/photo-1470217957101-da7150b9b681?auto=format&fit=crop&w=1000&q=70', alt: 'Table setting at dusk', span: 'wide' },
  ],

  photoScroll: [
    { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=70', caption: 'Colombo, 2021' },
    { src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=70', caption: 'Kalpitiya, 2023' },
    { src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=70', caption: 'The proposal, 2025' },
    { src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1200&q=70', caption: 'Engagement, 2026' },
  ],

  images: {
    hero: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=70',
    portrait: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=70',
    closing: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&w=1600&q=70',
  },

  music: {
    // drop an mp3 into /public and point to it, e.g. '/music/nocturne.mp3'
    src: '',
    title: 'Nocturne in E flat',
  },

  guestbook: [
    { name: 'Aunty Nazeema', message: 'Waited years for this news. See you in Puttalam, insha Allah.' },
    { name: 'Rashad & Fazna', message: 'Booking the shuttle already. So happy for you both.' },
    { name: 'The Fernando family', message: 'A love that started on a delayed flight deserves the whole sky.' },
  ],

  brand: { name: 'Dearday.lk', url: 'https://dearday.lk' },
};

export default config;
