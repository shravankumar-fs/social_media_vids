"use client";

import Image from "next/image";
import type { CastPortrait as Portrait } from "@/data/toxicCast";
import { useSpotlight } from "@/lib/spotlight";

/**
 * Its own component purely so each portrait can own a spotlight hook — hooks
 * cannot be called in a loop, and the torch needs per-element pointer state.
 */
export default function CastPortrait({
  c,
  index,
}: {
  c: Portrait;
  index: number;
}) {
  const { elRef, onPointerMove, onPointerEnter, onPointerLeave } =
    useSpotlight<HTMLDivElement>();
  const sizes = "(min-width: 64rem) 9rem, (min-width: 30rem) 22vw, 38vw";

  return (
    <li className="rise" data-rise-index={index}>
      <figure>
        <div
          className="cast__ring spot"
          ref={elRef}
          onPointerMove={onPointerMove}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
          <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes={sizes} />
          <span className="spot__beam" aria-hidden="true" />
        </div>
        <figcaption>
          <span className="cast__actor">{c.actor}</span>
          <span className="cast__role">{c.role}</span>
          {c.note ? <span className="cast__note">{c.note}</span> : null}
        </figcaption>
      </figure>
    </li>
  );
}
