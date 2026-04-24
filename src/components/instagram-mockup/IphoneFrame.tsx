import type { ReactNode } from "react";
import StatusBar from "./StatusBar";

type IphoneFrameProps = {
  children: ReactNode;
  // Slot pour les modals : rendu au niveau du screen container, hors du scroll
  overlay?: ReactNode;
};

// Frame iPhone 15 Pro — pixel-perfect 393x852, bordure noire 12px, encoche Dynamic Island.
// Desktop : frame complet centré avec ombre élégante.
// Mobile (<768px) : frame invisible, contenu plein écran.
// Toutes les dimensions critiques sont en CSS pur dans globals.css (.justine-*)
// pour garantir le rendu indépendamment du JIT Tailwind.
export default function IphoneFrame({ children, overlay }: IphoneFrameProps) {
  return (
    <div className="justine-frame-outer">
      <div className="justine-frame">
        {/* Boutons latéraux — desktop seulement */}
        <span className="justine-side-button justine-side-button--volume-up" aria-hidden />
        <span className="justine-side-button justine-side-button--volume-down" aria-hidden />
        <span className="justine-side-button justine-side-button--lock" aria-hidden />

        {/* SCREEN — fond beige principal */}
        <div className="justine-screen">
          <StatusBar />

          {/* Dynamic Island — desktop seulement */}
          <span className="justine-dynamic-island" aria-hidden />

          {/* App content — scroll interne sur desktop, page-scroll sur mobile */}
          <div className="justine-scroll">{children}</div>

          {/* Overlay : modals positionnées au niveau du screen container */}
          {overlay}
        </div>
      </div>
    </div>
  );
}
