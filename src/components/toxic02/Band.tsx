"use client";

import { useCallback } from "react";
import { useParallax } from "@/lib/scroll";
import { useRise } from "@/lib/reveal";

/**
 * A section and its heading.
 *
 * The band still registers with `useParallax` — it writes --p and --pc onto
 * this element once a frame, which the section's own contents can read for
 * drift. The background motif is no longer per-band: one page-wide spiral
 * carries it instead, so the reader sees a single continuous gesture rather
 * than the same three marks restarting in every section.
 */
export default function Band({
  n,
  eyebrow,
  title,
  lede,
  id,
  children,
}: {
  n: string;
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
  children: React.ReactNode;
}) {
  const parallaxRef = useParallax<HTMLElement>(1);
  const riseRef = useRise<HTMLElement>(0.08);

  const ref = useCallback(
    (el: HTMLElement | null) => {
      parallaxRef.current = el;
      riseRef.current = el;
    },
    [parallaxRef, riseRef],
  );

  const headingId = id ? `${id}-title` : undefined;

  return (
    <section className="band" id={id} ref={ref} aria-labelledby={headingId}>
      <div className="shell">
        <p className="num rise">
          {n}
          <span>{eyebrow}</span>
        </p>
        <h2 className="h2 rise" id={headingId} data-rise-index="1">
          {title}
        </h2>
        {lede ? (
          <p className="lede rise" data-rise-index="2">
            {lede}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
