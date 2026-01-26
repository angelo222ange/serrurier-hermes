import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Montreuil",
  slug: "montreuil",
  postalCode: "93100",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-montreuil-94.webp",
  neighborCities: [
    { name: "Vincennes", time: "5 min" },
    { name: "Fontenay", time: "8 min", image: "/images/zones/val de marne/serrurier-fontenay-sous-bois-94.webp" },
    { name: "Saint-Mandé", time: "8 min", image: "/images/zones/val de marne/serrurier-Saint-Mandé-vincennes.webp" },
    { name: "Nogent", time: "12 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
    { name: "Le Perreux", time: "12 min", image: "/images/zones/val de marne/serrurier-Le-Perreux-sur-Marne.webp" },
    { name: "Bagnolet", time: "5 min", image: "/images/zones/val de marne/serrurier-bagnolet-94.webp" },
    { name: "Paris 20ème", time: "8 min", image: "/images/zones/val de marne/serrurier-paris-20-75020.webp" },
    { name: "Romainville", time: "8 min" },
  ],
};

export default function MontreuilPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
