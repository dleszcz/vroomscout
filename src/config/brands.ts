import { BrandConfig, BrandKey } from '@/types/scout';

export const BRANDS: Record<BrandKey, BrandConfig> = {
  autozglowy: {
    id: 'autozglowy',
    domainName: 'AutoZglowy.pl',
    tagline: 'Miej sprzedaż auta z głowy jeszcze dzisiaj',
    badge: 'Święty spokój • Płatność od ręki przy odbiorze',
    heroTitle: 'Miej sprzedaż auta z głowy',
    heroHighlight: 'jeszcze dzisiaj.',
    heroSubtitle:
      'Bez mycia, bez marudnych oglądaczy z miernikami lakieru i bez płacenia za drogie ogłoszenia. Wypełnij prosty formularz online i odbierz propozycję odkupu od sprawdzonego partnera.',
    primaryColorHex: '#f59e0b', // amber-500 (#fdac04 from logo)
    primaryBgClass: 'bg-amber-400',
    primaryHoverClass: 'hover:bg-amber-500',
    primaryTextClass: 'text-amber-500',
    primaryBorderClass: 'border-amber-400',
    primaryRingClass: 'focus:ring-amber-400',
    primaryBtnTextClass: 'text-slate-950 font-black',
    lightBgClass: 'bg-amber-50/80',
    accentBadgeClass: 'bg-amber-100/90 text-amber-950 border-amber-300/80',
    trustPoints: [
      {
        title: 'Bierzemy auto w stanie, w jakim stoi',
        description: 'Nie musisz myć, odkurzać ani naprawiać zawieszenia czy silnika przed sprzedażą.',
        icon: 'Sparkles',
      },
      {
        title: 'Odkupujemy też auta z usterkami i bez opłat',
        description: 'Świeci się kontrolka, stuka dwumasa lub kończy się OC/przegląd? Żaden problem.',
        icon: 'Wrench',
      },
      {
        title: 'Pełne bezpieczeństwo prawne',
        description: 'Legalna umowa kupna-sprzedaży i przejęcie odpowiedzialności z tytułu rękojmi.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Wypłata gotówki lub szybki przelew',
        description: 'Płatność otrzymujesz bezpośrednio przy podpisaniu umowy i przekazaniu auta.',
        icon: 'Banknote',
      },
    ],
    benefits: [
      {
        title: 'Zero marudzenia o rysy',
        description: 'Nasi partnerzy mają własne warsztaty i nie szukają wad na siłę.',
        icon: 'PhoneOff',
      },
      {
        title: 'Własna autolaweta partnera',
        description: 'Jeśli auto nie odpala lub nie ma OC – odbiór pod Twoim domem bez dopłat.',
        icon: 'Truck',
      },
      {
        title: 'Sprawny kontakt z wyceną',
        description: 'Po weryfikacji zgłoszenia partner kontaktuje się z konkretną propozycją widełek cenowych.',
        icon: 'Clock',
      },
    ],
    comparisonTitle: 'Dlaczego warto wybrać AutoZglowy.pl zamiast portali ogłoszeniowych?',
    comparisonSubtitle: 'Zobacz ile nerwów, czasu i pieniędzy oszczędzasz, rezygnując z samodzielnej sprzedaży na OLX czy Otomoto.',
    testimonials: [], // Celowo puste pod Dyrektywę Omnibus (brak wymyślonych opinii)
    faqList: [
      {
        question: 'Czy wycena w serwisie do czegoś mnie zobowiązuje?',
        answer:
          'Absolutnie nie! Wypełnienie formularza jest w 100% bezpłatne i niezobowiązujące. Po otrzymaniu propozycji cenowej to Ty decydujesz, czy chcesz sfinalizować transakcję.',
      },
      {
        question: 'Czy muszę przygotować samochód (umyć, odkurzyć, usunąć usterki)?',
        answer:
          'Nie! Nasi partnerzy prowadzą własne serwisy i warsztaty. Odkupują samochody dokładnie w takim stanie, w jakim obecnie stoją.',
      },
      {
        question: 'Co w przypadku, gdy auto nie ma ważnego badania technicznego lub OC?',
        answer:
          'Również możesz je zgłosić. Partnerzy dysponują autolawetami i mogą odebrać pojazd bezpośrednio z Twojego podjazdu lub parkingu.',
      },
      {
        question: 'Jak wygląda płatność i formalności?',
        answer:
          'Transakcja zawierana jest na podstawie standardowej umowy kupna-sprzedaży. Płatność otrzymujesz natychmiast przy odbiorze auta – w gotówce do ręki lub szybkim przelewem ekspresowym.',
      },
      {
        question: 'Dlaczego wycena odkupu od ręki różni się od cen na portalach ogłoszeniowych?',
        answer:
          'Cena na portalach ogłoszeniowych to tzw. cena detaliczna – życzeniowa kwota, przy której samodzielna sprzedaż trwa średnio 3–8 tygodni. Wiąże się z opłatami za pakiety ogłoszeń (80–250 zł), myciem, naprawami, dziesiątkami telefonów od marudnych oglądaczy i rocznym ryzykiem rękojmi za wady ukryte. Wycena odkupu dla handlu zawodowego to 100% pewna gotówka wypłacana od ręki w 24h – bez wkładu własnego, bez mycia i ze zdjęciem z Ciebie wszelkiej odpowiedzialności prawnej.',
      },
      {
        question: 'Czy sprzedaż do skupu mi się opłaca, skoro teoretycznie mógłbym wystawić auto drożej?',
        answer:
          'Dla większości kierowców – zdecydowanie tak. Samodzielna sprzedaż na portalach generuje ukryte koszty: kolejne opłaty za przedłużanie ogłoszeń, spadek wartości auta z każdym miesiącem stania, opłacanie ubezpieczenia OC oraz czas stracony na bezowocne jazdy próbne. W skupie otrzymujesz gotówkę natychmiast i zamykasz temat tego samego dnia.',
      },
    ],
  },

  zdajauto: {
    id: 'zdajauto',
    domainName: 'ZdajAuto.pl',
    tagline: 'Sprawny i bezpieczny odkup pojazdów dostawczych, flotowych i osobowych',
    badge: 'Bezpieczna procedura odkupu • FV 23% lub Umowa',
    heroTitle: 'Zdaj samochód u sprawdzonego partnera',
    heroHighlight: 'i odbierz środki od ręki.',
    heroSubtitle:
      'Przejrzysta, bezstresowa procedura wyceny i odkupu dla firm oraz osób prywatnych. Dopasujemy Twoje auto do zweryfikowanego partnera handlowego – bez opłat i bez zbędnych formalności.',
    primaryColorHex: '#7c3aed', // purple-600 / violet
    primaryBgClass: 'bg-purple-600',
    primaryHoverClass: 'hover:bg-purple-700',
    primaryTextClass: 'text-purple-600',
    primaryBorderClass: 'border-purple-600',
    primaryRingClass: 'focus:ring-purple-500',
    primaryBtnTextClass: 'text-white font-extrabold',
    lightBgClass: 'bg-purple-50',
    accentBadgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    trustPoints: [
      {
        title: 'Auta dostawcze, busy i floty firmowe',
        description: 'Dostawczaki do 3.5t, brygadówki, plandeki, auta poleasingowe oraz osobowe.',
        icon: 'Truck',
      },
      {
        title: 'Pełna faktura VAT 23% lub umowa kupna',
        description: 'Czyste rozliczenie księgowe dla firm jednoosobowych, spółek i osób prywatnych.',
        icon: 'FileText',
      },
      {
        title: 'Przelew ekspresowy lub gotówka',
        description: 'Środki przekazywane natychmiast przy podpisaniu dokumentów odbioru pojazdu.',
        icon: 'Zap',
      },
      {
        title: 'Zweryfikowani partnerzy handlowi',
        description: 'Współpracujemy wyłącznie z legalnie zarejestrowanymi, wypłacalnymi podmiotami.',
        icon: 'CheckCircle2',
      },
    ],
    benefits: [
      {
        title: 'Brak zamrażania kapitału firmy',
        description: 'Nie czekaj tygodniami na kupca z ogłoszeń – uwolnij środki firmowe od ręki.',
        icon: 'TrendingUp',
      },
      {
        title: 'Komplet dokumentów zbycia',
        description: 'Otrzymujesz dokumentację niezbędną do natychmiastowego zgłoszenia w urzędzie i ubezpieczalni.',
        icon: 'Shield',
      },
      {
        title: 'Pomoc przy autach w leasingu',
        description: 'Partnerzy pomagają w procedurze wcześniejszego wykupu lub rozliczenia pojazdu.',
        icon: 'Building2',
      },
    ],
    comparisonTitle: 'Dlaczego firmy i kierowcy wybierają ZdajAuto.pl?',
    comparisonSubtitle: 'Zoptymalizuj czas i finanse – porównaj bezpośredni odkup z tradycyjną sprzedażą.',
    testimonials: [], // Celowo puste pod Dyrektywę Omnibus
    faqList: [
      {
        question: 'Czy skupujecie pojazdy na fakturę VAT 23%?',
        answer:
          'Tak, partnerzy to zarejestrowani przedsiębiorcy. Rozliczamy transakcje zarówno na podstawie faktur VAT 23%, faktur VAT-marża, jak i umów kupna-sprzedaży dla osób fizycznych.',
      },
      {
        question: 'Jakie kategorie aut dostawczych obsługujecie?',
        answer:
          'Odkupujemy busy do 3.5t DMC: furgony (blaszaki), brygadówki, plandeki z windą, chłodnie, skrzyniowe oraz vany osobowe (np. Vivaro, Transporter, Transit, Master, Sprinter, Ducato).',
      },
      {
        question: 'Co z pojazdami obciążonymi leasingiem lub kredytem?',
        answer:
          'Partnerzy posiadają procedury rozliczenia pojazdów z bankami i leasingami, pomagając w procedurze wykupu.',
      },
      {
        question: 'Kiedy środki pojawią się na koncie firmy?',
        answer:
          'Przelew ekspresowy lub gotówka realizowane są bezpośrednio w momencie podpisania dokumentów zdania pojazdu.',
      },
      {
        question: 'Dlaczego kwota odkupu firmowego różni się od cen z ogłoszeń?',
        answer:
          'Ceny z ogłoszeń (detaliczne) wiążą się ze średnio kilkutygodniowym czasem oczekiwania na kupca i zamrożeniem kapitału. Odkup do handlu zawodowego pozwala uwolnić gotówkę natychmiast w 24 godziny, z pełnym rozliczeniem na FV 23% i bez konieczności angażowania pracowników w sprzedaż.',
      },
    ],
  },
};

export function resolveBrandFromLocation(
  hostname?: string,
  searchBrand?: string | null
): BrandConfig {
  if (searchBrand && searchBrand in BRANDS) {
    return BRANDS[searchBrand as BrandKey];
  }

  if (hostname) {
    const lower = hostname.toLowerCase();
    if (lower.includes('zdajauto')) {
      return BRANDS.zdajauto;
    }
    if (lower.includes('autozglowy')) {
      return BRANDS.autozglowy;
    }
  }

  const defaultEnv = process.env.NEXT_PUBLIC_DEFAULT_BRAND;
  if (defaultEnv && defaultEnv in BRANDS) {
    return BRANDS[defaultEnv as BrandKey];
  }

  return BRANDS.autozglowy;
}

export async function resolveServerBrand(
  searchBrand?: string | null
): Promise<BrandConfig> {
  if (searchBrand && searchBrand in BRANDS) {
    return BRANDS[searchBrand as BrandKey];
  }

  try {
    const { headers } = await import('next/headers');
    const headersList = await headers();
    const host = headersList.get('host') || headersList.get('x-forwarded-host') || '';
    const lower = host.toLowerCase();
    if (lower.includes('zdajauto')) {
      return BRANDS.zdajauto;
    }
    if (lower.includes('autozglowy')) {
      return BRANDS.autozglowy;
    }
  } catch {
    // Fallback if headers() cannot be called
  }

  const defaultEnv = process.env.NEXT_PUBLIC_DEFAULT_BRAND;
  if (defaultEnv && defaultEnv in BRANDS) {
    return BRANDS[defaultEnv as BrandKey];
  }

  return BRANDS.autozglowy;
}

