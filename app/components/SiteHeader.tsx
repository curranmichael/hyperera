import NextLink from "next/link";
import { Box, Container, Flex, Heading, Separator, Text } from "@radix-ui/themes";

// The site masthead, shared by every page via the root layout. The wordmark
// links home; the rule beneath it spans the full width.
export function SiteHeader() {
  return (
    <Box asChild>
      <header>
        <Container size="4" px="4">
          <Flex direction="column" gap="1" py="5">
            <Heading asChild size="7" weight="bold" trim="start">
              <NextLink href="/">Hyperera</NextLink>
            </Heading>
            <Text size="2" color="gray">
              Exploring the present through lenses from the past and future.
            </Text>
          </Flex>
        </Container>
        <Separator size="4" />
      </header>
    </Box>
  );
}
