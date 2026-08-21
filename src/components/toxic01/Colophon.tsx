import { TOXIC_SOURCE_URL, toxicPortraitCredit } from "@/data/toxic";

/**
 * Sources and attribution.
 *
 * A server component: nothing here moves, and it has no reason to ship
 * JavaScript. The photograph is CC BY-SA 4.0, which obliges this page to
 * name the author, the licence and the original file — so that credit sits in
 * the markup rather than in a tooltip.
 */
export default function Colophon() {
  return (
    <footer className="colophon">
      <div className="shell">
        <div className="colophon__grid">
          <div>
            <h2>Sources</h2>
            <p>
              Every fact on this page — cast, crew, budget, schedule,
              distribution and campaign dates — is taken from the Wikipedia
              article on the film. Nothing is estimated, and nothing that the
              article does not state appears here.
            </p>
            <p>
              <a href={TOXIC_SOURCE_URL} rel="noreferrer noopener" target="_blank">
                Toxic (2026 film) — Wikipedia
              </a>
            </p>
          </div>

          <div>
            <h2>Photograph</h2>
            <p>
              Portrait of Yash by {toxicPortraitCredit.author}, used under{" "}
              <a
                href={toxicPortraitCredit.licenceUrl}
                rel="license noreferrer noopener"
                target="_blank"
              >
                {toxicPortraitCredit.licence}
              </a>
              .
            </p>
            <p>
              <a
                href={toxicPortraitCredit.sourceUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                Original file on Wikimedia Commons
              </a>
            </p>
            <p>
              No poster, still or promotional artwork from the film is
              reproduced anywhere on this page — none of it is freely licensed.
              The title is set in type.
            </p>
          </div>
        </div>

        <p className="colophon__foot">
          An unofficial editorial page. Not affiliated with the production, its
          distributors, or anyone credited above.
        </p>
      </div>
    </footer>
  );
}
