import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Créteil",
  slug: "creteil",
  postalCode: "94000",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-creteil.webp",
  neighborCities: [
    { name: "Saint-Maur", time: "8 min", image: "/images/zones/val de marne/serrurier-Saint-Maur-des-Fossés.webp" },
    { name: "Maisons-Alfort", time: "10 min", image: "/images/zones/val de marne/serrurier-Maisons-Alfort.webp" },
    { name: "Alfortville", time: "10 min", image: "/images/zones/val de marne/serrurier-Alfortville.webp" },
    { name: "Bonneuil", time: "8 min" },
    { name: "Vitry", time: "12 min", image: "/images/zones/val de marne/serrurier-Vitry-sur-Seine.webp" },
    { name: "Champigny", time: "15 min", image: "/images/zones/val de marne/serrurier-Champigny-sur-Marne.webp" },
    { name: "Joinville", time: "12 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
    { name: "Nogent", time: "15 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
  ],
};

export default function CreteilPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
