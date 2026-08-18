"use client";

import Image from "next/image";
import { filmography } from "@/data/yash";
import { useGild, useParallax } from "@/lib/scroll";

const STILLS: Record<string, string> = {
  "Moggina Manasu": "/yash/hungama-tall.jpg",
  "KGF: Chapter 1": "/yash/kgf-press.jpg",
  "KGF: Chapter 2": "/yash/kgf2-neel.jpg",
};

function Tier({
  film,
  index,
}: {
  film: (typeof filmography)[number];
  index: number;
}) {
  // Deeper courses drift less, the way a further relief plane does.
  const ref = useParallax<HTMLDivElement>(film.tier === "landmark" ? 1.6 : 0.7);
  const still = STILLS[film.title];

  return (
    <div
      ref={ref}
      className={`tier tier--${film.tier} ${still ? "tier--still" : ""} gild`}
      data-gild-index={index % 4}
    >
      <div className="tier__stone">
        <span className="tier__year">{film.year}</span>

        {/* Title and note travel together: on a wide screen they are the
            middle column, and the figure has to stay in the third. */}
        <div className="tier__text">
          <h3 className="tier__title">{film.title}</h3>
          <p className="tier__note">{film.note}</p>
        </div>

        {film.figure && (
          <p className="tier__figure">
            <span className="tier__figure-value">{film.figure}</span>
            <span className="tier__figure-label">{film.figureLabel}</span>
          </p>
        )}

        {/* Inside the stone so a wide layout can give it a column of its own
            rather than floating it over the figures. */}
        {still && (
          <div className="tier__still" aria-hidden="true">
            <Image
              src={still}
              alt=""
              fill
              sizes="(min-width: 64rem) 18vw, 45vw"
              className="tier__still-img"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * A gopuram stacks its tiers, each smaller and more worked than the one below.
 * The filmography climbs the same way: the early films are plain stone, the
 * two that changed everything are gilded and given a face.
 */
export default function Tiers() {
  const gild = useGild<HTMLElement>(0.08);

  return (
    <section className="tiers" ref={gild} aria-labelledby="tiers-title">
      <div className="tiers__head">
        <h2 id="tiers-title" className="section-title gild">
          The tiers
        </h2>
        <p className="section-lede gild" data-gild-index="1">
          Eleven courses, 2007 to 2022. The plain ones are stone. Two of them
          got the leaf.
        </p>
      </div>

      <div className="tiers__stack">
        {filmography.map((film, i) => (
          <Tier film={film} index={i} key={`${film.year}-${film.title}`} />
        ))}
      </div>
    </section>
  );
}
