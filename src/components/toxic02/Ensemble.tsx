"use client";

import { castPortraits } from "@/data/toxicCast";
import { toxicEnsemble } from "@/data/toxic";
import Band from "./Band";
import CastPortrait from "./CastPortrait";

/**
 * Portraits for the five performers the article names a role for and Commons
 * has a freely licensed photograph of. The rest of the ensemble is carried as
 * text in the same section — the honest way to credit a name we have no
 * publishable portrait for, rather than padding the grid.
 */
export default function Ensemble() {
  const shown = new Set(castPortraits.map((c) => c.actor));
  const rest = toxicEnsemble.filter((c) => !shown.has(c.actor));

  return (
    <Band
      n="04"
      eyebrow="The ensemble"
      title="Alongside him"
      id="ensemble"
    >
      <ul className="cast">
        {castPortraits.map((c, i) => (
          <CastPortrait c={c} index={Math.min(i, 4)} key={c.actor} />
        ))}
      </ul>

      <p className="cast__rest rise" data-rise-index="5">
        Also featuring{" "}
        {rest.map((c, i) => (
          <span key={c.actor}>
            <b>{c.actor}</b>
            {"special" in c && c.special ? "" : ` as ${c.role}`}
            {i < rest.length - 2 ? ", " : i === rest.length - 2 ? " and " : "."}
          </span>
        ))}{" "}
        No freely licensed photograph was available for these performers, so
        they are credited here in text rather than shown.
      </p>
    </Band>
  );
}
