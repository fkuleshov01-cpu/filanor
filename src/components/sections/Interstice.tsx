"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Interstice() {
  const ref = useRef<HTMLElement>(null);

  // Scroll progress de la section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transformations liées au scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  return (
    <section
      ref={ref}
      id="interstice"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]"
      aria-label="Transition narrative"
    >
      {/* Gradient subtil en fond */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--accent-primary-06) 0%, transparent 60%)",
        }}
      />

      {/* Grid pattern très subtile */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Contenu central avec parallax scroll */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center transform-gpu"
        style={{ opacity, y, scale, willChange: "transform", backfaceVisibility: "hidden" }}
      >
        {/* Petit label en haut */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[var(--accent-primary)]" />
          <span className="text-xs font-medium text-[var(--accent-primary)] tracking-[0.3em] uppercase">
            Interlude
          </span>
          <div className="h-px w-12 bg-[var(--accent-primary)]" />
        </div>

        {/* Phrase principale — énorme */}
        <h2
          className="font-bold text-[var(--text-primary)] leading-[0.9] tracking-tight mb-6"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          Assez parlé.
        </h2>

        {/* Phrase secondaire — Caveat teal */}
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <div className="h-px w-10 md:w-16 bg-[var(--accent-primary)]" />
          <span
            className="font-caveat text-shimmer-teal leading-none"
            style={{
              transform: "rotate(-2deg)",
              display: "inline-block",
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
            }}
          >
            Regardez.
          </span>
          <div className="h-px w-10 md:w-16 bg-[var(--accent-primary)]" />
        </div>

        {/* Sous-texte discret */}
        <p className="mt-10 md:mt-16 text-sm md:text-base text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
          Trois démos interactives. Touchez, cliquez, testez. On vous laisse
          juger.
        </p>
      </motion.div>

      {/* Indicateur scroll down en bas */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-[var(--accent-primary)] to-transparent animate-scroll-hint" />
      </motion.div>
    </section>
  );
}
