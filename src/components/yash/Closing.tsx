"use client";

import Image from "next/image";
import {
  SOURCE_URL,
  endowment,
  identity,
  imageCredits,
  sanctum,
  unfinished,
} from "@/data/yash";
import { useGild, useParallax } from "@/lib/scroll";

/** The garbhagriha is small, unlit and unworked. The loud wall is outside. */
export function Sanctum() {
  const gild = useGild<HTMLElement>(0.15);
  const drift = useParallax<HTMLDivElement>(0.55);

  return (
    <section className="sanctum" ref={gild} aria-labelledby="sanctum-title">
      <div className="sanctum__inner">
        <div className="sanctum__text">
          <h2 id="sanctum-title" className="section-title gild">
            The inner room
          </h2>
          <p className="sanctum__body gild" data-gild-index="1">
            He met {sanctum.spouse} {sanctum.met}, and they kept it to
            themselves for most of a decade. Engaged in {sanctum.engaged};
            married on {sanctum.married}. {sanctum.children}
          </p>
          <p className="sanctum__aside gild" data-gild-index="2">
            The same year they married, he was ranked first in the Bangalore
            Times Most Desirable Man list — as he had been in 2013, and would
            be again in 2020.
          </p>
        </div>

        <div className="sanctum__plate" ref={drift}>
          <Image
            src="/yash/kgf-press-crop.jpg"
            alt="Yash at the KGF press meet in Chennai"
            width={551}
            height={664}
            sizes="(min-width: 64rem) 24vw, 60vw"
            className="sanctum__img"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Hoysala temples cut their endowments into the plinth — who gave, how much,
 * and for what — in the same hand as the gods above. This is that inscription.
 */
export function Endowment() {
  const gild = useGild<HTMLElement>(0.12);

  return (
    <section className="endowment" ref={gild} aria-labelledby="endowment-title">
      <div className="endowment__slab">
        <h2 id="endowment-title" className="endowment__title gild">
          {endowment.name}
        </h2>
        <p className="endowment__founded gild" data-gild-index="1">
          {endowment.founded}
        </p>

        <dl className="endowment__records">
          {endowment.records.map((r, i) => (
            <div className="gild" data-gild-index={i + 2} key={r.figure}>
              <dt>{r.figure}</dt>
              <dd>{r.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * Halebidu was never finished — eighty-six years of carving and the shikhara
 * never went on. The upcoming films get that treatment: cut, but not gilded.
 */
export function Unfinished() {
  const gild = useGild<HTMLElement>(0.12);

  return (
    <section className="unfinished" ref={gild} aria-labelledby="unfinished-title">
      <div className="unfinished__head">
        <h2 id="unfinished-title" className="section-title gild">
          Still being cut
        </h2>
        <p className="section-lede gild" data-gild-index="1">
          Halebidu took eighty-six years and the tower never went on. Three
          courses here are roughed out and waiting for leaf.
        </p>
      </div>

      <ol className="unfinished__list">
        {unfinished.map((u, i) => (
          <li className="rough gild" data-gild-index={i + 2} key={u.title}>
            <span className="rough__year">{u.year}</span>
            <h3 className="rough__title">{u.title}</h3>
            <p className="rough__body">{u.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Colophon() {
  const gild = useGild<HTMLElement>(0.05);

  return (
    <footer className="colophon" ref={gild}>
      <div className="colophon__inner">
        <p className="colophon__mark gild">{identity.kannadaName}</p>

        <div className="colophon__cols">
          <section>
            <h2>Text</h2>
            <p>
              Every date, title and figure on this page is taken from{" "}
              <a href={SOURCE_URL} rel="noopener noreferrer" target="_blank">
                the Wikipedia article on Yash
              </a>
              , available under CC BY-SA 4.0. Nothing has been added to it.
            </p>
          </section>

          <section>
            <h2>Photographs</h2>
            <ul className="colophon__credits">
              {imageCredits.map((c) => (
                <li key={c.file}>
                  <a href={c.pageUrl} rel="noopener noreferrer" target="_blank">
                    {c.file}
                  </a>{" "}
                  — {c.author},{" "}
                  <a href={c.licenceUrl} rel="noopener noreferrer" target="_blank">
                    {c.licence}
                  </a>
                  , via Wikimedia Commons.
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Made of</h2>
            <p>
              Hoysala relief carving and Mysore traditional gesso-and-gold-leaf
              painting, both from Karnataka, rendered in WebGL, CSS 3D and a
              scroll with some weight in it. Unofficial, non-commercial, and
              not affiliated with the subject.
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}
