"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 group"
          aria-label="Retour en haut"
        >
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] text-white shadow-lg shadow-[var(--accent-primary-30)] transition-all duration-200 group-hover:shadow-xl group-hover:shadow-[var(--accent-primary-30)] group-hover:scale-110 group-active:scale-95">
            <ArrowUp size={20} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
