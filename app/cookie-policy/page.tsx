import type { Metadata } from "next";
import NextLink from "next/link";
import { Container, Flex, Heading, Link, Section, Text } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Cookie Policy — Hyperera",
  description:
    "How Hyperera uses cookies and privacy-friendly analytics, and the choices you have.",
};

export default function CookiePolicy() {
  return (
    <Container size="2" px="4">
      <Section size="3">
        <Flex direction="column" gap="5">
          <Flex direction="column" gap="2">
            <Heading size="8" weight="regular">
              Cookie Policy
            </Heading>
            <Text size="2" color="gray">
              Last updated 27 June 2026
            </Text>
          </Flex>

          <Text size="4">
            Hyperera keeps tracking to a minimum. We don’t run ads, we don’t sell
            data, and we don’t build profiles of our readers. The little data we
            do collect tells us where our readers are finding us, so we can reach
            more of them. This page explains exactly what that means.
          </Text>

          <Flex direction="column" gap="3">
            <Heading size="5" weight="medium">
              Strictly necessary cookies
            </Heading>
            <Text size="3" color="gray">
              Two small cookies make the consent choice on this site work. They
              don’t track you and are never shared.
            </Text>
            <Text size="3" color="gray">
              <strong>consent-required</strong> records whether your region’s law
              (the EU/EEA or UK) requires us to ask for consent before turning on
              analytics. It’s set from the country your request arrives from and
              expires after a day.
            </Text>
            <Text size="3" color="gray">
              <strong>cookie-consent</strong> remembers whether you clicked
              “Accept all” or “Deny”, so we don’t ask again on every visit. It
              expires after a year, and clearing it brings the banner back.
            </Text>
          </Flex>

          <Flex direction="column" gap="3">
            <Heading size="5" weight="medium">
              Analytics
            </Heading>
            <Text size="3" color="gray">
              When analytics is on, we use{" "}
              <Link
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noreferrer"
              >
                Vercel Web Analytics
              </Link>
              , a privacy-friendly tool that counts page views and shows us which
              sites and searches send readers our way. It does not use cookies,
              does not store your IP address, and does not follow you across other
              websites. The numbers we see are aggregated — we can’t single you
              out from them.
            </Text>
            <Text size="3" color="gray">
              In the EU, EEA, and UK, analytics stays off until you choose “Accept
              all”. Everywhere else it’s on by default; because it’s cookieless
              and collects no personal data, this is permitted without a banner.
            </Text>
          </Flex>

          <Flex direction="column" gap="3">
            <Heading size="5" weight="medium">
              Your choices
            </Heading>
            <Text size="3" color="gray">
              You can decline analytics with “Deny” and still read everything on
              the site. To change your mind later, clear this site’s cookies in
              your browser and the banner will return so you can choose again.
            </Text>
          </Flex>

          <Text size="3">
            <Link asChild>
              <NextLink href="/">← Back to Hyperera</NextLink>
            </Link>
          </Text>
        </Flex>
      </Section>
    </Container>
  );
}
