# 🔐 Serrurier Template

Template Next.js pour créer des sites de serrurerie. Conçu pour être facilement personnalisable et duplicable pour créer plusieurs sites uniques.

## 🚀 Démarrage rapide

```bash
# 1. Cloner ce repo pour créer un nouveau site
git clone https://github.com/vous/serrurier-template.git serrurier-lyon-69
cd serrurier-lyon-69

# 2. Supprimer l'historique git et réinitialiser
rm -rf .git
git init

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le site.

---

## 📁 Structure du projet

```
serrurier-template/
│
├── config/
│   └── site.ts           # ⭐ Configuration principale (À PERSONNALISER)
│
├── content/
│   ├── faq.json          # Questions fréquentes
│   └── tarifs.json       # Grille tarifaire
│
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Hero, Services, FAQ, Tarifs, etc.
│   └── ui/               # Boutons, cartes, etc.
│
├── app/
│   ├── page.tsx          # Homepage
│   ├── depannage/        # Page dépannage
│   ├── tarifs/           # Page tarifs
│   ├── zones/            # Zones d'intervention
│   ├── contact/          # Page contact
│   └── ...
│
└── public/
    └── images/           # Images du site (À REMPLACER)
```

---

## ⚙️ Personnalisation

### 1. Configuration du site (`config/site.ts`)

C'est le fichier principal à modifier. Il contient toutes les informations du site :

```typescript
export const siteConfig = {
  // Informations entreprise
  name: "Serrurier Hermès",             // Nom court
  fullName: "Serrurier Hermès Paris",   // Nom complet
  domain: "serrurier-hermes.com",        // Domaine
  
  // Contact
  phone: "01 XX XX XX XX",
  email: "contact@serrurier-hermes.com",
  
  // Localisation
  city: "Paris",
  postalCode: "75000",
  department: "Paris",
  region: "Île-de-France",
  
  // Avis Google
  reviews: {
    rating: 4.9,
    count: 847,
  },
  
  // Couleurs (modifiables dans globals.css)
  ...
}
```

### 2. Zones d'intervention (`config/site.ts`)

Modifier la liste `zones` pour les communes desservies :

```typescript
export const zones = [
  { name: "Paris 1er", slug: "paris-1", postalCode: "75001", time: "15 min" },
  { name: "Paris 2ème", slug: "paris-2", postalCode: "75002", time: "15 min" },
  // Ajouter vos zones...
]
```

### 3. Contenu (`content/`)

- `faq.json` : Questions/Réponses
- `tarifs.json` : Grille tarifaire

### 4. Design (`app/globals.css`)

#### Couleurs
Modifier les variables CSS pour changer les couleurs :

```css
:root {
  --color-primary-600: #1976d2;  /* Couleur principale */
  /* Nuances de 50 (clair) à 900 (foncé) */
}
```

**Palettes suggérées** : 🔵 `#1976d2` | 🟠 `#ea580c` | 🟢 `#16a34a` | 🔴 `#dc2626` | 🟣 `#7c3aed`

#### Boutons et composants
Dans la section `@layer components` :
```css
.btn-primary {
  @apply rounded-full ...;   /* Boutons arrondis (défaut) */
  @apply rounded-lg ...;     /* Boutons carrés */
}
```

#### Typographie
```css
:root {
  --font-sans: 'Poppins', sans-serif;
}
```

#### Layout des sections
Modifier les composants dans `components/sections/` pour personnaliser les mises en page (Hero, Services, etc.)

### 5. Images (`public/images/`)

Remplacer les images par les vôtres :
- `logo.webp` - Logo du site
- `hero-serrurier.webp` - Image hero
- `serrurier-travail.webp` - Image section "Pourquoi nous"
- `depannage-urgence.webp` - Image page dépannage

---

## 📝 Checklist nouveau site

```markdown
## Site: serrurier-[ville]-[code].fr

### Configuration
- [ ] Modifier `config/site.ts` (nom, téléphone, ville, etc.)
- [ ] Modifier les couleurs dans `app/globals.css`
- [ ] Mettre à jour les zones d'intervention

### Contenu (RÉÉCRIRE, ne pas copier)
- [ ] `content/faq.json` - Réécrire les réponses
- [ ] `content/tarifs.json` - Adapter les prix

### Design (VARIER entre les sites)
- [ ] Changer les couleurs principales
- [ ] Modifier le layout du Hero si possible
- [ ] Utiliser des images différentes

### Images
- [ ] Logo unique
- [ ] Images hero différentes
- [ ] Images de fond variées

### SEO
- [ ] Vérifier les balises meta
- [ ] Tester le Schema.org (JSON-LD)
- [ ] Vérifier le sitemap
```

---

## 🏗️ Build & Déploiement

### Build statique

```bash
npm run build
```

Génère un export statique dans `out/`.

### Déploiement

Le site peut être déployé sur :
- **Vercel** (recommandé)
- **Netlify**
- **VPS avec Nginx**
- Tout hébergement supportant les sites statiques

#### Exemple config Nginx

```nginx
server {
    listen 80;
    server_name serrurier-lyon-69.fr www.serrurier-lyon-69.fr;
    
    root /var/www/serrurier-lyon-69/out;
    index index.html;
    
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```

---

## 🎨 Conseils SEO

Pour éviter que Google détecte un réseau de sites similaires :

1. **Textes uniques** : Réécrire entièrement les textes, pas de copier-coller
2. **Design différent** : Varier les couleurs, polices, layouts
3. **Images uniques** : Utiliser des photos différentes par site
4. **Hébergement varié** : Si possible, héberger sur des serveurs/IPs différents
5. **Pas de cross-linking** : Ne pas faire de liens entre vos sites

---

## 📦 Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Démarrer le serveur de production |
| `npm run lint` | Vérifier le code |

---

## 🤝 Support

Pour toute question ou problème, ouvrez une issue sur le repo.

---

**Licence** : Privé - Usage personnel uniquement

