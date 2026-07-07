import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl text-quantum/60">Ψ = 0</p>
      <h1 className="mt-6 font-display text-3xl font-bold">{t('title')}</h1>
      <p className="mt-4 max-w-md text-warm/60">{t('text')}</p>
      <Link
        href="/"
        className="glass mt-8 rounded-full px-6 py-3 font-heading text-sm text-energy transition hover:bg-white/10"
      >
        {t('back')}
      </Link>
    </section>
  );
}
