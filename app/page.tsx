import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";

type AnalogyCategory = "historical" | "literary" | "artistic";

interface Analogy {
  category: AnalogyCategory;
  title: string;
  excerpt: string;
  source: string;
  href: string;
}

interface Story {
  headline: string;
  overview: string;
  source: string;
  href: string;
  analogies: Analogy[];
}

const categoryLabel: Record<AnalogyCategory, string> = {
  historical: "Historical",
  literary: "Literary",
  artistic: "Musical / Artistic",
};

// Placeholder content. Stories will be seeded from RSS feeds and analogies
// surfaced via the Anthropic API in later stages.
const sampleStory: Story = {
  headline: "A sample story stands in for tomorrow's feed",
  overview:
    "This card is a placeholder for the overview hyper-era will compose from scanned RSS feeds. Each news item is paired with six analogies — two each from history, literature, and the arts — to trade the libidinal pull of the headline for a well-informed perspective.",
  source: "hyper-era",
  href: "https://are.na/curran-dwyer/hyperera",
  analogies: [
    {
      category: "historical",
      title: "Historical analogy A",
      excerpt:
        "A past event that rhymes with the present, drawn from the historical record.",
      source: "Source",
      href: "#",
    },
    {
      category: "historical",
      title: "Historical analogy B",
      excerpt:
        "A second precedent, offering a different angle on the same dynamic.",
      source: "Source",
      href: "#",
    },
    {
      category: "literary",
      title: "Literary analogy A",
      excerpt:
        "A passage or narrative whose theme illuminates the situation.",
      source: "Source",
      href: "#",
    },
    {
      category: "literary",
      title: "Literary analogy B",
      excerpt: "A contrasting text that complicates the easy reading.",
      source: "Source",
      href: "#",
    },
    {
      category: "artistic",
      title: "Musical / artistic analogy A",
      excerpt:
        "A work of music or visual art that resonates with the moment.",
      source: "Source",
      href: "#",
    },
    {
      category: "artistic",
      title: "Musical / artistic analogy B",
      excerpt: "Another piece that reframes the feeling of the event.",
      source: "Source",
      href: "#",
    },
  ],
};

function AnalogyCard({ analogy }: { analogy: Analogy }) {
  return (
    <Card size="2" asChild>
      <a href={analogy.href}>
        <Flex direction="column" gap="2" height="100%">
          <Badge color="gray" variant="soft" size="1">
            {categoryLabel[analogy.category]}
          </Badge>
          <Heading size="3" weight="medium">
            {analogy.title}
          </Heading>
          <Text size="2" color="gray">
            {analogy.excerpt}
          </Text>
          <Box flexGrow="1" />
          <Text size="1" color="gray">
            {analogy.source} →
          </Text>
        </Flex>
      </a>
    </Card>
  );
}

export default function Home() {
  return (
    <Container size="3" px="4">
      <Section size="2">
        <Flex direction="column" gap="2">
          <Heading size="8" weight="bold">
            hyper-era
          </Heading>
          <Text size="3" color="gray">
            Exploring the present through lenses from the past and future.
          </Text>
        </Flex>
      </Section>

      <Separator size="4" />

      <Section size="3">
        <Flex direction="column" gap="3">
          <Badge color="gray" variant="surface" size="1">
            Story
          </Badge>
          <Heading size="6">{sampleStory.headline}</Heading>
          <Text size="3">{sampleStory.overview}</Text>
          <Link href={sampleStory.href} size="2" color="gray">
            {sampleStory.source} →
          </Link>
        </Flex>
      </Section>

      <Section size="2" pt="0">
        <Flex direction="column" gap="4">
          <Heading size="4" weight="medium">
            Analogies
          </Heading>
          <Grid
            columns={{ initial: "1", sm: "2", md: "3" }}
            gap="4"
            width="auto"
          >
            {sampleStory.analogies.map((analogy, i) => (
              <AnalogyCard key={i} analogy={analogy} />
            ))}
          </Grid>
        </Flex>
      </Section>
    </Container>
  );
}
