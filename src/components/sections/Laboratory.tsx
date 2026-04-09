"use client";

import { motion } from "framer-motion";
import NightAutomationDemo from "./demos/NightAutomationDemo";
import ChaosToClarityDemo from "./demos/ChaosToClarityDemo";
import WalletScanDemo from "./demos/WalletScanDemo";

export default function Laboratory() {
  return (
    <section
      id="laboratoire"
      className="py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden"
    >
      {/* DÉMO 1 — Automatisation nocturne */}
      <NightAutomationDemo />

      {/* Transition narrative entre les 2 démos */}
      <div className="max-w-3xl mx-auto px-6 text-center py-20 md:py-32">
        <motion.p
          className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Et ça, c&apos;est juste une partie de ce qui tourne en
          arrière-plan.
        </motion.p>
      </div>

      {/* DÉMO 2 — Chaos to clarity */}
      <ChaosToClarityDemo />

      {/* Transition vers démo 3 — pivot côté pro → côté client */}
      <div className="max-w-3xl mx-auto px-6 text-center py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium leading-relaxed">
            Jusqu&apos;ici, vous avez vu ce qui se passe{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              de votre côté du comptoir.
            </span>
          </p>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium leading-relaxed mt-3">
            Voici ce que ça change{' '}
            <span className="text-[var(--accent-primary)] font-semibold">
              pour ceux qui passent la porte.
            </span>
          </p>
        </motion.div>
      </div>

      {/* DÉMO 3 — Wallet Scan */}
      <WalletScanDemo />
    </section>
  );
}
