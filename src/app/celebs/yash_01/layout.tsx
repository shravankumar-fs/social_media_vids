import { Inter, Syne } from "next/font/google";
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
    <div className={`y01 ${syne.variable} ${inter.variable}`}>{children}</div>
  );
}
