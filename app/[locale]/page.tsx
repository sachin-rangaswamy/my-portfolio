import { setRequestLocale, getTranslations } from 'next-intl/server';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ScaleBridge from '@/components/ScaleBridge';
import SkillsSection from '@/components/SkillsSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import { getAllProjects } from '@/lib/content';
import { Link } from '@/i18n/navigation';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tProjects = await getTranslations('projects');
  const tContact = await getTranslations('contact');
  const tNav = await getTranslations('nav');

  const projects = getAllProjects().slice(0, 3);

  return (
    <>
      <Hero />
      <AboutSection />
      <ScaleBridge />
      <SkillsSection />

      {/* Featured projects */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="section-eyebrow">{tProjects('eyebrow')}</p>
            <h2 className="section-title">{tProjects('title')}</h2>
            <p className="mt-6 text-warm/60">{tProjects('intro')}</p>
          </div>
          <ProjectsGrid projects={projects} showAllLink />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="font-display text-5xl text-quantum/50" aria-hidden>
            Ψ
          </p>
          <h2 className="section-title mt-4">{tContact('title')}</h2>
          <p className="mx-auto mt-5 max-w-xl text-warm/60">
            {tContact('intro')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="animate-pulse-glow rounded-full bg-gradient-to-r from-quantum to-energy px-7 py-3.5 font-heading font-semibold text-space transition hover:scale-[1.03]"
            >
              {tNav('contact')}
            </Link>
            <Link
              href="/contact#appointment"
              className="glass rounded-full px-7 py-3.5 font-heading text-warm/90 transition hover:border-energy/50 hover:text-energy"
            >
              {tNav('book')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
