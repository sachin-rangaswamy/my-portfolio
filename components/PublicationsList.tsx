'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import type { Publication } from '@/lib/publications';

/**
 * Publication records styled like entries in a scientific database:
 * monospaced identifiers, expandable abstracts, DOI resolvers.
 */
export default function PublicationsList({
  publications,
}: {
  publications: Publication[];
}) {
  const t = useTranslations('publications');
  const [openId, setOpenId] = useState<string | null>(null);

  if (publications.length === 0) {
    return (
      <p className="glass mx-auto max-w-xl rounded-2xl p-8 text-center text-warm/60">
        {t('empty')}
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {publications.map((pub, i) => {
        const open = openId === pub.id;
        return (
          <motion.li
            key={pub.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <article className="glass overflow-hidden rounded-2xl transition hover:border-quantum/40">
              <button
                onClick={() => setOpenId(open ? null : pub.id)}
                aria-expanded={open}
                className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
              >
                <span className="mt-1 hidden shrink-0 font-mono text-xs text-quantum/70 sm:block">
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <span className="flex-1">
                  <span className="block font-heading font-semibold text-warm">
                    {pub.title}
                  </span>
                  <span className="mt-1.5 block text-sm text-warm/60">
                    {pub.authors}
                  </span>
                  <span className="mt-1 block text-sm">
                    <em className="text-warm/50">{pub.venue}</em>
                    <span className="text-warm/40"> · {pub.year}</span>
                  </span>
                  <span className="mt-3 flex flex-wrap items-center gap-2">
                    {pub.status === 'in-preparation' ? (
                      <span className="rounded-full bg-gold/15 px-3 py-0.5 text-[11px] uppercase tracking-wider text-gold">
                        {t('inPreparation')}
                      </span>
                    ) : (
                      pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-full bg-energy/15 px-3 py-0.5 text-[11px] uppercase tracking-wider text-energy hover:bg-energy/25"
                        >
                          {t('doi')}: {pub.doi}
                        </a>
                      )
                    )}
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-warm/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
                {pub.abstract && (
                  <span
                    aria-hidden
                    className={`mt-1 text-energy transition-transform duration-300 ${
                      open ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                )}
              </button>

              <AnimatePresence initial={false}>
                {open && pub.abstract && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="border-t border-white/5 px-5 py-5 text-sm leading-relaxed text-warm/60 sm:px-6">
                      {pub.abstract}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          </motion.li>
        );
      })}
    </ul>
  );
}
