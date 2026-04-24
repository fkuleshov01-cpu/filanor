"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export type StoryModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  background?: string; // surface principale (fond)
  textColor?: string;
  children: ReactNode; // contenu principal de la story
};

// Modal style "story Instagram" plein écran (à l'intérieur du frame iPhone).
// Barre de progression sauge statique en haut + bouton X.
export default function StoryModal({
  open,
  onClose,
  title,
  background = "#FAF7F2",
  textColor = "#1A1A1A",
  children,
}: StoryModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[55] overflow-hidden md:rounded-[38px] flex flex-col"
          style={{ background }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-title"
        >
          {/* Barre de progression statique */}
          <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
            <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(139,115,85,0.2)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#A8B5A0" }}
                initial={{ width: "0%" }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Bouton fermer */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-7 right-3 z-10 p-2 rounded-full transition-opacity hover:opacity-60"
            aria-label="Fermer"
            style={{ color: textColor }}
          >
            <X size={22} strokeWidth={1.8} />
          </button>

          {/* Header avatar + titre (style story header IG) */}
          <div className="absolute top-[24px] left-3 right-12 z-10 flex items-center gap-2 pt-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                background: "#FFFCF8",
                color: "#A8B5A0",
                fontFamily:
                  'var(--font-justine-serif), "Playfair Display", serif',
              }}
              aria-hidden
            >
              LdJ
            </div>
            <span
              id="story-title"
              className="text-[13px] font-semibold tracking-tight truncate"
              style={{ color: textColor }}
            >
              {title}
            </span>
          </div>

          {/* Contenu principal — centré verticalement */}
          <motion.div
            className="flex-1 flex flex-col justify-center px-6 pt-16 pb-10 overflow-y-auto"
            style={{ color: textColor }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
