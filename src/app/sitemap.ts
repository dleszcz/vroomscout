import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { SEO_PAGES } from '@/config/seo-pages';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();
  const slugs = Object.keys(SEO_PAGES);

  let isZdajAuto = false;
  try {
    const headersList = await headers();
    const host = headersList.get('host') || headersList.get('x-forwarded-host') || '';
    isZdajAuto = host.toLowerCase().includes('zdajauto');
  } catch {
    // fallback
  }

  const domain = isZdajAuto ? 'https://zdajauto.pl' : 'https://autozglowy.pl';

  const baseUrls = [
    {
      url: domain,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${domain}/obszar-dzialania`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const seoPages = slugs.map((slug) => ({
    url: `${domain}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...baseUrls, ...seoPages];
}

