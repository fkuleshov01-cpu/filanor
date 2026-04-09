"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

interface Founder {
  name: string;
  fullName: string;
  role: string;
  photo: string;
  initials: string;
  quote: string;
  longBio1: string;
  longBio2: string;
  tags: string[];
}

const founders: Founder[] = [
  {
    name: "Filip",
    fullName: "Filip Kuleshov",
    role: "Co-fondateur — Product & Tech",
    photo: "/team/filip.jpg",
    initials: "FK",
    quote:
      "Je préfère livrer un truc qui marche qu\u2019envoyer un PowerPoint qui promet.",
    longBio1:
      "Arrivé en Suisse à 7 ans avec sa mère, en fuyant une zone de guerre. Rien dans les poches, tout à apprendre — nouvelle langue, nouveau pays, nouvelle vie. À l\u2019école, élève brillant mais ingérable : minimum d\u2019efforts, maximum de problèmes. Pendant ce temps, il lançait ses premiers business en dehors des cours.",
    longBio2:
      "Chez Filanor, il s\u2019occupe de la partie produit et technique. Des choix d\u2019architecture aux détails de micro-interactions, c\u2019est lui qui veille à ce que chaque application livrée soit rapide, propre et utile. Pas belle sur un screenshot — utile dans la vraie vie.",
    tags: ["Code", "Café", "Gaming", "Lausanne"],
  },
  {
    name: "Daniel",
    fullName: "Daniel Shevchenko",
    role: "Co-fondateur — Stratégie & Opérations",
    photo: "/team/daniel.jpg",
    initials: "DS",
    quote:
      "Si un client doit nous appeler pour comprendre comment ça marche, c\u2019est qu\u2019on a raté.",
    longBio1:
      "Né au Portugal, arrivé en Suisse à 7 ans. A testé l\u2019école, le gymnase — ça n\u2019a pas collé. A commencé un apprentissage en maçonnerie, le genre de métier qui forge le caractère mais pas l\u2019avenir qu\u2019il voulait. Alors il a tout misé sur la tech et sur Filanor.",
    longBio2:
      "Même énergie que Filip, même refus de suivre un chemin tracé par quelqu\u2019un d\u2019autre. Chez Filanor, il gère la relation client, la stratégie et les opérations. C\u2019est lui qui traduit un besoin flou en plan d\u2019action concret — et qui s\u2019assure que chaque projet arrive à bon port.",
    tags: ["Stratégie", "Design", "Gaming", "Lausanne"],
  },
];

export default function Team() {
  return (
    <section
      id="qui-sommes-nous"
      className="relative bg-[var(--bg-secondary)] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Halos décoratifs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[var(--accent-light)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[var(--accent-primary-06)] blur-3xl"
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Titre */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, amount: 0.4 }}
        >
          Tout le monde a un pote qui a raté le Bitcoin.
          <br />
          <span className="text-shimmer-teal">
            Ne soyez pas le pote qui a raté l&apos;IA.
          </span>
        </motion.h2>

        {/* Texte vision */}
        <motion.p
          className="mt-8 max-w-[700px] mx-auto text-center text-lg text-[var(--text-secondary)] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          On a raté le Bitcoin. On ne ratera pas l&apos;IA. Alors au lieu
          d&apos;attendre, on a monté Filanor pour aider les entreprises suisses
          à prendre le virage avant tout le monde.
        </motion.p>

        {/* Portraits fondateurs — layout éditorial alterné */}
        <div className="mt-20 md:mt-28 space-y-24 md:space-y-32">
          {founders.map((f, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article key={f.initials} className="relative">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
                    isReversed ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Photo portrait — grande, ratio portrait */}
                  <motion.div
                    className={`lg:col-span-5 ${
                      isReversed ? "lg:col-start-8" : "lg:col-start-1"
                    }`}
                    initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--accent-primary-06)]">
                      <Image
                        src={f.photo}
                        alt={f.fullName}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                      {/* Fallback initiales */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-[var(--accent-primary-20)] -z-10"
                      >
                        {f.initials}
                      </span>
                    </div>
                  </motion.div>

                  {/* Contenu éditorial */}
                  <motion.div
                    className={`lg:col-span-6 ${
                      isReversed ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"
                    } flex flex-col justify-center`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.15 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {/* Rôle */}
                    <span className="text-xs font-medium text-[var(--accent-primary)] tracking-[0.2em] uppercase">
                      {f.role}
                    </span>

                    {/* Nom */}
                    <h3 className="mt-3 text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                      {f.fullName}
                    </h3>

                    {/* Citation */}
                    <blockquote className="mt-6 relative pl-6 border-l-2 border-[var(--accent-primary)]">
                      <Quote
                        size={20}
                        className="absolute -left-2.5 -top-1 text-[var(--accent-primary)] bg-[var(--bg-secondary)] p-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-lg md:text-xl font-medium text-[var(--text-primary)] leading-relaxed italic">
                        &ldquo;{f.quote}&rdquo;
                      </p>
                    </blockquote>

                    {/* Bio en 2 paragraphes */}
                    <div className="mt-8 space-y-4">
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {f.longBio1}
                      </p>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {f.longBio2}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-8">
                      {f.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-[var(--accent-primary-06)] border border-[var(--accent-primary-10)] px-3 py-1 text-xs font-medium text-[var(--accent-primary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Signature manuscrite en Caveat */}
                    <div className="mt-8 flex items-center gap-3">
                      <div className="h-px w-10 bg-[var(--accent-primary)]" />
                      <span
                        className="font-caveat text-3xl md:text-4xl text-[var(--accent-primary)] leading-none"
                        style={{
                          transform: "rotate(-2deg)",
                          display: "inline-block",
                        }}
                      >
                        {f.name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Tagline commune */}
        <motion.p
          className="mt-20 md:mt-28 text-center text-base text-[var(--text-muted)] italic max-w-[600px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          Rencontrés sur un jeu vidéo il y a 7 ans. Aujourd&apos;hui, on
          construit ensemble ce qu&apos;on n&apos;a jamais trouvé nulle part :
          notre propre chemin.
        </motion.p>
      </div>
    </section>
  );
}
