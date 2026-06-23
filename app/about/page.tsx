import type { Metadata } from "next";
import { Container, Flex, Heading, Link, Section, Strong, Text } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "About — Hyperera",
  description: "Exploring the present through lenses from the past and future.",
};

// A static colophon for the site, adapted from the project README. Matches the
// story template's measure (Container size 3) so it reads as the same publication.
export default function AboutPage() {
  return (
    <Container size="3" px="4">
      <Section size="3">
        <Flex direction="column" gap="4">
          <Heading size="7" weight="regular">
            About
          </Heading>
          <Text size="4" color="gray">
            Exploring the present through lenses from the past and future.
          </Text>

          <Text as="p" size="3">
            Hyperera is an experimental publication. Its goal is to tame a{" "}
            <Link
              href="https://www.goodreads.com/en/book/show/70254.A_User_s_Guide_to_the_Millennium"
              target="_blank"
              rel="noreferrer"
            >
              media landscape
            </Link>{" "}
            dominated by hypertext and hypermedia by providing analogies across
            time that shed light on the present.
          </Text>

          <Text as="p" size="3">
            If{" "}
            <Link
              href="https://worrydream.com/refs/Hofstadter_2001_-_Analogy_as_the_Core_of_Cognition.pdf"
              target="_blank"
              rel="noreferrer"
            >
              analogy is the core of cognition
            </Link>
            , historical analogies can help us understand and contextualize
            what&apos;s going on today.
          </Text>

          <Heading size="5" weight="medium" mt="4">
            How it works
          </Heading>
          <Text as="p" size="3">
            Hyperera scans the RSS feeds of various publications, chooses the
            day&apos;s most important current events, and surfaces analogies that
            shed light on them. Every event is paired with six analogies across
            three categories — two each:
          </Text>
          <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
            <li style={{ marginBottom: "var(--space-2)" }}>
              <Text size="3">
                <Strong>Historical</Strong> — precedents from the historical
                record
              </Text>
            </li>
            <li style={{ marginBottom: "var(--space-2)" }}>
              <Text size="3">
                <Strong>Literary</Strong> — passages and narratives whose themes
                illuminate the moment
              </Text>
            </li>
            <li>
              <Text size="3">
                <Strong>Musical / artistic</Strong> — works of music or visual
                art that resonate with the event
              </Text>
            </li>
          </ul>
        </Flex>
      </Section>
    </Container>
  );
}
