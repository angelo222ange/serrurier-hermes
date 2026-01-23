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
