import { Box, Grid, Heading, Section, Separator } from "@radix-ui/themes";
import { getPublishedStories, type Story } from "@/lib/stories";
import { LeadStory } from "./components/LeadStory";
import { StoryCard } from "./components/StoryCard";

// The home index, grouped into its (up to three) editions, newest first. The
// newest edition leads with the editor's hero (LeadStory) over a three-column
// grid; older editions render as a labeled grid of cards beneath a clear
// edition heading, visually separated. Stories without an edition label fall
// into a single trailing "Earlier stories" group.
export default async function Home() {
  const stories = await getPublishedStories(); // ordered by rank, then date

  // Group by edition, preserving the rank order (so the first group is newest).
  const groups: { edition: string; stories: Story[] }[] = [];
  for (const story of stories) {
    const label = story.edition ?? "Earlier stories";
    let group = groups.find((g) => g.edition === label);
    if (!group) {
      group = { edition: label, stories: [] };
      groups.push(group);
    }
    group.stories.push(story);
  }

  return (
    <div className="page">
      {groups.map((group, index) => {
        const isNewest = index === 0;
        const lead = isNewest
          ? group.stories.find((s) => s.lead) ?? group.stories[0]
          : null;
        const rest = group.stories.filter((s) => s !== lead);

        return (
          <Section key={group.edition} size="2" pt={isNewest ? "0" : "6"}>
            {!isNewest ? <Separator size="4" mb="6" /> : null}
            <Heading
              as="h2"
              size="2"
              weight="medium"
              color="gray"
              mb="6"
              style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              {group.edition}
            </Heading>

            {lead ? (
              <Box mb="9">
                <LeadStory story={lead} />
              </Box>
            ) : null}

            <Grid
              columns={{ initial: "1", xs: "2", sm: "3" }}
              gapX="9"
              gapY="8"
            >
              {rest.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </Grid>
          </Section>
        );
      })}
    </div>
  );
}
