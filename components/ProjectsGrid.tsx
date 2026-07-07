'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import type { ProjectMeta } from '@/lib/content';

/**
 * Research project cards that assemble like particles condensing into
 * a crystal: each card flies in from a pseudo-random direction and
 * settles into the lattice.
 */
export default function ProjectsGrid({
  projects,
  showAllLink = false,
}: {
  projects: ProjectMeta[];
  showAllLink?: boolean;
}) {
  const t = useTranslations('projects');
  const prefersReducedMotion = useReducedMotion();

  // Deterministic pseudo-random scatter per index (no Math.random —
  // stable between renders and across SSR/CSR)
  const scatter = (i: number) => ({
    x: ((i * 73) % 7) * 18 - 54,
    y: 60 + ((i * 37) % 5) * 14,
    rotate: ((i * 41) % 9) - 4,
  });

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const s = scatter(i);
          return (
            <motion.div
              key={p.slug}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: s.x, y: s.y, rotate: s.rotate }
              }
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.08,
                duration: 0.7,
                type: 'spring',
                bounce: 0.25,
              }}
              className={p.featured ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <Link
                href={`/projects/${p.slug}`}
                className={`glass group flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
                  p.featured
                    ? 'glow-border bg-gradient-to-br from-quantum/10 via-transparent to-energy/10'
                    : 'hover:border-quantum/40'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.scales?.map((s2) => (
                      <span
                        key={s2}
                        className="rounded-full bg-quantum/15 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-quantum"
                      >
                        {s2}
                      </span>
                    ))}
                  </div>
                  {p.featured && (
                    <span className="shrink-0 rounded-full bg-gold/15 px-3 py-1 font-heading text-[10px] uppercase tracking-widest text-gold">
                      {t('featured')}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-warm transition-colors group-hover:text-energy sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-warm/60">
                  {p.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tools?.slice(0, 4).map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-warm/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm text-energy">
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {showAllLink && (
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="glass inline-block rounded-full px-6 py-3 font-heading text-sm text-energy transition hover:bg-white/10"
          >
            {t('viewAll')} →
          </Link>
        </div>
      )}
    </div>
  );
}
