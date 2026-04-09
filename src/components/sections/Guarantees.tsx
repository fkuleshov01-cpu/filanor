"use client";

import { motion } from "framer-motion";

// Easing partagé — philosophie emil
const ease = [0.22, 1, 0.36, 1] as const;

// 3 clauses de l'acte d'engagement
interface ClauseData {
  roman: string;
  label: string;
  promise: string;
  tone: string;
}

const clauses: ClauseData[] = [
  {
    roman: "I.",
    label: "DU DÉLAI",
    promise:
      "Livré en retard ? Vous êtes remboursé chaque jour de dépassement.",
    tone: "Spoiler : ça n\u2019arrive pas.",
  },
  {
    roman: "II.",
    label: "DU RÉSULTAT",
    promise:
      "Si notre outil ne vous fait pas gagner du temps en 30 jours, on travaille gratuitement jusqu\u2019à ce que ça marche.",
    tone: "On n\u2019a encore jamais eu à le faire.",
  },
  {
    roman: "III.",
    label: "DE LA FACTURE",
    promise:
      "Le prix qu\u2019on annonce, c\u2019est le prix. Pas de petites lignes, pas de suppléments déguisés.",
    tone: "On n\u2019est pas votre opérateur téléphonique.",
  },
];

function Clause({
  clause,
  index,
}: {
  clause: ClauseData;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.2,
        ease,
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative"
    >
      {/* Ligne top */}
      <div className="h-px w-full bg-[var(--border-light)] mb-8" />

      {/* Header clause : chiffre romain + label */}
      <div className="flex items-baseline gap-4 mb-5">
        <span className="text-2xl md:text-3xl font-bold text-[var(--accent-primary)] tabular-nums leading-none">
          {clause.roman}
        </span>
        <span className="text-xs font-semibold text-[var(--text-secondary)] tracking-[0.25em] uppercase">
          {clause.label}
        </span>
      </div>

      {/* Promesse principale */}
      <p className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight mb-4 pl-10 md:pl-12">
        {clause.promise}
      </p>

      {/* Ton / spoiler */}
      <p className="text-base italic text-[var(--text-muted)] pl-10 md:pl-12">
        {clause.tone}
      </p>
    </motion.article>
  );
}

export default function Guarantees() {
  return (
    <section
      id="garanties"
      className="relative bg-[var(--bg-primary)] py-24 sm:py-32 lg:py-40"
    >
      {/* Grid background subtil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:radial-gradient(var(--accent-light)_1px,transparent_1px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[var(--bg-primary)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Titre — ligne 1 normale, ligne 2 manuscrite animée */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true, amount: 0.4 }}
          >
            On ne fait pas de promesses en l&apos;air.
          </motion.h2>

          {/* Ligne manuscrite Caveat révélée de gauche à droite */}
          <motion.div
            className="inline-block"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{
              duration: 0.9,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.3,
            }}
            viewport={{ once: true, amount: 0.5 }}
            style={{
              paddingTop: "0.2em",
              paddingBottom: "0.3em",
              paddingLeft: "0.3em",
              paddingRight: "0.3em",
              marginTop: "-0.2em",
              marginBottom: "-0.3em",
              marginLeft: "-0.3em",
              marginRight: "-0.3em",
            }}
          >
            <span
              className="font-caveat text-5xl md:text-7xl text-shimmer-teal inline-block"
              style={{ transform: "rotate(-2deg)" }}
            >
              On les met par écrit.
            </span>
          </motion.div>
        </div>

        {/* Acte d'engagement */}
        <div className="max-w-2xl mx-auto">
          {/* Suréticle document */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="inline-flex items-center gap-4 mb-3">
              <div className="h-px w-12 bg-[var(--accent-primary)]" />
              <span className="text-xs font-medium text-[var(--accent-primary)] tracking-[0.3em] uppercase">
                Acte d&apos;engagement
              </span>
              <div className="h-px w-12 bg-[var(--accent-primary)]" />
            </div>
            <p className="text-xs text-[var(--text-muted)] tracking-wider">
              Lausanne, {new Date().getFullYear()}
            </p>
          </motion.div>

          {/* Les 3 clauses */}
          <div className="space-y-14 md:space-y-16">
            {clauses.map((clause, index) => (
              <Clause key={clause.roman} clause={clause} index={index} />
            ))}
          </div>

          {/* Bloc signatures */}
          <motion.div
            className="mt-20 md:mt-24 pt-12 border-t border-[var(--border-light)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <p className="text-xs text-[var(--text-muted)] tracking-wider text-center mb-8">
              Signé à Lausanne
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
              {/* Signature Filip */}
              <div className="flex flex-col items-center">
                <motion.div
                    aria-hidden="true"
                    className="font-caveat text-5xl md:text-6xl text-[var(--accent-primary)] leading-none inline-block px-4 py-2"
                    style={{ transform: "rotate(-3deg)" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.6,
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    Filip
                  </motion.div>
                <div className="w-20 h-px bg-[var(--border-light)] mt-2" />
                <p className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase mt-2">
                  Co-fondateur
                </p>
              </div>

              {/* Signature Daniel */}
              <div className="flex flex-col items-center">
                <motion.div
                    aria-hidden="true"
                    className="font-caveat text-5xl md:text-6xl text-[var(--accent-primary)] leading-none inline-block px-4 py-2"
                    style={{ transform: "rotate(-2deg)" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.9,
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    Daniel
                  </motion.div>
                <div className="w-20 h-px bg-[var(--border-light)] mt-2" />
                <p className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase mt-2">
                  Co-fondateur
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
