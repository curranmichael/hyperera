import NextLink from "next/link";
import { Box, Flex, Heading, Link, Popover, Text } from "@radix-ui/themes";
import { CoverImage } from "./CoverImage";
import { formatStoryDate, genreMeta, type Story } from "@/lib/stories";

// The home page hero. The left column links into the story (headline + overview)
// and lists the six analogy titles; the right column shows the cover, also a link
// into the story, at a 16:9 ratio. Each analogy title is a button: clicking (or
// pressing Enter on) it opens a minimal popover with that analogy's description
// and an external link to its source.
export function LeadStory({ story }: { story: Story }) {
  const genre = genreMeta[story.genre];

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
              <li key={i}>
                <Popover.Root>
                  <Popover.Trigger>
                    <button type="button" className="analogy-trigger">
                      <Text size="1" weight="light">
                        {a.title}
                      </Text>
                    </button>
                  </Popover.Trigger>
                  <Popover.Content size="1" maxWidth="280px">
                    <Flex direction="column" gap="2">
                      <Text size="2">{a.excerpt}</Text>
                      <Link
                        href={a.href}
                        target="_blank"
                        rel="noreferrer"
                        size="2"
                      >
                        Read more at {hostname(a.href)} →
                      </Link>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
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
        {story.image ? (
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
