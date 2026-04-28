import Image from "next/image";
import type { CopyData } from "@/data/copy";

const logos = [
  { src: "/images/clients/sca.jpg", name: "SCA" },
  { src: "/images/clients/accenture.jpg", name: "Accenture" },
  { src: "/images/clients/strabag.jpg", name: "Strabag" },
  { src: "/images/clients/vaillant.jpg", name: "Vaillant" },
  { src: "/images/clients/fann.jpg", name: "FAnn" },
];

export function References({ copy }: { copy: CopyData }) {
  return (
    <section id="refs" className="refs">
      <div className="container">
        <header className="section-head two-col">
          <div>
            <div className="eyebrow">{copy.refs.eyebrow}</div>
            <h2 className="display-h2">{copy.refs.title}</h2>
          </div>
        </header>
        <div className="logo-strip logo-strip-real">
          {logos.map((l, i) => (
            <div key={i} className="logo-cell">
              <Image src={l.src} alt={l.name} width={120} height={48} style={{ objectFit: "contain" }} />
            </div>
          ))}
        </div>
        <div className="testimonials">
          {copy.testimonials.items.map((tt, i) => (
            <figure key={i} className="testimonial">
              <blockquote>&ldquo;{tt.quote}&rdquo;</blockquote>
              <figcaption>
                <b>{tt.name}</b>
                <span className="muted">{tt.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
