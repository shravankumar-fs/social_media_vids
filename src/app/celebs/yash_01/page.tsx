import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/yash01/Hero";
import Banner from "@/components/yash01/Banner";
import { Bio, Films } from "@/components/yash01/Bio";
import Gallery from "@/components/yash01/Gallery";
import Toxic from "@/components/yash01/Toxic";
import Colophon from "@/components/yash01/Colophon";
import { SOURCE_URL, identity } from "@/data/yash";
import { TOXIC_SOURCE_URL, toxic } from "@/data/toxic";

export const metadata: Metadata = {
  title: "Yash — Rocking Star | Toxic, 26 August 2026",
  description:
    "Naveen Kumar Gowda, known as Yash: from Boovanahalli to KGF: Chapter 2, and on to Toxic — a neon-lit scroll through the work.",
  openGraph: {
    title: "Yash — Rocking Star",
    description:
      "From ₹300 and a bus to Bangalore, to Toxic: A Fairy Tale for Grown-Ups.",
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
  performerIn: {
    "@type": "Movie",
    name: `${toxic.title}: ${toxic.subtitle}`,
    director: { "@type": "Person", name: toxic.director },
    sameAs: [TOXIC_SOURCE_URL],
  },
};

export default function Yash01Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />

      <main>
        <Hero />
        <Banner />
        <Bio />
        <Films />
        <Gallery />
        <Toxic />
        <Colophon />
      </main>
    </>
  );
}
