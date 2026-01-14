# 🎨 Améliorations Visuelles des Pages Services par Ville

## 📍 Pages concernées
Toutes les pages : `http://localhost:3004/serrurier-[ville]/[service]/`

Exemples :
- http://localhost:3004/serrurier-paris-1/depannage/
- http://localhost:3004/serrurier-bordeaux-centre/ouverture-de-porte/
- http://localhost:3004/serrurier-montpellier-centre/changement-serrure/

---

## ✨ Améliorations Apportées

### 1. 🎯 Section "Dépannage Urgent à [Ville] - Nos interventions"

**Avant :**
- Cards avec images de fond peu visibles
- Overlay statique
- Pas d'effet de survol dynamique

**Après :**
- ✅ **Hauteur augmentée** : `min-h-[320px]` (au lieu de 280px)
- ✅ **Shadow améliorée** : `shadow-lg` avec `hover:shadow-2xl`
- ✅ **Effet zoom sur l'image** : `group-hover:scale-105` avec transition fluide (500ms)
- ✅ **Overlay optimisé** : Gradient émeraude avec transparence ajustée pour mieux voir les images
  - État normal : `from-emerald-900/95 via-emerald-900/70 to-emerald-900/40`
  - Au survol : `from-emerald-900/85 via-emerald-900/60 to-emerald-900/30`
- ✅ **Icône améliorée** : Taille augmentée (64px), effet de survol avec changement de background
- ✅ **Badge prix stylisé** : Background `emerald-500/30` avec backdrop-blur et padding

**Images utilisées :**
- Porte claquée : `serrurier-porte-claquer-serrurier-hermes.webp`
- Serrure bloquée : `porte-bloquer-serrurier.webp`
- Clés perdues : `ouverture-de-porte-classique-hermes.webp`
- Après effraction : `apres-effraction-serrurier.webp`
- Clé cassée : `cle-casse-serrure-serrurier-toulouse.webp`
- Porte blindée : `serrurier-hermes-ouverture-porte-blind.webp`
- Changement de cylindre : `changement-de-barillet-serrurier-hermes.webp`
- Changement de serrure : `changement-serrure-serrurier-hermes.webp`
- Installation serrure : `reparation-serrure-serrurier-hermes.webp`

---

### 2. 📍 Section "Zones d'intervention"

**Avant :**
- Cards compactes avec images en fond discret
- Effet de survol minimal

**Après :**
- ✅ **Hauteur minimale** : `min-h-[140px]` pour plus d'espace
- ✅ **Shadow dynamique** : `shadow-md` au repos, `shadow-xl` au survol
- ✅ **Effet zoom sur l'image** : `group-hover:scale-110` avec transition 500ms
- ✅ **Opacité améliorée** : De 40% à 50% au survol
- ✅ **Gradient overlay** : `bg-gradient-to-r from-white/90 via-white/70 to-white/50` pour meilleure lisibilité
- ✅ **Texte plus visible** : Police en gras pour le nom de la zone
- ✅ **Flèche animée** : Translation de 1 unité au survol avec opacité progressive

**Gestion des images par région :**

#### Bordeaux
- Bordeaux Centre : `bordeaux-centre-33-gironde.webp`
- Autres zones : `depannage-rideau-metallique-[ville].webp`

#### Montpellier
- Montpellier Centre : `depannage-rideau-metallique-montpellier-centre.webp`
- Autres zones : `depannage-rideau-metallique-[ville]-montpellier.webp`

#### Paris
- Format : `depannage-rideau-metallique-paris-[N]-750[XX].webp`
- Variantes gérées automatiquement (avec ou sans suffixe DRM)

#### IDF
- Image par défaut : `ouverture-de-porte-classique-hermes.webp`

---

### 3. 🛠️ Section "Nos autres services à [Ville]"

**Avant :**
- Cards standards avec images peu visibles
- Icône simple

**Après :**
- ✅ **Hauteur minimale** : `min-h-[160px]`
- ✅ **Shadow au survol** : `hover:shadow-lg`
- ✅ **Effet zoom image** : `group-hover:scale-105` avec transition 500ms
- ✅ **Opacité dynamique** : De 30% à 45% au survol
- ✅ **Gradient overlay** : `bg-gradient-to-br from-white/95 via-white/85 to-white/70`
- ✅ **Icône dans un badge** : Background `primary-50` qui devient `primary-100` au survol
- ✅ **Badge prix stylisé** : Background `emerald-50` avec padding et border-radius

**Images par service :**
- Dépannage : `depannage-serrurier-urgence-nuit-hermes.webp`
- Ouverture de porte : `serrurier-porte-claquer-serrurier-hermes.webp`
- Changement serrure : `changement-serrure-serrurier-hermes.webp`
- Installation serrure : `reparation-serrure-serrurier-hermes.webp`
- Blindage porte : `serrurier-hermes-ouverture-porte-blind.webp`
- Remplacement cylindre : `changement-de-barillet-serrurier-hermes.webp`

---

## 🎭 Effets Visuels Communs

### Transitions
- **Transform** : 500ms pour les zoom d'images
- **Colors** : 300ms pour les changements de couleur
- **Shadow** : 300ms pour les ombres
- **Opacity** : 300ms pour la transparence

### Hover States
- Zoom images : `scale-105` ou `scale-110`
- Shadow augmentée sur toutes les cards
- Opacité des overlays réduite pour mieux voir les images
- Textes avec changement de couleur vers primary-600

### Accessibilité
- Contraste maintenu avec overlays gradient
- Texte blanc sur fond sombre (section interventions)
- Texte sombre sur fond clair (sections zones et services)

---

## 🚀 Test en Local

Le serveur de développement tourne sur :
```
http://localhost:3004
```

**Exemples d'URLs à tester :**

### Paris
- http://localhost:3004/serrurier-paris-1/depannage/
- http://localhost:3004/serrurier-paris-15/ouverture-de-porte/
- http://localhost:3004/serrurier-boulogne-billancourt/changement-serrure/

### Bordeaux
- http://localhost:3004/serrurier-bordeaux-centre/depannage/
- http://localhost:3004/serrurier-merignac/installation-serrure/
- http://localhost:3004/serrurier-pessac/blindage-porte/

### Montpellier
- http://localhost:3004/serrurier-montpellier-centre/depannage/
- http://localhost:3004/serrurier-lattes/remplacement-cylindre/
- http://localhost:3004/serrurier-castelnau-le-lez/ouverture-de-porte/

---

## 📦 Images Utilisées

### Services (/public/images/services/)
- ✅ `depannage-serrurier-urgence-nuit-hermes.webp`
- ✅ `serrurier-porte-claquer-serrurier-hermes.webp`
- ✅ `porte-bloquer-serrurier.webp`
- ✅ `ouverture-de-porte-classique-hermes.webp`
- ✅ `apres-effraction-serrurier.webp`
- ✅ `cle-casse-serrure-serrurier-toulouse.webp`
- ✅ `serrurier-hermes-ouverture-porte-blind.webp`
- ✅ `changement-de-barillet-serrurier-hermes.webp`
- ✅ `changement-serrure-serrurier-hermes.webp`
- ✅ `reparation-serrure-serrurier-hermes.webp`

### Zones Bordeaux (/public/images/zones/bordeaux/)
- ✅ 33 images disponibles
- Format : `depannage-rideau-metallique-[ville].webp`

### Zones Montpellier (/public/images/zones/montpellier/)
- ✅ 19 images disponibles
- Format : `depannage-rideau-metallique-[ville]-montpellier.webp`

### Zones Paris (/public/images/zones/paris/)
- ✅ 20 images disponibles (1 par arrondissement)
- Format : `depannage-rideau-metallique-paris-[N]-750[XX].webp`

### Zones IDF
- ⚠️ Pas d'images spécifiques → utilise image par défaut

---

## 🎨 Palette de Couleurs

### Emeraude (interventions)
- Background overlay : `emerald-900` avec opacité variable
- Badge prix : `emerald-500/30` avec backdrop-blur
- Texte : Blanc sur fond émeraude

### Primary (zones et services)
- Hover texte : `primary-600`
- Badge icône : `primary-50` → `primary-100`
- Background : Blanc avec overlay transparent

### Shadows
- Légère : `shadow-sm`
- Normale : `shadow-md`
- Forte : `shadow-lg`
- Extra forte : `shadow-xl` (au survol)
- Double forte : `shadow-2xl` (interventions au survol)

---

## ✅ Compatibilité

- ✅ Next.js 14.2.35
- ✅ Image optimization avec next/image
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Performance optimisée (lazy loading des images)
- ✅ Accessibilité (alt text, contraste)

---

## 📝 Fichiers Modifiés

1. **app/serrurier-[city]/[service]/page.tsx**
   - Section "Nos interventions" (lignes ~306-366)
   - Section "Zones d'intervention" (lignes ~408-497)
   - Section "Nos autres services" (lignes ~500-551)

---

## 🔄 Prochaines Étapes Possibles

1. Ajouter des images spécifiques pour les zones IDF
2. Créer des animations plus sophistiquées (parallax, etc.)
3. Ajouter des filtres de couleur personnalisés par région
4. Optimiser davantage les images (compression, formats WebP)
5. Ajouter des effets de blur progressif sur les overlays

---

**Date de modification :** 14 janvier 2026
**Version :** 1.0.0
