import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import PublicationsList from '@/components/PublicationsList';
import { PUBLICATIONS } from '@/lib/publications';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'publications' });
  return { title: t('title'), description: t('intro') };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('publications');

  return (
    <section className="relative pb-24 pt-32 sm:pt-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="section-eyebrow">{t('eyebrow')}</p>
          <h1 className="section-title">{t('title')}</h1>
          <p className="mt-6 text-warm/60">{t('intro')}</p>
        </div>
        <PublicationsList publications={PUBLICATIONS} />
      </div>
    </section>
  );
}
