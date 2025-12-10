/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique pour hébergement simple
  output: 'export',
  
  // Images
  images: {
    unoptimized: true,
  },

  // Trailing slash pour compatibilité hébergement
  trailingSlash: true,

  // Strict mode
  reactStrictMode: true,
}

module.exports = nextConfig

