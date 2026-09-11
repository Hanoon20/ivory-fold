function toICSDate(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function googleCalendarUrl(config) {
  const { wedding, venue, couple } = config;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${couple.groom.first} & ${couple.bride.first} — Wedding`,
    dates: `${toICSDate(wedding.dateISO)}/${toICSDate(wedding.endISO)}`,
    details: `We would be delighted to celebrate with you. ${wedding.tagline}.`,
    location: `${venue.name}, ${venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadICS(config) {
  const { wedding, venue, couple } = config;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dearday.lk//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `UID:${config.slug}@dearday.lk`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(wedding.dateISO)}`,
    `DTEND:${toICSDate(wedding.endISO)}`,
    `SUMMARY:${couple.groom.first} & ${couple.bride.first} — Wedding`,
    `LOCATION:${venue.name}\\, ${venue.address}`,
    `DESCRIPTION:${wedding.tagline}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${config.slug}-save-the-date.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
