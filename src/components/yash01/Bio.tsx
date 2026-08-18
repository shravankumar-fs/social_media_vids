"use client";

import { originFrieze, filmography } from "@/data/yash";
import { useReveal } from "@/lib/reveal";

/** The origin story, as a lit rail of dated beats. */
export function Bio() {
  const reveal = useReveal<HTMLElement>(0.1);

  return (
    <section className="sec" id="bio" ref={reveal} aria-labelledby="bio-title">
      <div className="shell">
        <p className="eyebrow lit">Bio</p>
        <h2 id="bio-title" className="h2 lit tube" data-lit-index="1">
          Three hundred rupees and a bus to Bangalore
        </h2>
        <p className="lede lit" data-lit-index="2">
          Naveen Kumar Gowda left Hassan district at sixteen. What follows is
          the road from a village to the highest-grossing Kannada film ever
          made.
        </p>

        <div className="bio__grid">
          {originFrieze.map((beat, i) => (
            <article className="beat lit" data-lit-index={i} key={beat.id}>
              <p className="beat__year">{beat.year}</p>
              <div>
                <h3 className="beat__title">{beat.title}</h3>
                <p className="beat__body">{beat.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The filmography. Tier is carried by light — only landmarks glow. */
export function Films() {
  const reveal = useReveal<HTMLElement>(0.05);

  return (
    <section className="sec" ref={reveal} aria-labelledby="films-title">
      <div className="shell">
        <p className="eyebrow lit">Filmography</p>
        <h2 id="films-title" className="h2 lit tube" data-lit-index="1">
          The work
        </h2>
        <p className="lede lit" data-lit-index="2">
          Selected features, from the 2007 debut to a film that took over ₹10
          billion worldwide.
        </p>

        <div className="films">
          {filmography.map((f, i) => (
            <article
              className="film lit"
              data-tier={f.tier}
              data-lit-index={Math.min(i, 6)}
              key={`${f.year}-${f.title}`}
            >
              <p className="film__year">{f.year}</p>
              <h3 className="film__title">{f.title}</h3>
              <p className="film__note">{f.note}</p>
              {f.figure ? (
                <p className="film__figure">
                  <b>{f.figure}</b>
                  <span>{f.figureLabel}</span>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
