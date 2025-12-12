module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Minification CSS en production
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifySelectors: true,
          discardUnused: true,
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
