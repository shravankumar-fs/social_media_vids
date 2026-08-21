"use client";

import { useCallback, useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
 * A torch carried across an image.
 *
 * The element keeps its image at full strength; an overlay darkens everything
 * the light is not on, and the hole in that overlay follows the pointer. So the
 * resting state is the good state, and the effect costs one element rather than
 * a second copy of the file.
 *
 * Pointer-only, decided at event time rather than at render time: branching on
 * `window` while rendering would differ between server and client. The handlers
 * are always attached and simply do nothing on a coarse pointer — which is the
 * phone this page is built for, where there is no cursor to carry anything.
 * ------------------------------------------------------------------------- */

export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const elRef = useRef<T>(null);
  const raf = useRef(0);
  const pos = useRef({ x: 50, y: 50 });
  const fine = useRef(false);

  useEffect(() => {
    fine.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const id = raf;
    return () => cancelAnimationFrame(id.current);
  }, []);

  const write = useCallback(() => {
    raf.current = 0;
    const el = elRef.current;
    if (!el) return;
    el.style.setProperty("--mx", `${pos.current.x}%`);
    el.style.setProperty("--my", `${pos.current.y}%`);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (!fine.current) return;
      const el = elRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pos.current = {
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      };
      // Coalesced to one write a frame; pointermove fires far faster than that.
      if (!raf.current) raf.current = requestAnimationFrame(write);
    },
    [write],
  );

  const onPointerEnter = useCallback(() => {
    if (!fine.current) return;
    elRef.current?.setAttribute("data-lit", "true");
  }, []);

  const onPointerLeave = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    el.removeAttribute("data-lit");
    // Park the beam centred so the next entry has nothing to jump from.
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }, []);

  return { elRef, onPointerMove, onPointerEnter, onPointerLeave };
}
