"use client";

import { toxicProduction, toxicRelease, toxicScale } from "@/data/toxic";
import Band from "./Band";

/**
 * The production figures, and only the ones the source article states. The
 * screen count is added to the four from `toxicScale` because it is the one
 * number that describes the release rather than the shoot, and it belongs
 * beside them rather than buried in the release table.
 */
export default function Scale() {
  const figures = [
    ...toxicScale,
    {
      figure: "12,000",
      label: "Screens",
      note: "The worldwide opening footprint, across four projection formats.",
    },
    {
      figure: "14 months",
      label: "Shoot",
      note: `${toxicProduction.window}, across five cities.`,
    },
  ];

  return (
    <Band
      index={4}
      id="scale"
      title="What It Took"
      note={`Filmed across ${toxicProduction.locations.join(", ")}. Action by ${toxicProduction.action}.`}
      depth={1.1}
    >
      <dl className="scale">
        {figures.map((s, i) => (
          <div className="lit" data-lit-index={Math.min(i, 5)} key={s.label}>
            <dt>{s.figure}</dt>
            <p className="scale__label">{s.label}</p>
            <dd>{s.note}</dd>
          </div>
        ))}
      </dl>

      <p className="body lit" data-lit-index="5" style={{ marginTop: "2rem" }}>
        Projected in {toxicRelease.formats.join(", ")} — and cut in two
        languages at once, rather than dubbed into the second.
      </p>
    </Band>
  );
}
