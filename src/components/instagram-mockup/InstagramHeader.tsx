// Top bar Instagram : flèche retour fictive + username + bouton "..." (3 points)
// Style minimal cohérent avec l'app native iOS

import { ChevronLeft, MoreHorizontal, BadgeCheck } from "lucide-react";

type InstagramHeaderProps = {
  username: string;
};

export default function InstagramHeader({ username }: InstagramHeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-10
        flex items-center justify-between
        px-4 py-3
        backdrop-blur-md
      "
      style={{
        background: "rgba(245, 239, 230, 0.92)",
        borderBottom: "1px solid rgba(139, 115, 85, 0.08)",
      }}
    >
      <button
        type="button"
        className="flex items-center -ml-1 p-1 rounded-md transition-opacity hover:opacity-60"
        aria-label="Retour"
        style={{ color: "#1A1A1A" }}
      >
        <ChevronLeft size={26} strokeWidth={1.6} />
      </button>

      <div className="flex items-center gap-1.5">
        <span
          className="font-semibold text-[15px] tracking-tight"
          style={{ color: "#1A1A1A" }}
        >
          {username}
        </span>
        <BadgeCheck
          size={16}
          strokeWidth={2}
          style={{ color: "#A8B5A0" }}
          aria-label="Compte vérifié"
        />
      </div>

      <button
        type="button"
        className="p-1 rounded-md transition-opacity hover:opacity-60"
        aria-label="Plus d'options"
        style={{ color: "#1A1A1A" }}
      >
        <MoreHorizontal size={22} strokeWidth={1.8} />
      </button>
    </header>
  );
}
