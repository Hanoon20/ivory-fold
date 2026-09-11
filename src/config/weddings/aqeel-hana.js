// Second wedding, same codebase. Only the data changes.
import base from './mohammed-maryam';

const config = {
  ...base,
  slug: 'aqeel-hana',
  couple: {
    groom: { first: 'Aqeel', full: 'Aqeel Mahroof' },
    bride: { first: 'Hana', full: 'Hana Nizar' },
    monogram: 'A & H',
    signature: 'Together',
  },
  wedding: {
    ...base.wedding,
    dateISO: '2027-02-14T16:00:00+05:30',
    endISO: '2027-02-14T23:00:00+05:30',
    dateLabel: '14 February 2027',
    dateShort: '14.02.2027',
    flightDate: '14.02.2027',
    time: '4:00 PM',
    hashtag: '#AqeelAndHana',
  },
  destination: { ...base.destination, city: 'Galle', region: 'Southern Province' },
  venue: {
    ...base.venue,
    name: 'The Rampart House',
    address: 'Church Street, Galle Fort 80000, Sri Lanka',
    mapsEmbed: 'https://www.google.com/maps?q=Galle%20Fort,%20Sri%20Lanka&output=embed',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Galle+Fort+Sri+Lanka',
  },
};

export default config;
