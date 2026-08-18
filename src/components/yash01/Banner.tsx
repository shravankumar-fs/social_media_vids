"use client";

import { toxic } from "@/data/toxic";
import { useReveal, useDaysUntil } from "@/lib/reveal";

/**
 * The cinematic plate near the top of the page.
 *
 * The brief called for this to be a CTA that jumps down to the Toxic section.
 * It is deliberately not a link: scrolling is the only input this page takes,
 * so the banner sets the expectation and the section at the foot pays it off.
 */
export default function Banner() {
  const reveal = useReveal<HTMLElement>(0.2);
  const days = useDaysUntil(toxic.releaseISO);

  return (
    <section className="banner grain" ref={reveal} aria-labelledby="banner-title">
      <div className="banner__scan" aria-hidden="true" />

      <div className="shell">
        <p className="eyebrow lit">In cinemas next</p>

        <h2 id="banner-title" className="banner__word n-magenta lit tube" data-lit-index="1">
          {toxic.title}
        </h2>

        <p className="banner__sub lit" data-lit-index="2">
          {toxic.subtitle}
        </p>

        <p className="banner__line lit" data-lit-index="3">
          {toxic.tagline}
        </p>

        <div className="banner__strip lit" data-lit-index="4">
          <span className="banner__date">{toxic.releaseDate}</span>
          <span className="banner__count">
            {days === null
              ? ""
              : days > 1
                ? `${days} days out`
                : days === 1
                  ? "Tomorrow"
                  : days === 0
                    ? "Out today"
                    : "In cinemas now"}
          </span>
          <span className="eyebrow">Directed by {toxic.director}</span>
        </div>
      </div>
    </section>
  );
}
