"use client";

import {
  toxic,
  toxicCast,
  toxicRoles,
  toxicScale,
  toxicSound,
  toxicTimeline,
} from "@/data/toxic";
import { useReveal, useDaysUntil } from "@/lib/reveal";

/**
 * The payoff for the banner at the top. Magenta leads only here, so arriving
 * is a change of light rather than more of the same page.
 */
export default function Toxic() {
  const reveal = useReveal<HTMLElement>(0.05);
  const days = useDaysUntil(toxic.releaseISO);

  return (
    <section
      className="sec toxic grain"
      id="toxic"
      ref={reveal}
      aria-labelledby="toxic-title"
    >
      <div className="shell">
        <p className="eyebrow lit">{toxic.releaseDate}</p>

        <h2 id="toxic-title" className="toxic__word n-magenta lit tube" data-lit-index="1">
          {toxic.title}
        </h2>
        <p className="toxic__sub lit" data-lit-index="2">
          {toxic.subtitle}
        </p>

        <p className="toxic__premise lit" data-lit-index="3">
          {toxic.premise}
        </p>

        {/* --- the dual role */}
        <div className="toxic__block">
          <p className="eyebrow lit">One actor, two parts</p>
          <div className="roles">
            {toxicRoles.map((r, i) => (
              <article className="role lit" data-lit-index={i} key={r.name}>
                <h3 className="role__name">{r.name}</h3>
                {"alias" in r && r.alias ? (
                  <p className="role__alias">Alias &ldquo;{r.alias}&rdquo;</p>
                ) : null}
                <p className="role__note">{r.note}</p>
              </article>
            ))}
          </div>
        </div>

        {/* --- what it took */}
        <div className="toxic__block">
          <p className="eyebrow lit">The scale of it</p>
          <dl className="scale">
            {toxicScale.map((s, i) => (
              <div className="lit" data-lit-index={i} key={s.label}>
                <dt>{s.figure}</dt>
                <p className="scale__label">{s.label}</p>
                <dd>{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* --- cast */}
        <div className="toxic__block">
          <p className="eyebrow lit">Alongside</p>
          <ul className="cast">
            {toxicCast.map((c, i) => (
              <li className="lit" data-lit-index={Math.min(i, 5)} key={c.actor}>
                <b>{c.actor}</b>
                <span>{c.role}</span>
                {"note" in c && c.note ? <i>{c.note}</i> : null}
              </li>
            ))}
          </ul>
        </div>

        {/* --- how it got here */}
        <div className="toxic__block">
          <p className="eyebrow lit">From announcement to release</p>
          <div className="track">
            {toxicTimeline.map((t, i) => (
              <article className="stop lit" data-lit-index={Math.min(i, 5)} key={t.date}>
                <p className="stop__date">{t.date}</p>
                <h3 className="stop__title">{t.title}</h3>
                <p className="stop__body">{t.body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* --- the slate */}
        <div className="toxic__block">
          <p className="eyebrow lit">Credits</p>
          <dl className="slate lit" data-lit-index="1">
            <div>
              <dt>Director</dt>
              <dd>{toxic.director}</dd>
            </div>
            <div>
              <dt>Cinematography</dt>
              <dd>{toxic.cinematographer}</dd>
            </div>
            <div>
              <dt>Editing</dt>
              <dd>{toxic.editor}</dd>
            </div>
            <div>
              <dt>Score</dt>
              <dd>{toxic.score}</dd>
            </div>
            <div>
              <dt>Runtime</dt>
              <dd>{toxic.runtime}</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>
                {toxic.languages}. {toxic.dubs}
              </dd>
            </div>
            <div>
              <dt>Soundtrack</dt>
              <dd>
                {toxicSound.released}, {toxicSound.label} — {toxicSound.length}.
                Composed by {toxicSound.composers}.{" "}
                {toxicSound.singles.map((s) => `${s.name} (${s.date})`).join(", ")}.
              </dd>
            </div>
            <div>
              <dt>Release</dt>
              <dd>
                {toxic.releaseDate} — {toxic.releaseNote}
                {days !== null && days > 0 ? ` ${days} days from today.` : ""}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
