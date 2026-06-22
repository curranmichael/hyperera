import { Fragment } from "react";
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
import { CoverImage } from "./CoverImage";
import { formatStoryDate, genreMeta, type Story } from "@/lib/stories";

// The story template: one design that renders any story. The URL supplies the
// slug, the slug supplies the data, and this component supplies the layout.
export function StoryView({ story }: { story: Story }) {
  return (
    <Container size="3" px="4">
      <Section size="3">
        <Flex direction="column" gap="3">
          {story.image ? (
            <CoverImage
              image={story.image}
              ratio={16 / 9}
              tint={genreMeta[story.genre].color}
              showCredit
              priority
              sizes="(max-width: 880px) 100vw, 880px"
            />
          ) : null}

          {/* Inline eyebrow: genre · sources · date */}
          <Flex align="center" gap="2" wrap="wrap">
            <Badge color={genreMeta[story.genre].color} variant="soft" size="1">
              {story.genre}
            </Badge>
            {story.sources.length > 0 ? (
              <Text size="2" color="gray">
                {story.sources.map((s, i) => (
                  <Fragment key={`${s.name}-${i}`}>
                    {i > 0 ? " · " : null}
                    <Link
                      href={s.href}
                      color="gray"
                      underline="hover"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.name}
                    </Link>
                  </Fragment>
                ))}
              </Text>
            ) : null}
            <Text size="2" color="gray" aria-hidden>
              ·
            </Text>
            <Text size="2" color="gray">
              {formatStoryDate(story.publishedAt)}
            </Text>
          </Flex>

          <Heading size="7">{story.headline}</Heading>
          <Text size="3">{story.overview}</Text>
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
