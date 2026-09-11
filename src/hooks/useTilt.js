import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

// Desktop-only pointer tilt for the boarding pass. Returns motion values
// that stay at rest on touch devices and when reduced motion is requested.
export default function useTilt({ max = 8, scale = 1.01 } = {}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), spring);
  const glareX = useTransform(x, [-0.5, 0.5], ['20%', '80%']);

  const isCoarse =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const active = !reduce && !isCoarse;

  const onPointerMove = (e) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    active,
    handlers: active ? { onPointerMove, onPointerLeave } : {},
    style: active ? { rotateX, rotateY, scale } : {},
    glareX,
  };
}
