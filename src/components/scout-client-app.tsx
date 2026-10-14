'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BrandConfig, BrandKey } from '@/types/scout';
import { BRANDS, resolveBrandFromLocation } from '@/config/brands';
import { BrandHeader } from '@/components/brand-header';
import { ScoutWizard } from '@/components/scout-wizard';
import { LandingSections } from '@/components/landing-sections';
import { Footer } from '@/components/footer';
import { LegalModal } from '@/components/legal-modal';
import { CookieBanner } from '@/components/cookie-banner';
import { Check } from 'lucide-react';

interface ScoutClientAppProps {
  initialBrandKey?: BrandKey;
}

export function ScoutClientApp({ initialBrandKey = 'autozglowy' }: ScoutClientAppProps) {
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

  // Sync brand from URL parameter or hostname
  useEffect(() => {
    const forced = searchParams.get('brand') as BrandKey | null;
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const resolved = resolveBrandFromLocation(hostname, forced);
    queueMicrotask(() => {
      setBrandKey((prev) => (prev !== resolved.id ? resolved.id : prev));
    });
  }, [searchParams]);

  // Dynamically update favicon and title when switching brands in browser
  useEffect(() => {
    const isZdajAuto = brandKey === 'zdajauto';
    const iconPath = isZdajAuto ? '/zdajauto-icon-32.png' : '/autozglowy-icon-32.png';
    const appleIconPath = isZdajAuto ? '/zdajauto-icon-192.png' : '/autozglowy-icon-192.png';
    const brandTitle = isZdajAuto
      ? 'ZdajAuto.pl – Skup Samochodów i Aut Dostawczych od Ręki w 24h'
      : 'AutoZglowy.pl – Skup Aut za Gotówkę w 24h | Bezpłatna Wycena Online';

    document.title = brandTitle;

    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = `${iconPath}?brand=${brandKey}`;

    let appleLink: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleLink);
    }
    appleLink.href = `${appleIconPath}?brand=${brandKey}`;
  }, [brandKey]);

  const brand: BrandConfig = BRANDS[brandKey];

  const handleOpenLegal = (tab: 'terms' | 'privacy') => {
    setLegalModalState({ isOpen: true, tab });
  };

  const handleCloseLegal = () => {
    setLegalModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* 1. Header */}
      <BrandHeader
        brand={brand}
        currentBrandKey={brandKey}
        onSwitchBrand={handleSwitchBrand}
      />

      {/* 2. Main Hero & Form Wizard */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-14 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Psychological value props & hero */}
          <div className="lg:col-span-5 space-y-6 pt-1 lg:sticky lg:top-24">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
                {brand.heroTitle}{' '}
                <span className={`block mt-1 ${brand.primaryTextClass}`}>
                  {brand.heroHighlight}
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {brand.heroSubtitle}
              </p>
            </div>

            {/* Trust points */}
            <div className="space-y-3.5 pt-2">
              {brand.trustPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-slate-800">
                  <div
                    className={`mt-0.5 p-1 rounded-full ${brand.lightBgClass} ${brand.primaryTextClass} shrink-0`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                      {point.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional trust signals */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">
                  Wyceny realizowane na bieżąco
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Średni czas kontaktu z propozycją cenową od lokalnego partnera wynosi poniżej 45 minut w godzinach 7:00 – 21:00.
              </p>
            </div>
          </div>

          {/* Right Column: 4-Step Interactive Form Wizard */}
          <div id="formularz-wyceny" className="lg:col-span-7 scroll-mt-24">
            <ScoutWizard brand={brand} onOpenLegal={handleOpenLegal} />
          </div>
        </div>

        {/* 3. Comprehensive SEO Landing Sections */}
        <LandingSections brand={brand} onOpenLegal={handleOpenLegal} />
      </main>

      {/* 4. Footer */}
      <Footer brand={brand} onOpenLegal={handleOpenLegal} />

      {/* 5. Legal Modals (Omnibus & RODO) */}
      <LegalModal
        domainName={brand.domainName}
        isOpen={legalModalState.isOpen}
        initialTab={legalModalState.tab}
        onClose={handleCloseLegal}
      />

      {/* 6. Cookie & Privacy Banner */}
      <CookieBanner onOpenPrivacy={() => handleOpenLegal('privacy')} />
    </div>
  );
}
