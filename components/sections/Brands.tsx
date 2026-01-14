import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface Brand {
  name: string;
  logo: string;
}

interface BrandsProps {
  title?: string;
  subtitle?: string;
  brands?: Brand[];
}

const defaultBrands: Brand[] = [
  { name: "Vachette", logo: "/images/logos/brands/serrurier-vachette.webp" },
  { name: "Bricard", logo: "/images/logos/brands/serrurier-bricard-serrure.webp" },
  { name: "Picard", logo: "/images/logos/brands/serrurier-picard-serrure.webp" },
  { name: "Fichet", logo: "/images/logos/brands/serrurier-heracles-serrure.webp" },
  { name: "Yale", logo: "/images/logos/brands/serrurier-yale-serrure.webp" },
  { name: "Mul-T-Lock", logo: "/images/logos/brands/serrurier-mult-t-lock-serrure.webp" },
  { name: "Abus", logo: "/images/logos/brands/serrurier-abus-marque.webp" },
  { name: "JPM", logo: "/images/logos/brands/serrurier-jpm.webp" },
  { name: "Pollux", logo: "/images/logos/brands/serrurier-pollux.webp" },
  { name: "Motura", logo: "/images/logos/brands/serrurier-motura-serrure.webp" },
];

export function Brands({
  title = "Nos marques partenaires",
  subtitle = "Nous travaillons avec les meilleures marques de serrurerie",
  brands = defaultBrands,
}: BrandsProps) {
  // Dupliquer les marques pour l'animation infinie
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-12 sm:py-16 bg-gray-50 overflow-hidden">
      <div className="container mb-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
        
        {/* Scrolling container */}
        <div className="flex animate-marquee">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 mx-4 sm:mx-8"
            >
              <div className="w-24 h-16 sm:w-32 sm:h-20 relative flex items-center justify-center bg-white rounded-lg p-3 shadow-sm">
                <OptimizedImage
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  fill
                  className="object-contain p-2 grayscale hover:grayscale-0 transition-all duration-300"
                  imageType="logo"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className="container mt-8 sm:mt-12">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Marques certifiées
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Pièces d&apos;origine
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Garantie fabricant
          </span>
        </div>
      </div>
    </section>
  );
}
