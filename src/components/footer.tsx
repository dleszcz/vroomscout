'use client';

import React from 'react';
import Link from 'next/link';
import { BrandConfig } from '@/types/scout';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  brand: BrandConfig;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ brand, onOpenLegal }) => {
  const homeHref = brand.id === 'zdajauto' ? '/?brand=zdajauto' : '/';

  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-10 pb-14 mt-16 sm:mt-24 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <Link
              href={homeHref}
              className="font-extrabold text-base text-slate-900 hover:text-slate-700 transition-colors inline-block cursor-pointer"
            >
              {brand.domainName}
            </Link>
            <p className="text-slate-500 max-w-md text-xs leading-relaxed">
              Platforma łącząca zgłoszenia sprzedaży samochodów ze zweryfikowanymi partnerami handlowymi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <Link
              href="/regulamin"
              className="hover:text-slate-900 underline cursor-pointer"
            >
              Regulamin Serwisu
            </Link>
            <span>•</span>
            <Link
              href="/polityka-prywatnosci"
              className="hover:text-slate-900 underline cursor-pointer"
            >
              Polityka Prywatności i RODO
            </Link>
            <span>•</span>
            <a href="#jak-to-dziala" className="hover:text-slate-900">
              Jak to działa
            </a>
            <span>•</span>
            <Link href="/obszar-dzialania" className="hover:text-slate-900 font-bold text-slate-800">
              Obszar działania
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} {brand.domainName}. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Zgodność z RODO i Prawem Komunikacji Elektronicznej</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
