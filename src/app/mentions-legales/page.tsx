import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, Server, Shield, Cookie, Scale, FileText, Mail } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Mentions légales — Filanor Tech",
  description:
    "Mentions légales, conditions d'utilisation et politique de confidentialité de Filanor Tech SNC, agence web basée à Lausanne.",
};

// Sections de la page — chaque section a une icône, un titre et un contenu
const sections = [
  {
    id: "editeur",
    icon: Building2,
    title: "1. Éditeur du site",
    content: (
      <>
        <p className="mb-3">
          Le présent site est édité par :
        </p>
        <div className="rounded-xl bg-[#F0F7F4] border border-[rgba(13,148,136,0.15)] p-5 space-y-2">
          <p>
            <span className="font-semibold text-[#111827]">
              Filanor Tech SNC
            </span>{" "}
            <span className="text-[#9CA3AF] text-sm">
              (en cours d&apos;inscription au Registre du Commerce du canton de
              Vaud)
            </span>
          </p>
          <p className="text-sm">
            <span className="text-[#4B5563]">Forme juridique :</span>{" "}
            Société en nom collectif (SNC)
          </p>
          <p className="text-sm">
            <span className="text-[#4B5563]">Associés :</span> Filip Kuleshov
            et Daniel Shevchenko
          </p>
          <p className="text-sm">
            <span className="text-[#4B5563]">Siège :</span> Lausanne, Suisse
          </p>
          <p className="text-sm">
            <span className="text-[#4B5563]">Email :</span>{" "}
            <a
              href="mailto:contact@filanor.ch"
              className="text-[#0D9488] font-medium hover:underline"
            >
              contact@filanor.ch
            </a>
          </p>
          <p className="text-sm">
            <span className="text-[#4B5563]">Numéro IDE / CHE :</span>{" "}
            <span className="italic text-[#9CA3AF]">
              attribué prochainement (inscription en cours)
            </span>
          </p>
        </div>
        <p className="mt-4 text-sm">
          Filanor Tech SNC est une jeune entreprise fondée en 2026. Les
          informations relatives au Registre du Commerce seront mises à jour
          dès l&apos;inscription officielle.
        </p>
      </>
    ),
  },
  {
    id: "directeur-publication",
    icon: FileText,
    title: "2. Directeur de la publication",
    content: (
      <p>
        La direction de la publication du site est assurée conjointement par
        Filip Kuleshov et Daniel Shevchenko, co-fondateurs de Filanor Tech SNC.
        Pour toute question relative au contenu publié, vous pouvez nous écrire
        à{" "}
        <a
          href="mailto:contact@filanor.ch"
          className="text-[#0D9488] font-medium hover:underline"
        >
          contact@filanor.ch
        </a>
        .
      </p>
    ),
  },
  {
    id: "hebergement",
    icon: Server,
    title: "3. Hébergement",
    content: (
      <>
        <p className="mb-3">Ce site est hébergé par :</p>
        <div className="rounded-xl bg-[#F0F7F4] border border-[rgba(13,148,136,0.15)] p-5 space-y-1 text-sm">
          <p className="font-semibold text-[#111827]">Vercel Inc.</p>
          <p className="text-[#4B5563]">340 S Lemon Ave #4133</p>
          <p className="text-[#4B5563]">Walnut, CA 91789</p>
          <p className="text-[#4B5563]">États-Unis</p>
          <p className="pt-1">
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D9488] font-medium hover:underline"
            >
              vercel.com
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    id: "propriete",
    icon: Shield,
    title: "4. Propriété intellectuelle",
    content: (
      <>
        <p className="mb-3">
          L&apos;ensemble du contenu présent sur ce site (textes, images,
          logos, code source, design, animations, vidéos, structure
          d&apos;arborescence) est la propriété exclusive de Filanor Tech SNC,
          sauf mention contraire explicite.
        </p>
        <p className="mb-3">
          Toute reproduction, représentation, modification, publication,
          adaptation ou exploitation de tout ou partie des éléments du site,
          quel que soit le moyen ou le procédé utilisé, est interdite sans
          autorisation écrite préalable de Filanor Tech SNC.
        </p>
        <p>
          Toute exploitation non autorisée du site ou de l&apos;un quelconque
          de ses éléments est susceptible de constituer une contrefaçon
          sanctionnée par les dispositions légales suisses en vigueur,
          notamment la Loi fédérale sur le droit d&apos;auteur (LDA).
        </p>
      </>
    ),
  },
  {
    id: "donnees",
    icon: Shield,
    title: "5. Protection des données personnelles",
    content: (
      <>
        <p className="mb-3">
          Conformément à la Loi fédérale sur la protection des données (LPD)
          révisée, entrée en vigueur le 1er septembre 2023, et au Règlement
          général sur la protection des données (RGPD) lorsqu&apos;il
          s&apos;applique, nous nous engageons à protéger vos données
          personnelles.
        </p>

        <h3 className="text-base font-semibold text-[#111827] mt-5 mb-2">
          Données collectées
        </h3>
        <p className="mb-3">
          Lorsque vous utilisez notre formulaire de contact, nous collectons
          uniquement les données strictement nécessaires pour vous répondre :
          votre nom, votre adresse email, votre numéro de téléphone (optionnel)
          et le contenu de votre message.
        </p>

        <h3 className="text-base font-semibold text-[#111827] mt-5 mb-2">
          Finalité du traitement
        </h3>
        <p className="mb-3">
          Vos données sont utilisées exclusivement pour vous recontacter,
          répondre à votre demande, et le cas échéant, vous transmettre une
          proposition commerciale. Elles ne sont jamais vendues, louées ou
          transmises à des tiers à des fins marketing.
        </p>

        <h3 className="text-base font-semibold text-[#111827] mt-5 mb-2">
          Durée de conservation
        </h3>
        <p className="mb-3">
          Vos données sont conservées pendant une durée maximale de 3 ans à
          compter du dernier contact, sauf si vous demandez leur suppression
          avant.
        </p>

        <h3 className="text-base font-semibold text-[#111827] mt-5 mb-2">
          Vos droits
        </h3>
        <p className="mb-3">
          Vous disposez à tout moment d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, de portabilité et d&apos;opposition
          concernant vos données personnelles. Pour exercer ces droits,
          envoyez-nous simplement un email à{" "}
          <a
            href="mailto:contact@filanor.ch"
            className="text-[#0D9488] font-medium hover:underline"
          >
            contact@filanor.ch
          </a>
          . Nous vous répondrons dans un délai maximal de 30 jours.
        </p>

        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          également déposer une plainte auprès du Préposé fédéral à la
          protection des données et à la transparence (PFPDT) :{" "}
          <a
            href="https://www.edoeb.admin.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0D9488] font-medium hover:underline"
          >
            edoeb.admin.ch
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "6. Cookies",
    content: (
      <>
        <p className="mb-3">
          Notre site utilise un nombre minimal de cookies, uniquement
          nécessaires à son bon fonctionnement (cookies techniques). Ces
          cookies ne nécessitent pas votre consentement préalable conformément
          à la législation suisse.
        </p>
        <p>
          Nous n&apos;utilisons pas de cookies de tracking publicitaire ni de
          cookies tiers à des fins marketing. Si nous venions à intégrer des
          outils d&apos;analyse comportementale (type Google Analytics), nous
          mettrions en place une bannière de consentement et mettrions à jour
          la présente politique.
        </p>
      </>
    ),
  },
  {
    id: "responsabilite",
    icon: Scale,
    title: "7. Limitation de responsabilité",
    content: (
      <>
        <p className="mb-3">
          Les informations diffusées sur ce site sont fournies à titre
          indicatif. Filanor Tech SNC s&apos;efforce d&apos;assurer
          l&apos;exactitude et la mise à jour des informations publiées, mais
          ne peut garantir l&apos;absence totale d&apos;erreurs ou
          d&apos;omissions.
        </p>
        <p className="mb-3">
          Filanor Tech SNC ne pourra être tenue responsable des dommages
          directs ou indirects résultant de l&apos;utilisation du site, ni de
          l&apos;impossibilité d&apos;y accéder.
        </p>
        <p>
          Le site peut contenir des liens vers des sites externes. Filanor
          Tech SNC n&apos;exerce aucun contrôle sur ces sites et décline toute
          responsabilité quant à leur contenu.
        </p>
      </>
    ),
  },
  {
    id: "droit",
    icon: Scale,
    title: "8. Droit applicable et juridiction",
    content: (
      <>
        <p className="mb-3">
          Les présentes mentions légales sont soumises au droit suisse. En cas
          de litige relatif à l&apos;interprétation ou à l&apos;exécution des
          présentes, et à défaut de résolution amiable, les tribunaux
          compétents du canton de Vaud seront seuls compétents.
        </p>
        <p>
          Le for juridique exclusif est fixé à Lausanne, Suisse.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "9. Contact",
    content: (
      <>
        <p className="mb-3">
          Pour toute question relative aux présentes mentions légales, à la
          protection de vos données ou à l&apos;utilisation du site,
          n&apos;hésitez pas à nous contacter :
        </p>
        <div className="rounded-xl bg-gradient-to-br from-[rgba(13,148,136,0.08)] to-[rgba(20,184,166,0.04)] border border-[rgba(13,148,136,0.2)] p-5">
          <p className="text-sm">
            <span className="font-semibold text-[#111827]">Email :</span>{" "}
            <a
              href="mailto:contact@filanor.ch"
              className="text-[#0D9488] font-medium hover:underline"
            >
              contact@filanor.ch
            </a>
          </p>
          <p className="text-sm mt-1">
            <span className="font-semibold text-[#111827]">Adresse :</span>{" "}
            Lausanne, Suisse
          </p>
        </div>
      </>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <div style={{ background: "#FAFDF7" }}>
      <Navbar />

      {/* Hero de la page */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 overflow-hidden">
        {/* Halos décoratifs */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-20 -left-40 w-96 h-96 rounded-full bg-[rgba(13,148,136,0.08)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 -right-40 w-96 h-96 rounded-full bg-[rgba(20,184,166,0.06)] blur-3xl"
        />

        <div className="relative max-w-[800px] mx-auto px-6">
          {/* Lien retour */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#0D9488] transition-colors duration-200 group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Retour à l&apos;accueil
          </Link>

          <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-[#111827]">
            Mentions légales
          </h1>
          <p className="mt-4 text-lg text-[#4B5563]">
            Tout ce qu&apos;il faut savoir, sans le jargon. Promis, on a fait
            de notre mieux pour rester clair.
          </p>
          <p className="mt-3 text-sm text-[#9CA3AF]">
            Dernière mise à jour : 7 avril 2026
          </p>
        </div>
      </section>

      {/* Contenu des sections */}
      <section className="relative pb-24">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="space-y-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} id={section.id}>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center shadow-md shadow-[rgba(13,148,136,0.25)] flex-shrink-0">
                      <Icon className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                        {section.title}
                      </h2>
                      <div className="mt-4 text-[#4B5563] leading-relaxed text-[15px]">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bloc de fin */}
          <div className="mt-16 p-6 rounded-2xl bg-[#0F1C1A] border border-[rgba(20,184,166,0.2)] text-center">
            <p className="text-white/80 text-sm">
              Une question sur ces mentions légales ?
            </p>
            <a
              href="mailto:contact@filanor.ch"
              className="inline-flex items-center gap-2 mt-3 text-[#14B8A6] font-semibold hover:text-[#5EEAD4] transition-colors"
            >
              <Mail size={16} />
              contact@filanor.ch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
