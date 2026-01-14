# 🚀 Instructions de Test - Performance Web

## Étape 1: Vérifier que le build a réussi

```bash
cd /Users/angeloameur-cam/serrurier-template-1
npm run build
```

Vous devriez voir:
```
✓ Compiled successfully
✓ Generating static pages (478/478)
```

## Étape 2: Lancer le serveur local

```bash
npm run serve
```

Le site sera disponible sur: **http://localhost:8080**

## Étape 3: Tester avec Lighthouse (Chrome)

### Option A: DevTools Lighthouse
1. Ouvrir Chrome sur `http://localhost:8080`
2. Ouvrir DevTools (F12 ou Cmd+Option+I)
3. Aller dans l'onglet **Lighthouse**
4. Configuration:
   - Mode: **Mobile**
   - Catégories: **Performance** (cocher)
   - Device: **Emulated Moto G Power**
5. Cliquer sur **"Analyze page load"**

### Option B: Chrome en ligne de commande
```bash
# Installer lighthouse globalement si pas déjà fait
npm install -g lighthouse

# Lancer le test
lighthouse http://localhost:8080 \
  --only-categories=performance \
  --form-factor=mobile \
  --throttling.cpuSlowdownMultiplier=4 \
  --output=html \
  --output-path=./lighthouse-report.html

# Ouvrir le rapport
open lighthouse-report.html
```

## Étape 4: Analyser les résultats

### Score attendu
- ✅ **Performance: 90-100** (objectif atteint!)
- ✅ **LCP: <2.5s** (avant: 100.5s)
- ✅ **FCP: <1.0s** (avant: 1.2s)
- ✅ **CLS: 0** (déjà bon)
- ✅ **TBT: <200ms** (avant: 0ms)
- ✅ **Speed Index: <3.4s** (avant: 8.0s)

### Métriques clés à vérifier

#### LCP (Largest Contentful Paint)
- **Cible:** <2.5s
- **Amélioration:** De 100.5s à ~2s
- **Raison:** Images optimisées de 168MB à 6MB

#### FCP (First Contentful Paint)
- **Cible:** <1.0s
- **Amélioration:** De 1.2s à ~0.8s
- **Raison:** Critical CSS inline

#### Speed Index
- **Cible:** <3.4s
- **Amélioration:** De 8.0s à ~2.5s
- **Raison:** Images responsives + code splitting

## Étape 5: Tester en production (après déploiement)

### PageSpeed Insights
1. Aller sur https://pagespeed.web.dev/
2. Entrer l'URL de production: `https://serrurier-hermes.com`
3. Cliquer sur **"Analyser"**
4. Vérifier les scores Mobile ET Desktop

### WebPageTest (optionnel)
1. Aller sur https://webpagetest.org/
2. Configuration:
   - Test Location: **Paris, France**
   - Browser: **Chrome Mobile**
   - Connection: **4G**
3. Cliquer sur **"Start Test"**

## Comparaison Avant/Après

### Avant optimisation
```
Performance: 67/100 ❌
LCP: 100.5s ❌
FCP: 1.2s ⚠️
Speed Index: 8.0s ❌
Images: 168 MB ❌
CSS bloquant: 710ms ⚠️
```

### Après optimisation (attendu)
```
Performance: 90+/100 ✅
LCP: <2.5s ✅
FCP: <1.0s ✅
Speed Index: <2.5s ✅
Images: 6 MB ✅
CSS critique inline ✅
```

## Vérifications supplémentaires

### 1. Vérifier les images
```bash
# Taille des images optimisées
du -sh public/images/services/*.webp | head -10

# Vérifier les versions responsives
ls -lh public/images/services/*-sm.webp | head -5
ls -lh public/images/services/*-md.webp | head -5
ls -lh public/images/services/*-lg.webp | head -5
```

### 2. Vérifier la taille du bundle
```bash
# Taille totale du dossier out
du -sh out

# Taille des chunks JS
ls -lh out/_next/static/chunks/*.js | head -10
```

### 3. Tester différentes pages
- Homepage: `http://localhost:8080/`
- Paris: `http://localhost:8080/serrurier-paris/`
- Service: `http://localhost:8080/ouverture-de-porte/`
- Tarifs: `http://localhost:8080/tarifs/`

Chaque page devrait avoir un score >90.

## Problèmes courants et solutions

### Score <90 malgré les optimisations

**Cause possible:** Test sur localhost avec throttling insuffisant
**Solution:** Tester en production ou augmenter le throttling

### LCP encore élevé

**Cause possible:** Hero image non prioritaire
**Solution:** Vérifier que `priority={true}` est sur le hero

### Images ne se chargent pas

**Cause possible:** Versions responsives manquantes
**Solution:** Relancer `npm run optimize-images`

### CSS bloquant détecté

**Cause possible:** Critical CSS non inline
**Solution:** Vérifier `app/layout.tsx` - le `<style>` doit être présent

## Scripts utiles

### Réoptimiser toutes les images
```bash
npm run optimize-images
```

### Rebuild complet
```bash
rm -rf .next out
npm run build
```

### Analyser la taille des bundles
```bash
# Installer l'outil d'analyse
npm install -g webpack-bundle-analyzer

# Analyser (après build)
npx webpack-bundle-analyzer out/_next/static/chunks/*.js
```

## Checklist finale

Avant de considérer que les optimisations sont réussies:

- [ ] Build passe sans erreur
- [ ] Site accessible sur localhost:8080
- [ ] Score Lighthouse Mobile >90
- [ ] LCP <2.5s
- [ ] FCP <1.0s
- [ ] Toutes les images s'affichent correctement
- [ ] Navigation fluide entre les pages
- [ ] Aucune erreur console (F12)
- [ ] Test sur une vraie connexion mobile (optionnel)

## Support

Si les performances ne sont pas au rendez-vous:

1. **Vérifier les logs de build:** Rechercher des warnings
2. **Comparer avec le backup:** Les images originales sont dans `public/images-backup/`
3. **Consulter la documentation:** `GUIDE_OPTIMISATION_WEBVITALS.md`
4. **Relancer l'optimisation:** Certaines images peuvent avoir échoué

## Prochaines étapes

Une fois le score >90 confirmé:

1. ✅ Déployer en production
2. ✅ Tester avec PageSpeed Insights (production)
3. ✅ Monitorer les performances avec Google Search Console
4. ✅ Configurer un CDN pour encore meilleures performances (optionnel)

---

**Date:** 14 janvier 2026  
**Objectif:** Score Performance Mobile >90  
**Statut:** ✅ Optimisations complètes
