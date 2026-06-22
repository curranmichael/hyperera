import NextLink from "next/link";
import { Badge, Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { CoverImage } from "./CoverImage";
import {
  categoryMeta,
  categoryOrder,
  formatStoryDate,
  genreMeta,
  type Story,
} from "@/lib/stories";

// A single cell in the home grid. The whole card is a link into the story.
// `featured` renders the lead story larger; the page decides which cell spans.
export function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  const cover = story.image ? (
    <CoverImage
      image={story.image}
      // The lead image fills its column so it spans the card's full height
      // beside the text; other cards keep a fixed crop above the text.
      fill={featured}
      ratio={3 / 2}
      inset
      side={featured ? { initial: "top", sm: "right" } : "top"}
      className={featured ? "featured-cover" : undefined}
      priority={featured}
      sizes={
        featured
          ? "(max-width: 768px) 100vw, 45vw"
          : "(max-width: 768px) 100vw, 360px"
      }
    />
  ) : null;

  const body = (
    <Flex direction="column" gap="2" height="100%" flexGrow="1" minWidth="0">
      <Box>
        <Badge color={genreMeta[story.genre].color} variant="soft" size="1">
          {story.genre}
        </Badge>
      </Box>
      <Heading size={featured ? "6" : "4"} weight={featured ? "bold" : "medium"}>
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
          {formatStoryDate(story.publishedAt)}
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <Card asChild size={featured ? "4" : "2"} className="story-card">
      <NextLink href={`/story/${story.slug}`}>
        {featured ? (
          // Title card: text left, image right (image on top when stacked).
          // `row-reverse` keeps the image — the first child, so it leads on
          // mobile — on the right of the row.
          <Flex
            direction={{ initial: "column", sm: "row-reverse" }}
            gap={{ initial: "4", sm: "6" }}
            height="100%"
          >
            {cover}
            {body}
          </Flex>
        ) : (
          <>
            {cover}
            {body}
          </>
        )}
      </NextLink>
    </Card>
  );
}
