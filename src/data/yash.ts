/**
 * Every fact in this file is sourced from en.wikipedia.org/wiki/Yash_(actor).
 * Nothing here is invented. If a number is not in the source, it is not on the page.
 */

export const SOURCE_URL = "https://en.wikipedia.org/wiki/Yash_(actor)";

export const identity = {
  stageName: "Yash",
  kannadaName: "ಯಶ್",
  birthName: "Naveen Kumar Gowda",
  epithet: "Rocking Star",
  epithetKannada: "ರಾಕಿಂಗ್ ಸ್ಟಾರ್",
  born: "8 January 1986",
  birthplace: "Boovanahalli, Hassan district, Karnataka",
  occupation: "Actor · Producer",
  industry: "Kannada cinema",
  summary:
    "Naveen Kumar Gowda, known professionally as Yash, is an Indian actor and producer who works in Kannada cinema — a recipient of three Filmfare Awards South and five SIIMA Awards.",
} as const;

/** The origin band. A Hoysala frieze reads left to right; so does this. */
export const originFrieze = [
  {
    id: "hassan",
    year: "1986",
    title: "Boovanahalli",
    body: "Born in a village in Hassan district. His father Arun Kumar drove buses for the KSRTC and later the BMTC; his mother Pushpa kept the house. A sister, Nandini.",
  },
  {
    id: "three-hundred",
    year: "2002",
    title: "Three hundred rupees",
    body: "He left for Bangalore at sixteen carrying ₹300 — worth about ₹1,100 today. His parents had wanted a government officer, and opposed the acting outright.",
  },
  {
    id: "benaka",
    year: "2003",
    title: "Fifty rupees a day",
    body: "He joined B. V. Karanth's Benaka drama troupe and worked the stage for ₹50 a day. The theatre, not a film school, is where the craft was cut.",
  },
  {
    id: "television",
    year: "2004",
    title: "The small screen",
    body: "Television took him first: Uttarayana, then Nanda Gokula, Preeti Illada Mele, Male Billu and Shiva. On the set of Nanda Gokula in 2007 he met Radhika Pandit.",
  },
  {
    id: "debut",
    year: "2007",
    title: "Jambada Hudugi",
    body: "The film debut. One year later Moggina Manasu would win him a Filmfare Award and make the name stick.",
  },
] as const;

export type FilmTier = "landmark" | "major" | "notable";

export const filmography: {
  year: string;
  title: string;
  note: string;
  tier: FilmTier;
  figure?: string;
  figureLabel?: string;
}[] = [
  {
    year: "2007",
    title: "Jambada Hudugi",
    note: "Film debut, after three years on Kannada television.",
    tier: "notable",
  },
  {
    year: "2008",
    title: "Moggina Manasu",
    note: "As Rahul. The breakthrough — and a Filmfare Award South for Best Supporting Actor, Kannada.",
    tier: "major",
  },
  {
    year: "2010",
    title: "Modalasala",
    note: "His first solo box-office hit as a lead.",
    tier: "notable",
  },
  {
    year: "2011",
    title: "Kirataka",
    note: "₹30 million domestic. The top-grossing Kannada film of its year.",
    tier: "notable",
    figure: "₹3 cr",
    figureLabel: "domestic",
  },
  {
    year: "2012",
    title: "Drama",
    note: "Among the highest-grossing Kannada films of 2012.",
    tier: "notable",
  },
  {
    year: "2013",
    title: "Googly",
    note: "The college romance that set the mass-hero image. Raja Huli followed the same year.",
    tier: "notable",
  },
  {
    year: "2014",
    title: "Gajakesari",
    note: "A dual role, and the year's other hit.",
    tier: "notable",
  },
  {
    year: "2014",
    title: "Mr. and Mrs. Ramachari",
    note: "Opposite Radhika Pandit. Around ₹50 crore, among the highest-grossing Kannada films made, and a second Filmfare — this time Best Actor.",
    tier: "major",
    figure: "₹50 cr",
    figureLabel: "gross",
  },
  {
    year: "2016",
    title: "Santhu Straight Forward",
    note: "A ₹30 crore collection.",
    tier: "notable",
    figure: "₹30 cr",
    figureLabel: "gross",
  },
  {
    year: "2018",
    title: "KGF: Chapter 1",
    note: "As Raja Krishnappa Bairya — Rocky Bhai. Built on an ₹80 crore budget, the most expensive Kannada film to that point, and the highest-grossing one by the end of its run.",
    tier: "landmark",
    figure: "₹80 cr",
    figureLabel: "budget",
  },
  {
    year: "2022",
    title: "KGF: Chapter 2",
    note: "With Sanjay Dutt and Raveena Tandon. Over ₹10 billion worldwide — the fourth highest-grossing Indian film ever made, and the highest-grossing Kannada film in the world.",
    tier: "landmark",
    figure: "₹1,000 cr+",
    figureLabel: "worldwide",
  },
];

export const kgf = {
  role: "Raja Krishnappa Bairya",
  alias: "Rocky Bhai",
  director: "Prashanth Neel",
  budgetChapter1: "₹80 crore",
  grossChapter2: "over ₹10 billion",
  rank: "4th highest-grossing Indian film of all time",
  lines: [
    {
      k: "Chapter 1 budget",
      v: "₹80 crore",
      note: "the most expensive Kannada film at the time",
    },
    {
      k: "Chapter 2 worldwide",
      v: "₹10 billion+",
      note: "the highest-grossing Kannada film worldwide",
    },
    {
      k: "All-India rank",
      v: "No. 4",
      note: "among all Indian films ever released",
    },
  ],
} as const;

export const awards = [
  {
    body: "Filmfare Awards South",
    count: "3 wins",
    detail: "from 8 nominations",
    items: [
      "Best Supporting Actor – Kannada · Moggina Manasu · 2009",
      "Best Actor – Kannada · Mr. and Mrs. Ramachari · 2015",
      "Best Actor – Kannada · KGF: Chapter 1 · 2019",
    ],
  },
  {
    body: "SIIMA Awards",
    count: "5 wins",
    detail: "South Indian International Movie Awards",
    items: [
      "Best Actor – Kannada · Mr. and Mrs. Ramachari · 2015",
      "Best Actor – Kannada · KGF: Chapter 1 · 2019",
      "Best Actor Critics – Kannada · KGF: Chapter 1 · 2019",
      "Style Icon of the Year · 2019",
      "Best Actor – Kannada · KGF: Chapter 2 · 2022",
    ],
  },
  {
    body: "IIFA Utsavam",
    count: "1 win",
    detail: "2016",
    items: ["Best Actor – Kannada · 2016"],
  },
  {
    body: "Forbes India",
    count: "Cover",
    detail: "2019",
    items: [
      "First Kannada actor on the cover of Forbes India · 2019",
      "Third most influential South Indian celebrity on Instagram · October 2021",
    ],
  },
] as const;

export const sanctum = {
  spouse: "Radhika Pandit",
  met: "on the set of Nanda Gokula, 2007",
  engaged: "Goa, 12 August 2016",
  married: "9 December 2016",
  children: "A daughter, Ayra. A son, Yatharv.",
} as const;

/** Hoysala temples carved their endowments into the plinth. So does this. */
export const endowment = {
  name: "Yasho Marga Foundation",
  founded: "Established 2017 with Radhika Pandit",
  records: [
    {
      figure: "₹4 crore",
      body: "Put toward desilting the lakes of Koppal district, against the water crisis there — the foundation's first work.",
    },
    {
      figure: "40 villages",
      body: "Given a supply of clean drinking water as a result.",
    },
    {
      figure: "3,000 workers",
      body: "Kannada film-industry workers each sent ₹5,000 through the 2021 pandemic.",
    },
  ],
} as const;

/** Halebidu's carvings were never finished. Neither are these. */
export const unfinished = [
  {
    year: "2026",
    title: "Toxic",
    body: "A dual role — Raya and Rumi, called Ticket. Shot simultaneously in English. He is also its co-writer and producer.",
  },
  {
    year: "2026",
    title: "Ramayana · Part 1",
    body: "His Hindi debut, as Ravana. He co-produces.",
  },
  {
    year: "2027",
    title: "Ramayana · Part 2",
    body: "The role continues. Currently filming.",
  },
] as const;

export type Credit = {
  file: string;
  author: string;
  licence: string;
  licenceUrl: string;
  pageUrl: string;
};

/** CC BY-SA and CC BY both require visible attribution. It lives in the colophon. */
export const imageCredits: Credit[] = [
  {
    file: "portrait-main.jpg",
    author: "Anish1121",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    pageUrl: "https://commons.wikimedia.org/wiki/File:Yash_Actor.jpg",
  },
  {
    file: "kgf-press.jpg / kgf-press-crop.jpg / kgf-vishal-crop.jpg",
    author: "Dani Charles, Silverscreen Media Inc.",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    pageUrl:
      "https://commons.wikimedia.org/wiki/File:Yash_At_The_%E2%80%98KGF%E2%80%99_Press_Meet_In_Chennai.jpg",
  },
  {
    file: "kgf2-neel.jpg / kgf2-crop.jpg / kgf2-cast-crop.jpg",
    author: "Sriram Narasimhan, Silverscreen Media Inc.",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    pageUrl:
      "https://commons.wikimedia.org/wiki/File:Prashanth_Neel,_Yash_Promote_KGF_Chapter_2_in_Chennai.jpg",
  },
  {
    file: "hungama-tall.jpg / kgf2-promo.jpg / kgf-event.jpg",
    author: "Bollywood Hungama",
    licence: "CC BY 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by/3.0/",
    pageUrl:
      "https://commons.wikimedia.org/wiki/File:Yash_Kannada_actor.jpg",
  },
];
