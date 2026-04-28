import type { CopyData } from "@/data/copy";

export function WhyUs({ copy }: { copy: CopyData }) {
  const p = copy.promise;
  return (
    <section className="promise">
      <div className="container">
        <header className="section-head two-col">
          <div>
            <div className="eyebrow">{p.eyebrow}</div>
            <h2 className="display-h2">{p.title}</h2>
          </div>
        </header>
        <div className="promise-grid">
          {p.items.map((item, i) => (
            <article key={i} className="promise-card">
              <div className="promise-kicker">{item.kicker}</div>
              <h3 className="display-h4">{item.title}</h3>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
