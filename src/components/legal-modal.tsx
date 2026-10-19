'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'terms' | 'privacy';
  domainName: string;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'terms',
  domainName,
  onClose,
}) => {
  const [tab, setTab] = useState<'terms' | 'privacy'>(initialTab);

  useEffect(() => {
    queueMicrotask(() => setTab(initialTab));
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isZdajAuto = domainName.toLowerCase().includes('zdajauto');
  const isAutoZglowy = domainName.toLowerCase().includes('autozglowy');
  const contactEmail = isZdajAuto
    ? 'biuro@zdajauto.pl'
    : isAutoZglowy
    ? 'biuro@autozglowy.pl'
    : 'kontakt@vroomdealer.pl';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in-scale"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab('terms')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === 'terms'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Regulamin Serwisu
            </button>
            <button
              type="button"
              onClick={() => setTab('privacy')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === 'privacy'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Polityka Prywatności i RODO
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
          {tab === 'terms' ? (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-600">
                  Dokument prawny
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Regulamin Serwisu {domainName}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Wersja v1.0-2026-10 (Aktualna)</p>
              </div>

              <section className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-900 text-sm">§1. Postanowienia ogólne</h4>
                <p>
                  1. Niniejszy Regulamin określa zasady korzystania z internetowego systemu kojarzenia
                  ofert sprzedaży pojazdów z podmiotami zajmującymi się ich profesjonalnym odkupem
                  (dalej: <strong>„Serwis”</strong>), działającego w ramach ekosystemu{' '}
                  <strong>VroomScout / VroomDealer</strong> pod domeną <strong>{domainName}</strong>.
                </p>
                <p>
                  2. Właścicielem i Operatorem Serwisu jest <strong>Daniel Leszczyński prowadzący działalność gospodarczą pod adresem ul. Dominikanów 16, 87-880 Brześć Kujawski, NIP: 8883083559</strong> (dalej: <strong>„Operator”</strong>), kontakt e-mail: <code>{contactEmail}</code>.
                </p>
                <p>
                  3. Korzystanie z Serwisu przez osobę zgłaszającą pojazd do bezpłatnej wyceny
                  (dalej: <strong>„Użytkownik”</strong>) jest{' '}
                  <strong className="text-slate-900">całkowicie bezpłatne i niezobowiązujące</strong>.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  §2. Charakter usługi (Model Inteligentnego Agregatora)
                </h4>
                <p>
                  1. Operator <strong>nie jest stroną umowy kupna-sprzedaży pojazdu</strong>. Operator
                  świadczy drogą elektroniczną bezpłatną usługę polegającą na zebraniu parametrów
                  pojazdu od Użytkownika za pomocą interaktywnego formularza, a następnie automatycznym
                  dopasowaniu i bezpiecznym przekazaniu zgłoszenia do współpracujących z Operatorem
                  przedsiębiorców (zweryfikowanych komisów samochodowych, salonów aut używanych i
                  profesjonalnych skupów pojazdów – dalej: <strong>„Partnerzy”</strong>), poszukujących aut
                  w regionie Użytkownika.
                </p>
                <p>
                  2. Wszelkie propozycje cenowe (widełki wyceny), oględziny pojazdu, negocjacje oraz
                  finalne zawarcie umowy sprzedaży odbywają się bezpośrednio pomiędzy Użytkownikiem a
                  dopasowanym Partnerem.
                </p>
                <p>
                  3. Wysłanie formularza w Serwisie nie stanowi oferty w rozumieniu Kodeksu cywilnego i
                  nie nakłada na Użytkownika żadnego obowiązku sprzedaży pojazdu.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  §3. Zasady korzystania z Formularza i Wyceny
                </h4>
                <p>
                  1. Użytkownik wypełnia formularz wyceny, podając kategorię, markę i model pojazdu, rok
                  produkcji, rodzaj paliwa, orientacyjny stan techniczny, oczekiwaną kwotę, miejscowość,
                  swoje imię oraz numer telefonu, oraz załącza zdjęcia pojazdu (min. 1 zdjęcie).
                </p>
                <p>
                  2. Użytkownik oświadcza, że podane przez niego informacje są zgodne ze stanem
                  faktycznym, a on sam jest właścicielem pojazdu lub osobą upoważnioną do jego
                  reprezentacji.
                </p>
                <p>
                  3. Serwis automatycznie kompresuje zdjęcia po stronie urządzenia Użytkownika przed
                  wysyłką, aby umożliwić błyskawiczny transfer nawet przy słabym zasięgu sieci komórkowej.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-900 text-sm">§4. Reklamacje i kontakt</h4>
                <p>
                  Wszelkie uwagi i zapytania dotyczące działania Serwisu można kierować na adres e-mail: <code>{contactEmail}</code> lub pisemnie na adres: Daniel Leszczyński, ul. Dominikanów 16, 87-880 Brześć Kujawski. Odpowiedzi udzielane są w terminie do 14 dni roboczych.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-600">
                  Ochrona Danych Osobowych
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Polityka Prywatności, RODO i Cookies ({domainName})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Zgodność z RODO i Prawem Komunikacji Elektronicznej (PKE)</p>
              </div>

              <section className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-900 text-sm">1. Administrator Danych Osobowych</h4>
                <p>
                  Administratorem Twoich danych osobowych przekazywanych przez formularz wyceny w serwisie {domainName} jest <strong>Daniel Leszczyński prowadzący działalność gospodarczą pod adresem ul. Dominikanów 16, 87-880 Brześć Kujawski, NIP: 8883083559</strong>, kontakt e-mail: <code>{contactEmail}</code> (dalej: <strong>„Administrator”</strong>).
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  2. Cel i podstawa prawna przetwarzania danych
                </h4>
                <p>Twoje dane osobowe przetwarzane są w celach:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Realizacji usługi wyceny i dopasowania</strong> (art. 6 ust. 1 lit. b RODO –
                    świadczenie usługi drogą elektroniczną na Twoje żądanie).
                  </li>
                  <li>
                    <strong>
                      Przekazania zgłoszenia do wybranych Partnerów (komisów / skupów aut) oraz kontaktu
                      telefonicznego/SMS
                    </strong>{' '}
                    w celu przedstawienia propozycji odkupu pojazdu (art. 6 ust. 1 lit. a RODO – Twoja
                    dobrowolna zgoda wyrażona w formularzu oraz zgoda z art. 172 PKE).
                  </li>
                  <li>
                    <strong>Statystycznym, analitycznym i dowodowym</strong> (art. 6 ust. 1 lit. f RODO –
                    prawnie uzasadniony interes Administratora polegający na obronie przed roszczeniami
                    oraz pomiarze jakości serwisu).
                  </li>
                </ul>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  3. Odbiorcy danych – Kim są nasi Partnerzy?
                </h4>
                <p>
                  Istotą działania Serwisu jest bezpieczne połączenie Cię z podmiotem zainteresowanym odkupem Twojego
                  samochodu. Twoje zgłoszenie trafia na zasadzie wyłączności do{' '}
                  <strong className="text-slate-900">
                    jednego dopasowanego Partnera (sprawdzonego skupu lub firmy odkupującej pojazdy)
                  </strong>{' '}
                  z Twojego regionu. Nie udostępniamy Twojego numeru na otwartych giełdach ani nie przekazujemy go wielu handlarzom naraz, chroniąc Cię przed niechcianym spamem telefonicznym.
                </p>
                <p>
                  Po otrzymaniu zgłoszenia Partner kontaktuje się z Tobą telefonicznie lub SMS-em z
                  wstępnymi widełkami cenowymi i staje się niezależnym administratorem danych w procesie
                  oględzin i ewentualnego zakupu.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  4. Twoje prawa i okres przechowywania
                </h4>
                <p>
                  Masz prawo do: wglądu w swoje dane, ich sprostowania, usunięcia, ograniczenia
                  przetwarzania oraz cofnięcia zgody na kontakt w dowolnym momencie poprzez wysłanie
                  wiadomości na adres: <code>{contactEmail}</code>.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  5. Pamięć lokalna (localStorage) i Pliki Cookies
                </h4>
                <p>
                  1. <strong>Tymczasowy draft formularza:</strong> Używamy pamięci lokalnej Twojej
                  przeglądarki (klucz <code>vroom_scout_draft</code>), abyś nie stracił wpisanych danych,
                  jeśli przypadkowo odświeżysz stronę lub przełączysz aplikację, by zrobić zdjęcia
                  telefonem. Dane te są kasowane po wysłaniu formularza.
                </p>
                <p>
                  2. <strong>Pliki analityczne i reklamowe:</strong> Za Twoją zgodą możemy wykorzystywać
                  tagi analityczne (Meta Pixel, Google Ads) do mierzenia konwersji kampanii promujących
                  serwis.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zgodność z RODO i ochrona prywatności</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Rozumiem, wróć do formularza
          </button>
        </div>
      </div>
    </div>
  );
};
