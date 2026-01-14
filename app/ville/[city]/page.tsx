/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PAGE VILLE PRINCIPALE (DYNAMIQUE)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Route interne: /ville/[city]/
 * Mappée vers: /serrurier-[city]/ via rewrites
 * 
 * Génère automatiquement les pages pour :
 * - Paris : 20 arrondissements
 * - IDF : 10 villes banlieue
 * - Bordeaux : ville principale + zones
 * - Montpellier : ville principale + zones
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { CityPageTemplate } from "@/components/templates";
import { 
  buildCityConfig, 
  getZoneBySlug, 
  getRegionFromSlug,
  getRegionConfig,
} from "@/lib/cityConfig";
import { 
  zonesParisArrondissements, 
  zonesIDF, 
  zonesBordeaux, 
  zonesMontpellier 
} from "@/config/site";

// Toutes les zones combinées pour la génération statique
const allCityZones = [
  ...zonesParisArrondissements,
  ...zonesIDF,
  ...zonesBordeaux,
  ...zonesMontpellier,
];

interface Props {
  params: { city: string };
}

// Permet les routes dynamiques en dev
export const dynamicParams = true;

// Générer les pages statiques pour chaque ville
export function generateStaticParams() {
  return allCityZones.map((zone) => ({
    city: zone.slug,
  }));
}

// Générer les métadonnées SEO optimisées
export function generateMetadata({ params }: Props): Metadata {
  const zone = getZoneBySlug(params.city);
  
  if (!zone) {
    return { title: "Serrurier - Page non trouvée" };
  }

  const region = getRegionFromSlug(params.city);
  const regionConfig = getRegionConfig(region);

  const title = `Serrurier ${zone.name} 24h/24 - 20 min | Hermès`;
  const description = `Serrurier ${zone.name} disponible 24h/24. Intervention 20 min. Ouverture porte dès 69€. Devis gratuit ☎️ ${regionConfig.phone}`;

  return {
    title,
    description,
    keywords: [
      `serrurier ${zone.name}`,
      `serrurier ${zone.postalCode}`,
      `dépannage serrurerie ${zone.name}`,
      `ouverture de porte ${zone.name}`,
      `changement serrure ${zone.name}`,
      "serrurier 24h/24",
      "serrurier urgence",
    ],
    openGraph: {
      title: `Serrurier ${zone.name} - Intervention 24h/24`,
      description: `Serrurier à ${zone.name}. Intervention en 20 min. Ouverture porte, changement serrure. ☎️ ${regionConfig.phone}`,
      type: "website",
      locale: "fr_FR",
      siteName: "Serrurier Hermès",
    },
    alternates: {
      canonical: `https://${siteConfig.domain}/serrurier-${zone.slug}/`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Composant de page ville principale
export default function CityPage({ params }: Props) {
  const cityConfig = buildCityConfig(params.city);

  if (!cityConfig) {
    notFound();
  }

  return (
    <CityPageTemplate 
      config={cityConfig}
      showBrands={true}
      zonesLimit={12}
    />
  );
}
