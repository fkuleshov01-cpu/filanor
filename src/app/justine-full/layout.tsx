import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";

// Polices DÉDIÉES à Justine — variables CSS locales
// pour ne pas écraser Plus Jakarta / Caveat utilisées sur le site filanor.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-justine-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-justine-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "L'atelier de Justine — Démo Full",
  description: "Mockup Instagram privé. Usage commercial interne.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F5EFE6",
};

export default function JustineFullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${inter.variable}`}
      style={{
        fontFamily: "var(--font-justine-sans), Inter, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
