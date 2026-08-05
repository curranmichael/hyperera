import { Grid, Heading, Section, Text } from "@radix-ui/themes";
import {
  formatStoryDate,
  genreOrder,
  type Genre,
  type IssueSummary,
  type Story,
} from "@/lib/stories";
import { LeadStory } from "./LeadStory";
import { StoryCard } from "./StoryCard";

// One issue, grouped into departments. Shared by the home page (current issue)
// and the archive's back issues so a reader gets the same object either way.
//
// The editor's lead runs as a hero above the departments; every other story sits
// in its genre's grid. Departments run in `genreOrder` — news first, then culture
// — and an empty one simply doesn't render.
export function IssueView({
  issue,
  stories,
  priority = false,
}: {
  issue: IssueSummary;
  stories: Story[];
  priority?: boolean;
}) {
  const lead = stories.find((s) => s.lead) ?? stories[0];
  const rest = stories.filter((s) => s !== lead);
  const departments = groupByDepartment(rest);

  return (
    <>
      <Heading
        as="h2"
        size="3"
        weight="regular"
        color="gray"
        mb="8"
        className="edition-heading"
      >
        {issue.title}
      </Heading>

      {lead ? <LeadStory story={lead} priority={priority} /> : null}

      {departments.map(({ genre, stories: inGenre }) => (
        <Section key={genre} size="2" pt="6" pb="0">
          <Heading as="h3" size="2" weight="regular" color="gray" mb="6">
            {genre}
          </Heading>
          <Grid columns={{ initial: "1", xs: "2", sm: "3" }} gapX="9" gapY="8">
            {inGenre.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </Grid>
        </Section>
      ))}
    </>
  );
}

// The masthead line for a back issue: date range and story count.
export function IssueMeta({ issue }: { issue: IssueSummary }) {
  const range =
    issue.weekStart === issue.weekEnd
      ? formatStoryDate(issue.weekStart)
      : `${formatStoryDate(issue.weekStart)} – ${formatStoryDate(issue.weekEnd)}`;
  return (
    <Text size="2" color="gray">
      {range} · {issue.storyCount}{" "}
      {issue.storyCount === 1 ? "story" : "stories"}
    </Text>
  );
}

function groupByDepartment(
  stories: Story[],
): { genre: Genre; stories: Story[] }[] {
  const byGenre = new Map<Genre, Story[]>();
  for (const story of stories) {
    const bucket = byGenre.get(story.genre);
    if (bucket) bucket.push(story);
    else byGenre.set(story.genre, [story]);
  }
  // Fixed department order, skipping the ones this issue has nothing in.
  return genreOrder
    .filter((genre) => byGenre.has(genre))
    .map((genre) => ({ genre, stories: byGenre.get(genre)! }));
}
