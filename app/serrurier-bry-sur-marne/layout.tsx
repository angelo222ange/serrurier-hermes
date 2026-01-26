import { ValDeMarneLayout } from "@/components/templates/val-de-marne/ValDeMarneLayout";
import { generateValDeMarneMetadata } from "@/components/templates/val-de-marne/ValDeMarneMetadata";
import type { Metadata } from "next";

const cityConfig = {
  name: "Bry-sur-Marne",
  postalCode: "94360",
  phone: "01 85 09 97 74",
  phoneLink: "tel:+33185099774",
};

export const metadata: Metadata = generateValDeMarneMetadata(
  cityConfig.name,
  cityConfig.postalCode,
  cityConfig.phone
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ValDeMarneLayout
      cityName={cityConfig.name}
      phone={cityConfig.phone}
      phoneLink={cityConfig.phoneLink}
    >
      {children}
    </ValDeMarneLayout>
  );
}
