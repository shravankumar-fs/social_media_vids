"use client";

import { useCallback, useRef } from "react";
import { awards } from "@/data/yash";
import { useGild } from "@/lib/scroll";

/**
 * Kundan setting: a stone is not glued flat, it is pushed into a bed of gold
 * foil that is burnished up around its girdle. So each of these turns on two
 * axes under the pointer, the gold bed catches a specular sweep that tracks
 * the same position, and the stones themselves sit forward of the bed on
 * their own Z plane. Tilt it and the setting has depth, because it does.
 */
function Setting({
  award,
  index,
}: {
  award: (typeof awards)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const move = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
      el.style.setProperty("--lift", "1");
    });
  }, []);

  const leave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.setProperty("--mx", "0.5");
    el.style.setProperty("--my", "0.5");
    el.style.setProperty("--lift", "0");
  }, []);

  return (
    <div
      ref={ref}
      className="setting gild"
      data-gild-index={index}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      <div className="setting__bed">
        <span className="setting__sheen" aria-hidden="true" />

        <div className="setting__plate">
          <h3 className="setting__body">{award.body}</h3>
          <p className="setting__count">{award.count}</p>
          <p className="setting__detail">{award.detail}</p>
        </div>

        <ul className="setting__stones">
          {award.items.map((item) => (
            <li key={item}>
              <span className="setting__stone" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Settings() {
  const gild = useGild<HTMLElement>(0.1);

  return (
    <section className="settings" ref={gild} aria-labelledby="settings-title">
      <div className="settings__head">
        <h2 id="settings-title" className="section-title gild">
          What was set into it
        </h2>
        <p className="section-lede gild" data-gild-index="1">
          Three Filmfare Awards South from eight nominations, five SIIMA, one
          IIFA Utsavam, and a Forbes India cover no Kannada actor had held.
        </p>
      </div>

      <div className="settings__grid">
        {awards.map((award, i) => (
          <Setting award={award} index={i} key={award.body} />
        ))}
      </div>
    </section>
  );
}
