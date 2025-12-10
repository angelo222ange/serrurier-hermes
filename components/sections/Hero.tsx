import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPageContent } from "@/lib/content";
import homeContent from "@/content/pages/home.json";

// Charger le contenu avec variables remplacées
const content = getPageContent(homeContent);

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  showReviews?: boolean;
}

export function Hero({
  badge,
  title,
  subtitle,
  showReviews = true,
}: HeroProps) {
  // Utiliser les props ou les valeurs du fichier de contenu
  const displayBadge = badge || content.hero.badge;
  const displayTitle = title || content.hero.title;
  const displaySubtitle = subtitle || content.hero.subtitle;

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <Image
          src="/images/hero-pattern.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
              {displayBadge}
            </span>

            {/* Titre */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {displayTitle}
            </h1>

            {/* Sous-titre */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              {displaySubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a href={siteConfig.phoneLink} className="btn-phone text-lg">
                📞 {siteConfig.phone}
              </a>
              <a href="/contact" className="btn-secondary">
                Demander un devis
              </a>
            </div>

            {/* Badges de confiance - depuis le fichier de contenu */}
            <div className="flex flex-wrap gap-4 items-center">
              {content.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{badge.title}</p>
                    <p className="text-xs text-gray-500">{badge.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Avis Google */}
            {showReviews && siteConfig.reviews && (
              <a
                href={siteConfig.reviews.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-6 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(siteConfig.reviews.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {siteConfig.reviews.rating}/5
                  </p>
                  <p className="text-xs text-gray-500">
                    {siteConfig.reviews.count} avis Google
                  </p>
                </div>
              </a>
            )}
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-primary-600 rounded-3xl transform rotate-3" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-serrurier.webp"
                  alt={`Serrurier professionnel à ${siteConfig.city}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Badge flottant */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Disponible</p>
                  <p className="text-sm text-gray-500">24h/24 - 7j/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
