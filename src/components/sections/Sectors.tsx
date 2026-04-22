"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import SectorExampleModal from "@/components/ui/SectorExampleModal";

const ease = [0.22, 1, 0.36, 1] as const;

interface Sector {
  id: string;
  label: string;
  url: string;
  tagline: string;
  painPoints: string[];
  timeSaved: string;
  example: {
    before: string;
    after: string;
    result: string;
  };
}

const sectors: Sector[] = [
  // --- SECTEURS ACTIFS ---
  {
    id: "coiffure",
    label: "Salons de coiffure",
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop",
    tagline: "Plus jamais de no-show.",
    painPoints: [
      "Agenda en ligne ouvert 24h/24, synchronisé en temps réel",
      "Vos clients réservent depuis Instagram en 10 secondes",
      "Plus jamais de no-show grâce aux rappels SMS automatiques",
    ],
    timeSaved: "12h/semaine",
    example: {
      before:
        "Vous passez 2h par jour au téléphone pour gérer les RDV. Les clients appellent pendant les coupes, vous perdez des réservations, les no-show plombent votre chiffre.",
      after:
        "Réservation 100% en ligne synchronisée avec l\u2019agenda. Rappels SMS automatiques 24h avant. Fiches clients avec historique des coupes et préférences.",
      result:
        "+37% de réservations \u00b7 \u221268% de no-show \u00b7 12h/semaine récupérées",
    },
  },
  {
    id: "restaurant",
    label: "Restaurants",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    tagline: "Salle pleine, cuisine zen.",
    painPoints: [
      "Réservations 24h/24 sans décrocher le téléphone",
      "Cartes de fidélité personnalisées dans Apple Wallet",
      "Fini le carnet papier et les doubles réservations",
    ],
    timeSaved: "15h/semaine",
    example: {
      before:
        "Carnet de réservations papier sur le bar. Cartes de fidélité en carton perdues. Personne ne sait combien de couverts prévoir en cuisine.",
      after:
        "Plateforme de réservation en ligne + cartes de fidélité digitales dans Apple Wallet avec cachets automatiques à chaque visite.",
      result:
        "+24% de taux de remplissage \u00b7 +40% de clients récurrents \u00b7 15h/semaine",
    },
  },
  {
    id: "hotel",
    label: "Hôtels",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    tagline: "Conciergerie qui dort jamais.",
    painPoints: [
      "Conciergerie IA qui répond en 4 langues à 3h du matin",
      "Vos avis Google augmentent automatiquement",
      "Demandes clients centralisées, plus jamais perdues",
    ],
    timeSaved: "18h/semaine",
    example: {
      before:
        "Réceptionniste submergé entre les check-ins, les demandes clients et les questions en 5 langues. Les avis négatifs s\u2019accumulent faute de temps pour répondre.",
      after:
        "IA conciergerie 24/7 multilingue connectée à votre système. Collecte d\u2019avis automatique 2h après le check-out.",
      result:
        "+0,8 étoile Google \u00b7 \u221245% de charge réception \u00b7 18h/semaine",
    },
  },

  // --- SECTEURS DÉSACTIVÉS (à réactiver si besoin) ---
  /*
  {
    id: "flotte",
    label: "Flottes de livraison",
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    tagline: "Chaque shift couvert, sans stress.",
    painPoints: [
      "Planning intelligent avec assignation automatique des shifts",
      "Bourse de shifts pour remplacer les désistements en 2 clics",
      "Stats temps réel (TPH, acceptation, annulation) + classement livreurs",
    ],
    timeSaved: "15h/semaine",
    example: {
      before:
        "Vous gérez votre flotte entre WhatsApp, Excel et appels téléphoniques. Les désistements de dernière minute, les shifts non couverts et les disponibilités changeantes deviennent ingérables. Impossible d\u2019avoir une vision claire de qui travaille, quand, et avec quelle performance.",
      after:
        "Une seule app pour piloter toute votre flotte. Planning intelligent avec assignation automatique, bourse de shifts pour les remplacements, suivi des stats (TPH, acceptation, annulation) et système d\u2019avertissements automatique. Côté livreur : appli minimaliste pour voir ses shifts, déclarer ses dispos et communiquer avec le manager.",
      result:
        "Couverture des shifts à 96% \u00b7 \u221280% de temps de coordination \u00b7 Zéro shift oublié \u00b7 Livreurs plus engagés grâce au classement et aux bonus",
    },
  },
  {
    id: "immobilier",
    label: "Agences immobilières",
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
    tagline: "Les leads chauds avant tout le monde.",
    painPoints: [
      "IA qui répond automatiquement à vos leads par email",
      "Classification automatique : chaud, tiède, froid",
      "Publication multi-portails (Homegate, ImmoScout) en un clic",
    ],
    timeSaved: "14h/semaine",
    example: {
      before:
        "40 emails de prospects par jour à qualifier à la main. Vous répondez tard, les meilleurs prospects partent chez le concurrent plus réactif.",
      after:
        "IA qui répond sous 2 minutes à chaque lead. Classification automatique chaud/tiède/froid. Vous n\u2019êtes alerté que pour les chauds.",
      result:
        "Réponse sous 2 min au lieu de 5h \u00b7 +35% de RDV qualifiés \u00b7 14h/semaine",
    },
  },
  {
    id: "avocat",
    label: "Cabinets d\u2019avocats",
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop",
    tagline: "Zéro appel raté en audience.",
    painPoints: [
      "IA qui répond à vos appels quand vous êtes en plaidoirie",
      "Facturation au temps passé calculée automatiquement",
      "Tri intelligent des emails urgents vs administratifs",
    ],
    timeSaved: "12h/semaine",
    example: {
      before:
        "Vous ratez la moitié des appels en audience. Vous facturez au forfait par défaut parce que tracker le temps est trop lourd. Les emails s\u2019empilent.",
      after:
        "IA qui répond à vos appels et vous transfère les urgences. Time tracking au clic. Tri automatique des emails par priorité.",
      result:
        "Zéro appel raté \u00b7 +28% de facturation récupérée \u00b7 12h/semaine",
    },
  },
  {
    id: "dentiste",
    label: "Cabinets dentaires",
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop",
    tagline: "Plus de sourires, moins d\u2019admin.",
    painPoints: [
      "Prise de RDV en ligne 24h/24 avec choix du praticien",
      "Rappels de contrôles annuels automatiques",
      "Facturation TARMED générée automatiquement après chaque soin",
    ],
    timeSaved: "13h/semaine",
    example: {
      before:
        "L\u2019assistante passe 4h par jour au téléphone pour les RDV. Les contrôles annuels sont oubliés. La facturation TARMED est faite à la main le soir.",
      after:
        "Prise de RDV en ligne avec créneaux réels. Rappels automatiques 6 et 12 mois. Facturation TARMED générée en 2 clics depuis le soin effectué.",
      result:
        "+42% de contrôles honorés \u00b7 Facturation en 2 clics \u00b7 13h/semaine",
    },
  },
  {
    id: "coach",
    label: "Coachs et studios",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop",
    tagline: "Le client, pas le planning.",
    painPoints: [
      "Réservation de cours avec paiement intégré (TWINT, carte)",
      "Abonnements récurrents gérés automatiquement",
      "Communication de groupe sans WhatsApp foutoir",
    ],
    timeSaved: "10h/semaine",
    example: {
      before:
        "Vous gérez les inscriptions sur un fichier Excel. Les paiements sont en cash ou TWINT au cas par cas. Votre WhatsApp à 80 personnes est un bordel.",
      after:
        "Plateforme de réservation avec paiement en ligne. Abonnements récurrents prélevés automatiquement. Canal de communication dédié par cours.",
      result:
        "+50% d\u2019abonnements récurrents \u00b7 \u221280% d\u2019impayés \u00b7 10h/semaine",
    },
  },
  */
];

export default function Sectors() {
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [openModalSector, setOpenModalSector] = useState<string | null>(null);

  const currentSector = openModalSector
    ? sectors.find((s) => s.id === openModalSector)
    : null;

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <section
      id="secteurs"
      className="py-20 md:py-28 px-6 bg-[var(--bg-primary)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label éditorial */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[var(--accent-primary)] tracking-[0.2em] uppercase">
            <span className="w-8 h-px bg-[var(--accent-primary)]" />
            Pour qui on construit
            <span className="w-8 h-px bg-[var(--accent-primary)]" />
          </span>
        </motion.div>

        {/* Titre */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, amount: 0.4 }}
        >
          Ils pourraient être vos voisins de palier.
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          className="text-lg text-[var(--text-secondary)] text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          On construit pour les métiers qui font vraiment tourner la Suisse
          romande. Survolez chaque carte pour voir ce qu&apos;on peut faire
          pour vous.
        </motion.p>

        {/* Grille cards — 3 desktop, 2 tablette, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector, index) => {
            const isTapped = tappedIndex === index;
            const defaultVariant = reducedMotion ? "hover" : "rest";

            return (
              <motion.div
                key={sector.id}
                className="sector-card group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease,
                  delay: (index % 4) * 0.08,
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={reducedMotion ? undefined : "hover"}
                animate={isTapped ? "hover" : defaultVariant}
                onClick={() => {
                  if (window.matchMedia("(hover: none)").matches) {
                    setTappedIndex(isTapped ? null : index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`En savoir plus sur ${sector.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setTappedIndex(isTapped ? null : index);
                  }
                }}
              >
                {/* LAYER 1 — Image de fond */}
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.08 },
                  }}
                  transition={{ duration: 0.8, ease }}
                >
                  <Image
                    src={sector.url}
                    alt={sector.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* LAYER 2 — Overlay gradient dark progressif */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  variants={{
                    rest: {
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                    },
                    hover: {
                      background:
                        "linear-gradient(to top, rgba(15,28,26,0.95) 0%, rgba(15,28,26,0.85) 40%, rgba(15,28,26,0.6) 100%)",
                    },
                  }}
                  transition={{ duration: 0.6, ease }}
                />

                {/* LAYER 3 — Contenu recto (label + tagline) — fade out au hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-5 z-10"
                  variants={{
                    rest: { opacity: 1, y: 0 },
                    hover: { opacity: 0, y: -10 },
                  }}
                  transition={{ duration: 0.3, ease }}
                >
                  <div className="text-[10px] font-medium text-[var(--accent-pale)] tracking-widest uppercase mb-2">
                    {sector.label}
                  </div>
                  <div className="text-white text-base font-semibold leading-snug">
                    {sector.tagline}
                  </div>
                </motion.div>

                {/* LAYER 4 — Contenu verso (reveal) — fade in au hover */}
                <motion.div
                  className="absolute inset-0 p-5 flex flex-col justify-between z-20"
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 },
                  }}
                  transition={{ duration: 0.4, ease, delay: 0.1 }}
                >
                  {/* Haut : label + titre */}
                  <div>
                    <motion.div
                      className="text-[10px] font-medium text-[var(--accent-light)] tracking-widest uppercase mb-2"
                      variants={{
                        rest: { opacity: 0, y: -5 },
                        hover: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4, delay: 0.15, ease }}
                    >
                      {sector.label}
                    </motion.div>
                    <motion.h3
                      className="text-lg font-bold text-white mb-4 leading-tight"
                      variants={{
                        rest: { opacity: 0, y: -5 },
                        hover: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4, delay: 0.2, ease }}
                    >
                      {sector.tagline}
                    </motion.h3>
                  </div>

                  {/* Milieu : liste des 3 painPoints */}
                  <div className="space-y-2 flex-1">
                    {sector.painPoints.map((point, i) => (
                      <motion.div
                        key={point}
                        className="flex items-start gap-2"
                        variants={{
                          rest: { opacity: 0, x: -8 },
                          hover: { opacity: 1, x: 0 },
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + i * 0.08,
                          ease,
                        }}
                      >
                        <div className="w-1 h-1 rounded-full bg-[var(--accent-light)] mt-1.5 shrink-0" />
                        <span className="text-[11px] text-gray-200 leading-snug">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bas : badge gain + CTA */}
                  <div className="mt-3 space-y-3">
                    <motion.div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent-primary-20)] border border-[var(--accent-primary-30)]"
                      variants={{
                        rest: { opacity: 0, y: 5 },
                        hover: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4, delay: 0.55, ease }}
                    >
                      <Clock className="w-3 h-3 text-[var(--accent-light)]" />
                      <span className="text-[10px] font-semibold text-white">
                        Gain : {sector.timeSaved}
                      </span>
                    </motion.div>

                    <motion.button
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-200"
                      variants={{
                        rest: { opacity: 0, y: 5 },
                        hover: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.4, delay: 0.6, ease }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenModalSector(sector.id);
                      }}
                    >
                      <span className="text-[11px] font-medium text-white">
                        Voir un exemple
                      </span>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* LAYER 5 — Border highlight premium au hover */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  variants={{
                    rest: {
                      boxShadow:
                        "0 0 0 0px rgba(20, 184, 166, 0), 0 0 0 0px rgba(20, 184, 166, 0)",
                    },
                    hover: {
                      boxShadow:
                        "0 0 0 1px rgba(20, 184, 166, 0.4), 0 20px 40px -20px rgba(20, 184, 166, 0.3)",
                    },
                  }}
                  transition={{ duration: 0.5, ease }}
                />

                {/* Indicateur "Survoler" — disparaît au hover */}
                <motion.div
                  aria-hidden="true"
                  className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                  variants={{
                    rest: { opacity: 0.7 },
                    hover: { opacity: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-1 h-1 rounded-full bg-[var(--accent-light)] animate-pulse" />
                  <span className="text-[9px] text-white/90 font-medium tracking-wider uppercase">
                    Survoler
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Texte généraliste */}
        <p className="text-center text-[var(--text-secondary)] text-lg mt-12 max-w-2xl mx-auto">
          On travaille aussi avec : cabinets d&apos;avocats, dentistes, coachs
          sportifs, agences immobilières, flottes de livraison — et tout métier
          de service qui perd du temps sur des tâches répétitives.
        </p>
      </div>

      {/* Modal exemple secteur */}
      <AnimatePresence>
        {currentSector && (
          <SectorExampleModal
            sector={currentSector}
            onClose={() => setOpenModalSector(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
