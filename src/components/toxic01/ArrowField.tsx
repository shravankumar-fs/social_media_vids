"use client";

import Chevron from "./Chevron";

/**
 * Three oversized chevrons behind a band.
 *
 * The brief asked for a subtle arrow that arrives in the background as the
 * page scrolls, and this is it. Each mark reads `--p` and `--pc` from the
 * band it sits in — written once a frame by the single rAF loop in
 * lib/scroll.ts — and the CSS turns those into a drift against the scroll
 * plus an opacity curve of 4p(1-p): invisible at both edges of the band, at
 * its faintest peak dead centre. Nothing here animates on a timer, so a
 * stationary page costs nothing.
 *
 * Peak opacity tops out at 0.055, on a hairline stroke. Both numbers were
 * pulled down after looking at it: at 0.085 on a 15px-thick stroke these read
 * as three large graphic chevrons rather than as texture. It is meant to be
 * felt rather than read, and must never compete with the type over it.
 */
export default function ArrowField() {
  return (
    <div className="arrowfield" aria-hidden="true">
      <div className="arrowfield__mark arrowfield__mark--a">
        <Chevron strokeWidth={0.22} />
      </div>
      <div className="arrowfield__mark arrowfield__mark--b">
        <Chevron strokeWidth={0.3} />
      </div>
      <div className="arrowfield__mark arrowfield__mark--c">
        <Chevron strokeWidth={0.42} />
      </div>
    </div>
  );
}
