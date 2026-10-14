'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandConfig } from '@/types/scout';
import {
  Clock,
  Banknote,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Truck,
  PhoneCall,
  Wrench,
  Car,
  AlertCircle,
  MapPin,
  FileText,
  ShieldCheck,
} from 'lucide-react';

interface LandingSectionsProps {
  brand: BrandConfig;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({ brand }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const isZdajAuto = brand.id === 'zdajauto';

  const comparisonRows = [
    {
      feature: 'Rodzaj wyceny i cel transakcji',
      scout: 'Pewna wycena odkupu od ręki (gotówka w 24h)',
      portal: 'Cena detaliczna życzeniowa (~30 dni czekania na kupca)',
    },
    {
      feature: 'Czas do otrzymania gotówki',
      scout: 'Zazwyczaj w 24–48 godzin',
      portal: 'Średnio 3–8 tygodni czekania i odbierania telefonów',
    },
    {
      feature: 'Koszt zgłoszenia i wyceny',
      scout: '0 zł (w 100% bezpłatnie i bez zobowiązań)',
      portal: '80 – 250 zł za pakiety płatnych ogłoszeń',
    },
    {
      feature: 'Konieczność mycia, prania i naprawiania',
      scout: 'Zero! Bierzemy auto w obecnym stanie',
      portal: 'Wymagane mycie, detailing i usuwanie usterek na własny koszt',
    },
    {
      feature: 'Telefony po nocy i marudni oglądacze',
      scout: 'Brak! Tylko 1 kontakt od konkretnego partnera z ofertą',
      portal: 'Dziesiątki telefonów od gawędziarzy z miernikami lakieru',
    },
    {
      feature: 'Odpowiedzialność prawna (rękojmia za wady)',
      scout: 'Partner profesjonalnie zdejmuje z Ciebie rękojmię',
      portal: 'Kupujący może zgłaszać roszczenia z tytułu wad ukrytych',
    },
    {
      feature: 'Odbiór pojazdu pod Twoim domem',
      scout: 'Partner dojeżdża do Ciebie lub wysyła bezpłatną autolawetę',
      portal: 'Musisz umawiać się na jazdę próbną i tracić własny czas',
    },
  ];

  // 16 województw Polski i główne ośrodki z darmowym dojazdem
  const voivodeships = [
    { name: 'Mazowieckie', cities: 'Warszawa, Radom, Płock, Siedlce' },
    { name: 'Śląskie', cities: 'Katowice, Częstochowa, Gliwice, Sosnowiec' },
    { name: 'Wielkopolskie', cities: 'Poznań, Kalisz, Konin, Piła' },
    { name: 'Małopolskie', cities: 'Kraków, Tarnów, Nowy Sącz, Oświęcim' },
    { name: 'Dolnośląskie', cities: 'Wrocław, Wałbrzych, Legnica, Jelenia Góra' },
    { name: 'Łódzkie', cities: 'Łódź, Piotrków Trybunalski, Pabianice' },
    { name: 'Pomorskie', cities: 'Gdańsk, Gdynia, Sopot, Słupsk' },
    { name: 'Kujawsko-Pomorskie', cities: 'Bydgoszcz, Toruń, Włocławek, Grudziądz' },
    { name: 'Zachodniopomorskie', cities: 'Szczecin, Koszalin, Stargard, Kołobrzeg' },
    { name: 'Lubelskie', cities: 'Lublin, Zamość, Chełm, Biała Podlaska' },
    { name: 'Podkarpackie', cities: 'Rzeszów, Przemyśl, Stalowa Wola, Mielec' },
    { name: 'Świętokrzyskie', cities: 'Kielce, Ostrowiec Św., Starachowice' },
    { name: 'Podlaskie', cities: 'Białystok, Suwałki, Łomża' },
    { name: 'Lubuskie', cities: 'Zielona Góra, Gorzów Wielkopolski, Nowa Sól' },
    { name: 'Opolskie', cities: 'Opole, Kędzierzyn-Koźle, Nysa' },
    { name: 'Warmińsko-Mazurskie', cities: 'Olsztyn, Elbląg, Ełk, Iława' },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-20 mt-12 sm:mt-20">
      {/* ========================================================
          1. JAK TO DZIAŁA W 3 KROKACH
      ======================================================== */}
      <section id="jak-to-dziala" className="max-w-6xl mx-auto px-0 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${brand.accentBadgeClass}`}
          >
            Prosty i przejrzysty proces skupu
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Jak wygląda szybki odkup auta w 3 krokach?
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Zamiast tracić tygodnie na płatne ogłoszenia i odbieranie telefonów od marudnych oglądaczy,
            u nas załatwiasz całą sprzedaż bez stresu i zbędnych formalności.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 relative">
          {[
            {
              step: '01',
              title: 'Wypełniasz krótki formularz online',
              desc: 'Podajesz markę, model i rocznik, zaznaczasz orientacyjny stan techniczny i opcjonalnie załączasz zdjęcia z telefonu.',
              icon: Clock,
              badge: 'W 100% bezpłatnie',
            },
            {
              step: '02',
              title: 'Odbierasz kontakt z propozycją odkupu',
              desc: 'Dopasowany partner skupu kontaktuje się z Tobą telefonicznie lub SMS-em z konkretnymi widełkami cenowymi od ręki.',
              icon: PhoneCall,
              badge: 'Zero zobowiązań',
            },
            {
              step: '03',
              title: 'Podpisanie umowy i natychmiastowa wypłata',
              desc: 'Partner przyjeżdża pod wskazany adres, podpisujecie umowę kupna-sprzedaży i otrzymujesz gotówkę lub przelew ekspresowy.',
              icon: Banknote,
              badge: 'Przejęcie rękojmi',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-2xl sm:text-4xl font-black ${brand.primaryTextClass} font-mono`}
                  >
                    {item.step}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          2. SZEROKI ZAKRES SKUPU (SEO: OSOBOWE, DOSTAWCZE, USZKODZONE, BEZ OC)
      ======================================================== */}
      <section id="kategorie-aut" className="max-w-6xl mx-auto px-0 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${brand.accentBadgeClass}`}
          >
            Pełny zakres odkupu pojazdów
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Jakie samochody skupujemy za gotówkę?
          </h2>
          <p className="text-slate-600 text-xs sm:text-base">
            Nasi partnerzy posiadają własne warsztaty i autolawety – odkupujemy pojazdy w każdym stanie technicznym i prawnym.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {[
            {
              icon: Car,
              title: 'Skup aut osobowych (Wszystkie marki)',
              desc: 'Auta miejskie, kompakty, sedany, kombi i SUV-y. Roczniki od 2000 do najnowszych. Szybka transakcja bez czekania na kupców z ogłoszeń.',
              badge: 'Płatność od ręki',
            },
            {
              icon: Wrench,
              title: 'Skup aut uszkodzonych i po awarii',
              desc: 'Uszkodzony silnik, zatarta jednostka, uszkodzona skrzynia biegów, stuki w zawieszeniu czy błędy na desce rozdzielczej. Odkup bez naprawiania.',
              badge: 'Wycena po kosztach warsztatu',
            },
            {
              icon: AlertCircle,
              title: 'Skup aut powypadkowych i po kolizji',
              desc: 'Samochody po stłuczkach, z uszkodzonym przodem, wystrzelonymi poduszkami czy uszkodzoną blacharką. Rzetelna kalkulacja i odbiór.',
              badge: 'Odkup bez marudzenia',
            },
            {
              icon: Truck,
              title: 'Skup aut bez ważnego OC i przeglądu',
              desc: 'Samochód stoi nieużywany i zbliża się opłata za ubezpieczenie? Zorganizujemy bezpłatny odbiór autolawetą prosto z Twojego podjazdu.',
              badge: 'Darmowa autolaweta',
            },
            {
              icon: Truck,
              title: 'Skup aut dostawczych i busów (do 3.5t)',
              desc: 'Furgony (blaszaki), brygadówki, plandeki, skrzynie, chłodnie oraz busy osobowe (Transit, Master, Ducato, Sprinter). Rozliczenie na FV 23% lub umowę.',
              badge: 'Dla firm i osób prywatnych',
            },
            {
              icon: FileText,
              title: 'Skup aut poleasingowych i poflotowych',
              desc: 'Szybkie odkupy całych pakietów flotowych oraz aut po zakończonym leasingu. Natychmiastowe uwolnienie kapitału dla przedsiębiorstw.',
              badge: 'Pełna faktura VAT',
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${brand.lightBgClass} ${brand.primaryTextClass}`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. PORADNIK FORMALNO-PRAWNY (HELPFUL CONTENT / E-E-A-T)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-0">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-10 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${brand.accentBadgeClass}`}
            >
              Kompletny przewodnik formalny
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Jakie dokumenty są potrzebne do sprzedaży auta w skupie?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Dbamy o to, aby cała transakcja była w 100% legalna, bezpieczna i zgodna z polskim prawem.
              Oto lista dokumentów, które warto przygotować przed przyjazdem partnera:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>1. Dokumenty pojazdu</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Dowód rejestracyjny</strong> (lub zaświadczenie z wydziału komunikacji)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Karta pojazdu</strong> (jeśli została wydana przed wrześniem 2022 r.)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Polisa lub potwierdzenie opłaty ubezpieczenia OC</span>
                </li>
              </ul>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>2. Tożsamość i współwłasność</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Dowód osobisty</strong> lub paszport właściciela wpisanego w dowodzie</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pełnomocnictwo</strong> (jeśli w dowodzie jest współmałżonek lub współwłaściciel)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Oryginały umów (jeśli auto nie było przerejestrowane na Ciebie)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <Banknote className="w-4 h-4 text-amber-600" />
                <span>3. Co zyskujesz po sprzedaży?</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zgłoszenie zbycia:</strong> Wygodnie online przez profil zaufany (mObywatel/Gov.pl) w 3 minuty</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zwrot składki OC:</strong> Przekazujesz kopię umowy do ubezpieczalni i odzyskujesz niewykorzystane pieniądze</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zdjęcie rękojmi:</strong> Zgodnie z umową handlową kupujący zdejmuje z Ciebie roszczenia za wady</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. PORÓWNANIE: ANTY-OLX (CZYTELNE NA MOBILE + TABELA NA DESKTOP)
      ======================================================== */}
      <section className="max-w-5xl mx-auto px-0">
        <div className="bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mb-6 sm:mb-8 space-y-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isZdajAuto ? 'bg-purple-900/60 text-purple-400' : 'bg-amber-900/60 text-amber-400'
              }`}
            >
              Uczciwe porównanie
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              {brand.comparisonTitle}
            </h2>
            <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
              {brand.comparisonSubtitle}
            </p>
          </div>

          {/* WIDOK DLA SMARTFONÓW (< md): Czytelne karty cech, bez uciążliwego przewijania poziomego */}
          <div className="md:hidden space-y-3">
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block pb-1 border-b border-slate-800">
                  {row.feature}
                </span>

                {/* Nasz Serwis */}
                <div
                  className={`p-2.5 rounded-lg bg-slate-950/80 border ${
                    isZdajAuto ? 'border-purple-500/40' : 'border-amber-500/40'
                  } flex items-start gap-2.5`}
                >
                  <Check
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isZdajAuto ? 'text-purple-400' : 'text-amber-400'
                    }`}
                  />
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      {brand.domainName}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isZdajAuto ? 'text-purple-300' : 'text-amber-300'
                      }`}
                    >
                      {row.scout}
                    </span>
                  </div>
                </div>

                {/* Samodzielna sprzedaż na portalach */}
                <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-start gap-2.5">
                  <X className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                      Samodzielna sprzedaż (OLX / Otomoto)
                    </span>
                    <span className="text-xs text-slate-400">
                      {row.portal}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* WIDOK DLA DESKTOPU (>= md): Pełna tradycyjna tabela */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3.5 pr-4">Cecha sprzedaży</th>
                  <th className="py-3.5 px-4 bg-slate-900/70 rounded-t-xl text-white font-extrabold">
                    {brand.domainName}
                  </th>
                  <th className="py-3.5 pl-4">Samodzielna sprzedaż (OLX / Otomoto)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 pr-4 text-slate-300 font-medium">{row.feature}</td>
                    <td
                      className={`py-3.5 px-4 bg-slate-900/70 font-bold ${
                        isZdajAuto ? 'text-purple-400' : 'text-amber-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0" />
                        <span>{row.scout}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pl-4 text-slate-400">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{row.portal}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. FAQ ZGODNE Z GOOGLE FAQPAGE SCHEMA
      ======================================================== */}
      <section id="faq" className="max-w-3xl mx-auto px-0 scroll-mt-20">
        <div className="text-center mb-8 space-y-2">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${brand.accentBadgeClass}`}
          >
            Masz pytania?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Najczęściej zadawane pytania o skup aut (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Wszystko, co musisz wiedzieć o wycenie, płatności, odbiorze auta i formalnościach.
          </p>
        </div>

        <div className="space-y-2.5">
          {brand.faqList.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-4 py-3.5 sm:px-5 sm:py-4 text-left flex items-center justify-between gap-3 font-extrabold text-slate-900 text-xs sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{item.question}</span>
                  <span className="p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          6. ZASIĘG OGÓLNOPOLSKI (SEO: WOJEWÓDZTWA I BEZPŁATNY DOJAZD)
      ======================================================== */}
      <section id="zasieg-skupu" className="max-w-6xl mx-auto px-0 scroll-mt-20">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
              <MapPin className="w-3.5 h-3.5" /> Cała Polska
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Działamy w całej Polsce – bezpłatny dojazd pod Twój dom
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Nie musisz jeździć do odległych komisów ani organizować transportu. Nasi partnerzy
              dysponują mobilnymi kupcami oraz autolawetami w każdym regionie Polski. Przyjeżdżamy na miejsce,
              podpisujemy dokumenty i wypłacamy gotówkę od ręki.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 pt-2">
            {voivodeships.map((v, i) => (
              <div
                key={i}
                className="p-3 sm:p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-left space-y-1 hover:border-slate-500 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs font-black text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Woj. {v.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {v.cities} i okolice
                </p>
              </div>
            ))}
          </div>

          {/* Link do dedykowanej strony z wykazem oddziałów i miast (Czyste UX & SEO) */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 text-center sm:text-left">
              Szukasz skupu aut w konkretnym mieście lub powiecie?
            </span>
            <Link
              href="/obszar-dzialania"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold border border-slate-700 transition-colors"
            >
              <span>Obszar działania i lista miast →</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 text-xs text-slate-400">
            <span>⚡ Średni czas przyjazdu kupca na oględziny: <strong>2 – 24 godziny</strong></span>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-emerald-400 font-bold">Dojazd i transport autolawetą przy sprzedaży: 0 zł</span>
              <a
                href="#formularz-wyceny"
                className={`px-4 py-2 rounded-xl text-xs font-bold ${brand.primaryBgClass} ${brand.primaryBtnTextClass || 'text-white'} hover:opacity-90 transition-opacity`}
              >
                Bezpłatna wycena online ↑
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
