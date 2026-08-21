"use client";

import Image from "next/image";
import { useCallback } from "react";
import { toxic, toxicFrame } from "@/data/toxic";
import { figures } from "@/data/toxicFigures";
import { useParallax, usePointerTilt } from "@/lib/scroll";
import { useRise } from "@/lib/reveal";
import { useSpotlight } from "@/lib/spotlight";
import Chevron from "./Chevron";

export default function Hero() {
  const { ref: tiltRef } = usePointerTilt(1);
  const parallaxRef = useParallax<HTMLElement>(1);
  const reveal = useRise<HTMLDivElement>(0.1);
  const { elRef, onPointerMove, onPointerEnter, onPointerLeave } =
    useSpotlight<HTMLDivElement>();
  const fig = figures.hero;

  /*
   * Tilt writes --tx/--ty, parallax writes --p, and every layer below inherits
   * both. One element, so one merged ref rather than a wrapper per hook.
   */
  const stageRef = useCallback(
    (el: HTMLElement | null) => {
      tiltRef.current = el;
      parallaxRef.current = el;
    },
    [tiltRef, parallaxRef],
  );

  return (
    /*
      data-cutout flips the aura from in-front (screen-blended firelight over a
      rectangular photo) to behind the figure (a true rim-light), which only
      works once a transparent PNG is in place. See src/data/toxicFigures.ts.
    */
    <header className="hero" ref={stageRef} data-cutout={fig.ready ? "true" : undefined}>
      {/* Four tongues on periods that never re-align — see .aura in the CSS. */}
      <div className="aura" aria-hidden="true">
        <b /><b /><b /><b />
      </div>

      <div
          className="hero__portrait spot"
          ref={elRef}
          onPointerMove={onPointerMove}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
        <Image
          src={fig.src}
          alt={fig.alt}
          width={fig.w}
          height={fig.h}
          sizes="(min-width: 64rem) 42vw, (min-width: 48rem) 58vw, 104vw"
          priority
        />
        {/* Darkens everything the torch is not on. */}
        <span className="spot__beam" aria-hidden="true" />
      </div>

      <div className="hero__inner shell" ref={reveal}>
        <p className="hero__kicker rise">In cinemas {toxic.releaseDate}</p>

        <h1 className="hero__word rise" data-rise-index="1">
          {toxic.title}
        </h1>

        <p className="hero__sub rise" data-rise-index="2">
          {toxic.subtitle}
        </p>

        <p className="hero__logline rise" data-rise-index="3">
          {toxicFrame.logline}
        </p>

        <p className="hero__meta rise" data-rise-index="4">
          <span>
            Directed by <b>{toxic.director}</b>
          </span>
          <span>
            <b>{toxic.runtime}</b>
          </span>
          <span>
            <b>{toxicFrame.genre}</b>
          </span>
        </p>
      </div>

      <div className="hero__cue shell" aria-hidden="true">
        <i>
          <Chevron strokeWidth={1.6} />
        </i>
        <span>Scroll</span>
      </div>
    </header>
  );
}
