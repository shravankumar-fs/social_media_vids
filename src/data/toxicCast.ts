/**
 * Cast portraits for /celebs/toxic02.
 *
 * Each file was pulled from Wikimedia Commons via the API, and its author and
 * licence were read from the file's own `extmetadata` rather than assumed. One
 * entry per file: a portrait cannot appear on the page without the credit that
 * makes publishing it lawful, and a credit cannot outlive its portrait.
 *
 * Only the five performers whose roles the article names are shown. The rest of
 * the ensemble is listed as text in the same section, which is the honest way to
 * carry names we have no free portrait for.
 */

export type CastPortrait = {
  actor: string;
  role: string;
  note?: string;
  src: string;
  w: number;
  h: number;
  alt: string;
  author: string;
  licence: string;
  licenceUrl: string;
  sourceUrl: string;
};

const BY30 = "https://creativecommons.org/licenses/by/3.0/";
const BYSA40 = "https://creativecommons.org/licenses/by-sa/4.0/";

export const castPortraits: CastPortrait[] = [
  {
    actor: "Kiara Advani",
    role: "Nadia",
    note: "Rumi's mother",
    src: "/toxic/cast-kiara.jpg",
    w: 500,
    h: 625,
    alt: "Kiara Advani photographed at a film screening",
    author: "Bollywood Hungama",
    licence: "CC BY 3.0",
    licenceUrl: BY30,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kiara_Advani_snapped_at_the_screening_of_Shershaah_(cropped).jpg",
  },
  {
    actor: "Nayanthara",
    role: "Ganga",
    note: "Raya's sister",
    src: "/toxic/cast-nayanthara.jpg",
    w: 244,
    h: 286,
    alt: "Nayanthara photographed in 2023",
    author: "Bollywood Hungama",
    licence: "CC BY 3.0",
    licenceUrl: BY30,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Nayanthara_in_2023_(cropped).jpg",
  },
  {
    actor: "Huma Qureshi",
    role: "Elizabeth",
    src: "/toxic/cast-huma.jpg",
    w: 500,
    h: 750,
    alt: "Huma Qureshi photographed at the Toronto International Film Festival",
    author: "Gabriel Hutchinson",
    licence: "CC BY-SA 4.0",
    licenceUrl: BYSA40,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Huma_Qureshi_at_TIFF_2025_02.jpg",
  },
  {
    actor: "Tara Sutaria",
    role: "Rebecca",
    src: "/toxic/cast-tara.jpg",
    w: 348,
    h: 466,
    alt: "Tara Sutaria photographed in Bandra, Mumbai",
    author: "Bollywood Hungama",
    licence: "CC BY 3.0",
    licenceUrl: BY30,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tara_Sutaria_snapped_at_Gigi_restaurant_in_Bandra_(cropped_2).jpg",
  },
  {
    actor: "Rukmini Vasanth",
    role: "Mellisa",
    src: "/toxic/cast-rukmini.jpg",
    w: 500,
    h: 725,
    alt: "Rukmini Vasanth photographed at a press event",
    author: "Sambrama News",
    licence: "CC BY 3.0",
    licenceUrl: BY30,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rukmini_Vasanth1.jpg",
  },
];
