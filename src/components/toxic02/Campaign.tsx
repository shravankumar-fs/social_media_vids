"use client";

import { toxicCampaign } from "@/data/toxic";
import Band from "./Band";

export default function Campaign() {
  return (
    <Band
      n="05"
      eyebrow="The campaign"
      title="From a title card to a trailer"
      lede="Announced in December 2023. What the public actually saw, in order."
      id="campaign"
    >
      <div className="track">
        {toxicCampaign.map((t, i) => (
          <article className="stop rise" data-rise-index={Math.min(i, 5)} key={t.date}>
            <p className="stop__date">{t.date}</p>
            <h3 className="stop__title">{t.title}</h3>
            <p className="stop__body">{t.body}</p>
            {"figure" in t && t.figure ? (
              <p className="stop__figure">{t.figure}</p>
            ) : null}
          </article>
        ))}
      </div>
    </Band>
  );
}
