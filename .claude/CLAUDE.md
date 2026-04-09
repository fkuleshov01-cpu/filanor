# Projet : Filanor Tech SNC — Site Vitrine

## Qui je suis
Filip Kuleshov, 20 ans, Lausanne (Suisse). Agence tech avec Daniel Shevchenko. Applications web sur mesure + automatisations intelligentes pour PME suisses.

## Skills disponibles (6 skills + impeccable)

**OBLIGATOIRE** : Avant tout travail, lis les skills pertinents dans `.claude/skills/` :

### Design & Esthétique
- `.claude/skills/frontend-design/SKILL.md` — Base design frontend. Lis AVANT tout composant visuel.
- `.claude/skills/emil-design-eng/SKILL.md` — **Philosophie Linear : animations invisibles, micro-interactions 150-250ms, ease-out, pas de gadget.** Lis AVANT toute animation ou micro-interaction.

### Ton & Contenu
- `.claude/skills/tone-and-copy/SKILL.md` — **Ton provocateur + accessible, vouvoiement, langage sans jargon.** Lis AVANT de rédiger tout texte sur le site.

### Framework
- `.claude/skills/nextjs-patterns/SKILL.md` — Next.js 15 App Router : hydration errors, "use client", Plus Jakarta Sans. Lis AVANT de toucher à layout/page/SSR.

### Qualité & Debug
- `.claude/skills/systematic-debugging/SKILL.md` — Méthodologie de debug. Lis QUAND un bug apparaît.
- `.claude/skills/web-performance/SKILL.md` — GPU animations, lazy loading, 3D performance. Lis QUAND le site est lent.

### Impeccable (pbakaus) — vocabulaire design + 20 slash commands
Commandes clés : `/polish`, `/audit`, `/typeset`, `/arrange`, `/distill`
Tous les skills impeccable sont dans `.claude/skills/` (adapt, animate, arrange, audit, bolder, clarify, colorize, critique, delight, distill, extract, harden, normalize, onboard, optimize, overdrive, polish, quieter, teach-impeccable, typeset).

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
