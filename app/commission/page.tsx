import Image from "next/image";
import { site, seo, steps, portfolio } from "@/lib/content";
import { CommissionForm } from "@/components/CommissionForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: seo.commissionTitle,
  description: seo.commissionDescription,
  alternates: { canonical: "/commission" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    images: "/opengraph-image.jpg",
    title: seo.commissionTitle,
    description: seo.commissionDescription,
    url: "/commission",
  },
};

export default function CommissionPage() {
  return (
    <div className="view wrap">
      <section className="block">
        <div className="order-intro">
          <div className="section-head" style={{ maxWidth: 640 }}>
            <h1>Start a commission</h1>
            <p>{site.orderIntro}</p>
          </div>
          <div className="steps">
            {steps.map((s, i) => (
              <div className="step" key={i}>
                <div className="num">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block order-layout">
        <CommissionForm
          portfolioCodes={portfolio.map((p) => ({ code: p.code, title: p.title }))}
          tightDiagram={
            <Image
              src="/images/measure-tight.jpg"
              alt="Ruler measuring the tight, outer opening of a window frame"
              width={649}
              height={512}
            />
          }
          visibleDiagram={
            <Image
              src="/images/measure-visible.jpg"
              alt="Ruler measuring the visible, inner opening of a window frame"
              width={629}
              height={512}
            />
          }
        />
      </section>
    </div>
  );
}
