'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

// Heavy Three.js scene — load lazily, client-only
const CrystalVisualization = dynamic(() => import('./CrystalVisualization'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="animate-pulse font-display text-6xl text-quantum/30">
        Ψ
      </span>
    </div>
  ),
});

function RotatingPhrases({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % phrases.length),
      3200
    );
    return () => clearInterval(id);
  }, [phrases.length, prefersReducedMotion]);

  return (
    <div className="relative h-9 overflow-hidden sm:h-10">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="gradient-text font-heading text-xl font-medium sm:text-2xl"
        >
          {phrases[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('hero');
  const prefersReducedMotion = useReducedMotion();
  const phrases = t.raw('phrases') as string[];
  const name = t('name');

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-electron-density">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-16 pt-28 lg:grid-cols-2 lg:gap-6 lg:px-8">
        {/* Text column */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 font-heading text-sm uppercase tracking-[0.4em] text-quantum"
          >
            {t('intro')}
          </motion.p>

          <h1 className="font-display text-4xl font-extrabold leading-tight text-warm sm:text-6xl lg:text-[3.6rem] xl:text-7xl">
            {name.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: 30 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.03, duration: 0.5 }}
                className="inline-block"
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-4 font-heading text-base text-warm/70 sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6"
          >
            <RotatingPhrases phrases={phrases} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/research"
              className="animate-pulse-glow rounded-full bg-gradient-to-r from-quantum to-energy px-7 py-3.5 font-heading font-semibold text-space transition hover:scale-[1.03]"
            >
              {t('ctaJourney')}
            </Link>
            <Link
              href="/contact"
              className="glass rounded-full px-7 py-3.5 font-heading text-warm/90 transition hover:border-energy/50 hover:text-energy"
            >
              {t('ctaContact')}
            </Link>
          </motion.div>
        </div>

        {/* 3D crystal column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative h-[340px] sm:h-[440px] lg:h-[560px]"
        >
          <CrystalVisualization />
          <p className="pointer-events-none absolute bottom-0 w-full text-center font-heading text-xs uppercase tracking-[0.3em] text-warm/40">
            {t('latticeCaption')}
          </p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-warm/40">
          {t('scrollHint')}
        </span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-energy"
          aria-hidden
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
