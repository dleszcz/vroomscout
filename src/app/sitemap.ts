import type { MetadataRoute } from 'next';
import { SEO_PAGES } from '@/config/seo-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  const slugs = Object.keys(SEO_PAGES);

  const autozglowyBase = [
    {
      url: 'https://autozglowy.pl',
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: 'https://autozglowy.pl/obszar-dzialania',
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const zdajautoBase = [
    {
      url: 'https://zdajauto.pl',
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: 'https://zdajauto.pl/obszar-dzialania',
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const autozglowySeoPages = slugs.map((slug) => ({
    url: `https://autozglowy.pl/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const zdajautoSeoPages = slugs.map((slug) => ({
    url: `https://zdajauto.pl/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [
    ...autozglowyBase,
    ...autozglowySeoPages,
    ...zdajautoBase,
    ...zdajautoSeoPages,
  ];
}
