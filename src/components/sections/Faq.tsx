"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "Combien ça coûte vraiment ?",
    answer:
      "Ça dépend de ce dont vous avez besoin — comme un mécano qui vous donnerait pas le prix avant d'avoir vu la voiture. Ce qu'on vous promet : un devis clair en 48h, un prix fixe, et zéro frais cachés. Pour un site vitrine on est généralement entre CHF 3'000 et 8'000. Pour une application sur mesure ou des automatisations, on chiffre après le premier appel. Et oui, on vous dit toujours la vérité, même quand le chiffre fait peur.",
  },
  {
    question: "Combien de temps pour avoir mon projet en ligne ?",
    answer:
      "Entre 2 et 6 semaines selon la complexité. Un site vitrine bien fait, c'est 2-3 semaines. Une application avec automatisations, c'est 4-6 semaines. On vous donne une date de livraison réaliste dès le devis, et on s'y tient. Pas de promesses bidon pour signer le contrat.",
  },
  {
    question: "Et si je comprends rien à la tech ?",
    answer:
      "C'est exactement pour vous qu'on existe. On parle français, pas en code. On vous explique chaque chose en mots simples, avec des comparaisons que vous comprenez. Vous n'avez pas besoin de savoir ce qu'est une API ou un serveur. Vous, vous gérez votre business. Nous, on s'occupe que la tech travaille pour vous. C'est tout.",
  },
  {
    question: "Vous bossez à distance ou on peut se voir ?",
    answer:
      "Les deux. On est à Lausanne, donc si vous êtes en Suisse romande on vient volontiers boire un café chez vous. Pour le reste de la Suisse on fait des visios — c'est plus rapide et tout aussi efficace. On préfère un projet bien fait à distance qu'un projet bâclé en présentiel.",
  },
  {
    question: "Qu'est-ce qui se passe après le lancement ?",
    answer:
      "On disparaît pas. On forme votre équipe pour qu'elle soit autonome sur les choses simples (modifier un texte, changer une image, gérer les commandes). Pour le reste — bugs, ajustements, nouvelles fonctionnalités — on reste joignable. Vous payez à l'usage ou via un forfait mensuel selon ce qui vous arrange.",
  },
  {
    question: "Pourquoi vous plutôt qu'une grosse agence ?",
    answer:
      "Parce qu'on a 20 ans, on a faim, et on a tout à prouver. Une grosse agence vous facture 15'000 CHF pour un site qu'un stagiaire va faire entre deux cafés. Nous, votre projet sera dans nos mains, du premier appel au lancement. Vous nous avez en direct, pas derrière un \"chargé de projet\". Et si on rate quelque chose, c'est nous qui réparons, pas un service client à 200 km.",
  },
  {
    question: "Et si je suis pas content du résultat ?",
    answer:
      "On corrige jusqu'à ce que vous le soyez. C'est dans notre intérêt — si vous êtes content, vous nous recommandez. C'est comme ça qu'on grandit. Et si vraiment ça colle pas après plusieurs ajustements, on en discute honnêtement. On préfère perdre un projet que livrer un truc dont on n'est pas fier.",
  },
];

/* Courbe ease personnalisée — équivalent power3.out */
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FaqAccordion({
  faq,
  index,
  isOpen,
  onClick,
}: {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: smoothEase, delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group"
    >
      <div className="bg-white rounded-2xl border border-gray-200/60 transition-all duration-300 hover:border-[var(--accent-primary-30)] hover:shadow-md hover:shadow-[var(--accent-primary-06)]">
        <button
          type="button"
          onClick={onClick}
          aria-expanded={isOpen}
          className="w-full text-left flex items-center justify-between gap-4 p-5 sm:p-6"
        >
          <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] flex-1">
            {faq.question}
          </h3>
          {/* Chevron rotatif — transform uniquement, GPU-friendly */}
          <div
            className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] text-white shadow-md shadow-[var(--accent-primary-30)]"
                : "bg-[var(--accent-light)] text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary-15)]"
            }`}
          >
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Réponse — grid-template-rows pour animation GPU-friendly */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="pt-2 border-t border-gray-100">
                <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-[var(--bg-primary)] py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Halos décoratifs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 -left-20 w-96 h-96 rounded-full bg-[rgba(13,148,136,0.06)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[rgba(20,184,166,0.05)] blur-3xl"
      />

      <div className="relative max-w-[900px] mx-auto px-6">
        {/* En-tête — animation d'apparition au scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: smoothEase }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-primary-20)] bg-white px-4 py-1.5 text-xs font-semibold text-[var(--accent-primary)] shadow-sm uppercase tracking-wider">
            <HelpCircle size={14} />
            Les vraies questions
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Vous vous posez{" "}
            <span className="text-[var(--accent-primary)] font-bold">les bonnes questions.</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            On vous donne les vraies réponses. Sans détour, sans jargon.
          </p>
        </motion.div>

        {/* Liste des FAQs */}
        <div className="faq-list mt-12 space-y-3">
          {faqs.map((faq, idx) => (
            <FaqAccordion
              key={idx}
              faq={faq}
              index={idx}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            Vous avez une autre question ?{" "}
            <a
              href="#contact"
              className="text-[var(--accent-primary)] font-semibold hover:text-[var(--accent-hover)] underline decoration-2 decoration-[var(--accent-primary-30)] hover:decoration-[var(--accent-hover)] underline-offset-4 transition-colors"
            >
              Posez-la nous directement
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
