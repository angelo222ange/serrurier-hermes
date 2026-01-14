"use client";

import { siteConfig } from "@/config/site";
import Image from "next/image";

interface UrgenceItem {
  icon: React.ReactNode;
  title: string;
  price: number;
  description?: string;
  backgroundImage?: string;
}

interface UrgencesProps {
  title?: string;
  subtitle?: string;
  items?: UrgenceItem[];
  city?: string;
  phone?: string;
  phoneLink?: string;
}

// SVG Icons
const DoorIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M8 7v10m8-10v10M3 6h18M3 18h18M5 6v12a1 1 0 001 1h12a1 1 0 001-1V6" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const defaultItems: UrgenceItem[] = [
  {
    icon: <DoorIcon />,
    title: "Porte claquée",
    price: 69,
    description: "Sans clé à l'intérieur",
    backgroundImage: "/images/services/serrurier-porte-claquer-serrurier-hermes.webp",
  },
  {
    icon: <KeyIcon />,
    title: "Clé cassée",
    price: 69,
    description: "Extraction + ouverture",
    backgroundImage: "/images/services/Serrurie-hermes-cle-casser.webp",
  },
  {
    icon: <LockIcon />,
    title: "Serrure bloquée",
    price: 79,
    description: "Déblocage rapide",
    backgroundImage: "/images/services/porte-bloquer-serrurier.webp",
  },
  {
    icon: <AlertIcon />,
    title: "Porte forcée",
    price: 149,
    description: "Après cambriolage",
    backgroundImage: "/images/services/apres-effraction-serrurier.webp",
  },
  {
    icon: <ShieldIcon />,
    title: "Sécurisation",
    price: 89,
    description: "Protection urgente",
    backgroundImage: "/images/services/changement-de-serrure-serrurier-hermes.webp",
  },
  {
    icon: <HomeIcon />,
    title: "Porte blindée",
    price: 149,
    description: "Ouverture spécialisée",
    backgroundImage: "/images/services/serrurier-hermes-ouverture-porte-blind.webp",
  },
];

export function Urgences({
  title = "Vous êtes bloqué ? On arrive.",
  subtitle,
  items = defaultItems,
  city,
  phone,
  phoneLink,
}: UrgencesProps) {
  const displayCity = city || siteConfig.city;
  const displayPhone = phone || siteConfig.phone;
  const displayPhoneLink = phoneLink || siteConfig.phoneLink;
  const defaultSubtitle = `Intervention en 20 minutes à ${displayCity}. Nos serruriers sont disponibles 24h/24 pour résoudre votre urgence.`;

  return (
    <section className="section bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="badge-warning mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Urgence
          </span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Grid des urgences */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {items.map((item, index) => (
            <a
              key={index}
              href={displayPhoneLink}
              className="group relative rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 min-h-[200px] sm:min-h-[240px]"
            >
              {/* Background Image */}
              {item.backgroundImage && (
                <div className="absolute inset-0">
                  <Image
                    src={item.backgroundImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-300"></div>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-auto text-white group-hover:text-emerald-400 transition-colors">
                  {item.icon}
                </div>

                {/* Bottom Content */}
                <div>
                  {/* Title */}
                  <h3 className="font-bold text-white text-base sm:text-lg mb-1 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description && (
                    <p className="text-white/80 text-xs sm:text-sm mb-3">
                      {item.description}
                    </p>
                  )}

                  {/* Prix */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-white/70">Dès</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-400">
                      {item.price}€
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href={displayPhoneLink} className="btn-phone text-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
            Appeler maintenant : {displayPhone}
          </a>
          <p className="text-gray-500 text-sm mt-3">
            Devis gratuit • Intervention en 20 min
          </p>
        </div>
      </div>
    </section>
  );
}
