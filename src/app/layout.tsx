import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Błyskawiczna wycena i odkup aut | AutoZglowy.pl & ZdajAuto.pl",
  description:
    "Sprzedaj samochód osobowy, dostawczy lub z usterką bez stresu, bez mycia i marudnych oglądaczy. Otrzymaj bezpłatną propozycję odkupu i gotówkę od lokalnego partnera.",
  keywords: [
    "skup aut",
    "odkup samochodów",
    "AutoZglowy",
    "ZdajAuto",
    "wycena auta online",
    "odkup aut dostawczych",
    "sprzedaż auta bez marudzenia",
    "gotówka za auto",
  ],
  openGraph: {
    title: "Miej sprzedaż auta z głowy jeszcze dzisiaj – Bezpłatna wycena online",
    description:
      "Bierzemy auta w stanie, w jakim stoją. Gotówka do ręki lub szybki przelew. Sprawdź bez opłat.",
    type: "website",
    locale: "pl_PL",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/autozglowy-icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/autozglowy-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
