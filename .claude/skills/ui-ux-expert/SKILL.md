---
name: ui-ux-expert
description: Expertise UX/UI avec design tokens, accessibilité WCAG, composition de layouts, conversion et responsive design.
---

# Skill UI/UX Expert — Design Systématique

## Design Tokens
- Espacement base 8px : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Sections : py-24 à py-40 entre les grandes sections
- Texte max-width : max-w-2xl (45-75 caractères)
- Layout : max-w-[1200px] avec px-6 lg:px-16

## Accessibilité WCAG AA (non-négociable)
- Contraste texte : 4.5:1 minimum
- Touch targets : 44x44px minimum
- Focus visible sur TOUT élément interactif
- HTML sémantique : button pour actions, a pour navigation, JAMAIS div onclick
- Labels sur TOUS les inputs
- Alt text sur images significatives

## Responsive mobile-first
- Commencer mobile, ajouter breakpoints
- Grilles : grid-cols-1 → md:grid-cols-2 → lg:grid-cols-3
- Nav → hamburger sous lg
- Touch targets 44px sur mobile

## Conversion
- 1 seul CTA primaire par viewport
- CTA visuellement dominant
- Réduire la friction (moins de champs)
- Réassurance près des CTA : "Sans engagement", "Réponse en 48h"

## Checklist
- [ ] Contraste WCAG AA respecté
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Touch targets ≥ 44px
- [ ] HTML sémantique
- [ ] 1 CTA primaire par viewport
- [ ] Responsive testé sur 320px, 768px, 1024px, 1440px
