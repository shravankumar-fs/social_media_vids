"use client";

import { TOXIC_SOURCE_URL, toxicPortraitCredit } from "@/data/toxic";
import { castPortraits } from "@/data/toxicCast";
import { useRise } from "@/lib/reveal";

/**
 * Not decoration. CC BY and CC BY-SA both require the photographer and the
 * licence to be shown wherever the image is published, so this section is a
 * condition of using the portraits at all. Credits are derived from the
 * published set, so a portrait cannot appear without its credit and a credit
 * cannot outlive its portrait.
 */
export default function Colophon() {
  const reveal = useRise<HTMLElement>(0.05);

  return (
    <footer className="colo" ref={reveal}>
      <div className="shell">
        <div className="colo__cols">
          <section className="rise" aria-labelledby="t02-text">
            <h3 id="t02-text">Text</h3>
            <p>
              Every date, figure and credit on this page comes from{" "}
              <a href={TOXIC_SOURCE_URL} rel="noopener noreferrer" target="_blank">
                the Wikipedia article on Toxic
              </a>
              , available under CC BY-SA 4.0. Nothing has been added to it.
            </p>
          </section>

          <section className="rise" data-rise-index="1" aria-labelledby="t02-photos">
            <h3 id="t02-photos">Photographs</h3>
            <ul>
              <li>
                Yash — {toxicPortraitCredit.author},{" "}
                <a href={toxicPortraitCredit.licenceUrl} rel="noopener noreferrer" target="_blank">
                  {toxicPortraitCredit.licence}
                </a>
                ,{" "}
                <a href={toxicPortraitCredit.sourceUrl} rel="noopener noreferrer" target="_blank">
                  via Wikimedia Commons
                </a>
                .
              </li>
              {castPortraits.map((c) => (
                <li key={c.actor}>
                  {c.actor} — {c.author},{" "}
                  <a href={c.licenceUrl} rel="noopener noreferrer" target="_blank">
                    {c.licence}
                  </a>
                  ,{" "}
                  <a href={c.sourceUrl} rel="noopener noreferrer" target="_blank">
                    via Wikimedia Commons
                  </a>
                  .
                </li>
              ))}
            </ul>
          </section>

          <section className="rise" data-rise-index="2" aria-labelledby="t02-about">
            <h3 id="t02-about">About this page</h3>
            <p>
              An unofficial, non-commercial fan page, not affiliated with the
              film, its producers or its distributors. Built as a scrolling
              composition: one shared scroll signal drives every neon surface,
              so the page brightens and settles as one instrument.
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}
