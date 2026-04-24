"use client";

import { BadgeCheck } from "lucide-react";

const SAGE = "#A8B5A0";
const SAGE_LIGHT_BG = "#FAF7F2";
const CREAM = "#FFFCF8";
const TEXT_PRIMARY = "#1A1A1A";
const TEXT_SECONDARY = "#8B7355";

const SERIF = 'var(--font-justine-serif), "Playfair Display", serif';
const SANS = "var(--font-justine-sans), Inter, sans-serif";

type Props = {
  hasActiveStories?: boolean;
  onAvatarClick?: () => void;
  onBioLinkClick?: () => void;
};

// Section profil Instagram : avatar + stats + bio + boutons
// `hasActiveStories` = anneau dégradé conique aux couleurs Instagram (version FULL)
export default function InstagramProfile({
  hasActiveStories = false,
  onAvatarClick,
  onBioLinkClick,
}: Props) {
  return (
    <section className="px-4 pt-3 pb-4" style={{ fontFamily: SANS, color: TEXT_PRIMARY }}>
      {/* Ligne 1 : avatar + stats */}
      <div className="flex items-center gap-5">
        <Avatar
          hasActiveStories={hasActiveStories}
          onClick={onAvatarClick}
        />

        <div className="flex-1 flex items-center justify-around">
          <Stat value="89" label="publications" />
          <Stat value="1247" label="abonnés" />
          <Stat value="312" label="abonnements" />
        </div>
      </div>

      {/* Ligne 2 : nom + bio + lien */}
      <div className="mt-4 space-y-1">
        <h1
          className="text-[16px] leading-tight"
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontStyle: "italic",
          }}
        >
          L'atelier de Justine ✂️
        </h1>
        <p className="text-[13px] leading-snug" style={{ color: TEXT_PRIMARY }}>
          Coiffeuse coloriste · Lausanne
        </p>
        <p className="text-[13px] leading-snug" style={{ color: TEXT_PRIMARY }}>
          ✨ Soin sur-mesure dans un atelier cocon
        </p>
        <p className="text-[13px] leading-snug" style={{ color: TEXT_PRIMARY }}>
          📅 Réserver ↓
        </p>
        <button
          type="button"
          onClick={onBioLinkClick}
          className="text-[13px] font-medium transition-opacity hover:opacity-70 text-left"
          style={{ color: SAGE }}
        >
          latelier-de-justine.ch/rdv
        </button>
      </div>

      {/* Ligne 3 : boutons d'action */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="
            h-[34px] rounded-lg text-[13px] font-semibold
            transition-opacity hover:opacity-90 active:opacity-80
          "
          style={{ background: SAGE, color: CREAM }}
        >
          S'abonner
        </button>
        <button
          type="button"
          className="
            h-[34px] rounded-lg text-[13px] font-semibold
            transition-opacity hover:opacity-70
          "
          style={{
            background: "transparent",
            color: SAGE,
            border: `1px solid ${SAGE}`,
          }}
        >
          Message
        </button>
      </div>
    </section>
  );
}

/* ————————————————————— Sous-composants ————————————————————— */

type StatProps = { value: string; label: string };
function Stat({ value, label }: StatProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[16px] font-semibold tabular-nums leading-tight">
        {value}
      </span>
      <span
        className="text-[12px] leading-tight"
        style={{ color: TEXT_SECONDARY }}
      >
        {label}
      </span>
    </div>
  );
}

type AvatarProps = {
  hasActiveStories: boolean;
  onClick?: () => void;
};
function Avatar({ hasActiveStories, onClick }: AvatarProps) {
  // Avatar 90px. Anneau (FULL only) = gradient conique 3px + gap blanc 2px puis avatar.
  const ringPadding = hasActiveStories ? 3 : 0;
  const gapPadding = hasActiveStories ? 2 : 0;

  const inner = (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: 90,
        height: 90,
        borderRadius: "9999px",
        background: SAGE_LIGHT_BG,
        boxShadow: hasActiveStories ? "none" : "inset 0 0 0 1px rgba(139,115,85,0.12)",
      }}
    >
      <span
        className="text-[34px] tracking-tight"
        style={{
          fontFamily: SERIF,
          color: SAGE,
          fontWeight: 700,
          fontStyle: "italic",
          // léger ajustement optique pour bien centrer le monogramme
          marginTop: -2,
        }}
        aria-label="L'atelier de Justine"
      >
        LdJ
      </span>
    </div>
  );

  // Sans anneau : un simple bouton autour de l'avatar
  if (!hasActiveStories) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8B5A0]"
        aria-label="Photo de profil"
      >
        {inner}
      </button>
    );
  }

  // Avec anneau (stories actives, version FULL)
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        shrink-0 rounded-full
        transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8B5A0] focus-visible:ring-offset-2
      "
      style={{
        background:
          "conic-gradient(from 45deg, #F58529 0deg, #DD2A7B 90deg, #8134AF 180deg, #515BD4 270deg, #F58529 360deg)",
        padding: ringPadding,
      }}
      aria-label="Voir les stories"
    >
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          background: "#F5EFE6",
          padding: gapPadding,
        }}
      >
        {inner}
      </div>
    </button>
  );
}
