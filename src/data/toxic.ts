/**
 * Every fact in this file is sourced from en.wikipedia.org/wiki/Toxic_(2026_film).
 * Nothing here is invented. Same rule as src/data/yash.ts: if a figure is not in
 * the source article, it does not appear on the page.
 */

export const TOXIC_SOURCE_URL = "https://en.wikipedia.org/wiki/Toxic_(2026_film)";

export const toxic = {
  title: "Toxic",
  subtitle: "A Fairy Tale for Grown-Ups",
  tagline: "Post-independence Goa. Loyalty, violence, and the price of redemption.",
  director: "Geetu Mohandas",
  cinematographer: "Rajeev Ravi",
  editor: "Ujwal Kulkarni",
  score: "Ravi Basrur",
  releaseDate: "26 August 2026",
  /** Used only for the days-remaining readout, which is computed client-side. */
  releaseISO: "2026-08-26",
  releaseNote: "Standard and IMAX, worldwide — timed to Onam.",
  runtime: "194 minutes",
  languages: "Kannada and English",
  dubs: "Also released in Hindi, Tamil, Telugu and Malayalam.",
  budget: "₹850–1,000 crore",
  budgetNote: "One of the most expensive Indian films ever made.",
  premise:
    "A gangster navigates loyalty, morality and the struggle for personal redemption in a post-independence Goa where violence and jealousy reign — a film about what love and redemption cost in the dark.",
} as const;

/** Yash takes both halves of the lead. The teaser credits them in this order. */
export const toxicRoles = [
  {
    name: "Raya",
    note: "The father. The first of the two halves Yash carries in this film.",
  },
  {
    name: "Rumi",
    alias: "Ticket",
    note: "Raya's son. The second half of the dual role, and the other end of the story.",
  },
] as const;

export const toxicCast = [
  { actor: "Kiara Advani", role: "Nadia", note: "Rumi's mother" },
  { actor: "Nayanthara", role: "Ganga", note: "Raya's sister" },
  { actor: "Huma Qureshi", role: "Elizabeth" },
  { actor: "Tara Sutaria", role: "Rebecca" },
  { actor: "Rukmini Vasanth", role: "Mellisa" },
  { actor: "Akshay Oberoi", role: "Tony" },
  { actor: "Darrell D'Silva", role: "Salvador" },
  { actor: "Sudev Nair", role: "Karmadi" },
] as const;

/** The production figures the article actually states. */
export const toxicScale = [
  {
    figure: "₹850–1,000 cr",
    label: "Budget",
    note: "Among the most expensive films ever made in India.",
  },
  {
    figure: "20 acres",
    label: "Standing set",
    note: "Built near Bengaluru to rebuild the years from the 1940s to the 1970s.",
  },
  {
    figure: "1,000+",
    label: "Crew",
    note: "Alongside 450 actors, foreign extras among them.",
  },
  {
    figure: "194 min",
    label: "Runtime",
    note: "Shot in Kannada and English at once.",
  },
] as const;

/** A production timeline, in the order the article gives it. */
export const toxicTimeline = [
  {
    date: "April 2023",
    title: "The collaboration surfaces",
    body: "Reports place Yash with director Geetu Mohandas for his first project after KGF, tentatively carried as Yash 19.",
  },
  {
    date: "8 December 2023",
    title: "Announced with its title",
    body: "KVN Productions and Yash's own Monster Mind Creations make it official, and the announcement video carries the name Toxic.",
  },
  {
    date: "August 2024",
    title: "Principal photography",
    body: "Filming opens in Bengaluru with the pooja ceremony. Stunt sequences are previsualised before they are shot.",
  },
  {
    date: "September 2024",
    title: "Twenty acres of period",
    body: "The main schedule moves to a 20-acre set near Bengaluru recreating the 1940s to the 1970s — over 1,000 crew and 450 actors.",
  },
  {
    date: "8 January 2026",
    title: "Raya, on his fortieth",
    body: "The glimpse of the first character lands on Yash's birthday and takes over 200 million views and 5.5 million likes in a single day.",
  },
  {
    date: "8 August 2026",
    title: "The trailer",
    body: "Revealed at an event in Bengaluru with the cast and crew, Shiva Rajkumar among them.",
  },
  {
    date: "26 August 2026",
    title: "Release",
    body: "Standard and IMAX, worldwide, on Onam. Lionsgate carries the English-language version.",
  },
] as const;

export const toxicSound = {
  released: "13 August 2026",
  label: "Zee Music Company",
  length: "30:09",
  composers:
    "Vishal Mishra, Ravi Basrur, Tanishk Bagchi, Faheem Abdullah and Arslan Nizami",
  scoreNote: "Ravi Basrur also carries the background score — his third film with Yash after KGF.",
  singles: [
    { name: "Tabaahi", date: "2 March 2026" },
    { name: "Manamohaka", date: "21 July 2026" },
  ],
} as const;
