import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Topbar from "@/components/toxic01/Topbar";
import Hero from "@/components/toxic01/Hero";
import Seam from "@/components/toxic01/Seam";
import Premise from "@/components/toxic01/Premise";
import Roles from "@/components/toxic01/Roles";
import Scale from "@/components/toxic01/Scale";
import Ensemble from "@/components/toxic01/Ensemble";
import Making from "@/components/toxic01/Making";
import Release from "@/components/toxic01/Release";
import Colophon from "@/components/toxic01/Colophon";
import {
  TOXIC_SOURCE_URL,
  toxic,
  toxicEnsemble,
  toxicFrame,
  toxicProduction,
} from "@/data/toxic";

export const metadata: Metadata = {
  title: "Toxic (2026) — A Fairy Tale for Grown-Ups | Yash",
  description:
    "Yash in a dual role for Geetu Mohandas. Post-independence Goa, 194 minutes, in cinemas worldwide 26 August 2026.",
  openGraph: {
    title: "Toxic — A Fairy Tale for Grown-Ups",
    description:
      "Geetu Mohandas directs Yash as Raya and Rumi. In cinemas 26 August 2026.",
    images: ["/toxic/yash-portrait.jpg"],
    type: "video.movie",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Movie",
  name: toxic.title,
  alternativeHeadline: toxic.subtitle,
  description: toxic.premise,
  genre: toxicFrame.genre,
  datePublished: toxic.releaseISO,
  duration: "PT194M",
  inLanguage: ["kn", "en"],
  contentRating: "A (CBFC)",
  director: { "@type": "Person", name: toxic.director },
  productionCompany: [
    { "@type": "Organization", name: "KVN Productions" },
    { "@type": "Organization", name: "Monster Mind Creations" },
  ],
  actor: [
    { "@type": "Person", name: "Yash" },
    ...toxicEnsemble.map((c) => ({ "@type": "Person", name: c.actor })),
  ],
  author: toxicProduction.writers
    .split(" and ")
    .map((n) => ({ "@type": "Person", name: n })),
  sameAs: [TOXIC_SOURCE_URL],
};

export default function Toxic01Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />
      <Topbar />

      {/*
        Hero and Colophon sit outside <main> on purpose. Per HTML-AAM a
        <header> or <footer> nested inside <main> is demoted to `generic`, so
        putting them in there would leave the page exposing no banner and no
        contentinfo landmark at all.

        The <Seam /> between bands is the arrow motif's divider: a hairline and
        a chevron living in the gap the bands already leave, adding no height
        of its own.
      */}
      <Hero />

      <main>
        <Premise />
        <Seam />
        <Roles />
        <Seam />
        <Scale />
        <Seam />
        <Ensemble />
        <Seam />
        <Making />
        <Seam />
        <Release />
      </main>

      <Colophon />
    </>
  );
}
