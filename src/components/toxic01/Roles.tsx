"use client";

import { toxicRoles } from "@/data/toxic";
import { usePointerTilt } from "@/lib/scroll";
import Band from "./Band";

/**
 * The dual role, as a diptych.
 *
 * Both plates take the same tilt signal but with opposite sign, so the pair
 * opens and closes like one hinged object rather than two cards that happen
 * to move. That is the whole 3D budget for this section — a rotateY of a
 * couple of degrees and a 22px translateZ on the name. Anything heavier stops
 * being an accent and starts being a toy.
 */
export default function Roles() {
  const { ref } = usePointerTilt(1);

  return (
    <Band
      index={3}
      id="roles"
      title="One Actor, Two Parts"
      note="Yash carries both ends of the story — the father, and the son who inherits it."
      depth={0.9}
    >
      <div
        className="roles"
        ref={(el: HTMLDivElement | null) => {
          ref.current = el;
        }}
      >
        {toxicRoles.map((r, i) => (
          <article className="role lit" data-lit-index={i} key={r.name}>
            <span className="role__idx" aria-hidden="true">
              {i === 0 ? "I" : "II"}
            </span>
            <h3 className="role__name">{r.name}</h3>
            {"alias" in r && r.alias ? (
              <p className="role__alias">Known as &ldquo;{r.alias}&rdquo;</p>
            ) : null}
            <p className="role__note">{r.note}</p>
          </article>
        ))}
      </div>
    </Band>
  );
}
