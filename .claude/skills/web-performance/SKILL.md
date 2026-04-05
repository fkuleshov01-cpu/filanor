---
name: web-performance
description: Optimiser les performances web. Lazy loading, animations GPU, 3D performance, Core Web Vitals.
---

# Performance Web — Éliminer la latence

## Animations — GPU only
- ✅ transform (translate, scale, rotate) + opacity
- ❌ JAMAIS animer width, height, margin, padding, top, left

## GSAP performance
- force3D: true pour forcer le GPU
- gsap.ticker.lagSmoothing(1000, 16) contre le stuttering
- Max ~50 ScrollTriggers actifs, utiliser batch() au-delà

## 3D (R3F)
- Canvas dpr={[1, 1.5]} — PAS dpr={2} sur mobile
- PerformanceMonitor pour adapter la qualité
- Lazy load avec dynamic + ssr: false
- Pas de post-processing sur mobile

## Lazy loading
- Composants lourds : dynamic(() => import("./Heavy"), { ssr: false })
- Recharts : toujours lazy-loaded (~300kb)
- Images : next/image (lazy par défaut)

## Lenis smooth scroll
```tsx
const lenis = new Lenis({ duration: 1.2, touchMultiplier: 2 });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

## Checklist
- [ ] Animations = transform/opacity uniquement
- [ ] 3D lazy-loaded avec ssr: false
- [ ] DPR limité à 1.5
- [ ] Recharts lazy-loaded
- [ ] Images WebP via next/image
- [ ] First-load JS < 200kb par page
