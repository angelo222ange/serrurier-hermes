"use client";

import { useState, useEffect, useRef } from "react";

interface LazyYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
  allowFullScreen?: boolean;
  modestbranding?: 0 | 1;
  rel?: 0 | 1;
  thumbnailQuality?: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault";
}

/**
 * Composant YouTube avec lazy loading
 * 
 * Charge l'iframe YouTube uniquement quand le composant devient visible
 * et après un délai pour optimiser les performances.
 * 
 * Utilise youtube-nocookie.com pour minimiser les cookies tiers.
 * 
 * @example
 * <LazyYouTube
 *   videoId="dQw4w9WgXcQ"
 *   title="Ma vidéo"
 *   className="w-full aspect-video"
 * />
 */
export function LazyYouTube({
  videoId,
  title,
  className = "",
  aspectRatio = "16:9",
  allowFullScreen = true,
  modestbranding = 1,
  rel = 0,
  thumbnailQuality = "hqdefault",
}: LazyYouTubeProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcul du padding pour le ratio d'aspect
  const aspectRatioPadding = {
    "16:9": "56.25%",
    "4:3": "75%",
    "1:1": "100%",
  }[aspectRatio];

  // Observer pour charger quand visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timer: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            // Délai pour éviter le chargement immédiat lors du scroll rapide
            timer = setTimeout(() => {
              setShouldLoad(true);
            }, 200);
          }
        });
      },
      { 
        rootMargin: "100px", // Précharge 100px avant d'être visible
        threshold: 0.1 
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [shouldLoad]);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=${modestbranding}&rel=${rel}&autoplay=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-900 ${className}`}
      style={{ paddingBottom: aspectRatioPadding }}
    >
      {isPlaying ? (
        // Iframe YouTube
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={allowFullScreen}
          loading="lazy"
        />
      ) : shouldLoad ? (
        // Thumbnail avec bouton play
        <button
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label={`Lire la vidéo : ${title}`}
        >
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          
          {/* Bouton play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        // Placeholder avant le chargement
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

