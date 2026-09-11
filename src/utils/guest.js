// Reads ?guest=Hanoon from the URL and returns a safe, prettified name.
export function readGuestName() {
  if (typeof window === 'undefined') return '';
  const raw = new URLSearchParams(window.location.search).get('guest');
  if (!raw) return '';
  const cleaned = decodeURIComponent(raw)
    .replace(/[^\p{L}\p{M}\s.'-]/gu, '')
    .trim()
    .slice(0, 40);
  if (!cleaned) return '';
  return cleaned
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export function guestLink(baseUrl, name) {
  const url = new URL(baseUrl);
  url.searchParams.set('guest', name);
  return url.toString();
}
