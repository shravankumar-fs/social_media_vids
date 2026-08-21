"use client";

import { useParallax } from "@/lib/scroll";
import Chevron from "./Chevron";

/**
 * The divider that sits in the gap between two bands: a hairline with a
 * single chevron riding on it, lifting and brightening as it crosses the
 * middle of the screen. Same signal and same curve as ArrowField, so the
 * seams and the background marks move as one thing.
 *
 * It has zero height and no pointer surface — it decorates the space the
 * bands already leave, and never adds any of its own.
 */
export default function Seam() {
  const ref = useParallax<HTMLDivElement>(1);

  return (
    <div className="seam" ref={ref} aria-hidden="true">
      <div className="seam__mark">
        <Chevron strokeWidth={2} />
      </div>
    </div>
  );
}
