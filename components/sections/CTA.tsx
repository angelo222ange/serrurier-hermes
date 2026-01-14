"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

interface CTAProps {
  title?: string;
  subtitle?: string;
  variant?: "primary" | "dark" | "gradient";
  city?: string;
  phone?: string;
  phoneLink?: string;
}

export function CTA({
  title,
  subtitle,
  variant = "gradient",
  city,
  phone,
  phoneLink,
}: CTAProps) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isTarifsPage = pathname === '/tarifs';
  const isGenericServicePage = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.length === 1 && ['depannage', 'installation', 'changement-serrure', 'ouverture-de-porte', 'blindage-porte', 'remplacement-cylindre'].includes(segments[0]);
  };
  const isGenericPage = isHomepage || isTarifsPage || isGenericServicePage();
  
  const displayCity = isGenericPage ? null : (city || siteConfig.city);
  const displayPhone = phone || siteConfig.phone;
  const displayPhoneLink = phoneLink || siteConfig.phoneLink;
  const defaultTitle = displayCity ? `Besoin d'un serrurier à ${displayCity} ?` : "Besoin d'un serrurier ?";
  const defaultSubtitle = `Notre équipe intervient 24h/24 et 7j/7. Appelez-nous pour une intervention rapide ou un devis gratuit.`;

  const bgClasses = {
    primary: "bg-emerald-600",
    dark: "bg-gray-900",
    gradient: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
  };

  return (
    <section className={`py-16 sm:py-20 md:py-24 ${bgClasses[variant]} text-white relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold mb-6">
            🔐 Intervention 24h/24
          </span>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {title || defaultTitle}
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            {subtitle || defaultSubtitle}
          </p>
          
          {/* Phone number - Large */}
          <div className="mb-8">
            <a 
              href={displayPhoneLink}
              className="inline-flex items-center gap-3 text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              {displayPhone}
            </a>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={displayPhoneLink} className="btn-phone text-lg px-8 py-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              Appeler maintenant
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 text-base font-bold text-white hover:bg-white hover:text-gray-900 transition-all"
            >
              Demander un devis gratuit
            </a>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-10 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Disponible 24h/24
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              7j/7
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Intervention en 20 min
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Devis gratuit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
