"use client";

import Link from "next/link";
import Image from "next/image";
import { useGild } from "@/lib/scroll";
import { identity } from "@/data/yash";
import { toxic } from "@/data/toxic";
import "./homepage.css";

export default function Home() {
  // Activate the gold-leaf gilding animation on scroll/load for all `.gild` elements
  const containerRef = useGild<HTMLDivElement>(0.1);

  return (
    <div className="home-container grain">
      <div className="grain-layer" aria-hidden="true" />
      
      <main className="home-inner" ref={containerRef}>
        {/* --- Header Section --- */}
        <header className="home-header">
          <span className="home-subtitle">The Archives</span>
          <h1 className="home-title gild" data-gild-index="0">
            {identity.stageName} Chronicles
          </h1>
          <div className="home-title-border" />
          <p className="home-description">
            Explore the journey of Kannada cinema's <strong>{identity.epithet}</strong>.
            A dual-volume showcase spanning his biography, landmarks, and the neon-lit slate of <strong>{toxic.title}</strong>.
          </p>
        </header>

        {/* --- Grid / Dual Panels --- */}
        <div className="home-grid">
          {/* Card 1: Volume I (Hoysala Gold-Leaf Relief) */}
          <Link href="/celebs/yash" className="home-card gild" data-gild-index="1">
            <div className="card-image-wrap">
              <Image
                src="/yash/portrait-main.jpg"
                alt="Yash Portrait in Gold-Leaf style"
                fill
                sizes="(min-width: 48rem) 50vw, 100vw"
                className="card-image"
                priority
              />
              <div className="card-image-overlay" />
              <span className="card-badge">Biography & Relief</span>
            </div>
            
            <div className="card-body">
              <span className="card-volume">Volume I</span>
              <h2 className="card-title-el">Hoysala Gold-Leaf</h2>
              <p className="card-desc">
                An interactive profile rendered in Karnataka's luxury material—Hoysala relief carving schist stone and Mysore traditional gold-leaf gesso.
              </p>
              <span className="card-action">
                Enter Exhibit <span className="card-action-arrow">→</span>
              </span>
              <div className="card-bottom-line" />
            </div>
          </Link>

          {/* Card 2: Volume II (Toxic Neon Profile) */}
          <Link href="/celebs/yash_01" className="home-card gild" data-gild-index="2">
            <div className="card-image-wrap">
              <Image
                src="/yash/kgf2-promo.jpg"
                alt="Yash KGF / Toxic Neon"
                fill
                sizes="(min-width: 48rem) 50vw, 100vw"
                className="card-image"
              />
              <div className="card-image-overlay" />
              <span className="card-badge">Cinematic & Neon</span>
            </div>
            
            <div className="card-body">
              <span className="card-volume">Volume II</span>
              <h2 className="card-title-el">Toxic Neon Vibe</h2>
              <p className="card-desc">
                A high-contrast cinematic tribute highlighting timelines, cast details, and his upcoming release—{toxic.title}: {toxic.subtitle}.
              </p>
              <span className="card-action">
                Enter Exhibit <span className="card-action-arrow">→</span>
              </span>
              <div className="card-bottom-line" />
            </div>
          </Link>
        </div>

        {/* --- Footer --- */}
        <footer className="home-footer">
          <p>
            Sourced from the public record on{" "}
            <a href="https://en.wikipedia.org/wiki/Yash_(actor)" target="_blank" rel="noopener noreferrer">
              Wikipedia
            </a>
            . Unofficial fan exhibition.
          </p>
        </footer>
      </main>
    </div>
  );
}
