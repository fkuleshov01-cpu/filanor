"use client";

import Link from "next/link";
import { FilanorLogo } from "@/components/brand/FilanorLogo";
import { Mail, MapPin, Phone } from "lucide-react";

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const navLinks = [
  { label: "Services", id: "services" },
  { label: "Laboratoire", id: "laboratoire" },
  { label: "Secteurs", id: "secteurs" },
  { label: "Qui sommes-nous", id: "qui-sommes-nous" },
  { label: "Garanties", id: "garanties" },
  { label: "Contact", id: "contact" },
];

const services = [
  "Applications web sur mesure",
  "Automatisations intelligentes",
  "Sites vitrines premium",
  "Tableaux de bord métier",
];

export default function Footer() {
  // Scroll programmatique (compatible Lenis)
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--dark-panel)] overflow-hidden">
      {/* Halo décoratif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[rgba(20,184,166,0.04)] blur-3xl"
      />
      {/* Bandeau gradient en haut */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-secondary)] to-transparent"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        {/* Bloc principal — 4 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Colonne 1 — Logo + tagline + réseaux (4/12) */}
          <div className="lg:col-span-4">
            <FilanorLogo showWordmark variant="light" className="h-10 w-auto" aria-hidden="true" />
            <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-xs">
              On construit des applications web sur mesure et des
              automatisations intelligentes pour les PME suisses qui veulent
              passer à l&apos;échelle supérieure.
            </p>

            {/* Réseaux sociaux */}
            <div className="mt-6 flex items-center gap-3">
              {/* TODO: ajouter vrais URLs quand comptes créés */}
              <span
                aria-hidden="true"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40"
              >
                <LinkedinIcon size={18} />
              </span>
              <span
                aria-hidden="true"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40"
              >
                <InstagramIcon size={18} />
              </span>
              <a
                href="mailto:contact@filanor.ch"
                aria-label="Email"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--accent-secondary-10)] hover:border-[var(--accent-secondary-30)] hover:text-[var(--accent-secondary)] transition-all duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Colonne 2 — Navigation (3/12) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-white/70 hover:text-[var(--accent-secondary)] cursor-pointer transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Services (3/12) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">
              Ce qu&apos;on fait
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm text-white/70"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact (2/12) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">
              Contact
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:contact@filanor.ch"
                  className="flex items-start gap-2 text-sm text-white/70 hover:text-[var(--accent-secondary)] transition-colors duration-200 group"
                >
                  <Mail
                    size={14}
                    className="mt-0.5 text-[var(--accent-secondary)] flex-shrink-0"
                  />
                  <span className="break-all">contact@filanor.ch</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin
                  size={14}
                  className="mt-0.5 text-[var(--accent-secondary)] flex-shrink-0"
                />
                <span>Lausanne, Suisse</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Phone
                  size={14}
                  className="mt-0.5 text-[var(--accent-secondary)] flex-shrink-0"
                />
                <span>Sur demande</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="mt-12 mb-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bas — copyright + mentions légales */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/40">
            © {new Date().getFullYear()} Filanor Tech SNC — Tous droits réservés
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/mentions-legales"
              className="text-xs text-white/40 hover:text-[var(--accent-secondary)] transition-colors duration-200"
            >
              Mentions légales
            </Link>
            <Link
              href="/mentions-legales#donnees"
              className="text-xs text-white/40 hover:text-[var(--accent-secondary)] transition-colors duration-200"
            >
              Confidentialité
            </Link>
          </div>
        </div>

        {/* Tagline finale */}
        <p className="mt-8 text-center text-xs italic text-white/30">
          Fait avec du code, du café et beaucoup de nuits blanches.
        </p>
      </div>
    </footer>
  );
}
