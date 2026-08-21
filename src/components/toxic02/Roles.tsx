"use client";

import Image from "next/image";
import { toxicRoles } from "@/data/toxic";
import { figures } from "@/data/toxicFigures";
import { useSpotlight } from "@/lib/spotlight";
import Band from "./Band";

export default function Roles() {
  const { elRef, onPointerMove, onPointerEnter, onPointerLeave } =
    useSpotlight<HTMLDivElement>();
  const fig = figures.feature;

  return (
    <Band
      n="02"
      eyebrow="The dual role"
      title="One actor, both ends of the story"
      lede="Yash carries the father and the son. The teaser credits them in this order."
      id="roles"
    >
      <div className="feature">
        <div className="roles">
          {toxicRoles.map((r, i) => (
            <article className="role rise" data-rise-index={i} key={r.name}>
              <h3 className="role__name">{r.name}</h3>
              {"alias" in r && r.alias ? (
                <p className="role__alias">Alias &ldquo;{r.alias}&rdquo;</p>
              ) : null}
              <p className="role__note">{r.note}</p>
            </article>
          ))}
        </div>

        <div
          className="feature__fig spot rise"
          data-rise-index="2"
          ref={elRef}
          onPointerMove={onPointerMove}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
          {/* Sits behind the cut-out, so the figure is rim-lit rather than washed. */}
          <span className="feature__glow" aria-hidden="true" />
          <Image
            src={fig.src}
            alt={fig.alt}
            width={fig.w}
            height={fig.h}
            sizes="(min-width: 64rem) 34vw, (min-width: 48rem) 44vw, 86vw"
          />
          <span className="spot__beam" aria-hidden="true" />
        </div>
      </div>
    </Band>
  );
}
