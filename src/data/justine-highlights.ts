// Métadonnées des 8 highlights (sans le contenu JSX, voir HighlightContent.tsx)
import { Clock, Sparkles, Info, Tag, Calendar, Scissors, Star, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type HighlightId =
  | "dispos"
  | "promo"
  | "infos"
  | "tarifs"
  | "reserver"
  | "prestations"
  | "atelier"
  | "avis";

export type HighlightMeta = {
  id: HighlightId;
  label: string;
  icon: LucideIcon;
  // Ces couleurs habillent le StoryModal correspondant
  background: string;
  textColor: string;
  // Visuel différenciant pour mettre en valeur (ex : Promo)
  variant?: "promo";
};

// Ordre d'affichage : Dispos et Promo en premier pour mise en avant
export const justineHighlights: HighlightMeta[] = [
  { id: "dispos", label: "Dispos", icon: Clock, background: "#FAF7F2", textColor: "#1A1A1A" },
  { id: "promo", label: "Promo", icon: Sparkles, background: "#FFFCF8", textColor: "#1A1A1A", variant: "promo" },
  { id: "infos", label: "Infos", icon: Info, background: "#FAF7F2", textColor: "#1A1A1A" },
  { id: "tarifs", label: "Tarifs", icon: Tag, background: "#FFFCF8", textColor: "#1A1A1A" },
  { id: "reserver", label: "Réserver", icon: Calendar, background: "#F5EFE6", textColor: "#1A1A1A" },
  { id: "prestations", label: "Prestations", icon: Scissors, background: "#FAF7F2", textColor: "#1A1A1A" },
  { id: "atelier", label: "L'atelier", icon: Star, background: "#A8B5A0", textColor: "#FFFCF8" },
  { id: "avis", label: "Avis", icon: Heart, background: "#FAF7F2", textColor: "#1A1A1A" },
];
