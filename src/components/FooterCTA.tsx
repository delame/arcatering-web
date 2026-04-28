import { Icon } from "./Icon";
import type { CopyData } from "@/data/copy";

export function FooterCTA({ copy }: { copy: CopyData }) {
  return (
    <section className="footer-cta">
      <div className="container fcta-inner">
        <h2 className="display-h2">{copy.footerCta.title}</h2>
        <p className="lead">{copy.footerCta.lead}</p>
        <div className="hero-cta">
          <a href="#quote" className="btn btn-primary lg">
            <span>{copy.footerCta.cta}</span>
            <Icon name="arrow" size={14} />
          </a>
          <a href="mailto:poptavka@arcatering.cz" className="btn btn-ghost lg">
            <span>poptavka@arcatering.cz</span>
          </a>
        </div>
      </div>
    </section>
  );
}
