import { site, steps, portfolio } from "@/lib/content";
import { MeasureDiagram } from "@/lib/measureDiagram";
import { CommissionForm } from "@/components/CommissionForm";

export default function CommissionPage() {
  return (
    <div className="view wrap">
      <section className="block">
        <div className="order-intro">
          <div className="section-head" style={{ maxWidth: 640 }}>
            <h2>Start a commission</h2>
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
          tightDiagram={<MeasureDiagram kind="tight" />}
          visibleDiagram={<MeasureDiagram kind="visible" />}
        />
      </section>
    </div>
  );
}
