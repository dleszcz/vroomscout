'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BRANDS, resolveBrandFromLocation } from '@/config/brands';
import { SEO_PAGES } from '@/config/seo-pages';
import { BrandConfig, BrandKey } from '@/types/scout';
import { BrandHeader } from '@/components/brand-header';
import { Footer } from '@/components/footer';
import { LegalModal } from '@/components/legal-modal';
import { CookieBanner } from '@/components/cookie-banner';
import {
  MapPin,
  Truck,
  ArrowRight,
  CheckCircle2,
  Wrench,
  AlertCircle,
} from 'lucide-react';

interface ObszarClientProps {
  initialBrandKey: BrandKey;
}

export const ObszarClient: React.FC<ObszarClientProps> = ({ initialBrandKey }) => {
  const searchParams = useSearchParams();
  const [brandKey, setBrandKey] = useState<BrandKey>(initialBrandKey);
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

  const handleOpenLegal = (tab: 'terms' | 'privacy') => {
    setLegalModalState({ isOpen: true, tab });
  };

  // Group pages dynamically from SEO_PAGES
  const allPages = Object.values(SEO_PAGES);
  const kujawskiePages = allPages.filter(
    (p) => p.type === 'city' && p.voivodeship === 'Kujawsko-Pomorskie'
  );
  const aglomeracjePages = allPages.filter(
    (p) => p.type === 'city' && p.voivodeship !== 'Kujawsko-Pomorskie'
  );

  const voivodeships = [
    { name: 'Kujawsko-Pomorskie', cities: 'Włocławek, Bydgoszcz, Toruń, Inowrocław, Grudziądz', isHub: true },
    { name: 'Mazowieckie', cities: 'Warszawa, Płock, Radom, Siedlce, Ostrołęka' },
    { name: 'Wielkopolskie', cities: 'Poznań, Kalisz, Konin, Piła, Leszno' },
    { name: 'Śląskie', cities: 'Katowice, Gliwice, Sosnowiec, Częstochowa, Bielsko-Biała' },
    { name: 'Małopolskie', cities: 'Kraków, Tarnów, Nowy Sącz, Oświęcim' },
    { name: 'Dolnośląskie', cities: 'Wrocław, Wałbrzych, Legnica, Jelenia Góra' },
    { name: 'Łódzkie', cities: 'Łódź, Piotrków Trybunalski, Pabianice, Tomaszów Maz.' },
    { name: 'Pomorskie', cities: 'Gdańsk, Gdynia, Sopot, Słupsk, Tczew' },
    { name: 'Zachodniopomorskie', cities: 'Szczecin, Koszalin, Stargard, Kołobrzeg' },
    { name: 'Lubelskie', cities: 'Lublin, Zamość, Chełm, Biała Podlaska' },
    { name: 'Podkarpackie', cities: 'Rzeszów, Przemyśl, Stalowa Wola, Mielec' },
    { name: 'Świętokrzyskie', cities: 'Kielce, Ostrowiec Świętokrzyski, Starachowice' },
    { name: 'Podlaskie', cities: 'Białystok, Suwałki, Łomża, Augustów' },
    { name: 'Opolskie', cities: 'Opole, Kędzierzyn-Koźle, Nysa, Brzeg' },
    { name: 'Lubuskie', cities: 'Gorzów Wielkopolski, Zielona Góra, Nowa Sól' },
    { name: 'Warmińsko-Mazurskie', cities: 'Olsztyn, Elbląg, Ełk, Iława' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/60 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <BrandHeader
        brand={brand}
        currentBrandKey={brandKey}
        onSwitchBrand={handleSwitchBrand}
      />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12 w-full">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Strona Główna
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Obszar działania</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
              <MapPin className="w-3.5 h-3.5" /> Cała Polska • Bezpłatny dojazd
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Obszar działania skupu samochodów
            </h1>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Odkupujemy samochody w całej Polsce z bezpłatnym dojazdem pod Twój dom lub firmę.
              Posiadamy własną flotę autolawet oraz mobilnych rzeczoznawców. Szybka płatność gotówką
              lub przelewem ekspresowym przy podpisaniu legalnej umowy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dojazd autolawetą przy sprzedaży: <strong>0 zł</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Czas oględzin: <strong>od 15 min do 24h</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Przejęcie rękojmi i legalna umowa</span>
            </div>
          </div>
        </div>

        {/* 1. SEKTOR PRIORYTETOWY: WOJEWÓDZTWO KUJAWSKO-POMORSKIE */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
                Region centralny i baza operacyjna
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Województwo Kujawsko-Pomorskie (Ekspresowy dojazd 15–45 min)
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              14 miast powiatowych i gmin ościennych
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kujawskiePages.map((cp) => (
              <Link
                key={cp.slug}
                href={`/${cp.slug}`}
                className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                      Skup aut {cp.cityName}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {cp.localLogistics.arrivalEstimate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {cp.localLogistics.hubDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-amber-600 transition-colors">
                  <span>Szczegóły oddziału i wycena</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. GŁÓWNE AGLOMERACJE I METROPOLIE W POLSCE */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Oddziały partnerskie w Polsce
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Główne aglomeracje i miasta wojewódzkie
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aglomeracjePages.map((cp) => (
              <Link
                key={cp.slug}
                href={`/${cp.slug}`}
                className="group bg-white rounded-2xl p-4 border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-sm font-extrabold text-slate-900 group-hover:text-slate-950 block">
                    Skup aut {cp.cityName}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Woj. {cp.voivodeship}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-slate-900">
                  <span>Sprawdź</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. SPECJALIZACJE ODKUPU POJAZDÓW */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Stan techniczny i prawny
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Specjalistyczne kategorie skupu samochodów
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Skup aut uszkodzonych mechanicznie',
                slug: 'skup-aut-uszkodzonych',
                desc: 'Uszkodzony silnik, zatarta turbosprężarka, awaria skrzyni biegów czy stuki w zawieszeniu. Odkup bez konieczności naprawiania.',
                icon: Wrench,
              },
              {
                title: 'Skup aut powypadkowych i po stłuczce',
                slug: 'skup-aut-powypadkowych',
                desc: 'Pojazdy po kolizjach drogowych, z uszkodzoną blacharką, po stłuczkach parkingowych lub szkodach całkowitych.',
                icon: AlertCircle,
              },
              {
                title: 'Skup aut bez ważnego OC i przeglądu',
                slug: 'skup-aut-bez-oc-przegladu',
                desc: 'Auto stoi nieużywane, a zbliża się polisa? Bezpłatny transport autolawetą prosto z Twojej posesji lub parkingu.',
                icon: Truck,
              },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-400 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 w-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-slate-900">
                    <span>Zobacz ofertę</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 4. WSZYSTKIE 16 WOJEWÓDZTW */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Zasięg ogólnopolski
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Dojazd autolawetą we wszystkich 16 województwach
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Nie musisz organizować transportu ani martwić się brakiem badań technicznych.
              Nasz zespół lub zweryfikowany partner handlowy odbierze auto z każdego zakątka kraju.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {voivodeships.map((v, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border text-left space-y-1 transition-colors ${
                  v.isHub
                    ? 'bg-amber-950/40 border-amber-600/60'
                    : 'bg-slate-800/80 border-slate-700/80'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-black text-white">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      v.isHub ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                  <span>Woj. {v.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {v.cities}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CALL TO ACTION DO FORMULARZA */}
        <section className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent rounded-3xl border border-amber-200/80 p-6 sm:p-10 text-center space-y-5">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Chcesz sprzedać auto w swoim mieście?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Wycena jest bezpłatna i całkowicie niezobowiązująca. Wypełnij prosty formularz,
              a zweryfikowany kupiec skontaktuje się z konkretną propozycją kwoty od ręki.
            </p>
          </div>
          <div>
            <Link
              href="/#formularz-wyceny"
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-extrabold shadow-sm hover:opacity-90 transition-opacity ${brand.primaryBgClass} ${brand.primaryBtnTextClass || 'text-white'}`}
            >
              <span>Wypełnij bezpłatny formularz wyceny ↑</span>
            </Link>
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
};
