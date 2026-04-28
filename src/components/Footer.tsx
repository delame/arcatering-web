import Image from "next/image";
import type { CopyData } from "@/data/copy";

export function Footer({ copy }: { copy: CopyData }) {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand brand-lg">
            <Image src="/images/logo.png" alt="AR Catering" className="brand-logo brand-logo-lg" width={203} height={46} />
          </div>
          <p className="muted">{copy.footer.tagline}</p>
        </div>
        <div className="footer-col">
          <h4 className="footer-h">Adresa</h4>
          <address>
            {copy.footer.addr.split("\n").map((l, i) => <div key={i}>{l}</div>)}
          </address>
        </div>
        <div className="footer-col">
          <h4 className="footer-h">{copy.footer.contact}</h4>
          <a href="mailto:poptavka@arcatering.cz">poptavka@arcatering.cz</a>
          <a href="tel:+420776123456">+420 776 123 456</a>
          <span className="muted">{copy.footer.hours}</span>
        </div>
        <div className="footer-col">
          <h4 className="footer-h">Social</h4>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="container footer-legal">
        <span className="muted small">{copy.footer.legal}</span>
      </div>
    </footer>
  );
}
