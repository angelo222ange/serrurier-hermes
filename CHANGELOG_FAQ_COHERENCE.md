# Corrections FAQ - Cohérence des questions

## Date : 14 janvier 2026

## Problème identifié
Les questions FAQ contenaient des formulations avec "à {city} ?" qui créaient des incohérences :
- Sur les pages génériques (home, services génériques, tarifs), le placeholder `{city}` était supprimé, laissant "à ?" à la fin des questions
- Par exemple : "Quel est le délai d'intervention d'un serrurier à ?" au lieu de "Quel est le délai d'intervention d'un serrurier ?"

## Solution appliquée
Modification du fichier `content/faq.json` pour supprimer "à {city}" des questions et le remplacer par une formulation générique.

### Questions génériques modifiées (section `generic`)

1. **Quel est le prix d'un serrurier ?**
   - Avant : `Quel est le prix d'un serrurier à {city} ?`
   - Après : `Quel est le prix d'un serrurier ?`
   - Réponse : Suppression de "à Paris" codé en dur

2. **Quel est le délai d'intervention d'un serrurier ?**
   - Avant : `Quel est le délai d'intervention d'un serrurier à {city} ?`
   - Après : `Quel est le délai d'intervention d'un serrurier ?`
   - Note : La réponse conserve `{city}` pour les pages de ville

3. **Intervenez-vous le week-end et les jours fériés ?**
   - Avant : `Intervenez-vous le week-end et les jours fériés à {city} ?`
   - Après : `Intervenez-vous le week-end et les jours fériés ?`
   - Note : La réponse conserve `{city}` pour les pages de ville

4. **Intervenez-vous pour les portes blindées ?**
   - Avant : `Intervenez-vous pour les portes blindées à {city} ?`
   - Après : `Intervenez-vous pour les portes blindées ?`

5. **Que faire si je suis bloqué dehors ?**
   - Avant : `Que faire si je suis bloqué dehors à {city} ?`
   - Après : `Que faire si je suis bloqué dehors ?`

6. **Travaillez-vous avec les assurances ?**
   - Avant : `Travaillez-vous avec les assurances à {city} ?`
   - Après : `Travaillez-vous avec les assurances ?`

### Questions spécifiques aux services modifiées (section `service_specific`)

#### ouverture-de-porte
- **Combien coûte une ouverture de porte ?**
  - Avant : `Combien coûte une ouverture de porte à {city} ?`
  - Après : `Combien coûte une ouverture de porte ?`

- **Que faire en cas de porte claquée ?**
  - Avant : `Que faire en cas de porte claquée à {city} ?`
  - Après : `Que faire en cas de porte claquée ?`

#### changement-serrure
- **Quel est le prix d'un changement de serrure ?**
  - Avant : `Quel est le prix d'un changement de serrure à {city} ?`
  - Après : `Quel est le prix d'un changement de serrure ?`

#### depannage
- **Quels types de dépannage proposez-vous ?**
  - Avant : `Quels types de dépannage proposez-vous à {city} ?`
  - Après : `Quels types de dépannage proposez-vous ?`

#### blindage-porte
- **Combien coûte un blindage de porte ?**
  - Avant : `Combien coûte un blindage de porte à {city} ?`
  - Après : `Combien coûte un blindage de porte ?`

#### remplacement-cylindre
- **Combien coûte un remplacement de cylindre ?**
  - Avant : `Combien coûte un remplacement de cylindre à {city} ?`
  - Après : `Combien coûte un remplacement de cylindre ?`

#### installation-serrure
- **Combien coûte l'installation d'une serrure ?**
  - Avant : `Combien coûte l'installation d'une serrure à {city} ?`
  - Après : `Combien coûte l'installation d'une serrure ?`

## Impact

### Pages concernées
- ✅ Page d'accueil (`/`)
- ✅ Pages de services génériques (`/depannage`, `/installation`, etc.)
- ✅ Page tarifs (`/tarifs`)
- ✅ Toutes les pages de service avec FAQ

### Pages de ville
Les pages de ville spécifiques (ex: `/serrurier-paris-1`, `/serrurier-bordeaux`) conservent la mention de la ville dans les **réponses** grâce au placeholder `{city}` qui est correctement remplacé par le nom de la ville.

## Vérification
Le fichier JSON a été validé syntaxiquement avec succès.

## Fichiers modifiés
- `content/faq.json` : 13 questions modifiées (6 génériques + 7 spécifiques aux services)

## Système de remplacement
Le système existant dans `lib/content.ts` et `components/sections/FAQ.tsx` gère automatiquement :
- Remplacement de `{city}` par le nom de la ville sur les pages spécifiques
- Suppression de `{city}` sur les pages génériques (avec `skipCity = true`)
- Nettoyage automatique des espaces et ponctuations orphelines
