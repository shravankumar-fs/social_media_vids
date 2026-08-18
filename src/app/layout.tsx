import type { Metadata } from "next";
import { Cinzel, Spectral } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "social_media_vids",
  description: "Celebrity routes.",
  robots: { index: false, follow: false },
};

const CONTRACT = `<!--
THESIS: A Kannada star rendered in Karnataka's own luxury material — Hoysala
relief carving and Mysore gold-leaf gesso — not the dark-hero poster page with
a gold gradient that this category always ships.
OWN-WORLD: Chloritic-schist ground (#0e120c–#4a5740), 22k leaf laid as a
faceted multi-stop gradient, gesso #efe6d2 raised on lit-from-above relief
shadows, Mysore pigment for indigo/kumkum/malachite. Cinzel lapidary caps,
Spectral body. No cards; bands, courses, settings and plinths.
STORY: A boy leaves Hassan with ₹300 and ends up carved into the wall.
FIRST VIEWPORT: A carved WebGL niche the visitor tilts in real 3D, his portrait
set back inside it, YASH cut as gilded relief on the wall beside it.
FORM: Candidate 3 of 7, seed key 3337f94a, direction scope, mode experience.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${spectral.variable}`}>
      <body>
        {/* A JSX comment is stripped at compile time, so the direction contract
            is emitted as real markup — it has to be auditable in the built
            output, not just in the source. */}
        <div style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
