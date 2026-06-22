import { Badge, Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { CoverImage } from "./CoverImage";
import { categoryMeta, type Analogy } from "@/lib/stories";

// One analogy, shown as a card. The category badge carries that category's
// Radix accent (see `categoryMeta`); the card links out to the original source.
// An optional image bleeds to the card's top edge.
export function AnalogyCard({ analogy }: { analogy: Analogy }) {
  const meta = categoryMeta[analogy.category];
  return (
    <Card size="2" asChild>
      <a href={analogy.href} target="_blank" rel="noreferrer">
        {analogy.image ? (
          <CoverImage
            image={analogy.image}
            ratio={16 / 9}
            inset
            sizes="(max-width: 768px) 100vw, 360px"
          />
        ) : null}
        <Flex direction="column" gap="2" height="100%">
          <Badge color={meta.color} variant="soft" size="1">
            {meta.label}
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
