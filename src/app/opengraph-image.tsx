import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Filanor Tech — Applications web et automatisations intelligentes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 20%, #14B8A6 0%, transparent 40%), radial-gradient(circle at 80% 80%, #0D9488 0%, transparent 50%), #FAFDF7",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              background: "#0D9488",
            }}
          />
          <div style={{ fontSize: "28px", color: "#0F1C1A", fontWeight: 600 }}>
            Filanor Tech
          </div>
        </div>

        {/* Titre principal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#0F1C1A",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Votre concurrent a déjà
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#0D9488",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            automatisé.
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#4B5563",
              marginTop: "12px",
              maxWidth: "900px",
            }}
          >
            Applications web sur mesure et automatisations intelligentes pour PME suisses.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#4B5563",
            fontSize: "24px",
          }}
        >
          <div>Lausanne · Suisse</div>
          <div style={{ color: "#0D9488", fontWeight: 600 }}>filanor.ch</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
