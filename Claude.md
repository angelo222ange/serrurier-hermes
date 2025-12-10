# Contexte du Projet

Ce repo est un **template Next.js** pour créer des sites de serrurerie. Il est conçu pour être dupliqué et personnalisé pour chaque nouvelle ville/entreprise.

## Objectif

Permettre de créer rapidement des sites de serrurerie professionnels, uniques et optimisés SEO, sans repartir de zéro à chaque fois.

## Architecture simplifiée

```
serrurier-template/
├── config/site.ts       ← Configuration centrale (infos entreprise, zones, services)
├── content/
│   ├── faq.json         ← Questions/Réponses
│   ├── tarifs.json      ← Grille tarifaire
│   └── pages/           ← Contenu des pages (home, depannage, installation)
├── lib/content.ts       ← Helper pour remplacer les variables {city}, {name}, etc.
├── components/          ← Composants React réutilisables
├── app/                 ← Pages Next.js
└── public/images/       ← Images du site
```

## Fichiers à personnaliser

### 1. `config/site.ts` - Configuration principale

Contient toutes les infos de l'entreprise :
- **Informations entreprise** : nom, domaine, téléphone, email
- **Localisation** : ville, code postal, département, région
- **Zones d'intervention** : liste des communes desservies
- **Services** : liste des prestations proposées
- **Navigation** : menu du site
- **Avis Google** : note et nombre d'avis

### 2. `content/` - Contenu textuel

Tous les textes sont externalisés dans des fichiers JSON avec support des variables :
- `{city}` → remplacé par la ville (ex: "Lille")
- `{name}` → remplacé par le nom court (ex: "SL59")
- `{phone}` → remplacé par le téléphone
- `{department}`, `{region}`, `{postalCode}` → autres infos géographiques

**Fichiers de contenu :**
- `content/faq.json` : Questions/Réponses
- `content/tarifs.json` : Grille tarifaire
- `content/pages/home.json` : Contenu page d'accueil (hero, badges confiance, avantages)
- `content/pages/depannage.json` : Contenu page dépannage (hero, stats, interventions)
- `content/pages/installation.json` : Contenu page installation (hero, prestations, marques)

## Workflow pour créer un nouveau site

1. **Dupliquer le repo** : `cp -r serrurier-template serrurier-[ville]-[code]`
2. **Modifier `config/site.ts`** : adapter toutes les infos (ville, téléphone, zones, etc.)
3. **Réécrire le contenu** : 
   - `content/faq.json` : Questions/Réponses (les variables {city} seront automatiquement remplacées)
   - `content/tarifs.json` : Grille tarifaire
   - `content/pages/home.json` : Textes page d'accueil
   - `content/pages/depannage.json` : Textes page dépannage
   - `content/pages/installation.json` : Textes page installation
4. **Changer les couleurs** : palette dans `tailwind.config.js` (voir section design ci-dessous)
5. **Remplacer les images** : `public/images/`
6. **Build** : `npm run build` → génère un site statique dans `out/`

## Points importants pour le SEO

⚠️ **Pour éviter que Google détecte un réseau de sites similaires :**

- **RÉÉCRIRE les textes** : ne jamais copier-coller d'un site à l'autre
- **VARIER le design** : changer les couleurs, polices, layouts
- **IMAGES UNIQUES** : utiliser des photos différentes par site
- **HÉBERGEMENT VARIÉ** : si possible, utiliser des serveurs/IPs différents

## Commandes utiles

```bash
npm run dev      # Serveur de développement (localhost:3000)
npm run build    # Build de production (génère /out)
npm run start    # Serveur de production
```

## Structure des composants

### Layout (`components/layout/`)
- `Header.tsx` : Navigation responsive avec menu mobile
- `Footer.tsx` : Pied de page avec liens et contact

### Sections (`components/sections/`)
- `Hero.tsx` : Section héro avec CTA
- `Services.tsx` : Grille des services
- `Zones.tsx` : Zones d'intervention avec liens
- `Tarifs.tsx` : Grille tarifaire
- `FAQ.tsx` : Accordion questions/réponses
- `WhyUs.tsx` : Section "Pourquoi nous choisir"
- `CTA.tsx` : Bandeau call-to-action

### UI (`components/ui/`)
- `FloatingButton.tsx` : Bouton téléphone flottant

## Pages disponibles

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/depannage` | Dépannage urgence 24h/24 |
| `/installation` | Installation et changement de serrure |
| `/tarifs` | Grille tarifaire |
| `/zones` | Toutes les zones d'intervention |
| `/zones/[slug]` | Page par ville (générée dynamiquement) |
| `/contact` | Formulaire de contact |
| `/mentions-legales` | Mentions légales |
| `/confidentialite` | Politique RGPD |

## 🎨 Personnalisation du design

### Couleurs

Les couleurs sont définies directement dans `tailwind.config.js` :

```javascript
colors: {
  primary: {
    50: '#e8f4fc',
    // ...
    600: '#1976d2',  // ← Couleur principale à modifier
    // ...
  },
}
```

**⚠️ IMPORTANT : Utiliser des couleurs "locales" liées aux références régionales**

Pour renforcer l'identité locale et le SEO, choisir des couleurs qui évoquent la région :

| Ville | Couleur suggérée | Code hex | Inspiration |
|-------|------------------|----------|-------------|
| **Marseille** | Bleu Méditerranée | `#0077b6` | Mer, OM |
| **Lyon** | Rouge Garance | `#c1121f` | Couleur historique lyonnaise |
| **Bordeaux** | Bordeaux/Vin | `#722f37` | Vignobles |
| **Nice** | Bleu Azur | `#0096c7` | Côte d'Azur |
| **Toulouse** | Rose brique | `#c9184a` | Ville rose |
| **Strasbourg** | Bleu Alsace | `#1d3557` | Tradition alsacienne |
| **Nantes** | Vert Atlantique | `#2d6a4f` | Loire, nature |
| **Lille** | Rouge/Or | `#9d0208` | Blason de la ville |
| **Rennes** | Noir & Blanc | `#1d3557` | Couleurs bretonnes |
| **Montpellier** | Bleu/Jaune | `#0077b6` | Hérault, Méditerranée |

**Outil recommandé** : [uicolors.app](https://uicolors.app/create) pour générer une palette complète à partir d'une couleur de base.

**Palettes génériques (si pas de référence locale évidente)** :
- 🔵 Bleu pro : `#1976d2`
- 🟠 Orange chaleureux : `#ea580c`
- 🟢 Vert confiance : `#16a34a`
- 🔴 Rouge urgence : `#dc2626`
- 🟣 Violet moderne : `#7c3aed`

### Typographie

Dans `app/globals.css` :
```css
:root {
  --font-sans: 'Poppins', sans-serif;  /* Changer la police */
}
```

### Boutons et composants

Dans `app/globals.css`, section `@layer components` :
```css
.btn-primary {
  @apply rounded-full ...;   /* Boutons arrondis (défaut) */
  @apply rounded-lg ...;     /* Boutons carrés */
  @apply rounded-none ...;   /* Boutons rectangulaires */
}

.card {
  @apply rounded-2xl shadow-lg ...;   /* Cards avec ombre */
  @apply rounded-none border-2 ...;   /* Cards avec bordure */
}
```

### Layout des sections

Modifier les composants dans `components/sections/` :
- `Hero.tsx` : Fond (gradient, image), position de l'image
- `Services.tsx` : Grille 2, 3 ou 4 colonnes
- `WhyUs.tsx` : Layout image à gauche ou droite

Pour changer le thème, modifier ces valeurs. Tailwind utilise automatiquement ces variables via `tailwind.config.js`.

## Ajout d'une nouvelle zone d'intervention

Dans `config/site.ts`, ajouter à la liste `zones` :

```typescript
export const zones = [
  // ... zones existantes
  { name: "Nouvelle Ville", slug: "nouvelle-ville", postalCode: "59XXX" },
]
```

La page `/zones/nouvelle-ville` sera générée automatiquement au build.

## Ajout d'un nouveau service

Dans `config/site.ts`, ajouter à la liste `services` :

```typescript
export const services = [
  // ... services existants
  {
    id: "nouveau-service",
    name: "Nouveau Service",
    shortDesc: "Description courte",
    icon: "🔧",
    href: "/nouveau-service",
  },
]
```

Puis créer la page correspondante dans `app/nouveau-service/page.tsx`.

## Technologies utilisées

- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styles utilitaires
- **Export statique** : Site généré en HTML/CSS/JS pur

## Déploiement

Le site se build en export statique (`output: 'export'` dans `next.config.js`).

### Fichiers de déploiement

Le dossier `deploy/` contient :
- `nginx.conf` : Configuration Nginx prête à l'emploi (remplacer DOMAIN)
- `deploy.sh` : Script de déploiement automatique (build + upload rsync)
- `README.md` : Guide détaillé de déploiement

### Déploiement rapide sur VPS

```bash
# 1. Configurer deploy/deploy.sh (DOMAIN, VPS_HOST, VPS_USER)
# 2. Rendre exécutable
chmod +x deploy/deploy.sh
# 3. Déployer
./deploy/deploy.sh
```

### Options de déploiement

Le dossier `out/` généré peut être déployé sur :
- Vercel
- Netlify
- Nginx sur VPS (config fournie)
- Tout hébergement web statique

## Questions fréquentes

**Q: Comment ajouter Google Analytics ?**
R: Ajouter le script dans `app/layout.tsx` via le composant `<Script>` de Next.js.

**Q: Comment ajouter un formulaire fonctionnel ?**
R: Connecter le formulaire de `/contact` à un service comme Formspree, Netlify Forms, ou une API custom.

**Q: Comment modifier le favicon ?**
R: Remplacer `public/favicon.ico` et ajouter `public/icon.png` (Next.js les détecte automatiquement).

**Q: Comment ajouter une page ?**
R: Créer un dossier dans `app/` avec un fichier `page.tsx`. Exemple : `app/nouvelle-page/page.tsx`.

