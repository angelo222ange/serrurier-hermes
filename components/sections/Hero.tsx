import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { siteConfig } from "@/config/site";

interface HeroProps {
  /** Ville affichée */
  city?: string;
  /** Badge au-dessus du titre */
  badge?: string;
  /** Titre H1 */
  title?: string;
  /** Sous-titre */
  subtitle?: string;
  /** Image de fond */
  backgroundImage?: string;
  /** Afficher la note Google */
  showReviews?: boolean;
  /** Variante de style */
  variant?: "default" | "service";
  /** Prix à afficher (pour variante service) */
  priceFrom?: number;
  /** Nom du service (pour variante service) */
  serviceName?: string;
  /** Numéro de téléphone */
  phone?: string;
  /** Lien téléphone */
  phoneLink?: string;
}

export function Hero({
  city,
  badge,
  title,
  subtitle,
  backgroundImage = "/images/services/depannage-serrurier-urgence-nuit-hermes.webp",
  showReviews = true,
  variant = "default",
  priceFrom,
  serviceName,
  phone,
  phoneLink,
}: HeroProps) {
  const displayCity = city || siteConfig.city;
  const displayPhone = phone || siteConfig.phone;
  const displayPhoneLink = phoneLink || siteConfig.phoneLink;
  
  // Contenus par défaut selon la variante
  const defaultBadge = variant === "service" 
    ? `🔧 ${serviceName} 24h/24`
    : "🔐 Serrurier de confiance";
    
  const defaultTitle = variant === "service"
    ? `${serviceName} à ${displayCity}`
    : `Serrurier ${displayCity}`;
    
  const defaultSubtitle = variant === "service"
    ? `Intervention rapide en 20 minutes. Artisans qualifiés et équipés pour tous types de ${serviceName?.toLowerCase()}.`
    : `Intervention en 20 minutes, 24h/24. Ouverture de porte, changement de serrure, dépannage urgent.`;

  const displayBadge = badge || defaultBadge;
  const displayTitle = title || defaultTitle;
  const displaySubtitle = subtitle || defaultSubtitle;

  return (
    <section className="relative min-h-[85vh] sm:min-h-[75vh] flex items-center overflow-hidden">
      {/* Background Image sans filtre */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={backgroundImage}
          alt={`Serrurier professionnel à ${displayCity}`}
          fill
          className="object-cover"
          priority
          quality={85}
          imageType="hero"
          fetchPriority="high"
        />
      </div>

      {/* Content - avec microdata pour LLM/SEO */}
      <div 
        className="container relative z-10 pt-32 sm:pt-36 pb-16 sm:pb-20"
        itemScope
        itemType="https://schema.org/Service"
      >
        <meta itemProp="serviceType" content="Locksmith" />
        <meta itemProp="areaServed" content={displayCity} />
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-6 mt-4 sm:mt-6 animate-slide-in-left">
            {displayBadge}
          </span>

          {/* Titre H1 */}
          <h1 className="text-white mb-6 animate-slide-in-up" itemProp="name">
            {displayTitle}
            <span className="block text-emerald-400 mt-2">
              Intervention 24h/24 en 20 min
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl animate-slide-in-up stagger-1" itemProp="description">
            {displaySubtitle}
          </p>

          {/* Prix (si variante service) */}
          {variant === "service" && priceFrom && (
            <div className="mb-8 animate-slide-in-up stagger-2">
              <span className="inline-flex items-baseline gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <span className="text-gray-300 text-sm">À partir de</span>
                <span className="text-3xl sm:text-4xl font-bold text-white">{priceFrom}€</span>
              </span>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-slide-in-up stagger-2">
            <a 
              href={displayPhoneLink} 
              className="btn-phone text-lg group"
            >
              <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span>{displayPhone}</span>
            </a>
            <span className="text-gray-300 text-sm self-center hidden sm:block">
              Devis gratuit · Sans engagement
            </span>
          </div>

          {/* Badges de réassurance */}
          <div className="flex flex-wrap gap-3 sm:gap-4 animate-slide-in-up stagger-3">
            <div className="reassurance-badge">
              <span className="text-emerald-500 text-lg">⚡</span>
              <span>20 min</span>
            </div>
            <div className="reassurance-badge">
              <span className="text-emerald-500 text-lg">🕐</span>
              <span>24h/24</span>
            </div>
            <div className="reassurance-badge">
              <span className="text-emerald-500 text-lg">💰</span>
              <span>Devis gratuit</span>
            </div>
            <div className="reassurance-badge">
              <span className="text-emerald-500 text-lg">✓</span>
              <span>Sans dégât</span>
            </div>
          </div>

          {/* Avis Google */}
          {showReviews && siteConfig.reviews && (
            <div className="mt-8 animate-slide-in-up stagger-4">
              <a
                href={siteConfig.reviews.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
              >
                {/* Logo Google */}
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                
                {/* Étoiles */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(siteConfig.reviews!.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Note et nombre d'avis */}
                <div className="border-l border-gray-200 pl-3">
                  <p className="font-bold text-gray-900 leading-tight">
                    {siteConfig.reviews.rating}/5
                  </p>
                  <p className="text-xs text-gray-500">
                    {siteConfig.reviews.count} avis
                  </p>
                </div>
                
                <svg className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
