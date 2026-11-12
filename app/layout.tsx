import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { site, seo } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.homeTitle,
    template: `%s | ${site.name}`,
  },
  description: seo.homeDescription,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    url: "/",
    title: seo.homeTitle,
    description: seo.homeDescription,
  },
  twitter: { card: "summary_large_image" },
};

// Hidden business details that help Google show the business in local
// search and Maps results. Everything here comes from lib/content.ts.
const businessDetails = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${seo.siteUrl}/#business`,
  name: site.name,
  description: seo.homeDescription,
  url: seo.siteUrl,
  image: `${seo.siteUrl}/opengraph-image.jpg`,
  logo: `${seo.siteUrl}/icon.svg`,
  email: site.email,
  telephone: "+44" + site.phone.replace(/\s/g, "").replace(/^0/, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: seo.streetAddress,
    addressLocality: seo.addressLocality,
    postalCode: seo.postalCode,
    addressRegion: "Bristol",
    addressCountry: "GB",
  },
  areaServed: seo.areaServed.map((name) => ({ "@type": "Place", name })),
  knowsAbout: ["Stained glass front door panels", "Stained glass transom windows", "Leaded lights", "Victorian stained glass"],
  sameAs: [
    `https://instagram.com/${site.instagram.replace(/^@/, "")}`,
    ...(seo.googleBusinessUrl ? [seo.googleBusinessUrl] : []),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessDetails) }}
        />
        <div id="app">
          <Header />
          <main>{children}</main>
          <footer>
            <div className="wrap">
              <span>&copy; {new Date().getFullYear()} {site.name} &middot; {site.location}</span>
              <span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
