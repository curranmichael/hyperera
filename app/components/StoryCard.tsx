import NextLink from "next/link";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { type Story } from "@/lib/stories";

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
          <Text size="1" color="gray" mt="2">
            {story.source} →
          </Text>
        </Flex>
      </NextLink>
    </Card>
  );
}
