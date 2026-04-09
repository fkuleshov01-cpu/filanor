"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Brain, Calendar, Users, Send, Moon } from "lucide-react";

// Durée totale du cycle en ms
const CYCLE_DURATION = 9000;
// Nombre total d'étapes dans le cycle
const TOTAL_STEPS = 10;
// Intervalle entre chaque step
const STEP_INTERVAL = CYCLE_DURATION / TOTAL_STEPS; // 900ms

// Message du client tapé caractère par caractère
const CLIENT_MESSAGE = "Bonjour, une table pour 4 samedi 20h ?";

// Étapes du traitement IA
const processingSteps = [
  { icon: Mail, label: "Message reçu" },
  { icon: Brain, label: "Intention détectée : réservation" },
  { icon: Calendar, label: "Créneau samedi 20h dispo" },
  { icon: Users, label: "Table 4p assignée" },
  { icon: Send, label: "Confirmation envoyée" },
] as const;

// Grille de tables (4x3) — index 6 = table qui s'active
const TABLE_COUNT = 12;
const ACTIVE_TABLE = 6;

export default function NightAutomationDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [step, setStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Détection prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Boucle d'animation
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % (TOTAL_STEPS + 1));
    }, STEP_INTERVAL);

    return () => clearInterval(interval);
  }, [isInView, prefersReducedMotion]);

  // Reset quand hors viewport
  useEffect(() => {
    if (!isInView) setStep(0);
  }, [isInView]);

  // Si reduced motion, afficher l'état final
  const effectiveStep = prefersReducedMotion ? TOTAL_STEPS : step;

  // Calcul du texte typewriter (phase 1-3 = step 1 à 3)
  const typewriterProgress = Math.min(
    1,
    Math.max(0, (effectiveStep - 1) / 2)
  );
  const visibleChars = Math.floor(typewriterProgress * CLIENT_MESSAGE.length);
  const displayedMessage = CLIENT_MESSAGE.slice(0, visibleChars);

  // Panneau central : étapes actives (phase 3-7 = step 3 à 7)
  const getStepActive = useCallback(
    (idx: number) => effectiveStep >= 3 + idx,
    [effectiveStep]
  );

  // Table assignée (phase 7+)
  const tableAssigned = effectiveStep >= 8;

  // Téléphone allumé (phase 1+)
  const phoneOn = effectiveStep >= 1;

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6">
      {/* Titre discret */}
      <motion.p
        className="text-sm tracking-widest text-[var(--text-secondary)] uppercase mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        02:47 — La nuit de votre concurrent
      </motion.p>

      {/* 3 panneaux */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PANNEAU 1 — Smartphone client */}
        <motion.div
          className="aspect-[3/4] rounded-3xl bg-gradient-to-b from-gray-900 to-black border border-white/10 p-4 flex flex-col relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Header téléphone */}
          <div className="flex justify-between items-center text-white/60 text-xs">
            <span className="font-mono">02:47</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-white/40 rounded-full"
                    style={{ height: `${i * 3 + 2}px` }}
                  />
                ))}
              </div>
              {/* Batterie */}
              <div className="w-5 h-2.5 border border-white/40 rounded-sm relative">
                <div className="absolute inset-0.5 bg-green-400/60 rounded-[1px]" />
                <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-white/40 rounded-r-full" />
              </div>
            </div>
          </div>

          {/* Écran éteint → notification */}
          <div className="flex-1 flex items-end">
            <motion.div
              className="w-full bg-white/10 backdrop-blur rounded-xl p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: phoneOn ? 1 : 0,
                y: phoneOn ? 0 : 10,
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Avatar + nom */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-teal-500/30 flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
                <span className="text-white/80 text-sm font-medium">
                  Client M. Martin
                </span>
              </div>
              {/* Message typewriter */}
              <p className="text-white/90 text-sm min-h-[1.5em]">
                {displayedMessage}
                {typewriterProgress < 1 && phoneOn && (
                  <span className="inline-block w-0.5 h-4 bg-white/60 ml-0.5 animate-pulse" />
                )}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* PANNEAU 2 — Traitement IA */}
        <motion.div
          className="aspect-[3/4] rounded-3xl bg-[var(--dark-panel)] p-6 relative flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
        >
          {/* Titre */}
          <span className="text-[10px] tracking-widest text-teal-400 uppercase">
            Filanor traite
          </span>

          {/* Étapes verticales */}
          <div className="flex-1 flex flex-col justify-center gap-0">
            {processingSteps.map((s, idx) => {
              const Icon = s.icon;
              const active = getStepActive(idx);
              return (
                <div key={idx}>
                  {/* Étape */}
                  <motion.div
                    className="flex items-center gap-3"
                    animate={{
                      opacity: active ? 1 : 0.2,
                      x: active ? 0 : -10,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Cercle icône */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        active
                          ? "bg-teal-500/20 text-teal-400"
                          : "bg-white/5 text-white/20"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    {/* Texte */}
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        active ? "text-white/90" : "text-white/20"
                      }`}
                    >
                      {s.label}
                    </span>
                    {/* Check */}
                    {active && (
                      <motion.span
                        className="text-teal-400 text-sm ml-auto"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Ligne verticale entre les étapes */}
                  {idx < processingSteps.length - 1 && (
                    <div className="ml-[18px] w-px h-6 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-teal-500/40 origin-top"
                        animate={{
                          scaleY: getStepActive(idx) ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                      <div className="absolute inset-0 bg-white/5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* PANNEAU 3 — Plan de salle */}
        <motion.div
          className="aspect-[3/4] rounded-3xl bg-white border border-gray-200 p-6 flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-sm text-gray-400">02:47</span>
            <span className="text-[10px] font-medium tracking-wider text-red-400 bg-red-50 px-2 py-0.5 rounded-full uppercase">
              Fermé
            </span>
          </div>

          {/* Grille de tables 4x3 */}
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-3 w-full max-w-[280px]">
              {Array.from({ length: TABLE_COUNT }).map((_, idx) => (
                <div key={idx} className="relative">
                  <motion.div
                    className={`w-full aspect-square rounded-lg transition-colors duration-500 ${
                      idx === ACTIVE_TABLE && tableAssigned
                        ? "bg-teal-500/20 border-2 border-teal-500/40"
                        : "bg-gray-100"
                    }`}
                    animate={
                      idx === ACTIVE_TABLE && tableAssigned
                        ? { scale: [1, 1.05, 1] }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  />
                  {/* Badge flottant sur la table active */}
                  {idx === ACTIVE_TABLE && tableAssigned && (
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-teal-500 text-white text-[9px] font-medium px-2 py-0.5 rounded-full"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      Sam 20h — M. Martin
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bas du panneau */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs">👨‍🍳</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-400">Il dort.</span>
                <Moon size={14} className="text-gray-300" />
              </div>
            </div>
            <motion.span
              className="text-sm font-medium text-teal-500"
              animate={{ opacity: tableAssigned ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              On bosse.
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
