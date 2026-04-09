# Mémoire Projet — Filanor Tech

## État actuel
- Dernière session : 9 avril 2026 (nuit)
- Site complet, build OK, prêt pour déploiement Vercel
- Score audit impeccable : 18.5/20, zéro P0/P1 bloquant
- Branche git active : main

## Stack
Next.js 16, React 19, TypeScript strict, Tailwind v4, Framer Motion, 
Plus Jakarta Sans + Caveat, Lenis, lucide-react.
Recharts désinstallé. GSAP supprimé sauf ScrollTrigger.

## Sections finalisées
- Hero typographique avec NetworkMesh teal background
- Services 3 piliers full-bleed (Pilier 02 "Pour vous, et pour vos clients" englobe automatisations pro + cartes Wallet client)
- Interstice "Assez parlé / Regardez" annonce 3 démos
- Laboratory : 3 démos cinématiques
- Sectors : 8 cards reveal layered + 8 modals avec mockups CSS spécifiques
- Team portrait éditorial 2 fondateurs (Filip + Daniel)
- Garanties Acte d'engagement avec signatures Caveat
- Contact panneau sombre + formulaire (mode démo)
- Footer + Mentions légales 9 sections (LPD 2023, LDA, Lausanne)

## Démos Laboratory (3)
1. NightAutomation : 3 panneaux scène nocturne, cycle 9s
2. ChaosToClarity : transformation 5s + dashboard 5 vues interactives 
   (Home/Agenda/Messages/Facturation/Stats), toutes avec micro-interactions 
   locales (dropdowns, switchers Jour/Semaine/Mois, conversation, 
   sélecteur de mois, filtres 7j/30j/90j)
3. WalletScan : iPhone CSS + carte fidélité Da Marco avec barre progression 
   dorée 7→8/10, cycle 8s, logo Filanor PNG turquoise en filigrane sur 
   lockscreen, Face ID + NFC + Terminé en zone interaction sous la carte

## Effets globaux
- Shimmer text-teal sur 5 phrases Caveat avec padding compensatoire 
  (Hero/Interstice/Team/Guarantees/Contact)
- Floating navbar avec section active via IntersectionObserver
- Scroll progress + Scroll to top
- Section dividers entre sections

## Règles tonalité
- Vouvoiement décontracté français
- JAMAIS : SaaS, Agent IA, dashboard visible client, chatbot, workflow
- TOUJOURS : "automatisations intelligentes", "applications web sur mesure"

## Palette Émeraude Tech
- Background primary : #FAFDF7
- Dark panel : #0F1C1A
- Accent primary (dark) : #0D9488
- Accent light : #14B8A6
- Accent pale : #5EEAD4
- Tokens CSS : var(--accent-primary), var(--accent-light), var(--accent-pale), var(--bg-primary), var(--dark-panel)

## À FAIRE — Bloquants déploiement
1. SEO + Open Graph (layout.tsx metadata, opengraph-image.tsx, sitemap.ts, robots.ts)
2. Mobile check sur toutes les sections

## À FAIRE — Configurations externes
3. Email pro Infomaniak : récupérer adresse exacte (probablement hello@filanor.ch ou contact@filanor.ch), mettre à jour Contact.tsx + Footer + mentions légales, connecter formulaire via Resend ou Infomaniak SMTP
4. Domaine filanor.ch (acheté Infomaniak) : ajouter dans Vercel custom domains, configurer DNS Infomaniak (A record + CNAME www), HTTPS auto Let's Encrypt
5. Calendly : créer compte, type "Appel découverte 15 min", récupérer lien public, connecter dans Contact.tsx au bouton "Choisir un créneau"

## À FAIRE — Mentions légales
6. Adresse postale Lausanne complète à compléter
7. Numéro IDE/CHE quand inscription RC reçue (semaine prochaine)
8. Retirer mentions "(en cours d'inscription)" et "attribué prochainement"

## À FAIRE — Photos et liens
9. Remplacer public/team/daniel.jpg (actuellement = même que filip placeholder)
10. Créer comptes LinkedIn + Instagram, mettre URLs dans footer

## À FAIRE — Optionnel post-deploy
11. Section FAQ (5-6 questions PME)
12. Section Processus 4 étapes (découverte → devis → construction → lancement)
13. Migration ~15 couleurs hardcodées restantes vers tokens CSS

## À skipper pour l'instant
- Témoignages clients (pas de vrais clients)
- Études de cas / portfolio
- Multilangue DE/EN
- Blog
- Page pricing publique

## Méthode de travail
- Filip ne code pas : Claude rédige prompts, Filip colle dans Claude Code
- Un prompt = une mission, jamais de mégaprompts
- npm run build après chaque prompt avant de continuer
- Sessions parallèles possibles si fichiers différents (NE PAS build + 1 build manuel final)
- Skills installés : frontend-design, nextjs-patterns, gsap-react, ui-ux-expert, interactive-ux, systematic-debugging, web-performance, emil-design-eng, impeccable

## Prochaine session
Mot-clé : "on reprend"
Objectif : déploiement Vercel complet (SEO + OG + sitemap + robots + 
custom domain filanor.ch + Calendly + email Infomaniak connecté)
