"use client";

import { toxic, toxicRelease } from "@/data/toxic";
import { useDaysUntil } from "@/lib/reveal";
import Band from "./Band";

/**
 * The page ends on the one fact that changes every day. The count renders null
 * until mounted — it depends on the visitor's clock, so producing it during
 * hydration would mismatch — and the CSS reserves its line so filling it
 * shifts nothing.
 */
export default function Release() {
  const days = useDaysUntil(toxic.releaseISO);

  const headline =
    days === null
      ? " "
      : days > 1
        ? `${days} days`
        : days === 1
          ? "Tomorrow"
          : days === 0
            ? "Today"
            : "In cinemas now";

  return (
    <Band n="06" eyebrow="The release" title="When and where" id="release">
      <div className="release rise">
        <p className="release__count">{headline}</p>
        <p className="release__sub">
          {days !== null && days > 0
            ? `until ${toxic.title} — ${toxicRelease.date}`
            : `${toxic.title} — ${toxicRelease.date}`}
        </p>

        <dl className="release__grid">
          <div>
            <dt>Formats</dt>
            <dd>{toxicRelease.formats.join(" · ")}</dd>
          </div>
          <div>
            <dt>Shot in</dt>
            <dd>{toxicRelease.original}</dd>
          </div>
          <div>
            <dt>Also dubbed into</dt>
            <dd>{toxicRelease.dubbed.join(", ")}</dd>
          </div>
          <div>
            <dt>Screens</dt>
            <dd>{toxicRelease.screens}</dd>
          </div>
          <div>
            <dt>English-language release</dt>
            <dd>{toxicRelease.englishDistributor}</dd>
          </div>
          <div>
            <dt>Timed to</dt>
            <dd>Onam, worldwide</dd>
          </div>
        </dl>
      </div>
    </Band>
  );
}
