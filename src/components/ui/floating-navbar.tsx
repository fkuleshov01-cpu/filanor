"use client";
import React, { useState, useEffect } from "react";
import { FilanorLogo } from "@/components/brand/FilanorLogo";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  link: string;
  icon?: React.ReactNode;
};

export const FloatingNav = ({
  navItems,
  className,
  ctaLabel = "Nous contacter",
  ctaTargetId = "contact",
}: {
  navItems: NavItem[];
  className?: string;
  ctaLabel?: string;
  ctaTargetId?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Détection de la section visible via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems
      .map((item) => item.link.replace("#", ""))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const prev = scrollYProgress.getPrevious() ?? 0;
      const direction = current - prev;

      // Toujours visible quand en haut de la page
      if (current < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  // Scroll programmatique (compatible Lenis)
  const scrollTo = (e: React.MouseEvent, link: string) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(link.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        aria-label="Navigation principale"
        className={cn(
          "flex max-w-fit fixed top-[max(1.5rem,calc(env(safe-area-inset-top)+0.5rem))] inset-x-0 mx-auto z-40 items-center justify-center",
          className
        )}
      >
        <div className="flex items-center justify-center gap-2 rounded-full border border-gray-200/60 bg-[var(--bg-primary)]/85 px-2 py-1.5 shadow-lg shadow-black/5 backdrop-blur-md will-change-transform">
          {/* Logo — clickable pour scroll top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full p-2 transition-colors hover:bg-[var(--accent-light)]"
            aria-label="Retour en haut"
          >
            <FilanorLogo className="h-6 w-6" aria-hidden="true" />
            <span className="hidden sm:block font-bold text-[var(--text-primary)]">
              Filanor
            </span>
          </button>

          <div className="h-5 w-px bg-gray-200" />

          <div className="flex items-center gap-1">
            {navItems.map((item, idx) => {
              const sectionId = item.link.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={`link-${idx}`}
                  href={item.link}
                  onClick={(e) => scrollTo(e, item.link)}
                  aria-label={item.name}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:bg-[var(--accent-light)] hover:text-[var(--accent-primary)]",
                    isActive
                      ? "text-teal-600 font-semibold"
                      : "text-[var(--text-secondary)] font-medium"
                  )}
                >
                  {item.icon && <span className="block sm:hidden">{item.icon}</span>}
                  <span className="hidden sm:block">{item.name}</span>

                  {/* Point teal sous le lien actif */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </div>

          <div className="h-5 w-px bg-gray-200" />

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById(ctaTargetId);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative flex items-center justify-center gap-2 rounded-full bg-[var(--accent-primary)] px-3 sm:px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-[var(--accent-primary-30)]"
            aria-label="Nous contacter"
          >
            <Mail className="h-4 w-4 sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">{ctaLabel}</span>
          </button>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};
