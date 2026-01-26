import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Ivry-sur-Seine",
  slug: "ivry-sur-seine",
  postalCode: "94200",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Ivry-sur-Seine.webp",
  neighborCities: [
    { name: "Vitry", time: "8 min", image: "/images/zones/val de marne/serrurier-Vitry-sur-Seine.webp" },
    { name: "Charenton", time: "10 min", image: "/images/zones/val de marne/serrurier-charenton-le-pont-94.webp" },
    { name: "Alfortville", time: "10 min", image: "/images/zones/val de marne/serrurier-Alfortville.webp" },
    { name: "Maisons-Alfort", time: "12 min", image: "/images/zones/val de marne/serrurier-Maisons-Alfort.webp" },
    { name: "Créteil", time: "15 min", image: "/images/zones/val de marne/serrurier-creteil.webp" },
    { name: "Paris 13ème", time: "10 min", image: "/images/zones/val de marne/serrurier-paris-12-75012.webp" },
    { name: "Villejuif", time: "12 min" },
    { name: "Thiais", time: "15 min", image: "/images/zones/val de marne/serrurier-Thiais.webp" },
  ],
};

export default function IvryPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
