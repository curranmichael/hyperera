import {
  Badge,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Section,
  Text,
} from "@radix-ui/themes";
import { AnalogyCard } from "./AnalogyCard";
import type { Story } from "@/lib/stories";

// The story template: one design that renders any story. The URL supplies the
// slug, the slug supplies the data, and this component supplies the layout —
// the same shape the starter landing page used, now data-driven.
export function StoryView({ story }: { story: Story }) {
  return (
    <Container size="3" px="4">
      <Section size="3">
        <Flex direction="column" gap="3">
          <Badge color="gray" variant="surface" size="1">
            Story
          </Badge>
          <Heading size="7">{story.headline}</Heading>
          <Text size="3">{story.overview}</Text>
          <Link
            href={story.href}
            size="2"
            color="gray"
            target="_blank"
            rel="noreferrer"
          >
            {story.source} →
          </Link>
        </Flex>
      </Section>

      <Section size="2" pt="0">
        <Flex direction="column" gap="4">
          <Heading size="4" weight="medium">
            Analogies
          </Heading>
          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4" width="auto">
            {story.analogies.map((analogy, i) => (
              <AnalogyCard key={i} analogy={analogy} />
            ))}
          </Grid>
        </Flex>
      </Section>
    </Container>
  );
}
