import { siteConfig } from "@/config/site";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface Advantage {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

interface WhyUsProps {
  title?: string;
  subtitle?: string;
  advantages?: Advantage[];
  city?: string;
}

// SVG Icons
const InterventionRapideIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const DisponibiliteIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PrixTransparentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const QualiteCertifieIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GarantieIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LocalIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Helper function to get the local image based on city
function getLocalImage(city?: string): string {
  if (!city) {
    return "/images/serrurier-local-paris-serrurier-hermes.webp";
  }
  
  const cityLower = city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  
  // Villes de la région Bordeaux (Bordeaux, Pessac, Talence, Mérignac, etc.)
  const bordeauxCities = [
    "bordeaux", "pessac", "talence", "merignac", "begles", 
    "villenave-d'ornon", "villenave d'ornon", "villenave dornon", "le bouscat", "bouscat",
    "gradignan", "cenon", "lormont", "floirac", "blanquefort"
  ];
  
  // Villes de la région Montpellier
  const montpellierCities = [
    "montpellier", "lattes", "castelnau-le-lez", "castelnau le lez", "castelnau lelez",
    "juvignac", "le cres", "cres", "perols", "mauguio", "grabels",
    "saint-jean-de-vedas", "saint jean de vedas", "saint jean devedas",
    "villeneuve-les-maguelone", "villeneuve les maguelone", "villeneuve lesmaguelone"
  ];
  
  // Vérifier si la ville fait partie de la région Bordeaux
  // Vérification avec match exact ou contient le nom de la ville
  if (bordeauxCities.some(bCity => {
    const normalized = bCity.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return cityLower === normalized || cityLower.includes(normalized);
  })) {
    return "/images/serrurier-local-bordeaux-serrurier-hermes.webp";
  }
  
  // Vérifier si la ville fait partie de la région Montpellier
  if (montpellierCities.some(mCity => {
    const normalized = mCity.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return cityLower === normalized || cityLower.includes(normalized);
  })) {
    return "/images/serrurier-local-montpellier-serrurier-hermes.webp";
  }
  
  // Default to Paris
  return "/images/serrurier-local-paris-serrurier-hermes.webp";
}

function getDefaultAdvantages(city?: string): Advantage[] {
  return [
    {
      icon: <InterventionRapideIcon />,
      title: "Intervention Rapide",
      description: "Arrivée en 20 minutes maximum sur votre lieu d'intervention.",
      image: "/images/intervention-rapide-serrurier-hermes.webp",
    },
    {
      icon: <DisponibiliteIcon />,
      title: "24h/24, 7j/7",
      description: "Disponible tous les jours, même les week-ends et jours fériés.",
      image: "/images/intervention-2424-serrurier-hermes.webp",
    },
    {
      icon: <PrixTransparentIcon />,
      title: "Prix Transparent",
      description: "Devis gratuit et prix fixé avant intervention. Aucune surprise.",
      image: "/images/prix-transparent-serrurier-hermes.webp",
    },
    {
      icon: <QualiteCertifieIcon />,
      title: "Qualité Certifiée",
      description: "Artisans qualifiés, équipés et assurés pour tous types d'interventions.",
      image: "/images/qualite-certifie-serrurier-hermes.webp",
    },
    {
      icon: <GarantieIcon />,
      title: "Garantie Satisfaction",
      description: "Travail garanti. Nous intervenons à nouveau si besoin.",
      image: "/images/garantie-satisfaction-serrurier-hermes.webp",
    },
    {
      icon: <LocalIcon />,
      title: "Serrurier Local",
      description: "Artisans de votre région pour une intervention au plus vite.",
      image: getLocalImage(city),
    },
  ];
}

export function WhyUs({
  title,
  subtitle,
  advantages,
  city,
}: WhyUsProps) {
  const displayCity = city || siteConfig.city;
  const displayTitle = title || `Pourquoi choisir Serrurier Hermès ${displayCity} ?`;
  const displaySubtitle = subtitle || `Nous nous engageons à vous offrir un service de qualité, rapide et transparent.`;
  const displayAdvantages = advantages || getDefaultAdvantages(city);

  return (
    <section className="section bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="badge-success mb-4">Nos engagements</span>
          <h2 className="section-title">{displayTitle}</h2>
          <p className="section-subtitle mx-auto">{displaySubtitle}</p>
        </div>

        {/* Grid des avantages - avec microdata pour LLM/SEO */}
        <div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <meta itemProp="name" content={`Avantages Serrurier ${displayCity}`} />
          {displayAdvantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group relative overflow-hidden"
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={String(index + 1)} />
              
              {/* Image en haut à droite */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 opacity-40 group-hover:opacity-50 transition-opacity overflow-hidden rounded-tl-2xl">
                <OptimizedImage
                  src={advantage.image}
                  alt={advantage.title}
                  fill
                  className="object-cover"
                  imageType="thumbnail"
                  loading="lazy"
                />
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform relative z-10">
                {advantage.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors relative z-10" itemProp="name">
                {advantage.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed relative z-10" itemProp="description">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-10 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-1">10+</p>
              <p className="text-gray-400 text-sm">Années d&apos;expérience</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-1">10K+</p>
              <p className="text-gray-400 text-sm">Interventions</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-1">20min</p>
              <p className="text-gray-400 text-sm">Délai moyen</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-1">{siteConfig.reviews?.rating || "4.9"}/5</p>
              <p className="text-gray-400 text-sm">{siteConfig.reviews?.count || 127} avis Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
