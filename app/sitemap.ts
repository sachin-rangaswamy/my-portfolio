import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllProjects } from '@/lib/content';

const SITE_URL = 'https://sachinrangaswamy.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/research', '/projects', '/publications', '/contact'];
  const projectSlugs = getAllProjects().map((p) => `/projects/${p.slug}`);

  return [...routes, ...projectSlugs].flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${route}`])
        ),
      },
    }))
  );
}
