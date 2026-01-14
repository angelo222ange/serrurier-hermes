import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { getZoneBySlug, getNeighborZones, getRegionFromSlug, getRegionConfig } from "@/lib/cityConfig";
import { ReactNode } from "react";

interface CityLayoutProps {
  children: ReactNode;
  params: { city: string };
}

/**
 * Layout spécifique pour les pages /ville/[city]
 * Mappé vers /serrurier-[city]/ via rewrites
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
