'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';

export default function Footer() {
  const t = useTranslations('footer');
  const prefersReducedMotion = useReducedMotion();

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-white/10 bg-space-light/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 text-center">
        <motion.span
          aria-hidden
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="gradient-text font-display text-4xl"
        >
          Ψ
        </motion.span>

        <p className="font-heading text-sm tracking-[0.25em] text-warm/70 uppercase">
          {t('designedBy')}
        </p>

        <p className="text-sm text-warm/40">
          {t('affiliation')} · © {new Date().getFullYear()} Sachin Rangaswamy ·{' '}
          {t('rights')}
        </p>

        <div className="flex items-center gap-5 text-sm">
          <a
            href="mailto:rangaswamy@iwt-bremen.de"
            className="text-warm/60 transition hover:text-energy"
          >
            rangaswamy@iwt-bremen.de
          </a>
          <a
            href="https://www.linkedin.com/in/sachin-r-40297b119"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm/60 transition hover:text-energy"
          >
            LinkedIn
          </a>
        </div>

        <motion.button
          onClick={backToTop}
          whileHover={prefersReducedMotion ? undefined : { y: -4 }}
          className="glass group mt-2 flex h-11 w-11 items-center justify-center rounded-full text-energy"
          aria-label={t('backToTop')}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform group-hover:-translate-y-0.5"
            aria-hidden
          >
            <path
              d="M12 19V5m0 0l-6 6m6-6l6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}
