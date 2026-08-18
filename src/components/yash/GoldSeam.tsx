"use client";

import { useEffect, useRef } from "react";
import { kgf } from "@/data/yash";
import { useGild, useParallax, usePointerTilt } from "@/lib/scroll";

/**
 * Gold dust in the shaft air. Bounded on purpose: the count scales with the
 * viewport, the loop stops dead when the section leaves the screen, and the
 * whole thing never runs at all under reduced motion.
 */
function Dust() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;

    const pointer = { x: 0.5, y: 0.5 };
    type Mote = { x: number; y: number; z: number; vx: number; vy: number; r: number };
    let motes: Mote[] = [];

    const seed = () => {
      const count = Math.round(
        Math.min(190, Math.max(55, (w * h) / 11000)),
      );
      motes = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: 0.25 + Math.random() * 0.75,
        vx: (Math.random() - 0.5) * 0.00035,
        vy: -0.00018 - Math.random() * 0.0004,
        r: 0.4 + Math.random() * 1.9,
      }));
    };

    const resize = () => {
      const rect = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        // Drift, plus a slow lean away from the pointer, as dust does when
        // something moves through it.
        const dx = m.x - pointer.x;
        const dy = m.y - pointer.y;
        const d2 = dx * dx + dy * dy + 0.004;
        m.x += m.vx + (dx / d2) * 0.000018 * m.z;
        m.y += m.vy + (dy / d2) * 0.000012 * m.z;

        if (m.y < -0.05) { m.y = 1.05; m.x = Math.random(); }
        if (m.x < -0.05) m.x = 1.05;
        if (m.x > 1.05) m.x = -0.05;

        const px = m.x * w;
        const py = m.y * h;
        const r = m.r * m.z;
        ctx.globalAlpha = 0.16 + m.z * 0.5;
        ctx.fillStyle = m.z > 0.72 ? "#fdedc0" : m.z > 0.45 ? "#dda93f" : "#966c19";
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    resize();
    io.observe(el);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvas} className="seam__dust" aria-hidden="true" />;
}

/**
 * The one loud passage on the page. Everything before it is stone and
 * everything after it is quiet; this is where the leaf goes on thick, because
 * KGF is the fact that reorganised the rest of the biography around it.
 */
export default function GoldSeam() {
  // Three refs, three elements, no merging: --tx/--ty are custom properties, so
  // the tilt can be written on the section and still reach the strata inside it.
  const { ref: tiltRef } = usePointerTilt(0.7);
  const gild = useGild<HTMLDivElement>(0.06);
  const strata = useParallax<HTMLDivElement>(1.3);

  return (
    <section
      className="seam"
      ref={tiltRef as React.RefObject<HTMLElement>}
      aria-labelledby="seam-title"
    >
      <Dust />

      <div className="seam__strata" ref={strata} aria-hidden="true">
        <span className="seam__stratum" data-layer="1" />
        <span className="seam__stratum" data-layer="2" />
        <span className="seam__stratum" data-layer="3" />
        <span className="seam__stratum" data-layer="4" />
      </div>

      <div className="seam__body" ref={gild}>
        <p className="seam__role gild">
          {kgf.role}
          <em>{kgf.alias}</em>
        </p>

        <h2 id="seam-title" className="seam__title gild" data-gild-index="1">
          <span>Kolar</span>
          <span>Gold</span>
          <span>Fields</span>
        </h2>

        <p className="seam__lede gild" data-gild-index="2">
          Directed by {kgf.director}. Chapter 1 arrived in 2018 as the most
          expensive Kannada film ever mounted, and left as the
          highest-grossing one. Four years later Chapter 2 stopped being a
          Kannada number and became an Indian one.
        </p>

        <dl className="seam__ledger">
          {kgf.lines.map((line, i) => (
            <div className="seam__line gild" data-gild-index={i + 3} key={line.k}>
              <dt>{line.k}</dt>
              <dd>
                <span className="seam__value">{line.v}</span>
                <span className="seam__note">{line.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
