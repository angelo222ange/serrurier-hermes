import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Alfortville",
  slug: "alfortville",
  postalCode: "94140",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Alfortville.webp",
  neighborCities: [
    { name: "Maisons-Alfort", time: "5 min", image: "/images/zones/val de marne/serrurier-Maisons-Alfort.webp" },
    { name: "Charenton", time: "8 min", image: "/images/zones/val de marne/serrurier-charenton-le-pont-94.webp" },
    { name: "Ivry", time: "10 min", image: "/images/zones/val de marne/serrurier-Ivry-sur-Seine.webp" },
    { name: "Vitry", time: "12 min", image: "/images/zones/val de marne/serrurier-Vitry-sur-Seine.webp" },
    { name: "Créteil", time: "10 min", image: "/images/zones/val de marne/serrurier-creteil.webp" },
    { name: "Saint-Maurice", time: "10 min", image: "/images/zones/val de marne/serrurier-saint-maurice-94.webp" },
    { name: "Paris 12ème", time: "12 min", image: "/images/zones/val de marne/serrurier-paris-12-75012.webp" },
    { name: "Joinville", time: "12 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
  ],
};

export default function AlfortvillePage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
