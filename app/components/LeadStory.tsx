"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Box, Flex, Grid, Heading, Link, Popover, Text } from "@radix-ui/themes";
import { CoverImage } from "./CoverImage";
import {
  categoryMeta,
  categoryOrder,
  formatStoryDate,
  genreMeta,
  type Story,
} from "@/lib/stories";

// An edition's hero on the shared three-column grid: headline + overview on
// the first track, cover spanning the rest, analogy band across all three below.
// `priority` marks the topmost hero's cover as the eager-loaded LCP image.
export function LeadStory({
  story,
  priority = false,
}: {
  story: Story;
  priority?: boolean;
}) {
  const genre = genreMeta[story.genre];
  // Index of the hovered/focused analogy; the cover crossfades to its image.
  const [previewed, setPreviewed] = useState<number | null>(null);
  const shown =
    previewed !== null && story.analogies[previewed]?.image ? previewed : null;

  const coverSizes = "(max-width: 768px) 100vw, 66vw";

  return (
    <Flex direction="column" gap="7">
      <Grid columns={{ initial: "1", sm: "3" }} gapX="9" gapY="4" align="start">
        <Flex asChild direction="column" gap="3">
          <NextLink href={`/story/${story.slug}`}>
            <Heading size="5" weight="regular">
              {story.headline}
            </Heading>
            <Text size="2" weight="light" color="gray">
              {story.overview}
            </Text>
            <Text size="1" color="gray">
              {story.sources.map((s) => s.name).join(", ")} ·{" "}
              {formatStoryDate(story.publishedAt)}
            </Text>
          </NextLink>
        </Flex>

        {story.image ? (
          <Box gridColumn={{ sm: "span 2" }}>
            <NextLink href={`/story/${story.slug}`} className="lead-cover">
              <div
                className="lead-cover-layer"
                data-shown={shown === null}
                aria-hidden={shown !== null}
              >
                <CoverImage
                  image={story.image}
                  fill
                  tint={genre.color}
                  tintOnHover
                  priority={priority}
                  sizes={coverSizes}
                />
              </div>
              {story.analogies.map((analogy, i) =>
                analogy.image ? (
                  <div
                    key={i}
                    className="lead-cover-layer"
                    data-shown={shown === i}
                    aria-hidden={shown !== i}
                  >
                    <CoverImage
                      image={analogy.image}
                      fill
                      tint={genre.color}
                      tintOnHover
                      sizes={coverSizes}
                    />
                  </div>
                ) : null,
              )}
            </NextLink>
          </Box>
        ) : null}
      </Grid>

      <Grid columns={{ initial: "1", sm: "3" }} gapX="9" gapY="5">
        {categoryOrder.map((category) => (
          <Flex key={category} direction="column" gap="2">
            <Text size="1" weight="medium" color="gray" className="category-label">
              {categoryMeta[category].label}
            </Text>
            <Flex asChild direction="column" gap="1">
              <ul style={{ listStyle: "none" }}>
                {story.analogies.map((analogy, i) =>
                  analogy.category !== category ? null : (
                    <li key={i}>
                      <Popover.Root>
                        <Popover.Trigger>
                          <button
                            type="button"
                            className="analogy-trigger"
                            onMouseEnter={() => setPreviewed(i)}
                            onMouseLeave={() => setPreviewed(null)}
                            onFocus={() => setPreviewed(i)}
                            onBlur={() => setPreviewed(null)}
                          >
                            <Text size="2" weight="light">
                              {analogy.title}
                            </Text>
                          </button>
                        </Popover.Trigger>
                        <Popover.Content size="1" maxWidth="280px">
                          <Flex direction="column" gap="2">
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
                        </Popover.Content>
                      </Popover.Root>
                    </li>
                  ),
                )}
              </ul>
            </Flex>
          </Flex>
        ))}
      </Grid>
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
