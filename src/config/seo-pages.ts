export interface LocalSeoPageConfig {
  slug: string;
  type: 'city' | 'category';
  cityName?: string;
  voivodeship?: string;
  metaTitle: {
    autozglowy: string;
    zdajauto: string;
  };
  metaDescription: {
    autozglowy: string;
    zdajauto: string;
  };
  h1: {
    autozglowy: string;
    zdajauto: string;
  };
  heroSubtitle: string;
  geo?: {
    lat: number;
    lng: number;
  };
  districts?: string[];
  accessRoutes?: string[];
  localLogistics: {
    arrivalEstimate: string;
    hubDescription: string;
  };
  officeDeptInfo?: {
    officeName: string;
    address: string;
    openingHours: string;
    onlineTip: string;
  };
  localContext: {
    title: string;
    paragraphs: string[];
  };
  localFaq: Array<{
    question: string;
    answer: string;
  }>;
  defaultWizardCity?: string;
  defaultWizardCondition?: 'bardzo_dobry' | 'drobne_poprawki' | 'wymaga_naprawy' | 'niesprawny';
  defaultWizardCategory?: 'osobowe' | 'bus';
}

export const SEO_PAGES: Record<string, LocalSeoPageConfig> = {
  // ========================================================
  // 1. WARSZAWA (MAZOWIECKIE)
  // ========================================================
  'skup-aut-warszawa': {
    slug: 'skup-aut-warszawa',
    type: 'city',
    cityName: 'Warszawa',
    voivodeship: 'Mazowieckie',
    metaTitle: {
      autozglowy: 'Skup Aut Warszawa za Gotówkę w 24h – Bezpłatny Odbiór Lawetą | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Warszawa od Ręki – Gotówka lub Przelew w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Błyskawiczny skup aut w Warszawie i okolicach. Dojazd autolawetą do każdej dzielnicy (Mokotów, Wola, Ursynów, Białołęka). Gotówka do ręki, umowa w 15 min.',
      zdajauto: 'Profesjonalny skup aut Warszawa i aglomeracja mazowiecka. Osobowe, flotowe i dostawcze do 3.5t. Bezpłatna wycena online w 60 sekund!',
    },
    h1: {
      autozglowy: 'Skup Aut Warszawa – gotówka od ręki i bezpłatny odbiór w 24h',
      zdajauto: 'Skup Samochodów Warszawa – szybka sprzedaż bez marudzenia i prowizji',
    },
    heroSubtitle:
      'Działamy na terenie całej Warszawy oraz w miejscowościach ościennych. Mobilny kupiec z gotówką dociera pod Twój dom lub parking w 1–3 godziny.',
    geo: { lat: 52.2297, lng: 21.0122 },
    districts: [
      'Mokotów',
      'Praga-Południe',
      'Ursynów',
      'Wola',
      'Bielany',
      'Targówek',
      'Bemowo',
      'Śródmieście',
      'Białołęka',
      'Ochota',
      'Wawer',
      'Ursus',
      'Żoliborz',
      'Włochy',
      'Rembertów',
      'Wesoła',
      'Piaseczno',
      'Pruszków',
      'Legionowo',
      'Wołomin',
    ],
    accessRoutes: ['Trasa S8', 'Południowa Obwodnica Warszawy (S2)', 'Autostrada A2', 'Wisłostrada', 'Trasa Siekierkowska'],
    localLogistics: {
      arrivalEstimate: '1 – 3 godziny od akceptacji wyceny',
      hubDescription: 'Mobilne zespoły stacjonujące w pasie aglomeracji warszawskiej z własnymi autolawetami.',
    },
    officeDeptInfo: {
      officeName: 'Wydział Komunikacji m.st. Warszawy (Biuro Administracji i Spraw Obywatelskich)',
      address: 'Delegatury w Urzędach Dzielnic (np. Mokotów: ul. Rakowiecka 25/27, Wola: al. Solidarności 90, Ursynów: al. KEN 61)',
      openingHours: 'Poniedziałek – Piątek: 8:00 – 16:00',
      onlineTip: 'Zgłoszenie zbycia pojazdu zarejestrowanego w Warszawie złożysz bezpłatnie i bez kolejki online przez profil zaufany na platformie gov.pl / mObywatel w 3 minuty.',
    },
    localContext: {
      title: 'Specyfika sprzedaży samochodu w Warszawie i aglomeracji',
      paragraphs: [
        'Rynek motoryzacyjny w Warszawie charakteryzuje się ogromnym tempem życia i dużą konkurencją na portalach ogłoszeniowych. Samodzielna sprzedaż auta w stolicy wiąże się często z dziesiątkami telefonów od niepoważnych oglądających, kłopotliwymi jazdami próbnymi w warszawskich korkach oraz koniecznością parkowania auta w strefach płatnych (SPPN).',
        'Wprowadzenie Strefy Czystego Transportu (SCT) w Warszawie nakłada restrykcyjne normy emisyjne na starsze pojazdy benzynowe i diesle. Wiele osób decyduje się na natychmiastową sprzedaż starszego samochodu, zanim jego wartość rynkowa drastycznie spadnie. Nasi partnerzy skupują również auta niespełniające norm SCT, z przeznaczeniem na rynki poza Warszawą.',
        'W przypadku aut uszkodzonych po kolizjach na obwodnicy S8 lub trasie S2, dysponujemy autolawetami wyposażonymi w wyciągarki linowe. Jesteśmy w stanie bezpiecznie podjąć niesprawny pojazd z parkingów podziemnych w nowoczesnym budownictwie wielorodzinnym.',
      ],
    },
    localFaq: [
      {
        question: 'W jakich dzielnicach Warszawy realizujecie darmowy odbiór auta?',
        answer:
          'Obsługujemy absolutnie wszystkie 18 dzielnic Warszawy (od Mokotowa i Śródmieścia po Białołękę i Wawer) oraz cały tzw. wianuszek podwarszawski: Piaseczno, Pruszków, Ożarów Mazowiecki, Legionowo, Marki, Ząbki, Wołomin czy Otwock.',
      },
      {
        question: 'Czy odbierzecie niesprawne auto z warszawskiego garażu podziemnego?',
        answer:
          'Tak. Posiadamy sprzęt umożliwiający bezpieczne wytoczenie i podjęcie pojazdu z podziemnych hal garażowych o ograniczonej wysokości wjazdu.',
      },
      {
        question: 'Jak wygląda zgłoszenie sprzedaży auta w urzędzie dzielnicy w Warszawie?',
        answer:
          'Po podpisaniu umowy kupna-sprzedaży i wypłacie gotówki otrzymujesz komplet dokumentów. Zgłoszenie zbycia w warszawskim urzędzie możesz złożyć w 100% online przez portal gov.pl (mObywatel) – nie musisz stać w kolejkach w delegaturze urzędu dzielnicy.',
      },
    ],
    defaultWizardCity: 'Warszawa',
  },

  // ========================================================
  // 2. KRAKÓW (MAŁOPOLSKIE)
  // ========================================================
  'skup-aut-krakow': {
    slug: 'skup-aut-krakow',
    type: 'city',
    cityName: 'Kraków',
    voivodeship: 'Małopolskie',
    metaTitle: {
      autozglowy: 'Skup Aut Kraków za Gotówkę w 24h – Bezpłatny Dojazd | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Kraków – Odkup od Ręki w Małopolsce | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Ekspresowy skup aut w Krakowie. Odkupujemy auta sprawne, powypadkowe i po awarii. Dojazd autolawetą: Krowodrza, Nowa Huta, Podgórze, Ruczaj. Gotówka od ręki!',
      zdajauto: 'Pewny skup aut Kraków i Wieliczka. Błyskawiczna wycena w 60 sekund, darmowa autolaweta, przejście odpowiedzialności z tytułu rękojmi.',
    },
    h1: {
      autozglowy: 'Skup Aut Kraków – błyskawiczny odkup i gotówka do ręki',
      zdajauto: 'Skup Samochodów Kraków – uczciwa wycena bez straty czasu',
    },
    heroSubtitle:
      'Darmowy dojazd kupca w Krakowie i całym powiecie krakowskim. Płacimy gotówką lub natychmiastowym przelewem bankowym wprost przy aucie.',
    geo: { lat: 50.0647, lng: 19.945 },
    districts: [
      'Nowa Huta',
      'Krowodrza',
      'Podgórze',
      'Stare Miasto',
      'Prądnik Czerwony',
      'Prądnik Biały',
      'Dębniki',
      'Ruczaj',
      'Bieżanów-Prokocim',
      'Czyżyny',
      'Wieliczka',
      'Skawina',
      'Niepołomice',
    ],
    accessRoutes: ['Autostrada A4', 'Droga ekspresowa S7', 'Droga krajowa DK79', 'Droga krajowa DK94'],
    localLogistics: {
      arrivalEstimate: '2 – 4 godziny na terenie Krakowa',
      hubDescription: 'Partnerzy z bazą transportową przy węzłach autostrady A4 w okolicach Krakowa.',
    },
    officeDeptInfo: {
      officeName: 'Wydział Ewidencji Pojazdów i Kierowców Urzędu Miasta Krakowa',
      address: 'al. Powstania Warszawskiego 10, os. Zgody 2 lub ul. Wielicka 28a',
      openingHours: 'Poniedziałek – Piątek: 7:40 – 15:30',
      onlineTip: 'Krakowski urząd umożliwia błyskawiczne zgłoszenie zbycia przez ePUAP/Gov.pl bez konieczności wizyty w Punkcie Obsługi Mieszkańców.',
    },
    localContext: {
      title: 'Sprzedaż samochodu w Krakowie a Strefa Czystego Transportu',
      paragraphs: [
        'Kraków jako jedno z pierwszych miast w Polsce kładzie ogromny nacisk na ograniczenie emisji spalin. Właściciele starszych pojazdów benzynowych i diesli borykają się ze spadkiem popytu na lokalnym rynku wtórnym, gdzie kupujący z obawy przed restrykcjami omijają auta sprzed kilkunastu lat.',
        'Nasz serwis umożliwia sprzedaż każdego pojazdu – niezależnie od roku produkcji, klasy emisji Euro czy stanu technicznego. Partnerska sieć skupu dystrybuuje odkupione auta na rynki w całym kraju, co pozwala zaproponować uczciwą stawkę za samochody, które w samym Krakowie trudno sprzedać osobie prywatnej.',
        'Zapewniamy bezpłatny odbiór aut powypadkowych i uszkodzonych z krakowskich osiedli, parkingów miejskich oraz warsztatów mechanicznych w Skawinie, Wieliczce czy Niepołomicach.',
      ],
    },
    localFaq: [
      {
        question: 'Czy skupujecie starsze diesle zagrożone wykluczeniem w Krakowie?',
        answer:
          'Tak! Odkupujemy starsze auta z silnikami diesla i benzynowymi z roczników 2000–2015 bez względu na normę emisji spalin.',
      },
      {
        question: 'Gdzie w Krakowie przyjeżdża kupiec?',
        answer:
          'Kupiec przyjeżdża pod wskazany przez Ciebie adres – pod dom, blok, firmę lub warsztat samochodowy, w którym stoi auto.',
      },
    ],
    defaultWizardCity: 'Kraków',
  },

  // ========================================================
  // 3. ŁÓDŹ (ŁÓDZKIE)
  // ========================================================
  'skup-aut-lodz': {
    slug: 'skup-aut-lodz',
    type: 'city',
    cityName: 'Łódź',
    voivodeship: 'Łódzkie',
    metaTitle: {
      autozglowy: 'Skup Aut Łódź za Gotówkę w 24h – Bezpłatna Wycena Online | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Łódź od Ręki – Gotówka i Odbiór w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Łódź i całe woj. łódzkie. Błyskawiczny dojazd: Bałuty, Widzew, Górna, Polesie, Zgierz, Pabianice. Płacimy gotówką do ręki przy podpisaniu umowy.',
      zdajauto: 'Sprzedaj auto w Łodzi bez pośredników. Samochody całe, uszkodzone, flotowe i bez opłat OC. Sprawdź bezpłatną wycenę w minutę!',
    },
    h1: {
      autozglowy: 'Skup Aut Łódź – natychmiastowa gotówka i darmowa autolaweta',
      zdajauto: 'Skup Samochodów Łódź – prosta sprzedaż bez marudzenia i napraw',
    },
    heroSubtitle:
      'Lokalni partnerzy ze sprzętem i gotówką docierają do każdej dzielnicy Łodzi oraz Pabianic, Zgierza i Aleksandrowa w 1–3 godziny.',
    geo: { lat: 51.7592, lng: 19.456 },
    districts: ['Bałuty', 'Widzew', 'Górna', 'Polesie', 'Śródmieście', 'Teofilów', 'Radogoszcz', 'Zgierz', 'Pabianice', 'Aleksandrów Łódzki'],
    accessRoutes: ['Autostrada A1', 'Autostrada A2', 'Droga ekspresowa S14', 'Droga ekspresowa S8'],
    localLogistics: {
      arrivalEstimate: '1 – 3 godziny w obrębie aglomeracji łódzkiej',
      hubDescription: 'Centrum logistyczne w węźle autostrad A1/A2 gwarantuje najszybszy dojazd w Polsce.',
    },
    officeDeptInfo: {
      officeName: 'Wydział Spraw Obywatelskich i Uprawnień Komunikacyjnych UM Łodzi',
      address: 'ul. Smugowa 26a oraz delegatury dzielnicowe (al. Piłsudskiego 100, ul. Krzemieniecka 2b)',
      openingHours: 'Poniedziałek, Środa, Czwartek, Piątek: 8:00 – 16:00, Wtorek: 9:00 – 17:00',
      onlineTip: 'Zbycie pojazdu zgłasza się wygodnie przez Internet bez konieczności rezerwacji wizyty w łódzkim magistracie.',
    },
    localContext: {
      title: 'Dlaczego skup aut w Łodzi to najwygodniejsza opcja?',
      paragraphs: [
        'Centralne położenie Łodzi przy skrzyżowaniu autostrad A1 i A2 sprawia, że rynek motoryzacyjny w regionie jest niezwykle dynamiczny. Nasi partnerzy operują flotą mobilnych lawet i są w stanie pojawić się pod wskazanym adresem niemal natychmiast po zaakceptowaniu wstępnej wyceny.',
        'W Łodzi skupujemy zarówno zadbane samochody miejskie i rodzinne, jak i pojazdy mocno wyeksploatowane, powypadkowe, bez ważnego badania technicznego czy z brakami w ubezpieczeniu OC.',
        'Kupujący zdejmuje z Ciebie formalną odpowiedzialność z tytułu rękojmi za wady ukryte pojazdu – sprzedajesz auto podmiotowi profesjonalnemu, co gwarantuje pełen spokój po transakcji.',
      ],
    },
    localFaq: [
      {
        question: 'Czy kupicie w Łodzi auto bez ważnego przeglądu technicznego?',
        answer:
          'Tak! Auto odbieramy własną autolawetą, więc brak badań technicznych lub brak OC nie stanowi żadnej przeszkody.',
      },
      {
        question: 'Jak szybko otrzymam pieniądze za samochód?',
        answer:
          'Gotówka jest wypłacana do ręki w momencie podpisania umowy kupna-sprzedaży pod Twoim domem. Na życzenie realizujemy natychmiastowy przelew ekspresowy.',
      },
    ],
    defaultWizardCity: 'Łódź',
  },

  // ========================================================
  // 4. WROCŁAW (DOLNOŚLĄSKIE)
  // ========================================================
  'skup-aut-wroclaw': {
    slug: 'skup-aut-wroclaw',
    type: 'city',
    cityName: 'Wrocław',
    voivodeship: 'Dolnośląskie',
    metaTitle: {
      autozglowy: 'Skup Aut Wrocław za Gotówkę w 24h – Bezpłatny Odbiór | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Wrocław – Gotówka od Ręki na Dolnym Śląsku | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Szybki skup aut we Wrocławiu. Odkupujemy auta na Krzykach, Fabrycznej, Psim Polu i w Bielanach Wrocławskich. Bezpłatna wycena online i dojazd w 24h.',
      zdajauto: 'Skup samochodów osobowych i dostawczych Wrocław. Zadzwoń lub wypełnij formularz. Płatność gotówką, zero ukrytych kosztów za transport.',
    },
    h1: {
      autozglowy: 'Skup Aut Wrocław – pewna wycena odkupu i gotówka od ręki',
      zdajauto: 'Skup Samochodów Wrocław – sprzedaż w 24h bez wychodzenia z domu',
    },
    heroSubtitle:
      'Obsługujemy cały Wrocław i ościenne powiaty. Bezpłatny dojazd autolawetą i gotówka wypłacana od ręki.',
    geo: { lat: 51.1079, lng: 17.0385 },
    districts: ['Krzyki', 'Fabryczna', 'Psie Pole', 'Stare Miasto', 'Śródmieście', 'Jagodno', 'Ołtaszyn', 'Bielany Wrocławskie', 'Długołęka', 'Kąty Wrocławskie'],
    accessRoutes: ['Autostrada A4', 'Autostradowa Obwodnica Wrocławia (A8)', 'Droga ekspresowa S8', 'Droga ekspresowa S5'],
    localLogistics: {
      arrivalEstimate: '2 – 4 godziny na Dolnym Śląsku',
      hubDescription: 'Partnerzy rozlokowani wokół obwodnicy A8 z szybkim dojazdem do każdej części miasta.',
    },
    officeDeptInfo: {
      officeName: 'Wydział Spraw Obywatelskich – Dział Rejestracji Pojazdów UM Wrocławia',
      address: 'ul. Gabrieli Zapolskiej 4 lub al. Marcina Kromera 44',
      openingHours: 'Poniedziałek – Piątek: 8:00 – 15:15',
      onlineTip: 'Wyrejestrowanie lub zgłoszenie sprzedaży auta we Wrocławiu wykonasz bez stania w kolejce przez ePUAP.',
    },
    localContext: {
      title: 'Skup samochodów we Wrocławiu – bezpiecznie i bez stresu',
      paragraphs: [
        'Wrocławski rynek wtórny jest nasycony samochodami sprowadzanymi zza zachodniej granicy, przez co sprzedaż starszego auta z polskiego salonu lub auta wymagającego napraw blacharsko-lakierniczych bywa czasochłonna.',
        'W AutoZglowy / ZdajAuto eliminujemy konieczność wystawiania ogłoszeń i negocjacji z marudnymi kupcami. Otrzymujesz jedną, konkretną ofertę odkupu od zweryfikowanego partnera, który przyjeżdża z gotówką i legalną umową.',
      ],
    },
    localFaq: [
      {
        question: 'Czy pobieracie opłatę za przyjazd i wycenę we Wrocławiu?',
        answer: 'Nie. Dojazd partnera, oględziny oraz transport autolawetą przy sprzedaży wynoszą równe 0 zł.',
      },
    ],
    defaultWizardCity: 'Wrocław',
  },

  // ========================================================
  // 5. POZNAŃ (WIELKOPOLSKIE)
  // ========================================================
  'skup-aut-poznan': {
    slug: 'skup-aut-poznan',
    type: 'city',
    cityName: 'Poznań',
    voivodeship: 'Wielkopolskie',
    metaTitle: {
      autozglowy: 'Skup Aut Poznań za Gotówkę w 24h – Bezpłatna Wycena | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Poznań – Błyskawiczny Odkup w Wielkopolsce | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Poznań i okolice (Swarzędz, Luboń, Tarnowo Podgórne). Gotówka od ręki, odbiór autolawetą gratis. Wycena online w 60 sekund!',
      zdajauto: 'Odkup aut od ręki w Poznaniu. Samochody całe, po kolizji, uszkodzone. Wypłata natychmiastowa.',
    },
    h1: {
      autozglowy: 'Skup Aut Poznań – gotówka od ręki i bezpieczna transakcja',
      zdajauto: 'Skup Samochodów Poznań – odkupimy Twoje auto w 24 godziny',
    },
    heroSubtitle:
      'Działamy na terenie całego Poznania i powiatu poznańskiego. Szybka wycena, darmowa autolaweta i brak rękojmi.',
    geo: { lat: 52.4064, lng: 16.9252 },
    districts: ['Grunwald', 'Rataje', 'Stare Miasto', 'Nowe Miasto', 'Jeżyce', 'Piątkowo', 'Winogrady', 'Swarzędz', 'Luboń', 'Komorniki', 'Tarnowo Podgórne'],
    accessRoutes: ['Autostrada A2', 'Droga ekspresowa S11', 'Droga ekspresowa S5', 'Droga krajowa DK92'],
    localLogistics: {
      arrivalEstimate: '2 – 3 godziny w Poznaniu i okolicach',
      hubDescription: 'Partnerzy zlokalizowani przy węzłach autostrady A2 (Komorniki, Krzesiny).',
    },
    officeDeptInfo: {
      officeName: 'Wydział Spraw Obywatelskich i Uprawnień Komunikacyjnych UM Poznania',
      address: 'ul. Gronowa 22a lub ul. 28 Czerwca 1956 r. nr 404',
      openingHours: 'Poniedziałek: 7:30 – 17:00, Wtorek – Piątek: 7:30 – 15:30',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Poznaniu zrealizujesz drogą elektroniczną bez wychodzenia z domu.',
    },
    localContext: {
      title: 'Praktyczne aspekty sprzedaży auta w Poznaniu',
      paragraphs: [
        'Wielkopolska słynie z gospodarności i wysokich wymagań technicznych wobec pojazdów. Sprzedaż auta z drobnymi mankamentami wizualnymi czy mechanicznymi na lokalnych portalach bywa frustrująca.',
        'W naszym serwisie skupujemy pojazdy bez zbędnego wybrzydzania. Partnerzy posiadają zaplecze warsztatowe, co pozwala zaoferować atrakcyjne stawki również za auta z niesprawnym silnikiem, skrzynią biegów czy po kolizji.',
      ],
    },
    localFaq: [
      {
        question: 'Czy skupujecie auta dostawcze w okolicach Poznania?',
        answer: 'Tak, odkupujemy busy i furgony do 3.5t od firm i osób prywatnych, rozliczając się fakturą VAT 23% lub umową.',
      },
    ],
    defaultWizardCity: 'Poznań',
  },

  // ========================================================
  // 6. GDAŃSK (POMORSKIE / TRÓJMIASTO)
  // ========================================================
  'skup-aut-gdansk': {
    slug: 'skup-aut-gdansk',
    type: 'city',
    cityName: 'Gdańsk',
    voivodeship: 'Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Gdańsk za Gotówkę w 24h – Trójmiasto i Okolice | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Gdańsk – Błyskawiczny Odkup od Ręki | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Gdańsk, Gdynia, Sopot i całe Pomorze. Odbiór autolawetą gratis, natychmiastowa gotówka i legalna umowa. Wycena w minutę!',
      zdajauto: 'Sprzedaj auto w Gdańsku bez marudzenia. Skupujemy auta w każdym stanie technicznym i prawnym w 24h.',
    },
    h1: {
      autozglowy: 'Skup Aut Gdańsk i Trójmiasto – darmowy dojazd i gotówka w 24h',
      zdajauto: 'Skup Samochodów Gdańsk – profesjonalny odkup bez pośredników',
    },
    heroSubtitle:
      'Obsługujemy Gdańsk, Sopot, Gdynię oraz Tczew, Pruszcz Gdański i Wejherowo. Bezpłatny transport i wypłata gotówki od ręki.',
    geo: { lat: 54.352, lng: 18.6466 },
    districts: ['Wrzeszcz', 'Oliwa', 'Śródmieście', 'Chełm', 'Morena', 'Przymorze', 'Zaspa', 'Osowa', 'Pruszcz Gdański', 'Sopot', 'Gdynia', 'Tczew'],
    accessRoutes: ['Obwodnica Trójmiasta (S6)', 'Trasa Sucharskiego', 'Trasa S7 (wylot na Warszawę)', 'Autostrada A1 (węzeł Rusocin)'],
    localLogistics: {
      arrivalEstimate: '2 – 4 godziny w Trójmieście',
      hubDescription: 'Baza mobilna zlokalizowana w pobliżu Obwodnicy Trójmiasta S6.',
    },
    officeDeptInfo: {
      officeName: 'Wydział Komunikacji Urzędu Miejskiego w Gdańsku',
      address: 'ul. Nowe Ogrody 8/12 oraz Zespół Obsługi Mieszkańców przy ul. Partyzantów 74',
      openingHours: 'Poniedziałek, Wtorek, Czwartek: 8:00 – 16:00, Środa: 8:00 – 17:00, Piątek: 8:00 – 15:00',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Gdańsku można złożyć elektronicznie przez profil zaufany na platformie ePUAP.',
    },
    localContext: {
      title: 'Skup aut w warunkach nadmorskich – korozja i sól drogowa',
      paragraphs: [
        'Klimat nadmorski sprzyja szybszemu powstawaniu korozji na elementach podwozia, progach i nadkolach. Wielu właścicieli aut w Gdańsku i Trójmieście ma problem ze sprzedażą samochodu, na którym pojawiają się ogniska rdzy.',
        'W naszym skupie bierzemy pojazdy z korozją, niesprawne mechanicznie oraz po stłuczkach parkingowych. Oferujemy rzetelną kalkulację bez zaniżania ceny na miejscu.',
      ],
    },
    localFaq: [
      {
        question: 'Czy dojedziecie do Gdyni lub Sopotu bez dodatkowych opłat?',
        answer: 'Tak! Całe Trójmiasto (Gdańsk, Sopot, Gdynia) oraz okolice obsługujemy z bezpłatnym dojazdem autolawetą.',
      },
    ],
    defaultWizardCity: 'Gdańsk',
  },

  // ========================================================
  // 7. BYDGOSZCZ (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-bydgoszcz': {
    slug: 'skup-aut-bydgoszcz',
    type: 'city',
    cityName: 'Bydgoszcz',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Bydgoszcz za Gotówkę w 24h – Bezpłatny Odbiór | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Bydgoszcz – Odkup Aut od Ręki w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Lokalny skup aut Bydgoszcz. Fordon, Bartodzieje, Wyżyny, Osowa Góra, Solec Kujawski. Gotówka od ręki, laweta gratis, bezpieczna umowa.',
      zdajauto: 'Szybki skup samochodów w Bydgoszczy. Samochody całe, uszkodzone, bez przeglądu i OC. Bezpłatna wycena w 60 sekund!',
    },
    h1: {
      autozglowy: 'Skup Aut Bydgoszcz – ekspresowa gotówka i darmowa autolaweta',
      zdajauto: 'Skup Samochodów Bydgoszcz – lokalny, pewny odkup w 24 godziny',
    },
    heroSubtitle:
      'Nasz rodzimy region kujawsko-pomorski. Mobilny kupiec dociera pod Twój adres w Bydgoszczy i powiecie w 1–2 godziny.',
    geo: { lat: 53.1235, lng: 18.0084 },
    districts: ['Fordon', 'Bartodzieje', 'Wyżyny', 'Błonie', 'Szwederowo', 'Osowa Góra', 'Kapuściska', 'Bielawy', 'Solec Kujawski', 'Białe Błota', 'Osielsko', 'Koronowo'],
    accessRoutes: ['Droga ekspresowa S5', 'Droga ekspresowa S10', 'Droga krajowa DK25', 'Droga krajowa DK80'],
    localLogistics: {
      arrivalEstimate: '1 – 2 godziny na terenie Bydgoszczy',
      hubDescription: 'Baza operacyjna z autolawetami w pasie Bydgoszcz – Toruń.',
    },
    officeDeptInfo: {
      officeName: 'Wydział Uprawnień Komunikacyjnych Urzędu Miasta Bydgoszczy',
      address: 'ul. Grudziądzka 9-15, budynek B',
      openingHours: 'Poniedziałek, Środa, Czwartek: 8:00 – 16:00, Wtorek: 8:00 – 18:00, Piątek: 8:00 – 14:00',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Bydgoszczy złożysz w 3 minuty przez Internet za pośrednictwem platformy ePUAP.',
    },
    localContext: {
      title: 'Lokalny skup aut w Bydgoszczy – dlaczego warto z nami?',
      paragraphs: [
        'Kujawsko-pomorskie to nasz bezpośredni rynek domowy. Dzięki rozbudowanej sieci lokalnych kontaktów handlowych w Bydgoszczy i okolicach jesteśmy w stanie zagwarantować najkrótszy czas dojazdu i najbardziej elastyczne warunki transakcji.',
        'Niezależnie czy Twoje auto stoi na osiedlu w Fordonie, w garażu na Osowej Górze, czy w warsztacie w Solcu Kujawskim – przyjeżdżamy na miejsce, sporządzamy legalną umowę i wypłacamy ustaloną kwotę w gotówce do ręki.',
      ],
    },
    localFaq: [
      {
        question: 'Jak szybko możecie przyjechać po auto w Bydgoszczy?',
        answer: 'Na terenie Bydgoszczy i bezpośrednich okolic jesteśmy zazwyczaj w ciągu 1 do 2 godzin od zgłoszenia.',
      },
    ],
    defaultWizardCity: 'Bydgoszcz',
  },

  // ========================================================
  // 8. TORUŃ (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-torun': {
    slug: 'skup-aut-torun',
    type: 'city',
    cityName: 'Toruń',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Toruń za Gotówkę w 24h – Bezpłatna Wycena Online | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Toruń od Ręki – Odkup Aut w Toruniu | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Toruń i okolice. Rubinkowo, Wrzosy, Skarpa, Stawki, Lubicz. Gotówka od ręki, dojazd autolawetą 0 zł. Wycena w 60 sekund!',
      zdajauto: 'Bezpieczny skup aut w Toruniu. Samochody sprawne, uszkodzone, powypadkowe. Zadzwoń lub wypełnij formularz online.',
    },
    h1: {
      autozglowy: 'Skup Aut Toruń – błyskawiczny odkup i gotówka pod domem',
      zdajauto: 'Skup Samochodów Toruń – uczciwe stawki bez marudzenia i prowizji',
    },
    heroSubtitle:
      'Kupujemy samochody w całym Toruniu i powiecie toruńskim. Darmowa autolaweta i pełne bezpieczeństwo prawne.',
    geo: { lat: 53.0138, lng: 18.5984 },
    districts: ['Rubinkowo', 'Na Skarpie', 'Wrzosy', 'Mokre', 'Stawki', 'Bielawy', 'Czerniewice', 'Koniuchy', 'Lubicz', 'Chełmża', 'Łysomice'],
    accessRoutes: ['Autostrada A1', 'Droga ekspresowa S10', 'Droga krajowa DK91', 'Droga krajowa DK15', 'Droga krajowa DK80'],
    localLogistics: {
      arrivalEstimate: '1 – 2 godziny w Toruniu',
      hubDescription: 'Partnerzy zlokalizowani tuż przy węźle autostrady A1 Toruń Południe / Toruń Północ.',
    },
    officeDeptInfo: {
      officeName: 'Wydział Komunikacji Urzędu Miasta Torunia',
      address: 'ul. Wały gen. Sikorskiego 25 lub ul. Poznańska 52 (dla lewobrzeża)',
      openingHours: 'Poniedziałek – Piątek: 7:30 – 17:00',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Toruniu można złożyć przez ePUAP lub skrzynkę podawczą bez rezerwacji terminu.',
    },
    localContext: {
      title: 'Szybki skup samochodów w Toruniu',
      paragraphs: [
        'W Toruniu i okolicznych gminach odkupujemy auta wszystkich marek – od miejskich kompaktów po duże busy dostawcze. Bliskość autostrady A1 i drogi S10 pozwala naszym mobilnym kupcom błyskawicznie dotrzeć pod wskazany adres.',
        'Zapewniamy pełną przejrzystość: sprawdzamy numer VIN, przygotowujemy czytelną umowę kupna-sprzedaży i przekazujemy gotówkę natychmiast przy podpisaniu dokumentów.',
      ],
    },
    localFaq: [
      {
        question: 'Czy skupujecie auta powypadkowe na terenie Torunia?',
        answer: 'Tak, odbieramy auta po stłuczkach, wypadkach oraz pojazdy unieruchomione własną autolawetą gratis.',
      },
    ],
    defaultWizardCity: 'Toruń',
  },

  // ========================================================
  // 9. WŁOCŁAWEK (KUJAWSKO-POMORSKIE – BAZA LOKALNA)
  // ========================================================
  'skup-aut-wloclawek': {
    slug: 'skup-aut-wloclawek',
    type: 'city',
    cityName: 'Włocławek',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Włocławek za Gotówkę w 24h – Bezpłatny Dojazd Lawetą | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Włocławek od Ręki – Gotówka pod Twoim Domem | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Lokalny skup aut we Włocławku i powiecie (Brześć Kujawski, Kowal, Lubraniec). Dojazd w 30-60 min! Gotówka do ręki, darmowa autolaweta.',
      zdajauto: 'Błyskawiczny skup aut Włocławek. Osobowe, dostawcze, uszkodzone i bez opłat. Wycena w 60 sekund online.',
    },
    h1: {
      autozglowy: 'Skup Aut Włocławek – bezpośrednia baza i najszybszy dojazd w regionie',
      zdajauto: 'Skup Samochodów Włocławek – natychmiastowa gotówka i darmowa laweta',
    },
    heroSubtitle:
      'Nasz bezpośredni ośrodek operacyjny. Dojazd mobilnego kupca we Włocławku i powiecie włocławskim nawet w 30–60 minut!',
    geo: { lat: 52.6558, lng: 19.0678 },
    districts: [
      'Południe',
      'Zazamcze',
      'Kazimierza Wielkiego',
      'Śródmieście',
      'Michelin',
      'Zawiśle',
      'Brześć Kujawski',
      'Kowal',
      'Lubraniec',
      'Chodecz',
      'Izbica Kujawska',
      'Fabianki',
    ],
    accessRoutes: ['Autostrada A1 (węzeł Włocławek Północ / Zachód)', 'Droga krajowa DK91', 'Droga krajowa DK62', 'Droga krajowa DK67'],
    localLogistics: {
      arrivalEstimate: '30 – 60 minut we Włocławku i okolicach',
      hubDescription: 'Główny hub operacyjny w rejonie Włocławek / Brześć Kujawski.',
    },
    officeDeptInfo: {
      officeName: 'Wydział Komunikacji Urzędu Miasta Włocławek / Starostwo Powiatowe',
      address: 'Zielony Rynek 11/13 (Urząd Miasta) lub ul. Długa 49 (Starostwo Powiatowe)',
      openingHours: 'Poniedziałek, Środa, Czwartek: 7:30 – 15:30, Wtorek: 7:30 – 17:00, Piątek: 7:30 – 14:00',
      onlineTip: 'Zgłoszenie zbycia pojazdu we Włocławku zrealizujesz online przez profil zaufany na platformie mObywatel/Gov.pl.',
    },
    localContext: {
      title: 'Najszybszy skup aut we Włocławku i Kujawach',
      paragraphs: [
        'Włocławek i powiat włocławski to serce naszej działalności operacyjnej. Bliskość bazy w Brześciu Kujawskim oraz bezpośredni dostęp do autostrady A1 i dróg DK91/DK62 pozwalają nam dotrzeć do klienta we Włocławku w rekordowym czasie – często już w kilkadziesiąt minut od zgłoszenia.',
        'Kupujemy samochody w każdym stanie: sprawne, wymagające doinwestowania, po stłuczkach, jak również pojazdy od lat stojące na posesjach czy w garażach, które nie mają ważnego ubezpieczenia OC ani przeglądu.',
      ],
    },
    localFaq: [
      {
        question: 'Jak szybko przyjedziecie we Włocławku lub Brześciu Kujawskim?',
        answer: 'Ponieważ to nasz główny rejon operacyjny, zazwyczaj jesteśmy na miejscu w 30 do 60 minut.',
      },
      {
        question: 'Czy kupicie auto bez ważnego OC i przeglądu?',
        answer: 'Tak, zabieramy auto własną autolawetą, zdejmując z Ciebie ryzyko kar z Ubezpieczeniowego Funduszu Gwarancyjnego.',
      },
    ],
    defaultWizardCity: 'Włocławek',
  },

  // ========================================================
  // 10. KATOWICE (ŚLĄSKIE / GÓRNY ŚLĄSK)
  // ========================================================
  'skup-aut-katowice': {
    slug: 'skup-aut-katowice',
    type: 'city',
    cityName: 'Katowice',
    voivodeship: 'Śląskie',
    metaTitle: {
      autozglowy: 'Skup Aut Katowice za Gotówkę w 24h – Aglomeracja Śląska | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Katowice i Śląsk – Szybka Sprzedaż Auta | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Katowice, Sosnowiec, Gliwice, Chorzów, Zabrze. Odbiór lawetą gratis, gotówka do ręki, bezpieczna umowa. Wycena w 60 sekund!',
      zdajauto: 'Odkup aut na Śląsku od ręki. Płacimy gotówką lub przelewem w 24h. Sprawdź bezpłatną wycenę online!',
    },
    h1: {
      autozglowy: 'Skup Aut Katowice i Śląsk – szybka gotówka i darmowy dojazd',
      zdajauto: 'Skup Samochodów Katowice – pewny odkup w całej aglomeracji śląskiej',
    },
    heroSubtitle:
      'Obsługujemy Katowice oraz całą Górnośląsko-Zagłębiowską Metropolię. Dojazd z autolawetą i gotówką w 1–3 godziny.',
    geo: { lat: 50.2649, lng: 19.0238 },
    districts: ['Śródmieście', 'Ligota-Panewniki', 'Brynów', 'Piotrowice', 'Dąb', 'Wełnowiec', 'Sosnowiec', 'Gliwice', 'Zabrze', 'Bytom', 'Ruda Śląska', 'Chorzów', 'Tychy'],
    accessRoutes: ['Autostrada A4', 'Autostrada A1', 'Drogowa Trasa Średnicowa (DTŚ)', 'Droga ekspresowa S86', 'Droga krajowa DK86'],
    localLogistics: {
      arrivalEstimate: '1 – 3 godziny na terenie metropolii śląskiej',
      hubDescription: 'Partnerzy rozlokowani wzdłuż Drogowej Trasy Średnicowej i autostrady A4.',
    },
    officeDeptInfo: {
      officeName: 'Wydział Uprawnień Komunikacyjnych Urzędu Miasta Katowice',
      address: 'Rynek 1 oraz ul. Francuska 70',
      openingHours: 'Poniedziałek – Środa: 7:30 – 15:30, Czwartek: 7:30 – 17:00, Piątek: 7:30 – 14:00',
      onlineTip: 'Zbycie pojazdu w Katowicach zgłasza się wygodnie przez Internet bez kolejek w urzędzie.',
    },
    localContext: {
      title: 'Specyfika rynku motoryzacyjnego na Śląsku',
      paragraphs: [
        'Aglomeracja śląska to największe skupisko miejskie w Polsce z intensywnym ruchem na DTŚ i autostradzie A4. Wiele samochodów pokonuje codziennie spore dystanse, co przekłada się na wyższe przebiegi i szybsze zużycie podzespołów.',
        'W naszym skupie nie dyskwalifikujemy samochodów z przebiegami powyżej 300 tys. km ani aut flotowych. Rzetelnie wyceniamy realną wartość pojazdu i odbieramy go spod wskazanego adresu w dowolnym mieście metropolii.',
      ],
    },
    localFaq: [
      {
        question: 'Czy dojedziecie do miast ościennych (Gliwice, Sosnowiec, Tychy)?',
        answer: 'Tak, obsługujemy całą metropolię śląsko-zagłębiowską z darmowym dojazdem autolawetą.',
      },
    ],
    defaultWizardCity: 'Katowice',
  },

  // ========================================================
  // 11. PŁOCK (MAZOWIECKIE)
  // ========================================================
  'skup-aut-plock': {
    slug: 'skup-aut-plock',
    type: 'city',
    cityName: 'Płock',
    voivodeship: 'Mazowieckie',
    metaTitle: {
      autozglowy: 'Skup Aut Płock za Gotówkę w 24h – Bezpłatny Dojazd Lawetą | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Płock od Ręki – Gotówka do Ręki w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Ekspresowy skup aut w Płocku i okolicach (Gostynin, Sierpc). Gotówka od ręki, dojazd autolawetą gratis. Wycena w 60 sekund!',
      zdajauto: 'Sprzedaj auto w Płocku bez pośredników i marudzenia. Sprawne, uszkodzone, dostawcze. Sprawdź bezpłatną wycenę.',
    },
    h1: {
      autozglowy: 'Skup Aut Płock – szybka gotówka i darmowy odbiór lawetą',
      zdajauto: 'Skup Samochodów Płock – uczciwy odkup pojazdów w 24 godziny',
    },
    heroSubtitle:
      'Działamy na terenie całego Płocka i okolicznych powiatów. Płatność od ręki w gotówce lub przelewem ekspresowym.',
    geo: { lat: 52.5463, lng: 19.7065 },
    districts: ['Podolszyce Północ', 'Podolszyce Południe', 'Skarpa', 'Radziwie', 'Międzytorze', 'Wyszogródzka', 'Gostynin', 'Sierpc', 'Gąbin'],
    accessRoutes: ['Droga krajowa DK60', 'Droga krajowa DK62', 'Droga wojewódzka DW562'],
    localLogistics: {
      arrivalEstimate: '1 – 2 godziny w Płocku i okolicach',
      hubDescription: 'Szybki dojazd partnerów trasą DK62 z kierunku Włocławka lub DK60.',
    },
    officeDeptInfo: {
      officeName: 'Oddział Komunikacji Urzędu Miasta Płocka',
      address: 'al. Piłsudskiego 6 lub Starostwo Powiatowe przy ul. Bielskiej 59',
      openingHours: 'Poniedziałek – Piątek: 8:00 – 15:00',
      onlineTip: 'Zgłoszenie sprzedaży auta w Płocku zrealizujesz przez platformę gov.pl w kilka minut.',
    },
    localContext: {
      title: 'Skup aut w Płocku i na Mazowszu Zachodnim',
      paragraphs: [
        'Płock to ważny ośrodek przemysłowy, w którym zapotrzebowanie na sprawną wymianę floty i pojazdów prywatnych jest stałe. Oferujemy bezpieczny odkup od ręki bez konieczności czekania na przypadkowych kupców.',
      ],
    },
    localFaq: [
      {
        question: 'Czy kupujecie auta po wypadkach w Płocku?',
        answer: 'Tak, odbieramy pojazdy uszkodzone autolawetą prosto spod Twojego domu lub z warsztatu.',
      },
    ],
    defaultWizardCity: 'Płock',
  },

  // ========================================================
  // 12. INOWROCŁAW (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-inowroclaw': {
    slug: 'skup-aut-inowroclaw',
    type: 'city',
    cityName: 'Inowrocław',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Inowrocław za Gotówkę w 24h – Bezpłatny Odbiór | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Inowrocław od Ręki – Gotówka do Ręki w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Lokalny skup aut Inowrocław i Kujawy Zachodnie (Kruszwica, Janikowo, Gniewkowo). Gotówka od ręki, darmowa autolaweta, odkup w 24h.',
      zdajauto: 'Szybki skup aut w Inowrocławiu. Osobowe, uszkodzone, powypadkowe, bez OC. Wycena online w 60 sekund!',
    },
    h1: {
      autozglowy: 'Skup Aut Inowrocław – gotówka do ręki i darmowa autolaweta',
      zdajauto: 'Skup Samochodów Inowrocław – profesjonalny odkup na Kujawach',
    },
    heroSubtitle:
      'Działamy w całym Inowrocławiu i powiecie inowrocławskim. Dojeżdżamy na Rąbin, Piastowskie, Mątwy oraz do Kruszwicy i Janikowa w 45–90 minut.',
    geo: { lat: 52.7937, lng: 18.2561 },
    districts: ['Rąbin', 'Osiedle Piastowskie', 'Mątwy', 'Szymborze', 'Stare Miasto', 'Uzdrowisko', 'Kruszwica', 'Janikowo', 'Gniewkowo', 'Pakość', 'Rojewo'],
    accessRoutes: ['Droga krajowa DK15', 'Droga krajowa DK25', 'Droga wojewódzka DW251', 'Droga wojewódzka DW252'],
    localLogistics: {
      arrivalEstimate: '45 – 90 minut w Inowrocławiu i powiecie',
      hubDescription: 'Szybki dojazd autolawetą z bazy operacyjnej Kujaw.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Inowrocławiu – Wydział Komunikacji i Transportu',
      address: 'ul. Mątewska 17, 88-100 Inowrocław',
      openingHours: 'Poniedziałek – Piątek: 7:30 – 15:00',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Inowrocławiu złożysz w 3 minuty przez Internet za pośrednictwem platformy Gov.pl / mObywatel.',
    },
    localContext: {
      title: 'Skup aut na Kujawach Zachodnich – Inowrocław i okolice',
      paragraphs: [
        'Inowrocław jako stolica Kujaw Zachodnich i miasto uzdrowiskowe skupia intensywny ruch lokalny. Wielu mieszkańców poszukuje szybkiego sposobu na sprzedaż auta bez konieczności tracenia weekendów na giełdach samochodowych czy odbierania telefonów od przypadkowych osób.',
        'Odkupujemy pojazdy sprawne, jak również auta po stłuczkach, z uszkodzonym silnikiem czy skorodowane. Nasz mobilny kupiec przyjeżdża pod wskazany adres, sprawdza dokumenty, podpisuje umowę i wypłaca gotówkę od ręki.',
      ],
    },
    localFaq: [
      {
        question: 'Czy dojedziecie do Kruszwicy lub Janikowa?',
        answer: 'Tak! Obsługujemy cały powiat inowrocławski: Kruszwicę, Janikowo, Gniewkowo, Pakość i Rojewo z bezpłatnym dojazdem autolawetą.',
      },
    ],
    defaultWizardCity: 'Inowrocław',
  },

  // ========================================================
  // 13. GRUDZIĄDZ (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-grudziadz': {
    slug: 'skup-aut-grudziadz',
    type: 'city',
    cityName: 'Grudziądz',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Grudziądz za Gotówkę w 24h – Bezpłatny Odbiór | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Grudziądz od Ręki – Gotówka do Ręki w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Ekspresowy skup aut w Grudziądzu (Strzemięcin, Rządz, Lotnisko, Tarpno). Gotówka do ręki, dojazd autolawetą gratis, legalna umowa.',
      zdajauto: 'Pewny skup aut Grudziądz i okolice. Sprawne, uszkodzone, powypadkowe. Zadzwoń lub wyceń online w 60 sekund!',
    },
    h1: {
      autozglowy: 'Skup Aut Grudziądz – gotówka w 24h i bezpłatna autolaweta',
      zdajauto: 'Skup Samochodów Grudziądz – szybka sprzedaż bez marudzenia i prowizji',
    },
    heroSubtitle:
      'Obsługujemy cały Grudziądz oraz miejscowości ościenne. Dojazd z gotówką i autolawetą zazwyczaj w 45–90 minut.',
    geo: { lat: 53.4839, lng: 18.7538 },
    districts: ['Strzemięcin', 'Rządz', 'Lotnisko', 'Tarpno', 'Mniszek', 'Kuntersztyn', 'Owczarki', 'Śródmieście', 'Nowa Wieś', 'Radzyń Chełmiński', 'Łasin'],
    accessRoutes: ['Autostrada A1 (węzeł Grudziądz)', 'Droga krajowa DK55', 'Droga krajowa DK16', 'Trasa Średnicowa Grudziądza'],
    localLogistics: {
      arrivalEstimate: '45 – 90 minut w Grudziądzu i okolicach',
      hubDescription: 'Bezpośredni dojazd autostradą A1 lub drogą DK55.',
    },
    officeDeptInfo: {
      officeName: 'Urząd Miejski w Grudziądzu – Wydział Komunikacji',
      address: 'ul. Mickiewicza 28/30, 86-300 Grudziądz',
      openingHours: 'Poniedziałek, Środa, Czwartek: 7:30 – 15:30, Wtorek: 7:30 – 17:00, Piątek: 7:30 – 14:00',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Grudziądzu możesz złożyć przez ePUAP/mObywatel bez konieczności wizyty w magistracie.',
    },
    localContext: {
      title: 'Sprzedaż samochodu w Grudziądzu – szybko, legalnie i bez stresu',
      paragraphs: [
        'Grudziądz jako czwarte co do wielkości miasto w województwie kujawsko-pomorskim posiada duży rynek aut używanych. Dzięki bliskości autostrady A1 nasi partnerzy docierają pod wskazany adres w Grudziądzu błyskawicznie.',
        'Kupujemy pojazdy osobowe, busy i dostawczaki, samochody po kolizjach drogowych na DK16 czy DK55, jak również auta niesprawne stojące na osiedlowych parkingach.',
      ],
    },
    localFaq: [
      {
        question: 'Czy odbierzecie auto ze Strzemięcina lub Lotniska bez opłat?',
        answer: 'Tak, odbiór autolawetą ze wszystkich dzielnic Grudziądza i okolicznych gmin jest w 100% darmowy przy sprzedaży.',
      },
    ],
    defaultWizardCity: 'Grudziądz',
  },

  // ========================================================
  // 14. BRODNICA (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-brodnica': {
    slug: 'skup-aut-brodnica',
    type: 'city',
    cityName: 'Brodnica',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Brodnica za Gotówkę w 24h – Bezpłatna Autolaweta | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Brodnica od Ręki – Gotówka do Ręki w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Brodnica i Pojezierze Brodnickie. Odkup aut osobowych, dostawczych i powypadkowych. Gotówka do ręki, bezpieczna umowa.',
      zdajauto: 'Sprzedaj auto w Brodnicy od ręki. Płacimy gotówką lub przelewem ekspresowym w 24h. Sprawdź bezpłatną wycenę online!',
    },
    h1: {
      autozglowy: 'Skup Aut Brodnica – natychmiastowa gotówka i darmowy dojazd',
      zdajauto: 'Skup Samochodów Brodnica – rzetelny odkup pojazdów w 24 godziny',
    },
    heroSubtitle:
      'Działamy w całej Brodnicy i powiecie brodnickim. Dojedziemy pod Twój dom lub firmę, podpiszemy umowę i wypłacimy gotówkę od ręki.',
    geo: { lat: 53.2597, lng: 19.4047 },
    districts: ['Karbowo', 'Michałowo', 'Górzno', 'Jabłonowo Pomorskie', 'Zbiczno', 'Bobrowo', 'Świedziebnia', 'Bartniczka'],
    accessRoutes: ['Droga krajowa DK15', 'Droga wojewódzka DW544', 'Droga wojewódzka DW560'],
    localLogistics: {
      arrivalEstimate: '1 – 2 godziny w powiecie brodnickim',
      hubDescription: 'Partnerzy z bazą transportową na trasie DK15.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Brodnicy – Wydział Komunikacji i Transportu',
      address: 'ul. Kamionka 18, 87-300 Brodnica',
      openingHours: 'Poniedziałek – Piątek: 7:30 – 15:30',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Brodnicy można wysłać elektronicznie przez profil zaufany na platformie ePUAP.',
    },
    localContext: {
      title: 'Skup aut na Pojezierzu Brodnickim',
      paragraphs: [
        'W powiecie brodnickim odkupujemy samochody od rolników, przedsiębiorców i osób prywatnych. Skupujemy zarówno auta zadbane, jak i wyeksploatowane w trudniejszych warunkach drogowych, bez ważnego badania technicznego czy z brakami w OC.',
      ],
    },
    localFaq: [
      {
        question: 'Czy kupujecie auta od firm z fakturą VAT w Brodnicy?',
        answer: 'Tak, rozliczamy się na podstawie umowy kupna-sprzedaży lub pełnej faktury VAT 23%.',
      },
    ],
    defaultWizardCity: 'Brodnica',
  },

  // ========================================================
  // 15. ŚWIECIE (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-swiecie': {
    slug: 'skup-aut-swiecie',
    type: 'city',
    cityName: 'Świecie',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Świecie za Gotówkę w 24h – Bezpłatny Odbiór Lawetą | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Świecie od Ręki – Odkup Aut w Świeciu | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Świecie i powiat świecki (Nowe, Pruszcz, Jeżewo). Gotówka od ręki, laweta gratis, bezpieczna transakcja w 24h.',
      zdajauto: 'Błyskawiczny skup aut w Świeciu. Samochody całe, uszkodzone, powypadkowe. Wycena w 60 sekund online.',
    },
    h1: {
      autozglowy: 'Skup Aut Świecie – ekspresowa gotówka i darmowa autolaweta',
      zdajauto: 'Skup Samochodów Świecie – profesjonalny odkup bez pośredników',
    },
    heroSubtitle:
      'Obsługujemy Świecie, Przechowo, Marianki oraz cały powiat świecki. Płatność gotówką wprost przy aucie.',
    geo: { lat: 53.4093, lng: 18.4475 },
    districts: ['Marianki', 'Przechowo', 'Mniszek', 'Nowe', 'Pruszcz', 'Jeżewo', 'Dragacz', 'Lniano', 'Osie', 'Bukowiec'],
    accessRoutes: ['Droga ekspresowa S5', 'Droga krajowa DK91', 'Autostrada A1 (węzeł Warlubie)'],
    localLogistics: {
      arrivalEstimate: '1 – 2 godziny w powiecie świeckim',
      hubDescription: 'Doskonałe skomunikowanie węzłem drogi S5 i DK91.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Świeciu – Wydział Komunikacji i Dróg',
      address: 'ul. Gen. Józefa Hallera 9, 86-100 Świecie',
      openingHours: 'Poniedziałek, Środa, Czwartek: 7:30 – 15:30, Wtorek: 7:30 – 16:30, Piątek: 7:30 – 14:30',
      onlineTip: 'Zgłoszenie sprzedaży auta w Świeciu wykonasz w kilka minut przez Gov.pl bez konieczności wizyty w starostwie.',
    },
    localContext: {
      title: 'Szybka sprzedaż auta w Świeciu i okolicach',
      paragraphs: [
        'Świecie to ważny węzeł komunikacyjny i przemysłowy. Odkupujemy tu zarówno samochody osobowe, jak i busy dostawcze używane przez firmy i podwykonawców. Przyjeżdżamy na miejsce ze sprzętem i gotówką.',
      ],
    },
    localFaq: [
      {
        question: 'Czy odbieracie auta niesprawne z terenu powiatu świeckiego?',
        answer: 'Tak, dysponujemy autolawetą z wyciągarką i odbieramy pojazdy uszkodzone lub powypadkowe bezpłatnie.',
      },
    ],
    defaultWizardCity: 'Świecie',
  },

  // ========================================================
  // 16. CHEŁMNO (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-chelmno': {
    slug: 'skup-aut-chelmno',
    type: 'city',
    cityName: 'Chełmno',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Chełmno za Gotówkę w 24h – Bezpłatny Dojazd | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Chełmno od Ręki – Gotówka do Ręki w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Lokalny skup aut Chełmno i okolice (Stolno, Unisław, Kijewo Królewskie). Gotówka od ręki, darmowa autolaweta, prosta umowa.',
      zdajauto: 'Skup samochodów Chełmno. Osobowe i dostawcze w każdym stanie. Wycena w 60 sekund online!',
    },
    h1: {
      autozglowy: 'Skup Aut Chełmno – szybka gotówka i bezpłatny odbiór pod domem',
      zdajauto: 'Skup Samochodów Chełmno – pewny odkup pojazdów na Ziemi Chełmińskiej',
    },
    heroSubtitle:
      'Działamy w całym Chełmnie i okolicznych gminach. Płacimy gotówką do ręki przy podpisaniu umowy.',
    geo: { lat: 53.3486, lng: 18.4252 },
    districts: ['Śródmieście', 'Grubno', 'Stolno', 'Unisław', 'Kijewo Królewskie', 'Lisewo', 'Chełmno-Wieś'],
    accessRoutes: ['Droga krajowa DK91', 'Droga wojewódzka DW548', 'Droga wojewódzka DW550'],
    localLogistics: {
      arrivalEstimate: '1 – 2 godziny w powiecie chełmińskim',
      hubDescription: 'Szybki dojazd trasą DK91 wzdłuż Wisły.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Chełmnie – Wydział Komunikacji i Dróg',
      address: 'ul. Kolejowa 1, 86-200 Chełmno',
      openingHours: 'Poniedziałek – Piątek: 7:30 – 15:30',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Chełmnie złożysz przez ePUAP/mObywatel bez wychodzenia z domu.',
    },
    localContext: {
      title: 'Skup samochodów na Ziemi Chełmińskiej',
      paragraphs: [
        'Zapewniamy mieszkańcom Chełmna i okolic wygodną alternatywę dla żmudnej sprzedaży na portalach ogłoszeniowych. Bierzemy auta w każdym stanie technicznym i prawnym.',
      ],
    },
    localFaq: [
      {
        question: 'Jak wygląda płatność za auto w Chełmnie?',
        answer: 'Płacimy pełną kwotę w gotówce do ręki od razu przy podpisaniu umowy lub realizujemy natychmiastowy przelew.',
      },
    ],
    defaultWizardCity: 'Chełmno',
  },

  // ========================================================
  // 17. NAKŁO NAD NOTECIĄ (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-naklo-nad-notecia': {
    slug: 'skup-aut-naklo-nad-notecia',
    type: 'city',
    cityName: 'Nakło nad Notecią',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Nakło nad Notecią za Gotówkę w 24h – Odbiór Lawetą | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Nakło nad Notecią od Ręki – Gotówka w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Nakło nad Notecią, Szubin, Kcynia, Mrocza. Gotówka od ręki, dojazd autolawetą gratis, legalna umowa. Wycena w 60 sekund!',
      zdajauto: 'Sprzedaj auto w Nakle bez marudzenia. Osobowe, powypadkowe, bez OC. Sprawdź bezpłatną wycenę.',
    },
    h1: {
      autozglowy: 'Skup Aut Nakło nad Notecią – natychmiastowa gotówka i darmowa laweta',
      zdajauto: 'Skup Samochodów Nakło nad Notecią – rzetelny odkup w powiecie nakielskim',
    },
    heroSubtitle:
      'Kupujemy auta w Nakle nad Notecią, Szubinie, Kcyni i Mroczy. Dojazd autolawetą pod Twój adres w 1–2 godziny.',
    geo: { lat: 53.1422, lng: 17.6019 },
    districts: ['Śródmieście', 'Chrząstowo', 'Szubin', 'Kcynia', 'Mrocza', 'Sadki', 'Potulice'],
    accessRoutes: ['Droga krajowa DK10', 'Droga ekspresowa S5 (węzeł Szubin)', 'Droga wojewódzka DW241'],
    localLogistics: {
      arrivalEstimate: '1 – 2 godziny w powiecie nakielskim',
      hubDescription: 'Szybki dojazd trasą DK10 od strony Bydgoszczy.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Nakle nad Notecią – Wydział Komunikacji',
      address: 'ul. Dąbrowskiego 54, 89-100 Nakło nad Notecią',
      openingHours: 'Poniedziałek – Piątek: 7:00 – 15:00',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Nakle zrealizujesz przez platformę Gov.pl / mObywatel.',
    },
    localContext: {
      title: 'Skup aut w powiecie nakielskim – Nakło, Szubin i okolice',
      paragraphs: [
        'Dzięki trasie DK10 i trasie ekspresowej S5 przez Szubin nasi partnerzy błyskawicznie docierają do klientów w całym powiecie nakielskim. Odkupujemy auta osobowe, vany i dostawczaki.',
      ],
    },
    localFaq: [
      {
        question: 'Czy dojedziecie do Szubina lub Kcyni?',
        answer: 'Tak, cały powiat nakielski obsługujemy bez żadnych dopłat za dojazd.',
      },
    ],
    defaultWizardCity: 'Nakło nad Notecią',
  },

  // ========================================================
  // 18. RYPIN (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-rypin': {
    slug: 'skup-aut-rypin',
    type: 'city',
    cityName: 'Rypin',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Rypin za Gotówkę w 24h – Bezpłatny Dojazd Lawetą | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Rypin od Ręki – Gotówka do Ręki w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Lokalny skup aut Rypin i Ziemia Dobrzyńska. Gotówka do ręki, darmowa autolaweta, odkup aut sprawnych i uszkodzonych w 24h.',
      zdajauto: 'Skup samochodów Rypin. Sprzedaj auto bez marudzenia i czekania na kupców. Wycena online w minutę!',
    },
    h1: {
      autozglowy: 'Skup Aut Rypin – ekspresowa gotówka i darmowa autolaweta',
      zdajauto: 'Skup Samochodów Rypin – pewna wycena i odbiór pod Twoim domem',
    },
    heroSubtitle:
      'Działamy w całym Rypinie i powiecie rypińskim. Gotówka do ręki przy podpisaniu umowy i darmowy transport.',
    geo: { lat: 53.0658, lng: 19.4086 },
    districts: ['Śródmieście', 'Skrwilno', 'Rogowo', 'Wąpielsk', 'Brzuze', 'Ostrowite'],
    accessRoutes: ['Droga wojewódzka DW534', 'Droga wojewódzka DW560', 'Droga wojewódzka DW557'],
    localLogistics: {
      arrivalEstimate: '45 – 90 minut w powiecie rypińskim',
      hubDescription: 'Dojazd od strony Włocławka / Lipna lub Torunia.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Rypinie – Wydział Komunikacji i Transportu',
      address: 'ul. Warszawska 40, 87-500 Rypin',
      openingHours: 'Poniedziałek – Piątek: 7:30 – 15:30',
      onlineTip: 'Zbycie pojazdu w Rypinie zgłosisz online przez profil zaufany na Gov.pl w 3 minuty.',
    },
    localContext: {
      title: 'Skup aut na Ziemi Dobrzyńskiej – Rypin',
      paragraphs: [
        'W Rypinie i okolicznych gminach odkupujemy pojazdy bez zbędnych formalności. Samodzielna sprzedaż w mniejszych miastach bywa uciążliwa – my gwarantujemy natychmiastową transakcję z gotówką do ręki.',
      ],
    },
    localFaq: [
      {
        question: 'Czy kupicie auto z uszkodzonym silnikiem w Rypinie?',
        answer: 'Tak, zabieramy auto własną autolawetą bez dodatkowych kosztów.',
      },
    ],
    defaultWizardCity: 'Rypin',
  },

  // ========================================================
  // 19. LIPNO (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-lipno': {
    slug: 'skup-aut-lipno',
    type: 'city',
    cityName: 'Lipno',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Lipno za Gotówkę w 24h – Bezpłatny Dojazd Lawetą | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Lipno od Ręki – Odkup Aut w Lipnie w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Lipno i powiat lipnowski (Skępe, Dobrzyń nad Wisłą, Kikół). Dojazd w 20-40 min! Gotówka od ręki, darmowa autolaweta.',
      zdajauto: 'Błyskawiczny skup aut w Lipnie. Bezpośrednie sąsiedztwo Włocławka. Sprawne, uszkodzone, bez OC. Wycena w 60 sekund!',
    },
    h1: {
      autozglowy: 'Skup Aut Lipno – ekspresowy dojazd w 30 minut i gotówka do ręki',
      zdajauto: 'Skup Samochodów Lipno – lokalny, pewny odkup prosto pod domem',
    },
    heroSubtitle:
      'Bezpośrednie sąsiedztwo naszej bazy we Włocławku. Dojeżdżamy do Lipna, Skępego, Kikoła i Dobrzynia nad Wisłą w 20–40 minut!',
    geo: { lat: 52.8447, lng: 19.1764 },
    districts: ['Śródmieście', 'Skępe', 'Dobrzyń nad Wisłą', 'Kikół', 'Wielgie', 'Tłuchowo', 'Bobrowniki', 'Chrostkowo'],
    accessRoutes: ['Droga krajowa DK10', 'Droga krajowa DK67 (Włocławek – Lipno)', 'Droga wojewódzka DW559'],
    localLogistics: {
      arrivalEstimate: '20 – 40 minut w Lipnie i okolicach',
      hubDescription: 'Błyskawiczny dojazd mostem na Wiśle z Włocławka trasą DK67.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Lipnie – Wydział Komunikacji i Transportu',
      address: 'ul. Sierpska 69, 87-600 Lipno',
      openingHours: 'Poniedziałek – Piątek: 7:30 – 15:30',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Lipnie wyślesz online przez profil zaufany na platformie mObywatel/Gov.pl.',
    },
    localContext: {
      title: 'Lokalny skup aut Lipno – najbliższy partner z autolawetą',
      paragraphs: [
        'Lipno i powiat lipnowski leżą tuż za Wisłą w bezpośrednim sąsiedztwie naszej głównej bazy we Włocławku. Połączenie drogą DK67 sprawia, że nasz mobilny kupiec pojawia się pod wskazanym adresem w Lipnie nawet w 20–30 minut od zgłoszenia.',
        'Kupujemy samochody w każdym stanie: całe, po stłuczkach, z usterkami mechanicznymi czy od lat niejeżdżące bez ważnego badania technicznego.',
      ],
    },
    localFaq: [
      {
        question: 'Jak szybko przyjedziecie do Lipna?',
        answer: 'Ponieważ nasza baza jest tuż obok we Włocławku, jesteśmy na miejscu w Lipnie zazwyczaj w 20 do 40 minut.',
      },
    ],
    defaultWizardCity: 'Lipno',
  },

  // ========================================================
  // 20. RADZIEJÓW (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-radziejow': {
    slug: 'skup-aut-radziejow',
    type: 'city',
    cityName: 'Radziejów',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Radziejów za Gotówkę w 24h – Błyskawiczny Dojazd | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Radziejów od Ręki – Gotówka do Ręki w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Radziejów i powiat radziejowski (Piotrków Kujawski, Osięciny, Bytoń). Dojazd w 15-30 min! Gotówka do ręki, darmowa autolaweta.',
      zdajauto: 'Sprzedaj auto w Radziejowie od ręki. Bezpośrednie sąsiedztwo bazy w Brześciu Kujawskim. Wycena online w 60 sekund!',
    },
    h1: {
      autozglowy: 'Skup Aut Radziejów – najszybszy dojazd w 20 minut i gotówka do ręki',
      zdajauto: 'Skup Samochodów Radziejów – bezpośrednia baza i uczciwa wycena',
    },
    heroSubtitle:
      'Tuż obok naszej bazy w Brześciu Kujawskim. Dojeżdżamy do Radziejowa, Piotrkowa Kujawskiego i Osięcin w 15–30 minut!',
    geo: { lat: 52.6247, lng: 18.5275 },
    districts: ['Śródmieście', 'Piotrków Kujawski', 'Osięciny', 'Bytoń', 'Topólka', 'Dobre'],
    accessRoutes: ['Droga krajowa DK62 (Włocławek – Brześć Kujawski – Radziejów)', 'Droga wojewódzka DW266', 'Droga wojewódzka DW267'],
    localLogistics: {
      arrivalEstimate: '15 – 30 minut w Radziejowie i powiecie',
      hubDescription: 'Bezpośrednie sąsiedztwo bazy operacyjnej w Brześciu Kujawskim trasą DK62.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Radziejowie – Wydział Komunikacji i Dróg',
      address: 'ul. Kościuszki 17, 88-200 Radziejów',
      openingHours: 'Poniedziałek – Piątek: 7:30 – 15:30',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Radziejowie zrealizujesz przez profil zaufany na Gov.pl bez stania w kolejce.',
    },
    localContext: {
      title: 'Skup samochodów Radziejów – sąsiedzki dojazd z Brześcia Kujawskiego',
      paragraphs: [
        'Radziejów i cały powiat radziejowski to rejon leżący tuż za miedzą naszej bazy w Brześciu Kujawskim. Dojeżdżamy trasą DK62 w kilkanaście minut. Gwarantujemy rzetelną wycenę, legalną umowę i natychmiastową gotówkę do ręki.',
      ],
    },
    localFaq: [
      {
        question: 'Czy dojedziecie do Piotrkowa Kujawskiego lub Osięcin?',
        answer: 'Tak! Jesteśmy w Osięcinach lub Piotrkowie Kujawskim w 15–25 minut.',
      },
    ],
    defaultWizardCity: 'Radziejów',
  },

  // ========================================================
  // 21. ALEKSANDRÓW KUJAWSKI & CIECHOCINEK (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-aleksandrow-kujawski': {
    slug: 'skup-aut-aleksandrow-kujawski',
    type: 'city',
    cityName: 'Aleksandrów Kujawski',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Aleksandrów Kujawski i Ciechocinek – Gotówka w 24h | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Aleksandrów Kujawski – Odkup od Ręki w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Aleksandrów Kujawski, Ciechocinek, Nieszawa, Bądkowo. Dojazd w 20-30 min! Gotówka od ręki, darmowa autolaweta, bezpieczna umowa.',
      zdajauto: 'Błyskawiczny skup aut w Aleksandrowie Kujawskim i Ciechocinku. Autostrada A1, gotówka do ręki. Wycena online w minutę!',
    },
    h1: {
      autozglowy: 'Skup Aut Aleksandrów Kujawski i Ciechocinek – gotówka w 30 minut',
      zdajauto: 'Skup Samochodów Aleksandrów Kujawski – darmowa autolaweta i brak rękojmi',
    },
    heroSubtitle:
      'Pas autostrady A1 między Włocławkiem a Toruniem. Dojeżdżamy do Aleksandrowa Kujawskiego, Ciechocinka i Nieszawy w 20–40 minut!',
    geo: { lat: 52.8753, lng: 18.6978 },
    districts: ['Śródmieście', 'Ciechocinek', 'Nieszawa', 'Bądkowo', 'Koneck', 'Raciążek', 'Waganiec', 'Zakrzewo'],
    accessRoutes: ['Autostrada A1 (węzeł Ciechocinek)', 'Droga krajowa DK91', 'Droga wojewódzka DW266'],
    localLogistics: {
      arrivalEstimate: '20 – 40 minut w powiecie aleksandrowskim',
      hubDescription: 'Ekspresowy dojazd autostradą A1 lub drogą DK91.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Aleksandrowie Kujawskim – Wydział Komunikacji i Dróg',
      address: 'ul. Słowackiego 8, 87-700 Aleksandrów Kujawski',
      openingHours: 'Poniedziałek – Piątek: 7:30 – 15:30',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Aleksandrowie Kujawskim zrobisz online przez portal Gov.pl.',
    },
    localContext: {
      title: 'Skup aut w Aleksandrowie Kujawskim i Ciechocinku',
      paragraphs: [
        'Powiat aleksandrowski i uzdrowiskowy Ciechocinek leżą bezpośrednio na szlaku autostrady A1 i drogi DK91 między Włocławkiem a Toruniem. Odbieramy auta od osób prywatnych, kuracjuszy, firm i hoteli. Gotówka wypłacana od ręki na miejscu.',
      ],
    },
    localFaq: [
      {
        question: 'Czy odbierzecie auto z Ciechocinka lub Nieszawy?',
        answer: 'Tak, cały powiat aleksandrowski obsługujemy z bezpłatnym dojazdem autolawetą.',
      },
    ],
    defaultWizardCity: 'Aleksandrów Kujawski',
  },

  // ========================================================
  // 22. ŻNIN (KUJAWSKO-POMORSKIE)
  // ========================================================
  'skup-aut-znin': {
    slug: 'skup-aut-znin',
    type: 'city',
    cityName: 'Żnin',
    voivodeship: 'Kujawsko-Pomorskie',
    metaTitle: {
      autozglowy: 'Skup Aut Żnin za Gotówkę w 24h – Bezpłatna Autolaweta | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Żnin od Ręki – Odkup Aut na Pałukach w 24h | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut Żnin i Pałuki (Barcin, Janowiec Wielkopolski, Łabiszyn, Rogowo). Trasa S5. Gotówka do ręki, autolaweta gratis, bezpieczna umowa.',
      zdajauto: 'Sprzedaj auto w Żninie bez marudzenia i prowizji. Samochody całe, uszkodzone, powypadkowe. Wycena w 60 sekund online!',
    },
    h1: {
      autozglowy: 'Skup Aut Żnin i Pałuki – gotówka od ręki i darmowa autolaweta',
      zdajauto: 'Skup Samochodów Żnin – szybki i bezpieczny odkup w 24 godziny',
    },
    heroSubtitle:
      'Obsługujemy Żnin, Barcin, Łabiszyn i Janowiec Wielkopolski wzdłuż trasy ekspresowej S5. Płatność od ręki w gotówce.',
    geo: { lat: 52.8503, lng: 17.7214 },
    districts: ['Śródmieście', 'Barcin', 'Janowiec Wielkopolski', 'Łabiszyn', 'Rogowo', 'Gąsawa'],
    accessRoutes: ['Droga ekspresowa S5 (węzeł Żnin Północ / Żnin Zachód)', 'Droga wojewódzka DW251', 'Droga wojewódzka DW253'],
    localLogistics: {
      arrivalEstimate: '1 – 2 godziny w powiecie żnińskim',
      hubDescription: 'Błyskawiczny dojazd trasą ekspresową S5 z Bydgoszczy lub Poznania.',
    },
    officeDeptInfo: {
      officeName: 'Starostwo Powiatowe w Żninie – Wydział Komunikacji i Dróg',
      address: 'ul. Potockiego 1, 88-400 Żnin',
      openingHours: 'Poniedziałek – Piątek: 7:30 – 15:30',
      onlineTip: 'Zgłoszenie zbycia pojazdu w Żninie złożysz wygodnie online przez profil zaufany na platformie mObywatel/Gov.pl.',
    },
    localContext: {
      title: 'Skup samochodów na Pałukach – Żnin i okolice',
      paragraphs: [
        'Trasa ekspresowa S5 otworzyła powiat żniński na błyskawiczny transport autolawetami. Odkupujemy samochody bez względu na stan techniczny, przebieg czy wiek pojazdu. Przyjeżdżamy na miejsce, sporządzamy legalną umowę i wypłacamy gotówkę do ręki.',
      ],
    },
    localFaq: [
      {
        question: 'Czy kupicie auto w Barcinie lub Łabiszynie?',
        answer: 'Tak, cały rejon Pałuk i powiatu żnińskiego obsługujemy bezpłatnie.',
      },
    ],
    defaultWizardCity: 'Żnin',
  },

  // ========================================================
  // 12. KATEGORIA: SKUP AUT USZKODZONYCH
  // ========================================================
  'skup-aut-uszkodzonych': {
    slug: 'skup-aut-uszkodzonych',
    type: 'category',
    metaTitle: {
      autozglowy: 'Skup Aut Uszkodzonych za Gotówkę w 24h – Bezpłatna Autolaweta | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Uszkodzonych od Ręki – Uczciwa Wycena Warsztatowa | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut uszkodzonych mechanicznie: silnik, skrzynia biegów, zawieszenie, elektronika. Bezpłatny odbiór autolawetą w całej Polsce. Gotówka od ręki!',
      zdajauto: 'Masz auto z uszkodzonym silnikiem lub skrzynią? Nie inwestuj w drogie naprawy. Odkupimy je w obecnym stanie w 24h!',
    },
    h1: {
      autozglowy: 'Skup Aut Uszkodzonych – gotówka od ręki bez kosztownych napraw',
      zdajauto: 'Skup Samochodów Uszkodzonych – odkup po kosztach warsztatowych',
    },
    heroSubtitle:
      'Awaria silnika, zatarta jednostka, uszkodzona skrzynia biegów czy stuki w zawieszeniu? Odkupimy Twoje auto w takim stanie, w jakim stoi.',
    localLogistics: {
      arrivalEstimate: '2 – 24 godziny w całej Polsce',
      hubDescription: 'Partnerzy z własnymi warsztatami i autolawetami przystosowanymi do aut nieodpalających.',
    },
    localContext: {
      title: 'Dlaczego nie warto inwestować w naprawę przed sprzedażą?',
      paragraphs: [
        'Koszty robocizny w warsztatach samochodowych oraz ceny części zamiennych drastycznie wzrosły. Remont kapitalny silnika diesla czy wymiana automatycznej skrzyni biegów potrafi kosztować od 6 000 do nawet 15 000 zł – kwoty, która rzadko zwraca się przy późniejszej sprzedaży detalicznej.',
        'W naszym serwisie partnerskim kalkulujemy wycenę w oparciu o hurtowe koszty napraw warsztatowych. Dzięki temu otrzymujesz realną, uczciwą stawkę za auto w stanie uszkodzonym i natychmiast uwalniasz zamrożony kapitał.',
      ],
    },
    localFaq: [
      {
        question: 'Czy auto musi odpalać, abyście je odkupili?',
        answer:
          'Nie! Odkupujemy auta nieodpalające, z zatartym silnikiem, zerwanym rozrządem czy uszkodzoną elektroniką. Autolaweta posiada wyciągarkę linową.',
      },
      {
        question: 'Kto płaci za autolawetę w przypadku niesprawnego auta?',
        answer: 'Transport autolawetą jest w 100% bezpłatny w ramach ceny odkupu pojazdu.',
      },
    ],
    defaultWizardCondition: 'wymaga_naprawy',
  },

  // ========================================================
  // 13. KATEGORIA: SKUP AUT POWYPADKOWYCH
  // ========================================================
  'skup-aut-powypadkowych': {
    slug: 'skup-aut-powypadkowych',
    type: 'category',
    metaTitle: {
      autozglowy: 'Skup Aut Powypadkowych za Gotówkę w 24h – Bezpłatny Odbiór | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów Powypadkowych i po Kolizji od Ręki | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Skup aut powypadkowych i po stłuczkach w całej Polsce. Wystrzelone poduszki, rozbity przód, szkoda całkowita. Płacimy gotówką od ręki!',
      zdajauto: 'Sprzedaj auto po wypadku lub kolizji. Odbiór z parkingu lub warsztatu blacharskiego gratis. Bezpieczna umowa i natychmiastowe rozliczenie.',
    },
    h1: {
      autozglowy: 'Skup Aut Powypadkowych – gotówka w 24h i darmowy transport lawetą',
      zdajauto: 'Skup Samochodów po Kolizji i Wypadku – uczciwy odkup bez marudzenia',
    },
    heroSubtitle:
      'Samochód po stłuczce miejskiej, kolizji drogowej lub ze szkodą całkowitą? Odbierzemy go prosto z miejsca zdarzenia, parkingu lub warsztatu.',
    localLogistics: {
      arrivalEstimate: '2 – 24 godziny w całej Polsce',
      hubDescription: 'Specjalistyczny sprzęt lawetowy z wózkami pod urwane koła i zawieszenie.',
    },
    localContext: {
      title: 'Szkoda całkowita lub kolizja – jak korzystnie sprzedać wrak?',
      paragraphs: [
        'Po kolizji ubezpieczyciele często orzekają tzw. szkodę całkowitą, wyceniając koszt naprawy na ponad 70% wartości rynkowej pojazdu (w przypadku AC) lub 100% (z OC sprawcy). Właściciel otrzymuje odszkodowanie, ale pozostaje z rozbitym autem, za które musi płacić ubezpieczenie OC.',
        'Odkupujemy samochody powypadkowe od ręki. Nie musisz martwić się demontażem, transportem ani opłatami parkingowymi – partner przyjeżdża ze specjalistyczną autolawetą, wypłaca gotówkę i przejmuje pojazd.',
      ],
    },
    localFaq: [
      {
        question: 'Czy odbierzecie auto z urwanym kołem lub uszkodzonym zawieszeniem?',
        answer:
          'Tak, nasze autolawety wyposażone są w specjalistyczne wózki pod urwane koła, co pozwala bezpiecznie wciągnąć nawet mocno uszkodzony pojazd.',
      },
    ],
    defaultWizardCondition: 'niesprawny',
  },

  // ========================================================
  // 14. KATEGORIA: SKUP AUT BEZ OC I PRZEGLĄDU
  // ========================================================
  'skup-aut-bez-oc-przegladu': {
    slug: 'skup-aut-bez-oc-przegladu',
    type: 'category',
    metaTitle: {
      autozglowy: 'Skup Aut bez OC i Przeglądu za Gotówkę w 24h – Bez Kary UFG | AutoZglowy.pl',
      zdajauto: 'Skup Samochodów bez Ważnego OC i Badań – Darmowa Autolaweta | ZdajAuto.pl',
    },
    metaDescription: {
      autozglowy: 'Masz auto bez ważnego OC lub przeglądu? Uniknij kar z UFG (nawet 8480 zł). Odkupimy samochód od ręki i odbierzemy lawetą pod domem!',
      zdajauto: 'Skup aut bez badań technicznych i ubezpieczenia OC w całej Polsce. Legalna umowa, darmowy transport lawetą, gotówka od ręki.',
    },
    h1: {
      autozglowy: 'Skup Aut bez OC i Przeglądu – uniknij kar z UFG i odzyskaj gotówkę',
      zdajauto: 'Skup Samochodów Nieopłaconych i Niejeżdżących – darmowa autolaweta',
    },
    heroSubtitle:
      'Samochód stoi nieużywany od miesięcy i zbliża się termin polisy? Odkupimy go legalnie i odbierzemy autolawetą w 24 godziny.',
    localLogistics: {
      arrivalEstimate: '2 – 24 godziny w całej Polsce',
      hubDescription: 'Autolawety z legalną licencją transportową – pojazd nie musi wyjeżdżać na drogę publiczną.',
    },
    localContext: {
      title: 'Brak OC to ryzyko kary UFG przekraczającej 8 400 zł',
      paragraphs: [
        'Zgodnie z przepisami, przerwa w ubezpieczeniu OC powyżej 14 dni wiąże się w Polsce z automatyczną karą UFG sięgającą ponad 8 400 zł w 2024 roku. Jeśli pojazd jest niesprawny i nie planujesz nim jeździć, dalsze opłacanie składki ubezpieczeniowej jest marnowaniem pieniędzy.',
        'Rozwiązaniem jest legalna sprzedaż pojazdu. Po podpisaniu umowy kupna-sprzedaży zgłaszasz zbycie pojazdu, co definitywnie zamyka obowiązek ubezpieczeniowy, a niewykorzystaną składkę OC możesz odzyskać od ubezpieczyciela.',
      ],
    },
    localFaq: [
      {
        question: 'Czy za brak OC grożą mi konsekwencje, jeśli sprzedam auto dzisiaj?',
        answer:
          'Z chwilą podpisania umowy kupna-sprzedaży obowiązek ubezpieczeniowy przechodzi na kupującego. Zgłoszenie zbycia z datą dzisiejszą definitywnie odcina Twoją odpowiedzialność za przyszłe okresy.',
      },
    ],
    defaultWizardCondition: 'wymaga_naprawy',
  },
};
