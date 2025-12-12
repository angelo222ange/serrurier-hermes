/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Export statique pour hébergement simple
  output: 'export',
  
  // Images optimisées
  images: {
    unoptimized: true, // Pour static export
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 an
  },

  // Trailing slash pour compatibilité hébergement
  trailingSlash: true,

  // Strict mode
  reactStrictMode: true,

  // Optimisations expérimentales
  // Note: optimizeCss nécessite le module 'critters' (npm install critters)
  // experimental: {
  //   optimizeCss: true,
  // },

  // Minification SWC
  swcMinify: true,

  // Suppression des console.log en production
  compiler: {
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },

  // Configuration Webpack optimisée
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Cibler ES2020 pour éviter les polyfills inutiles
      config.target = ['web', 'es2020'];
      
      // Exclure les polyfills inutiles
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js': false,
        '@babel/polyfill': false,
        'regenerator-runtime': false,
      };
      
      // Optimisation du code splitting
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
          maxInitialRequests: 3, // Limiter les requêtes initiales
          cacheGroups: {
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 50,
              enforce: true,
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
              minChunks: 5,
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
  },
};

module.exports = nextConfig;
