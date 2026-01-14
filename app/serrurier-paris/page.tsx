import { Hero } from "@/components/sections/Hero";
import { Urgences } from "@/components/sections/Urgences";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Zones } from "@/components/sections/Zones";
import { Tarifs } from "@/components/sections/Tarifs";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { Brands } from "@/components/sections/Brands";
import { CTA } from "@/components/sections/CTA";
import { siteConfig } from "@/config/site";
import { defaultFAQ, getReviewsForZone } from "@/lib/cityConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Serrurier Paris 24h/24 - Intervention 20 min | ${siteConfig.name}`,
  description: `Serrurier Paris disponible 24h/24. Intervention en 20 min. Ouverture porte dès 69€. Devis gratuit ☎️ ${siteConfig.phone}`,
  keywords: [
    "serrurier paris",
    "serrurier paris 24h/24",
    "dépannage serrurerie paris",
    "ouverture de porte paris",
    "changement serrure paris",
    "serrurier urgence paris",
  ],
  openGraph: {
    title: `Serrurier Paris - Intervention 24h/24`,
    description: `Serrurier à Paris. Intervention en 20 min. Ouverture porte, changement serrure. ☎️ ${siteConfig.phone}`,
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Serrurier Paris 24h/24`,
    description: `Intervention 20 min à Paris. Ouverture porte dès 69€. Devis gratuit.`,
  },
  alternates: {
    canonical: `https://${siteConfig.domain}/serrurier-paris/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SerrurierParisPage() {
  // Préparer les FAQ avec le nom de la ville
  const parisFAQ = defaultFAQ.map(item => ({
    question: item.question.replace(/\{city\}/g, "Paris"),
    answer: item.answer.replace(/\{city\}/g, "Paris"),
  }));

  // Récupérer les avis pour Paris
  const parisReviews = getReviewsForZone("paris", "Paris");

  return (
    <main>
      {/* Hero Section */}
      <Hero 
        city="Paris"
        phone={siteConfig.phone}
        phoneLink={siteConfig.phoneLink}
      />

      {/* Urgences / Points de douleur */}
      <Urgences 
        city="Paris"
        phone={siteConfig.phone}
        phoneLink={siteConfig.phoneLink}
      />

      {/* Nos Services */}
      <Services 
        city="Paris"
        phone={siteConfig.phone}
        phoneLink={siteConfig.phoneLink}
      />

      {/* Pourquoi nous choisir */}
      <WhyUs 
        city="Paris"
      />

      {/* Comment ça marche */}
      <HowItWorks 
        phone={siteConfig.phone}
        phoneLink={siteConfig.phoneLink}
      />

      {/* Tarifs */}
      <Tarifs 
        city="Paris"
        phone={siteConfig.phone}
        phoneLink={siteConfig.phoneLink}
      />

      {/* Zones d'intervention */}
      <Zones 
        city="Paris"
        phone={siteConfig.phone}
        phoneLink={siteConfig.phoneLink}
        limit={20} 
      />

      {/* Avis clients */}
      <Reviews 
        city="Paris"
        reviews={parisReviews}
      />

      {/* FAQ */}
      <FAQ 
        title={`Questions Fréquentes - Serrurier Paris`}
        city="Paris"
        items={parisFAQ}
        phone={siteConfig.phone}
        phoneLink={siteConfig.phoneLink}
      />

      {/* Marques partenaires */}
      <Brands />

      {/* CTA Final */}
      <CTA 
        city="Paris"
        phone={siteConfig.phone}
        phoneLink={siteConfig.phoneLink}
      />
    </main>
  );
}
