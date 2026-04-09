'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const TOTAL = 10
const INITIAL_COUNT = 7

/* ─── Libellés contextuels par phase ─── */
function getStepLabel(step: number): string {
  switch (step) {
    case 1: return 'Double-clic pour ouvrir Apple Pay'
    case 2: return 'La carte fidélité apparaît'
    case 3: return 'Authentification Face ID'
    case 4: return 'Présenter au commerçant'
    case 5: return 'Scan NFC en cours'
    case 6: return '+1 commande enregistrée'
    case 7: return 'Plus que 2 pour la pizza offerte'
    default: return ''
  }
}

/* ═══════════════════════════════════════
   Lock Screen — heure + date + logo F
   ═══════════════════════════════════════ */
function LockScreen({ step }: { step: number }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C1A] via-[#0a1513] to-black flex flex-col items-center justify-start pt-16 md:pt-20 overflow-hidden">
      {/* Logo Filanor en filigrane */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="relative w-[200px] h-[200px] opacity-[0.18]"
          style={{ filter: 'drop-shadow(0 0 30px rgba(20, 184, 166, 0.4))' }}
        >
          <Image
            src="/filanor-logo.png"
            alt=""
            fill
            sizes="200px"
            className="object-contain"
            priority={false}
          />
        </div>
      </div>
      {/* Glow teal subtil derrière le F */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(20, 184, 166, 0.12) 0%, transparent 50%)',
        }}
      />

      <motion.div
        className="text-white text-5xl md:text-6xl font-light tracking-tight relative z-10"
        animate={{ opacity: step === 0 ? 0.3 : 1 }}
        transition={{ duration: 0.5 }}
      >
        12:47
      </motion.div>
      <div className="text-white/60 text-[10px] md:text-xs mt-1 font-medium relative z-10">
        Mardi 12 novembre
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   Zone d'interaction sous la carte
   ═══════════════════════════════════════ */
function InteractionZone({ step }: { step: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        {/* Phase 3 — Face ID */}
        {step === 3 && (
          <motion.div
            key="faceid"
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-teal-500/20" />
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: 'transparent', borderTopColor: '#5eead4', borderRightColor: '#5eead4' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 3H4v4M16 3h4v4M8 21H4v-4M16 21h4v-4" />
                </svg>
              </div>
            </div>
            <div className="text-[10px] text-white/80 font-medium mt-2 tracking-wide">
              Face ID
            </div>
          </motion.div>
        )}

        {/* Phase 4 — Présenter au commerçant */}
        {step === 4 && (
          <motion.div
            key="present"
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg className="w-5 h-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
            <motion.div
              className="text-[11px] text-white font-semibold mt-2 tracking-wide"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Présenter au commerçant
            </motion.div>
            <div className="flex gap-1 mt-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-white/60"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase 5 — Scan NFC */}
        {step === 5 && (
          <motion.div
            key="scan"
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-teal-400 z-10" />
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-teal-400"
                  style={{ width: 12, height: 12 }}
                  initial={{ scale: 1, opacity: 0.9 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, ease: 'easeOut' }}
                />
              ))}
            </div>
            <div className="text-[10px] text-teal-400 font-semibold mt-2 tracking-wider uppercase">
              Scan en cours
            </div>
          </motion.div>
        )}

        {/* Phase 6-7 — Terminé */}
        {(step === 6 || step === 7) && (
          <motion.div
            key="done"
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1.4, 0.36, 1] }}
          >
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              </svg>
            </div>
            <div className="text-[11px] text-green-400 font-semibold mt-2">
              Terminé
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════
   Wallet Screen — carte fixe en haut + zone d'interaction en dessous
   ═══════════════════════════════════════ */
function WalletScreen({ step }: { step: number }) {
  const currentCount = step >= 6 ? INITIAL_COUNT + 1 : INITIAL_COUNT
  const progressPercent = (currentCount / TOTAL) * 100
  const remaining = TOTAL - currentCount

  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      {/* Header Wallet */}
      <div className="px-4 md:px-5 pt-12 pb-2 md:pb-3">
        <div className="text-white text-xl md:text-2xl font-bold">Wallet</div>
      </div>

      {/* Carte Da Marco — fixe en haut */}
      <div className="flex items-start justify-center px-3 pt-2">
        <motion.div
          className="relative w-full max-w-[180px] md:max-w-[230px]"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative aspect-[1.58/1] rounded-xl md:rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 50%, #450a0a 100%)',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px -10px rgba(220, 38, 38, 0.3)',
            }}
          >
            {/* Texture lumineuse subtile */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,200,100,0.6) 0%, transparent 60%)',
              }}
            />

            {/* Header carte */}
            <div className="absolute top-0 left-0 right-0 p-2.5 md:p-3 flex items-start justify-between">
              <div>
                <div className="text-white/70 text-[6px] md:text-[7px] font-semibold tracking-[0.15em] uppercase">
                  PIZZERIA · LAUSANNE
                </div>
                <div
                  className="text-white font-bold text-sm md:text-lg leading-none mt-0.5 md:mt-1"
                  style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}
                >
                  Da Marco
                </div>
              </div>
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-amber-300/20 border border-amber-300/40 flex items-center justify-center">
                <span className="text-xs md:text-sm">🍕</span>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-3">
              <div className="flex items-baseline justify-between mb-1 md:mb-1.5">
                <div className="text-white/80 text-[6px] md:text-[8px] font-semibold tracking-[0.12em] uppercase">
                  Carte fidélité
                </div>
                <div className="flex items-baseline gap-0.5">
                  <motion.span
                    className="text-white font-bold text-sm md:text-base leading-none tabular-nums"
                    key={currentCount}
                    initial={{ scale: 1.4, opacity: 0, y: -3 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1.4, 0.36, 1] }}
                  >
                    {currentCount}
                  </motion.span>
                  <span className="text-white/60 text-[8px] md:text-[10px] font-medium">
                    /{TOTAL}
                  </span>
                </div>
              </div>

              <div className="relative h-1 md:h-[6px] bg-white/15 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                    boxShadow: '0 0 8px rgba(251, 191, 36, 0.5)',
                  }}
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: step === 6 ? 0.2 : 0,
                  }}
                />
                {step === 6 && (
                  <motion.div
                    className="absolute inset-y-0 w-8 md:w-12 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                    }}
                    initial={{ left: '-20%' }}
                    animate={{ left: '120%' }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  />
                )}
              </div>

              <div className="text-amber-200/80 text-[6px] md:text-[8px] font-medium mt-1 md:mt-1.5 text-center">
                {remaining > 0
                  ? `Plus que ${remaining} pour une pizza offerte`
                  : 'Pizza offerte débloquée !'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Zone d'interaction sous la carte */}
      <div className="flex-1 flex items-center justify-center px-4 relative">
        <InteractionZone step={step} />
      </div>

      {/* Home indicator */}
      <div className="pb-3 md:pb-4 flex justify-center">
        <div className="w-24 md:w-32 h-1 bg-white/40 rounded-full" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   Écran iPhone — switch lock / wallet
   ═══════════════════════════════════════ */
function IphoneScreen({ step }: { step: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {step <= 1 ? (
          <motion.div
            key="lock"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <LockScreen step={step} />
          </motion.div>
        ) : (
          <motion.div
            key="wallet"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <WalletScreen step={step} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════
   iPhone — coque, dynamic island, boutons
   ═══════════════════════════════════════ */
function Iphone({ step }: { step: number }) {
  return (
    <div className="relative w-[200px] md:w-[280px] aspect-[9/19.5]">
      {/* Coque */}
      <div
        className="absolute inset-0 bg-[#1a1a1a] rounded-[40px] md:rounded-[48px] border border-white/10"
        style={{
          boxShadow: '0 25px 80px -20px rgba(0,0,0,0.8), 0 0 40px -10px rgba(20, 184, 166, 0.2)',
        }}
      >
        <div className="absolute inset-[3px] rounded-[37px] md:rounded-[45px] bg-black overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 md:w-24 h-5 md:h-6 bg-black rounded-full z-30 border border-white/5" />
          <IphoneScreen step={step} />
        </div>
      </div>

      {/* Boutons volume (gauche) */}
      <div className="absolute -left-[2px] top-[100px] md:top-[120px] w-[3px] h-6 md:h-8 bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute -left-[2px] top-[140px] md:top-[170px] w-[3px] h-10 md:h-12 bg-[#2a2a2a] rounded-l-sm" />

      {/* Bouton power (droite) — clignote teal au double-clic phase 1 */}
      <motion.div
        className="absolute -right-[2px] top-[115px] md:top-[140px] w-[3px] h-12 md:h-16 rounded-r-sm"
        animate={
          step === 1
            ? { backgroundColor: ['#2a2a2a', '#5eead4', '#2a2a2a', '#5eead4', '#2a2a2a'] }
            : { backgroundColor: '#2a2a2a' }
        }
        transition={{ duration: 0.6, times: [0, 0.25, 0.5, 0.75, 1] }}
      />

      {/* Indicateur visuel double-clic phase 1 */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            className="absolute -right-5 md:-right-6 top-[123px] md:top-[152px]"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, times: [0, 0.25, 0.5, 0.75, 1] }}
          >
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-teal-400/60" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════
   Composant principal
   ═══════════════════════════════════════ */
export default function WalletScanDemo() {
  const [step, setStep] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.4 })
  const [reducedMotion, setReducedMotion] = useState(false)

  // Détection prefers-reduced-motion côté client
  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  // Cycle 10 phases × 800ms = 8s, pause hors viewport
  useEffect(() => {
    if (!isInView || reducedMotion) return
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 10)
    }, 800)
    return () => clearInterval(interval)
  }, [isInView, reducedMotion])

  const displayStep = reducedMotion ? 7 : step

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-6">
      {/* Titre */}
      <div className="text-center mb-8 md:mb-12">
        <p className="text-xs font-medium text-[var(--accent-primary)] tracking-widest uppercase mb-3">
          Démo 03 — Côté client
        </p>
        <h3 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight">
          Une carte de fidélité dans le téléphone<br />
          de chaque client.
        </h3>
        <p className="text-sm md:text-base text-[var(--text-muted)] mt-4 max-w-xl mx-auto">
          Apple Wallet, Google Wallet ou les deux. Vos clients l&apos;ouvrent en
          2 secondes, et vous gardez la main.
        </p>
      </div>

      {/* Scène cinématique */}
      <div className="relative min-h-[500px] md:min-h-0 md:aspect-[16/9] rounded-3xl bg-gradient-to-br from-[#0F1C1A] via-[#0a1513] to-black border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Halo teal subtil */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 60%)',
          }}
        />

        <Iphone step={displayStep} />

        {/* Légende contextuelle */}
        {!reducedMotion && (
          <AnimatePresence mode="wait">
            {getStepLabel(displayStep) ? (
              <motion.div
                key={displayStep}
                className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[10px] md:text-[11px] text-white/60 font-medium tracking-wider uppercase">
                  {getStepLabel(displayStep)}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
