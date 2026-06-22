import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "hyper-era",
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Theme
          appearance="inherit"
          accentColor="gray"
          grayColor="sand"
          radius="large"
          scaling="100%"
          panelBackground="solid"
        >
          <SiteHeader />
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
