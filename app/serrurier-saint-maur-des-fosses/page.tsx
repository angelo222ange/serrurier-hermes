import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Saint-Maur-des-Fossés",
  slug: "saint-maur-des-fosses",
  postalCode: "94100",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Saint-Maur-des-Fossés.webp",
  neighborCities: [
    { name: "Créteil", time: "8 min", image: "/images/zones/val de marne/serrurier-creteil.webp" },
    { name: "Joinville", time: "8 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
    { name: "Champigny", time: "10 min", image: "/images/zones/val de marne/serrurier-Champigny-sur-Marne.webp" },
    { name: "Nogent", time: "10 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
    { name: "Le Perreux", time: "12 min", image: "/images/zones/val de marne/serrurier-Le-Perreux-sur-Marne.webp" },
    { name: "Maisons-Alfort", time: "12 min", image: "/images/zones/val de marne/serrurier-Maisons-Alfort.webp" },
    { name: "Alfortville", time: "15 min", image: "/images/zones/val de marne/serrurier-Alfortville.webp" },
    { name: "Bry-sur-Marne", time: "12 min", image: "/images/zones/val de marne/serrurier-Bry-sur-Marne.webp" },
  ],
};

export default function SaintMaurPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
