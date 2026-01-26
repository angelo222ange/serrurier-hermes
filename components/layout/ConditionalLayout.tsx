"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

// Routes qui ont leur propre layout complet (header/footer)
const CUSTOM_LAYOUT_ROUTES = [
  "/serrurier-toulouse",
  "/ads/",
  // Pages Val-de-Marne avec layout personnalisé
  "/serrurier-vitry-sur-seine",
  "/serrurier-creteil",
  "/serrurier-champigny-sur-marne",
  "/serrurier-saint-maur-des-fosses",
  "/serrurier-maisons-alfort",
  "/serrurier-ivry-sur-seine",
  "/serrurier-fontenay-sous-bois",
  "/serrurier-nogent-sur-marne",
  "/serrurier-alfortville",
  "/serrurier-charenton-le-pont",
  "/serrurier-saint-mande",
  "/serrurier-joinville-le-pont",
  "/serrurier-le-perreux-sur-marne",
  "/serrurier-bry-sur-marne",
  "/serrurier-thiais",
  "/serrurier-saint-maurice",
];

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Vérifier si on est sur une route avec un layout personnalisé
  const hasCustomLayout = CUSTOM_LAYOUT_ROUTES.some(route => 
    pathname.startsWith(route)
  );

  // Si route avec layout personnalisé, ne pas afficher Header/Footer globaux
  if (hasCustomLayout) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <div suppressHydrationWarning>
      <Header />
      {children}
      <Footer />
      <FloatingButton />
      <ScrollToTopButton />
    </div>
  );
}
