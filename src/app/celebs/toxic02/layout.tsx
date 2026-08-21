import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import {
  TOXIC_SOURCE_URL,
  toxic,
  toxicEnsemble,
  toxicFrame,
  toxicProduction,
} from "@/data/toxic";
import "./toxic02.css";

/*
 * Loaded in this nested layout rather than the root one, so /celebs/yash,
 * /celebs/yash_01 and /celebs/toxic01 keep exactly the pairings their own
 * designs specify and pay nothing for this route's type.
 */
const disp = Space_Grotesk({
  variable: "--font-t02-disp",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const txt = Sora({
  variable: "--font-t02-txt",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toxic (2026) — A Fairy Tale for Grown-Ups | Yash",
  description:
    "Yash in a dual role for Geetu Mohandas. A gangster picture set in post-independence Goa, 194 minutes, in cinemas worldwide 26 August 2026.",
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
  director: { "@type": "Person", name: toxic.director },
  actor: [
    { "@type": "Person", name: "Yash" },
    ...toxicEnsemble.map((c) => ({ "@type": "Person", name: c.actor })),
  ],
  author: toxicProduction.writers
    .split(" and ")
    .map((n) => ({ "@type": "Person", name: n })),
  sameAs: [TOXIC_SOURCE_URL],
};

/*
 * Every rule in toxic02.css is nested under `.t02`. Next does not unmount
 * route stylesheets on client navigation, so an unscoped sheet here would
 * still be live on the other celebrity routes and would repaint them.
 */
export default function Toxic02Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`t02 ${disp.variable} ${txt.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
