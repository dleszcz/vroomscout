'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [accepted, setAccepted] = useState<boolean>(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('vroom_scout_cookie_consent');
      if (!consent) {
        queueMicrotask(() => setAccepted(false));
      }
    } catch {
      // localStorage may be disabled
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('vroom_scout_cookie_consent', 'accepted');
    } catch {
      // ignore
    }
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 text-slate-200 p-3.5 sm:p-4 shadow-2xl border-t border-slate-800 backdrop-blur-md animate-fade-in-scale">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-slate-300 leading-relaxed text-xs sm:text-xs">
            Używamy plików cookies i pamięci podręcznej (localStorage) do automatycznego zapisu postępu
            Twojego formularza oraz celów analitycznych.{' '}
            {onOpenPrivacy && (
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="underline text-slate-200 hover:text-white font-medium"
              >
                Szczegóły w Polityce Prywatności
              </button>
            )}
            .
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm active:scale-95"
          >
            Akceptuję i przechodzę dalej
          </button>
        </div>
      </div>
    </div>
  );
};
