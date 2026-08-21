"use client";

import { useEffect } from "react";

/* ---------------------------------------------------------------------------
 * One scroll-driven signal for every neon surface on /celebs/toxic02.
 *
 * The brief asked for the glow to animate "in a synchronised manner as we
 * scroll down". The way to get that is not to animate each element — a dozen
 * independent keyframe timers drift apart within seconds and read as noise.
 * Instead a single rAF writes two custom properties onto the route root and
 * every glow is authored as a function of them, so the whole page brightens
 * and settles as one instrument.
 *
 *   --sync   0..1, a smooth swell tied to scroll DISTANCE, not to wall time.
 *            Stop scrolling and it holds wherever it is: the page is lit by
 *            the reader's movement rather than by a metronome.
 *   --depth  0..1, absolute progress down the document, for anything that
 *            should build once across the whole page rather than oscillate.
 *
 * Costs nothing at rest: the loop only runs while a scroll is actually being
 * consumed, and parks itself once the eased value catches up.
 * ------------------------------------------------------------------------- */

const PERIOD = 900; // px of scroll per full swell

export function useScrollPulse(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion gets a fixed, mid-strength glow. The neon still reads as
    // neon; it simply stops responding to the scroll.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--sync", "0.65");
      el.style.setProperty("--depth", "0.5");
      return;
    }

    let raf = 0;
    let current = 0;
    let target = 0;

    const read = () => {
      const y = window.scrollY;
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      target = y;
      el.style.setProperty("--depth", Math.min(1, y / max).toFixed(4));
    };

    const tick = () => {
      // Ease toward the true scroll position so the swell lags the finger
      // slightly — the glow feels like it has mass.
      current += (target - current) * 0.08;
      const swell = (Math.sin((current / PERIOD) * Math.PI * 2) + 1) / 2;
      el.style.setProperty("--sync", swell.toFixed(4));
      if (Math.abs(target - current) < 0.5) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      read();
      if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
    };

    read();
    current = target;
    tick();

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, [ref]);
}
