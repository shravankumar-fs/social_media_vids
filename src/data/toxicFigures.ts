/**
 * The two cut-out figures the layout is built around.
 *
 * Both are transparent PNGs, which is what lets the fire aura sit BEHIND the
 * figure as a real rim-light. A rectangular photograph cannot do that — its own
 * background occludes anything placed underneath — so `ready` is what the hero
 * reads to decide whether the aura goes behind the figure or is screen-blended
 * in front of it.
 */

export type Figure = {
  src: string;
  w: number;
  h: number;
  alt: string;
  /** True when `src` is a transparent cut-out rather than a full photograph. */
  ready: boolean;
};

export const figures: Record<"hero" | "feature", Figure> = {
  hero: {
    src: "/toxic/yash01.png",
    w: 1086,
    h: 1448,
    alt: "",
    ready: true,
  },
  feature: {
    src: "/toxic/yash02.png",
    w: 1086,
    h: 1448,
    alt: "",
    ready: true,
  },
};
