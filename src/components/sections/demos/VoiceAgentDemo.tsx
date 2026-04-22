"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { Phone, PhoneOff, ArrowRight, RotateCcw } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

interface Message {
  speaker: "ia" | "client";
  label: string;
  text: string;
  timer: string;
}

const conversation: Message[] = [
  {
    speaker: "ia",
    label: "IA Le Léman",
    text: "Hôtel Le Léman, bonjour. Comment puis-je vous aider ?",
    timer: "0:02",
  },
  {
    speaker: "client",
    label: "Marie D.",
    text: "Bonjour, je cherche une chambre double pour le weekend du 15 novembre, c\u2019est possible ?",
    timer: "0:06",
  },
  {
    speaker: "ia",
    label: "IA Le Léman",
    text: "Je vérifie nos disponibilités pour les nuits du 15 et 16 novembre\u2026",
    timer: "0:09",
  },
  {
    speaker: "ia",
    label: "IA Le Léman",
    text: "Bonne nouvelle\u00a0! Nous avons une chambre double vue lac à 280\u00a0CHF la nuit, petit-déjeuner inclus. Souhaitez-vous réserver\u00a0?",
    timer: "0:12",
  },
  {
    speaker: "client",
    label: "Marie D.",
    text: "Oui parfait, pour deux nuits.",
    timer: "0:15",
  },
  {
    speaker: "ia",
    label: "IA Le Léman",
    text: "C\u2019est noté. Je vous envoie une confirmation par email. Puis-je avoir votre adresse\u00a0?",
    timer: "0:18",
  },
  {
    speaker: "client",
    label: "Marie D.",
    text: "marie.dupont@email.ch",
    timer: "0:22",
  },
  {
    speaker: "ia",
    label: "IA Le Léman",
    text: "Parfait, Madame Dupont. Réservation confirmée pour les 15 et 16 novembre. Vous recevrez un email dans quelques instants. Bonne soirée\u00a0!",
    timer: "0:28",
  },
];

/* ═══════════════════════════════════════
   Phone Shell — coque iPhone réutilisable
   ═══════════════════════════════════════ */
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[220px] md:w-[280px] aspect-[9/19.5]">
      <div
        className="absolute inset-0 bg-[#1a1a1a] rounded-[40px] md:rounded-[48px] border border-white/10"
        style={{
          boxShadow:
            "0 25px 80px -20px rgba(0,0,0,0.8), 0 0 40px -10px rgba(20, 184, 166, 0.2)",
        }}
      >
        <div className="absolute inset-[3px] rounded-[37px] md:rounded-[45px] bg-black overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 md:w-24 h-5 md:h-6 bg-black rounded-full z-30 border border-white/5" />
          {children}
        </div>
      </div>

      {/* Boutons volume (gauche) */}
      <div className="absolute -left-[2px] top-[100px] md:top-[120px] w-[3px] h-6 md:h-8 bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute -left-[2px] top-[140px] md:top-[170px] w-[3px] h-10 md:h-12 bg-[#2a2a2a] rounded-l-sm" />

      {/* Bouton power (droite) */}
      <div className="absolute -right-[2px] top-[115px] md:top-[140px] w-[3px] h-12 md:h-16 bg-[#2a2a2a] rounded-r-sm" />
    </div>
  );
}

/* ═══════════════════════════════════════
   Incoming Call Screen
   ═══════════════════════════════════════ */
function IncomingCallScreen({ onPickUp }: { onPickUp: () => void }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C1A] via-[#0a1513] to-black flex flex-col items-center justify-between pt-20 pb-8 px-4">
      {/* Pulse + infos appelant */}
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-teal-400/30"
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="absolute inset-0 rounded-full bg-teal-500/20 flex items-center justify-center">
            <Phone className="w-6 h-6 text-teal-300" />
          </div>
        </div>

        <div className="text-teal-400 text-[10px] font-semibold tracking-widest uppercase mb-5">
          Appel entrant
        </div>

        <div className="text-white text-lg font-semibold">Marie Dupont</div>
        <div className="text-white/50 text-xs mt-1">+41 79 XXX XX XX</div>
      </div>

      {/* Boutons d'action */}
      <div className="flex items-center gap-8">
        {/* Raccrocher — disabled */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center opacity-40 cursor-not-allowed">
            <PhoneOff className="w-5 h-5 text-red-400" />
          </div>
          <span className="text-[9px] text-white/30">Raccrocher</span>
        </div>

        {/* Décrocher — active */}
        <div className="flex flex-col items-center gap-1.5">
          <motion.button
            className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPickUp}
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(34, 197, 94, 0.4)",
                "0 0 0 14px rgba(34, 197, 94, 0)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Phone className="w-5 h-5 text-white" />
          </motion.button>
          <span className="text-[9px] text-white/60 font-medium">
            Décrocher (IA)
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Conversation Screen — transcript live
   ═══════════════════════════════════════ */
function ConversationScreen({
  messages,
  timer,
  onContinue,
  isComplete,
}: {
  messages: Message[];
  timer: string;
  onContinue: () => void;
  isComplete: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  return (
    <div className="absolute inset-0 bg-[#0F1C1A] flex flex-col">
      {/* Header appel */}
      <div className="px-4 pt-12 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/60 text-[10px] font-medium">
              En cours
            </span>
          </div>
          <span className="text-white/40 text-[10px] font-mono tabular-nums">
            {timer}
          </span>
        </div>
        <div className="text-white text-sm font-semibold mt-1">
          Marie Dupont
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${
              msg.speaker === "client" ? "justify-end" : "justify-start"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div
              className={`max-w-[85%] px-3 py-2 ${
                msg.speaker === "ia"
                  ? "bg-teal-500/10 border border-teal-500/20 rounded-2xl rounded-bl-md"
                  : "bg-white/5 border border-white/10 rounded-2xl rounded-br-md"
              }`}
            >
              <div
                className={`text-[8px] font-semibold mb-0.5 ${
                  msg.speaker === "ia" ? "text-teal-400" : "text-white/40"
                }`}
              >
                {msg.label}
              </div>
              <div className="text-white/90 text-[11px] leading-relaxed">
                {msg.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bouton Continuer */}
      {!isComplete && messages.length > 0 && (
        <div className="px-3 pb-3 pt-1">
          <motion.button
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[11px] font-medium cursor-pointer"
            whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Continuer
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      )}

      {/* Home indicator */}
      <div className="pb-2 flex justify-center">
        <div className="w-24 h-1 bg-white/40 rounded-full" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Summary Screen — résumé réservation
   ═══════════════════════════════════════ */
function SummaryScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="absolute inset-0 bg-[#0F1C1A] flex flex-col items-center justify-center px-5">
      <motion.div
        className="w-full space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        {/* Badge succès */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1.4, 0.36, 1] }}
          >
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
            </svg>
          </motion.div>
          <span className="text-green-400 text-sm font-semibold">
            Réservation confirmée
          </span>
        </div>

        {/* Détails réservation */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-2.5 text-[11px]">
          {[
            { icon: "👤", text: "Marie Dupont" },
            { icon: "📅", text: "15-16 novembre" },
            { icon: "🛏️", text: "Chambre double vue lac" },
            { icon: "💰", text: "560 CHF (2 nuits)" },
            { icon: "📧", text: "Confirmation envoyée" },
          ].map((item) => (
            <div key={item.icon} className="flex items-center gap-2.5">
              <span className="text-white/40 w-4 text-center shrink-0">
                {item.icon}
              </span>
              <span className="text-white/80">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Le patron dormait */}
        <motion.p
          className="text-center text-white/35 text-[11px] italic pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Pendant ce temps, le patron dormait tranquillement. 😴
        </motion.p>

        {/* Bouton revoir */}
        <motion.button
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[11px] font-medium cursor-pointer"
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4, ease }}
        >
          <RotateCcw className="w-3 h-3" />
          Revoir la démo
        </motion.button>
      </motion.div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <div className="w-24 h-1 bg-white/40 rounded-full" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Composant principal — VoiceAgentDemo
   ═══════════════════════════════════════ */
export default function VoiceAgentDemo() {
  const [phase, setPhase] = useState<"incoming" | "conversation" | "summary">(
    "incoming"
  );
  const [messageIndex, setMessageIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleMessages = conversation.slice(0, messageIndex);
  const currentTimer =
    messageIndex > 0 ? conversation[messageIndex - 1].timer : "0:00";
  const isConversationComplete = messageIndex >= conversation.length;

  const clearAutoAdvance = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const advanceMessage = useCallback(() => {
    clearAutoAdvance();
    setMessageIndex((prev) =>
      prev < conversation.length ? prev + 1 : prev
    );
  }, [clearAutoAdvance]);

  // Auto-avance toutes les 3s quand visible
  useEffect(() => {
    if (phase !== "conversation" || !isInView || isConversationComplete) {
      clearAutoAdvance();
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setMessageIndex((prev) => prev + 1);
    }, 3000);

    return clearAutoAdvance;
  }, [phase, isInView, messageIndex, isConversationComplete, clearAutoAdvance]);

  // Transition vers résumé après fin de conversation
  useEffect(() => {
    if (isConversationComplete && phase === "conversation") {
      const t = setTimeout(() => setPhase("summary"), 1500);
      return () => clearTimeout(t);
    }
  }, [isConversationComplete, phase]);

  const handlePickUp = useCallback(() => {
    setPhase("conversation");
    setMessageIndex(1);
  }, []);

  const handleReset = useCallback(() => {
    clearAutoAdvance();
    setPhase("incoming");
    setMessageIndex(0);
  }, [clearAutoAdvance]);

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-6">
      {/* Titre */}
      <div className="text-center mb-8 md:mb-12">
        <p className="text-xs font-medium text-[var(--accent-primary)] tracking-widest uppercase mb-3">
          Démo 04 — Côté patron
        </p>
        <h3 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight">
          Votre téléphone répond tout seul.
        </h3>
        <p className="text-sm md:text-base text-[var(--text-muted)] mt-4 max-w-xl mx-auto">
          23h. Un client appelle votre hôtel. Vous dormez. L&apos;IA décroche,
          vérifie les disponibilités, réserve la chambre, envoie la
          confirmation. Vous découvrez la réservation au petit-déjeuner.
        </p>
      </div>

      {/* Scène cinématique */}
      <div className="relative min-h-[500px] md:min-h-0 md:aspect-[16/9] rounded-3xl bg-gradient-to-br from-[#0F1C1A] via-[#0a1513] to-black border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Halo teal */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 60%)",
          }}
        />

        {/* Phone avec vibration sur appel entrant */}
        <motion.div
          animate={
            phase === "incoming" && isInView
              ? { x: [0, -1, 1, -1, 1, 0] }
              : { x: 0 }
          }
          transition={
            phase === "incoming"
              ? { duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }
              : { duration: 0.2 }
          }
        >
          <PhoneShell>
            <AnimatePresence mode="wait">
              {phase === "incoming" && (
                <motion.div
                  key="incoming"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IncomingCallScreen onPickUp={handlePickUp} />
                </motion.div>
              )}
              {phase === "conversation" && (
                <motion.div
                  key="conversation"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ConversationScreen
                    messages={visibleMessages}
                    timer={currentTimer}
                    onContinue={advanceMessage}
                    isComplete={isConversationComplete}
                  />
                </motion.div>
              )}
              {phase === "summary" && (
                <motion.div
                  key="summary"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SummaryScreen onReset={handleReset} />
                </motion.div>
              )}
            </AnimatePresence>
          </PhoneShell>
        </motion.div>
      </div>
    </div>
  );
}
