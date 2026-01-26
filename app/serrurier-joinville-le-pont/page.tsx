import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Joinville-le-Pont",
  slug: "joinville-le-pont",
  postalCode: "94340",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp",
  neighborCities: [
    { name: "Saint-Maur", time: "5 min", image: "/images/zones/val de marne/serrurier-Saint-Maur-des-Fossés.webp" },
    { name: "Nogent", time: "8 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
    { name: "Champigny", time: "8 min", image: "/images/zones/val de marne/serrurier-Champigny-sur-Marne.webp" },
    { name: "Saint-Maurice", time: "8 min", image: "/images/zones/val de marne/serrurier-saint-maurice-94.webp" },
    { name: "Maisons-Alfort", time: "10 min", image: "/images/zones/val de marne/serrurier-Maisons-Alfort.webp" },
    { name: "Charenton", time: "10 min", image: "/images/zones/val de marne/serrurier-charenton-le-pont-94.webp" },
    { name: "Créteil", time: "12 min", image: "/images/zones/val de marne/serrurier-creteil.webp" },
    { name: "Le Perreux", time: "10 min", image: "/images/zones/val de marne/serrurier-Le-Perreux-sur-Marne.webp" },
  ],
};

export default function JoinvillePage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
