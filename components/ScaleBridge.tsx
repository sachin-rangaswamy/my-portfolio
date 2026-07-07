'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCALES, type ScaleDef } from '@/lib/scales';
import Equation from './Equation';
import ScaleVisual from './ScaleVisual';

gsap.registerPlugin(ScrollTrigger);

/**
 * THE SCALE BRIDGE — a scroll-driven journey from the wavefunction to the
 * engineering component. A central energy conduit fills as you scroll
 * (GSAP ScrollTrigger); each scale node glows, expands and reveals its
 * methods on hover/tap; flowing dashes carry "information" between scales.
 */

function ScaleNode({ scale, index }: { scale: ScaleDef; index: number }) {
  const t = useTranslations('scales');
  const [expanded, setExpanded] = useState(false);
  const left = index % 2 === 0;

  return (
    <div
      className={`relative flex w-full ${left ? 'lg:justify-start' : 'lg:justify-end'} justify-center`}
    >
      {/* Node marker on the conduit */}
      <div className="absolute left-1/2 top-10 hidden -translate-x-1/2 lg:block">
        <motion.div
          whileInView={{ scale: [0, 1.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative flex h-6 w-6 items-center justify-center rounded-full border-2"
          style={{ borderColor: scale.color, backgroundColor: '#0a0a0f' }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: scale.color,
              boxShadow: `0 0 14px 3px ${scale.color}66`,
            }}
          />
        </motion.div>
        <p
          className="absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap font-heading text-[10px] tracking-widest"
          style={{ color: scale.color }}
        >
          {scale.ruler}
        </p>
      </div>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => setExpanded((v) => !v)}
        className="glass group w-full max-w-xl cursor-pointer rounded-3xl p-6 transition-all duration-300 sm:p-8 lg:w-[calc(50%-3.5rem)]"
        style={{
          boxShadow: expanded
            ? `0 0 0 1px ${scale.color}55, 0 0 40px ${scale.color}22`
            : undefined,
          transform: expanded ? 'scale(1.015)' : undefined,
        }}
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p
              className="font-heading text-xs uppercase tracking-[0.3em]"
              style={{ color: scale.color }}
            >
              {String(index + 1).padStart(2, '0')} · {t(`items.${scale.key}.range`)}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-warm sm:text-3xl">
              {t(`items.${scale.key}.name`)}
            </h3>
          </div>
          <span
            aria-hidden
            className="font-display text-3xl transition-transform duration-300 group-hover:rotate-12"
            style={{ color: scale.color }}
          >
            Ψ
          </span>
        </header>

        {/* Visual — a living miniature of the physics at this scale */}
        <div className="mt-5 h-32 overflow-hidden rounded-xl border border-white/5 bg-space/60 sm:h-36">
          <ScaleVisual scale={scale.key} />
        </div>

        {/* Method + equation, always visible */}
        <div className="mt-5">
          <p className="font-heading text-[11px] uppercase tracking-[0.25em] text-warm/40">
            {t('methodLabel')}
          </p>
          <p className="mt-1 font-heading font-medium text-warm/90">
            {t(`items.${scale.key}.method`)}
          </p>
          <div className="mt-3 overflow-x-auto rounded-lg bg-space/70 px-4 py-2">
            {scale.equations.map((eq) => (
              <Equation key={eq} tex={eq} className="block text-sm" />
            ))}
          </div>
        </div>

        {/* Expanding detail */}
        <motion.div
          initial={false}
          animate={{
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="mt-4 text-sm leading-relaxed text-warm/70">
            {t(`items.${scale.key}.description`)}
          </p>
          <p className="mt-4 font-heading text-[11px] uppercase tracking-[0.25em] text-warm/40">
            {t('toolsLabel')}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {scale.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border px-3 py-1 text-xs"
                style={{ borderColor: `${scale.color}55`, color: scale.color }}
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Information transfer to the next scale */}
        <p className="mt-5 flex items-center gap-2 text-xs text-warm/40">
          <span
            aria-hidden
            className="inline-block h-px w-8"
            style={{
              background: `linear-gradient(90deg, ${scale.color}, transparent)`,
            }}
          />
          {t('transferLabel')}: {t(`items.${scale.key}.transfer`)}
        </p>
      </motion.article>
    </div>
  );
}

export default function ScaleBridge() {
  const t = useTranslations('scales');
  const sectionRef = useRef<HTMLElement>(null);
  const conduitRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !conduitRef.current)
      return;

    const ctx = gsap.context(() => {
      // The energy conduit fills as the visitor descends through the scales
      gsap.fromTo(
        conduitRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="scale-bridge"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">{t('eyebrow')}</p>
          <h2 className="section-title">{t('title')}</h2>
          <p className="mt-6 text-warm/60">{t('intro')}</p>
          <p className="mt-3 font-heading text-xs uppercase tracking-[0.3em] text-warm/30">
            {t('hoverHint')}
          </p>
        </div>

        <div className="relative mt-20">
          {/* Central energy conduit (desktop) */}
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/5 lg:block">
            <div
              ref={conduitRef}
              className="h-full w-full origin-top bg-gradient-to-b from-quantum via-energy to-gold"
              style={{
                transform: prefersReducedMotion ? undefined : 'scaleY(0)',
                boxShadow: '0 0 18px 1px rgba(0, 245, 212, 0.35)',
              }}
            />
          </div>

          {/* Flowing information particles along the conduit */}
          <svg
            aria-hidden
            className="absolute inset-y-0 left-1/2 hidden h-full w-2 -translate-x-1/2 lg:block"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#00f5d4"
              strokeWidth="2"
              strokeOpacity="0.5"
              className="energy-stream"
            />
          </svg>

          <div className="space-y-16 lg:space-y-28">
            {SCALES.map((scale, i) => (
              <ScaleNode key={scale.key} scale={scale} index={i} />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto mt-24 max-w-2xl text-center font-heading text-warm/50"
        >
          {t('outro')}
        </motion.p>
      </div>
    </section>
  );
}
