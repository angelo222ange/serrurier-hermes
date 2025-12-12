# Guide d'Optimisation Web Vitals - Template Serrurerie

Ce guide récapitule toutes les optimisations appliquées pour atteindre un score de 100/100 sur PageSpeed Insights (Performance, Accessibilité, Bonnes Pratiques) pour les sites de serrurerie.

## 📋 Table des matières

1. [Optimisations de Cache](#optimisations-de-cache)
2. [Optimisations d'Images](#optimisations-dimages)
3. [Optimisations JavaScript](#optimisations-javascript)
4. [Optimisations CSS](#optimisations-css)
5. [Optimisations de Rendu](#optimisations-de-rendu)
6. [Optimisations d'Accessibilité](#optimisations-daccessibilité)
7. [Configuration Next.js](#configuration-nextjs)
8. [Fichiers de Configuration](#fichiers-de-configuration)
9. [Checklist de Déploiement](#checklist-de-déploiement)

---

## 🗄️ Optimisations de Cache

### Objectif
Mettre en cache les assets statiques (images, CSS, JS, fonts) pour 1 an avec `immutable` pour éviter les revalidations.

### Fichiers à configurer

#### 1. `public/_headers` (Netlify/Vercel)

```headers
# Images - Cache long (1 an) avec immutable
# Règle très spécifique pour /serrurerie/vincennes/ (priorité maximale)
/serrurerie/vincennes/*
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding
  X-Content-Type-Options: nosniff

/serrurerie/vincennes/**/*
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding
  X-Content-Type-Options: nosniff

/serrurerie/*
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding
  X-Content-Type-Options: nosniff

# Règle générale pour toutes les images
/*.webp
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding
  X-Content-Type-Options: nosniff

# CSS et JS - Cache long (1 an) avec immutable
/*.css
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding
  X-Content-Type-Options: nosniff

/*.js
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding
  X-Content-Type-Options: nosniff

# Next.js static assets
/_next/static/**/*
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding
  X-Content-Type-Options: nosniff

# Fonts - Cache long (1 an) avec immutable
/*.woff2
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding
  X-Content-Type-Options: nosniff
```

#### 2. `public/.htaccess` (Apache)

```apache
<IfModule mod_headers.c>
  # Images - Cache long (1 an) avec immutable
  <FilesMatch "\.(webp|jpg|jpeg|png|gif|svg|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
    Header set Vary "Accept-Encoding"
    Header set X-Content-Type-Options "nosniff"
  </FilesMatch>

  # Cache spécifique pour les dossiers d'images
  <DirectoryMatch "^/.*/serrurerie/vincennes/">
    Header set Cache-Control "public, max-age=31536000, immutable"
    Header set Vary "Accept-Encoding"
    Header set X-Content-Type-Options "nosniff"
  </DirectoryMatch>

  # CSS et JS - Cache long (1 an) avec immutable
  <FilesMatch "\.(css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
    Header set Vary "Accept-Encoding"
    Header set X-Content-Type-Options "nosniff"
  </FilesMatch>

  # Next.js static assets
  <DirectoryMatch "^/.*/_next/static/">
    Header set Cache-Control "public, max-age=31536000, immutable"
    Header set Vary "Accept-Encoding"
    Header set X-Content-Type-Options "nosniff"
  </DirectoryMatch>
</IfModule>
```

#### 3. `vercel.json` (Vercel)

```json
{
  "headers": [
    {
      "source": "/(.*\\.(webp|jpg|jpeg|png|gif|svg|ico))",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" },
        { "key": "Vary", "value": "Accept-Encoding" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    },
    {
      "source": "/serrurerie/vincennes/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" },
        { "key": "Vary", "value": "Accept-Encoding" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

#### 4. `netlify.toml` (Netlify)

```toml
[[headers]]
  for = "/*.webp"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    Vary = "Accept-Encoding"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/serrurerie/vincennes/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    Vary = "Accept-Encoding"
    X-Content-Type-Options = "nosniff"
```

---

## 🖼️ Optimisations d'Images

### 1. Script d'optimisation automatique

Créer `scripts/optimize-images.js` :

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const COMPRESSION_QUALITY = {
  hero: 70,      // Images hero (LCP) - qualité moyenne-haute
  service: 60,   // Images de services - qualité moyenne
  logo: 75,      // Logos - qualité haute
  default: 65    // Par défaut
};

const MAX_DIMENSIONS = {
  hero: { width: 1920, height: 1080 },
  service: { width: 1200, height: 800 },
  logo: { width: 500, height: 500 },
  default: { width: 1600, height: 1600 }
};

const processImage = async (inputPath, outputPath, quality, maxWidth, maxHeight) => {
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size / 1024; // KB

  await sharp(inputPath)
    .resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality })
    .toFile(outputPath);

  const newStats = fs.statSync(outputPath);
  const newSize = newStats.size / 1024; // KB
  const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

  return { originalSize, newSize, savings };
};

// Utilisation: node scripts/optimize-images.js
```

### 2. Configuration Next.js Image

Dans `next.config.js` :

```javascript
images: {
  unoptimized: true, // Pour static export
  formats: ['image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000, // 1 an
}
```

### 3. Utilisation dans les composants

```tsx
// Image hero (LCP) - Priorité haute
<Image
  src="/serrurerie/vincennes/hero.webp"
  alt="Serrurier professionnel"
  fill
  priority
  fetchPriority="high"
  quality={70}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1440px) 1440px, 1920px"
/>

// Images de services - Lazy loading
<Image
  src={service.image}
  alt={service.title}
  fill
  loading="lazy"
  quality={60}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 426px"
/>
```

### 4. Qualités recommandées

- **Hero images (LCP)** : `quality={70}`
- **Service images** : `quality={60}`
- **Logo** : `quality={75}`
- **Autres images** : `quality={65}`

---

## 📦 Optimisations JavaScript

### 1. Code Splitting dans `next.config.js`

```javascript
webpack: (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    config.target = ['web', 'es2020']; // Cibler ES2020 pour éviter les polyfills
    
    // Exclure les polyfills inutiles
    config.resolve.alias = {
      ...config.resolve.alias,
      'core-js': false,
      '@babel/polyfill': false,
      'regenerator-runtime': false,
    };
    
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
      concatenateModules: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000, // 100KB max par chunk
        maxAsyncRequests: 10,
        maxInitialRequests: 3, // CRITIQUE: Limiter les requêtes initiales
        cacheGroups: {
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
            priority: 50,
            enforce: true,
            reuseExistingChunk: true,
          },
          drmPackages: {
            name: 'drm-packages',
            test: /[\\/]node_modules[\\/]@drm[\\/]/,
            priority: 40,
            minChunks: 2,
            reuseExistingChunk: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            priority: 20,
            minChunks: 3,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 5, // Seulement si utilisé dans 5+ chunks
            priority: 10,
            minSize: 30000,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 5,
            priority: 5,
            minSize: 30000,
            reuseExistingChunk: true,
          },
        },
      },
    };
  }
  return config;
}
```

### 2. Lazy Loading des composants

```tsx
// Composants critiques (above the fold)
import { Header, Hero } from "@drm/ui";

// Composants non critiques - Lazy loading
const ProofSection = dynamic(
  () => import("@drm/ui").then(mod => ({ default: mod.ProofSection })),
  { 
    ssr: true,
    loading: () => null, // Pas de placeholder pour éviter layout shifts
  }
);

// Composants très non critiques (en bas de page)
const RealisationsSlideshow = dynamic(
  () => import("@drm/ui").then(mod => ({ default: mod.RealisationsSlideshow })),
  { ssr: false } // Pas de SSR pour les composants interactifs non critiques
);
```

### 3. Configuration SWC (`.swcrc`)

```json
{
  "jsc": {
    "target": "es2020",
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": true
    },
    "transform": {
      "react": {
        "runtime": "automatic"
      }
    },
    "externalHelpers": false,
    "keepClassNames": false
  },
  "module": {
    "type": "es6"
  },
  "minify": true,
  "isModule": true
}
```

### 4. Browserslist (`package.json`)

```json
{
  "browserslist": {
    "production": [
      "Chrome >= 90",
      "Firefox >= 88",
      "Safari >= 14",
      "Edge >= 90"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

---

## 🎨 Optimisations CSS

### 1. Configuration Tailwind (`tailwind.config.js`)

```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: true, // Garder le reset CSS
  },
  // Safelist minimale - seulement les classes dynamiques critiques
  safelist: [
    'animate-scroll-labels',
    'animate-fadeIn',
    {
      pattern: /^(bg|text|border)-(primary|secondary)-(600|700|800)$/,
      variants: ['hover'], // Seulement hover, pas toutes les variantes
    },
  ],
  theme: {
    // Configuration du thème...
  },
  plugins: [],
};
```

### 2. Configuration PostCSS (`postcss.config.js`)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifySelectors: true,
          discardUnused: true, // Supprimer les règles inutilisées
          reduceIdents: false,
          zindex: false,
          reduceInitial: true,
          calc: true,
          colormin: true,
          convertValues: true,
        }],
      },
    } : {}),
  },
};
```

### 3. CSS critique inline

Dans `app/globals.css` :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Utilisation de fonts système pour éviter les requêtes bloquantes */
@font-face {
  font-family: system-ui;
  font-display: swap;
  src: local('system-ui');
}

/* CSS critique inliné - styles essentiels pour le rendu initial */
```

### 4. Configuration Next.js pour CSS

Dans `next.config.js` :

```javascript
experimental: {
  optimizeCss: true, // Inline le CSS critique avec Critters
  optimizePackageImports: ['@drm/ui', '@drm/content', '@drm/seo'],
}
```

---

## ⚡ Optimisations de Rendu

### 1. CSS non-bloquant

Dans `app/layout.tsx` :

```tsx
<head>
  {/* Script pour charger le CSS de manière asynchrone et non-bloquante */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          function makeCSSAsync(link) {
            if (link.getAttribute('data-async') === 'true') return;
            link.setAttribute('data-async', 'true');
            if (link.sheet) return;
            link.media = 'print';
            link.onload = function() {
              this.media = 'all';
            };
            if ('onload' in link === false) {
              setTimeout(function() {
                link.media = 'all';
              }, 0);
            }
          }
          
          var cssLinks = document.querySelectorAll('link[rel="stylesheet"]:not([data-async])');
          for (var i = 0; i < cssLinks.length; i++) {
            makeCSSAsync(cssLinks[i]);
          }
          
          var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              mutation.addedNodes.forEach(function(node) {
                if (node.nodeName === 'LINK' && node.rel === 'stylesheet') {
                  makeCSSAsync(node);
                }
              });
            });
          });
          
          if (document.head) {
            observer.observe(document.head, {
              childList: true,
              subtree: true
            });
          }
        })();
      `,
    }}
  />
</head>
```

### 2. Scripts différés

```tsx
// Scripts non critiques - Lazy onload
<Script id="meta-pixel" strategy="lazyOnload">
  {/* Code du script */}
</Script>

// Images noscript - Lazy loading
<noscript>
  <img
    src="..."
    alt=""
    loading="lazy"
  />
</noscript>
```

### 3. YouTube lazy loading

Créer `app/components/LazyYouTube.tsx` :

```tsx
"use client";

import { useState, useEffect, useRef } from "react";

export function LazyYouTube({
  videoId,
  title,
  className = "",
  allowFullScreen = true,
  modestbranding = 1,
  rel = 0,
}: LazyYouTubeProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timer: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            timer = setTimeout(() => {
              setShouldLoad(true);
            }, 200);
          }
        });
      },
      { rootMargin: "100px" }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [shouldLoad]);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=${modestbranding}&rel=${rel}`;

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={allowFullScreen}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          {/* Placeholder */}
        </div>
      )}
    </div>
  );
}
```

---

## ♿ Optimisations d'Accessibilité

### 1. Contraste des couleurs

Utiliser des couleurs avec un ratio de contraste suffisant (WCAG AA minimum) :

```tsx
// ❌ Mauvais contraste
className="text-emerald-600"

// ✅ Bon contraste
className="text-emerald-700"
```

### 2. Zones tactiles

Toutes les zones interactives doivent faire au minimum 44x44px :

```tsx
<button
  className="h-11 w-11 min-h-[44px] min-w-[44px]"
  aria-label="Action"
  type="button"
>
  {/* Contenu */}
</button>
```

### 3. Attributs ARIA

```tsx
<button
  aria-label="Aller au groupe 2"
  type="button"
>
  {/* Contenu */}
</button>
```

---

## ⚙️ Configuration Next.js

### Configuration complète (`next.config.js`)

```javascript
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // Static export
  
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  
  reactStrictMode: true,
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@drm/ui', '@drm/content', '@drm/seo'],
  },
  
  swcMinify: true,
  
  compiler: {
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },
  
  webpack: (config, { dev, isServer }) => {
    // Configuration webpack (voir section Optimisations JavaScript)
  },
};

module.exports = nextConfig;
```

---

## 📁 Fichiers de Configuration

### Structure recommandée

```
apps/website/
├── app/
│   ├── layout.tsx          # Script CSS non-bloquant
│   ├── page.tsx            # Lazy loading des composants
│   └── globals.css         # CSS critique
├── public/
│   ├── _headers            # Headers Netlify/Vercel
│   └── .htaccess           # Headers Apache
├── .swcrc                  # Configuration SWC
├── next.config.js          # Configuration Next.js
├── tailwind.config.js      # Configuration Tailwind
├── postcss.config.js       # Configuration PostCSS
├── vercel.json             # Configuration Vercel
└── netlify.toml            # Configuration Netlify
```

---

## ✅ Checklist de Déploiement

### Avant le build

- [ ] Vérifier que toutes les images sont optimisées (script `optimize-images.js`)
- [ ] Vérifier que les qualités d'images sont correctes (hero: 70, service: 60, etc.)
- [ ] Vérifier que les `sizes` sont corrects pour chaque image
- [ ] Vérifier que les composants non critiques sont en lazy loading
- [ ] Vérifier que la safelist Tailwind est minimale

### Configuration des headers

- [ ] `public/_headers` configuré pour Netlify/Vercel
- [ ] `public/.htaccess` configuré pour Apache
- [ ] `vercel.json` configuré si déploiement sur Vercel
- [ ] `netlify.toml` configuré si déploiement sur Netlify

### Build et test

- [ ] Build en production : `npm run build`
- [ ] Vérifier la taille des chunks JavaScript
- [ ] Vérifier la taille du CSS généré
- [ ] Tester sur PageSpeed Insights
- [ ] Vérifier les Web Vitals (LCP, FCP, CLS, FID)

### Après déploiement

- [ ] Vérifier que les headers de cache sont appliqués
- [ ] Vérifier que les images sont bien en cache
- [ ] Tester sur mobile et desktop
- [ ] Vérifier l'accessibilité (contraste, zones tactiles)

---

## 📊 Métriques cibles

### Performance
- **Performance Score** : 100/100
- **LCP (Largest Contentful Paint)** : < 2.5s
- **FCP (First Contentful Paint)** : < 1.8s
- **CLS (Cumulative Layout Shift)** : < 0.1
- **FID (First Input Delay)** : < 100ms

### Accessibilité
- **Accessibility Score** : 100/100
- **Contraste des couleurs** : WCAG AA minimum
- **Zones tactiles** : Minimum 44x44px

### Bonnes Pratiques
- **Best Practices Score** : 100/100
- **HTTPS** : Activé
- **Cookies tiers** : Minimisés (youtube-nocookie.com)

---

## 🔧 Commandes utiles

```bash
# Optimiser les images
npm run optimize-images

# Build en production
npm run build

# Vérifier les types TypeScript
npm run typecheck

# Linter
npm run lint
```

---

## 📚 Ressources

- [Web Vitals](https://web.dev/vitals/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Next.js Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Tailwind CSS Purging](https://tailwindcss.com/docs/optimizing-for-production)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## 🎯 Résumé des optimisations

1. **Cache** : 1 an avec `immutable` pour tous les assets statiques
2. **Images** : WebP, qualité optimisée, `sizes` corrects, lazy loading
3. **JavaScript** : Code splitting agressif, lazy loading, exclusion des polyfills
4. **CSS** : Purging Tailwind, minification, CSS critique inline
5. **Rendu** : CSS non-bloquant, scripts différés, YouTube lazy
6. **Accessibilité** : Contraste suffisant, zones tactiles 44x44px

---

**Dernière mise à jour** : 2024

