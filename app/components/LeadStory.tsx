"use client";

import { useState } from "react";
import NextLink from "next/link";
import { AspectRatio, Box, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { CoverImage } from "./CoverImage";
import { formatStoryDate, genreMeta, type Story } from "@/lib/stories";

// The home page hero. The left column links into the story (headline + overview)
// and lists the six analogy titles; the right column shows the cover, also a link
// into the story, at a 16:9 ratio. Hovering (or focusing) an analogy swaps the
// cover for that analogy's description and an external link to its source, so the
// two columns stay the same height and the layout never jumps.
export function LeadStory({ story }: { story: Story }) {
  const genre = genreMeta[story.genre];
  const [active, setActive] = useState<number | null>(null);
  const analogy = active === null ? null : story.analogies[active];

  return (
    <Flex
      direction={{ initial: "column", sm: "row" }}
      gap={{ initial: "4", sm: "6" }}
      align="start"
    >
      <Flex direction="column" gap="3" width={{ initial: "100%", sm: "250px" }} flexShrink="0">
        <Flex asChild direction="column" gap="3">
          <NextLink href={`/story/${story.slug}`}>
            <Heading size="4" weight="regular">
              {story.headline}
            </Heading>
            <Text size="2" weight="light" color="gray">
              {story.overview}
            </Text>
          </NextLink>
        </Flex>

        <Flex asChild direction="column" gap="1" mt="2">
          <ul style={{ listStyle: "none" }}>
            {story.analogies.map((a, i) => (
              <li
                key={i}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                style={{
                  cursor: "default",
                  borderRadius: "var(--radius-2)",
                  padding: "2px 6px",
                  margin: "0 -6px",
                  backgroundColor:
                    active === i ? "var(--gray-3)" : "transparent",
                  transition: "background-color 150ms",
                }}
              >
                <Text
                  size="1"
                  weight="light"
                  color={active === i ? undefined : "gray"}
                >
                  {a.title}
                </Text>
              </li>
            ))}
          </ul>
        </Flex>

        <Text size="1" color="gray" mt="2">
          {story.sources.map((s) => s.name).join(", ")} ·{" "}
          {formatStoryDate(story.publishedAt)}
        </Text>
      </Flex>

      <Box flexGrow="1" minWidth="0" width="100%">
        {analogy ? (
          <AspectRatio ratio={16 / 9}>
            <Flex direction="column" justify="between" gap="3" height="100%">
              <Text size="2">{analogy.excerpt}</Text>
              <Link
                href={analogy.href}
                target="_blank"
                rel="noreferrer"
                size="2"
              >
                Read more at {hostname(analogy.href)} →
              </Link>
            </Flex>
          </AspectRatio>
        ) : story.image ? (
          <NextLink href={`/story/${story.slug}`} style={{ display: "block" }}>
            <CoverImage
              image={story.image}
              ratio={16 / 9}
              tint={genre.color}
              tintOnHover
              priority
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </NextLink>
        ) : null}
      </Box>
    </Flex>
  );
}

// "perseus.tufts.edu" from a full source URL, for the "Read more at …" label.
function hostname(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "the source";
  }
}
