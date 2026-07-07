'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const EMAIL = 'rangaswamy@iwt-bremen.de';
const LINKEDIN = 'https://www.linkedin.com/in/sachin-r-40297b119';
const CALENDLY = 'https://calendly.com/sachin-rangaswamy';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [purpose, setPurpose] = useState<'research' | 'industry' | 'general'>(
    'research'
  );
  const [sending, setSending] = useState(false);

  const purposes = ['research', 'industry', 'general'] as const;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const message = form.get('message');
    const subject = encodeURIComponent(
      `[${t(`form.purposes.${purpose}`)}] — ${name}`
    );
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    setSending(true);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => setSending(false), 2500);
  };

  const cards = [
    {
      title: t('emailTitle'),
      text: t('emailText'),
      href: `mailto:${EMAIL}`,
      label: EMAIL,
      icon: '✉',
      color: '#6c63ff',
    },
    {
      title: t('linkedinTitle'),
      text: t('linkedinText'),
      href: LINKEDIN,
      label: 'sachin-r-40297b119',
      icon: 'in',
      color: '#00f5d4',
    },
    {
      title: t('collabTitle'),
      text: t('collabText'),
      href: `${CALENDLY}`,
      label: 'Ψ',
      icon: 'Ψ',
      color: '#ffd166',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Three contact channels */}
      <div className="grid gap-5 sm:grid-cols-3">
        {cards.map((c, i) => (
          <motion.a
            key={c.title}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="glass group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: `inset 0 1px 0 0 ${c.color}22` }}
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full font-display text-lg"
              style={{
                color: c.color,
                backgroundColor: `${c.color}1a`,
                boxShadow: `0 0 18px ${c.color}33`,
              }}
              aria-hidden
            >
              {c.icon}
            </span>
            <h3 className="mt-4 font-heading font-semibold text-warm">
              {c.title}
            </h3>
            <p className="mt-2 text-sm text-warm/60">{c.text}</p>
            <p
              className="mt-4 break-all font-mono text-xs transition group-hover:underline"
              style={{ color: c.color }}
            >
              {c.label}
            </p>
          </motion.a>
        ))}
      </div>

      {/* Form */}
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="glass mx-auto max-w-2xl rounded-3xl p-6 sm:p-10"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block font-heading text-xs uppercase tracking-widest text-warm/50">
              {t('form.name')}
            </span>
            <input
              name="name"
              required
              className="w-full rounded-xl border border-white/10 bg-space/70 px-4 py-3 text-warm outline-none transition focus:border-energy/60"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-heading text-xs uppercase tracking-widest text-warm/50">
              {t('form.email')}
            </span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-white/10 bg-space/70 px-4 py-3 text-warm outline-none transition focus:border-energy/60"
            />
          </label>
        </div>

        <fieldset className="mt-5">
          <legend className="mb-2 font-heading text-xs uppercase tracking-widest text-warm/50">
            {t('form.purpose')}
          </legend>
          <div className="flex flex-wrap gap-2">
            {purposes.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPurpose(p)}
                aria-pressed={purpose === p}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  purpose === p
                    ? 'bg-gradient-to-r from-quantum to-energy font-medium text-space'
                    : 'glass text-warm/70 hover:text-warm'
                }`}
              >
                {t(`form.purposes.${p}`)}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="mt-5 block">
          <span className="mb-1.5 block font-heading text-xs uppercase tracking-widest text-warm/50">
            {t('form.message')}
          </span>
          <textarea
            name="message"
            rows={5}
            required
            className="w-full rounded-xl border border-white/10 bg-space/70 px-4 py-3 text-warm outline-none transition focus:border-energy/60"
          />
        </label>

        <button
          type="submit"
          disabled={sending}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-quantum to-energy py-3.5 font-heading font-semibold text-space transition hover:opacity-90 disabled:opacity-60"
        >
          {sending ? t('form.sending') : t('form.submit')}
        </button>
        <p className="mt-3 text-center text-xs text-warm/40">
          {t('form.hint')}
        </p>
      </motion.form>

      {/* Appointment / Calendly */}
      <motion.div
        id="appointment"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="glass mx-auto max-w-2xl scroll-mt-28 rounded-3xl p-6 text-center sm:p-10"
      >
        <h3 className="font-display text-2xl font-bold text-warm">
          {t('appointment.title')}
        </h3>
        <p className="mt-3 text-warm/60">{t('appointment.text')}</p>
        <div className="mt-6 flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-space/50 p-8">
          <p className="text-sm text-warm/40">{t('appointment.placeholder')}</p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-pulse-glow mt-5 inline-block rounded-full bg-gradient-to-r from-quantum to-energy px-6 py-3 font-heading text-sm font-semibold text-space"
          >
            {t('appointment.cta')} →
          </a>
        </div>
      </motion.div>
    </div>
  );
}
