import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Carnet de vie numérique — Madelaine Fernandez",
  description: "Démonstration du carnet de vie numérique pour EMS.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FAFDF7",
};

export default function CarnetDeVieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
        color: "#1f2e2b",
        background: "#FAFDF7",
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {children}
    </div>
  );
}
