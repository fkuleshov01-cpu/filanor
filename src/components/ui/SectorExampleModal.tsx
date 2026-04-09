"use client";

import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface Sector {
  id: string;
  label: string;
  tagline: string;
  timeSaved: string;
  example: {
    before: string;
    after: string;
    result: string;
  };
}

interface Props {
  sector: Sector;
  onClose: () => void;
}

export default function SectorExampleModal({ sector, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sector-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--dark-panel)] rounded-2xl border border-[var(--accent-primary-30)] shadow-2xl pointer-events-auto scrollbar-thin-teal"
          style={{
            boxShadow: "0 0 80px -20px rgba(20, 184, 166, 0.4)",
          }}
        >
          {/* Bouton close */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors z-10"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Colonne gauche : contenu texte */}
            <div className="p-8 md:p-10">
              {/* Label */}
              <div className="text-[10px] font-medium text-[var(--accent-light)] tracking-widest uppercase mb-3">
                {sector.label}
              </div>

              {/* Titre */}
              <h2
                id="sector-modal-title"
                className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight"
              >
                {sector.tagline}
              </h2>

              {/* Avant */}
              <div className="mb-5">
                <div className="text-[10px] font-semibold text-red-400 tracking-widest uppercase mb-2">
                  Avant
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {sector.example.before}
                </p>
              </div>

              {/* Séparateur avec flèche */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Après */}
              <div className="mb-6">
                <div className="text-[10px] font-semibold text-[var(--accent-light)] tracking-widest uppercase mb-2">
                  Après
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {sector.example.after}
                </p>
              </div>

              {/* Résultat */}
              <div className="pt-5 border-t border-white/10">
                <div className="text-[10px] font-semibold text-[var(--accent-light)] tracking-widest uppercase mb-2">
                  Résultat
                </div>
                <p className="text-base font-bold text-white leading-snug">
                  {sector.example.result}
                </p>
              </div>
            </div>

            {/* Colonne droite : mockup CSS */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/10 min-h-[400px]">
              <SectorMockup sectorId={sector.id} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ═══════════════════════════════════════
   8 Mockups CSS spécifiques par secteur
   ═══════════════════════════════════════ */

function SectorMockup({ sectorId }: { sectorId: string }) {
  switch (sectorId) {
    case "coiffure":
      return <CoiffureMockup />;
    case "restaurant":
      return <RestaurantMockup />;
    case "hotel":
      return <HotelMockup />;
    case "flotte":
      return <FlotteMockup />;
    case "immobilier":
      return <ImmobilierMockup />;
    case "avocat":
      return <AvocatMockup />;
    case "dentiste":
      return <DentisteMockup />;
    case "coach":
      return <CoachMockup />;
    default:
      return null;
  }
}

/* --- Wrapper commun --- */
function MockupShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-xl bg-gray-950 border border-white/10 overflow-hidden">
      {children}
    </div>
  );
}

function MockupHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
      <span className="text-xs font-semibold text-white">{title}</span>
      {badge && (
        <span className="text-[9px] font-medium text-[var(--accent-light)] bg-[var(--accent-primary-20)] px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}

/* 1. Coiffure — Agenda hebdo */
function CoiffureMockup() {
  const jours = ["L", "M", "M", "J", "V", "S", "D"];
  const slots = [
    ["09:00 Marie", "", "10:00 Léa", "09:30 Julie", "", "09:00 Anna", ""],
    ["", "11:00 Chloé", "", "11:30 Sophie", "10:00 Lina", "11:00 Clara", ""],
    ["14:00 Emma", "14:30 Sara", "15:00 Nina", "", "14:00 Jade", "", ""],
    ["", "", "17:00 Mia", "16:30 Alice", "16:00 Lou", "15:00 Léna", ""],
  ];

  return (
    <MockupShell>
      <MockupHeader title="Agenda" badge="Semaine 46" />
      <div className="p-3">
        {/* Jours */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {jours.map((j, i) => (
            <div
              key={i}
              className="text-[8px] font-medium text-gray-500 text-center"
            >
              {j}
            </div>
          ))}
        </div>
        {/* Créneaux */}
        {slots.map((row, ri) => (
          <div key={ri} className="grid grid-cols-7 gap-1 mb-1">
            {row.map((slot, ci) => (
              <div
                key={ci}
                className={`h-7 rounded text-[7px] flex items-center justify-center truncate px-0.5 ${
                  slot
                    ? "bg-[var(--accent-primary-20)] text-[var(--accent-light)] border border-[var(--accent-primary-30)]"
                    : "bg-white/5"
                }`}
              >
                {slot && slot.split(" ").slice(1).join(" ")}
              </div>
            ))}
          </div>
        ))}
        {/* Bouton */}
        <div className="mt-3 flex justify-end">
          <div className="text-[9px] font-medium text-[var(--accent-light)] bg-[var(--accent-primary)] px-3 py-1.5 rounded-lg">
            + Nouvelle résa
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

/* 2. Restaurant — Plan de salle + fidélité */
function RestaurantMockup() {
  const tables = [
    { x: 15, y: 15, w: 22, h: 22, round: true, status: "occupied" },
    { x: 50, y: 10, w: 28, h: 18, round: false, status: "occupied" },
    { x: 85, y: 20, w: 22, h: 22, round: true, status: "free" },
    { x: 20, y: 50, w: 28, h: 18, round: false, status: "occupied" },
    { x: 55, y: 48, w: 22, h: 22, round: true, status: "reserved" },
    { x: 85, y: 55, w: 22, h: 22, round: true, status: "free" },
    { x: 15, y: 80, w: 22, h: 22, round: true, status: "occupied" },
    { x: 52, y: 82, w: 28, h: 18, round: false, status: "free" },
    { x: 85, y: 85, w: 22, h: 22, round: true, status: "free" },
  ];

  const statusColors: Record<string, string> = {
    occupied: "bg-[var(--accent-primary)]",
    free: "bg-gray-700",
    reserved: "bg-yellow-600",
  };

  return (
    <MockupShell>
      <MockupHeader title="Plan de salle" badge="4/9 occupées" />
      <div className="p-3">
        {/* Plan de salle */}
        <div className="relative w-full h-32 bg-gray-900 rounded-lg mb-3">
          {tables.map((t, i) => (
            <div
              key={i}
              className={`absolute ${statusColors[t.status]} ${
                t.round ? "rounded-full" : "rounded"
              }`}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: `${t.w}px`,
                height: `${t.h}px`,
                transform: "translate(-50%, -50%)",
                opacity: t.status === "free" ? 0.4 : 0.9,
              }}
            />
          ))}
          <div className="absolute bottom-1 right-2 flex items-center gap-2">
            {[
              { color: "bg-[var(--accent-primary)]", label: "Occupée" },
              { color: "bg-yellow-600", label: "Réservée" },
              { color: "bg-gray-700", label: "Libre" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${l.color}`} />
                <span className="text-[7px] text-gray-500">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Carte fidélité Apple Wallet */}
        <div className="bg-gray-900 rounded-xl p-3 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-semibold text-white">
              Ristorante Bella
            </span>
            <span className="text-[8px] text-gray-500">Apple Wallet</span>
          </div>
          <div className="flex gap-1 mb-1.5">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < 7
                    ? "bg-[var(--accent-primary)]"
                    : "bg-gray-700 border border-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-[8px] text-gray-400">
            7/10 plats &mdash; prochain gratuit
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

/* 3. Hôtel — Dashboard + IA conciergerie */
function HotelMockup() {
  return (
    <MockupShell>
      <MockupHeader title="Hôtel Le Lac" badge="En ligne" />
      <div className="p-3">
        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: "Occupation", value: "87%" },
            { label: "Avis", value: "4.7 \u2605" },
            { label: "Messages", value: "3" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/5 rounded-lg p-2 text-center"
            >
              <div className="text-[9px] text-gray-500 mb-0.5">{s.label}</div>
              <div className="text-xs font-bold text-white">{s.value}</div>
            </div>
          ))}
        </div>
        {/* Fil de conversation IA */}
        <div className="space-y-2">
          <div className="flex justify-end">
            <div className="bg-white/10 rounded-lg rounded-br-sm px-3 py-1.5 max-w-[75%]">
              <span className="text-[10px] text-gray-300">
                Breakfast hours?
              </span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-[var(--accent-primary-20)] border border-[var(--accent-primary-30)] rounded-lg rounded-bl-sm px-3 py-1.5 max-w-[80%]">
              <span className="text-[10px] text-[var(--accent-light)]">
                Breakfast is served 7-10am in the main hall
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-white/10 rounded-lg rounded-br-sm px-3 py-1.5 max-w-[75%]">
              <span className="text-[10px] text-gray-300">
                Pouvez-vous réserver un taxi pour demain ?
              </span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-[var(--accent-primary-20)] border border-[var(--accent-primary-30)] rounded-lg rounded-bl-sm px-3 py-1.5 max-w-[80%]">
              <span className="text-[10px] text-[var(--accent-light)]">
                Bien sûr ! Taxi réservé demain 8h à la réception.
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <span className="text-[8px] font-medium text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
            IA &middot; 4 langues &middot; 24/7
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

/* 4. Flotte — Dashboard Manager */
function FlotteMockup() {
  const alerts = [
    { initials: "ML", name: "Marc L.", issue: "2 annulations cette semaine", severity: "warning" as const },
    { initials: "JB", name: "Julien B.", issue: "TPH en baisse (\u221218%)", severity: "warning" as const },
    { initials: "AK", name: "Ahmed K.", issue: "Désisté du shift de 18h", severity: "danger" as const },
  ];

  return (
    <div className="w-full bg-gray-950 rounded-xl border border-white/10 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <div className="text-[10px] text-[var(--accent-light)] tracking-widest uppercase font-semibold">
            Dashboard Manager
          </div>
          <div className="text-xs text-white font-medium mt-0.5">
            Mardi 12 novembre
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span className="text-[9px] text-[var(--accent-light)] font-medium">
            Live
          </span>
        </div>
      </div>

      {/* 4 KPIs */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-[var(--accent-primary-10)] border border-[var(--accent-primary-20)] rounded-md p-2">
          <div className="text-[8px] text-gray-400 uppercase tracking-wider font-medium">
            En ligne
          </div>
          <div className="text-base font-bold text-white mt-0.5">23</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-md p-2">
          <div className="text-[8px] text-gray-400 uppercase tracking-wider font-medium">
            Shifts jour
          </div>
          <div className="text-base font-bold text-white mt-0.5">47</div>
        </div>
        <div className="bg-[var(--accent-primary-10)] border border-[var(--accent-primary-20)] rounded-md p-2">
          <div className="text-[8px] text-gray-400 uppercase tracking-wider font-medium">
            Couverture
          </div>
          <div className="text-base font-bold text-[var(--accent-light)] mt-0.5">
            96%
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-md p-2">
          <div className="text-[8px] text-red-300 uppercase tracking-wider font-medium">
            Urgents
          </div>
          <div className="text-base font-bold text-red-400 mt-0.5">2</div>
        </div>
      </div>

      {/* Livreurs à surveiller */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">
            Livreurs à surveiller
          </div>
          <div className="text-[9px] text-[var(--accent-light)] font-medium">
            Voir tout &rarr;
          </div>
        </div>
        <div className="space-y-1.5">
          {alerts.map((driver, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-1.5 rounded-md bg-white/5 border border-white/10"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 ${
                  driver.severity === "danger" ? "bg-red-500" : "bg-yellow-600"
                }`}
              >
                {driver.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold text-white truncate">
                  {driver.name}
                </div>
                <div
                  className={`text-[9px] truncate ${
                    driver.severity === "danger"
                      ? "text-red-400"
                      : "text-yellow-500"
                  }`}
                >
                  {driver.issue}
                </div>
              </div>
              <div className="text-[9px] text-gray-400 font-medium shrink-0">
                Voir
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer : bourse de shifts */}
      <div className="pt-2 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
            <span className="text-[9px] text-gray-400 font-medium">
              Bourse de shifts :{" "}
              <span className="text-white font-semibold">3 dispos</span>
            </span>
          </div>
          <span className="text-[9px] text-[var(--accent-light)] font-medium">
            Publier &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}

/* 5. Immobilier — Inbox classée IA */
function ImmobilierMockup() {
  const leads = [
    { name: "Sophie Morel", subject: "Appartement 3.5p Pully - visite ?", badge: "CHAUD", badgeColor: "bg-red-500/20 text-red-400 border-red-500/30" },
    { name: "Jean Favre", subject: "Budget pour villa Lutry", badge: "CHAUD", badgeColor: "bg-red-500/20 text-red-400 border-red-500/30" },
    { name: "Marc Dupont", subject: "Recherche studio étudiant", badge: "TIÈDE", badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    { name: "Anna Weber", subject: "Infos sur le quartier Flon", badge: "FROID", badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  ];

  return (
    <MockupShell>
      <MockupHeader title="Inbox leads" />
      <div className="p-3">
        {/* Bulle IA */}
        <div className="bg-[var(--accent-primary-20)] border border-[var(--accent-primary-30)] rounded-lg px-3 py-2 mb-3 text-center">
          <span className="text-[9px] text-[var(--accent-light)]">
            IA a répondu à 47 emails aujourd&apos;hui
          </span>
        </div>
        {/* Liste emails */}
        <div className="space-y-1.5">
          {leads.map((lead) => (
            <div
              key={lead.name}
              className="flex items-center gap-2 bg-white/5 rounded-lg p-2"
            >
              <span
                className={`text-[7px] font-bold px-1.5 py-0.5 rounded border ${lead.badgeColor}`}
              >
                {lead.badge}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-semibold text-white truncate">
                  {lead.name}
                </div>
                <div className="text-[8px] text-gray-400 truncate">
                  {lead.subject}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* 6. Avocat — Journal d'appels IA */
function AvocatMockup() {
  const appels = [
    { name: "M. Rochat", time: "14:32", badge: "Pris par IA", teal: true },
    { name: "Tribunal Lausanne", time: "14:18", badge: "Urgence \u2192 vous", teal: false },
    { name: "Mme Favre", time: "13:45", badge: "Pris par IA", teal: true },
    { name: "Notaire Blanc", time: "11:20", badge: "Pris par IA", teal: true },
  ];

  return (
    <MockupShell>
      <MockupHeader title="Appels" badge="IA active" />
      <div className="p-3">
        {/* Compteur temps */}
        <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 mb-3">
          <div>
            <div className="text-[8px] text-gray-500">Temps tracké</div>
            <div className="text-sm font-bold text-white tabular-nums">
              2h 45min
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[var(--accent-primary-20)] border border-[var(--accent-primary-30)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-[var(--accent-light)]" />
          </div>
        </div>
        {/* Liste appels */}
        <div className="space-y-1.5">
          {appels.map((a) => (
            <div
              key={a.name + a.time}
              className="flex items-center gap-2 bg-white/5 rounded-lg p-2"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 16 16"
                  className="w-3 h-3 text-gray-400"
                  fill="currentColor"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-semibold text-white truncate">
                    {a.name}
                  </span>
                  <span className="text-[8px] text-gray-500">{a.time}</span>
                </div>
              </div>
              <span
                className={`text-[7px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap ${
                  a.teal
                    ? "bg-[var(--accent-primary-20)] text-[var(--accent-light)] border-[var(--accent-primary-30)]"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                }`}
              >
                {a.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* 7. Dentiste — Agenda multi-praticiens */
function DentisteMockup() {
  const slotsMartin = [
    { time: "08:00", label: "Contrôle auto", type: "auto" },
    { time: "09:00", label: "Nouveau patient", type: "new" },
    { time: "10:30", label: "Détartrage", type: "auto" },
    { time: "14:00", label: "Contrôle auto", type: "auto" },
    { time: "15:30", label: "Couronne", type: "new" },
  ];
  const slotsDupuis = [
    { time: "08:30", label: "Extraction", type: "new" },
    { time: "10:00", label: "Contrôle auto", type: "auto" },
    { time: "11:00", label: "Blanchiment", type: "new" },
    { time: "14:30", label: "Contrôle auto", type: "auto" },
    { time: "16:00", label: "Nouveau patient", type: "new" },
  ];

  return (
    <MockupShell>
      <MockupHeader title="Agenda" badge="Dr. Martin & Dr. Dupuis" />
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Dr. Martin", slots: slotsMartin },
            { name: "Dr. Dupuis", slots: slotsDupuis },
          ].map((doc) => (
            <div key={doc.name}>
              <div className="text-[8px] font-semibold text-gray-400 mb-1.5 text-center">
                {doc.name}
              </div>
              <div className="space-y-1">
                {doc.slots.map((s) => (
                  <div
                    key={s.time + s.label}
                    className={`rounded px-2 py-1.5 ${
                      s.type === "auto"
                        ? "bg-[var(--accent-primary-20)] border border-[var(--accent-primary-30)]"
                        : "bg-[var(--accent-primary)] bg-opacity-40 border border-[var(--accent-primary)]"
                    }`}
                  >
                    <div className="text-[7px] text-gray-400">{s.time}</div>
                    <div
                      className={`text-[8px] font-medium ${
                        s.type === "auto"
                          ? "text-[var(--accent-light)]"
                          : "text-white"
                      }`}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Bouton facturation */}
        <div className="mt-3 flex justify-center">
          <div className="text-[9px] font-medium text-[var(--accent-light)] bg-[var(--accent-primary)] px-3 py-1.5 rounded-lg">
            Facture TARMED +
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

/* 8. Coach — Planning cours */
function CoachMockup() {
  const cours = [
    { name: "Yoga Flow", time: "07:30", current: 8, max: 12 },
    { name: "Pilates", time: "09:00", current: 12, max: 12 },
    { name: "Cardio HIIT", time: "12:15", current: 5, max: 10 },
    { name: "Stretch & Relax", time: "18:00", current: 9, max: 15 },
  ];

  return (
    <MockupShell>
      <MockupHeader title="Cours de la semaine" />
      <div className="p-3 space-y-2">
        {cours.map((c) => {
          const pct = Math.round((c.current / c.max) * 100);
          const full = c.current === c.max;
          return (
            <div key={c.name} className="bg-white/5 rounded-lg p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className="text-[10px] font-semibold text-white">
                    {c.name}
                  </span>
                  <span className="text-[8px] text-gray-500 ml-2">
                    {c.time}
                  </span>
                </div>
                <span
                  className={`text-[8px] font-bold ${
                    full ? "text-red-400" : "text-[var(--accent-light)]"
                  }`}
                >
                  {c.current}/{c.max}
                </span>
              </div>
              {/* Barre de remplissage */}
              <div className="w-full h-1.5 rounded-full bg-gray-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    full ? "bg-red-500" : "bg-[var(--accent-primary)]"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
        {/* Badge abonnements */}
        <div className="mt-2 flex justify-center">
          <span className="text-[8px] font-medium text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            24 abonnements récurrents actifs
          </span>
        </div>
      </div>
    </MockupShell>
  );
}
