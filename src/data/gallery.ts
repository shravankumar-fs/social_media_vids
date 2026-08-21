/**
 * The published gallery for /celebs/yash_01.
 *
 * Captions, alt text and credits live together here, in `src/data`, so they
 * inherit the same sourcing discipline as every other fact on the page. They
 * were previously authored inline in the component, outside that rule — which
 * is how a seated interview acquired the caption "KGF: Chapter 2 promotions".
 *
 * Every entry below is a photograph of the subject that has been looked at.
 * Three files were cut for cause and are deliberately not published here:
 *   - kgf-vishal-crop.jpg — the same exposure as kgf-press-crop.jpg (identical
 *     pose, shirt, backdrop and watermark), and it carried the same caption.
 *   - kgf2-crop.jpg       — a crop of kgf2-neel.jpg, two cells away.
 *   - kgf2-cast-crop.jpg  — not the subject. An identifiable private
 *     individual, cropped out of a group photograph.
 *   - kgf2-promo.jpg, kgf-event.jpg — retained on disk but unpublished: their
 *     per-file source page could not be verified, and both upscale badly.
 */

export type Shot = {
  src: string;
  w: number;
  h: number;
  /** Describes only what is visible. No occasion is asserted without a source. */
  alt: string;
  caption: string;
  /** Index into `galleryCredits`. */
  credit: string;
  shape?: "wide";
  depth: number;
};

export const shots: Shot[] = [
  {
    src: "/yash/kgf-press.jpg",
    w: 1800,
    h: 1200,
    alt: "Yash speaking at a podium at the KGF press meet in Chennai",
    caption: "KGF press meet, Chennai",
    credit: "press-meet",
    shape: "wide",
    depth: 0.5,
  },
  {
    src: "/yash/kgf2-neel.jpg",
    w: 2048,
    h: 1365,
    alt: "Yash seated with director Prashanth Neel while promoting KGF: Chapter 2 in Chennai",
    caption: "With Prashanth Neel, promoting KGF: Chapter 2",
    credit: "kgf2",
    shape: "wide",
    depth: 0.8,
  },
  {
    src: "/yash/hungama-tall.jpg",
    w: 916,
    h: 1582,
    alt: "Yash in a black tuxedo and bow tie at a public appearance",
    caption: "Public appearance",
    credit: "hungama",
    depth: 1.3,
  },
  {
    src: "/yash/kgf-press-crop.jpg",
    w: 551,
    h: 664,
    alt: "Yash with folded arms at the KGF press meet in Chennai",
    caption: "KGF press meet",
    credit: "press-meet",
    depth: 1.0,
  },
];

export type GalleryCredit = {
  id: string;
  author: string;
  licence: string;
  licenceUrl: string;
  sourceUrl: string;
  /** Set when one link covers more than one frame from the same coverage. */
  note?: string;
};

/**
 * One entry per photographer, linked from every file that uses it, so a
 * published plate can never drift away from its credit.
 */
export const galleryCredits: GalleryCredit[] = [
  {
    id: "press-meet",
    author: "Dani Charles, Silverscreen Media Inc.",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Yash_At_The_%E2%80%98KGF%E2%80%99_Press_Meet_In_Chennai.jpg",
    note: "Two frames from this photographer's coverage of the same press meet.",
  },
  {
    id: "kgf2",
    author: "Sriram Narasimhan, Silverscreen Media Inc.",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Prashanth_Neel,_Yash_Promote_KGF_Chapter_2_in_Chennai.jpg",
  },
  {
    id: "hungama",
    author: "Bollywood Hungama",
    licence: "CC BY 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Yash_Kannada_actor.jpg",
  },
];

/** The portrait behind the hero, credited separately from the gallery. */
export const portraitCredit: GalleryCredit = {
  id: "portrait",
  author: "Anish1121",
  licence: "CC BY-SA 4.0",
  licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Yash_Actor.jpg",
};
