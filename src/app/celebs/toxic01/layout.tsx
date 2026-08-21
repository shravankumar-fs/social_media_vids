import { Anton, IBM_Plex_Sans, Noto_Sans_Kannada } from "next/font/google";
import "./toxic01.css";

/*
 * Anton only ever sets display lockups — TOXIC, the section numerals, the stat
 * figures. It is a single-weight poster face with no lowercase subtlety and no
 * business anywhere near running text.
 */
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/*
 * The reading face. Plex has a slightly drawn, mid-century-industrial cut that
 * suits a film set between the 1940s and the 1970s, and it stays legible at
 * the 11px floor this project holds itself to.
 */
const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/*
 * The film is shot in Kannada. Neither Anton nor Plex carries the script, so
 * without this the one Kannada string on the page would be rendered by
 * whatever the OS happened to supply, at a synthesised weight.
 */
const kannada = Noto_Sans_Kannada({
  variable: "--font-kannada-tx",
  subsets: ["kannada"],
  weight: ["400", "600"],
  display: "swap",
});

/*
 * SCOPING CONTRACT — read before adding a rule to toxic01.css.
 *
 * Next does not unmount route stylesheets on client navigation. An unscoped
 * selector in this sheet would still be live on /celebs/yash_01 and
 * /celebs/yash after a visit here, and would repaint two pages whose designs
 * refuse this palette. Every rule in toxic01.css is nested under `.tx01`.
 */
export default function Toxic01Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`tx01 ${anton.variable} ${plex.variable} ${kannada.variable}`}
    >
      {children}
    </div>
  );
}
