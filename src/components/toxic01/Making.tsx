"use client";

import { toxicCampaign, toxicSound } from "@/data/toxic";
import Band from "./Band";

/**
 * How the film reached the public, from the title announcement to the English
 * trailer — laid out as a vertical track.
 *
 * Vertical on every breakpoint on purpose. A horizontal scroller would look
 * better in a screenshot and would hide six of these seven entries behind a
 * gesture nobody is told about, on the device this page was built for first.
 */
export default function Making() {
  return (
    <Band
      index={6}
      id="making"
      title="The Campaign"
      note="Announced in December 2023. Two and a half years of it before a ticket went on sale."
      depth={1}
    >
      <div className="making">
        <div className="lit">
          <h3 className="eyebrow" style={{ marginBottom: "1rem" }}>
            The sound
          </h3>
          <p className="body">
            Music rights went to {toxicSound.label}; the album landed{" "}
            {toxicSound.released}, {toxicSound.length} long, composed by{" "}
            {toxicSound.composers}. {toxicSound.scoreNote}
          </p>
          <p className="body" style={{ marginTop: "1rem" }}>
            Singles:{" "}
            {toxicSound.singles.map((s) => `${s.name} (${s.date})`).join(", ")}.
          </p>
        </div>

        <div className="track">
          {toxicCampaign.map((t, i) => (
            <article
              className={`stop lit${i === toxicCampaign.length - 1 ? " stop--last" : ""}`}
              data-lit-index={Math.min(i, 5)}
              key={t.date}
            >
              <p className="stop__date">{t.date}</p>
              <h3 className="stop__title">{t.title}</h3>
              <p className="stop__body">{t.body}</p>
              {"figure" in t && t.figure ? (
                <p className="stop__figure">{t.figure}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </Band>
  );
}
