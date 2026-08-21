"use client";

import { toxicEnsemble } from "@/data/toxic";
import Band from "./Band";

/** First letters of the first two words — "Kiara Advani" becomes KA. */
function monogram(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/**
 * The supporting cast.
 *
 * The reference layout puts a circular headshot against each name. There is
 * no freely licensed photograph of any of these performers on Wikimedia
 * Commons, and filling the circles with stock faces or generic silhouettes
 * would be inventing something the rest of this page refuses to invent — so
 * the discs are set with initials instead, and they are aria-hidden because
 * the name is right beside them.
 */
export default function Ensemble() {
  return (
    <Band
      index={5}
      id="ensemble"
      title="Alongside"
      note="Nine credited performances around the dual lead."
      depth={0.8}
    >
      <ul className="cast">
        {toxicEnsemble.map((c, i) => (
          <li className="lit" data-lit-index={Math.min(i, 5)} key={c.actor}>
            <span className="cast__mono" aria-hidden="true">
              {monogram(c.actor)}
            </span>
            <span className="cast__who">
              <b className="cast__actor">{c.actor}</b>
              <span className="cast__role">
                {"special" in c && c.special ? "Special appearance" : c.role}
              </span>
              {"note" in c && c.note ? (
                <i className="cast__note">{c.note}</i>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </Band>
  );
}
