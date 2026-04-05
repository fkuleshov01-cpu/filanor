---
name: nextjs-patterns
description: Patterns Next.js 15 App Router pour éviter les bugs courants. Hydration errors, dynamic imports, SSR/CSR, metadata, fonts, performance.
---

# Next.js 15 App Router — Patterns anti-bugs

## Hydration errors
- JAMAIS `Math.random()` dans le rendu
- JAMAIS `Date.now()` ou `window` sans guard useEffect
- Utiliser des arrays pré-calculées pour tout aléatoire

## "use client"
- Serveur par défaut. Client uniquement pour useState, useEffect, onClick, GSAP, Framer Motion, Three.js, Recharts
- Mettre "use client" le plus BAS possible dans l'arbre

## Font — Plus Jakarta Sans
```tsx
import { Plus_Jakarta_Sans } from "next/font/google";
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
```
JAMAIS Inter, Geist, Roboto, Arial.

## Dynamic imports (3D / composants lourds)
```tsx
import dynamic from "next/dynamic";
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });
```
