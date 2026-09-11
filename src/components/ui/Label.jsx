export default function Label({ children, className = '' }) {
  return <p className={`label ${className}`}>{children}</p>;
}

export function Rule({ className = '', tone = 'currentColor' }) {
  return (
    <span
      aria-hidden="true"
      className={`dotted-line block h-px ${className}`}
      style={{ color: tone }}
    />
  );
}

export function PlaneIcon({ className = '', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" {...rest}>
      <path d="M21.6 11.1 14 9.3 9.9 2.6a.9.9 0 0 0-1.6.1l-.6 1.4a.9.9 0 0 0 .1.9l3 4.6-4.6.4-1.9-2a.9.9 0 0 0-.9-.2l-.9.3a.8.8 0 0 0-.4 1.2L4.4 12l-2.3 3a.8.8 0 0 0 .4 1.2l.9.3a.9.9 0 0 0 .9-.2l1.9-2 4.6.4-3 4.6a.9.9 0 0 0-.1.9l.6 1.4a.9.9 0 0 0 1.6.1L14 14.7l7.6-1.8a.83.83 0 0 0 0-1.8Z" />
    </svg>
  );
}
