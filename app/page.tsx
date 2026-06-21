import { Box, Container, Grid, Section } from "@radix-ui/themes";
import { getPublishedStories } from "@/lib/stories";
import { StoryCard } from "./components/StoryCard";

// The home index: published stories on an intrinsic, media-query-free grid
// (`auto-fill` + `min(…, 100%)` guard). The lead story spans 2×2 as a hero on
// wider screens via Radix's `gridColumn` / `gridRow` props, collapsing to a
// normal cell below the `sm` breakpoint. `flow="dense"` backfills the gap.
export default async function Home() {
  const stories = await getPublishedStories();

  return (
    <Container size="4" px="4">
      <Section size="2">
        <Grid
          columns="repeat(auto-fill, minmax(min(18rem, 100%), 1fr))"
          flow="dense"
          gap="clamp(1rem, 0.75rem + 1.25vw, 2rem)"
          style={{ gridAutoRows: "minmax(11rem, auto)" }}
        >
          {stories.map((story, i) =>
            i === 0 ? (
              <Box
                key={story.slug}
                gridColumn={{ initial: "auto", sm: "span 2" }}
                gridRow={{ initial: "auto", sm: "span 2" }}
              >
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
