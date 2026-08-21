"use client";

import { toxic, toxicFrame, toxicProduction } from "@/data/toxic";
import Band from "./Band";

/**
 * What the film is, before any figure about what it cost. The display lockup
 * sets the tagline; the paragraph under it carries the full premise; the spec
 * list answers the questions a visitor actually arrives with.
 */
export default function Premise() {
  /*
   * The lockup is the tagline itself, split at its own sentence break so the
   * second half can take the accent colour. It is deliberately not written
   * out in this file: an earlier draft paraphrased it by hand, which both
   * invented a line nothing sourced and repeated the paragraph directly
   * beneath it almost word for word.
   */
  const [place, ...rest] = toxic.tagline.split(". ");

  return (
    <Band index={2} id="premise" title="The Premise" depth={0.7}>
      <div className="premise">
        <div>
          <p className="premise__quote lit">
            {place}. <em>{rest.join(". ")}</em>
          </p>
          <p className="body lit" data-lit-index="1">
            {toxic.premise}
          </p>
        </div>

        <dl className="spec lit" data-lit-index="2">
          <div>
            <dt>Setting</dt>
            <dd>{toxicFrame.setting}</dd>
          </div>
          <div>
            <dt>Genre</dt>
            <dd>{toxicFrame.genre}</dd>
          </div>
          <div>
            <dt>Written by</dt>
            <dd>{toxicProduction.writers}</dd>
          </div>
          <div>
            <dt>Produced by</dt>
            <dd>
              {toxicProduction.producers} — {toxicProduction.houses}
            </dd>
          </div>
          <div>
            <dt>Camera</dt>
            <dd>{toxic.cinematographer}</dd>
          </div>
          <div>
            <dt>Edit</dt>
            <dd>{toxic.editor}</dd>
          </div>
          <div>
            <dt>Certificate</dt>
            <dd>{toxicFrame.certificate}</dd>
          </div>
        </dl>
      </div>
    </Band>
  );
}
