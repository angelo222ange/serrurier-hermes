# Guide d'optimisation Web Vitals

## Optimisations effectuées

### 1. Images (96% de réduction - 168MB → 6MB)
✅ **Compression agressive des images WebP**
- Script `optimize-images-advanced.js` créé
- Génération de versions responsives (-sm, -md, -lg, -xl)
- Backup automatique dans `public/images-backup/`
- Compression adaptative selon le type d'image

✅ **Images responsives**
- Nouveau composant `OptimizedImage.tsx`
- Génération automatique de `srcset`
- Lazy loading par défaut
- `sizes` optimisés selon le contexte

**Utilisation:**
```tsx
<OptimizedImage
  src="/images/hero.webp"
  alt="Description"
  fill
  imageType="hero" // ou "service", "thumbnail", "logo"
  priority={false} // true uniquement pour le hero
/>
```

### 2. CSS (Critical CSS inline)
✅ **CSS critique inline dans layout.tsx**
- Réduction du blocage du rendu initial
- FCP (First Contentful Paint) amélioré
- CSS minimal (~500 bytes) pour le rendu initial

✅ **Optimisations CSS**
- Suppression des règles inutilisées
- Classes Tailwind optimisées
- PurgeCSS automatique via Tailwind

### 3. JavaScript
✅ **Code splitting optimisé**
- Chunks limités à 80KB max
- Séparation framework/lib/commons
- Runtime chunk séparé pour meilleur caching
- Tree shaking agressif

✅ **Polyfills supprimés**
- Target ES2020 (navigateurs modernes)
- Exclusion de core-js, babel/polyfill
- Réduction de ~43KB de JS inutile

### 4. Accessibilité
✅ **Corrections effectuées**
- Ajout d'`aria-label` sur tous les boutons
- Amélioration des contrastes (text-white/40 → text-white/60+)
- Labels descriptifs pour les lecteurs d'écran

### 5. Configuration Next.js
✅ **Optimisations avancées**
- SWC minification activée
- Image optimization configurée
- Headers de cache optimaux (1 an pour assets)
- Preconnect aux ressources critiques

## Commandes

### Optimiser les images
```bash
npm run optimize-images
# Ou directement:
node scripts/optimize-images-advanced.js
```

### Build optimisé
```bash
npm run build
```

### Tester localement
```bash
npm run preview
```

## Résultats attendus

### Avant optimisation
- Performance mobile: **67/100**
- LCP: **100.5s** ❌
- FCP: **1.2s**
- Images: **168 MB**

### Après optimisation (cible)
- Performance mobile: **90+/100** ✅
- LCP: **<2.5s** ✅
- FCP: **<1.0s** ✅
- Images: **6 MB** ✅ (96% de réduction)

## Métriques Core Web Vitals

| Métrique | Cible | Avant | Après (estimé) |
|----------|-------|-------|----------------|
| LCP | <2.5s | 100.5s | <2.0s |
| FID | <100ms | - | <50ms |
| CLS | <0.1 | 0 | 0 |
| FCP | <1.8s | 1.2s | <0.8s |
| TBT | <200ms | 0ms | 0ms |
| Speed Index | <3.4s | 8.0s | <2.5s |

## Vérifications post-build

1. **Lighthouse Mobile**
```bash
# Après npm run build && npm run serve
# Tester sur: http://localhost:8080
```

2. **PageSpeed Insights**
- URL: https://pagespeed.web.dev/
- Tester en mobile et desktop

3. **Vérifier les images**
```bash
# Tailles des images optimisées
ls -lh public/images/services/

# Vérifier la génération des versions responsives
ls public/images/services/*-sm.webp
ls public/images/services/*-md.webp
ls public/images/services/*-lg.webp
```

## Recommandations supplémentaires

### Pour aller encore plus loin:

1. **CDN**
   - Utiliser un CDN (Cloudflare, Cloudinary)
   - Cache des assets statiques
   - Compression Brotli

2. **Lazy loading avancé**
   - Intersection Observer pour le contenu below-the-fold
   - Skeleton loaders

3. **Service Worker**
   - Cache offline des assets critiques
   - Stratégie cache-first pour images

4. **Fonts**
   - Les fonts sont déjà optimisées (next/font avec display: swap)
   - Subset latin uniquement

## Maintenance

### Nouvelles images
Toujours optimiser avant d'ajouter:
```bash
# 1. Placer l'image dans public/images/
# 2. Lancer l'optimisation
npm run optimize-images
```

### Monitoring continu
- PageSpeed Insights hebdomadaire
- Core Web Vitals dans Google Search Console
- Real User Monitoring (RUM) recommandé

## Troubleshooting

### Les images ne s'affichent pas
- Vérifier que les versions responsives existent
- Vérifier le format WebP
- Fallback automatique vers placeholder en cas d'erreur

### Build échoue
```bash
# Nettoyer et rebuilder
rm -rf .next out
npm run build
```

### Images trop grandes malgré l'optimisation
```bash
# Réoptimiser avec qualité réduite
# Éditer scripts/optimize-images-advanced.js
# Réduire QUALITY.service de 80 à 70
```

## Fichiers modifiés

- ✅ `scripts/optimize-images-advanced.js` (nouveau)
- ✅ `components/ui/OptimizedImage.tsx` (nouveau)
- ✅ `components/sections/Hero.tsx`
- ✅ `components/sections/Services.tsx`
- ✅ `components/sections/Urgences.tsx`
- ✅ `components/sections/Zones.tsx`
- ✅ `components/sections/Reviews.tsx`
- ✅ `components/sections/Brands.tsx`
- ✅ `components/layout/Header.tsx`
- ✅ `components/layout/Footer.tsx`
- ✅ `app/layout.tsx`
- ✅ `next.config.js`

## Support

Pour toute question sur les optimisations, référez-vous à:
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Web.dev Core Web Vitals](https://web.dev/vitals/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
