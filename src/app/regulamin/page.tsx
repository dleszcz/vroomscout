import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { resolveServerBrand } from '@/config/brands';
import { ArrowLeft, FileText, Mail, Building, ShieldCheck } from 'lucide-react';

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
    title: `Regulamin Serwisu | ${domainName}`,
    description: `Zasady bezpłatnego korzystania z serwisu wyceny i dopasowania ofert odkupu pojazdów ${domainName}.`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsPage({ searchParams }: PageProps) {
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
              <FileText className="w-3.5 h-3.5" />
              Dokument prawny
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Regulamin Serwisu {domainName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Wersja v1.0 (Aktualna) • Bezpłatna usługa wyceny online
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-600" />
              §1. Postanowienia ogólne
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              1. Niniejszy Regulamin określa zasady korzystania z internetowego serwisu wyceny i kojarzenia ofert sprzedaży pojazdów pod domeną <strong>{domainName}</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              2. Usługodawcą i Operatorem Serwisu jest <strong>Daniel Leszczyński prowadzący działalność gospodarczą pod adresem ul. Dominikanów 16, 87-880 Brześć Kujawski, NIP: 8883083559</strong>, e-mail: <code className="font-mono text-slate-900">{contactEmail}</code>.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              3. Korzystanie z Serwisu przez Użytkownika zgłaszającego pojazd do wyceny jest <strong>całkowicie bezpłatne i niezobowiązujące</strong>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              §2. Zasady działania (Model Agregatora Ofert)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              1. Operator serwisu świadczy drogą elektroniczną bezpłatną usługę zbierania parametrów pojazdu za pośrednictwem formularza wyceny oraz ich automatycznego przekazania do zweryfikowanego partnera handlowego (profesjonalnego skupu aut lub komisu) w regionie Użytkownika.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              2. Operator <strong>nie jest stroną umowy kupna-sprzedaży pojazdu</strong>. Wszelkie ustalenia finansowe, oględziny oraz podpisanie umowy sprzedaży następują bezpośrednio pomiędzy Użytkownikiem a dopasowanym Partnerem.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              3. Zgłoszenie pojazdu nie nakłada na Użytkownika żadnego obowiązku jego sprzedaży. Użytkownik zachowuje pełną swobodę odrzucenia zaproponowanej wyceny.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              §3. Obowiązki Użytkownika
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              1. Użytkownik zobowiązuje się do podawania w formularzu danych zgodnych ze stanem faktycznym oraz oświadcza, że jest właścicielem pojazdu lub posiada upoważnienie do dysponowania nim.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              2. Zabronione jest wprowadzanie treści o charakterze bezprawnym lub fikcyjnych numerów kontaktowych należących do osób trzecich.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              3. Użytkownik przesyłając zdjęcia pojazdu oświadcza, że posiada do nich pełne prawa oraz przyjmuje do wiadomości, że materiały te zostaną udostępnione współpracującym partnerom handlowym (skupom aut/dealerom) wyłącznie w celu oceny stanu technicznego i przygotowania propozycji odkupu. Użytkownik zobowiązuje się do nieumieszczania na zdjęciach dokumentów osobistych (dowód osobisty, paszport, PESEL), dokumentów zawierających dane osób trzecich ani wizerunku osób fizycznych. Widoczność standardowych tablic rejestracyjnych pojazdu jest dozwolona i służy celom weryfikacji technicznej i historii pojazdu.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              §4. Reklamacje i kontakt
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Wszelkie zapytania, uwagi i reklamacje dotyczące funkcjonowania serwisu można zgłaszać drogą elektroniczną na adres: <code className="font-mono text-slate-900">{contactEmail}</code>. Rozpatrzenie reklamacji następuje w terminie do 14 dni.
            </p>
          </section>

          {/* Footer note */}
          <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {domainName} • Wszelkie prawa zastrzeżone.</p>
            <Link
              href="/polityka-prywatnosci"
              className="font-medium text-slate-700 hover:text-slate-950 underline inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Zobacz Politykę Prywatności i RODO
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
