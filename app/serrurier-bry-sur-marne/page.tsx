import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Bry-sur-Marne",
  slug: "bry-sur-marne",
  postalCode: "94360",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Bry-sur-Marne.webp",
  neighborCities: [
    { name: "Le Perreux", time: "5 min", image: "/images/zones/val de marne/serrurier-Le-Perreux-sur-Marne.webp" },
    { name: "Nogent", time: "8 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
    { name: "Champigny", time: "8 min", image: "/images/zones/val de marne/serrurier-Champigny-sur-Marne.webp" },
    { name: "Fontenay", time: "10 min", image: "/images/zones/val de marne/serrurier-fontenay-sous-bois-94.webp" },
    { name: "Joinville", time: "12 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
    { name: "Saint-Maur", time: "12 min", image: "/images/zones/val de marne/serrurier-Saint-Maur-des-Fossés.webp" },
    { name: "Neuilly-sur-Marne", time: "10 min" },
    { name: "Noisy-le-Grand", time: "12 min" },
  ],
};

export default function BryPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
