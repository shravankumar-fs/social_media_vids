"use client";

import Image from "next/image";
import { identity } from "@/data/yash";
import { useParallax, usePointerTilt } from "@/lib/scroll";
import { useReveal } from "@/lib/reveal";

export default function Hero() {
  /*
   * Two custom-property writers, one per element rather than one merged ref:
   * the tilt writes --tx/--ty on the header, and every layer below inherits
   * them; the parallax writes --p on the stage, which is the only subtree that
   * reads it. Sharing a single element would mean assigning to a ref a hook
   * returned, which React 19 does not allow.
   */
  const { ref: shell } = usePointerTilt(1);
  const stage = useParallax<HTMLDivElement>(1);
  const reveal = useReveal<HTMLDivElement>(0.1);

  return (
    <header className="hero grain" ref={shell}>
      <div className="hero__stage" ref={stage} aria-hidden="true">
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__portrait">
          <Image
            src="/yash/portrait-main.jpg"
            alt=""
            width={1693}
            height={2400}
            sizes="(min-width: 64rem) 42vw, 96vw"
            priority
          />
        </div>
        <div className="hero__horizon" />
        {/* Inside the stage because it is a depth layer and reads --p. */}
        <p className="hero__mark">{identity.kannadaName}</p>
      </div>

      <div className="hero__inner shell" ref={reveal}>
        <p className="eyebrow lit">{identity.industry}</p>

        <h1 className="hero__name n-venom lit tube" data-lit-index="1">
          {identity.stageName}
          <span className="hero__kn">{identity.birthName}</span>
        </h1>

        <p className="hero__epithet lit" data-lit-index="2">
          <span className="n-cyan">{identity.epithet}</span>
          <span className="eyebrow">{identity.epithetKannada}</span>
        </p>

        <p className="hero__meta lit" data-lit-index="3">
          {identity.summary}
        </p>

        <ul className="hero__facts lit" data-lit-index="4">
          <li>
            <span className="eyebrow">Born</span>
            <b>{identity.born}</b>
          </li>
          <li>
            <span className="eyebrow">Birthplace</span>
            <b>{identity.birthplace}</b>
          </li>
          <li>
            <span className="eyebrow">Works as</span>
            <b>{identity.occupation}</b>
          </li>
        </ul>
      </div>

      <div className="hero__cue shell" aria-hidden="true">
        <i />
        <span className="eyebrow">Scroll</span>
      </div>
    </header>
  );
}
