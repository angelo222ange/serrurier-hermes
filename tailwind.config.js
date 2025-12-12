/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: true, // Garder le reset CSS
  },
  // Safelist minimale - seulement les classes dynamiques critiques
  safelist: [
    'animate-fadeIn',
    {
      pattern: /^(bg|text|border)-(primary)-(600|700|800)$/,
      variants: ['hover'],
    },
  ],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // COULEURS PRINCIPALES - MODIFIER ICI POUR CHAQUE SITE
        // ═══════════════════════════════════════════════════════════════
        primary: {
          50: '#e8f4fc',
          100: '#c5e4f8',
          200: '#9dd2f3',
          300: '#75c0ee',
          400: '#4daeea',
          500: '#2196e3',
          600: '#1976d2',  // Couleur principale
          700: '#1565c0',
          800: '#0d47a1',
          900: '#0a3d8f',
        },
        // Vous pouvez ajouter d'autres couleurs personnalisées ici
        // accent: {
        //   500: '#ff6b35',
        //   600: '#e55a2b',
        // },
      },
      fontFamily: {
        // Police principale - MODIFIER ICI SI BESOIN
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
