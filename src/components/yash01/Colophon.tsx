"use client";

import { SOURCE_URL, identity } from "@/data/yash";
import { TOXIC_SOURCE_URL } from "@/data/toxic";
import { galleryCredits, portraitCredit, shots } from "@/data/gallery";
import { useReveal } from "@/lib/reveal";

/**
 * Not decoration. CC BY-SA and CC BY both require the photographer and the
 * licence to be shown wherever the image is published, so this is a condition
 * of using the gallery at all.
 *
 * The credits are derived from the published set rather than hand-listed, so a
 * plate can never appear without its credit, and a credit can never outlive
 * the plate it describes.
 */
export default function Colophon() {
  const reveal = useReveal<HTMLElement>(0.05);
  const used = new Set(shots.map((s) => s.credit));
  const credits = galleryCredits.filter((c) => used.has(c.id));

  return (
    <footer className="colo" ref={reveal}>
      <div className="shell">
        <p className="colo__mark lit" lang="kn" aria-hidden="true">
          {identity.kannadaName}
        </p>

        <div className="colo__cols">
          <section className="lit" data-lit-index="1" aria-labelledby="colo-text">
            <h3 id="colo-text">Text</h3>
            <p>
              Every date, title and figure on this page comes from{" "}
              <a href={SOURCE_URL} rel="noopener noreferrer" target="_blank">
                the Wikipedia article on Yash
              </a>{" "}
              and{" "}
              <a href={TOXIC_SOURCE_URL} rel="noopener noreferrer" target="_blank">
                the article on Toxic
              </a>
              , both available under CC BY-SA 4.0. Nothing has been added to
              them.
            </p>
          </section>

          <section className="lit" data-lit-index="2" aria-labelledby="colo-photos">
            <h3 id="colo-photos">Photographs</h3>
            <ul>
              <li>
                Hero portrait — {portraitCredit.author},{" "}
                <a
                  href={portraitCredit.licenceUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {portraitCredit.licence}
                </a>
                ,{" "}
                <a
                  href={portraitCredit.sourceUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  via Wikimedia Commons
                </a>
                .
              </li>
              {credits.map((c) => (
                <li key={c.id}>
                  {shots
                    .filter((s) => s.credit === c.id)
                    .map((s) => s.caption)
                    .join("; ")}{" "}
                  — {c.author},{" "}
                  <a href={c.licenceUrl} rel="noopener noreferrer" target="_blank">
                    {c.licence}
                  </a>
                  ,{" "}
                  <a href={c.sourceUrl} rel="noopener noreferrer" target="_blank">
                    via Wikimedia Commons
                  </a>
                  .{c.note ? ` ${c.note}` : ""}
                </li>
              ))}
            </ul>
          </section>

          <section className="lit" data-lit-index="3" aria-labelledby="colo-about">
            <h3 id="colo-about">About this page</h3>
            <p>
              An unofficial, non-commercial fan page, not affiliated with the
              subject or his representatives. Built as a scrolling composition:
              parallax depth, pointer and device tilt, and a single authored
              reveal.
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}
