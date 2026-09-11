// Ivory paper surface, optionally with scalloped ticket edges.
export default function PaperCard({ children, className = '', scallop = false }) {
  return <div className={`paper relative ${scallop ? 'scallop-y' : ''} ${className}`}>{children}</div>;
}
