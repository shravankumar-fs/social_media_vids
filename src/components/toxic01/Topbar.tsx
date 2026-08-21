"use client";

import { useEffect, useRef } from "react";
import { toxic } from "@/data/toxic";

/**
 * A thin sticky bar carrying the title, the release date, and a hairline that
 * fills as the page is read.
 *
 * The fill is written straight to a custom property on a ref rather than held
 * in state: it changes every frame of every scroll, and a setState per frame
 * would re-render the tree for a value only one CSS declaration ever reads.
 */
export default function Topbar() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const write = () => {
      frame = 0;
      const el = railRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const travel = doc.scrollHeight - window.innerHeight;
      const read = travel > 0 ? window.scrollY / travel : 0;
      el.style.setProperty("--read", Math.min(1, Math.max(0, read)).toFixed(4));
    };

    // Coalesced to one write per frame — scroll fires far more often than the
    // compositor can use, and each handler here reads layout.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="topbar">
      <p className="topbar__mark">
        Toxic<span>.</span>
      </p>
      <p className="topbar__date">{toxic.releaseDate}</p>
      <div className="topbar__rail" ref={railRef} aria-hidden="true" />
    </div>
  );
}
