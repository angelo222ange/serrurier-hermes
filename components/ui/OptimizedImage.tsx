"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
 * Charge automatiquement les versions optimisées (sm/md/lg)
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
  quality = 75,
  imageType = "service",
  ...props
}: OptimizedImageProps) {
  // Use ref to track mounted state and avoid hydration mismatch
  const mounted = useRef(false);
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  // Sync state when src prop changes
  useEffect(() => {
    mounted.current = true;
    setImgSrc(src);
    setImgError(false);
    return () => { mounted.current = false; };
  }, [src]);

  // Générer le srcset pour les images responsives
  const getSrcSet = () => {
    if (!src || imgError || src.includes('logo')) return undefined;

    const ext = src.substring(src.lastIndexOf("."));
    const baseSrc = src.substring(0, src.lastIndexOf("."));

    // Vérifier si c'est déjà une version responsive
    if (baseSrc.match(/-(sm|md|lg)$/)) return undefined;

    // Générer le srcset basé sur le type
    const srcSets = {
      hero: [
        `${baseSrc}-sm${ext} 640w`,
        `${baseSrc}-md${ext} 768w`,
        `${baseSrc}-lg${ext} 1280w`,
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
      logo: undefined,
    };

    return srcSets[imageType]?.join(", ");
  };

  // Générer les sizes basés sur le type si non fourni
  const getDefaultSizes = () => {
    if (sizes) return sizes;

    const defaultSizes = {
      hero: "100vw",
      service: "(max-width: 640px) 95vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px",
      thumbnail: "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 200px",
      logo: "64px",
    };

    return defaultSizes[imageType];
  };

  // Fallback en cas d'erreur - charger la version -sm
  const handleError = () => {
    // Only update state if component is mounted (prevents hydration mismatch)
    if (!mounted.current) return;
    
    if (!imgError && !imgSrc.includes('-sm')) {
      const ext = imgSrc.substring(imgSrc.lastIndexOf("."));
      const baseSrc = imgSrc.substring(0, imgSrc.lastIndexOf("."));
      const smallVersion = `${baseSrc}-sm${ext}`;
      setImgSrc(smallVersion);
    } else {
      setImgError(true);
    }
  };

  // Si erreur finale, afficher un placeholder minimal
  if (imgError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fill ? { position: "absolute", inset: 0 } : { width, height }}
        role="img"
        aria-label={alt}
      >
        <svg className="w-1/3 h-1/3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
      src={imgSrc}
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
      {...(srcSet && { srcSet })}
      unoptimized={true}
      {...props}
    />
  );
}
