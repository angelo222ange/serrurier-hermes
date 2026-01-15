# Corrections des Routes Ville - Contact et Services

## Problèmes identifiés

### 1. Lien Contact depuis le Header
- **Problème** : Sur les pages ville, cliquer sur "Contact" redirige vers `/contact/` au lieu de `/serrurier-{ville}/contact/`
- **Cause** : Le Header génère déjà le bon lien (`/serrurier-${citySlug}/contact`), mais les pages n'existaient pas
- **Solution** : Création des pages contact spécifiques pour chaque région principale

### 2. Pages de services manquantes pour Bordeaux
- **Problème** : URLs `/serrurier-bordeaux/depannage/` et `/serrurier-bordeaux/installation/` retournaient 404
- **Cause** : La route dynamique `[service]` n'avait pas de fonction `generateStaticParams`
- **Solution** : Ajout de `generateStaticParams` pour générer toutes les pages statiques

## Corrections apportées

### ✅ 1. Ajout de `generateStaticParams` à `/serrurier-bordeaux/[service]/page.tsx`
```typescript
export const dynamicParams = false;

export async function generateStaticParams() {
  return services
    .filter(s => s.hasPage)
    .map(s => ({
      service: s.slug,
    }));
}
```

### ✅ 2. Création de la page Contact pour Bordeaux
- **Fichier** : `/app/serrurier-bordeaux/contact/page.tsx`
- **Route** : `/serrurier-bordeaux/contact/`
- **Contenu** : Page contact avec formulaire spécifique région Bordeaux

### ✅ 3. Création de la page Contact pour Montpellier
- **Fichier** : `/app/serrurier-montpellier/contact/page.tsx`
- **Route** : `/serrurier-montpellier/contact/`
- **Contenu** : Page contact avec formulaire spécifique région Montpellier

### ✅ 4. Création de la page Contact pour Paris
- **Fichier** : `/app/serrurier-paris/contact/page.tsx`
- **Route** : `/serrurier-paris/contact/`
- **Contenu** : Page contact avec formulaire spécifique région Paris

## Structure des routes finales

### Pages principales (3 villes)
- `/serrurier-paris/` ✅
- `/serrurier-bordeaux/` ✅
- `/serrurier-montpellier/` ✅

### Pages Contact spécifiques (3 pages)
- `/serrurier-paris/contact/` ✅
- `/serrurier-bordeaux/contact/` ✅
- `/serrurier-montpellier/contact/` ✅

### Pages Services pour Bordeaux via `[service]` (6 services)
- `/serrurier-bordeaux/depannage/` ✅
- `/serrurier-bordeaux/ouverture-de-porte/` ✅
- `/serrurier-bordeaux/changement-serrure/` ✅
- `/serrurier-bordeaux/installation-serrure/` ✅
- `/serrurier-bordeaux/blindage-porte/` ✅
- `/serrurier-bordeaux/remplacement-cylindre/` ✅

### Routes dynamiques pour toutes les zones
Toutes les autres zones de chaque région sont gérées par `/serrurier-[city]/` et `/serrurier-[city]/[service]/` :

**Bordeaux** : 12 zones × 8 pages = 96 routes
- Bordeaux Centre, Mérignac, Pessac, Talence, Bègles, Villenave-d'Ornon, Le Bouscat, Gradignan, Cenon, Lormont, Floirac, Blanquefort

**Montpellier** : 10 zones × 8 pages = 80 routes
- Montpellier Centre, Lattes, Castelnau-le-Lez, Juvignac, Le Crès, Pérols, Mauguio, Grabels, Saint-Jean-de-Védas, Villeneuve-lès-Maguelone

**Paris** : 30 zones × 8 pages = 240 routes
- Paris 1er-20ème + banlieue IDF

**Total** : ~416 routes générées automatiquement

## Fonctionnement du Header

Le Header détecte automatiquement la ville depuis l'URL et adapte :
1. Le numéro de téléphone (Paris/Bordeaux/Montpellier)
2. Les liens de navigation (Contact, Services, etc.)
3. Le logo qui redirige vers la page principale de la région

### Exemple de navigation contextuelle

Sur `/serrurier-bordeaux/` :
- Contact → `/serrurier-bordeaux/contact/` ✅
- Dépannage → `/bordeaux/depannage/` (page régionale)
- Installation → `/bordeaux/installation/` (page régionale)
- Tarifs → `/bordeaux/tarifs/` (page régionale)

Sur `/serrurier-pessac/` :
- Contact → `/serrurier-pessac/contact/` ✅
- Dépannage → `/serrurier-pessac/depannage/` ✅
- Services → `/serrurier-pessac/{service}/` ✅

## Tests recommandés

### URLs à tester pour Bordeaux
```
✅ https://www.serrurier-hermes.com/serrurier-bordeaux/
✅ https://www.serrurier-hermes.com/serrurier-bordeaux/contact/
✅ https://www.serrurier-hermes.com/serrurier-bordeaux/depannage/
✅ https://www.serrurier-hermes.com/serrurier-bordeaux/installation/
✅ https://www.serrurier-hermes.com/serrurier-bordeaux/ouverture-de-porte/
✅ https://www.serrurier-hermes.com/serrurier-bordeaux/changement-serrure/
✅ https://www.serrurier-hermes.com/serrurier-bordeaux/blindage-porte/
✅ https://www.serrurier-hermes.com/serrurier-bordeaux/remplacement-cylindre/
```

### URLs à tester pour autres zones Bordeaux
```
✅ https://www.serrurier-hermes.com/serrurier-merignac/
✅ https://www.serrurier-hermes.com/serrurier-merignac/contact/
✅ https://www.serrurier-hermes.com/serrurier-pessac/depannage/
✅ https://www.serrurier-hermes.com/serrurier-talence/ouverture-de-porte/
```

### URLs à tester pour Paris et Montpellier
```
✅ https://www.serrurier-hermes.com/serrurier-paris/contact/
✅ https://www.serrurier-hermes.com/serrurier-montpellier/contact/
✅ https://www.serrurier-hermes.com/serrurier-paris-1/contact/
✅ https://www.serrurier-hermes.com/serrurier-lattes/depannage/
```

## Prochaines étapes

1. ✅ Rebuild du site avec les nouvelles pages
2. ✅ Déployer sur production
3. ✅ Tester tous les liens de navigation sur chaque page ville
4. ✅ Vérifier les canonical URLs et métadonnées SEO
5. ✅ Mettre à jour le sitemap.xml avec les nouvelles routes

## Notes techniques

- **`dynamicParams: false`** : Force Next.js à générer uniquement les pages listées dans `generateStaticParams`
- **`generateStaticParams`** : Génère toutes les combinaisons ville × service au build time
- **SEO** : Chaque page a ses propres métadonnées optimisées avec ville + service
- **Performance** : Toutes les pages sont générées statiquement (SSG)
