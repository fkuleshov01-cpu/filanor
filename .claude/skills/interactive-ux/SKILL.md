---
name: interactive-ux
description: Rendre chaque élément interactif clickable, responsive et intuitif. Hover states, focus states, touch targets, navigation, scroll.
---

# UX Interactive — Tout doit être clickable

## Règle #1 : Si ça a l'air clickable, ça DOIT être clickable

## Navigation avec Lenis (smooth scroll)
```tsx
// href="#section" NE MARCHE PAS avec Lenis
// Utiliser scroll programmatique :
<button onClick={() => {
  const el = document.getElementById("services");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}}>Services</button>
```

## Hover states obligatoires
- Cards : hover:-translate-y-1 hover:shadow-lg hover:border-teal-200
- Boutons : hover:opacity-90 active:scale-[0.98]
- Liens : transition-colors duration-200

## Focus states (accessibilité clavier)
- focus-visible:ring-2 focus-visible:ring-teal-500/50

## Touch targets mobile
- Minimum 44x44px pour tout élément tactile
- Espacement minimum 8px entre les targets

## Canvas 3D ne doit PAS bloquer les clics
```tsx
<div className="absolute inset-0 pointer-events-none">
  <Canvas>...</Canvas>
</div>
```

## Checklist
- [ ] Tous les liens navbar scrollent vers la bonne section
- [ ] Menu mobile fonctionne
- [ ] Boutons CTA clickables
- [ ] Formulaire fonctionne avec toast
- [ ] Hover visible sur TOUT élément interactif
- [ ] Touch targets 44x44px minimum
