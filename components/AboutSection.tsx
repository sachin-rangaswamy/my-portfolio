'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const t = useTranslations('about');
  const chain = t.raw('chain') as string[];

  const stats = [
    {
      value: <CountUp target={6} />,
      label: t('counters.scales'),
      color: 'text-quantum',
    },
    {
      value: <span>Ψ + ML</span>,
      label: t('counters.physicsMl'),
      color: 'text-energy',
    },
    {
      value: <span>∞</span>,
      label: t('counters.possibilities'),
      color: 'text-gold',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20"
        >
          <div>
            <p className="section-eyebrow">{t('title')}</p>
            <h2 className="section-title">{t('heading')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-warm/80">
              {t('lead')}
            </p>
            <p className="mt-4 leading-relaxed text-warm/60">{t('body')}</p>

            {/* Animated counters */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="glass rounded-2xl p-5 text-center"
                >
                  <p className={`font-display text-4xl font-bold ${s.color}`}>
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-warm/50">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Information-flow chain */}
          <div className="flex flex-col justify-center">
            <p className="mb-6 font-heading text-sm uppercase tracking-[0.3em] text-warm/50">
              {t('chainTitle')}
            </p>
            <ol className="relative space-y-2">
              {chain.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                >
                  <div className="glass flex items-center gap-4 rounded-xl px-5 py-4">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: ['#6c63ff', '#00d4e0', '#00f5d4', '#ffd166'][i],
                        boxShadow: `0 0 12px ${['#6c63ff', '#00d4e0', '#00f5d4', '#ffd166'][i]}`,
                      }}
                    />
                    <span className="font-heading text-warm/90">{step}</span>
                  </div>
                  {i < chain.length - 1 && (
                    <div className="ml-[1.55rem] h-6 w-px bg-gradient-to-b from-quantum/60 to-energy/60" />
                  )}
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
