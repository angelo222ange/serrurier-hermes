import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Vitry-sur-Seine",
  slug: "vitry-sur-seine",
  postalCode: "94400",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Vitry-sur-Seine.webp",
  neighborCities: [
    { name: "Ivry-sur-Seine", time: "8 min", image: "/images/zones/val de marne/serrurier-Ivry-sur-Seine.webp" },
    { name: "Thiais", time: "10 min", image: "/images/zones/val de marne/serrurier-Thiais.webp" },
    { name: "Alfortville", time: "12 min", image: "/images/zones/val de marne/serrurier-Alfortville.webp" },
    { name: "Créteil", time: "15 min", image: "/images/zones/val de marne/serrurier-creteil.webp" },
    { name: "Maisons-Alfort", time: "12 min", image: "/images/zones/val de marne/serrurier-Maisons-Alfort.webp" },
    { name: "Charenton", time: "15 min", image: "/images/zones/val de marne/serrurier-charenton-le-pont-94.webp" },
    { name: "Saint-Maurice", time: "14 min", image: "/images/zones/val de marne/serrurier-saint-maurice-94.webp" },
    { name: "Champigny", time: "18 min", image: "/images/zones/val de marne/serrurier-Champigny-sur-Marne.webp" },
  ],
};

export default function VitryPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
