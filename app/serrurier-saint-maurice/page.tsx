import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Saint-Maurice",
  slug: "saint-maurice",
  postalCode: "94410",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-saint-maurice-94.webp",
  neighborCities: [
    { name: "Charenton", time: "5 min", image: "/images/zones/val de marne/serrurier-charenton-le-pont-94.webp" },
    { name: "Joinville", time: "8 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
    { name: "Maisons-Alfort", time: "8 min", image: "/images/zones/val de marne/serrurier-Maisons-Alfort.webp" },
    { name: "Saint-Mandé", time: "8 min", image: "/images/zones/val de marne/serrurier-Saint-Mandé-vincennes.webp" },
    { name: "Alfortville", time: "10 min", image: "/images/zones/val de marne/serrurier-Alfortville.webp" },
    { name: "Vincennes", time: "8 min" },
    { name: "Nogent", time: "10 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
    { name: "Paris 12ème", time: "10 min", image: "/images/zones/val de marne/serrurier-paris-12-75012.webp" },
  ],
};

export default function SaintMauricePage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
