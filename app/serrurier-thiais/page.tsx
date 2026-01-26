import ValDeMarnePageTemplate from "@/components/templates/val-de-marne/ValDeMarnePageTemplate";

const cityConfig = {
  name: "Thiais",
  slug: "thiais",
  postalCode: "94320",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
  heroImage: "/images/zones/val de marne/serrurier-Thiais.webp",
  neighborCities: [
    { name: "Vitry", time: "8 min", image: "/images/zones/val de marne/serrurier-Vitry-sur-Seine.webp" },
    { name: "Créteil", time: "12 min", image: "/images/zones/val de marne/serrurier-creteil.webp" },
    { name: "Ivry", time: "12 min", image: "/images/zones/val de marne/serrurier-Ivry-sur-Seine.webp" },
    { name: "Choisy-le-Roi", time: "8 min" },
    { name: "Orly", time: "10 min" },
    { name: "Rungis", time: "8 min" },
    { name: "Chevilly-Larue", time: "5 min" },
    { name: "Villejuif", time: "10 min" },
  ],
};

export default function ThiaisPage() {
  return <ValDeMarnePageTemplate city={cityConfig} />;
}
