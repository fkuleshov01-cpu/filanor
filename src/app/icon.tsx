import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAFDF7",
          borderRadius: "12px",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="52"
          height="52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="12"
            y="12"
            width="76"
            height="76"
            rx="18"
            stroke="#0D9488"
            strokeWidth="7"
            fill="none"
          />
          <path
            d="M 33 72 L 50 32 L 67 72"
            stroke="#0D9488"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="50" cy="30" r="5" fill="#0D9488" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
