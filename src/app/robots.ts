import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  let isZdajAuto = false;
  try {
    const headersList = await headers();
    const host = headersList.get('host') || headersList.get('x-forwarded-host') || '';
    isZdajAuto = host.toLowerCase().includes('zdajauto');
  } catch {
    // fallback
  }

  const sitemapUrl = isZdajAuto
    ? 'https://zdajauto.pl/sitemap.xml'
    : 'https://autozglowy.pl/sitemap.xml';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/lead/'],
      },
    ],
    sitemap: sitemapUrl,
  };
}

