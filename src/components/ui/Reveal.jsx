import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

// Word-by-word reveal for headings.
export function TextReveal({ text, className = '', delay = 0, stagger = 0.06 }) {
  const reduce = useReducedMotion();
  const words = String(text).split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={reduce ? { opacity: 0 } : { y: '105%' }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Image that uncovers itself with a clip-path wipe.
export function ImageReveal({ src, alt, className = '', imgClassName = '', delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.4, delay, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={reduce ? {} : { scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.8, delay, ease: EASE }}
      />
    </motion.div>
  );
}
