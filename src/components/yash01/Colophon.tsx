"use client";

import { SOURCE_URL, identity, imageCredits } from "@/data/yash";
import { TOXIC_SOURCE_URL } from "@/data/toxic";
import { useReveal } from "@/lib/reveal";

/**
 * Not decoration. CC BY-SA and CC BY both require the photographer and the
 * licence to be shown wherever the image is published, so this section is a
 * condition of using the gallery at all.
 */
export default function Colophon() {
  const reveal = useReveal<HTMLElement>(0.05);

  return (
    <footer className="colo" ref={reveal}>
      <div className="shell">
        <p className="colo__mark lit" aria-hidden="true">
          {identity.kannadaName}
        </p>

        <div className="colo__cols">
          <section className="lit" data-lit-index="1">
            <h2>Text</h2>
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

          <section className="lit" data-lit-index="2">
            <h2>Photographs</h2>
            <ul>
              {imageCredits.map((c) => (
                <li key={c.file}>
                  <a href={c.pageUrl} rel="noopener noreferrer" target="_blank">
                    {c.file}
                  </a>{" "}
                  — {c.author},{" "}
                  <a href={c.licenceUrl} rel="noopener noreferrer" target="_blank">
                    {c.licence}
                  </a>
                  , via Wikimedia Commons.
                </li>
              ))}
            </ul>
          </section>

          <section className="lit" data-lit-index="3">
            <h2>About this page</h2>
            <p>
              An unofficial, non-commercial fan page, not affiliated with the
              subject or his representatives. Built as a scrolling neon
              composition: parallax depth, pointer and device tilt, and a
              single authored reveal.
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}
