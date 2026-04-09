"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "dots" | "numeral" | "ornament";
  number?: string;
  label?: string;
  theme?: "light" | "dark";
}

const ease = [0.22, 1, 0.36, 1] as const;

// Couleurs adaptées au thème
function useColors(theme: "light" | "dark") {
  return {
    dot: theme === "dark" ? "bg-white/20" : "bg-gray-300",
    accent: "bg-[var(--accent-primary)]",
    line: theme === "dark" ? "bg-white/20" : "bg-[var(--border-light)]",
    accentLine: "bg-[var(--accent-primary)]",
    text: theme === "dark" ? "text-white/40" : "text-[var(--text-muted)]",
    accentText: "text-[var(--accent-primary)]",
  };
}

function DotsDivider({ theme = "light" }: { theme: "light" | "dark" }) {
  const c = useColors(theme);
  return (
    <div className="flex items-center justify-center py-16 md:py-24">
      <div className="flex items-center gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`rounded-full ${i === 2 ? `w-2 h-2 ${c.accent}` : `w-1 h-1 ${c.dot}`}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.08, ease }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    </div>
  );
}

function NumeralDivider({
  number,
  label,
  theme = "light",
}: {
  number?: string;
  label?: string;
  theme: "light" | "dark";
}) {
  const c = useColors(theme);
  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-28 gap-4">
      <motion.div
        className={`h-px w-16 ${c.accentLine}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease }}
        viewport={{ once: true, amount: 0.5 }}
      />
      {number && (
        <motion.div
          className={`font-caveat text-6xl md:text-7xl ${c.accentText} leading-none`}
          style={{ transform: "rotate(-3deg)" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {number}
        </motion.div>
      )}
      {label && (
        <motion.div
          className={`text-xs tracking-[0.3em] uppercase ${c.text} font-medium`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {label}
        </motion.div>
      )}
      <motion.div
        className={`h-px w-16 ${c.accentLine}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        viewport={{ once: true, amount: 0.5 }}
      />
    </div>
  );
}

function OrnamentDivider({ theme = "light" }: { theme: "light" | "dark" }) {
  const c = useColors(theme);
  return (
    <div className="flex items-center justify-center py-16 md:py-24">
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className={`h-px w-12 ${c.line}`} />
        <div className="flex gap-1.5 items-center">
          <div className={`w-1.5 h-1.5 rounded-full ${c.accent} opacity-40`} />
          <div className={`w-2 h-2 rounded-full ${c.accent}`} />
          <div className={`w-1.5 h-1.5 rounded-full ${c.accent} opacity-40`} />
        </div>
        <div className={`h-px w-12 ${c.line}`} />
      </motion.div>
    </div>
  );
}

export default function SectionDivider({
  variant = "dots",
  number,
  label,
  theme = "light",
}: SectionDividerProps) {
  switch (variant) {
    case "numeral":
      return <NumeralDivider number={number} label={label} theme={theme} />;
    case "ornament":
      return <OrnamentDivider theme={theme} />;
    default:
      return <DotsDivider theme={theme} />;
  }
}
