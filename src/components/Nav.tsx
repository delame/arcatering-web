"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import type { CopyData } from "@/data/copy";

export function Nav({ copy, lang, setLang }: { copy: CopyData; lang: string; setLang: (l: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand">
          <Image src="/images/logo.png" alt="AR Catering" className="brand-logo" width={203} height={46} priority />
        </a>
        <nav className="nav-links">
          <a href="#menu">{copy.nav.menu}</a>
          <a href="#how">{copy.nav.how}</a>
          <a href="#refs">{copy.nav.reference}</a>
          <a href="#footer">{copy.nav.contact}</a>
        </nav>
        <div className="nav-actions">
          <div className="lang-toggle">
            <button className={lang === "cs" ? "on" : ""} onClick={() => setLang("cs")}>CS</button>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <a href="#quote" className="btn btn-primary">
            <span>{copy.nav.quote}</span>
            <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}
