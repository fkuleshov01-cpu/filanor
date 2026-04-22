import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Filanor Tech — Applications web et automatisations intelligentes pour PME suisses";
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
          background: "#0F1C1A",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow effect top-left */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Subtle glow effect bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Header — Logo symbol + name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Logo symbol (simplified for Satori) */}
          <svg
            viewBox="0 0 100 100"
            width="56"
            height="56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="12"
              y="12"
              width="76"
              height="76"
              rx="18"
              stroke="#14B8A6"
              strokeWidth="5"
              fill="none"
            />
            <path
              d="M 33 72 L 50 32 L 67 72"
              stroke="#14B8A6"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="50" cy="30" r="3.5" fill="#14B8A6" />
          </svg>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#FAFDF7",
                letterSpacing: "-0.5px",
              }}
            >
              FILANOR
            </span>
            <span
              style={{
                fontSize: "32px",
                fontWeight: 500,
                color: "#0D9488",
                letterSpacing: "-0.5px",
              }}
            >
              TECH
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#FAFDF7",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Votre concurrent
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#14B8A6",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            a déjà automatisé.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#9CA3AF",
              marginTop: "16px",
            }}
          >
            Applications web sur mesure · Automatisations intelligentes · PME
            suisses
          </div>
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(20,184,166,0.2)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#9CA3AF",
              fontSize: "22px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                background: "#14B8A6",
              }}
            />
            Lausanne · Suisse
          </div>
          <div
            style={{
              color: "#14B8A6",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            filanor.ch
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
