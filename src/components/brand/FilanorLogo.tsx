import type { SVGProps } from "react";

interface FilanorLogoProps extends SVGProps<SVGSVGElement> {
  /** Si true, affiche "FILANOR TECH" à côté du symbole */
  showWordmark?: boolean;
  /** Couleur du wordmark, "dark" pour fond clair, "light" pour fond sombre */
  variant?: "dark" | "light";
}

/**
 * Logo Filanor Tech — Rounded square avec "A" stylisé à l'intérieur
 * Utilise la palette teal Émeraude Tech
 */
export function FilanorLogo({
  showWordmark = false,
  variant = "dark",
  className,
  ...props
}: FilanorLogoProps) {
  const textColor = variant === "dark" ? "#0F1C1A" : "#FAFDF7";
  const techColor = "#0D9488";

  if (!showWordmark) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Filanor Tech"
        className={className}
        {...props}
      >
        <defs>
          <linearGradient id="filanorStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
        <rect
          x="12"
          y="12"
          width="76"
          height="76"
          rx="18"
          stroke="url(#filanorStroke)"
          strokeWidth="5"
          fill="none"
        />
        <path
          d="M 33 72 L 50 32 L 67 72"
          stroke="url(#filanorStroke)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="50" cy="30" r="3.5" fill="#0D9488" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 380 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Filanor Tech"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="filanorStrokeFull" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      <rect
        x="12"
        y="12"
        width="76"
        height="76"
        rx="18"
        stroke="url(#filanorStrokeFull)"
        strokeWidth="5"
        fill="none"
      />
      <path
        d="M 33 72 L 50 32 L 67 72"
        stroke="url(#filanorStrokeFull)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="50" cy="30" r="3.5" fill="#0D9488" />
      <text
        x="110"
        y="64"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="42"
        fontWeight="800"
        letterSpacing="-1"
        fill={textColor}
      >
        FILANOR
      </text>
      <text
        x="290"
        y="64"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="42"
        fontWeight="500"
        letterSpacing="-0.5"
        fill={techColor}
      >
        TECH
      </text>
    </svg>
  );
}
