import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Champigny-sur-Marne",
  slug: "champigny-sur-marne",
  postalCode: "94500",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Champigny-sur-Marne.webp",
  neighborCities: [
    { name: "Saint-Maur", time: "8 min", image: "/images/zones/val de marne/serrurier-Saint-Maur-des-Fossés.webp" },
    { name: "Joinville", time: "8 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
    { name: "Le Perreux", time: "10 min", image: "/images/zones/val de marne/serrurier-Le-Perreux-sur-Marne.webp" },
    { name: "Bry-sur-Marne", time: "10 min", image: "/images/zones/val de marne/serrurier-Bry-sur-Marne.webp" },
    { name: "Nogent", time: "12 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
    { name: "Créteil", time: "15 min", image: "/images/zones/val de marne/serrurier-creteil.webp" },
    { name: "Fontenay", time: "12 min", image: "/images/zones/val de marne/serrurier-fontenay-sous-bois-94.webp" },
    { name: "Vincennes", time: "15 min" },
  ],
};

export default function ChampignyPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
