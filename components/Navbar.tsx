'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'research', href: '/research' },
  { key: 'skills', href: '/#skills' },
  { key: 'projects', href: '/projects' },
  { key: 'publications', href: '/publications' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const base = href.split('#')[0];
    return base !== '/' && pathname.startsWith(base);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-space/70 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-bold text-warm"
        >
          <span className="gradient-text text-2xl transition-transform duration-500 group-hover:rotate-[360deg]">
            Ψ
          </span>
          <span className="hidden sm:inline">Sachin Rangaswamy</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`rounded-full px-3.5 py-2 font-heading text-sm transition ${
                  isActive(item.href)
                    ? 'bg-quantum/20 text-energy'
                    : 'text-warm/70 hover:bg-white/5 hover:text-warm'
                }`}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/contact#appointment"
            className="hidden rounded-full bg-gradient-to-r from-quantum to-energy px-4 py-2 font-heading text-sm font-medium text-space transition hover:opacity-90 lg:inline-block"
          >
            {t('book')}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('closeMenu') : t('openMenu')}
            aria-expanded={open}
            className="relative flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span
              className={`absolute h-0.5 w-6 bg-warm transition-all duration-300 ${
                open ? 'rotate-45' : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-warm transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-warm transition-all duration-300 ${
                open ? '-rotate-45' : 'translate-y-2'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-white/10 bg-space/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 font-heading ${
                      isActive(item.href) ? 'text-energy' : 'text-warm/80'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact#appointment"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-gradient-to-r from-quantum to-energy px-4 py-2.5 text-center font-heading text-sm font-medium text-space"
                >
                  {t('book')}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
