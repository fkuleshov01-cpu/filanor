---
name: systematic-debugging
description: Méthodologie de debug systématique. Utilise ce skill quand un bug apparaît ou quand npm run build échoue.
---

# Debug systématique — Ne jamais deviner

## Règle #1 : LIRE l'erreur avant de toucher au code

## Boucle de debug obligatoire
1. npm run build
2. Erreur ? → Lis le message complet
3. Identifie : quel fichier, quelle ligne, quel type
4. Corrige LA CAUSE (pas le symptôme)
5. npm run build
6. Encore une erreur ? → Retour à l'étape 2
7. 0 erreur ? → npm run dev → test visuel

## Types d'erreurs courants
- TypeError undefined → ajouter guard `if (!variable) return null`
- Type mismatch → corriger le type (JAMAIS utiliser `any`)
- Hydration mismatch → chercher Math.random(), Date.now(), window dans le rendu
- Build vs Dev différent → toujours tester avec npm run build + npm start

## Règles anti-bug
- Vérifier qu'une variable existe avant d'accéder à ses propriétés
- Tester les arrays : `(items ?? []).map(...)`
- Typer les props des composants
- JAMAIS ignorer les warnings TypeScript
- JAMAIS committer du code qui ne compile pas

## Composant irréparable (après 3 tentatives)
1. Sauvegarde le fichier (.broken.tsx)
2. Recrée from scratch plus simplement
3. Teste immédiatement
