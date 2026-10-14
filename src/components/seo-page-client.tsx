'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BrandConfig, BrandKey } from '@/types/scout';
import { BRANDS, resolveBrandFromLocation } from '@/config/brands';
import { LocalSeoPageConfig, SEO_PAGES } from '@/config/seo-pages';
import { BrandHeader } from '@/components/brand-header';
import { ScoutWizard } from '@/components/scout-wizard';
import { Footer } from '@/components/footer';
import { LegalModal } from '@/components/legal-modal';
import { CookieBanner } from '@/components/cookie-banner';
import {
  MapPin,
  Check,
  ChevronDown,
  ChevronUp,
  Navigation,
  Building2,
  ExternalLink,
} from 'lucide-react';

interface SeoPageClientProps {
  pageConfig: LocalSeoPageConfig;
  initialBrandKey?: BrandKey;
}

export function SeoPageClient({ pageConfig, initialBrandKey = 'autozglowy' }: SeoPageClientProps) {
  const searchParams = useSearchParams();
  const [brandKey, setBrandKey] = useState<BrandKey>(initialBrandKey);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    tab: 'terms' | 'privacy';
  }>({
    isOpen: false,
    tab: 'terms',
  });

  const handleSwitchBrand = (key: BrandKey) => {
    setBrandKey(key);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('brand', key);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    const forced = searchParams.get('brand') as BrandKey | null;
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const resolved = resolveBrandFromLocation(hostname, forced);
    queueMicrotask(() => {
      setBrandKey((prev) => (prev !== resolved.id ? resolved.id : prev));
    });
  }, [searchParams]);

  const brand: BrandConfig = BRANDS[brandKey] || BRANDS.autozglowy;

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const handleOpenLegal = (tab: 'terms' | 'privacy') => {
    setLegalModalState({ isOpen: true, tab });
  };

  const isCity = pageConfig.type === 'city';
  const otherPages = Object.values(SEO_PAGES).filter((p) => p.slug !== pageConfig.slug);
  const cityPages = otherPages.filter((p) => p.type === 'city');
  const categoryPages = otherPages.filter((p) => p.type === 'category');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/60 text-slate-900 flex flex-col font-sans">
      {/* 1. Header with dynamic brand */}
      <BrandHeader
        brand={brand}
        currentBrandKey={brandKey}
        onSwitchBrand={handleSwitchBrand}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full space-y-10 sm:space-y-16">
        {/* Breadcrumb Navigation (Rich SEO Signal) */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Strona główna
          </Link>
          <span>/</span>
          <span className="text-slate-400">
            {isCity ? 'Skup aut w miastach' : 'Kategorie skupu'}
          </span>
          <span>/</span>
          <span className="font-bold text-slate-800">
            {isCity ? `Skup aut ${pageConfig.cityName}` : pageConfig.h1[brandKey]}
          </span>
        </nav>

        {/* HERO SECTION WITH SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Localized Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            {/* Local Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {isCity
                  ? `Obszar: ${pageConfig.cityName} (${pageConfig.voivodeship})`
                  : 'Zasięg ogólnopolski – darmowy dojazd'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {pageConfig.h1[brandKey]}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {pageConfig.heroSubtitle}
            </p>

            {/* Local Logistics Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-900">
                  Czas przyjazdu mobilnego kupca
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                W tym rejonie średni czas dojazdu na oględziny i odbiór auta wynosi:{' '}
                <strong className="text-slate-900 font-extrabold">
                  {pageConfig.localLogistics.arrivalEstimate}
                </strong>
                . {pageConfig.localLogistics.hubDescription}
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Dojazd i autolaweta:</span>
                <span className="font-extrabold text-emerald-600">0 zł przy sprzedaży</span>
              </div>
            </div>

            {/* Core Trust Points */}
            <div className="space-y-3 pt-1">
              {[
                {
                  title: 'Wypłata gotówki od ręki lub przelew ekspresowy',
                  desc: 'Płatność realizowana bezpośrednio przy podpisaniu umowy kupna-sprzedaży.',
                },
                {
                  title: 'Pełne bezpieczeństwo prawne i zdjęcie rękojmi',
                  desc: 'Sprzedajesz auto legalnie działającemu podmiotowi handlowemu.',
                },
                {
                  title: 'Brak konieczności mycia i usuwania usterek',
                  desc: 'Kupujemy samochód w stanie, w jakim stoi pod Twoim domem.',
                },
              ].map((tp, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className={`p-1 rounded-lg ${brand.lightBgClass} ${brand.primaryTextClass} shrink-0 mt-0.5`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">{tp.title}</h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{tp.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* District Cloud if city */}
            {isCity && pageConfig.districts && pageConfig.districts.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  <Navigation className="w-3.5 h-3.5 text-slate-500" />
                  <span>Dzielnice i okolice objęte bezpłatnym dojazdem:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pageConfig.districts.map((d) => (
                    <span
                      key={d}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pre-configured Interactive Form Wizard */}
          <div id="formularz-wyceny" className="lg:col-span-7 scroll-mt-24">
            <ScoutWizard
              brand={brand}
              onOpenLegal={handleOpenLegal}
              initialCity={pageConfig.defaultWizardCity}
              initialCondition={pageConfig.defaultWizardCondition}
              initialCategory={pageConfig.defaultWizardCategory}
            />
          </div>
        </div>

        {/* 2. LOCAL CONTEXT & MARKET REALITIES (High-Value Non-Boilerplate Content) */}
        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${brand.accentBadgeClass}`}
            >
              Lokalny rynek i realia odkupu
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              {pageConfig.localContext.title}
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {pageConfig.localContext.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {pageConfig.accessRoutes && pageConfig.accessRoutes.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold text-slate-900">
                Główne trasy dojazdu mobilnej autolawety:
              </span>
              <div className="flex flex-wrap gap-2">
                {pageConfig.accessRoutes.map((r) => (
                  <span
                    key={r}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-300 font-mono text-[11px] font-bold text-slate-800"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 3. MUNICIPAL OFFICE & LEGAL SALE REGISTRATION INFO (Helpful Practical Content) */}
        {pageConfig.officeDeptInfo && (
          <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800">
                <Building2 className="w-3.5 h-3.5" /> Gdzie zgłosić sprzedaż auta?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Wydział Komunikacji – {pageConfig.cityName}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Po sfinalizowaniu sprzedaży i podpisaniu umowy, polskie prawo nakłada obowiązek
                zgłoszenia zbycia pojazdu w terminie 30 dni. Oto dane właściwego urzędu:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
                <span className="font-extrabold text-white text-sm block">
                  {pageConfig.officeDeptInfo.officeName}
                </span>
                <p className="text-slate-300">
                  <strong>Adres:</strong> {pageConfig.officeDeptInfo.address}
                </p>
                <p className="text-slate-400">
                  <strong>Godziny przyjęć:</strong> {pageConfig.officeDeptInfo.openingHours}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs flex flex-col justify-between">
                <div>
                  <span className="font-extrabold text-emerald-400 text-sm block mb-1">
                    💡 Wskazówka: Zgłoś sprzedaż w 3 minuty online
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {pageConfig.officeDeptInfo.onlineTip}
                  </p>
                </div>
                <a
                  href="https://www.gov.pl/web/gov/zglos-zbycie-lub-nabycie-pojazdu-na-przyklad-sprzedaz-kupno-darowizne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 underline pt-2"
                >
                  <span>Przejdź do formularza zgłoszenia zbycia na Gov.pl</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* 4. THREE SIMPLE STEPS */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${brand.accentBadgeClass}`}
            >
              Prosty proces
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Jak wygląda odkup auta w 3 krokach?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                step: '01',
                title: 'Wypełniasz krótki formularz online',
                desc: 'Podajesz markę, rocznik i stan techniczny. Możesz dołączyć opcjonalne zdjęcia z telefonu.',
                badge: 'Wycena 0 zł',
              },
              {
                step: '02',
                title: 'Otrzymujesz wycenę od partnera',
                desc: 'Lokalny partner kontaktuje się telefonicznie lub SMS-em z konkretną ofertą odkupu od ręki.',
                badge: 'Bez zobowiązań',
              },
              {
                step: '03',
                title: 'Gotówka i odbiór pod domem',
                desc: 'Przyjeżdżamy pod Twój adres, podpisujemy bezpieczną umowę i wypłacamy gotówkę do ręki.',
                badge: 'Darmowa autolaweta',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-3xl font-black text-slate-900">{card.step}</span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1.5">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. LOCAL FAQ SECTION */}
        <section className="max-w-3xl mx-auto w-full space-y-6">
          <div className="text-center space-y-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${brand.accentBadgeClass}`}
            >
              Najczęstsze pytania
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Pytania i odpowiedzi – {isCity ? `Skup aut ${pageConfig.cityName}` : 'FAQ'}
            </h2>
          </div>

          <div className="space-y-3">
            {pageConfig.localFaq.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-extrabold text-slate-900 text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. INTERNAL LINKING MESH (CRITICAL FOR GOOGLE INDEXATION) */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-100 border border-slate-200/80 space-y-6">
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Pozostałe lokalizacje i usługi skupu pojazdów
              </h3>
              <Link
                href="/obszar-dzialania"
                className="text-xs font-bold text-slate-700 hover:text-slate-950 underline"
              >
                Pełny obszar działania →
              </Link>
            </div>
            <p className="text-xs text-slate-500">
              Działamy w całej Polsce. Zobacz dedykowane oddziały mobilne w innych miastach:
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Cities list */}
            <div>
              <span className="font-bold text-slate-700 block mb-2">Miasta i aglomeracje:</span>
              <div className="flex flex-wrap gap-2">
                {cityPages.map((cp) => (
                  <Link
                    key={cp.slug}
                    href={`/${cp.slug}`}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-800 font-semibold transition-colors shadow-xs"
                  >
                    Skup aut {cp.cityName}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories list */}
            <div>
              <span className="font-bold text-slate-700 block mb-2">Specjalistyczne kategorie skupu:</span>
              <div className="flex flex-wrap gap-2">
                {categoryPages.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-800 font-semibold transition-colors shadow-xs"
                  >
                    {cat.slug === 'skup-aut-uszkodzonych' && 'Skup aut uszkodzonych mechanicznie'}
                    {cat.slug === 'skup-aut-powypadkowych' && 'Skup aut powypadkowych i po kolizji'}
                    {cat.slug === 'skup-aut-bez-oc-przegladu' && 'Skup aut bez ważnego OC i przeglądu'}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer brand={brand} onOpenLegal={handleOpenLegal} />

      {/* Legal Modal */}
      <LegalModal
        domainName={brand.domainName}
        isOpen={legalModalState.isOpen}
        initialTab={legalModalState.tab}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Cookie Banner */}
      <CookieBanner onOpenPrivacy={() => handleOpenLegal('privacy')} />
    </div>
  );
}
