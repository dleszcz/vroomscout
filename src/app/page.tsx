import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { BRANDS } from '@/config/brands';
import { BrandKey } from '@/types/scout';
import { ScoutClientApp } from '@/components/scout-client-app';

interface PageProps {
  searchParams: Promise<{
    brand?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const brandKey = (params.brand as BrandKey) || 'autozglowy';
  const isZdajAuto = brandKey === 'zdajauto';

  const title = isZdajAuto
    ? 'Skup Samochodów i Aut Dostawczych od Ręki w 24h – Bezpłatna Wycena | ZdajAuto.pl'
    : 'Skup Aut za Gotówkę w 24h – Bezpłatna Wycena Samochodu Online | AutoZglowy.pl';

  const description = isZdajAuto
    ? 'Błyskawiczny skup samochodów osobowych, dostawczych do 3.5t i flot firmowych w całej Polsce. Pełna faktura VAT 23% lub umowa, natychmiastowy przelew ekspresowy lub gotówka. Sprawdź bezpłatną wycenę!'
    : 'Ekspresowy skup aut za gotówkę w całej Polsce. Skupujemy samochody sprawne, uszkodzone, powypadkowe, bez ważnego OC i przeglądu. Bezpłatny odbiór autolawetą spod domu. Szybka i bezpłatna wycena online bez zobowiązań!';

  const canonicalUrl = isZdajAuto ? 'https://zdajauto.pl' : 'https://autozglowy.pl';

  return {
    title,
    description,
    keywords: [
      'skup aut',
      'skup samochodów',
      'skup aut za gotówkę',
      'skup aut od ręki',
      'skup aut uszkodzonych',
      'skup aut powypadkowych',
      'skup aut po kolizji',
      'skup aut bez OC',
      'skup aut bez przeglądu',
      'skup aut z uszkodzonym silnikiem',
      'skup aut dostawczych',
      'skup busów',
      'odkup samochodów',
      'wycena auta online',
      'darmowa wycena samochodu',
      'gotówka za auto',
      'odbiór auta lawetą',
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

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const brandKey = (params.brand as BrandKey) || 'autozglowy';
  const brand = BRANDS[brandKey] || BRANDS.autozglowy;
  const isZdajAuto = brandKey === 'zdajauto';

  const siteUrl = isZdajAuto ? 'https://zdajauto.pl' : 'https://autozglowy.pl';

  // 1. Schema.org - AutomotiveBusiness / AutoDealer
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: brand.domainName,
    legalName: 'Daniel Leszczyński',
    taxID: '8883083559',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Dominikanów 16',
      addressLocality: 'Brześć Kujawski',
      postalCode: '87-880',
      addressCountry: 'PL',
    },
    url: siteUrl,
    logo: `${siteUrl}${isZdajAuto ? '/zdajauto-logo-purple.png' : '/autozglowy-logo.png'}`,
    description: isZdajAuto
      ? 'Ogólnopolski skup samochodów osobowych, dostawczych i flot firmowych za gotówkę i przelew w 24h.'
      : 'Ogólnopolski ekspresowy skup aut za gotówkę. Odkup samochodów sprawnych, uszkodzonych i bez opłat z bezpłatnym odbiorem pod domem.',
    priceRange: '$$',
    currenciesAccepted: 'PLN',
    paymentAccepted: 'Cash, Bank Transfer, Express Elixir',
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
    areaServed: [
      { '@type': 'Country', name: 'Polska' },
      { '@type': 'AdministrativeArea', name: 'Województwo Mazowieckie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Śląskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Wielkopolskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Małopolskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Dolnośląskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Łódzkie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Pomorskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Kujawsko-Pomorskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Zachodniopomorskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Lubelskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Podkarpackie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Świętokrzyskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Podlaskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Lubuskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Opolskie' },
      { '@type': 'AdministrativeArea', name: 'Województwo Warmińsko-Mazurskie' },
    ],
  };

  // 2. Schema.org - Service
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Skup samochodów i natychmiastowy odkup aut',
    provider: {
      '@type': 'AutoDealer',
      name: brand.domainName,
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Polska',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi skupu aut',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Skup aut osobowych za gotówkę',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Skup aut uszkodzonych i powypadkowych',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Skup aut bez ważnego OC i przeglądu z autolawetą',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Skup aut dostawczych i busów do 3.5t',
          },
        },
      ],
    },
  };

  // 3. Schema.org - FAQPage for Rich Google Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: brand.faqList.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Google Rich Snippets JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
        <ScoutClientApp initialBrandKey={brandKey} />
      </Suspense>
    </>
  );
}
