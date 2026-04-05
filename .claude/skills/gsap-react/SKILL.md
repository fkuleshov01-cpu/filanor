---
name: gsap-react
description: Utiliser GSAP correctement dans React et Next.js. useGSAP, refs, cleanup, ScrollTrigger, SSR.
---

# GSAP dans React / Next.js

## Règle d'or : useGSAP, pas useEffect

```tsx
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger); // EN DEHORS du composant

function MonComposant() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(".element", { y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" });
  }, { scope: containerRef });
  return <div ref={containerRef}>...</div>;
}
```

## TOUJOURS
- useGSAP (pas useEffect) — cleanup automatique
- scope: containerRef — sélecteurs scopés
- "use client" en haut du fichier
- Animer transform et opacity uniquement

## JAMAIS
- useEffect pour GSAP
- Enregistrer plugins DANS le composant
- Animer width, height, margin, padding
