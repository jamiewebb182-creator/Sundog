import Link from "next/link";
import Image from "next/image";
import { site, galleryImages } from "@/lib/content";
import { GlassArt } from "@/lib/glassArt";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <div className="view wrap">
      <Hero
        eyebrow="Bristol · Bespoke stained glass"
        tagline={site.tagline}
        bio={site.bio}
        heroImage={site.heroImage}
        heroCaption={site.heroCaption}
      />

      <section className="block quicknav">
        <div className="qcard">
          <h3>Browse the portfolio</h3>
          <p>{site.portfolioBlurb}</p>
          <Link className="btn btn-ghost" href="/portfolio">View products &rarr;</Link>
        </div>
        <div className="qcard">
          <h3>Start a commission</h3>
          <p>{site.orderBlurb}</p>
          <Link className="btn btn-ghost" href="/commission">Begin the order form &rarr;</Link>
        </div>
      </section>

      <section className="block">
        <div className="section-head">
          <h2>In the workshop</h2>
          <p>{site.galleryIntro}</p>
        </div>
        <div className="gallery">
          {galleryImages.map((img, i) => (
            <div className="gtile" key={i}>
              <div className="frame art-frame">
                {img.image ? (
                  <Image src={img.image} alt={img.caption} width={600} height={450} />
                ) : (
                  <GlassArt seed={`gallery-${i}`} palette={img.palette} cols={4} rows={3} />
                )}
              </div>
              <div className="gtile-body">
                <p className="gtile-cap">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="block contact">
        <div>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2>Get in touch</h2>
            <p>{site.contactIntro}</p>
          </div>
          <ul className="contact-list">
            <li><span className="k">Email</span><span><a href={`mailto:${site.email}`}>{site.email}</a></span></li>
            <li><span className="k">Phone</span><span>{site.phone}</span></li>
            <li><span className="k">Based in</span><span>{site.location}</span></li>
          </ul>
          <Link className="social-link" href="/commission" style={{ marginTop: 20 }}>
            <span>Get an estimate</span>
          </Link>
        </div>
        <div>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2>Follow along</h2>
            <p>New panels, works in progress, and the odd broken pane of glass.</p>
          </div>
          <div className="socials">
            
              className="social-link"
              href={`https://instagram.com/${site.instagram.replace(/^@/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Instagram &mdash; {site.instagram}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
