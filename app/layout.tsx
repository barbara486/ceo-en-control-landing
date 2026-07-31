import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { EVENTO_ACTUAL } from "@/lib/eventos";
import { SITE_URL } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CEO en Control · Growth Institute",
  description:
    "Bootcamp virtual en vivo de Growth Institute. En 2 días conocé los 4 sistemas que los CEOs profesionales usan para tener su empresa en control: ImpactX, Scaling Up, Topgrading e Hyper Sales Growth. 29–30 de agosto 2026.",
  icons: {
    icon: [
      { url: "/brand/icono-gi-blanco.png", media: "(prefers-color-scheme: dark)" },
      { url: "/brand/icono-gi-azul.png", media: "(prefers-color-scheme: light)" },
    ],
  },
  openGraph: {
    title: "CEO en Control · Growth Institute",
    description: "Deja de improvisar. En 2 días vas a conocer los 4 sistemas que los CEOs profesionales usan para tener su empresa en control.",
    type: "website",
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: EVENTO_ACTUAL.nombre,
  startDate: EVENTO_ACTUAL.fechaInicioISO,
  endDate: EVENTO_ACTUAL.fechaFinISO,
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: { "@type": "VirtualLocation", url: SITE_URL },
  description:
    "En 2 días vas a conocer los 4 sistemas que los CEOs profesionales usan para tener su empresa en control: ImpactX, Scaling Up, Topgrading e Hyper Sales Growth.",
  organizer: { "@type": "Organization", name: "Growth Institute", url: "https://growthinstitute.com" },
  offers: [
    { "@type": "Offer", name: "General", priceCurrency: "USD", url: `${SITE_URL}/#comprar`, availability: "https://schema.org/InStock" },
    { "@type": "Offer", name: "PRO", priceCurrency: "USD", url: `${SITE_URL}/#comprar`, availability: "https://schema.org/InStock" },
  ],
  performer: { "@type": "Person", name: "Daniel Marcos" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Growth Institute",
  url: "https://growthinstitute.com",
  logo: `${SITE_URL}/brand/logo-gi-azul.png`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={jakarta.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
