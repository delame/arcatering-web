import type { CopyData } from "@/data/copy";

export function HowItWorks({ copy }: { copy: CopyData }) {
  const h = copy.how;
  return (
    <section id="how" className="how">
      <div className="container">
        <header className="section-head">
          <div className="eyebrow">{h.eyebrow}</div>
          <h2 className="display-h2">{h.title}</h2>
        </header>
        <ol className="how-list">
          {h.steps.map((s, i) => (
            <li key={i} className="how-step">
              <div className="how-num">{s.n}</div>
              <div className="how-body">
                <h3 className="display-h5">{s.t}</h3>
                <p className="muted">{s.b}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
