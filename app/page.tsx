import { Grid, Heading, Section, Separator } from "@radix-ui/themes";
import { getPublishedStories, type Story } from "@/lib/stories";
import { LeadStory } from "./components/LeadStory";
import { StoryCard } from "./components/StoryCard";

// The home index, grouped into its (up to three) editions in order, newest
// first. Every edition keeps its own formatting: the editor's lead story as a
// hero (headline, cover, analogy band) over a three-column grid of the rest,
// each under its own heading, visually separated. The grid collapses to two
// then one column on narrower viewports.
export default async function Home() {
  const stories = await getPublishedStories(); // ordered by rank, then date
  const editions = groupByEdition(stories);

  return (
    <div className="page">
      {editions.map((edition, index) => {
        const isNewest = index === 0;
        const lead = edition.stories.find((s) => s.lead) ?? edition.stories[0];
        const rest = edition.stories.filter((s) => s !== lead);

        return (
          <Section key={edition.label} size="2" pt={isNewest ? "0" : "6"}>
            {!isNewest ? <Separator size="4" mb="6" /> : null}
            <Heading
              as="h2"
              size="3"
              weight="regular"
              color="gray"
              mb="8"
              className="edition-heading"
            >
              {edition.label}
            </Heading>

            <LeadStory story={lead} priority={isNewest} />

            {rest.length ? (
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
            ) : null}
          </Section>
        );
      })}
    </div>
  );
}

// Group the rank-ordered stories into editions, preserving first-seen order so
// the newest edition (lowest ranks) comes first. Stories without an edition
// label fall together under a trailing "Earlier Stories" group.
function groupByEdition(
  stories: Story[],
): { label: string; stories: Story[] }[] {
  const groups: { label: string; stories: Story[] }[] = [];
  const indexByLabel = new Map<string, number>();

  for (const story of stories) {
    const label = story.edition ?? "Earlier Stories";
    let index = indexByLabel.get(label);
    if (index === undefined) {
      index = groups.length;
      indexByLabel.set(label, index);
      groups.push({ label, stories: [] });
    }
    groups[index].stories.push(story);
  }

  return groups;
}
