"use client";

import Image from "next/image";
import { useCallback } from "react";
import { identity } from "@/data/yash";
import { useParallax, usePointerTilt } from "@/lib/scroll";
import { useReveal } from "@/lib/reveal";

export default function Hero() {
  const { ref: tiltRef } = usePointerTilt(1);
  const parallaxRef = useParallax<HTMLElement>(1);
  const reveal = useReveal<HTMLDivElement>(0.1);

  /*
   * Both hooks write custom properties onto the same element — the tilt writes
   * --tx/--ty, the parallax writes --p — and every layer below inherits them.
   * One element, so one merged ref rather than a wrapper div per hook.
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
      <div className="hero__stage" aria-hidden="true">
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__portrait">
          <Image
            src="/yash/portrait-main.jpg"
            alt=""
            width={1693}
            height={2400}
            sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 56vw, 90vw"
            priority
          />
        </div>
        <div className="hero__horizon" />
      </div>

      <div className="hero__inner shell" ref={reveal}>
        {/*
          Latin and Kannada as one lockup. The script used to exist only as an
          aria-hidden watermark, so it was announced nowhere and visible
          nowhere; here it is part of the name and part of the accessible name.
        */}
        <h1 className="hero__name n-venom lit tube">
          {identity.stageName}{" "}
          <span className="hero__kn" lang="kn">
            {identity.kannadaName}
          </span>
        </h1>

        <p className="hero__birth lit" data-lit-index="1">
          {identity.birthName}
        </p>

        <p className="hero__epithet lit" data-lit-index="2">
          <span>{identity.epithet}</span>{" "}
          <span lang="kn">{identity.epithetKannada}</span>
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
