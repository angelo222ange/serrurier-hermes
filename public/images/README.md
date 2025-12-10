# 📸 Guide des Images

Ce dossier contient toutes les images du site. Voici la structure et les spécifications pour chaque type d'image.

## 📁 Structure des dossiers

```
images/
├── hero/           → Images principales (bannières)
├── services/       → Images des services
├── zones/          → Images par ville/zone
├── team/           → Photos de l'équipe
├── logos/          → Logo et favicon
├── icons/          → Icônes personnalisées
├── gallery/        → Galerie de réalisations
└── backgrounds/    → Fonds et textures
```

## 🖼️ Spécifications par dossier

### `/hero/` - Images principales
Images de bannière pour les pages principales.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `hero-home.webp` | 1920×1080 | Page d'accueil |
| `hero-depannage.webp` | 1920×800 | Page dépannage |
| `hero-installation.webp` | 1920×800 | Page installation |
| `hero-contact.webp` | 1920×600 | Page contact |

### `/services/` - Images des services
Une image par service proposé.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `depannage.webp` | 800×600 | Service dépannage |
| `ouverture-porte.webp` | 800×600 | Service ouverture |
| `changement-serrure.webp` | 800×600 | Service changement |
| `installation.webp` | 800×600 | Service installation |
| `blindage.webp` | 800×600 | Service blindage |
| `cylindre.webp` | 800×600 | Service cylindre |

### `/zones/` - Images par zone
Images spécifiques à chaque ville (optionnel, pour personnalisation locale).

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `lille.webp` | 800×600 | Page zone Lille |
| `roubaix.webp` | 800×600 | Page zone Roubaix |
| `tourcoing.webp` | 800×600 | Page zone Tourcoing |
| ... | | |

### `/team/` - Photos d'équipe
Photos des techniciens/équipe (avec consentement).

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `team-1.webp` | 400×400 | Photo équipe/technicien |
| `team-2.webp` | 400×400 | Photo équipe/technicien |
| `equipe.webp` | 1200×800 | Photo de groupe |

### `/logos/` - Logos et favicon
Logo de l'entreprise en différents formats.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `logo.svg` | vectoriel | Logo principal (header) |
| `logo-white.svg` | vectoriel | Logo blanc (footer sombre) |
| `logo-icon.svg` | vectoriel | Icône seule |
| `favicon.ico` | 32×32 | Favicon navigateur |
| `apple-touch-icon.png` | 180×180 | Icône iOS |
| `og-image.jpg` | 1200×630 | Image partage réseaux sociaux |

### `/icons/` - Icônes personnalisées
Icônes SVG personnalisées (si non utilisation d'emojis).

| Fichier | Format | Utilisation |
|---------|--------|-------------|
| `icon-phone.svg` | SVG | Icône téléphone |
| `icon-clock.svg` | SVG | Icône horaires |
| `icon-location.svg` | SVG | Icône localisation |
| `icon-check.svg` | SVG | Icône validation |

### `/gallery/` - Galerie de réalisations
Photos de chantiers et réalisations.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `realisation-1.webp` | 800×600 | Photo chantier |
| `realisation-2.webp` | 800×600 | Photo chantier |
| `avant-apres-1.webp` | 1600×600 | Avant/après |

### `/backgrounds/` - Fonds et textures
Images de fond pour les sections.

| Fichier | Dimensions | Utilisation |
|---------|------------|-------------|
| `pattern.svg` | vectoriel | Motif répétable |
| `texture.webp` | 1920×1080 | Texture de fond |
| `gradient.webp` | 1920×1080 | Dégradé personnalisé |

## ⚙️ Recommandations techniques

### Format
- **WebP** : Format recommandé (meilleure compression)
- **SVG** : Pour les logos et icônes
- **JPG** : Alternative si WebP non supporté

### Optimisation
- Compresser les images avant upload
- Outils : [Squoosh](https://squoosh.app/), [TinyPNG](https://tinypng.com/)
- Viser < 100KB par image si possible

### Nommage
- Utiliser des noms descriptifs en minuscules
- Séparer les mots par des tirets : `ouverture-porte.webp`
- Éviter les accents et caractères spéciaux

## 🔄 Remplacement des images

Pour remplacer une image :
1. Garder exactement le même nom de fichier
2. Respecter les dimensions recommandées
3. Le site utilisera automatiquement la nouvelle image

## ⚠️ Images obligatoires

Ces images doivent être présentes pour éviter les erreurs :

- [ ] `logos/logo.svg` - Logo principal
- [ ] `hero/hero-home.webp` - Bannière accueil
- [ ] `logos/og-image.jpg` - Image réseaux sociaux

Les autres images sont optionnelles (des placeholders peuvent être utilisés).

