"use client";

import { useState, useEffect } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculer si on est proche du bas de la page (dans les 200px)
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Afficher le bouton si on est dans les 200px du bas OU si on a scrollé plus de 500px
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 200;
      const hasScrolledEnough = scrollTop > 500;
      
      setIsVisible(isNearBottom || hasScrolledEnough);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Vérifier au chargement initial
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-20 left-4 sm:bottom-24 sm:left-6 z-40
        w-12 h-12 sm:w-14 sm:h-14
        flex items-center justify-center
        bg-gray-800 text-white
        rounded-full shadow-lg shadow-gray-900/30
        hover:bg-gray-900 hover:scale-110
        active:scale-95
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}
      aria-label="Remonter en haut de la page"
    >
      {/* Flèche vers le haut */}
      <svg 
        className="w-6 h-6 sm:w-7 sm:h-7" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2.5} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
}
