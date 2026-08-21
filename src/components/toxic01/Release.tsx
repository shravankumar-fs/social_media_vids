"use client";

import { toxic, toxicRelease, toxicSchedule, toxicTerritories } from "@/data/toxic";
import { useDaysUntil } from "@/lib/reveal";
import Band from "./Band";

/**
 * The last numbered block: formats, the dates it was moved from, who bought
 * what, and then the countdown.
 *
 * The countdown ends the page because it is the only thing here that changes
 * between one visit and the next, and the only fact a visitor might come back
 * for. It is deliberately the largest thing on the page after the title.
 */
export default function Release() {
  const days = useDaysUntil(toxic.releaseISO);

  const count =
    days === null
      ? "\u00A0" /* holds the line open until the client clock is readable */
      : days > 1
        ? String(days)
        : days === 1
          ? "1"
          : days === 0
            ? "Today"
            : "Now";

  const caption =
    days === null
      ? `${toxic.releaseDate}`
      : days > 1
        ? `days until ${toxic.title} — ${toxic.releaseDate}`
        : days === 1
          ? `day until ${toxic.title} — ${toxic.releaseDate}`
          : days === 0
            ? `${toxic.title} is in cinemas — ${toxic.releaseDate}`
            : `${toxic.title} is in cinemas`;

  return (
    <Band
      index={7}
      id="release"
      title="The Release"
      note={`${toxicRelease.original}. Dubbed into ${toxicRelease.dubbed.join(", ")}.`}
      depth={0.9}
    >
      <ul className="chips lit">
        {toxicRelease.formats.map((f) => (
          <li key={f}>{f}</li>
        ))}
        <li data-tone="cool">{toxicRelease.screens}</li>
      </ul>

      <div className="making" style={{ marginTop: "2.5rem" }}>
        <div className="lit" data-lit-index="1">
          <h3 className="eyebrow" style={{ marginBottom: "1rem" }}>
            It moved three times
          </h3>
          <ul className="dates">
            {toxicSchedule.map((d) => (
              <li
                key={d.date}
                data-final={"final" in d && d.final ? "true" : undefined}
              >
                <b>{d.date}</b>
                <span>{d.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lit" data-lit-index="2">
          <table className="rights">
            <caption className="eyebrow" style={{ textAlign: "left", marginBottom: "1rem" }}>
              Distribution rights
            </caption>
            <thead>
              <tr>
                <th scope="col">Territory</th>
                <th scope="col">Distributor</th>
                <th scope="col">Reported</th>
              </tr>
            </thead>
            <tbody>
              {toxicTerritories.map((t) => (
                <tr key={t.region}>
                  <td>{t.region}</td>
                  <td>{t.buyer}</td>
                  {/*
                    An em dash is the right "no reported figure" mark in a
                    table with a header row. Once the table linearises on a
                    phone that header is gone and the dash is just a stray
                    mark on its own line, so the cell is flagged and hidden
                    there instead.
                  */}
                  <td data-empty={"figure" in t && t.figure ? undefined : "true"}>
                    {"figure" in t && t.figure ? t.figure : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="countdown lit" data-lit-index="3">
        <p className="countdown__num">{count}</p>
        <p className="countdown__sub">{caption}</p>
      </div>
    </Band>
  );
}
