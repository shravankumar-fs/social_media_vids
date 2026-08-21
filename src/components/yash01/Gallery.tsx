"use client";

import Image from "next/image";
import { shots, type Shot } from "@/data/gallery";
import { useParallax } from "@/lib/scroll";
import { useReveal } from "@/lib/reveal";

/*
 * Wikimedia Commons only. The set is deliberately small: four photographs that
 * have each been looked at, rather than nine cells holding four frames plus
 * two crops of those frames and one person who is not the subject.
 * Captions, alt text and credits all live in src/data/gallery.ts.
 */
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
            ? "(min-width: 48rem) 46vw, 100vw"
            : "(min-width: 48rem) 23vw, 100vw"
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
        <h2 id="gal-title" className="h2 lit tube">
          On the record
        </h2>
        <p className="lede lit" data-lit-index="1">
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
