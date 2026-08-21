"use client";

import { toxic, toxicFrame, toxicProduction } from "@/data/toxic";
import Band from "./Band";
import { IconReel, IconMap, IconClock, IconGlobe, IconShield, IconPen } from "./Icons";

/** The reference's icon-card grid, given air and a real hover state. */
export default function Frame() {
  const cards = [
    { Ico: IconReel, dt: "Genre", dd: toxicFrame.genre },
    { Ico: IconMap, dt: "Setting", dd: toxicFrame.setting },
    { Ico: IconClock, dt: "Runtime", dd: toxic.runtime },
    { Ico: IconGlobe, dt: "Languages", dd: toxic.languages },
    { Ico: IconShield, dt: "Certificate", dd: toxicFrame.certificate },
    { Ico: IconPen, dt: "Written by", dd: toxicProduction.writers },
  ];

  return (
    <Band
      n="01"
      eyebrow="The frame"
      title="A gangster picture, set in a Goa that no longer exists"
      lede={toxic.premise}
      id="frame"
    >
      <div className="cards">
        {cards.map(({ Ico, dt, dd }, i) => (
          <div className="card rise" data-rise-index={Math.min(i, 4)} key={dt}>
            <div className="card__ico">
              <Ico />
            </div>
            <dl>
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </dl>
          </div>
        ))}
      </div>
    </Band>
  );
}
