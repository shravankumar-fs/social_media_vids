"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* ---------------------------------------------------------------------------
 * One rAF loop for the whole page.
 *
 * Every parallax element registers here and receives `--p`: its progress
 * through the viewport, 0 when its top edge touches the bottom of the screen
 * and 1 when its bottom edge leaves the top. The transform itself lives in
 * CSS, so the loop only ever writes a custom property — no layout reads per
 * element beyond the one rect, and no React re-render.
 * ------------------------------------------------------------------------- */

/**
 * `view` measures an element crossing the viewport — the right range for
 * drift, where the layer should already be moving as it appears.
 *
 * `pin` measures a tall section's *sticky* range instead: 0 when its top
 * reaches the top of the screen, 1 when its bottom reaches the bottom. Pinned
 * horizontal travel has to use this one, because with `view` the travel is
 * already a third spent before the sticky child has even engaged.
 */
type Mode = "view" | "pin";
type Entry = { el: HTMLElement; depth: number; mode: Mode };

const registry = new Set<Entry>();
/*
 * Only elements actually near the viewport are measured each frame. Reading a
 * rect forces layout, so on a page with a dozen registered courses the naive
 * version pays that cost for every one of them, every frame, including the ten
 * that are a screen and a half away. The observer keeps the per-frame set to
 * what is on screen.
 */
const active = new Set<Entry>();
let frame = 0;

let nearby: IntersectionObserver | null = null;
const lookup = new WeakMap<Element, Entry>();

function observer() {
  nearby ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const entry = lookup.get(e.target);
        if (!entry) continue;
        if (e.isIntersecting) active.add(entry);
        else active.delete(entry);
      }
      if (active.size === 0) stop();
      else start();
    },
    { rootMargin: "40% 0px 40% 0px" },
  );
  return nearby;
}

function tick() {
  const vh = window.innerHeight;
  for (const entry of active) {
    const r = entry.el.getBoundingClientRect();
    let p: number;

    if (entry.mode === "pin") {
      const travel = r.height - vh;
      p = travel > 0 ? -r.top / travel : 0;
    } else {
      const span = r.height + vh;
      if (span <= 0) continue;
      p = (vh - r.top) / span;
    }

    p = p < 0 ? 0 : p > 1 ? 1 : p;
    entry.el.style.setProperty("--p", p.toFixed(4));
    // -1..1, centred on the middle of the viewport, for symmetric drift.
    entry.el.style.setProperty("--pc", (p * 2 - 1).toFixed(4));
    entry.el.style.setProperty("--depth", String(entry.depth));
  }
  frame = requestAnimationFrame(tick);
}

function start() {
  if (!frame) frame = requestAnimationFrame(tick);
}

function stop() {
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

/**
 * Drives `--p` / `--pc` / `--depth` on the returned ref. `depth` is a
 * multiplier the CSS uses to decide how far the layer drifts — the further
 * back the plane of a relief, the less it moves.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  depth = 1,
  mode: Mode = "view",
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reduced motion still needs a resting value, or the pinned track
      // would sit at its untranslated start and hide half its content.
      el.style.setProperty("--p", mode === "pin" ? "0" : "0.5");
      el.style.setProperty("--pc", "0");
      el.style.setProperty("--depth", "0");
      return;
    }
    const entry: Entry = { el, depth, mode };
    registry.add(entry);
    lookup.set(el, entry);
    observer().observe(el);
    return () => {
      registry.delete(entry);
      active.delete(entry);
      lookup.delete(el);
      nearby?.unobserve(el);
      if (active.size === 0) stop();
    };
  }, [depth, mode]);

  return ref;
}

/* ---------------------------------------------------------------------------
 * Gilding. The page's single authored motion: an element is already there in
 * bare stone, and the leaf is laid across it when it enters. Once gilded it
 * stays gilded — leaf does not come off.
 * ------------------------------------------------------------------------- */

export function useGild<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.matches(".gild")
      ? [el, ...el.querySelectorAll<HTMLElement>(".gild")]
      : Array.from(el.querySelectorAll<HTMLElement>(".gild"));
    if (targets.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => t.setAttribute("data-gilded", "true"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target as HTMLElement;
          const stagger = Number(t.dataset.gildIndex ?? 0) * 90;
          window.setTimeout(
            () => t.setAttribute("data-gilded", "true"),
            stagger,
          );
          io.unobserve(t);
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}

/* ------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------
 * Can this device afford the WebGL niche?
 *
 * Read through useSyncExternalStore rather than detected in an effect: the
 * answer never changes for the life of the page, so an effect-plus-setState
 * would only buy a second render. The server snapshot is false, so the markup
 * that hydrates is always the CSS carving.
 * ------------------------------------------------------------------------- */

let capable: boolean | null = null;

function detect3d() {
  if (capable !== null) return capable;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      capable = false;
    } else if ((navigator.hardwareConcurrency ?? 8) <= 2) {
      capable = false;
    } else {
      const c = document.createElement("canvas");
      capable = !!(
        window.WebGLRenderingContext &&
        (c.getContext("webgl2") || c.getContext("webgl"))
      );
    }
  } catch {
    capable = false;
  }
  return capable;
}

const neverChanges = () => () => {};

export function useCanRender3d() {
  return useSyncExternalStore(neverChanges, detect3d, () => false);
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Pointer on a mouse, device orientation on a phone, normalised to -1..1 on
 * both axes. The niche and the set stones are tilted by the same signal, so
 * the whole page appears lit and turned by one hand.
 */
export function usePointerTilt(strength = 1) {
  const ref = useRef<HTMLElement | null>(null);
  const value = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const target = { x: 0, y: 0 };

    /*
     * The easing loop runs only while it has somewhere to get to. Once the
     * value has caught up with the pointer it cancels itself, and the next
     * input wakes it — a hand resting still should cost nothing, which on a
     * phone is nearly all of the time.
     */
    const write = () => {
      const dx = target.x - value.current.x;
      const dy = target.y - value.current.y;
      value.current.x += dx * 0.075;
      value.current.y += dy * 0.075;
      const el = ref.current;
      if (el) {
        el.style.setProperty("--tx", value.current.x.toFixed(4));
        el.style.setProperty("--ty", value.current.y.toFixed(4));
      }
      if (Math.abs(dx) < 0.0008 && Math.abs(dy) < 0.0008) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(write);
    };
    const wake = () => {
      if (!raf && !document.hidden) raf = requestAnimationFrame(write);
    };

    const onPointer = (e: PointerEvent) => {
      target.x = ((e.clientX / window.innerWidth) * 2 - 1) * strength;
      target.y = ((e.clientY / window.innerHeight) * 2 - 1) * strength;
      wake();
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      target.x = Math.max(-1, Math.min(1, e.gamma / 32)) * strength;
      target.y = Math.max(-1, Math.min(1, (e.beta - 45) / 32)) * strength;
      wake();
    };
    const onHide = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("deviceorientation", onOrient, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onOrient);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [strength]);

  return { ref, value };
}
