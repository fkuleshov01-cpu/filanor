"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  Calendar,
  Settings,
  MessageSquare,
  Brain,
  Check,
  ArrowRight,
} from "lucide-react";
import PillarModal from "@/components/ui/pillar-modal";

// Easing partagé — philosophie emil
const ease = [0.22, 1, 0.36, 1] as const;

// Noeuds du flow d'automatisation (bloc 2)
const flowNodes = [
  { icon: MessageSquare, label: "Message reçu" },
  { icon: Brain, label: "IA analyse" },
  { icon: Calendar, label: "RDV créé" },
  { icon: Check, label: "Confirmé" },
];

// Indicateurs chiffrés — 3 pour écho visuel avec les 3 piliers
const indicators = [
  { value: "100%", label: "Sur mesure" },
  { value: "🇨🇭", label: "Basés à Lausanne" },
  { value: "∞", label: "Support inclus" },
];

// ─── Mockups CSS/SVG ───────────────────────────────────

function DashboardMockup() {
  return (
    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 border border-white/10 relative">
      <div className="h-6 bg-gray-800 flex items-center px-2 gap-1.5">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="text-[9px] text-gray-500 ml-2 font-mono">
          app.votrecommerce.ch
        </div>
      </div>
      <div className="flex h-[calc(100%-1.5rem)]">
        <div className="w-10 bg-gray-950 py-3 flex flex-col gap-3 items-center border-r border-white/5">
          <Home className="w-3.5 h-3.5 text-gray-500" />
          <Users className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
          <Calendar className="w-3.5 h-3.5 text-gray-500" />
          <Settings className="w-3.5 h-3.5 text-gray-500" />
        </div>
        <div className="flex-1 p-2.5 space-y-2">
          <div className="flex gap-1.5">
            {[
              { value: "2'847", label: "Commandes" },
              { value: "94%", label: "Satisfaction" },
              { value: "+23%", label: "Croissance" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="flex-1 bg-[var(--accent-primary-10)] border border-[var(--accent-primary-20)] rounded p-1.5"
              >
                <div className="text-xs font-bold text-white">{kpi.value}</div>
                <div className="text-[8px] text-gray-400">{kpi.label}</div>
              </div>
            ))}
          </div>
          <div className="h-14 w-full">
            <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="svc-graph" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <path d="M0 45 L20 40 L40 42 L60 35 L80 30 L100 32 L120 25 L140 20 L160 22 L180 15 L200 12 L200 60 L0 60Z" fill="url(#svc-graph)" />
              <path d="M0 45 L20 40 L40 42 L60 35 L80 30 L100 32 L120 25 L140 20 L160 22 L180 15 L200 12" fill="none" stroke="#14B8A6" strokeWidth={1.5} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationFlowMockup() {
  return (
    <div className="w-full aspect-[4/3] rounded-lg bg-gray-900 border border-white/10 p-4 flex items-center justify-center relative overflow-hidden">
      <div className="flex items-center gap-2 w-full">
        {flowNodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={node.label} className="contents">
              <div className="flex-1 flex flex-col items-center gap-1 bg-[var(--accent-primary-10)] border border-[var(--accent-primary-30)] rounded-lg px-1.5 py-2.5 min-w-0">
                <Icon className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                <div className="text-[8px] text-gray-300 text-center leading-tight font-medium">
                  {node.label}
                </div>
              </div>
              {i < flowNodes.length - 1 && (
                <svg className="w-5 h-1 shrink-0" viewBox="0 0 24 4">
                  <line x1="0" y1="2" x2="24" y2="2" stroke="#14B8A6" strokeWidth={1.5} strokeDasharray="3 3" className="animate-flow-dash" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SitePreviewMockup() {
  return (
    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 border border-white/10 relative">
      {/* Barre browser */}
      <div className="h-6 bg-gray-800 flex items-center px-2 gap-1.5">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="text-[9px] text-gray-500 ml-2 font-mono">
          votremarque.ch
        </div>
      </div>

      {/* Hero preview */}
      <div className="relative h-[calc(100%-1.5rem)] overflow-hidden">
        {/* Gradient mesh */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(20,184,166,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(13,148,136,0.3) 0%, transparent 50%), #0f1c1a",
          }}
        />
        {/* Grille subtile */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Fake navbar */}
        <div className="relative flex items-center justify-between px-3 py-2">
          <div className="text-[8px] font-bold text-white tracking-wider">MARQUE</div>
          <div className="flex gap-2">
            <div className="w-6 h-0.5 bg-white/40 rounded-full" />
            <div className="w-6 h-0.5 bg-white/40 rounded-full" />
            <div className="w-6 h-0.5 bg-white/40 rounded-full" />
          </div>
        </div>
        {/* Hero content */}
        <div className="relative flex flex-col items-center justify-center h-[calc(100%-1.5rem)] px-4 text-center">
          <div className="w-3/4 h-2 bg-white rounded mb-1.5" />
          <div className="w-2/3 h-2 bg-white rounded mb-1.5" />
          <div className="w-1/2 h-1.5 bg-[var(--accent-secondary)] rounded mb-3" />
          <div className="w-4/5 h-1 bg-white/30 rounded mb-1" />
          <div className="w-3/5 h-1 bg-white/30 rounded mb-4" />
          <div className="px-4 py-1.5 rounded-full bg-[var(--accent-secondary)] text-[8px] font-bold text-gray-900">
            Découvrir
          </div>
        </div>
        {/* Orbes flottantes */}
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[var(--accent-secondary)] opacity-60 blur-sm animate-float-slow" />
        <div className="absolute bottom-8 left-6 w-4 h-4 rounded-full bg-[var(--accent-pale)] opacity-50 blur-sm animate-float-slower" />
      </div>
    </div>
  );
}

// ─── Données des 3 piliers ─────────────────────────────

const pillars = [
  {
    key: "pilier1" as const,
    label: "PILIER 01",
    title: "Applications web sur mesure",
    description:
      "Des outils taillés pour votre métier. Pas un Wix bricolé, pas un ERP surdimensionné. Du sur-mesure qui vous ressemble.",
    cta: "Découvrir",
    mockup: DashboardMockup,
  },
  {
    key: "pilier2" as const,
    label: "PILIER 02",
    title: "Automatisations intelligentes",
    subtitle: "Pour vous, et pour vos clients.",
    description:
      "Une IA qui répond à vos appels et trie vos mails. Une carte de fidélité qui vit dans le téléphone de vos clients. Le même fil rouge : tout ce qui peut tourner tout seul, tourne tout seul.",
    cta: "Explorer",
    mockup: AutomationFlowMockup,
  },
  {
    key: "pilier3" as const,
    label: "PILIER 03",
    title: "Sites vitrines haut de gamme",
    description:
      "Votre première impression en ligne. Sites sur mesure avec animations 3D, performance irréprochable, et identité qu'on ne confond avec personne d'autre.",
    cta: "Visiter",
    mockup: SitePreviewMockup,
  },
];

type ModalKey = "pilier1" | "pilier2" | "pilier3" | null;

export default function Services() {
  const [openModal, setOpenModal] = useState<ModalKey>(null);

  return (
    <section
      id="services"
      className="relative bg-[var(--dark-panel)] py-32 md:py-40 overflow-hidden"
    >
      {/* Mesh gradient interne */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, var(--accent-secondary) 0%, transparent 50%)",
        }}
      />

      {/* Grille fine overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Contenu centré */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Label éditorial */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[var(--accent-secondary)] tracking-[0.2em] uppercase">
            <span className="w-8 h-px bg-[var(--accent-secondary)]" />
            Nos trois piliers
            <span className="w-8 h-px bg-[var(--accent-secondary)]" />
          </span>
        </motion.div>

        {/* Titre */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, amount: 0.4 }}
        >
          Arrêtez de bricoler.
          <br />
          On construit pour vous.
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mx-auto mb-20 mt-6 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          On fait trois choses. On les fait bien. Le reste, on vous laisse
          chercher ailleurs.
        </motion.p>

        {/* Grille 3 blocs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, idx) => {
            const Mockup = pillar.mockup;
            return (
              <motion.div
                key={pillar.key}
                className="relative rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-[var(--accent-primary-30)] hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: idx * 0.12 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="text-xs font-medium text-[var(--accent-secondary)] tracking-widest uppercase mb-4">
                  {pillar.label}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {pillar.title}
                </h3>
                {'subtitle' in pillar && pillar.subtitle && (
                  <p className="text-base font-semibold text-[var(--accent-primary)] mb-3">
                    {pillar.subtitle}
                  </p>
                )}
                <p className="text-sm text-gray-400 leading-relaxed mb-8">
                  {pillar.description}
                </p>
                <Mockup />
                <button
                  onClick={() => setOpenModal(pillar.key)}
                  className="inline-flex items-center gap-1 text-[var(--accent-secondary)] font-medium text-sm mt-8 transition-all duration-200 hover:text-[var(--accent-pale)] hover:gap-2"
                >
                  {pillar.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bande indicateurs — 3 colonnes */}
        <motion.div
          className="mt-24 pt-16 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
            {indicators.map((ind) => (
              <div key={ind.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {ind.value}
                </div>
                <div className="text-xs text-gray-400 tracking-wide uppercase">
                  {ind.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bandeau CTA final */}
        <motion.div
          className="mt-24 pt-12 border-t border-white/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Pas sûr duquel vous avez besoin ?
            <br />
            <span className="text-white font-semibold">
              On vous le dit en 15 minutes, gratuitement.
            </span>
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-primary)] text-white font-medium text-sm transition-all duration-200 hover:bg-[var(--accent-hover)] hover:gap-3"
          >
            Prendre 15 minutes
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Modals piliers */}
      <AnimatePresence>
        {openModal === "pilier1" && (
          <PillarModal
            isOpen
            onClose={() => setOpenModal(null)}
            label="PILIER 01"
            title="Applications web sur mesure"
            tagline="Des outils pensés pour votre quotidien, pas pour un webinar de la Silicon Valley."
            deliverables={[
              "Interface custom à votre image, pas un thème WordPress recyclé",
              "Base de données structurée pour vos vrais cas d'usage",
              "Connexion à vos outils existants (Excel, Google, caisse, etc.)",
              "Accès multi-utilisateurs avec niveaux de permissions",
              "Hébergement sécurisé en Suisse ou en Europe",
              "Formation de votre équipe incluse",
            ]}
            examples={[
              { sector: "Restaurant gastronomique", result: "Réservations en ligne + gestion cuisine + stock fournisseurs" },
              { sector: "Cabinet médical", result: "Prise de RDV + dossiers patients + rappels automatiques" },
              { sector: "PME import-export", result: "Suivi commandes + facturation + tableau de bord dirigeant" },
            ]}
            timeline="À définir ensemble"
            startingPrice="Sur devis"
          />
        )}
        {openModal === "pilier2" && (
          <PillarModal
            isOpen
            onClose={() => setOpenModal(null)}
            label="PILIER 02"
            title="Automatisations intelligentes"
            tagline="Pour vous, et pour vos clients. Tout ce qui peut tourner tout seul, tourne tout seul."
            deliverables={[
              "IA qui répond à vos appels et transfère les urgences",
              "IA qui trie vos emails et répond aux questions courantes",
              "Cartes de fidélité dans Apple Wallet et Google Wallet",
              "Rappels automatiques par SMS, email ou notification",
              "Génération automatique de devis et factures",
              "Connexion avec vos outils existants (agenda, comptabilité, CRM)",
            ]}
            examples={[
              { sector: "Restaurant", result: "Carte de fidélité Wallet + rappels de réservation SMS — 40% de clients récurrents en plus" },
              { sector: "Cabinet d'avocats", result: "IA qui répond aux appels en audience + tri intelligent des mails — zéro appel raté" },
              { sector: "Salon de coiffure", result: "Réservation 24/7 + rappels SMS + carte fidélité Wallet — 12h/semaine récupérées" },
            ]}
            timeline="À définir ensemble"
            startingPrice="Sur devis"
          />
        )}
        {openModal === "pilier3" && (
          <PillarModal
            isOpen
            onClose={() => setOpenModal(null)}
            label="PILIER 03"
            title="Sites vitrines haut de gamme"
            tagline="Votre vitrine en ligne ne devrait pas ressembler à celle de votre concurrent. Elle devrait raconter votre histoire."
            deliverables={[
              "Design sur mesure, pas un template Wix recyclé",
              "Animations 3D et interactions immersives façon Stripe/Linear",
              "Score Lighthouse > 90 garanti (rapidité, SEO, accessibilité)",
              "Responsive parfait du smartphone au 4K",
              "Optimisation SEO locale (Suisse romande)",
              "Intégration formulaires, prise de RDV, newsletter",
            ]}
            examples={[
              { sector: "Hôtel boutique 4 étoiles", result: "Site immersif + réservation directe + visite virtuelle" },
              { sector: "Restaurant gastronomique", result: "Carte animée + réservation + story chef en 3D" },
              { sector: "Cabinet d'architectes", result: "Portfolio interactif + visite des projets en 3D" },
            ]}
            timeline="À définir ensemble"
            startingPrice="Sur devis"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
