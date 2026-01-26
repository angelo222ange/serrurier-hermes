import type { Metadata } from "next";

// Fonction helper pour générer les métadonnées - fichier séparé pour être utilisable côté serveur
export function generateValDeMarneMetadata(cityName: string, postalCode: string, phone: string): Metadata {
  return {
    title: `Serrurier ${cityName} 24h/24 - Intervention 15 min | Dès 69€`,
    description: `Serrurier ${cityName} (${postalCode}) disponible 24h/24 et 7j/7. Intervention en 15 min. Ouverture de porte dès 69€, porte blindée dès 149€. Devis gratuit ☎️ ${phone}`,
    keywords: [
      `serrurier ${cityName.toLowerCase()}`,
      `serrurier ${cityName.toLowerCase()} 24h/24`,
      `dépannage serrurerie ${cityName.toLowerCase()}`,
      `ouverture de porte ${cityName.toLowerCase()}`,
      `changement serrure ${cityName.toLowerCase()}`,
      `serrurier urgence ${cityName.toLowerCase()}`,
      `serrurier ${postalCode}`,
      `serrurier val de marne`,
      `serrurier 94`,
    ],
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `Serrurier ${cityName} - Intervention Urgente 24h/24`,
      description: `Serrurier à ${cityName} (${postalCode}). Intervention en 15 min. Ouverture porte dès 69€. Devis gratuit. ☎️ ${phone}`,
      type: "website",
      locale: "fr_FR",
      siteName: "Serrurier Hermès",
    },
  };
}
