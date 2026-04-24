"use client";

import { Grid, Film, UserSquare } from "lucide-react";

const SAGE = "#A8B5A0";
const TEXT_PRIMARY = "#1A1A1A";
const MUTED = "#8B7355";

// Onglets visuels Posts (actif) / Reels / Tagged.
// Posts a un soulignement sauge 2px sous l'icône.
export default function PostsTabs() {
  return (
    <div
      className="grid grid-cols-3 border-t"
      style={{ borderColor: "rgba(139,115,85,0.12)" }}
      role="tablist"
      aria-label="Onglets de profil"
    >
      <Tab icon={Grid} active label="Publications" />
      <Tab icon={Film} active={false} label="Reels" />
      <Tab icon={UserSquare} active={false} label="Identifié" />
    </div>
  );
}

type TabProps = {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  active: boolean;
  label: string;
};

function Tab({ icon: Icon, active, label }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={label}
      className="relative flex items-center justify-center py-3 transition-opacity"
      style={{
        opacity: active ? 1 : 0.55,
      }}
    >
      <Icon
        size={22}
        strokeWidth={active ? 2 : 1.6}
        color={active ? TEXT_PRIMARY : MUTED}
      />
      {active && (
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: 32,
            height: 2,
            background: SAGE,
            borderRadius: 2,
          }}
          aria-hidden
        />
      )}
    </button>
  );
}
