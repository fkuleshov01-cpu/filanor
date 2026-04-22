"use client";

import { useEffect, useRef, useId } from "react";
import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

interface PillarModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  title: string;
  tagline: string;
  deliverables: string[];
  examples: Array<{
    sector: string;
    result: string;
  }>;
  timeline: string;
  startingPrice: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function PillarModal({
  isOpen,
  onClose,
  label,
  title,
  tagline,
  deliverables,
  examples,
  timeline,
  startingPrice,
}: PillarModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Fermeture sur Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus le bouton close au mount
      closeRef.current?.focus();
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const handleCtaClick = () => {
    onClose();
    setTimeout(
      () =>
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" }),
      300
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Panneau */}
      <motion.div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[var(--dark-panel)] rounded-2xl p-8 md:p-12 border border-[var(--accent-primary-30)]"
        style={{ boxShadow: "0 0 80px -20px var(--accent-primary-30)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Label */}
        <div className="text-xs font-medium text-[var(--accent-secondary)] tracking-widest uppercase mb-3">
          {label}
        </div>

        {/* Titre */}
        <h2
          id={titleId}
          className="text-3xl md:text-4xl font-bold text-white mb-3"
        >
          {title}
        </h2>

        {/* Tagline */}
        <p className="text-base text-gray-400 leading-relaxed mb-8 italic">
          {tagline}
        </p>

        {/* Livrables */}
        <div>
          <div className="text-xs font-medium text-gray-500 tracking-wider uppercase mb-4">
            Ce qu&apos;on livre concrètement
          </div>
          <div className="space-y-1">
            {deliverables.map((item) => (
              <div key={item} className="flex items-start gap-3 py-2">
                <Check className="w-4 h-4 text-[var(--accent-secondary)] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exemples */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="text-xs font-medium text-gray-500 tracking-wider uppercase mb-4">
            Exemples de cas
          </div>
          {examples.map((ex) => (
            <div key={ex.sector} className="py-3">
              <div className="text-sm font-semibold text-white">
                {ex.sector}
              </div>
              <div className="text-sm text-gray-400">{ex.result}</div>
            </div>
          ))}
        </div>

        {/* Tarif + timeline */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Délai
            </div>
            <div className="text-lg font-bold text-white">{timeline}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Investissement
            </div>
            <div className="text-lg font-bold text-white">{startingPrice}</div>
          </div>
        </div>

        {/* CTA double */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg border border-white/20 text-gray-300 text-sm font-medium hover:bg-white/5 transition-colors duration-200"
          >
            Fermer
          </button>
          <button
            onClick={handleCtaClick}
            className="flex-1 px-4 py-3 rounded-lg bg-[var(--accent-primary)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors duration-200 inline-flex items-center justify-center gap-2"
          >
            On en parle
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
