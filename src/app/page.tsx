"use client";

import { useState } from "react";
import { COPY } from "@/data/copy";
import { PRODUCTS } from "@/data/products";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { HowItWorks } from "@/components/HowItWorks";
import { References } from "@/components/References";
import { FooterCTA } from "@/components/FooterCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState("cs");
  const copy = COPY[lang];
  const products = PRODUCTS[lang].categories;

  return (
    <>
      <Nav copy={copy} lang={lang} setLang={setLang} />
      <main>
        <Hero copy={copy} />
        <WhyUs copy={copy} />
        <section id="menu">
          <QuoteBuilder copy={copy} products={products} lang={lang} />
        </section>
        <HowItWorks copy={copy} />
        <References copy={copy} />
        <FooterCTA copy={copy} />
      </main>
      <Footer copy={copy} />
    </>
  );
}
