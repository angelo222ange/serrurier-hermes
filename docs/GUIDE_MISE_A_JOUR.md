# 📝 Guide de Mise à Jour - Serrurier Hermès

Ce guide explique comment effectuer les modifications courantes sur le site.

---

## 🔄 Modifier les numéros de téléphone

### Fichier principal : `config/site.ts`

#### Numéro par défaut (affiché partout)

```typescript
export const siteConfig = {
  // ...
  phone: "01 XX XX XX XX",        // ← Modifier ici
  phoneLink: "tel:+33100000000",  // ← Format international
  // ...
}
```

#### Numéros par région

```typescript
export const regionConfigs = {
  paris: {
    phone: "01 XX XX XX XX",        // ← Numéro Paris/IDF
    phoneLink: "tel:+33100000000",
    // ...
  },
  bordeaux: {
    phone: "05 XX XX XX XX",        // ← Numéro Bordeaux
    phoneLink: "tel:+33500000000",
    // ...
  },
  montpellier: {
    phone: "04 XX XX XX XX",        // ← Numéro Montpellier
    phoneLink: "tel:+33400000000",
    // ...
  },
}
```

### Après modification

```bash
npm run build
# Redéployer le site
```

---

## 🏙️ Ajouter une nouvelle ville

### Étape 1 : Ajouter la zone dans `config/site.ts`

Pour une ville en région parisienne, ajoutez dans `zonesIDF` :

```typescript
export const zonesIDF = [
  // ... zones existantes ...
  { name: "Levallois-Perret", slug: "levallois-perret", postalCode: "92300", time: "20 min" },
];
```

Pour une ville près de Bordeaux, ajoutez dans `zonesBordeaux` :

```typescript
export const zonesBordeaux = [
  // ... zones existantes ...
  { name: "Saint-Médard-en-Jalles", slug: "saint-medard-en-jalles", postalCode: "33160", time: "25 min" },
];
```

### Étape 2 : Ajouter les avis (optionnel mais recommandé)

Créez ou modifiez le fichier d'avis approprié dans `content/reviews/` :

```json
// content/reviews/paris.json (pour IDF)
{
  "levallois-perret": [
    {
      "name": "Jean M.",
      "rating": 5,
      "date": "il y a 2 semaines",
      "text": "Excellent serrurier à Levallois-Perret. Intervention rapide pour mon ouverture de porte.",
      "service": "Ouverture de porte"
    }
    // ... ajouter 9 autres avis
  ]
}
```

### Étape 3 : Ajouter l'image de zone (optionnel)

Ajoutez une image WebP dans le dossier approprié :

```
public/images/zones/idf/levallois-perret.webp
public/images/zones/bordeaux/saint-medard-en-jalles.webp
```

Dimensions recommandées : 800x600px, format WebP, < 100KB

### Étape 4 : Régénérer le sitemap

```bash
node scripts/generate-sitemap.js
```

### Étape 5 : Build et déploiement

```bash
npm run build
# Redéployer
```

---

## 💰 Modifier les tarifs

### Fichier : `content/tarifs.json`

```json
{
  "categories": [
    {
      "name": "Ouverture de porte",
      "items": [
        { "name": "Porte claquée", "price": 69 },  // ← Modifier les prix
        { "name": "Porte fermée à clé", "price": 89 },
        { "name": "Porte blindée", "price": 149 }
      ]
    }
    // ...
  ]
}
```

### Les prix sont aussi utilisés dans `config/site.ts`

```typescript
export const services = [
  {
    id: "ouverture-porte",
    slug: "ouverture-de-porte",
    priceFrom: 69,  // ← Prix "à partir de" affiché
    // ...
  },
  // ...
]
```

---

## 📝 Modifier le contenu des services

### Fichiers : `content/pages/services/`

- `ouverture-porte.json`
- `changement-serrure.json`
- `depannage.json`
- `blindage-porte.json`
- `remplacement-cylindre.json`
- `installation-serrure.json`

### Structure d'un fichier service

```json
{
  "title": "Ouverture de Porte",
  "description": "Description complète du service...",
  "intro": [
    "Premier paragraphe...",
    "Deuxième paragraphe..."
  ],
  "situations": [
    {
      "title": "Porte claquée",
      "description": "Description de la situation",
      "price": 69,
      "icon": "🚪"
    }
  ],
  "faq": [
    {
      "question": "Question fréquente ?",
      "answer": "Réponse détaillée."
    }
  ]
}
```

---

## ⭐ Modifier les avis clients

### Fichiers : `content/reviews/`

- `paris.json` - Avis pour Paris et IDF
- `bordeaux.json` - Avis pour Bordeaux et environs
- `montpellier.json` - Avis pour Montpellier et environs

### Structure d'un avis

```json
{
  "name": "Marie L.",
  "rating": 5,
  "date": "il y a 3 semaines",
  "text": "Texte de l'avis mentionnant la ville et le service...",
  "service": "Ouverture de porte"
}
```

### Règles pour des avis crédibles

- ✅ Mentionner la ville ou un quartier
- ✅ Mentionner le service effectué
- ✅ Varier les prénoms (Marc, Sophie, Pierre, Marie, etc.)
- ✅ Varier les dates (2 semaines à 6 mois)
- ✅ Tous les avis = 5 étoiles
- ❌ Ne pas mettre de noms complets

---

## ❓ Modifier les FAQ

### FAQ génériques : `content/faq.json`

```json
{
  "generic": [
    {
      "question": "Quel est le prix d'un serrurier à {city} ?",
      "answer": "Le prix dépend du type de prestation à {city}..."
    }
  ],
  "services": {
    "ouverture-de-porte": [
      {
        "question": "Combien coûte une ouverture de porte ?",
        "answer": "À partir de 69€ pour une porte claquée..."
      }
    ]
  }
}
```

**Note** : `{city}` est automatiquement remplacé par le nom de la ville.

---

## 🎨 Modifier les couleurs (par région)

### Fichier : `config/site.ts`

```typescript
export const regionConfigs = {
  paris: {
    colors: {
      primary: "#1E3A5F",    // Bleu nuit
      secondary: "#C9A227",  // Or
      accent: "#F97316",     // Orange CTA
      background: "#F8FAFC",
    },
  },
  bordeaux: {
    colors: {
      primary: "#722F37",    // Lie de vin
      secondary: "#D4A574",  // Pierre blonde
      accent: "#F97316",     // Orange CTA
      background: "#FDF8F5",
    },
  },
  // ...
}
```

**Note** : Les variables CSS sont dans `app/globals.css`

---

## 🔧 Commandes utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Générer le sitemap
node scripts/generate-sitemap.js

# Optimiser les images
node scripts/optimize-images.js

# Linter
npm run lint
```

---

## 📊 Structure des fichiers

```
serrurier-template-1/
├── app/                    # Pages Next.js
├── components/             # Composants React
│   ├── layout/            # Header, Footer
│   ├── sections/          # Sections de page
│   ├── seo/               # Schémas JSON-LD
│   └── templates/         # Templates de pages
├── config/
│   └── site.ts            # ⭐ Configuration principale
├── content/
│   ├── faq.json           # FAQ
│   ├── tarifs.json        # Tarifs
│   ├── pages/             # Contenu des pages
│   └── reviews/           # Avis clients
├── lib/                   # Utilitaires
├── public/
│   ├── images/            # Images
│   ├── sitemap.xml        # Sitemap
│   └── robots.txt         # Robots
└── scripts/               # Scripts utilitaires
```

---

## ⚠️ Points d'attention

1. **Après toute modification** : Toujours faire `npm run build` et redéployer
2. **Sitemap** : Régénérer après ajout de nouvelles villes
3. **Images** : Format WebP, < 100KB, dimensions adaptées
4. **Téléphones** : Vérifier le format `tel:+33...` pour les liens cliquables
5. **Avis** : 10 avis minimum par zone pour la crédibilité
