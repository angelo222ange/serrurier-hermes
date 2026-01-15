/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Export statique pour hébergement simple (uniquement en production)
  ...(isProduction && { output: 'export' }),

  // Rewrites pour mapper /serrurier-{ville}/ vers /ville/{ville}/
  // Fonctionne en mode dev, ignoré en static export (fichiers générés directement)
  async rewrites() {
    return [
      // Pages ville principales
      {
        source: '/serrurier-:city/',
        destination: '/ville/:city/',
      },
      // Pages service par ville
      {
        source: '/serrurier-:city/:service/',
        destination: '/ville/:city/:service/',
      },
      // Page contact par ville
      {
        source: '/serrurier-:city/contact/',
        destination: '/ville/:city/contact/',
      },
    ];
  },
  
  // Images optimisées
  images: {
    unoptimized: true, // Pour static export - nécessaire
    formats: ['image/webp'],
    deviceSizes: [640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 an
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Trailing slash pour compatibilité hébergement
  trailingSlash: true,

  // Strict mode
  reactStrictMode: true,

  // Minification SWC
  swcMinify: true,

  // Suppression des console.log en production
  compiler: {
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },

  // Optimisations expérimentales
  experimental: {
    // Optimiser le chargement des CSS
    optimizeCss: false, // Désactivé car nécessite critters
    // Modern build targeting
    // Réduit les polyfills inutiles pour les navigateurs modernes
    optimizePackageImports: ['@/components', '@/lib'],
  },

  // Configuration Webpack optimisée
  webpack: (config, { dev, isServer }) => {
    // Exclure les répertoires de build du watcher
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules', '**/.next', '**/out', '**/.git', '**/public/images-backup'],
      };
    }
    
    if (!dev && !isServer) {
      // Cibler ES2020 pour éviter les polyfills inutiles (navigateurs modernes uniquement)
      config.target = ['web', 'es2020'];
      
      // Exclure complètement les polyfills inutiles
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js': false,
        '@babel/polyfill': false,
        'regenerator-runtime': false,
      };
      
      // Optimisation agressive du code splitting
      config.optimization = {
        ...config.optimization,
        // Tree shaking agressif
        usedExports: true,
        sideEffects: false,
        concatenateModules: true,
        // Minification optimale
        minimize: true,
        // Code splitting optimisé
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 80000, // Réduire la taille max des chunks pour un meilleur parallélisme
          maxAsyncRequests: 15, // Augmenter pour permettre plus de parallélisme
          maxInitialRequests: 5, // Augmenter légèrement pour un meilleur splitting
          cacheGroups: {
            // Framework React/Next (le plus critique)
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 50,
              enforce: true,
              reuseExistingChunk: true,
            },
            // Bibliothèques tierces (groupées)
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name: 'lib',
              priority: 20,
              minChunks: 2, // Réduire pour mieux splitter
              reuseExistingChunk: true,
            },
            // Code partagé (commons)
            commons: {
              name: 'commons',
              minChunks: 3,
              priority: 10,
              minSize: 10000, // Réduire pour mieux splitter
              reuseExistingChunk: true,
            },
            // Default
            default: {
              minChunks: 2,
              priority: 5,
              minSize: 10000,
              reuseExistingChunk: true,
            },
          },
        },
        // Runtime chunk séparé pour meilleur caching
        runtimeChunk: {
          name: 'runtime',
        },
      };

      // Module concatenation pour réduire la taille
      config.optimization.concatenateModules = true;
    }
    
    return config;
  },

  // Headers pour meilleures performances
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
