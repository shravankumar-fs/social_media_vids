"use client";

import Image from "next/image";
import { useCallback } from "react";
import { toxic, toxicFrame, toxicPortraitCredit } from "@/data/toxic";
import { useParallax, usePointerTilt } from "@/lib/scroll";
import { useReveal } from "@/lib/reveal";
import Chevron from "./Chevron";

/**
 * The first screen.
 *
 * The 3D here is deliberately small. This page is built for a phone first, so
 * the depth is four CSS layers on one `perspective` — the portrait, a brass
 * wash, a floor gradient and the type — driven by the tilt signal
 * (pointer on a desktop, device orientation on a phone) plus the band's own
 * scroll progress. No WebGL: a canvas would cost a shader compile and a
 * second render loop on the frame where the visitor is least willing to wait,
 * for a parallax three transforms already give.
 */
export default function Hero() {
  const { ref: tiltRef } = usePointerTilt(1);
  const parallaxRef = useParallax<HTMLElement>(1);
  const reveal = useReveal<HTMLDivElement>(0.05);

  /*
   * Both hooks write custom properties to the same node — tilt writes
   * --tx/--ty, parallax writes --p — and every layer inside inherits them.
   * One element, so one merged ref instead of a wrapper per hook.
   */
  const stageRef = useCallback(
    (el: HTMLElement | null) => {
      tiltRef.current = el;
      parallaxRef.current = el;
    },
    [tiltRef, parallaxRef],
  );

  return (
    <header className="hero grain" ref={stageRef}>
      <div className="hero__stage">
        <div className="hero__portrait">
          {/*
            `preload`, not `priority`: Next 16 deprecates the latter in favour
            of the former to make the behaviour legible. This is the only
            image on the route and unambiguously the LCP element, so starting
            it from the <head> is exactly the intent.
          */}
          <Image
            src={toxicPortraitCredit.file}
            alt={toxicPortraitCredit.alt}
            width={1204}
            height={1746}
            sizes="(min-width: 48rem) 58vw, 116vw"
            preload
          />
        </div>
        <div className="hero__wash hero__wash--brass" aria-hidden="true" />
        <div className="hero__wash hero__wash--floor" aria-hidden="true" />
      </div>

      <div className="hero__inner shell" ref={reveal}>
        <div className="hero__kicker lit">
          <span className="eyebrow">{toxicFrame.genre}</span>
          <span className="hero__kn" lang="kn">
            ಕನ್ನಡ
          </span>
          <span className="eyebrow">English</span>
        </div>

        <h1 className="hero__title plate lit" data-lit-index="1">
          {toxic.title}
        </h1>

        <p className="hero__sub lit" data-lit-index="2">
          {toxic.subtitle}
        </p>

        <dl className="hero__facts lit" data-lit-index="3">
          <div>
            <dt className="eyebrow">In cinemas</dt>
            <dd><b>{toxic.releaseDate}</b></dd>
          </div>
          <div>
            <dt className="eyebrow">Directed by</dt>
            <dd><b>{toxic.director}</b></dd>
          </div>
          <div>
            <dt className="eyebrow">Runtime</dt>
            <dd><b>{toxic.runtime}</b></dd>
          </div>
          <div>
            <dt className="eyebrow">Certificate</dt>
            <dd><b>A (CBFC)</b></dd>
          </div>
        </dl>

        <div className="hero__cue" aria-hidden="true">
          <Chevron strokeWidth={2} />
          <span className="eyebrow">Scroll</span>
        </div>
      </div>
    </header>
  );
}
