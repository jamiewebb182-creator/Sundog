import Image from "next/image";
import { site, portfolio } from "@/lib/content";
import { GlassArt } from "@/lib/glassArt";

export default function PortfolioPage() {
  return (
    <div className="view wrap">
      <section className="block">
        <div className="toolbar">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2>Portfolio</h2>
            <p>{site.portfolioIntro}</p>
          </div>
        </div>
        <div className="pgrid">
          {portfolio.map((p) => (
            <div className="pcard" key={p.code}>
              <div className={`frame art-frame${p.image ? "" : " ph-frame"}`}>
                {p.image ? (
                  <Image src={p.image} alt={p.title} width={p.imageWidth} height={p.imageHeight} sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw" />
                ) : (
                  <GlassArt seed={p.code} palette={p.palette} cols={5} rows={4} />
                )}
              </div>
              <div className="pcard-body">
                <div className="pcard-top">
                  <h3>{p.title}</h3>
                  <span className="price">{p.price}</span>
                </div>
                <div className="code-row">
                  <span className="code-label">Product code</span>
                  <span className="code mono">{p.code}</span>
                </div>
                <p className="desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
