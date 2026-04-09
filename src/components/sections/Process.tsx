"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  FileCheck2,
  Code2,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
};

const steps: Step[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: "On discute",
    description:
      "Un appel de 15 minutes, sans engagement. On vous écoute, on comprend ce qui vous bloque au quotidien, et on voit si on peut vraiment vous aider.",
    duration: "15 min",
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "On chiffre",
    description:
      "Un devis clair, en français, avec un prix fixe. Pas de jargon, pas d'options cachées, pas de surprises sur la facture finale. Vous savez exactement ce que vous payez.",
    duration: "48h",
  },
  {
    number: "03",
    icon: Code2,
    title: "On construit",
    description:
      "On code, on automatise, on connecte. Vous recevez des démos régulières pour valider chaque étape. Vous restez impliqué, on reste joignable.",
    duration: "2 à 6 semaines",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "On accompagne",
    description:
      "On ne disparaît pas après le lancement. Formation de votre équipe, support en cas de souci, ajustements selon vos retours. On reste à vos côtés.",
    duration: "Sur la durée",
  },
];

/* Courbe d'easing inspirée de power3.out */
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Process() {
  return (
    <section
      id="processus"
      className="relative bg-[var(--bg-primary)] py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Halos décoratifs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 right-0 w-96 h-96 rounded-full bg-[rgba(13,148,136,0.06)] blur-3xl"
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* En-tête — animation whileInView */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: smoothEase }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-primary-20)] bg-white px-4 py-1.5 text-xs font-semibold text-[var(--accent-primary)] shadow-sm uppercase tracking-wider">
            Comment on bosse
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Quatre étapes.{" "}
            <span className="text-[var(--accent-primary)] font-bold">Aucune surprise.</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            On a fait simple parce que vous avez déjà assez de complexité
            comme ça dans votre business.
          </p>
        </motion.div>

        {/* Grille des 4 étapes */}
        <div className="process-grid mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Ligne décorative connectant les étapes (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(13,148,136,0.3) 20%, rgba(13,148,136,0.3) 80%, transparent 100%)",
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="group relative bg-white rounded-2xl border border-gray-200/60 p-6 hover:border-[var(--accent-primary-30)] hover:shadow-xl hover:shadow-[var(--accent-primary-10)] hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: smoothEase, delay: index * 0.12 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Numéro en filigrane */}
                <div className="absolute top-4 right-4 text-5xl font-black text-[var(--accent-light)] group-hover:text-[var(--accent-primary-15)] transition-colors duration-300">
                  {step.number}
                </div>

                {/* Icône avec halo */}
                <div className="relative w-14 h-14">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                  />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] flex items-center justify-center shadow-md shadow-[var(--accent-primary-30)]">
                    <Icon className="text-white" size={24} />
                  </div>
                </div>

                {/* Contenu */}
                <h3 className="mt-5 text-lg font-bold text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.description}
                </p>

                {/* Durée */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)]">
                    <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                    {step.duration}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
