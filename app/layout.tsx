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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme
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
