import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Le Perreux-sur-Marne",
  slug: "le-perreux-sur-marne",
  postalCode: "94170",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Le-Perreux-sur-Marne.webp",
  neighborCities: [
    { name: "Nogent", time: "5 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
    { name: "Bry-sur-Marne", time: "5 min", image: "/images/zones/val de marne/serrurier-Bry-sur-Marne.webp" },
    { name: "Fontenay", time: "8 min", image: "/images/zones/val de marne/serrurier-fontenay-sous-bois-94.webp" },
    { name: "Joinville", time: "10 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
    { name: "Champigny", time: "10 min", image: "/images/zones/val de marne/serrurier-Champigny-sur-Marne.webp" },
    { name: "Saint-Maur", time: "12 min", image: "/images/zones/val de marne/serrurier-Saint-Maur-des-Fossés.webp" },
    { name: "Vincennes", time: "12 min" },
    { name: "Neuilly-Plaisance", time: "8 min" },
  ],
};

export default function LePerreuxPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
