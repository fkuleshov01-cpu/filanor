---
name: frontend-design
description: Crée des interfaces frontend distinctives, premium et production-ready. Style Stripe / sculptural minimal. Light mode, palette Émeraude Tech, typographie Plus Jakarta Sans. Utilise ce skill pour tout composant, page ou site web.
---

# Skill Frontend Design — Sculptural Minimal Light

Ce skill guide la création d'interfaces frontend distinctives. Le style cible est Stripe — élégant, lumineux, avec des touches de couleur maîtrisées et beaucoup d'espace. Chaque interface doit respirer la confiance et la maîtrise technique.

## Philosophie

- **Style :** Sculptural Minimal inspiré stripe.com
- **Mode :** Light mode UNIQUEMENT — pas de dark mode
- **Ton visuel :** Élégant, lumineux, aéré, confiant
- **Différenciateur :** Gradient mesh émeraude + espace généreux + typographie forte
- **Références :** stripe.com, linear.app (pour la structure), notion.so (pour la clarté)

**CRITIQUE** : Ce n'est PAS un site dark mode. Toute teinte sombre comme fond principal est INTERDITE. Le fond est chaud et lumineux.

---

## Règles esthétiques absolues

### Typographie
- **Font principale : Plus Jakarta Sans** (via next/font/google)
- **JAMAIS** Inter, Roboto, Arial, Geist, system fonts
- Titres : semi-bold à bold (600-700), tracking tight (-0.02em)
- Corps : regular (400), line-height 1.6-1.7
- Taille H1 : `text-4xl md:text-5xl lg:text-6xl`
- Taille H2 sections : `text-3xl sm:text-4xl md:text-5xl`
- Max largeur texte lisible : `max-w-2xl` (45-75 caractères)
- Couleur texte principal : quasi-noir, jamais noir pur

### Palette Émeraude Tech
```css
--bg-primary: #FAFDF7;
--bg-secondary: #F0F7F4;
--bg-elevated: #FFFFFF;
--text-primary: #111827;
--text-secondary: #4B5563;
--text-muted: #9CA3AF;
--accent-primary: #0D9488;
--accent-secondary: #14B8A6;
--accent-light: rgba(13, 148, 136, 0.08);
--accent-border: rgba(13, 148, 136, 0.15);
```

### Cards — Light & Clean
```
bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300
```
- PAS de glassmorphism, PAS de backdrop-blur
- Ombre douce + bordure subtile

### Gradient mesh (hero uniquement)
```css
background: 
  radial-gradient(ellipse at 20% 50%, rgba(13, 148, 136, 0.12), transparent 50%),
  radial-gradient(ellipse at 80% 20%, rgba(5, 150, 105, 0.08), transparent 50%),
  radial-gradient(ellipse at 50% 80%, rgba(2, 132, 199, 0.06), transparent 50%),
  var(--bg-primary);
```

### Anti-patterns
- ❌ Dark mode / fond sombre
- ❌ Glassmorphism / backdrop-blur
- ❌ Gradient bleu-violet
- ❌ Font Inter / Roboto / Arial / Geist
- ❌ Fond blanc pur #FFFFFF comme fond principal
- ❌ Animations excessives
- ❌ Design générique "fait par IA"
