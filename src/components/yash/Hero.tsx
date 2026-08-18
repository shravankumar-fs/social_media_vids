"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import Image from "next/image";
import { identity } from "@/data/yash";
import { useCanRender3d, usePointerTilt } from "@/lib/scroll";

const NicheCanvas = lazy(() => import("./NicheCanvas"));

export default function Hero() {
  // The tilt hook writes --tx/--ty straight onto the header, so the DOM layer
  // and the canvas behind it are driven by one signal and one loop.
  const { ref: shell, value: tilt } = usePointerTilt(1);
  const use3d = useCanRender3d();
  const [onscreen, setOnscreen] = useState(true);

  /*
   * Nothing in this header should cost anything once it is off the screen.
   * The flag stops the WebGL render loop outright and parks the two ambient
   * keyframes — a scene rendering at 60fps behind eight screens of content is
   * the single most expensive thing this page could do on a mid-range phone.
   */
  useEffect(() => {
    const el = shell.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setOnscreen(e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shell]);

  return (
    <header
      ref={shell as React.RefObject<HTMLElement>}
      className="niche grain"
      data-onscreen={onscreen}
    >
      <div className="grain-layer" aria-hidden="true" />

      {/*
        The still portrait is the floor, not the fallback: it renders on every
        device, and the canvas is composited over it once WebGL is confirmed.
        A visitor on a locked-down browser still gets the niche, just carved
        in CSS instead of geometry.
      */}
      <div className="niche__still" aria-hidden={use3d}>
        <div className="niche__opening">
          <Image
            src="/yash/portrait-main.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 64rem) 46vw, 88vw"
            className="niche__photo"
          />
        </div>
      </div>

      {use3d && (
        <div className="niche__canvas">
          <Suspense fallback={null}>
            <NicheCanvas tilt={tilt} active={onscreen} />
          </Suspense>
        </div>
      )}

      <div className="niche__type">
        <p className="niche__above">{identity.epithetKannada}</p>

        {/* The raised gesso under the leaf is drawn by a pseudo-element from
            data-text, so the name exists exactly once in the document. */}
        <h1 className="niche__name">
          <span className="niche__name-leaf" data-text={identity.stageName}>
            {identity.stageName}
          </span>
        </h1>

        <p className="niche__epithet">{identity.epithet}</p>

        <dl className="niche__plinth">
          <div>
            <dt>Born</dt>
            <dd>{identity.birthName}</dd>
          </div>
          <div>
            <dt>Cut from</dt>
            <dd>Boovanahalli, Hassan · 1986</dd>
          </div>
          <div>
            <dt>Works in</dt>
            <dd>{identity.industry}</dd>
          </div>
        </dl>
      </div>

      <p className="niche__cue" aria-hidden="true">
        <span>Walk the wall</span>
        <svg viewBox="0 0 12 34" width="12" height="34" fill="none">
          <path
            d="M6 0v28"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M1.5 23.5 6 29l4.5-5.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </p>
    </header>
  );
}
