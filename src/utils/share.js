export function whatsappUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function rsvpMessage(config, guestName, attending = true) {
  const who = guestName ? `I'm ${guestName}. ` : '';
  const verb = attending ? "I'm confirming my attendance" : "sadly I can't make it";
  return `Hi, ${who}${verb} for ${config.couple.groom.first} & ${config.couple.bride.first}'s wedding on ${config.wedding.dateLabel}.`;
}

export async function nativeShare({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch {
      return 'cancelled';
    }
  }
  return 'unsupported';
}

export async function copyLink(url) {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
