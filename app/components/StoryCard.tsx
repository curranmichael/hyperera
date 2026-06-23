import NextLink from "next/link";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
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
  // Kept after dropping the genre badge so the card's text can carry the genre's
  // accent color (`genre.color`) instead — every line in the card is this shade.
  const genre = genreMeta[story.genre];

  const cover = story.image ? (
    <CoverImage
      image={story.image}
      // The lead image fills its column so it spans the card's full height
      // beside the text; other cards keep a fixed crop above the text.
      fill={featured}
      ratio={3 / 2}
      tint={genre.color}
      inset
      side={featured ? { initial: "top", md: "right" } : "top"}
      className={featured ? "featured-cover" : undefined}
      priority={featured}
      sizes={
        featured
          ? "(max-width: 1024px) 100vw, 66vw"
          : "(max-width: 768px) 100vw, 360px"
      }
    />
  ) : null;

  const body = (
    <Flex direction="column" gap="2" height="100%" flexGrow="1" minWidth="0">
      <Heading
        size={featured ? "6" : "4"}
        weight={featured ? "bold" : "medium"}
        color={genre.color}
      >
        {story.headline}
      </Heading>
      <Text
        size={featured ? "3" : "2"}
        color={genre.color}
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
        <Text size="1" color={genre.color}>
          {formatStoryDate(story.publishedAt)}
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <Card asChild variant="ghost" size={featured ? "4" : "2"} className="story-card">
      <NextLink href={`/story/${story.slug}`}>
        {featured ? (
          // Title card: text in column 1, image spanning columns 2–3 (its right
          // edge meets the container edge), so the lead lines up with the page's
          // three-column grid. `--story-gap` matches the page grid's gap, so the
          // tracks coincide. Below md the grid collapses to one column and the
          // card stacks with the image on top (cover is the first child). The
          // cover is placed explicitly (grid-column: 2 / 4 in CSS), so body
          // auto-flows into column 1.
          <Grid
            columns={{ initial: "1", md: "3" }}
            gap={{ initial: "4", md: "var(--story-gap)" }}
            height="100%"
          >
            {cover}
            {body}
          </Grid>
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
