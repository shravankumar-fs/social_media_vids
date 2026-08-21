"use client";

import { useCallback, type ReactNode } from "react";
import { useParallax } from "@/lib/scroll";
import { useReveal } from "@/lib/reveal";
import ArrowField from "./ArrowField";

/**
 * One numbered block, and the only thing on this page that owns vertical
 * rhythm. Every section is a Band, so the air between blocks is a single
 * value (`--stack` in toxic01.css) rather than a per-section margin that
 * drifts out of step the moment someone adds a seventh section.
 *
 * Two hooks write to the same element — useParallax writes --p/--pc for the
 * arrow field, useReveal lights the `.lit` descendants — so the refs are
 * merged onto one node rather than nesting a wrapper div per hook.
 */
export default function Band({
  index,
  id,
  title,
  note,
  depth = 1,
  children,
}: {
  /** Rendered as the section numeral. Zero-padded by the caller's array order. */
  index: number;
  id: string;
  title: string;
  note?: string;
  depth?: number;
  children: ReactNode;
}) {
  const parallaxRef = useParallax<HTMLElement>(depth);
  const revealRef = useReveal<HTMLElement>(0.06);

  const ref = useCallback(
    (el: HTMLElement | null) => {
      parallaxRef.current = el;
      revealRef.current = el;
    },
    [parallaxRef, revealRef],
  );

  const num = String(index).padStart(2, "0");

  return (
    <section className="band" id={id} ref={ref} aria-labelledby={`${id}-title`}>
      <ArrowField />

      <div className="shell">
        <header className="band__head">
          <div className="band__index lit">
            {/*
              The numeral is decorative sequencing, not part of the heading —
              inside the <h2> every screen reader would read "zero three" as
              the first word of the section's name.
            */}
            <span className="band__num" aria-hidden="true">
              {num}
            </span>
            <h2 className="band__title" id={`${id}-title`}>
              {title}
            </h2>
          </div>
          {note ? (
            <p className="band__note lit" data-lit-index="1">
              {note}
            </p>
          ) : null}
        </header>

        {children}
      </div>
    </section>
  );
}
