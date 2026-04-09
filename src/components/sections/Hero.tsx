"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Toile 3D réseau — lazy-loaded, pas de SSR (WebGL)
const NetworkMeshCanvas = dynamic(
  () => import("@/components/3d/network-mesh-canvas"),
  { ssr: false }
);

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-primary)] flex flex-col justify-start pt-32 md:pt-40"
    >
      {/* Gradient mesh animé — bouge lentement en fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(13, 148, 136, 0.22), transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(5, 150, 105, 0.18), transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(20, 184, 166, 0.14), transparent 50%)
          `,
        }}
      />

      {/* Gradient radial teal subtil — équilibre visuel à droite */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 75% 60%, var(--accent-primary-10) 0%, transparent 50%)'
        }}
      />

      {/* NetworkMesh en fond — texture ambiante subtile */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <NetworkMeshCanvas />
      </div>

      {/* Contenu typographique plein cadre */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-20 md:py-32">
        {/* Badge Lausanne */}
        <motion.div
          className="mb-10 md:mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-primary-15)] bg-[var(--accent-primary-06)] px-4 py-1.5 text-sm text-[var(--accent-primary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            Basé à Lausanne
          </div>
        </motion.div>

        {/* Titre accessible pour les lecteurs d'écran */}
        <h1 className="sr-only">
          Votre concurrent a déjà automatisé. Et vous ?
        </h1>

        {/* Grande typographie éditoriale */}
        <div
          aria-hidden="true"
          className="text-[var(--text-primary)] leading-[0.95] tracking-tight"
        >
          {/* Ligne 1 : "Votre concurrent" — medium, taille moyenne */}
          <motion.div
            className="text-4xl md:text-6xl lg:text-7xl font-medium text-[var(--text-secondary)] mb-2 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            Votre concurrent
          </motion.div>

          {/* Ligne 2 : "a déjà automatisé." — bold énorme, punch line */}
          <motion.div
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--text-primary)] mb-4 md:mb-6 leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            a déjà automatisé.
          </motion.div>

          {/* Ligne 3 : "Et vous ?" — Caveat manuscrit, décalé, teal */}
          <motion.div
            className="flex items-center gap-4 md:gap-6 mt-6 md:mt-10 pl-4 md:pl-16"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            {/* Trait teal */}
            <div className="h-px w-10 md:w-16 bg-[var(--accent-primary)] shrink-0" />

            {/* "Et vous ?" en Caveat */}
            <span
              className="font-caveat text-5xl md:text-7xl lg:text-8xl text-shimmer-teal leading-none"
              style={{ transform: "rotate(-3deg)", display: "inline-block" }}
            >
              Et vous ?
            </span>
          </motion.div>
        </div>

        {/* Sous-titre */}
        <motion.p
          className="mt-12 md:mt-20 max-w-2xl text-xl md:text-2xl font-medium text-[var(--text-secondary)] leading-relaxed pl-4 md:pl-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.8 }}
        >
          Votre Excel et vos post-its ne tiendront pas longtemps. On a mieux.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-wrap gap-4 pl-4 md:pl-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 1 }}
        >
          <button
            onClick={() => scrollTo("laboratoire")}
            className="bg-[var(--accent-primary)] text-white px-8 py-4 text-base rounded-xl font-medium hover:bg-[var(--accent-hover)] shadow-lg shadow-[var(--accent-primary-30)] hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 active:scale-[0.98]"
          >
            Voir ce qu&apos;on fait
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="border border-gray-300 text-[var(--text-secondary)] px-8 py-4 text-base rounded-xl font-medium hover:border-[var(--accent-secondary)] hover:text-[var(--accent-primary)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 active:scale-[0.98]"
          >
            Nous contacter
          </button>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)]">
          Découvrir
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--accent-primary)] to-transparent animate-scroll-hint" />
      </motion.div>
    </section>
  );
}
