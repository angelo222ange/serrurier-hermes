# Architecture Multi-Régions - Page d'Accueil Générique

## 📋 Résumé de l'Architecture

La page d'accueil (/) présente maintenant une vue générique du service sans mention de ville spécifique. Les utilisateurs choisissent ensuite leur région (Paris, Bordeaux ou Montpellier) pour accéder au contenu localisé.

## ✅ Structure Actuelle

### 1. Page d'Accueil Générique (`/`)
- **Design** : Reprend la structure de la page Paris mais sans mention de ville
- **Contenu** : Présentation générique du service de serrurerie
- **Section Régions** : 3 cartes cliquables vers Paris, Bordeaux, Montpellier
- **Métadonnées SEO** : Optimisées pour le national (pas de ville spécifique)
- **Priorité Sitemap** : 1.0 (priorité maximale)

## ✅ Structure Actuelle

### 1. Page d'Accueil Générique (`/`)
- **Design** : Reprend la structure de la page Paris mais sans mention de ville
- **Contenu** : Présentation générique du service de serrurerie
- **Section Régions** : 3 cartes cliquables vers Paris, Bordeaux, Montpellier
- **Métadonnées SEO** : Optimisées pour le national (pas de ville spécifique)
- **Priorité Sitemap** : 1.0 (priorité maximale)
- **Navigation** : Pas d'accès aux zones depuis cette page (sélection de région obligatoire)

### 2. Pages Principales des Régions

### 2. Pages Principales des Régions

#### `/app/serrurier-paris/`
- **page.tsx** : Page principale pour Paris avec contenu localisé
- **layout.tsx** : Layout avec le thème (couleurs) de Paris
- Métadonnées SEO optimisées pour Paris
- Affiche les 20 arrondissements de Paris dans la section Zones
- **Priorité Sitemap** : 0.95

#### `/app/serrurier-bordeaux/`
- **page.tsx** : Page principale pour Bordeaux
- **layout.tsx** : Layout avec le thème (couleurs lie de vin) de Bordeaux
- Métadonnées SEO optimisées pour Bordeaux
- Affiche les zones de Bordeaux (Mérignac, Pessac, Talence, etc.)
- **Priorité Sitemap** : 0.95

#### `/app/serrurier-montpellier/`
- **page.tsx** : Page principale pour Montpellier
- **layout.tsx** : Layout avec le thème (couleurs méditerranée) de Montpellier
- Métadonnées SEO optimisées pour Montpellier
- Affiche les zones de Montpellier (Lattes, Castelnau-le-Lez, etc.)
- **Priorité Sitemap** : 0.95

### 3. Navigation et Liens

### 3. Navigation et Liens

**`/lib/cityConfig.ts`** : Fonction `getCityParent()` mise à jour
- Retourne `/` pour la page d'accueil générique (quand pas de citySlug)
- Retourne `/serrurier-paris/` pour la région Paris
- Retourne `/serrurier-bordeaux/` pour la région Bordeaux
- Retourne `/serrurier-montpellier/` pour la région Montpellier

**Logo du Header** :
- Sur la homepage `/` → pointe vers `/`
- Sur une page régionale → pointe vers la page principale de la région
- Sur une page de ville/arrondissement → pointe vers la page principale de la région

### 4. Mise à Jour des Templates

**`/components/templates/ServicePageTemplate.tsx`** :
- Breadcrumb mis à jour pour pointer vers `/serrurier-{citySlug}` au lieu de `/`
- Lien "Demander un devis" contextualisé : `/serrurier-{citySlug}/contact`

### 5. Génération du Sitemap

**`/scripts/generate-sitemap.js`** : Mis à jour pour inclure :
- `/` avec priorité 1.0 (homepage générique)
- `/serrurier-paris/` avec priorité 0.95
- `/serrurier-bordeaux/` avec priorité 0.95
- `/serrurier-montpellier/` avec priorité 0.95
- Évite les doublons pour ces slugs

**Résultat** : 741 URLs dans le sitemap

## 🔗 Architecture des URLs

### Page d'Accueil
```
/                              (homepage générique - priorité 1.0)
```

### Pages Principales des Régions
```
/serrurier-paris/              (page statique - priorité 0.95)
/serrurier-bordeaux/           (page statique - priorité 0.95)
/serrurier-montpellier/        (page statique - priorité 0.95)
```

### Pages Arrondissements/Villes
```
/serrurier-paris-1/        (page dynamique)
/serrurier-paris-2/        (page dynamique)
...
/serrurier-paris-20/       (page dynamique)
/serrurier-merignac/       (page dynamique)
/serrurier-lattes/         (page dynamique)
```

### Pages Services par Ville
```
/serrurier-paris/depannage
/serrurier-paris/installation
/serrurier-bordeaux/changement-serrure
etc.
```

## 🎨 Cohérence Visuelle

Chaque région a maintenant son propre thème de couleurs appliqué via le layout :

- **Paris** : Bleu nuit (#1E3A5F) + Or (#C9A227)
- **Bordeaux** : Lie de vin (#722F37) + Pierre blonde (#D4A574)
- **Montpellier** : Bleu méditerranée (#0EA5E9) + Soleil (#FBBF24)

## 🔍 SEO

### Avantages de cette Structure

1. **Homepage Générique** : `/` capte le trafic national sans ciblage géographique
2. **Pages Régionales Dédiées** : Chaque région a sa page optimisée localement
3. **URLs Sémantiques** : `/serrurier-paris/` est plus explicite qu'une redirection
4. **Cohérence Multi-Régions** : Même structure pour Paris, Bordeaux et Montpellier
5. **Évite le Duplicate Content** : Une seule page principale par région
6. **Meilleure Indexation** : Les moteurs comprennent mieux la structure
7. **Local SEO** : Chaque région a sa page dédiée avec métadonnées optimisées
8. **Funnel Clair** : Homepage générique → Sélection région → Contenu localisé

### Métadonnées Optimisées

Chaque page régionale a :
- **Title** < 60 caractères avec ville, USP et marque
- **Description** < 155 caractères avec CTA et numéro de téléphone
- **Keywords** ciblés par région
- **OpenGraph** pour le partage social
- **Canonical URL** propre
- **Robots** : index + follow

## 📱 Navigation

### Header
Le logo pointe maintenant vers la page principale de la région courante :
- Sur Paris ou arrondissements → `/serrurier-paris/`
- Sur Bordeaux ou communes → `/serrurier-bordeaux/`
- Sur Montpellier ou communes → `/serrurier-montpellier/`

### Breadcrumb
Les breadcrumbs dans les pages services pointent vers la page régionale :
- `Ville > Service` (au lieu de `Accueil > Service > Ville`)

## 🧪 Tests Recommandés

1. **Navigation** : Vérifier que tous les liens internes fonctionnent
2. **Redirection** : Tester que `/` redirige bien vers `/serrurier-paris/`
3. **Thèmes** : Vérifier l'application des couleurs par région
4. **SEO** : Vérifier les métadonnées avec les outils Google
5. **Build** : `npm run build` pour générer toutes les pages statiques
6. **Sitemap** : Vérifier le sitemap à `/sitemap.xml`

## 📝 Notes Importantes

- Les pages dynamiques `/serrurier-[city]/` continuent de fonctionner pour tous les arrondissements et villes
- Les 3 pages régionales principales sont désormais statiques pour de meilleures performances
- L'ancienne homepage est maintenant une simple redirection (très légère)
- Les liens contextuels (Header, Footer) s'adaptent automatiquement à la région

## 🚀 Prochaines Étapes

1. Tester le build complet : `npm run build`
2. Vérifier le site en production
3. Soumettre le nouveau sitemap à Google Search Console
4. Mettre à jour les campagnes Google Ads pour pointer vers `/serrurier-paris/`
5. Surveiller les analytics pour vérifier le comportement des utilisateurs
