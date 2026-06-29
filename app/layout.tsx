import type { Metadata } from "next";
import localFont from "next/font/local";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";
import { CookieConsent } from "./components/CookieConsent";

// ABC Favorit, self-hosted as variable woff2 (one file spans Book→Bold). The
// standard cut drives body + headings via Radix's font tokens (see globals.css);
// the Extended cut is reserved for the wordmark and About link (`.wordmark`).
const favorit = localFont({
  src: "./fonts/ABCFavoritVariable-Trial.woff2",
  variable: "--font-favorit",
  display: "swap",
  weight: "300 700",
});

const favoritExtended = localFont({
  src: "./fonts/ABCFavoritExtendedVariable-Trial.woff2",
  variable: "--font-favorit-extended",
  display: "swap",
  weight: "300 700",
});

export const metadata: Metadata = {
  title: "Hyperera",
  description:
    "Exploring the present through lenses from the past and future. An experimental publication that pairs today's news with historical, literary, and artistic analogies.",
};

// Match the OS appearance before first paint. Radix gates its dark color tokens
// behind an ancestor `.dark` class, and our <Theme> uses appearance="inherit",
// so it reads whatever class sits on <html>. We set that class from
// `prefers-color-scheme` in a blocking inline script (runs before the body
// renders, so no flash of the wrong theme) and keep it in sync as the OS toggles.
// `color-scheme` is set too so native UI — scrollbars, form controls, the canvas
// behind the page — follows along. `suppressHydrationWarning` silences the
// expected mismatch between the server's class-less <html> and the script's.
const themeScript = `(function () {
  try {
    var root = document.documentElement;
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var apply = function (dark) {
      root.classList.toggle('dark', dark);
      root.classList.toggle('light', !dark);
      root.style.colorScheme = dark ? 'dark' : 'light';
    };
    apply(mq.matches);
    mq.addEventListener('change', function (e) { apply(e.matches); });
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${favorit.variable} ${favoritExtended.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Theme
          className="site-theme"
          appearance="inherit"
          accentColor="gray"
          grayColor="sand"
          radius="large"
          scaling="100%"
          panelBackground="solid"
        >
          <SiteHeader />
          <main>{children}</main>
          <CookieConsent />
        </Theme>
      </body>
    </html>
  );
}
