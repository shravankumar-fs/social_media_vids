"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";

/* ---------------------------------------------------------------------------
 * /celebs/yash_01 only.
 *
 * This deliberately does not extend `useGild` in lib/scroll.ts. That hook
 * hardcodes the `.gild` class and drives a gold-leaf band; widening it would
 * mean editing a file the finished /celebs/yash page depends on, to serve a
 * second page with a different motion. The scroll-position and tilt hooks in
 * lib/scroll.ts are generic and are imported as-is — only the reveal differs.
 * ------------------------------------------------------------------------- */

/**
 * Lights `.lit` descendants once as they enter. Neon strikes: the element is
 * already legible in its unlit state, and arriving turns the tube on. It never
 * runs twice — each target is unobserved as it fires.
 */
type RevealOpts = {
  /** Class marking an element that should reveal. */
  cls: string;
  /** Attribute set on it once it has. */
  attr: string;
  /** dataset key carrying a stagger index. */
  indexKey: string;
  /** ms per stagger step. */
  step: number;
};

function useRevealBase<T extends HTMLElement>(
  threshold: number,
  { cls, attr, indexKey, step }: RevealOpts,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.matches(`.${cls}`)
      ? [el, ...el.querySelectorAll<HTMLElement>(`.${cls}`)]
      : Array.from(el.querySelectorAll<HTMLElement>(`.${cls}`));
    if (targets.length === 0) return;

    // Reduced motion gets the final state, never a held-back one.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => t.setAttribute(attr, "true"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target as HTMLElement;
          const stagger = Number(t.dataset[indexKey] ?? 0) * step;
          window.setTimeout(() => t.setAttribute(attr, "true"), stagger);
          io.unobserve(t);
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [threshold, cls, attr, indexKey, step]);

  return ref;
}

/** /celebs/yash_01 — a neon tube striking. Behaviour unchanged. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
) {
  return useRevealBase<T>(threshold, {
    cls: "lit",
    attr: "data-lit",
    indexKey: "litIndex",
    step: 85,
  });
}

/** /celebs/toxic02 — elements lift and warm as they arrive. */
export function useRise<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12,
) {
  return useRevealBase<T>(threshold, {
    cls: "rise",
    attr: "data-in",
    indexKey: "riseIndex",
    step: 90,
  });
}

/**
 * Whole days from now until an ISO date, or null until mounted.
 *
 * Null on the server and on the first client render on purpose: the value
 * depends on the visitor's clock, so rendering it during hydration would
 * mismatch. The markup reserves the space and fills it on mount.
 */
export function useDaysUntil(iso: string) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(`${iso}T00:00:00`).getTime();
    if (Number.isNaN(target)) return;
    const compute = () => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      ).getTime();
      setDays(Math.round((target - midnight) / 86_400_000));
    };
    compute();
    // One re-check an hour is enough for a day counter, and costs nothing.
    const id = window.setInterval(compute, 3_600_000);
    return () => window.clearInterval(id);
  }, [iso]);

  return days;
}
