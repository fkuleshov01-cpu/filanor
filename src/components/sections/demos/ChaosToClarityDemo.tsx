"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Home,
  Calendar,
  MessageSquare,
  Receipt,
  BarChart3,
  RotateCcw,
  Bell,
  Plus,
  Send,
  TrendingUp,
  Check,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────

type ChaosItemType =
  | "postit"
  | "paper"
  | "excel"
  | "sms"
  | "facture"
  | "email"
  | "calendar";

interface ChaosItem {
  type: ChaosItemType;
  text: string;
  x: number;
  y: number;
  rotate: number;
  color?: string;
  targetX: number;
  targetY: number;
  targetZone: "notifications" | "agenda" | "tableau" | "messages" | "facturation";
}

type Phase = "chaos" | "align" | "desaturate" | "migrate" | "solidify" | "finale";
type ViewId = "home" | "agenda" | "messages" | "facturation" | "stats";

interface Message {
  from: "me" | "them";
  text: string;
  time: string;
}

type StatsPeriod = "7j" | "30j" | "90j";

// ─── Helpers ─────────────────────────────────────────────

function formatCHF(n: number): string {
  return n.toLocaleString("fr-CH").replace(/[\s\u202f]/g, "\u2019");
}

function nowTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// ─── Données statiques ───────────────────────────────────

const chaosItems: ChaosItem[] = [
  { type: "postit", text: "Rappeler M. Dupont", x: 8, y: 12, rotate: -6, color: "yellow", targetX: 72, targetY: 5, targetZone: "notifications" },
  { type: "postit", text: "3 appels manqués", x: 28, y: 6, rotate: 4, color: "pink", targetX: 72, targetY: 18, targetZone: "notifications" },
  { type: "postit", text: "Annuler RDV Jean", x: 52, y: 15, rotate: -3, color: "orange", targetX: 72, targetY: 31, targetZone: "notifications" },
  { type: "paper", text: "Cahier réservations", x: 12, y: 45, rotate: 2, targetX: 18, targetY: 25, targetZone: "agenda" },
  { type: "excel", text: "Clients_v7.xlsx", x: 38, y: 55, rotate: -4, targetX: 18, targetY: 65, targetZone: "tableau" },
  { type: "sms", text: "SMS : \"Je voudrais...\"", x: 62, y: 40, rotate: 3, targetX: 55, targetY: 25, targetZone: "messages" },
  { type: "facture", text: "Facture #2847", x: 72, y: 65, rotate: -2, targetX: 55, targetY: 65, targetZone: "facturation" },
  { type: "email", text: "RE: RE: FWD: nouvelle demande", x: 18, y: 70, rotate: 1, targetX: 55, targetY: 38, targetZone: "messages" },
  { type: "postit", text: "Commande urgente", x: 48, y: 30, rotate: 5, color: "yellow", targetX: 72, targetY: 44, targetZone: "notifications" },
  { type: "calendar", text: "Juin 2026 (papier)", x: 68, y: 10, rotate: -5, targetX: 18, targetY: 40, targetZone: "agenda" },
];

const menuItems = [
  { id: "home", icon: Home, label: "Accueil" },
  { id: "agenda", icon: Calendar, label: "Agenda" },
  { id: "messages", icon: MessageSquare, label: "Messages" },
  { id: "facturation", icon: Receipt, label: "Facturation" },
  { id: "stats", icon: BarChart3, label: "Statistiques" },
] as const;

const PHASE_TIMINGS: Record<Phase, number> = {
  chaos: 0, align: 0, desaturate: 1000, migrate: 2000, solidify: 3500, finale: 4500,
};
const INTERACTIVE_DELAY = 800;

// ─── Styles chaos ────────────────────────────────────────

const postitColors: Record<string, string> = {
  yellow: "bg-yellow-200 border-yellow-300",
  pink: "bg-pink-200 border-pink-300",
  orange: "bg-orange-200 border-orange-300",
};

function getChaosStyle(item: ChaosItem): string {
  switch (item.type) {
    case "postit": return `${postitColors[item.color ?? "yellow"]} border shadow-md`;
    case "paper": return "bg-white border border-gray-300 shadow-sm";
    case "excel": return "bg-green-100 border border-green-300 shadow-sm";
    case "sms": return "bg-blue-100 border border-blue-300 rounded-2xl shadow-sm";
    case "facture": return "bg-amber-50 border border-amber-200 shadow-sm";
    case "email": return "bg-white border border-gray-200 shadow-sm";
    case "calendar": return "bg-white border border-gray-300 shadow-sm";
    default: return "bg-gray-100 border border-gray-200";
  }
}

function getFinalStyle(): string {
  return "bg-white border border-teal-200 shadow-sm rounded-lg";
}

// ─── Données partagées ───────────────────────────────────

const contactsMap: Record<string, { name: string; initials: string }> = {
  dupont: { name: "M. Dupont", initials: "MD" },
  martin: { name: "Mme Martin", initials: "MM" },
  jean: { name: "Jean L.", initials: "JL" },
  sophie: { name: "Sophie R.", initials: "SR" },
  pierre: { name: "Pierre K.", initials: "PK" },
};

const monthlyData = [
  { month: "Jan", revenue: 9800, expenses: 2800 },
  { month: "Fév", revenue: 10200, expenses: 3100 },
  { month: "Mar", revenue: 11500, expenses: 3200 },
  { month: "Avr", revenue: 12100, expenses: 3400 },
  { month: "Mai", revenue: 11800, expenses: 3100 },
  { month: "Juin", revenue: 13400, expenses: 3500 },
  { month: "Juil", revenue: 12200, expenses: 3200 },
  { month: "Août", revenue: 10900, expenses: 2900 },
  { month: "Sep", revenue: 12700, expenses: 3300 },
  { month: "Oct", revenue: 13100, expenses: 3400 },
  { month: "Nov", revenue: 13710, expenses: 3520 },
  { month: "Déc", revenue: 11180, expenses: 3000 },
];

const monthlySummaries = [
  { encaisse: 7800, attente: 1200, retard: 0, payees: 7 },
  { encaisse: 8500, attente: 1700, retard: 280, payees: 8 },
  { encaisse: 9200, attente: 2300, retard: 0, payees: 9 },
  { encaisse: 10100, attente: 2000, retard: 450, payees: 10 },
  { encaisse: 9800, attente: 2000, retard: 0, payees: 9 },
  { encaisse: 11200, attente: 2200, retard: 320, payees: 11 },
  { encaisse: 10500, attente: 1700, retard: 0, payees: 10 },
  { encaisse: 9100, attente: 1800, retard: 0, payees: 8 },
  { encaisse: 10800, attente: 1900, retard: 280, payees: 10 },
  { encaisse: 11400, attente: 1700, retard: 0, payees: 11 },
  { encaisse: 8250, attente: 2050, retard: 370, payees: 9 },
  { encaisse: 9300, attente: 1880, retard: 0, payees: 9 },
];

const periodData: Record<StatsPeriod, {
  kpi: { revenue: string; newClients: string; satisfaction: string };
  trend: { revenue: string; newClients: string; satisfaction: string };
  subtitle: string;
  chart: { label: string; value: number; revenue: number }[];
  services: { name: string; pct: number }[];
  donut: number;
  sparklines: { revenue: number[]; clients: number[]; satisfaction: number[] };
}> = {
  "7j": {
    kpi: { revenue: "CHF 13\u2019710", newClients: "47", satisfaction: "4.8/5" },
    trend: { revenue: "+23%", newClients: "+12", satisfaction: "+0.2" },
    subtitle: "7 derniers jours",
    chart: [
      { label: "L", value: 65, revenue: 1820 },
      { label: "M", value: 48, revenue: 1340 },
      { label: "M", value: 82, revenue: 2290 },
      { label: "J", value: 71, revenue: 1980 },
      { label: "V", value: 95, revenue: 2650 },
      { label: "S", value: 88, revenue: 2460 },
      { label: "D", value: 42, revenue: 1170 },
    ],
    services: [
      { name: "Consultation", pct: 82 },
      { name: "Installation", pct: 64 },
      { name: "Maintenance", pct: 45 },
    ],
    donut: 65,
    sparklines: {
      revenue: [40, 55, 48, 62, 58, 72, 65],
      clients: [30, 35, 28, 42, 38, 45, 47],
      satisfaction: [78, 80, 82, 85, 84, 88, 94],
    },
  },
  "30j": {
    kpi: { revenue: "CHF 58\u2019420", newClients: "189", satisfaction: "4.7/5" },
    trend: { revenue: "+18%", newClients: "+42", satisfaction: "+0.1" },
    subtitle: "30 derniers jours",
    chart: [
      { label: "S1", value: 68, revenue: 13200 },
      { label: "S2", value: 75, revenue: 14500 },
      { label: "S3", value: 82, revenue: 15800 },
      { label: "S4", value: 79, revenue: 14920 },
    ],
    services: [
      { name: "Consultation", pct: 78 },
      { name: "Installation", pct: 68 },
      { name: "Maintenance", pct: 52 },
    ],
    donut: 62,
    sparklines: {
      revenue: [50, 55, 60, 58, 65, 62, 70],
      clients: [35, 40, 42, 45, 48, 46, 50],
      satisfaction: [80, 82, 81, 84, 83, 86, 88],
    },
  },
  "90j": {
    kpi: { revenue: "CHF 178\u2019340", newClients: "521", satisfaction: "4.8/5" },
    trend: { revenue: "+22%", newClients: "+128", satisfaction: "+0.3" },
    subtitle: "90 derniers jours",
    chart: [
      { label: "Sep", value: 72, revenue: 54200 },
      { label: "Oct", value: 81, revenue: 61400 },
      { label: "Nov", value: 88, revenue: 62740 },
    ],
    services: [
      { name: "Consultation", pct: 85 },
      { name: "Installation", pct: 61 },
      { name: "Maintenance", pct: 48 },
    ],
    donut: 68,
    sparklines: {
      revenue: [45, 52, 58, 60, 65, 68, 75],
      clients: [28, 35, 40, 45, 50, 55, 60],
      satisfaction: [76, 80, 82, 85, 86, 90, 92],
    },
  },
};

// ─── HomeView ────────────────────────────────────────────

function HomeView() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("today");
  const [tasks, setTasks] = useState<string[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);
  const addRef = useRef<HTMLDivElement>(null);

  // Fermer au clic extérieur
  useEffect(() => {
    if (!notifOpen && !addTaskOpen) return;
    const handler = (e: MouseEvent) => {
      if (notifOpen && notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (addTaskOpen && addRef.current && !addRef.current.contains(e.target as Node)) setAddTaskOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen, addTaskOpen]);

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    setTasks((prev) => [...prev, newTaskText.trim()]);
    setNewTaskText("");
    setAddTaskOpen(false);
  };

  const notifications = [
    { icon: Check, text: "Facture #2847 payée", time: "il y a 12min", color: "text-green-500" },
    { icon: MessageSquare, text: "Nouveau message de M. Dupont", time: "il y a 34min", color: "text-[var(--accent-primary)]" },
    { icon: Calendar, text: "RDV de 14h confirmé", time: "il y a 1h", color: "text-[var(--accent-primary)]" },
  ];

  const statsData = [
    { label: "Tâches", value: "12", trend: "+3", sparkline: [40, 50, 45, 60, 55, 70, 65] },
    { label: "Messages", value: "3", trend: "nouveau", sparkline: [20, 30, 25, 40, 35, 30, 45] },
    { label: "À encaisser", value: "CHF 4\u2019820", trend: "+12%", sparkline: [60, 55, 65, 70, 65, 75, 80] },
    { label: "Satisfaction", value: "94%", trend: "+2%", sparkline: [80, 85, 82, 88, 90, 92, 94] },
  ];

  const activities = [
    { text: "Facture #2847 payée", time: "il y a 12min", dot: "green" },
    { text: "Nouveau message Martin", time: "il y a 34min", dot: "teal" },
    { text: "RDV confirmé — Jean L.", time: "il y a 1h", dot: "teal" },
  ];

  return (
    <div className="space-y-5">
      {/* Salutation + actions */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Bonjour, Marie</h3>
          <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
            Mardi 12 novembre — {5 + tasks.length} tâches vous attendent
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Cloche notifications */}
          <div ref={notifRef} className="relative">
            <button
              aria-label="Notifications"
              onClick={() => { setNotifOpen(!notifOpen); setAddTaskOpen(false); }}
              className="w-8 h-8 rounded-lg bg-[rgba(13,148,136,0.1)] flex items-center justify-center text-[var(--accent-primary)] hover:bg-[rgba(13,148,136,0.2)] transition-colors cursor-pointer relative"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[7px] text-white font-bold flex items-center justify-center">3</span>
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-10 w-[260px] bg-white border border-[var(--border-light)] rounded-xl shadow-lg p-3 z-50"
                >
                  <div className="text-[10px] font-semibold text-[var(--text-primary)] mb-2">3 notifications</div>
                  <div className="space-y-2">
                    {notifications.map((n, i) => {
                      const Icon = n.icon;
                      return (
                        <div key={i} className="flex items-start gap-2">
                          <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${n.color}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] text-[var(--text-primary)]">{n.text}</div>
                            <div className="text-[8px] text-[var(--text-secondary)]">{n.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bouton ajouter tâche */}
          <div ref={addRef} className="relative">
            <button
              aria-label="Ajouter une tâche"
              onClick={() => { setAddTaskOpen(!addTaskOpen); setNotifOpen(false); }}
              className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <AnimatePresence>
              {addTaskOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-10 w-[280px] bg-white border border-[var(--border-light)] rounded-xl shadow-lg p-4 z-50"
                >
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-medium mb-2">Nouvelle tâche</div>
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleAddTask(); }}
                    placeholder="Nom de la tâche..."
                    className="w-full text-xs border border-[var(--border-light)] rounded-lg px-2.5 py-1.5 outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                  />
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full text-[10px] border border-[var(--border-light)] rounded-lg px-2 py-1 mt-2 outline-none text-[var(--text-secondary)] bg-white"
                  >
                    <option value="today">Aujourd&apos;hui</option>
                    <option value="week">Cette semaine</option>
                    <option value="later">Plus tard</option>
                  </select>
                  <button
                    onClick={handleAddTask}
                    className="w-full mt-2 bg-[var(--accent-primary)] text-white text-[10px] font-medium rounded-lg py-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Ajouter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 4 stats avec sparklines */}
      <div className="grid grid-cols-4 gap-2.5">
        {statsData.map((stat, i) => (
          <div key={i} className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl p-2.5">
            <div className="flex items-baseline justify-between mb-0.5">
              <div className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-medium">{stat.label}</div>
              <div className="text-[9px] text-[var(--accent-primary)] font-semibold">{stat.trend}</div>
            </div>
            <div className="text-base font-bold text-[var(--text-primary)] mb-1.5">{stat.value}</div>
            <svg viewBox="0 0 80 20" className="w-full h-4" preserveAspectRatio="none">
              <polyline
                points={stat.sparkline.map((v, idx) => `${idx * 13.3},${20 - (v / 100) * 20}`).join(" ")}
                fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Bas en 2 colonnes */}
      <div className="grid grid-cols-3 gap-3">
        {/* Prochain RDV */}
        <div className="col-span-2 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[9px] uppercase tracking-wider text-[var(--accent-primary)] font-semibold">Prochain rendez-vous</div>
            <div className="text-[9px] text-[var(--text-secondary)]">Dans 47 minutes</div>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[rgba(13,148,136,0.15)] flex items-center justify-center text-[var(--accent-primary)] font-bold text-xs shrink-0">MD</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[var(--text-primary)]">M. Dupont</div>
              <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">14h00 — Bureau 2e étage</div>
              <div className="text-[10px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">Renouvellement contrat annuel. Document prêt, signature à récupérer.</div>
            </div>
          </div>
        </div>
        {/* Activité */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl p-3.5">
          <div className="text-[9px] uppercase tracking-wider text-[var(--accent-primary)] font-semibold mb-2.5">Activité</div>
          <div className="space-y-2">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${a.dot === "green" ? "bg-green-500" : "bg-[var(--accent-primary)]"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-[var(--text-primary)] leading-tight">{a.text}</div>
                  <div className="text-[8px] text-[var(--text-secondary)] mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tâches ajoutées par l'utilisateur */}
      {tasks.length > 0 && (
        <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-xl p-3.5">
          <div className="text-[9px] uppercase tracking-wider text-[var(--accent-primary)] font-semibold mb-2">
            Mes tâches ({tasks.length})
          </div>
          <div className="space-y-1.5">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-[var(--text-primary)]">
                <div className="w-3.5 h-3.5 rounded border border-[var(--accent-primary)] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[var(--accent-primary)] opacity-0 hover:opacity-100 transition-opacity" />
                </div>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AgendaView ──────────────────────────────────────────

function AgendaView() {
  const [agendaView, setAgendaView] = useState<"jour" | "semaine" | "mois">("semaine");

  const miniStats = [
    { label: "Cette semaine", value: "14", sub: "rendez-vous" },
    { label: "Confirmés", value: "11", sub: "3 en attente" },
    { label: "Taux présence", value: "92%", sub: "+4% vs sem. dernière" },
  ];

  return (
    <div className="space-y-4">
      {/* Header + filtres fonctionnels */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Agenda</h3>
          <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
            {agendaView === "jour" ? "Mardi 12 novembre" : agendaView === "semaine" ? "Semaine 46 — 12 au 18 novembre" : "Novembre 2026"}
          </p>
        </div>
        <div className="flex gap-1">
          {(["jour", "semaine", "mois"] as const).map((f) => (
            <button
              key={f}
              aria-label={`Vue ${f}`}
              onClick={() => setAgendaView(f)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                agendaView === f ? "bg-[var(--accent-primary)] text-white" : "text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {miniStats.map((s, i) => (
          <div key={i} className="bg-[rgba(13,148,136,0.06)] border border-[rgba(13,148,136,0.1)] rounded-lg p-2.5">
            <div className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">{s.label}</div>
            <div className="text-xl font-bold text-[var(--text-primary)] mt-0.5">{s.value}</div>
            <div className="text-[9px] text-[var(--text-secondary)] mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Contenu dynamique selon la vue */}
      <AnimatePresence mode="wait">
        <motion.div
          key={agendaView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {agendaView === "jour" && <AgendaDayLayout />}
          {agendaView === "semaine" && <AgendaWeekLayout />}
          {agendaView === "mois" && <AgendaMonthLayout />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Vue Jour — grille alignée heure / événement
function AgendaDayLayout() {
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const dayEvents = [
    { startHour: 10, duration: 1, time: "10h00 — 11h00", title: "Livraison stock", location: "Entrepôt", status: "confirmé" as const },
    { startHour: 14, duration: 1, time: "14h00 — 15h00", title: "RDV M. Dupont", location: "Bureau 2e", status: "confirmé" as const },
    { startHour: 16, duration: 0.5, time: "16h00 — 16h30", title: "Appel Mme Martin", location: "Téléphone", status: "en attente" as const },
  ];

  return (
    <div className="border border-[var(--border-light)] rounded-lg overflow-hidden max-h-[260px] overflow-y-auto scrollbar-thin-teal">
      {hours.map((hour) => {
        const eventsThisHour = dayEvents.filter((e) => e.startHour === hour);
        return (
          <div
            key={hour}
            className="grid grid-cols-[60px_1fr] min-h-[48px] border-b border-[var(--border-light)] last:border-b-0"
          >
            {/* Colonne heure */}
            <div className="flex items-start justify-end pr-3 pt-2 bg-[var(--bg-secondary)]">
              <span className="text-xs font-semibold text-[var(--text-secondary)]">{hour}h</span>
            </div>
            {/* Colonne événement */}
            <div className="p-1">
              {eventsThisHour.map((ev, i) => (
                <div
                  key={i}
                  className={`rounded-md px-3 py-2 border-l-2 ${
                    ev.status === "confirmé"
                      ? "bg-[rgba(13,148,136,0.1)] border-[var(--accent-primary)]"
                      : "bg-yellow-50 border-yellow-400"
                  }`}
                  style={{ minHeight: `${ev.duration * 44}px` }}
                >
                  <div className="text-[10px] font-semibold text-[var(--text-secondary)]">{ev.time}</div>
                  <div className="text-xs font-semibold text-[var(--text-primary)] mt-0.5">{ev.title}</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">{ev.location}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Vue Semaine — grille lisible avec heures
function AgendaWeekLayout() {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const weekEvents = [
    { day: 0, title: "Livraison stock", time: "10h", color: "teal" },
    { day: 0, title: "RDV Dupont", time: "14h", color: "teal" },
    { day: 1, title: "Réunion", time: "09h", color: "teal" },
    { day: 2, title: "Appel Martin", time: "16h", color: "yellow" },
    { day: 2, title: "Formation", time: "10h", color: "teal" },
    { day: 3, title: "Réunion équipe", time: "09h", color: "teal" },
    { day: 4, title: "Présentation", time: "15h", color: "teal" },
    { day: 4, title: "Devis Pierre", time: "11h", color: "teal" },
    { day: 5, title: "Inventaire", time: "09h", color: "teal" },
  ];

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {days.map((d, dayIdx) => (
        <div key={d}>
          {/* En-tête jour */}
          <div className={`text-xs font-semibold text-center py-1.5 rounded-md mb-1.5 ${
            dayIdx === 0
              ? "bg-[var(--accent-primary)] text-white"
              : "text-[var(--text-primary)] bg-[var(--bg-secondary)]"
          }`}>
            {d}
          </div>
          {/* Événements du jour */}
          <div className="space-y-1 min-h-[100px]">
            {weekEvents
              .filter((e) => e.day === dayIdx)
              .map((ev, i) => (
                <div
                  key={i}
                  className={`min-h-[44px] px-2 py-1.5 rounded-md border-l-2 cursor-default transition-colors ${
                    ev.color === "yellow"
                      ? "bg-yellow-50 border-yellow-400 hover:bg-yellow-100"
                      : "bg-[rgba(13,148,136,0.08)] border-[var(--accent-primary)] hover:bg-[rgba(13,148,136,0.15)]"
                  }`}
                >
                  <div className={`text-[11px] font-semibold ${
                    ev.color === "yellow" ? "text-yellow-700" : "text-[var(--accent-primary)]"
                  }`}>{ev.time}</div>
                  <div className="text-xs font-semibold text-[var(--text-primary)] leading-tight mt-0.5 line-clamp-2">
                    {ev.title}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Vue Mois — calendrier avec mini-barres d'événements
function AgendaMonthLayout() {
  const dayHeaders = ["L", "M", "M", "J", "V", "S", "D"];
  // Novembre 2026 commence un dimanche → offset 6 en Mon-start
  const novDays = [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 0, 0, 0, 0, 0, 0];

  // Événements par jour avec titres
  const dayEvents: Record<number, string[]> = {
    3: ["Appel fournisseur"],
    5: ["Livraison", "Compta"],
    8: ["RDV Martin"],
    12: ["RDV Dupont", "Livraison stock", "Appel Martin"],
    14: ["Devis client"],
    17: ["Réunion équipe", "Formation"],
    19: ["Visite terrain"],
    22: ["Présentation", "Rappel Jean"],
    25: ["Inventaire"],
    28: ["Bilan mensuel"],
  };

  return (
    <div>
      {/* En-têtes jours */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayHeaders.map((d, i) => (
          <div key={i} className="text-sm text-center text-[var(--text-secondary)] font-semibold uppercase tracking-wider">{d}</div>
        ))}
      </div>
      {/* Grille */}
      <div className="grid grid-cols-7 gap-1">
        {novDays.map((day, i) => {
          const events = day > 0 ? dayEvents[day] ?? [] : [];
          const isToday = day === 12;
          return (
            <div
              key={i}
              className={`rounded-md p-2 min-h-[85px] flex flex-col transition-colors ${
                day === 0
                  ? ""
                  : isToday
                    ? "bg-[var(--accent-primary)] text-white"
                    : "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-teal-50 border border-transparent hover:border-teal-200 cursor-default"
              }`}
            >
              {day > 0 && (
                <>
                  <span className={`text-sm font-semibold leading-none ${isToday ? "text-white" : "text-[var(--text-primary)]"}`}>{day}</span>
                  <div className="mt-1 space-y-1 flex-1">
                    {events.slice(0, 2).map((ev, j) => (
                      <div
                        key={j}
                        className={`h-[18px] rounded-sm px-2 py-0.5 flex items-center ${
                          isToday
                            ? "bg-white/20 border-l-2 border-white/60"
                            : "bg-[rgba(13,148,136,0.08)] border-l-2 border-[var(--accent-primary)]"
                        }`}
                      >
                        <span className={`text-[10px] font-medium truncate ${isToday ? "text-white" : "text-[var(--text-primary)]"}`}>{ev}</span>
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className={`text-[10px] pl-1 ${isToday ? "text-white/70" : "text-[var(--text-secondary)]"}`}>
                        +{events.length - 2} autre{events.length - 2 > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Stats mois */}
      <div className="flex gap-3 mt-3">
        {["14 rendez-vous", "92% présence", "3 en attente"].map((s, i) => (
          <div key={i} className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MessagesView ────────────────────────────────────────

function MessagesView() {
  const [selectedConvo, setSelectedConvo] = useState("dupont");
  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState<Record<string, Message[]>>({
    dupont: [
      { from: "them", text: "Bonjour, je confirme notre RDV de mardi 14h. Dois-je apporter quelque chose de particulier ?", time: "14:20" },
      { from: "me", text: "Parfait M. Dupont. Apportez simplement votre pièce d'identité, on s'occupe du reste.", time: "14:23" },
      { from: "them", text: "Merci, à mardi !", time: "14:23" },
    ],
    martin: [
      { from: "them", text: "Bonjour, j'ai une question concernant la facture #2847. Pouvez-vous me rappeler ?", time: "11:02" },
    ],
    jean: [
      { from: "them", text: "Merci beaucoup pour le suivi de la semaine dernière, tout est en ordre.", time: "Hier" },
    ],
    sophie: [
      { from: "them", text: "Serait-il possible de décaler le RDV de jeudi à vendredi matin ?", time: "Hier" },
    ],
    pierre: [
      { from: "them", text: "Devis bien reçu, je vous confirme d'ici lundi. Merci.", time: "Lun" },
    ],
  });
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const hasRenderedRef = useRef(false);

  // Scroll interne au conteneur uniquement (pas la page)
  useEffect(() => {
    if (!hasRenderedRef.current) {
      // Premier render : scroll silencieux sans animation
      hasRenderedRef.current = true;
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
      return;
    }
    // Changement de convo ou nouveau message : scroll interne seulement
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [conversations, selectedConvo]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;
    const newMsg: Message = { from: "me", text: inputValue.trim(), time: nowTime() };
    setConversations((prev) => ({
      ...prev,
      [selectedConvo]: [...(prev[selectedConvo] ?? []), newMsg],
    }));
    setInputValue("");
  }, [inputValue, selectedConvo]);

  const convoList = [
    { id: "dupont", unread: true },
    { id: "martin", unread: true },
    { id: "jean", unread: false },
    { id: "sophie", unread: true },
    { id: "pierre", unread: false },
  ];

  const contact = contactsMap[selectedConvo];
  const msgs = conversations[selectedConvo] ?? [];

  return (
    <div className="grid grid-cols-5 gap-3 h-full">
      {/* Liste conversations */}
      <div className="col-span-2 space-y-1.5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Messages</h3>
          <span className="text-[9px] bg-[var(--accent-primary)] text-white rounded-full px-1.5 py-0.5 font-medium">3 non lus</span>
        </div>
        {convoList.map((c) => {
          const ct = contactsMap[c.id];
          const lastMsg = conversations[c.id]?.[conversations[c.id].length - 1];
          return (
            <button
              key={c.id}
              aria-label={`Conversation avec ${ct.name}`}
              onClick={() => setSelectedConvo(c.id)}
              className={`w-full flex items-start gap-2 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                selectedConvo === c.id
                  ? "bg-[rgba(13,148,136,0.1)] border border-[rgba(13,148,136,0.2)]"
                  : "hover:bg-[var(--bg-secondary)]"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white text-[9px] font-bold shrink-0">{ct.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] truncate ${c.unread ? "font-bold text-[var(--text-primary)]" : "font-medium text-[var(--text-secondary)]"}`}>{ct.name}</span>
                  <span className="text-[8px] text-[var(--text-secondary)] shrink-0 ml-1">{lastMsg?.time ?? ""}</span>
                </div>
                <div className="text-[9px] text-[var(--text-secondary)] truncate mt-0.5">{lastMsg?.text ?? ""}</div>
              </div>
              {c.unread && <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-1.5 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Conversation ouverte */}
      <div className="col-span-3 bg-[var(--bg-secondary)] rounded-xl p-3 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-[var(--border-light)]">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white text-[10px] font-bold">{contact.initials}</div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-[var(--text-primary)]">{contact.name}</div>
            <div className="text-[9px] text-[var(--accent-primary)] flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />En ligne
            </div>
          </div>
        </div>

        {/* Bulles — scroll interne uniquement */}
        <div ref={messagesContainerRef} className="flex-1 space-y-2 py-2.5 overflow-y-auto max-h-[200px] scrollbar-thin-teal">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-1.5 ${
                m.from === "me"
                  ? "bg-[var(--accent-primary)] rounded-tr-sm"
                  : "bg-white border border-[var(--border-light)] rounded-tl-sm"
              }`}>
                <div className={`text-[11px] ${m.from === "me" ? "text-white" : "text-[var(--text-primary)]"}`}>{m.text}</div>
                <div className={`text-[8px] mt-0.5 ${m.from === "me" ? "text-white/70" : "text-[var(--text-secondary)]"}`}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input réel */}
        <div className="flex items-center gap-1.5 pt-2.5 border-t border-[var(--border-light)]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            placeholder="Votre réponse..."
            className="flex-1 bg-white rounded-lg px-2.5 py-1.5 text-[10px] border border-[var(--border-light)] outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          />
          <button
            aria-label="Envoyer"
            onClick={handleSend}
            className="w-7 h-7 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FacturationView ─────────────────────────────────────

function FacturationView() {
  const [factView, setFactView] = useState<"mois" | "annee">("mois");
  const [selectedMonth, setSelectedMonth] = useState(10); // Novembre = index 10
  const [invoiceTab, setInvoiceTab] = useState<"clients" | "fournisseurs">("clients");

  const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  const fullMonthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const summary = monthlySummaries[selectedMonth];

  const clientInvoices = [
    { num: "#2847", client: "M. Dupont", date: "12 nov", amount: 1200, status: "En attente", badge: "yellow" as const },
    { num: "#2846", client: "Mme Martin", date: "10 nov", amount: 850, status: "Payée", badge: "teal" as const },
    { num: "#2845", client: "Jean L.", date: "08 nov", amount: 2400, status: "Payée", badge: "teal" as const },
    { num: "#2844", client: "Sophie R.", date: "05 nov", amount: 370, status: "En retard", badge: "red" as const },
    { num: "#2843", client: "Pierre K.", date: "02 nov", amount: 1650, status: "Payée", badge: "teal" as const },
  ];

  const supplierInvoices = [
    { num: "#F-0042", client: "Swisscom Pro", date: "08 nov", amount: 189, status: "Payée", badge: "teal" as const },
    { num: "#F-0041", client: "Infomaniak", date: "03 nov", amount: 45, status: "Payée", badge: "teal" as const },
    { num: "#F-0040", client: "Comptable CH", date: "01 nov", amount: 650, status: "À payer", badge: "yellow" as const },
    { num: "#F-0039", client: "Google Workspace", date: "28 oct", amount: 72, status: "Payée", badge: "teal" as const },
    { num: "#F-0038", client: "Location bureau", date: "25 oct", amount: 1200, status: "En retard", badge: "red" as const },
  ];

  const badgeStyles: Record<string, string> = {
    teal: "bg-[rgba(13,148,136,0.1)] text-[var(--accent-primary)]",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  const invoices = invoiceTab === "clients" ? clientInvoices : supplierInvoices;

  // Totaux annuels calculés
  const annualRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0);
  const annualExpenses = monthlyData.reduce((s, m) => s + m.expenses, 0);
  const annualNet = annualRevenue - annualExpenses;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Facturation</h3>
          <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
            {factView === "mois" ? `${fullMonthNames[selectedMonth]} 2026` : "Bilan annuel 2026"}
          </p>
        </div>
        <div className="flex gap-1">
          {(["mois", "annee"] as const).map((v) => (
            <button
              key={v}
              aria-label={`Vue ${v}`}
              onClick={() => setFactView(v)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                factView === v ? "bg-[var(--accent-primary)] text-white" : "text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-gray-200"
              }`}
            >
              {v === "mois" ? "Mois" : "Année"}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={factView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {factView === "mois" ? (
            <div className="space-y-3">
              {/* Sélecteur de mois */}
              <div className="flex gap-1 overflow-x-auto pb-1">
                {monthNames.map((m, i) => (
                  <button
                    key={i}
                    aria-label={fullMonthNames[i]}
                    onClick={() => setSelectedMonth(i)}
                    className={`px-2 py-1 rounded text-[9px] font-medium shrink-0 transition-colors cursor-pointer ${
                      selectedMonth === i ? "bg-[var(--accent-primary)] text-white" : "text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-gray-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* 3 cards résumé — dynamiques */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-[rgba(13,148,136,0.1)] border border-[rgba(13,148,136,0.2)] rounded-lg p-2.5">
                  <div className="text-[9px] uppercase tracking-wider text-[var(--accent-primary)] font-semibold">Encaissé</div>
                  <div className="text-lg font-bold text-[var(--text-primary)] mt-0.5">CHF {formatCHF(summary.encaisse)}</div>
                  <div className="text-[9px] text-[var(--text-secondary)] mt-0.5">{summary.payees} factures payées</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5">
                  <div className="text-[9px] uppercase tracking-wider text-yellow-700 font-semibold">En attente</div>
                  <div className="text-lg font-bold text-[var(--text-primary)] mt-0.5">CHF {formatCHF(summary.attente)}</div>
                  <div className="text-[9px] text-[var(--text-secondary)] mt-0.5">{summary.attente > 0 ? Math.ceil(summary.attente / 800) : 0} factures</div>
                </div>
                <div className={`${summary.retard > 0 ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"} rounded-lg p-2.5`}>
                  <div className={`text-[9px] uppercase tracking-wider font-semibold ${summary.retard > 0 ? "text-red-700" : "text-green-700"}`}>
                    {summary.retard > 0 ? "En retard" : "Tout OK"}
                  </div>
                  <div className="text-lg font-bold text-[var(--text-primary)] mt-0.5">
                    {summary.retard > 0 ? `CHF ${formatCHF(summary.retard)}` : "—"}
                  </div>
                  <div className="text-[9px] text-[var(--text-secondary)] mt-0.5">
                    {summary.retard > 0 ? "1 facture" : "Aucun retard"}
                  </div>
                </div>
              </div>

              {/* Tabs Clients / Fournisseurs */}
              <div className="flex gap-1">
                {(["clients", "fournisseurs"] as const).map((tab) => (
                  <button
                    key={tab}
                    aria-label={tab}
                    onClick={() => setInvoiceTab(tab)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                      invoiceTab === tab ? "bg-[var(--dark-panel)] text-white" : "text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-gray-200"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tableau */}
              <div className="border border-[var(--border-light)] rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-1.5 px-3 py-1.5 bg-[var(--bg-secondary)] text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
                  <div className="col-span-2">N°</div>
                  <div className="col-span-3">{invoiceTab === "clients" ? "Client" : "Fournisseur"}</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Montant</div>
                  <div className="col-span-3">Statut</div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={invoiceTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {invoices.map((inv, i) => (
                      <div key={i} className="grid grid-cols-12 gap-1.5 px-3 py-2 border-t border-[var(--border-light)] text-[11px] items-center">
                        <div className="col-span-2 font-mono text-[var(--text-secondary)] text-[10px]">{inv.num}</div>
                        <div className="col-span-3 font-medium text-[var(--text-primary)] truncate">{inv.client}</div>
                        <div className="col-span-2 text-[var(--text-secondary)]">{inv.date}</div>
                        <div className="col-span-2 font-bold text-[var(--text-primary)]">CHF {formatCHF(inv.amount)}</div>
                        <div className="col-span-3">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${badgeStyles[inv.badge]}`}>{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* ─── Vue Année — scroll interne ─── */
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin-teal">
              {/* 3 KPIs annuels */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-[rgba(13,148,136,0.1)] border border-[rgba(13,148,136,0.2)] rounded-lg p-2.5">
                  <div className="text-[9px] uppercase tracking-wider text-[var(--accent-primary)] font-semibold">CA annuel</div>
                  <div className="text-lg font-bold text-[var(--text-primary)] mt-0.5">CHF {formatCHF(annualRevenue)}</div>
                  <div className="text-[9px] text-[var(--accent-primary)] font-medium mt-0.5">+18% vs 2025</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-lg p-2.5">
                  <div className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold">Dépenses</div>
                  <div className="text-lg font-bold text-[var(--text-primary)] mt-0.5">CHF {formatCHF(annualExpenses)}</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-2.5">
                  <div className="text-[9px] uppercase tracking-wider text-green-700 font-semibold">Résultat net</div>
                  <div className="text-lg font-bold text-[var(--text-primary)] mt-0.5">CHF {formatCHF(annualNet)}</div>
                </div>
              </div>

              {/* Graphique barres mensuel double */}
              <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-semibold text-[var(--text-primary)]">CA vs Dépenses par mois</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[8px] text-[var(--text-secondary)]"><div className="w-2 h-2 rounded-sm bg-[#0D9488]" />CA</div>
                    <div className="flex items-center gap-1 text-[8px] text-[var(--text-secondary)]"><div className="w-2 h-2 rounded-sm bg-teal-200" />Dépenses</div>
                  </div>
                </div>
                <svg viewBox="0 0 780 200" className="w-full" style={{ height: "110px" }}>
                  {[50, 100, 150].map((y) => (
                    <line key={y} x1="20" y1={y} x2="770" y2={y} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="3 3" />
                  ))}
                  {monthlyData.map((m, i) => {
                    const x = 30 + i * 62;
                    const maxRevenue = 14000;
                    const revH = (m.revenue / maxRevenue) * 150;
                    const expH = (m.expenses / maxRevenue) * 150;
                    return (
                      <g key={i}>
                        <rect x={x} y={175 - revH} width="22" height={revH} fill="#0D9488" rx="2" />
                        <rect x={x + 24} y={175 - expH} width="22" height={expH} fill="#99F6E4" rx="2" />
                        <text x={x + 23} y={192} textAnchor="middle" fill="#9ca3af" fontSize="8">{m.month}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Tableau récap mensuel */}
              <div className="border border-[var(--border-light)] rounded-lg overflow-hidden max-h-[130px] overflow-y-auto">
                <div className="grid grid-cols-4 gap-1 px-3 py-1 bg-[var(--bg-secondary)] text-[8px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold sticky top-0">
                  <div>Mois</div><div>CA</div><div>Dépenses</div><div>Résultat</div>
                </div>
                {monthlyData.map((m, i) => (
                  <div key={i} className={`grid grid-cols-4 gap-1 px-3 py-1 border-t border-[var(--border-light)] text-[9px] ${i === 10 ? "bg-teal-50 font-semibold" : ""}`}>
                    <div className="text-[var(--text-secondary)]">{m.month}</div>
                    <div className="text-[var(--text-primary)]">CHF {formatCHF(m.revenue)}</div>
                    <div className="text-[var(--text-secondary)]">CHF {formatCHF(m.expenses)}</div>
                    <div className="text-[var(--accent-primary)] font-semibold">CHF {formatCHF(m.revenue - m.expenses)}</div>
                  </div>
                ))}
                {/* Total */}
                <div className="grid grid-cols-4 gap-1 px-3 py-1.5 border-t-2 border-[var(--accent-primary)] text-[9px] font-bold bg-[var(--bg-secondary)]">
                  <div className="text-[var(--text-primary)]">Total</div>
                  <div className="text-[var(--text-primary)]">CHF {formatCHF(annualRevenue)}</div>
                  <div className="text-[var(--text-secondary)]">CHF {formatCHF(annualExpenses)}</div>
                  <div className="text-[var(--accent-primary)]">CHF {formatCHF(annualNet)}</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── StatsView ───────────────────────────────────────────

function StatsView() {
  const [statsPeriod, setStatsPeriod] = useState<StatsPeriod>("7j");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const data = periodData[statsPeriod];
  const chartItems = data.chart;

  // Calcul dynamique de la largeur des barres
  const svgWidth = 700;
  const barCount = chartItems.length;
  const gap = barCount <= 4 ? 40 : 20;
  const totalGap = gap * (barCount + 1);
  const barWidth = Math.min(80, (svgWidth - totalGap) / barCount);

  const kpiList = [
    { label: "Chiffre d'affaires", value: data.kpi.revenue, trend: data.trend.revenue, spark: data.sparklines.revenue },
    { label: "Nouveaux clients", value: data.kpi.newClients, trend: data.trend.newClients, spark: data.sparklines.clients },
    { label: "Satisfaction", value: data.kpi.satisfaction, trend: data.trend.satisfaction, spark: data.sparklines.satisfaction },
  ];

  return (
    <div className="space-y-3">
      {/* Header + filtres fonctionnels */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Performance</h3>
          <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{data.subtitle}</p>
        </div>
        <div className="flex gap-1">
          {(["7j", "30j", "90j"] as const).map((p) => (
            <button
              key={p}
              aria-label={`Période ${p}`}
              onClick={() => { setStatsPeriod(p); setHoveredBar(null); }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                statsPeriod === p ? "bg-[var(--accent-primary)] text-white" : "text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 3 KPIs avec mini sparklines */}
      <div className="grid grid-cols-3 gap-2.5">
        {kpiList.map((kpi, i) => (
          <div key={i} className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-lg p-2.5">
            <div className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold">{kpi.label}</div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <div className="text-lg font-bold text-[var(--text-primary)]">{kpi.value}</div>
              <div className="text-[9px] text-[var(--accent-primary)] font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" />{kpi.trend}
              </div>
            </div>
            {/* Mini sparkline tendance */}
            <svg viewBox="0 0 80 16" className="w-full h-3 mt-1" preserveAspectRatio="none">
              <polyline
                points={kpi.spark.map((v, idx) => `${idx * 13.3},${16 - (v / 100) * 16}`).join(" ")}
                fill="none" stroke="var(--accent-primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={0.6}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Graphique principal — hauteur fixe, tooltip absolute */}
      <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-lg p-3 relative" style={{ height: 220 }}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-semibold text-[var(--text-primary)]">Chiffre d&apos;affaires</div>
          <div className="text-[9px] text-[var(--text-secondary)]">en CHF</div>
        </div>

        {/* Tooltip en absolute — ne modifie jamais le layout */}
        {hoveredBar !== null && (
          <div
            className="absolute z-10 top-2 right-14 bg-[var(--dark-panel)] text-white px-3 py-2 rounded-lg shadow-lg border border-white/10 text-xs font-medium pointer-events-none whitespace-nowrap"
          >
            <div className="text-[10px] text-teal-300 uppercase tracking-wider font-semibold mb-0.5">{chartItems[hoveredBar].label}</div>
            <div className="font-bold">CHF {formatCHF(chartItems[hoveredBar].revenue)}</div>
          </div>
        )}

        <svg viewBox={`0 0 ${svgWidth} 260`} className="w-full" style={{ height: 160 }} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="demoBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity={0.5} />
            </linearGradient>
          </defs>

          {[60, 110, 160].map((y) => (
            <line key={y} x1="20" y1={y} x2={svgWidth - 20} y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
          ))}

          {chartItems.map((d, i) => {
            const barHeight = d.value * 1.6;
            const x = gap + i * (barWidth + gap);
            const barY = 210 - barHeight;
            const valY = Math.max(barY - 10, 24);
            const isHovered = hoveredBar === i;
            return (
              <g
                key={i}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Zone hover invisible élargie — pas de changement de layout */}
                <rect x={x - 4} y={0} width={barWidth + 8} height={260} fill="transparent" />
                {/* Barre — seul le fill change, pas de stroke ni scale */}
                <rect
                  x={x} y={barY} width={barWidth} height={barHeight}
                  fill={isHovered ? "#0F766E" : "url(#demoBarGrad)"}
                  rx="4"
                />
                {/* Valeur au-dessus */}
                <text
                  x={x + barWidth / 2} y={valY}
                  textAnchor="middle"
                  fill={isHovered ? "#065F56" : "#6b7280"}
                  fontSize="18" fontWeight="600"
                >
                  {d.value}
                </text>
                {/* Label jour en dessous */}
                <text x={x + barWidth / 2} y={240} textAnchor="middle" fill="#9ca3af" fontSize="12">{d.label}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bas : Top services + Donut */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-lg p-2.5">
          <div className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">Top 3 services</div>
          <div className="space-y-1.5">
            {data.services.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="text-[10px] text-[var(--text-secondary)] w-20 shrink-0 truncate">{s.name}</div>
                <div className="flex-1 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent-primary)] rounded-full transition-all duration-300" style={{ width: `${s.pct}%` }} />
                </div>
                <div className="text-[10px] font-semibold text-[var(--text-primary)] w-7 text-right">{s.pct}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-lg p-2.5">
          <div className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">Répartition clientèle</div>
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 42 42" className="w-14 h-14 shrink-0">
              <circle cx="21" cy="21" r="15.5" fill="none" stroke="var(--bg-secondary)" strokeWidth="5" />
              <circle
                cx="21" cy="21" r="15.5" fill="none" stroke="var(--accent-primary)" strokeWidth="5"
                strokeDasharray={`${data.donut} ${100 - data.donut}`} strokeDashoffset="25"
                transform="rotate(-90 21 21)"
                className="transition-all duration-500"
              />
            </svg>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-1.5 text-[9px]">
                <div className="w-2 h-2 rounded-sm bg-[var(--accent-primary)]" />
                <span className="text-[var(--text-secondary)]">Particuliers {data.donut}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px]">
                <div className="w-2 h-2 rounded-sm bg-[var(--bg-secondary)] border border-[var(--border-light)]" />
                <span className="text-[var(--text-secondary)]">Entreprises {100 - data.donut}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────

export default function ChaosToClarityDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [phase, setPhase] = useState<Phase>("chaos");
  const [hasPlayed, setHasPlayed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [transformationComplete, setTransformationComplete] = useState(false);
  const [activeView, setActiveView] = useState<ViewId>("home");
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const startAnimation = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (prefersReducedMotion) {
      setPhase("finale");
      setHasPlayed(true);
      setTransformationComplete(true);
      return;
    }
    setPhase("align");
    setHasPlayed(true);
    const phases: Phase[] = ["desaturate", "migrate", "solidify", "finale"];
    phases.forEach((p) => {
      const t = setTimeout(() => setPhase(p), PHASE_TIMINGS[p]);
      timeoutsRef.current.push(t);
    });
    const tComplete = setTimeout(() => setTransformationComplete(true), PHASE_TIMINGS.finale + INTERACTIVE_DELAY);
    timeoutsRef.current.push(tComplete);
  };

  useEffect(() => {
    if (isInView && !hasPlayed) startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  const handleReplay = () => {
    setPhase("chaos");
    setHasPlayed(false);
    setTransformationComplete(false);
    setActiveView("home");
    const t = setTimeout(() => startAnimation(), 300);
    timeoutsRef.current.push(t);
  };

  const getItemAnimation = (item: ChaosItem) => {
    const phaseIndex = ["chaos", "align", "desaturate", "migrate", "solidify", "finale"].indexOf(phase);
    if (phaseIndex <= 0) return { left: `${item.x}%`, top: `${item.y}%`, rotate: item.rotate, scale: 1, filter: "saturate(1)", opacity: 1 };
    if (phaseIndex === 1) return { left: `${item.x}%`, top: `${item.y}%`, rotate: 0, scale: 1, filter: "saturate(1)", opacity: 1 };
    if (phaseIndex === 2) return { left: `${item.x}%`, top: `${item.y}%`, rotate: 0, scale: 1, filter: "saturate(0.2)", opacity: 1 };
    return { left: `${item.targetX}%`, top: `${item.targetY}%`, rotate: 0, scale: 0.9, filter: "saturate(1)", opacity: transformationComplete ? 0 : 1 };
  };

  const isFinal = phase === "solidify" || phase === "finale";

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6">
      <motion.p
        className="text-sm tracking-widest text-[var(--text-secondary)] uppercase mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Votre bordel actuel, en une interface propre.
      </motion.p>

      <div
        className={`relative rounded-3xl border border-[var(--border-light)] overflow-hidden transition-colors duration-1000 ${isFinal ? "bg-gray-50" : "bg-[var(--bg-secondary)]"}`}
        style={{ aspectRatio: "16/10" }}
      >
        {!isFinal && (
          <div
            className="absolute inset-0 opacity-30 transition-opacity duration-1000"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          />
        )}

        {/* Sidebar */}
        <motion.aside
          className="absolute left-0 top-0 bottom-0 w-[72px] bg-[var(--dark-panel)] flex flex-col items-center py-6 gap-2 z-20"
          role="tablist" aria-label="Navigation du dashboard"
          initial={{ x: -72, opacity: 0 }}
          animate={isFinal ? { x: 0, opacity: 1 } : { x: -72, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center text-white font-bold mb-4">F</div>
          {menuItems.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id} role="tab" aria-selected={isActive} aria-label={item.label} title={item.label}
                tabIndex={transformationComplete ? 0 : -1}
                onClick={() => { if (transformationComplete) setActiveView(item.id); }}
                className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dark-panel)] ${
                  !transformationComplete ? "pointer-events-none text-gray-500" : isActive ? "bg-[var(--accent-primary)] text-white" : "text-gray-500 hover:text-white hover:bg-white/5 cursor-pointer"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="absolute left-full ml-3 px-2 py-1 bg-[var(--dark-panel)] text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 z-30">{item.label}</span>
              </button>
            );
          })}
        </motion.aside>

        {/* Barre du haut */}
        <motion.header
          className="absolute top-0 left-[72px] right-0 h-12 bg-white border-b border-gray-200 flex items-center px-4 z-20"
          initial={{ y: -48, opacity: 0 }}
          animate={isFinal ? { y: 0, opacity: 1 } : { y: -48, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-semibold text-[var(--text-primary)]">VotreEntreprise</span>
          <div className="ml-auto flex items-center gap-2 text-xs text-[var(--accent-primary)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />En ligne
          </div>
        </motion.header>

        {/* Éléments chaos */}
        <div className="absolute inset-0">
          {chaosItems.map((item, idx) => {
            const animation = getItemAnimation(item);
            return (
              <motion.div
                key={idx}
                className={`absolute px-3 py-2 text-xs font-medium max-w-[160px] truncate z-10 rounded-md ${isFinal && !transformationComplete ? getFinalStyle() : getChaosStyle(item)}`}
                animate={animation}
                transition={{ duration: phase === "chaos" ? 0 : 1, ease: [0.22, 1, 0.36, 1], delay: phase === "migrate" ? idx * 0.05 : 0 }}
              >
                {isFinal && !transformationComplete ? (
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" /><span className="text-gray-700 truncate">{item.text}</span></span>
                ) : (
                  <span className="text-gray-700">{item.text}</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Labels de zones */}
        {isFinal && !transformationComplete && (
          <>
            {[
              { label: "Agenda", x: 18, y: 16 },
              { label: "Messages", x: 55, y: 16 },
              { label: "Notifications", x: 72, y: -2 },
              { label: "Données", x: 18, y: 58 },
              { label: "Facturation", x: 55, y: 58 },
            ].map((zone, idx) => (
              <motion.span key={idx} className="absolute text-[10px] tracking-wider text-teal-500/60 uppercase font-medium z-20" style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.1, duration: 0.4 }}>
                {zone.label}
              </motion.span>
            ))}
          </>
        )}

        {/* Zone principale du dashboard */}
        <AnimatePresence mode="wait">
          {transformationComplete && (
            <motion.main
              className="absolute top-12 left-[72px] right-0 bottom-0 p-5 overflow-y-auto z-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={activeView}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeView === "home" && <HomeView />}
                  {activeView === "agenda" && <AgendaView />}
                  {activeView === "messages" && <MessagesView />}
                  {activeView === "facturation" && <FacturationView />}
                  {activeView === "stats" && <StatsView />}
                </motion.div>
              </AnimatePresence>
            </motion.main>
          )}
        </AnimatePresence>

        {/* Phrase finale */}
        {phase === "finale" && !transformationComplete && (
          <motion.p className="absolute bottom-6 right-6 text-lg font-caveat text-teal-500 z-20"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Tout ça, en un seul endroit.
          </motion.p>
        )}

        {/* Bouton Revoir */}
        {transformationComplete && (
          <motion.button
            className="absolute bottom-3 left-[84px] flex items-center gap-1.5 text-xs text-teal-600 border border-teal-300 rounded-lg px-2.5 py-1 hover:bg-teal-50 transition-colors cursor-pointer z-30"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}
            onClick={handleReplay}
          >
            <RotateCcw size={12} />Revoir
          </motion.button>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="aspect-ratio: 16/10"] {
            aspect-ratio: 3/4 !important;
          }
        }
      `}</style>
    </div>
  );
}
