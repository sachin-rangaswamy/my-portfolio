'use client';

import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

/**
 * Ψ — The Quantum Designer.
 * A permanent, breathing wavefunction watermark that drifts with the cursor.
 * Always present, never distracting.
 */
export default function PsiWatermark() {
  const prefersReducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 12, damping: 20 });
  const y = useSpring(my, { stiffness: 12, damping: 20 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e: MouseEvent) => {
      // Normalized offset from viewport center, scaled to a gentle parallax
      const nx = (e.clientX / window.innerWidth - 0.5) * 40;
      const ny = (e.clientY / window.innerHeight - 0.5) * 40;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my, prefersReducedMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <motion.span
        style={{ x, y }}
        animate={
          prefersReducedMotion
            ? undefined
            : { rotate: [0, 6, 0, -6, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="select-none font-display text-[70vh] leading-none text-quantum/[0.05]"
      >
        Ψ
      </motion.span>
    </div>
  );
}
