"use client";

import type { HighlightId } from "@/data/justine-highlights";
import { justineHighlights } from "@/data/justine-highlights";

const SAGE = "#A8B5A0";
const CREAM = "#FFFCF8";
const BROWN = "#8B7355";

type Props = {
  onSelect: (id: HighlightId) => void;
};

// Barre horizontale scrollable contenant les 8 highlights ronds 70px.
// Espacement 16px, snap-x mandatory, scrollbar masquée (cf. .justine-highlights-bar dans globals.css).
export default function HighlightsBar({ onSelect }: Props) {
  return (
    <div
      className="justine-highlights-bar"
      role="tablist"
      aria-label="Histoires à la une"
    >
      {justineHighlights.map(({ id, label, icon: Icon, variant }) => {
        const isPromo = variant === "promo";
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="flex flex-col items-center gap-1.5 shrink-0 snap-start group"
            aria-label={`Voir l'histoire ${label}`}
            style={{ width: 76 }}
          >
            {/* Cercle 70px : fond crème + ring sauge fin (ou dashed pour promo) */}
            <span
              className="
                relative flex items-center justify-center
                transition-transform duration-200
                group-hover:scale-[1.04] group-active:scale-[0.97]
              "
              style={{
                width: 70,
                height: 70,
                borderRadius: "9999px",
                background: CREAM,
                ...(isPromo
                  ? { border: `1.5px dashed ${SAGE}` }
                  : { boxShadow: `inset 0 0 0 1.5px rgba(168,181,160,0.55)` }),
              }}
            >
              <Icon size={32} strokeWidth={1.5} color={SAGE} aria-hidden />
            </span>
            <span
              className="text-[12px] truncate max-w-full text-center"
              style={{
                color: BROWN,
                fontFamily: "var(--font-justine-sans), Inter, sans-serif",
                fontWeight: isPromo ? 600 : 500,
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
