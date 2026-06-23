import { Grid, Section } from "@radix-ui/themes";
import { getPublishedStories } from "@/lib/stories";
import { LeadStory } from "./components/LeadStory";
import { StoryCard } from "./components/StoryCard";

// The home index: the editor's lead story as a hero, over a three-column grid
// of the remaining stories. The grid collapses to two then one column on
// narrower viewports.
export default async function Home() {
  const stories = await getPublishedStories(); // ordered by rank, then date
  const lead = stories.find((s) => s.lead) ?? stories[0];
  const rest = stories.filter((s) => s !== lead);

  return (
    <div className="page">
      <Section size="2">
        {lead ? <LeadStory story={lead} /> : null}
        <Grid
          columns={{ initial: "1", xs: "2", sm: "3" }}
          gapX="9"
          gapY="8"
          mt="9"
        >
          {rest.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </Grid>
      </Section>
    </div>
  );
}
