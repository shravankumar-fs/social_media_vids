"use client";

import { toxicScale } from "@/data/toxic";
import Band from "./Band";

export default function Scale() {
  return (
    <Band
      n="03"
      eyebrow="The scale"
      title="What it took to build"
      lede="Every figure below is what the source article states, and nothing more."
      id="scale"
    >
      <div className="stats">
        {toxicScale.map((s, i) => (
          <div className="stat rise" data-rise-index={i} key={s.label}>
            <dl>
              <dt>{s.figure}</dt>
              <dd className="stat__label">{s.label}</dd>
              <dd>{s.note}</dd>
            </dl>
          </div>
        ))}
      </div>
    </Band>
  );
}
