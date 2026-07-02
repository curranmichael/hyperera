import NextLink from "next/link";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";

// The site masthead, shared by every page via the root layout. The wordmark is
// optically centered; "Atlas" and "About" sit at the right edge (absolutely
// placed so they don't pull the wordmark off center). All are set in ABC
// Favorit Extended. On narrow screens the two-link row would collide with the
// centered wordmark, so a media query in globals.css drops the masthead to a
// plain left/right split (see .masthead / .masthead__links).
// It sticks to the top on scroll as a frosted bar: a translucent page-color fill
// over a large backdrop blur, so it matches the body at rest yet frosts content
// scrolled beneath it. Lifted above later stacking contexts by z-index.
export function SiteHeader() {
  return (
    <Box
      asChild
      position="sticky"
      top="0"
      style={{
        zIndex: 10,
        backgroundColor: "color-mix(in srgb, var(--gray-1) 72%, transparent)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <header>
        <div className="page">
          <Flex
            align="center"
            justify="center"
            position="relative"
            py="5"
            className="masthead"
          >
            <Heading asChild size="7" weight="regular" className="wordmark">
              <NextLink href="/">Hyperera</NextLink>
            </Heading>
            <Box position="absolute" right="0" className="masthead__links">
              <Flex gap="4">
                <Text asChild size="3" className="wordmark">
                  <NextLink href="/maps">Atlas</NextLink>
                </Text>
                <Text asChild size="3" className="wordmark">
                  <NextLink href="/about">About</NextLink>
                </Text>
              </Flex>
            </Box>
          </Flex>
        </div>
      </header>
    </Box>
  );
}
