import NextLink from "next/link";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { CoverImage } from "./CoverImage";
import { formatStoryDate, genreMeta, type Story } from "@/lib/stories";

// A single cell in the home grid: a square cover above the headline, with the
// source and date beneath. The whole card links into the story. The cover keeps
// its own colour at half saturation and blooms into the genre duotone on hover.
export function StoryCard({ story }: { story: Story }) {
  const genre = genreMeta[story.genre];

  return (
    <Card asChild variant="ghost" size="2" className="story-card">
      <NextLink href={`/story/${story.slug}`}>
        <Flex direction="column" gap="2" height="100%">
          {story.image ? (
            <CoverImage
              image={story.image}
              ratio={1}
              tint={genre.color}
              tintOnHover
              sizes="(max-width: 640px) 100vw, 280px"
            />
          ) : null}
          <Heading size="4" weight="regular">
            {story.headline}
          </Heading>
          <Flex align="center" justify="between" gap="3" mt="auto">
            <Text size="1" color="gray">
              {story.sources.map((s) => s.name).join(", ")}
            </Text>
            <Text size="1" color="gray">
              {formatStoryDate(story.publishedAt)}
            </Text>
          </Flex>
        </Flex>
      </NextLink>
    </Card>
  );
}
