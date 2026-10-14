import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { BrandKey } from '@/types/scout';
import { ObszarClient } from './obszar-client';

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
    ? 'Obszar Działania i Oddziały Skupu Aut w Całej Polsce | ZdajAuto.pl'
    : 'Obszar Działania – Skup Aut w Całej Polsce i Kujawsko-Pomorskiem | AutoZglowy.pl';

  const description = isZdajAuto
    ? 'Poznaj pełny obszar działania skupu pojazdów ZdajAuto.pl. Oddziały mobilne w miastach wojewódzkich i powiatowych, bezpłatny odbiór autolawetą, natychmiastowa płatność.'
    : 'Sprawdź listę miast i powiatów objętych bezpłatnym dojazdem skupu aut AutoZglowy.pl. Ekspresowy dojazd w woj. kujawsko-pomorskim oraz cała Polska. Wycena online!';

  const canonicalUrl = isZdajAuto
    ? 'https://zdajauto.pl/obszar-dzialania'
    : 'https://autozglowy.pl/obszar-dzialania';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      locale: 'pl_PL',
    },
  };
}

export default async function ObszarDzialaniaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const brandKey = (params.brand as BrandKey) || 'autozglowy';
  const isZdajAuto = brandKey === 'zdajauto';
  const siteUrl = isZdajAuto ? 'https://zdajauto.pl' : 'https://autozglowy.pl';

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
        name: 'Obszar działania',
        item: `${siteUrl}/obszar-dzialania`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
        <ObszarClient initialBrandKey={brandKey} />
      </Suspense>
    </>
  );
}
