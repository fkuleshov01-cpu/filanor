"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
};

// Modal centrée affichée au clic sur le lien bio.
// Slide up depuis le bas, 300ms ease-out (cf. spec).
export default function BookingModal({ open, onClose }: BookingModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[60] flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(26, 26, 26, 0.45)" }}
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-[340px] mx-4 mb-6 md:mb-0 rounded-3xl p-6 shadow-2xl"
            style={{ background: "#FFFCF8" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full transition-opacity hover:opacity-60"
              aria-label="Fermer"
              style={{ color: "#8B7355" }}
            >
              <X size={18} strokeWidth={1.8} />
            </button>

            <div className="flex flex-col items-center text-center pt-2 pb-1">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: "#A8B5A0" }}
                aria-hidden
              >
                <span className="text-2xl">🌿</span>
              </div>

              <h2
                id="booking-title"
                className="text-[22px] leading-tight mb-2"
                style={{
                  color: "#1A1A1A",
                  fontStyle: "italic",
                  fontFamily:
                    'var(--font-justine-serif), "Playfair Display", serif',
                  fontWeight: 500,
                }}
              >
                Réservation bientôt disponible
              </h2>

              <p
                className="text-[14px] leading-relaxed mb-5"
                style={{ color: "#8B7355" }}
              >
                Le module de réservation en ligne arrive très bientôt. En attendant, écrivez-moi sur Instagram.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl font-medium text-[14px] transition-opacity hover:opacity-90 active:opacity-80"
                style={{ background: "#A8B5A0", color: "#FFFCF8" }}
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
