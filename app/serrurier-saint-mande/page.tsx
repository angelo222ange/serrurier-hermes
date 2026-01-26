import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Saint-Mandé",
  slug: "saint-mande",
  postalCode: "94160",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Saint-Mandé-vincennes.webp",
  neighborCities: [
    { name: "Vincennes", time: "5 min" },
    { name: "Charenton", time: "8 min", image: "/images/zones/val de marne/serrurier-charenton-le-pont-94.webp" },
    { name: "Saint-Maurice", time: "8 min", image: "/images/zones/val de marne/serrurier-saint-maurice-94.webp" },
    { name: "Fontenay", time: "10 min", image: "/images/zones/val de marne/serrurier-fontenay-sous-bois-94.webp" },
    { name: "Nogent", time: "12 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
    { name: "Paris 12ème", time: "10 min", image: "/images/zones/val de marne/serrurier-paris-12-75012.webp" },
    { name: "Joinville", time: "12 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
    { name: "Montreuil", time: "10 min", image: "/images/zones/val de marne/serrurier-montreuil-94.webp" },
  ],
};

export default function SaintMandePage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
