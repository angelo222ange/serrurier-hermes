import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Maisons-Alfort",
  slug: "maisons-alfort",
  postalCode: "94700",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Maisons-Alfort.webp",
  neighborCities: [
    { name: "Alfortville", time: "5 min", image: "/images/zones/val de marne/serrurier-Alfortville.webp" },
    { name: "Créteil", time: "8 min", image: "/images/zones/val de marne/serrurier-creteil.webp" },
    { name: "Charenton", time: "8 min", image: "/images/zones/val de marne/serrurier-charenton-le-pont-94.webp" },
    { name: "Saint-Maurice", time: "8 min", image: "/images/zones/val de marne/serrurier-saint-maurice-94.webp" },
    { name: "Joinville", time: "10 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
    { name: "Saint-Maur", time: "12 min", image: "/images/zones/val de marne/serrurier-Saint-Maur-des-Fossés.webp" },
    { name: "Ivry", time: "12 min", image: "/images/zones/val de marne/serrurier-Ivry-sur-Seine.webp" },
    { name: "Vitry", time: "15 min", image: "/images/zones/val de marne/serrurier-Vitry-sur-Seine.webp" },
  ],
};

export default function MaisonsAlfortPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
