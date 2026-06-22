import { Box, Container, Grid, Section } from "@radix-ui/themes";
import { getPublishedStories } from "@/lib/stories";
import { StoryCard } from "./components/StoryCard";

// The home index: a full-width lead story over an intrinsic, media-query-free
// grid of cards (`auto-fill` + `min(…, 100%)` guard). The lead spans every
// column via `gridColumn="1 / -1"`, so the layout stays balanced at any width
// and any story count.
export default async function Home() {
  const stories = await getPublishedStories(); // ordered by rank, then date
  const lead = stories.find((s) => s.lead) ?? stories[0];
  const ordered = lead ? [lead, ...stories.filter((s) => s !== lead)] : [];

  return (
    <Container size="4" px="4">
      <Section size="2">
        <Grid
          columns="repeat(auto-fill, minmax(min(18rem, 100%), 1fr))"
          gap="var(--story-gap)"
        >
          {ordered.map((story, i) =>
            i === 0 ? (
              <Box key={story.slug} gridColumn="1 / -1">
                <StoryCard story={story} featured />
              </Box>
            ) : (
              <StoryCard key={story.slug} story={story} />
            ),
          )}
        </Grid>
      </Section>
    </Container>
  );
}
