/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PAGE VILLE PRINCIPALE (DYNAMIQUE)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Génère automatiquement les pages pour :
 * - Paris : 20 arrondissements (/serrurier-paris-1/ à /serrurier-paris-20/)
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

// Permet les routes dynamiques non listées par generateStaticParams 
// En mode dev: Next.js génère la page à la demande
// En mode production: seules les pages pré-générées sont servies
export const dynamicParams = true;

// Générer les pages statiques pour chaque ville
export async function generateStaticParams() {
  const params = allCityZones.map((zone) => ({
    city: zone.slug,
  }));
  
  console.log(`🏗️  Génération des pages pour ${params.length} villes`);
  console.log(`📄 Villes: ${params.map(p => p.city).join(', ')}`);
  return params;
}

// Générer les métadonnées SEO optimisées
// Format Title : < 60 caractères | Mot-clé + Ville + USP
// Format Description : < 155 caractères | CTA inclus
export function generateMetadata({ params }: Props): Metadata {
  const zone = getZoneBySlug(params.city);
  
  if (!zone) {
    return { title: "Serrurier - Page non trouvée" };
  }

  const region = getRegionFromSlug(params.city);
  const regionConfig = getRegionConfig(region);

  // Meta Title optimisé < 60 caractères
  // "Serrurier Paris 1er 24h/24 - 20 min | Hermès" = ~45 caractères
  const title = `Serrurier ${zone.name} 24h/24 - 20 min | Hermès`;
  
  // Meta Description optimisée < 155 caractères avec CTA
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
    twitter: {
      card: "summary_large_image",
      title: `Serrurier ${zone.name} 24h/24`,
      description: `Intervention 20 min à ${zone.name}. Ouverture porte dès 69€. Devis gratuit.`,
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
  // Récupérer la configuration complète de la ville
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
