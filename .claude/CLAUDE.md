# Projet : Filanor Tech SNC — Site Vitrine

## Qui je suis
Filip Kuleshov, 20 ans, Lausanne (Suisse). Agence tech avec Daniel Shevchenko. Applications web sur mesure + automatisations intelligentes pour PME suisses.

## Skills disponibles (8 skills)

**OBLIGATOIRE** : Avant tout travail, lis les skills pertinents dans `.claude/skills/` :

### Design & Esthétique
- `.claude/skills/frontend-design/SKILL.md` — **Light mode, palette Émeraude Tech, style Stripe, Plus Jakarta Sans.** Lis AVANT tout composant visuel.
- `.claude/skills/ui-ux-expert/SKILL.md` — Design tokens, espacement, accessibilité WCAG, responsive, conversion.

### Ton & Contenu
- `.claude/skills/tone-and-copy/SKILL.md` — **Ton provocateur + accessible, vouvoiement, langage sans jargon.** Lis AVANT de rédiger tout texte sur le site.

### Animation & 3D
- `.claude/skills/gsap-react/SKILL.md` — GSAP dans React/Next.js : useGSAP, ScrollTrigger. Lis AVANT toute animation.

### Framework
- `.claude/skills/nextjs-patterns/SKILL.md` — Next.js 15 App Router : hydration errors, "use client", Plus Jakarta Sans. Lis AVANT de toucher à layout/page/SSR.

### Qualité & Debug
- `.claude/skills/systematic-debugging/SKILL.md` — Méthodologie de debug. Lis QUAND un bug apparaît.
- `.claude/skills/interactive-ux/SKILL.md` — Tout clickable, hover states, navigation. Lis QUAND des éléments ne sont pas interactifs.
- `.claude/skills/web-performance/SKILL.md` — GPU animations, lazy loading, 3D performance. Lis QUAND le site est lent.

## Règles absolues du site

### Contenu
- **JAMAIS** "SaaS", "Agent IA", "dashboard", "chatbot", "workflow"
- **JAMAIS** de noms de clients
- Formulaire en **mode démo** (toast de confirmation)
- **Vouvoiement** partout, ton provocateur mais accessible
- Langue : **français** (contenu ET commentaires)

### Design
- **LIGHT MODE uniquement**
- **Font : Plus Jakarta Sans** — JAMAIS Inter, Geist, Roboto
- **Palette Émeraude** : fond #FAFDF7, accent #0D9488 / #14B8A6
- **PAS de glassmorphism, PAS de gradient bleu-violet**
- Style inspiré de stripe.com

### Code
- TypeScript strict, zéro `any`
- PAS de `Math.random()`
- Mobile-first, Lighthouse > 90

## Structure du site (6 sections)
1. Hero — titre provoc + gradient mesh + petit objet 3D
2. Services — 2 piliers pleine largeur
3. Laboratoire — 2 démos (dashboard + avant/après)
4. Qui sommes-nous — bios + histoire jeu vidéo
5. Garanties — 3 garanties concrètes
6. Contact + Footer
