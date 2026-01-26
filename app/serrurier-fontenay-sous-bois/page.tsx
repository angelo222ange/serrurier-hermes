import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Fontenay-sous-Bois",
  slug: "fontenay-sous-bois",
  postalCode: "94120",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-fontenay-sous-bois-94.webp",
  neighborCities: [
    { name: "Nogent", time: "8 min", image: "/images/zones/val de marne/serrurier-nogent-sur-marne-94.webp" },
    { name: "Vincennes", time: "8 min" },
    { name: "Saint-Mandé", time: "10 min", image: "/images/zones/val de marne/serrurier-Saint-Mandé-vincennes.webp" },
    { name: "Le Perreux", time: "10 min", image: "/images/zones/val de marne/serrurier-Le-Perreux-sur-Marne.webp" },
    { name: "Joinville", time: "12 min", image: "/images/zones/val de marne/serrurier-Joinville-le-Pont.webp" },
    { name: "Bry-sur-Marne", time: "12 min", image: "/images/zones/val de marne/serrurier-Bry-sur-Marne.webp" },
    { name: "Montreuil", time: "10 min", image: "/images/zones/val de marne/serrurier-montreuil-94.webp" },
    { name: "Champigny", time: "15 min", image: "/images/zones/val de marne/serrurier-Champigny-sur-Marne.webp" },
  ],
};

export default function FontenayPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
