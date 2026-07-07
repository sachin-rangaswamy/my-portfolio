'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const LABELS: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
};

export default function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const switchTo = (next: Locale) => {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('language')}
        aria-expanded={open}
        className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 font-heading text-xs uppercase tracking-widest text-warm/80 transition hover:text-energy"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        {locale}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="glass absolute right-0 mt-2 w-36 overflow-hidden rounded-xl bg-space/90 py-1"
          >
            {routing.locales.map((l) => (
              <li key={l}>
                <button
                  onClick={() => switchTo(l)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-white/5 ${
                    l === locale ? 'text-energy' : 'text-warm/80'
                  }`}
                >
                  {LABELS[l]}
                  {l === locale && <span aria-hidden>Ψ</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
