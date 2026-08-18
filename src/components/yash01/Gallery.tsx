"use client";

import Image from "next/image";
import { useParallax } from "@/lib/scroll";
import { useReveal } from "@/lib/reveal";

/*
 * Wikimedia Commons only — the same CC-licensed set the gold page uses, with
 * the same photographers credited in the colophon below. Google Images is not
 * a source: the licence terms are unknowable and the links rot.
 *
 * portrait-tex.jpg is on disk but is deliberately not shown here: it has no
 * entry in imageCredits, and an uncredited CC BY-SA file must not be published.
 */
type Shot = {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
  shape?: "wide" | "tall";
  depth: number;
};

const shots: Shot[] = [
  {
    src: "/yash/kgf-press.jpg",
    w: 1800,
    h: 1200,
    alt: "Yash speaking at the KGF press meet in Chennai",
    caption: "KGF press meet, Chennai",
    shape: "wide",
    depth: 0.5,
  },
  {
    src: "/yash/hungama-tall.jpg",
    w: 916,
    h: 1582,
    alt: "Yash at a public appearance",
    caption: "Public appearance",
    shape: "tall",
    depth: 1.4,
  },
  {
    src: "/yash/kgf-press-crop.jpg",
    w: 551,
    h: 664,
    alt: "Yash at the KGF press meet in Chennai",
    caption: "KGF press meet",
    depth: 0.9,
  },
  {
    src: "/yash/kgf2-neel.jpg",
    w: 2048,
    h: 1365,
    alt: "Yash with director Prashanth Neel and others promoting KGF: Chapter 2 in Chennai",
    caption: "With Prashanth Neel, KGF: Chapter 2 promotions",
    shape: "wide",
    depth: 0.6,
  },
  {
    src: "/yash/kgf-vishal-crop.jpg",
    w: 426,
    h: 464,
    alt: "At the KGF press meet in Chennai",
    caption: "KGF press meet",
    depth: 1.2,
  },
  {
    // A crop of the KGF: Chapter 2 promotion group photograph. The subject is
    // not Yash and the source does not name her, so the alt text describes the
    // occasion and stops there rather than inventing an identity.
    src: "/yash/kgf2-cast-crop.jpg",
    w: 248,
    h: 315,
    alt: "A guest at the KGF: Chapter 2 promotions in Chennai",
    caption: "KGF: Chapter 2 promotions",
    depth: 0.8,
  },
  {
    src: "/yash/kgf2-promo.jpg",
    w: 367,
    h: 407,
    alt: "Yash at a KGF: Chapter 2 promotional appearance",
    caption: "KGF: Chapter 2 promotions",
    depth: 1.5,
  },
  {
    src: "/yash/kgf2-crop.jpg",
    w: 219,
    h: 298,
    alt: "Yash at the KGF: Chapter 2 promotions in Chennai",
    caption: "KGF: Chapter 2 promotions",
    depth: 1.0,
  },
  {
    src: "/yash/kgf-event.jpg",
    w: 284,
    h: 308,
    alt: "Yash at a public event",
    caption: "Public appearance",
    depth: 1.3,
  },
];

function Plate({ shot }: { shot: Shot }) {
  // Each plate drifts at its own rate, so the grid has depth inside itself
  // rather than travelling as one flat sheet.
  const ref = useParallax<HTMLElement>(shot.depth);

  return (
    <figure
      className={`plate lit${shot.shape ? ` plate--${shot.shape}` : ""}`}
      ref={ref}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        sizes={
          shot.shape === "wide"
            ? "(min-width: 48rem) 44vw, 100vw"
            : "(min-width: 48rem) 22vw, 50vw"
        }
      />
      <figcaption>{shot.caption}</figcaption>
    </figure>
  );
}

export default function Gallery() {
  const reveal = useReveal<HTMLElement>(0.05);

  return (
    <section className="sec" id="gallery" ref={reveal} aria-labelledby="gal-title">
      <div className="shell">
        <p className="eyebrow lit">Gallery</p>
        <h2 id="gal-title" className="h2 lit tube" data-lit-index="1">
          On the record
        </h2>
        <p className="lede lit" data-lit-index="2">
          Freely licensed photographs from Wikimedia Commons. Every
          photographer is credited at the foot of this page, as their licences
          require.
        </p>

        <div className="gal">
          {shots.map((s) => (
            <Plate shot={s} key={s.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
