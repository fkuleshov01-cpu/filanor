"use client";

import type { HighlightId } from "@/data/justine-highlights";

const SERIF = 'var(--font-justine-serif), "Playfair Display", serif';
const SANS = "var(--font-justine-sans), Inter, sans-serif";
const SAGE = "#A8B5A0";
const BROWN = "#8B7355";

type Props = { id: HighlightId };

export default function HighlightContent({ id }: Props) {
  switch (id) {
    case "dispos":
      return <DisposBlock />;
    case "promo":
      return <PromoBlock />;
    case "infos":
      return <InfosBlock />;
    case "tarifs":
      return <TarifsBlock />;
    case "reserver":
      return <ReserverBlock />;
    case "prestations":
      return <PrestationsBlock />;
    case "atelier":
      return <AtelierBlock />;
    case "avis":
      return <AvisBlock />;
    default:
      return null;
  }
}

/* —————————————————— DISPOS —————————————————— */
const dispoSlots: Array<{ day: string; slots: string[] }> = [
  { day: "Lundi", slots: ["9h30", "14h"] },
  { day: "Mercredi", slots: ["10h", "15h30"] },
  { day: "Jeudi", slots: ["11h", "16h"] },
  { day: "Vendredi", slots: ["9h", "13h30", "17h"] },
];

function DisposBlock() {
  return (
    <div className="space-y-4" style={{ fontFamily: SANS }}>
      <header className="space-y-1.5">
        <h2
          className="text-[24px] tracking-tight leading-tight"
          style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500 }}
        >
          ✨ Créneaux disponibles cette semaine
        </h2>
        <p className="text-[13px]" style={{ color: BROWN }}>
          Quelques créneaux libres dans mon agenda
        </p>
      </header>

      <div
        className="rounded-2xl p-5 space-y-3"
        style={{
          background: "rgba(168,181,160,0.10)",
          border: "1px solid rgba(168,181,160,0.18)",
        }}
      >
        {dispoSlots.map((d) => (
          <div key={d.day} className="flex items-baseline justify-between gap-3">
            <span
              className="text-[14px]"
              style={{ color: BROWN, fontWeight: 500 }}
            >
              {d.day}
            </span>
            <span
              className="text-[14px] tabular-nums text-right"
              style={{ color: SAGE, fontWeight: 600 }}
            >
              {d.slots.join(" · ")}
            </span>
          </div>
        ))}
      </div>

      <p
        className="text-[13px] italic text-center pt-1"
        style={{ color: SAGE }}
      >
        Message direct pour réserver 🌿
      </p>
    </div>
  );
}

/* —————————————————— PROMO —————————————————— */
function PromoBlock() {
  return (
    <div className="space-y-5" style={{ fontFamily: SANS }}>
      <h2
        className="text-[24px] tracking-tight leading-tight"
        style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500 }}
      >
        🌸 Offre du moment
      </h2>

      <div
        className="rounded-2xl p-6 text-center space-y-3"
        style={{
          background: "#FFFCF8",
          border: "1px dashed rgba(168,181,160,0.45)",
        }}
      >
        <p
          className="text-[28px] leading-tight"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 500,
            color: BROWN,
          }}
        >
          — 15% sur votre première coloration
        </p>
        <div className="space-y-0.5 pt-1">
          <p className="text-[13px]" style={{ color: BROWN }}>
            Pour les nouvelles clientes uniquement
          </p>
          <p className="text-[13px]" style={{ color: BROWN }}>
            Valable jusqu'au 31 mai 2026
          </p>
        </div>
      </div>

      <p
        className="text-[13px] italic text-center"
        style={{ color: SAGE }}
      >
        Message direct pour en profiter ✨
      </p>
    </div>
  );
}

/* —————————————————— INFOS —————————————————— */
function InfosBlock() {
  return (
    <div className="space-y-5" style={{ fontFamily: SANS }}>
      <Title>Infos</Title>
      <InfoLine icon="📍">
        <p className="font-medium text-[14px]">Rue Étraz 4, 1003 Lausanne</p>
        <p className="text-[12px] mt-0.5" style={{ color: BROWN }}>
          à 3 min à pied de la place Saint-François
        </p>
      </InfoLine>
      <InfoLine icon="🕐">
        <p className="font-medium text-[14px]">Lundi — Samedi</p>
        <p className="text-[12px] mt-0.5" style={{ color: BROWN }}>
          Sur rendez-vous uniquement
        </p>
      </InfoLine>
      <InfoLine icon="📱">
        <p className="text-[14px]">Réservation via message direct ou lien en bio</p>
      </InfoLine>
      <InfoLine icon="💳">
        <p className="text-[14px]">Cash, Twint, cartes acceptées</p>
      </InfoLine>
    </div>
  );
}

/* —————————————————— TARIFS —————————————————— */
const tarifs: Array<{ category: string; items: Array<[string, string]> }> = [
  {
    category: "Coupe & brushing",
    items: [
      ["Coupe femme + brushing", "95 CHF"],
      ["Coupe homme", "55 CHF"],
      ["Brushing seul", "45 CHF"],
    ],
  },
  {
    category: "Couleur",
    items: [
      ["Couleur racines", "110 CHF"],
      ["Couleur complète", "140 CHF"],
      ["Patine / glossing", "65 CHF"],
    ],
  },
  {
    category: "Balayage & mèches",
    items: [
      ["Balayage court (carré)", "220 CHF"],
      ["Balayage mi-long", "280 CHF"],
      ["Balayage long", "320 CHF"],
      ["Décoloration complète", "dès 350 CHF"],
    ],
  },
  {
    category: "Soins",
    items: [
      ["Soin profond (30 min)", "45 CHF"],
      ["Rituel complet (1h)", "85 CHF"],
    ],
  },
];

function TarifsBlock() {
  return (
    <div className="space-y-4" style={{ fontFamily: SANS }}>
      <Title>Tarifs</Title>
      <div className="space-y-4">
        {tarifs.map((group) => (
          <div key={group.category}>
            <h3
              className="text-[10px] uppercase tracking-[0.12em] mb-1.5"
              style={{ color: SAGE, fontWeight: 600 }}
            >
              {group.category}
            </h3>
            <div className="space-y-1">
              {group.items.map(([name, price]) => (
                <div key={name} className="flex items-baseline justify-between gap-3 py-1">
                  <span className="text-[13px]">{name}</span>
                  <span
                    className="text-[13px] tabular-nums"
                    style={{ color: BROWN, fontWeight: 600 }}
                  >
                    {price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p
        className="text-[11px] italic pt-3 leading-relaxed"
        style={{ color: BROWN, opacity: 0.85 }}
      >
        Tous les prix incluent la coupe de pointes + le brushing de finition. Les tarifs peuvent varier selon la longueur et la densité du cheveu. Devis précis sur demande 🌿
      </p>
    </div>
  );
}

/* —————————————————— RÉSERVER —————————————————— */
function ReserverBlock() {
  return (
    <div className="space-y-5" style={{ fontFamily: SANS }}>
      <Title>Réserver</Title>
      <p className="text-[14px]">Deux manières simples :</p>
      <NumberedStep n="1">Envoyez-moi un message direct ici sur Instagram</NumberedStep>
      <NumberedStep n="2">
        Cliquez sur le lien dans ma bio pour voir mes disponibilités
      </NumberedStep>
      <p
        className="text-[13px] italic pt-3"
        style={{ color: BROWN }}
      >
        Je réponds dans la journée 🌿
      </p>
    </div>
  );
}

/* —————————————————— PRESTATIONS —————————————————— */
const prestations: Array<[string, string]> = [
  ["✂️", "Coupes sur-mesure femme, homme, enfant"],
  ["🎨", "Colorations végétales & classiques"],
  ["✨", "Balayages & mèches (expert cheveux bouclés & frisés)"],
  ["💫", "Soins profonds restructurants"],
  ["🤍", "Brushings & événements"],
];

function PrestationsBlock() {
  return (
    <div className="space-y-5" style={{ fontFamily: SANS }}>
      <Title>Prestations</Title>
      <div className="space-y-4">
        {prestations.map(([emoji, text]) => (
          <div key={text} className="flex items-start gap-3">
            <span className="text-[20px] leading-none shrink-0 pt-0.5">{emoji}</span>
            <span className="text-[14px] leading-snug">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* —————————————————— L'ATELIER —————————————————— */
function AtelierBlock() {
  return (
    <div
      className="space-y-5 text-center"
      style={{
        fontFamily: SANS,
        color: "#FFFCF8",
        textShadow: "0 1px 2px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        className="text-[28px] tracking-wide"
        style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 500 }}
      >
        L'atelier
      </h2>
      <p className="text-[14px] leading-relaxed">
        Un espace pensé comme un cocon, au cœur de Lausanne.
      </p>
      <p className="text-[14px] leading-relaxed">
        Lumière naturelle, ambiance feutrée, et la garantie d'être la seule cliente pendant votre rendez-vous.
      </p>
      <p className="text-[14px] leading-relaxed" style={{ opacity: 0.92 }}>
        Ici, pas de chaîne. Pas de musique forte. Pas de pression.
      </p>
      <p
        className="text-[15px] leading-relaxed pt-2"
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 500,
        }}
      >
        Juste vous, votre cheveu, et le temps qu'il faut pour bien faire 🌿
      </p>
    </div>
  );
}

/* —————————————————— AVIS —————————————————— */
const avis: Array<{ quote: string; author: string }> = [
  {
    quote:
      "Justine a transformé mes cheveux bouclés. Pour la première fois, je les vois vraiment beaux.",
    author: "Camille, cliente depuis 2024",
  },
  {
    quote:
      "Un vrai moment pour moi. Le résultat est à la hauteur de l'accueil.",
    author: "Sophie, cliente depuis 2025",
  },
  {
    quote:
      "Elle écoute, elle conseille, elle maîtrise. Je ne vais plus ailleurs.",
    author: "Marine, cliente depuis 2023",
  },
];

function AvisBlock() {
  return (
    <div className="space-y-5" style={{ fontFamily: SANS }}>
      <Title>Avis</Title>
      <div className="space-y-5">
        {avis.map((a) => (
          <figure
            key={a.author}
            className="rounded-xl p-4"
            style={{ background: "rgba(168,181,160,0.10)" }}
          >
            <blockquote
              className="text-[14px] leading-relaxed mb-2"
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 500,
                color: "#1A1A1A",
              }}
            >
              « {a.quote} »
            </blockquote>
            <figcaption
              className="text-[12px] tracking-wide"
              style={{ color: BROWN, fontWeight: 500 }}
            >
              — {a.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* —————————————————— Helpers —————————————————— */
function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[24px] tracking-tight"
      style={{
        fontFamily: SERIF,
        fontStyle: "italic",
        fontWeight: 500,
      }}
    >
      {children}
    </h2>
  );
}

function InfoLine({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[16px] leading-none pt-0.5 shrink-0">{icon}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function NumberedStep({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold tabular-nums"
        style={{ background: SAGE, color: "#FFFCF8" }}
      >
        {n}
      </span>
      <p className="text-[14px] leading-snug pt-1">{children}</p>
    </div>
  );
}
