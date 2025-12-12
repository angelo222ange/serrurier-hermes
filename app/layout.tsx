import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButton } from "@/components/ui/FloatingButton";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `${siteConfig.name} - Serrurier ${siteConfig.city} | Dépannage 24h/24`,
    template: `%s | ${siteConfig.name} - Serrurier ${siteConfig.city}`,
  },
  description: `Serrurier professionnel à ${siteConfig.city}. Intervention rapide 24h/24 pour dépannage, ouverture de porte, changement de serrure. ☎️ ${siteConfig.phone}`,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.fullName,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Script pour charger le CSS de manière asynchrone et non-bloquante */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function makeCSSAsync(link) {
                  if (link.getAttribute('data-async') === 'true') return;
                  link.setAttribute('data-async', 'true');
                  if (link.sheet) return;
                  link.media = 'print';
                  link.onload = function() {
                    this.media = 'all';
                  };
                  if ('onload' in link === false) {
                    setTimeout(function() {
                      link.media = 'all';
                    }, 0);
                  }
                }
                
                var cssLinks = document.querySelectorAll('link[rel="stylesheet"]:not([data-async])');
                for (var i = 0; i < cssLinks.length; i++) {
                  makeCSSAsync(cssLinks[i]);
                }
                
                var observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                      if (node.nodeName === 'LINK' && node.rel === 'stylesheet') {
                        makeCSSAsync(node);
                      }
                    });
                  });
                });
                
                if (document.head) {
                  observer.observe(document.head, {
                    childList: true,
                    subtree: true
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <FloatingButton />
      </body>
    </html>
  );
}
