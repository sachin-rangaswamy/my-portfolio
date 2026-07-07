import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Syne } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PsiWatermark from '@/components/PsiWatermark';
import ParticleField from '@/components/ParticleField';
import 'katex/dist/katex.min.css';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const SITE_URL = 'https://sachinrangaswamy.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: `%s · ${t('titleTemplate')}`,
    },
    description: t('description'),
    keywords: [
      'Sachin Rangaswamy',
      'Computational Materials Scientist',
      'Multiscale Simulation',
      'Materials Informatics',
      'DFT',
      'CALPHAD',
      'Machine Learning Interatomic Potentials',
      'Leibniz IWT',
      'Materials Design',
    ],
    authors: [{ name: 'Sachin Rangaswamy', url: SITE_URL }],
    creator: 'Sachin Rangaswamy',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        de: '/de',
        es: '/es',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      siteName: 'Sachin Rangaswamy — Ψ The Quantum Designer',
      title: t('title'),
      description: t('description'),
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sachin Rangaswamy',
  jobTitle: 'Research Scientist',
  worksFor: {
    '@type': 'Organization',
    name: 'Leibniz Institute for Materials Engineering — IWT',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bremen',
      addressCountry: 'DE',
    },
  },
  url: SITE_URL,
  email: 'mailto:rangaswamy@iwt-bremen.de',
  sameAs: ['https://www.linkedin.com/in/sachin-r-40297b119'],
  knowsAbout: [
    'Computational Materials Science',
    'Multiscale Simulation',
    'Density Functional Theory',
    'CALPHAD',
    'Molecular Dynamics',
    'Machine Learning Interatomic Potentials',
    'Phase-Field Modelling',
    'Finite Element Method',
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${syne.variable} bg-space font-body text-warm antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {/* Global scientific atmosphere */}
          <ParticleField />
          <PsiWatermark />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main id="top" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
