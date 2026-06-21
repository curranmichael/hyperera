import NextLink from "next/link";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { categoryMeta, categoryOrder, type Story } from "@/lib/stories";

// A single cell in the home grid. The whole card is a link into the story.
// `featured` renders the lead story larger; the page decides which cell spans.
export function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  return (
    <Card asChild size={featured ? "4" : "2"} className="story-card">
      <NextLink href={`/story/${story.slug}`}>
        <Flex direction="column" gap="2" height="100%">
          <Heading
            size={featured ? "6" : "4"}
            weight={featured ? "bold" : "medium"}
          >
            {story.headline}
          </Heading>
          <Text
            size={featured ? "3" : "2"}
            color="gray"
            className={
              featured ? "story-excerpt story-excerpt--featured" : "story-excerpt"
            }
          >
            {story.overview}
          </Text>
          <Box flexGrow="1" />
          <Flex align="center" justify="between" gap="3" mt="2">
            <Flex align="center" gap="1" aria-hidden>
              {categoryOrder.map((c) => (
                <span
                  key={c}
                  className="cat-dot"
                  style={{ backgroundColor: `var(--${categoryMeta[c].color}-9)` }}
                />
              ))}
            </Flex>
            <Text size="1" color="gray">
              {story.source} →
            </Text>
          </Flex>
        </Flex>
      </NextLink>
    </Card>
  );
}
