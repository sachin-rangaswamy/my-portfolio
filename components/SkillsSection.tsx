'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SKILLS, CATEGORY_COLORS, type SkillCategory } from '@/lib/skills';

const HEX_CLIP =
  'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';

/**
 * Skills arranged like atoms in a hexagonal crystal — the natural packing
 * of matter. Hovering a category in the legend lights up its sublattice.
 */
export default function SkillsSection() {
  const t = useTranslations('skills');
  const [activeCat, setActiveCat] = useState<SkillCategory | null>(null);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">{t('eyebrow')}</p>
          <h2 className="section-title">{t('title')}</h2>
          <p className="mt-6 text-warm/60">{t('intro')}</p>
        </div>

        {/* Category legend */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {(Object.keys(CATEGORY_COLORS) as SkillCategory[]).map((cat) => (
            <button
              key={cat}
              onMouseEnter={() => setActiveCat(cat)}
              onMouseLeave={() => setActiveCat(null)}
              onFocus={() => setActiveCat(cat)}
              onBlur={() => setActiveCat(null)}
              className="glass flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-warm/70 transition hover:text-warm"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[cat] }}
              />
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Honeycomb lattice */}
        <div className="mt-14 flex flex-wrap justify-center gap-y-1 [--hex:7.5rem] sm:[--hex:8.5rem]">
          {SKILLS.map((skill, i) => {
            const color = CATEGORY_COLORS[skill.category];
            const dimmed = activeCat !== null && activeCat !== skill.category;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 7) * 0.06, duration: 0.4 }}
                className="group relative -mx-1 transition-opacity duration-300"
                style={{
                  opacity: dimmed ? 0.25 : 1,
                  // Offset every other "row" for honeycomb packing
                  marginTop: i % 2 === 0 ? '0' : 'calc(var(--hex) * 0.24)',
                }}
              >
                <div
                  className="flex flex-col items-center justify-center border border-transparent bg-space-light text-center transition-all duration-300 group-hover:bg-space"
                  style={{
                    clipPath: HEX_CLIP,
                    width: 'var(--hex)',
                    height: 'calc(var(--hex) * 0.9)',
                    backgroundImage: `radial-gradient(circle at 50% 30%, ${color}26, transparent 70%)`,
                  }}
                >
                  <span
                    className="px-3 font-heading text-xs font-semibold sm:text-sm"
                    style={{ color }}
                  >
                    {skill.name}
                  </span>
                  <span className="mt-1 px-2 text-[9px] uppercase tracking-wider text-warm/40">
                    {t(`categories.${skill.category}`)}
                  </span>
                </div>
                {/* Glow ring on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    clipPath: HEX_CLIP,
                    background: `radial-gradient(circle at 50% 50%, ${color}33, transparent 75%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
