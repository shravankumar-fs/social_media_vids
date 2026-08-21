"use client";

import { useRef } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/toxic02/Hero";
import Frame from "@/components/toxic02/Frame";
import Roles from "@/components/toxic02/Roles";
import Scale from "@/components/toxic02/Scale";
import Ensemble from "@/components/toxic02/Ensemble";
import Campaign from "@/components/toxic02/Campaign";
import Release from "@/components/toxic02/Release";
import Colophon from "@/components/toxic02/Colophon";
import Spiral from "@/components/toxic02/Spiral";
import { useScrollPulse } from "@/lib/pulse";

export default function Toxic02Page() {
  const root = useRef<HTMLDivElement>(null);

  /*
   * One scroll signal for the whole page. Every neon surface is authored as a
   * function of --sync and --depth, so they brighten and settle together
   * rather than each running its own timer and drifting apart.
   */
  useScrollPulse(root);

  return (
    <div ref={root}>
      <SmoothScroll />

      {/* One fixed background mark for the whole scroll, drawn by --depth. */}
      <Spiral />

      {/*
        Hero and Colophon sit outside <main>: per HTML-AAM a <header> or
        <footer> nested inside <main> is demoted to `generic`, which would
        leave the page exposing no banner and no contentinfo landmark.
      */}
      <Hero />

      <main>
        <Frame />
        <Roles />
        <Scale />
        <Ensemble />
        <Campaign />
        <Release />
      </main>

      <Colophon />
    </div>
  );
}
