import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { getZoneBySlug, getNeighborZones, getRegionFromSlug, getRegionConfig } from "@/lib/cityConfig";
import { 
  zonesParisArrondissements, 
  zonesIDF, 
  zonesBordeaux, 
  zonesMontpellier 
} from "@/config/site";
import { ReactNode } from "react";

interface CityLayoutProps {
  children: ReactNode;
  params: { city: string };
}

// Toutes les zones pour generateStaticParams
const allCityZones = [
  ...zonesParisArrondissements,
  ...zonesIDF,
  ...zonesBordeaux,
  ...zonesMontpellier,
];

// Permet les routes dynamiques non listées par generateStaticParams 
// En mode dev: Next.js génère la page à la demande
// En mode production: seules les pages pré-générées sont servies
export const dynamicParams = true;

/**
 * Layout spécifique pour les pages /serrurier-[city]
 * Permet de passer le citySlug au Header et Footer pour les liens contextuels
 * Applique le thème (couleurs) de la région
 */
export default function CityLayout({ children, params }: CityLayoutProps) {
  const zone = getZoneBySlug(params.city);
  const neighborZones = zone ? getNeighborZones(params.city, 8) : undefined;
  
  // Récupérer les couleurs de la région
  const region = getRegionFromSlug(params.city);
  const regionConfig = getRegionConfig(region);
  const colors = regionConfig.colors;

  // Style inline pour appliquer les variables CSS
  const themeStyle = {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-accent': colors.accent,
    '--color-background': colors.background,
  } as React.CSSProperties;

  return (
    <div style={themeStyle}>
      <Header citySlug={params.city} />
      {children}
      <FloatingButton citySlug={params.city} />
    </div>
  );
}
