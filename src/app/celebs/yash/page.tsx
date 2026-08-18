import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/yash/Hero";
import Frieze from "@/components/yash/Frieze";
import Tiers from "@/components/yash/Tiers";
import GoldSeam from "@/components/yash/GoldSeam";
import Awards from "@/components/yash/Settings";
import { Sanctum, Endowment, Unfinished, Colophon } from "@/components/yash/Closing";
import { SOURCE_URL, identity } from "@/data/yash";
import "./yash.css";

export const metadata: Metadata = {
  title: "Yash — Rocking Star | Kannada cinema",
  description:
    "Naveen Kumar Gowda, known as Yash: from Boovanahalli to KGF: Chapter 2, the fourth highest-grossing Indian film ever made. Carved in the relief of his own state.",
  openGraph: {
    title: "Yash — Rocking Star",
    description:
      "From ₹300 and a bus to Bangalore, to a film that took ₹10 billion worldwide.",
    images: ["/yash/portrait-main.jpg"],
    type: "profile",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.stageName,
  alternateName: identity.birthName,
  birthDate: "1986-01-08",
  birthPlace: {
    "@type": "Place",
    name: "Boovanahalli, Hassan district, Karnataka, India",
  },
  jobTitle: "Actor and film producer",
  nationality: "Indian",
  sameAs: [SOURCE_URL],
  description: identity.summary,
};

export default function YashPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />

      <main className="wall">
        <Hero />
        <Frieze />
        <Tiers />
        <GoldSeam />
        <Awards />
        <Sanctum />
        <Endowment />
        <Unfinished />
        <Colophon />
      </main>
    </>
  );
}
