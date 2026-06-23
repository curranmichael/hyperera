import NextLink from "next/link";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";

// The site masthead, shared by every page via the root layout. The wordmark is
// optically centered; "About" sits at the right edge (absolutely placed so it
// doesn't pull the wordmark off center). Both are set in ABC Favorit Extended.
// It sticks to the top on scroll as a frosted bar: a translucent panel fill over
// a large backdrop blur, lifted above later stacking contexts by z-index.
export function SiteHeader() {
  return (
    <Box
      asChild
      position="sticky"
      top="0"
      style={{
        zIndex: 10,
        backgroundColor: "var(--color-panel-translucent)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <header>
        <div className="page">
          <Flex align="center" justify="center" position="relative" py="5">
            <Heading asChild size="7" weight="regular" className="wordmark">
              <NextLink href="/">Hyperera</NextLink>
            </Heading>
            <Box position="absolute" right="0">
              <Text asChild size="3" className="wordmark">
                <NextLink href="/about">About</NextLink>
              </Text>
            </Box>
          </Flex>
        </div>
      </header>
    </Box>
  );
}
