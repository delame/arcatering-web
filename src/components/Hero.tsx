import Image from "next/image";
import { Icon } from "./Icon";
import type { CopyData } from "@/data/copy";

export function Hero({ copy }: { copy: CopyData }) {
  const h = copy.hero;
  return (
    <section id="top" className="hero hero-dark">
      <div className="hero-bg">
        <div className="hero-photo hero-photo-l"><Image src="/images/food/spoon-canapes.jpg" alt="" width={250} height={227} /></div>
        <div className="hero-photo hero-photo-r"><Image src="/images/food/grill-platter.jpg" alt="" width={250} height={200} /></div>
        <div className="hero-photo hero-photo-bl"><Image src="/images/food/tiramisu.jpg" alt="" width={250} height={250} /></div>
      </div>
      <div className="container hero-inner">
        <div className="hero-eyebrow">
          <span className="dot"></span>
          {h.eyebrow}
        </div>
        <h1 className="display-h1 hero-h1">
          {h.title[0]} {h.title[1]}<em className="ital">{h.title[2]}</em>{h.title[3]}
        </h1>
        <p className="hero-lead">{h.lead}</p>
        <div className="hero-tags">
          {h.tags.map((tg, i) => (
            <span key={i} className="hero-tag">{tg}</span>
          ))}
        </div>
        <div className="hero-cta">
          <a href="#quote" className="btn btn-primary lg"><span>{h.ctaPrimary}</span><Icon name="arrow" size={14} /></a>
          <a href="#menu" className="btn btn-ghost-dark lg"><span>{h.ctaSecondary}</span></a>
        </div>
      </div>
      <div className="hero-stats-strip">
        <div className="container">
          <dl className="hero-stats">
            {[h.stat1, h.stat2, h.stat3].map(([n, l], i) => (
              <div key={i} className="stat">
                <dt className="display-stat">{n}</dt>
                <dd>{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
