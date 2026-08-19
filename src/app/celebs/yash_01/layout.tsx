import { Inter, Noto_Sans_Kannada, Syne } from "next/font/google";
import "./yash01.css";

/*
 * These two families are loaded in this nested layout rather than the root
 * one, so /celebs/yash keeps exactly the Cinzel + Spectral pairing its design
 * specifies and pays nothing for this route's type.
 */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/*
 * The subject's own script, as a real family rather than whatever the OS
 * happens to supply. Neither Syne nor Inter carries Kannada, so ಯಶ್ was being
 * rendered by a fallback at a synthesised weight on a page about Kannada
 * cinema.
 */
const kannada = Noto_Sans_Kannada({
  variable: "--font-kannada",
  subsets: ["kannada"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/*
 * Every rule in yash01.css is nested under `.y01`. Next does not unmount route
 * stylesheets on client navigation, so an unscoped neon sheet would still be
 * live on /celebs/yash after a visit here and would repaint the gold page.
 */
export default function Yash01Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`y01 ${syne.variable} ${inter.variable} ${kannada.variable}`}>
      {children}
    </div>
  );
}
