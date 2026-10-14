'use client';

import React, { useState, useEffect } from 'react';
import { BrandConfig, BrandKey } from '@/types/scout';
import { ShieldCheck } from 'lucide-react';
import { BrandLogo } from './brand-logo';

interface BrandHeaderProps {
  brand: BrandConfig;
  currentBrandKey: BrandKey;
  onSwitchBrand: (key: BrandKey) => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  brand,
  currentBrandKey,
  onSwitchBrand,
}) => {
  const [showDevSwitcher, setShowDevSwitcher] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isDevHost =
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.endsWith('.local') ||
        hostname.includes('vercel.app') ||
        hostname.includes('pages.dev');
      queueMicrotask(() => setShowDevSwitcher(isDevHost));
    }
  }, []);

  const homeHref = currentBrandKey === 'zdajauto' ? '/?brand=zdajauto' : '/';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 transition-colors shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <BrandLogo brandKey={brand.id} size="md" href={homeHref} />

        {/* Right side trust badge & dev switch */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Bezpłatna wycena bez zobowiązań</span>
          </div>

          {/* Dyskretny przełącznik testowy domen – widoczny TYLKO lokalnie na localhost */}
          {showDevSwitcher && (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => onSwitchBrand('autozglowy')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  currentBrandKey === 'autozglowy'
                    ? 'bg-amber-400 text-slate-950 font-extrabold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AutoZglowy
              </button>
              <button
                type="button"
                onClick={() => onSwitchBrand('zdajauto')}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  currentBrandKey === 'zdajauto'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ZdajAuto
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
