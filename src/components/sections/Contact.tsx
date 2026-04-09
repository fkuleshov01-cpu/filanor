"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";

// Easing personnalisé pour les animations d'entrée
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const inputClass =
  "peer w-full bg-transparent border-0 border-b border-white/20 px-0 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:border-[var(--accent-secondary)] transition-colors duration-300";

const labelClass =
  "absolute left-0 top-1 text-xs font-medium text-white/50 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[var(--accent-secondary)]";

// Particules flottantes — valeurs déterministes (pas de Math.random pour éviter SSR mismatch)
// Particules réduites à 5 — subtiles, pas envahissantes
const particles = [
  { left: "12%", size: 2, delay: 3, duration: 14 },
  { left: "35%", size: 3, delay: 0, duration: 16 },
  { left: "55%", size: 2, delay: 7, duration: 13 },
  { left: "72%", size: 3, delay: 4, duration: 15 },
  { left: "90%", size: 2, delay: 10, duration: 12 },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(null), 4000);
  };

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      showToast("Merci de remplir tous les champs obligatoires.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      showToast("L'adresse email ne semble pas valide.");
      return;
    }

    setName(trimmedName);
    setEmail(trimmedEmail);
    setPhone(phone.trim());
    setMessage(trimmedMessage);

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4500);
    }, 1200);
  };


  return (
    <section
      id="contact"
      className="relative bg-[var(--bg-secondary)] py-20 md:py-28 overflow-hidden"
    >
      {/* Halos décoratifs sur le fond clair */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 -left-40 w-96 h-96 rounded-full bg-[var(--accent-light)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-[rgba(20,184,166,0.06)] blur-3xl"
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* En-tête centré */}
        <motion.div
          className="contact-title text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: smoothEase }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-primary-20)] bg-white px-4 py-1.5 text-xs font-medium text-[var(--accent-primary)] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-primary)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
            </span>
            Disponible — On répond en moins de 24h
          </div>
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
            Convaincu ?{" "}
            <span className="text-shimmer-teal font-bold">On en parle.</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Un message, un appel, un café à Lausanne — comme vous voulez.
          </p>
        </motion.div>

        {/* Panneau principal sombre avec contenu split */}
        <motion.div
          className="contact-panel mt-14 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Glow externe du panneau */}
          <div
            aria-hidden
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#14B8A6] via-[#0D9488] to-[#5EEAD4] opacity-30 blur-2xl"
          />

          <div className="relative rounded-3xl bg-[var(--dark-panel)] overflow-hidden border border-[var(--accent-secondary-20)] shadow-2xl">
            {/* Gradient mesh interne */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 20%, rgba(20, 184, 166, 0.25), transparent 50%),
                  radial-gradient(ellipse at 80% 80%, rgba(13, 148, 136, 0.25), transparent 50%),
                  radial-gradient(ellipse at 50% 50%, rgba(94, 234, 212, 0.1), transparent 60%)
                `,
              }}
            />

            {/* Grid pattern subtile */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-30 [background-size:32px_32px] [background-image:linear-gradient(rgba(20,184,166,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.06)_1px,transparent_1px)]"
            />

            {/* Particules flottantes teal */}
            <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((p, idx) => (
                <span
                  key={idx}
                  className="particle"
                  style={{
                    left: p.left,
                    bottom: 0,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* COLONNE GAUCHE — Formulaire (3/5) */}
              <div className="lg:col-span-3 p-8 sm:p-10 lg:p-12">
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] flex items-center justify-center shadow-lg shadow-[rgba(20,184,166,0.5)]"
                      >
                        <CheckCircle2 className="text-white" size={40} />
                      </motion.div>
                      <h3 className="mt-6 text-2xl font-bold text-white">
                        Message reçu !
                      </h3>
                      <p className="mt-2 text-sm text-white/60 max-w-xs">
                        On vous recontacte sous 24h. Promis, pas de bot, pas de
                        copier-coller.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 mb-8">
                        <MessageSquare
                          className="text-[var(--accent-secondary)]"
                          size={20}
                        />
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                          Envoyez-nous un message
                        </h3>
                      </div>

                      {/* Champs avec floating labels */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="relative">
                          <input
                            id="contact-name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=" "
                            className={inputClass}
                            required
                            maxLength={100}
                          />
                          <label
                            htmlFor="contact-name"
                            className={labelClass}
                          >
                            Votre nom
                          </label>
                        </div>

                        <div className="relative">
                          <input
                            id="contact-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" "
                            className={inputClass}
                            required
                            maxLength={254}
                          />
                          <label
                            htmlFor="contact-email"
                            className={labelClass}
                          >
                            Email professionnel
                          </label>
                        </div>
                      </div>

                      <div className="relative pt-4">
                        <input
                          id="contact-phone"
                          type="tel"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder=" "
                          className={inputClass}
                          maxLength={20}
                        />
                        <label
                          htmlFor="contact-phone"
                          className={`${labelClass} top-5`}
                        >
                          Téléphone (optionnel)
                        </label>
                      </div>

                      <div className="relative pt-4">
                        <textarea
                          id="contact-message"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder=" "
                          className={`${inputClass} resize-none`}
                          required
                          maxLength={2000}
                        />
                        <label
                          htmlFor="contact-message"
                          className={`${labelClass} top-5`}
                        >
                          Qu&apos;est-ce qui vous bloque ?
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group relative w-full mt-8 bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-[rgba(20,184,166,0.5)] active:scale-[0.99] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(20,184,166,0.4)] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2 overflow-hidden"
                      >
                        {/* Sweep effect */}
                        <span
                          aria-hidden
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />

                        {status === "sending" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <span className="relative">Envoyer le message</span>
                            <ArrowRight
                              size={18}
                              className="relative transition-transform group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </button>

                      <p className="mt-5 text-center text-xs text-white/40">
                        En envoyant ce message, vous acceptez qu&apos;on vous
                        recontacte. C&apos;est tout, on ne fait rien
                        d&apos;autre avec vos données.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* COLONNE DROITE — Infos contact (2/5) */}
              <div className="lg:col-span-2 p-8 sm:p-10 lg:p-12 lg:border-l border-t lg:border-t-0 border-white/10 bg-[rgba(20,184,166,0.04)]">
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles className="text-[var(--accent-secondary)]" size={20} />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                    Autres options
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Calendly */}
                  <motion.div
                    className="contact-side group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: smoothEase, delay: 0 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="https://calendly.com/contact-filanor/appel-decouverte"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-[var(--accent-secondary-30)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] flex items-center justify-center shadow-md shadow-[rgba(20,184,166,0.4)] flex-shrink-0">
                          <Calendar className="text-white" size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white">
                            Réserver un appel
                          </div>
                          <div className="text-xs text-white/60 mt-0.5">
                            15 min, sans engagement
                          </div>
                          <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-secondary)] group-hover:gap-2 transition-all">
                            Choisir un créneau
                            <ArrowRight size={12} />
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    className="contact-side"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: smoothEase, delay: 0.12 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="mailto:contact@filanor.ch"
                      className="block p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-[var(--accent-secondary-30)] hover:-translate-y-0.5 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-[rgba(20,184,166,0.12)] border border-[var(--accent-secondary-20)] flex items-center justify-center flex-shrink-0">
                          <Mail className="text-[var(--accent-secondary)]" size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white">
                            Écrivez-nous
                          </div>
                          <div className="text-xs text-[var(--accent-secondary)] font-medium mt-0.5 truncate">
                            contact@filanor.ch
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>

                  {/* Téléphone */}
                  <motion.div
                    className="contact-side"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: smoothEase, delay: 0.18 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-[rgba(20,184,166,0.12)] border border-[var(--accent-secondary-20)] flex items-center justify-center flex-shrink-0">
                          <Phone className="text-[var(--accent-secondary)]" size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white">
                            Téléphone
                          </div>
                          <div className="space-y-1 mt-1">
                            <a
                              href="tel:+41763756445"
                              className="block text-xs text-[var(--accent-secondary)] font-medium hover:text-[var(--accent-pale)] transition-colors"
                            >
                              +41 76 375 64 45
                            </a>
                            <a
                              href="tel:+41788127369"
                              className="block text-xs text-[var(--accent-secondary)] font-medium hover:text-[var(--accent-pale)] transition-colors"
                            >
                              +41 78 812 73 69
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Lieu */}
                  <motion.div
                    className="contact-side p-5 rounded-2xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: smoothEase, delay: 0.24 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[rgba(20,184,166,0.12)] border border-[var(--accent-secondary-20)] flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-[var(--accent-secondary)]" size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          Lausanne, Suisse
                        </div>
                        <div className="text-xs text-white/60 mt-0.5">
                          Café offert si vous passez ☕
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Réponse rapide */}
                  <motion.div
                    className="contact-side p-5 rounded-2xl bg-gradient-to-br from-[rgba(20,184,166,0.15)] to-[rgba(13,148,136,0.05)] border border-[rgba(20,184,166,0.25)]"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: smoothEase, delay: 0.36 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="text-[var(--accent-secondary)]" size={18} />
                      <div className="text-xs text-white/70">
                        <span className="font-bold text-white">
                          Temps de réponse moyen
                        </span>{" "}
                        : <span className="text-[var(--accent-secondary)] font-semibold">2h ouvrées</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 bg-[var(--text-primary)] text-white px-6 py-3 rounded-xl shadow-xl border border-white/10"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
