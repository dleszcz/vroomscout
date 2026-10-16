import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { resolveServerBrand } from '@/config/brands';
import { ArrowLeft, ShieldCheck, Mail, Building, FileText } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{
    brand?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const brand = await resolveServerBrand(params.brand);
  const domainName = brand.domainName;

  return {
    title: `Polityka Prywatności i RODO | ${domainName}`,
    description: `Zasady ochrony prywatności, przetwarzania danych osobowych (RODO) oraz wykorzystania plików cookies w serwisie ${domainName}.`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPolicyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const brand = await resolveServerBrand(params.brand);
  const domainName = brand.domainName;
  const isZdajAuto = brand.id === 'zdajauto';
  const contactEmail = isZdajAuto ? 'biuro@zdajauto.pl' : 'biuro@autozglowy.pl';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do wyceny
          </Link>
          <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            {domainName}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 sm:p-10 space-y-8">
          {/* Title Box */}
          <div className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Zgodność z RODO i Prawem Komunikacji Elektronicznej (PKE)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Polityka Prywatności i Ochrony Danych
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dokument obowiązujący w serwisie {domainName} • Wersja v1.0 (Aktualna)
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-600" />
              1. Administrator Danych Osobowych
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Administratorem Twoich danych osobowych przekazywanych w formularzu wyceny serwisu{' '}
              <strong>{domainName}</strong> jest:
            </p>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">Daniel Leszczyński</p>
              <p>Działalność gospodarcza: ul. Dominikanów 16, 87-880 Brześć Kujawski</p>
              <p>NIP: 8883083559</p>
              <p className="flex items-center gap-1.5 text-slate-600 pt-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                Kontakt: <code className="text-slate-900 font-mono">{contactEmail}</code>
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Cel i podstawa prawna przetwarzania danych
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Twoje dane osobowe przetwarzane są w następujących celach:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <li>
                <strong>Świadczenie bezpłatnej usługi wyceny online i dopasowania</strong> (art. 6 ust. 1 lit. b RODO – świadczenie usługi drogą elektroniczną na Twoje żądanie).
              </li>
              <li>
                <strong>Przekazanie parametrów pojazdu i kontaktu do zweryfikowanego Partnera handlowego</strong> (skupu aut lub komisu) w celu złożenia propozycji cenowej i kontaktu telefonicznego/SMS (art. 6 ust. 1 lit. a RODO – dobrowolna zgoda oraz art. 172 PKE).
              </li>
              <li>
                <strong>Obrona przed roszczeniami i cele dowodowe</strong> (art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora).
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              3. Odbiorcy danych (Model Wyłączności Regionalnej)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Szanujemy Twój spokój. Twoje zgłoszenie przekazywane jest na zasadzie wyłączności do{' '}
              <strong className="text-slate-900">jednego dopasowanego partnera skupowego</strong> w Twoim regionie.
              Nie udostępniamy Twojego numeru na publicznych giełdach ani nie sprzedajemy go masowo, co chroni Cię przed dziesiątkami niechcianych telefonów.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Po otrzymaniu parametrów auta Partner kontaktuje się z Tobą telefonicznie lub SMS-em z konkretną ofertą i staje się odrębnym administratorem danych w zakresie transakcji kupna-sprzedaży.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              4. Twoje prawa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              W każdej chwili przysługuje Ci prawo do:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <li>Dostępu do treści swoich danych osobowych oraz otrzymania ich kopii,</li>
              <li>Sprostowania (poprawienia) nieprawidłowych danych,</li>
              <li>Żądania usunięcia danych („prawo do bycia zapomnianym”),</li>
              <li>Ograniczenia przetwarzania lub wniesienia sprzeciwu,</li>
              <li>Cofnięcia zgody na kontakt w dowolnym momencie (poprzez e-mail na adres <code className="text-slate-900">{contactEmail}</code>),</li>
              <li>Wniesienia skargi do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych (PUODO).</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              5. Pliki Cookies i pamięć lokalna (localStorage)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Serwis wykorzystuje pamięć przeglądarki (localStorage) wyłącznie w celach technicznych – aby zapobiec utracie wpisywanych w formularzu danych w przypadku przypadkowego odświeżenia strony na telefonie. W celach statystycznych i optymalizacji kampanii reklamowych serwis może korzystać z anonimowych narzędzi analitycznych (Meta Pixel, Vercel Web Analytics) w zgodzie z obowiązującymi przepisami.
            </p>
          </section>

          {/* Footer note */}
          <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {domainName} • Wszelkie prawa zastrzeżone.</p>
            <Link
              href="/regulamin"
              className="font-medium text-slate-700 hover:text-slate-950 underline inline-flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              Zobacz Regulamin Serwisu
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
