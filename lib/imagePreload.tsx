/**
 * Script de préchargement des images critiques
 * À inclure dans le <head> pour charger les images hero avant le JS
 */

interface PreloadConfig {
  heroImage?: string;
  logoImage?: string;
}

export function generateImagePreloads(config: PreloadConfig): string {
  const preloads: string[] = [];

  if (config.heroImage) {
    const ext = config.heroImage.substring(config.heroImage.lastIndexOf('.'));
    const baseSrc = config.heroImage.substring(0, config.heroImage.lastIndexOf('.'));
    
    // Preload les versions responsive du hero
    preloads.push(
      `<link rel="preload" as="image" href="${baseSrc}-sm${ext}" media="(max-width: 640px)" imageSrcset="${baseSrc}-sm${ext} 640w" type="image/webp">`,
      `<link rel="preload" as="image" href="${baseSrc}-md${ext}" media="(min-width: 641px) and (max-width: 768px)" imageSrcset="${baseSrc}-md${ext} 768w" type="image/webp">`,
      `<link rel="preload" as="image" href="${baseSrc}-lg${ext}" media="(min-width: 769px)" imageSrcset="${baseSrc}-lg${ext} 1280w" type="image/webp">`
    );
  }

  if (config.logoImage) {
    preloads.push(
      `<link rel="preload" as="image" href="${config.logoImage}" type="image/webp">`
    );
  }

  return preloads.join('\n');
}

/**
 * Composant React pour le preload d'images
 */
export function ImagePreload({ heroImage, logoImage }: PreloadConfig) {
  if (!heroImage && !logoImage) return null;

  return (
    <>
      {heroImage && (() => {
        const ext = heroImage.substring(heroImage.lastIndexOf('.'));
        const baseSrc = heroImage.substring(0, heroImage.lastIndexOf('.'));
        
        return (
          <>
            {/* Preload mobile (640px) */}
            <link
              rel="preload"
              as="image"
              href={`${baseSrc}-sm${ext}`}
              imageSrcSet={`${baseSrc}-sm${ext} 640w`}
              imageSizes="100vw"
              media="(max-width: 640px)"
              type="image/webp"
            />
            {/* Preload tablet (768px) */}
            <link
              rel="preload"
              as="image"
              href={`${baseSrc}-md${ext}`}
              imageSrcSet={`${baseSrc}-md${ext} 768w`}
              imageSizes="100vw"
              media="(min-width: 641px) and (max-width: 768px)"
              type="image/webp"
            />
            {/* Preload desktop (1280px) */}
            <link
              rel="preload"
              as="image"
              href={`${baseSrc}-lg${ext}`}
              imageSrcSet={`${baseSrc}-lg${ext} 1280w`}
              imageSizes="100vw"
              media="(min-width: 769px)"
              type="image/webp"
            />
          </>
        );
      })()}
      
      {logoImage && (
        <link
          rel="preload"
          as="image"
          href={logoImage}
          type="image/webp"
        />
      )}
    </>
  );
}
