import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Charenton-le-Pont",
  slug: "charenton-le-pont",
  postalCode: "94220",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-charenton-le-pont-94.webp",
  neighborCities: [
    { name: "Saint-Maurice", time: "5 min", image: "/images/zones/val de marne/serrurier-saint-maurice-94.webp" },
    { name: "Maisons-Alfort", time: "8 min", image: "/images/zones/val de marne/serrurier-Maisons-Alfort.webp" },
    { name: "Alfortville", time: "8 min", image: "/images/zones/val de marne/serrurier-Alfortville.webp" },
    { name: "Saint-Mandé", time: "8 min", image: "/images/zones/val de marne/serrurier-Saint-Mandé-vincennes.webp" },
    { name: "Ivry", time: "10 min", image: "/images/zones/val de marne/serrurier-Ivry-sur-Seine.webp" },
    { name: "Paris 12ème", time: "8 min", image: "/images/zones/val de marne/serrurier-paris-12-75012.webp" },
    { name: "Vincennes", time: "10 min" },
    { name: "Joinville", time: "10 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
  ],
};

export default function CharentonPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
