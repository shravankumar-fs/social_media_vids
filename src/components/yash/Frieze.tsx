"use client";

import { originFrieze } from "@/data/yash";
import { useGild, useParallax } from "@/lib/scroll";

/**
 * A Hoysala frieze is a continuous horizontal band read left to right, one
 * episode after another, all at the same height. So on a wide screen this
 * band travels sideways while the page scrolls down — the reading direction
 * of the source, driven by the reading direction of the web.
 *
 * On a phone there is no room to travel, and hijacking a thumb's scroll to
 * push things sideways is a hostile trick, so the band stands up into a
 * vertical course of panels instead. Same episodes, same order, same rhythm.
 */
export default function Frieze() {
  // `--p` is measured on the tall section and inherits down to the track,
  // so the band's travel is exactly the distance the section stays pinned.
  const section = useParallax<HTMLElement>(1, "pin");
  const gild = useGild<HTMLDivElement>(0.1);

  return (
    <section className="frieze" ref={section} aria-labelledby="frieze-title">
      <div className="frieze__sticky" ref={gild}>
        <div className="frieze__head">
          <h2 id="frieze-title" className="section-title gild">
            The lower course
          </h2>
          <p className="section-lede gild" data-gild-index="1">
            Every Hoysala wall begins with a narrative band at eye level, cut
            before anything above it. This is his.
          </p>
        </div>

        <div className="frieze__track">
          {originFrieze.map((panel, i) => (
            <article className="panel gild" data-gild-index={i} key={panel.id}>
              <span className="panel__year">{panel.year}</span>
              <h3 className="panel__title">{panel.title}</h3>
              <p className="panel__body">{panel.body}</p>
              <span className="panel__rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
