import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolveServerBrand } from '@/config/brands';
import { SEO_PAGES } from '@/config/seo-pages';
import { SeoPageClient } from '@/components/seo-page-client';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    brand?: string;
  }>;
}

// 1. Static pre-rendering for all SEO landing pages
export async function generateStaticParams() {
  return Object.keys(SEO_PAGES).map((slug) => ({ slug }));
}

// 2. High-performance Metadata Generation
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sParams = await searchParams;

  const pageConfig = SEO_PAGES[slug];
  if (!pageConfig) {
    return {
      title: 'Nie znaleziono strony | Skup Aut',
    };
  }

  const brand = await resolveServerBrand(sParams.brand);
  const brandKey = brand.id;
  const isZdajAuto = brandKey === 'zdajauto';
  const domain = isZdajAuto ? 'zdajauto.pl' : 'autozglowy.pl';

  const title = pageConfig.metaTitle[brandKey] || pageConfig.metaTitle.autozglowy;
  const description = pageConfig.metaDescription[brandKey] || pageConfig.metaDescription.autozglowy;
  const canonicalUrl = `https://${domain}/${slug}`;

  return {
    title,
    description,
    keywords: [
      pageConfig.cityName ? `skup aut ${pageConfig.cityName}` : 'skup aut',
      pageConfig.cityName ? `skup samochodów ${pageConfig.cityName}` : 'skup samochodów',
      pageConfig.cityName ? `skup aut za gotówkę ${pageConfig.cityName}` : 'skup aut za gotówkę',
      pageConfig.cityName ? `odkup aut ${pageConfig.cityName}` : 'odkup aut',
      'skup aut uszkodzonych',
      'skup aut powypadkowych',
      'skup aut bez OC',
      'darmowa wycena auta',
      'odbiór autolawetą 0 zł',
      isZdajAuto ? 'ZdajAuto.pl' : 'AutoZglowy.pl',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: isZdajAuto ? 'ZdajAuto.pl' : 'AutoZglowy.pl',
      locale: 'pl_PL',
      type: 'website',
      images: [
        {
          url: isZdajAuto ? '/zdajauto-logo-purple.png' : '/autozglowy-logo.png',
          width: 800,
          height: 300,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [isZdajAuto ? '/zdajauto-logo-purple.png' : '/autozglowy-logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function SeoPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  const pageConfig = SEO_PAGES[slug];
  if (!pageConfig) {
    notFound();
  }

  const brand = await resolveServerBrand(sParams.brand);
  const brandKey = brand.id;
  const isZdajAuto = brandKey === 'zdajauto';
  const siteUrl = isZdajAuto ? 'https://zdajauto.pl' : 'https://autozglowy.pl';
  const canonicalUrl = `${siteUrl}/${slug}`;

  // 1. Schema.org - AutomotiveBusiness / AutoDealer
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: `${brand.domainName} – ${pageConfig.cityName ? `Skup Aut ${pageConfig.cityName}` : pageConfig.h1[brandKey]}`,
    url: canonicalUrl,
    logo: `${siteUrl}${isZdajAuto ? '/zdajauto-logo-purple.png' : '/autozglowy-logo.png'}`,
    description: pageConfig.metaDescription[brandKey],
    telephone: '+48600000000',
    priceRange: 'PLN',
    paymentAccepted: 'Gotówka, Przelew ekspresowy',
    currenciesAccepted: 'PLN',
    ...(pageConfig.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: pageConfig.geo.lat,
            longitude: pageConfig.geo.lng,
          },
        }
      : {}),
    ...(pageConfig.districts && pageConfig.districts.length > 0
      ? {
          areaServed: pageConfig.districts.map((d) => ({
            '@type': 'AdministrativeArea',
            name: `${d}, ${pageConfig.cityName || ''}`,
          })),
        }
      : {
          areaServed: {
            '@type': 'Country',
            name: 'Polska',
          },
        }),
    founder: {
      '@type': 'Person',
      name: 'Daniel Leszczyński',
      taxID: '8883083559',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ul. Dominikanów 16',
        postalCode: '87-880',
        addressLocality: 'Brześć Kujawski',
        addressCountry: 'PL',
      },
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:00',
        closes: '22:00',
      },
    ],
  };

  // 2. Schema.org - BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona Główna',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageConfig.cityName ? `Skup aut ${pageConfig.cityName}` : pageConfig.h1[brandKey],
        item: canonicalUrl,
      },
    ],
  };

  // 3. Schema.org - FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageConfig.localFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* Microdata structured scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SeoPageClient pageConfig={pageConfig} initialBrandKey={brandKey} />
    </>
  );
}
