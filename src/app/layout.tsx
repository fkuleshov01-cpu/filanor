import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ui/scroll-progress";
import ScrollToTop from "@/components/ui/scroll-to-top";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://filanor.ch"),
  title: {
    default: "Filanor Tech — Applications web et automatisations intelligentes pour PME suisses",
    template: "%s | Filanor Tech",
  },
  description:
    "Agence web basée à Lausanne. On conçoit des applications web sur mesure et des automatisations intelligentes qui font gagner des heures aux PME suisses. Devis fixe, délai garanti.",
  keywords: [
    "agence web Lausanne",
    "application web sur mesure Suisse",
    "automatisations intelligentes PME",
    "développement web Suisse romande",
    "Filanor Tech",
  ],
  authors: [{ name: "Filanor Tech SNC" }],
  creator: "Filanor Tech SNC",
  publisher: "Filanor Tech SNC",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "https://filanor.ch" },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: "https://filanor.ch",
    siteName: "Filanor Tech",
    title: "Filanor Tech — Applications web et automatisations intelligentes",
    description:
      "Agence web à Lausanne. Applications sur mesure et automatisations qui font gagner des heures aux PME suisses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filanor Tech — Applications web et automatisations intelligentes",
    description:
      "Agence web à Lausanne. Applications sur mesure et automatisations qui font gagner des heures aux PME suisses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent-primary)] focus:text-white focus:rounded-lg focus:font-medium focus:shadow-lg"
        >
          Aller au contenu principal
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
