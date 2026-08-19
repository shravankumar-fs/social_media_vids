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
    <section
      className="banner grain"
      ref={reveal}
      aria-label={`${toxic.title} — in cinemas ${toxic.releaseDate}`}
    >
      <div className="banner__scan" aria-hidden="true" />

      <div className="shell">
        {/*
          A display lockup, not a section heading. As an <h2> it put a second
          "Toxic" into the outline and a second identically-named region into
          the landmark list, so the two were indistinguishable to anyone
          navigating by structure. The section below owns the heading.
        */}
        <p className="banner__word n-magenta lit tube">{toxic.title}</p>

        <p className="banner__sub lit" data-lit-index="1">
          {toxic.subtitle}
        </p>

        <div className="banner__strip lit" data-lit-index="2">
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
