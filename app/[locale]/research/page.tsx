import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import ScaleBridge from '@/components/ScaleBridge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('research') };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-16">
      <ScaleBridge />
    </div>
  );
}
