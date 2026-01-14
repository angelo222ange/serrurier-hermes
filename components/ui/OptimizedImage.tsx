"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
  className?: string;
  sizes?: string;
  quality?: number;
  /** Type d'image pour déterminer les tailles responsives */
  imageType?: "hero" | "service" | "thumbnail" | "logo";
  /** Props Next/Image supplémentaires */
  [key: string]: any;
}

/**
 * Composant Image optimisé avec support des versions responsives
 * Génère automatiquement les srcset pour les images optimisées
 */
export function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  loading = "lazy",
  className = "",
  sizes,
  quality = 85,
  imageType = "service",
  ...props
}: OptimizedImageProps) {
  const [imgError, setImgError] = useState(false);

  // Générer les srcset basés sur le type d'image
  const getSrcSet = () => {
    if (!src || imgError) return undefined;

    const ext = src.substring(src.lastIndexOf("."));
    const baseSrc = src.substring(0, src.lastIndexOf("."));

    // Vérifier si c'est une image responsive générée
    if (baseSrc.endsWith("-sm") || baseSrc.endsWith("-md") || baseSrc.endsWith("-lg") || baseSrc.endsWith("-xl")) {
      return undefined; // Ne pas générer de srcset pour les versions déjà dimensionnées
    }

    const srcSets = {
      hero: [
        `${baseSrc}-sm${ext} 640w`,
        `${baseSrc}-md${ext} 768w`,
        `${baseSrc}-lg${ext} 1280w`,
        `${baseSrc}${ext} 1920w`,
      ],
      service: [
        `${baseSrc}-sm${ext} 400w`,
        `${baseSrc}-md${ext} 600w`,
        `${baseSrc}-lg${ext} 800w`,
      ],
      thumbnail: [
        `${baseSrc}-sm${ext} 200w`,
        `${baseSrc}-md${ext} 300w`,
        `${baseSrc}-lg${ext} 400w`,
      ],
      logo: [
        `${baseSrc}${ext}`,
      ],
    };

    return srcSets[imageType]?.join(", ");
  };

  // Générer les sizes basés sur le type si non fourni
  const getDefaultSizes = () => {
    if (sizes) return sizes;

    const defaultSizes = {
      hero: "100vw",
      service: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
      thumbnail: "(max-width: 768px) 50vw, 33vw",
      logo: "128px",
    };

    return defaultSizes[imageType];
  };

  // Fallback en cas d'erreur
  const handleError = () => {
    setImgError(true);
  };

  // Si erreur, afficher un placeholder
  if (imgError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fill ? { position: "absolute", inset: 0 } : { width, height }}
      >
        <svg className="w-1/3 h-1/3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  const srcSet = getSrcSet();
  const imageSizes = getDefaultSizes();

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      priority={priority}
      loading={priority ? undefined : loading}
      className={className}
      sizes={imageSizes}
      quality={quality}
      onError={handleError}
      // Ajout du srcset personnalisé si disponible
      {...(srcSet && { srcSet })}
      {...props}
    />
  );
}
