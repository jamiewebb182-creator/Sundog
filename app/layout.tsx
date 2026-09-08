import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: site.name,
  description: site.tagline,
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
