import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllProjects, getProject } from '@/lib/content';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 font-display text-2xl font-bold text-warm sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 font-heading text-xl font-semibold text-warm" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 leading-relaxed text-warm/70" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 leading-relaxed text-warm/70 marker:text-energy"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 leading-relaxed text-warm/70 marker:text-quantum"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-warm" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-energy/90" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-energy underline underline-offset-4" {...props} />
  ),
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations('projects');

  const panels = [
    { label: t('problem'), text: project.problem, color: '#6c63ff' },
    { label: t('methodology'), text: project.methodology, color: '#00f5d4' },
    { label: t('outcomes'), text: project.outcomes, color: '#ffd166' },
  ];

  return (
    <article className="relative pb-24 pt-32 sm:pt-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link
          href="/projects"
          className="font-heading text-sm text-warm/50 transition hover:text-energy"
        >
          ← {t('backToProjects')}
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.scales?.map((s) => (
            <span
              key={s}
              className="rounded-full bg-quantum/15 px-3 py-1 text-xs uppercase tracking-wider text-quantum"
            >
              {s}
            </span>
          ))}
        </div>

        <h1 className="mt-4 font-display text-3xl font-extrabold text-warm sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg text-warm/60">{project.summary}</p>

        {/* Structured research panels */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {panels.map((panel) => (
            <div
              key={panel.label}
              className="glass rounded-2xl p-5"
              style={{ boxShadow: `inset 0 1px 0 0 ${panel.color}33` }}
            >
              <p
                className="font-heading text-[11px] uppercase tracking-[0.25em]"
                style={{ color: panel.color }}
              >
                {panel.label}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-warm/70">
                {panel.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="py-1 font-heading text-[11px] uppercase tracking-[0.25em] text-warm/40">
            {t('tools')}:
          </span>
          {project.tools?.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-warm/60"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* MDX body */}
        <div className="mt-6 border-t border-white/5">
          <MDXRemote source={project.body} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
