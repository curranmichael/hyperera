import type { Metadata } from "next";
import NextLink from "next/link";
import { Flex, Heading, Link, Section, Separator, Text } from "@radix-ui/themes";
import { listIssues } from "@/lib/stories.server";
import { IssueMeta } from "@/app/components/IssueView";

export const metadata: Metadata = {
  title: "Archive — Hyperera",
  description: "Every issue of Hyperera, newest first.",
};

export default async function ArchivePage() {
  const issues = await listIssues();

  return (
    <div className="page">
      <Section size="2" pt="0">
        <Heading as="h1" size="6" weight="regular" mb="6" className="wordmark">
          Archive
        </Heading>

        {issues.length === 0 ? (
          <Text size="3" color="gray">
            No issues have been published yet.
          </Text>
        ) : (
          <Flex direction="column" gap="5">
            {issues.map((issue, i) => (
              <Flex key={issue.number} direction="column" gap="2">
                {i > 0 ? <Separator size="4" mb="3" /> : null}
                <Heading as="h2" size="4" weight="regular">
                  <Link asChild color="gray" underline="hover">
                    <NextLink href={`/issue/${issue.number}`}>
                      {issue.title}
                    </NextLink>
                  </Link>
                </Heading>
                <IssueMeta issue={issue} />
              </Flex>
            ))}
          </Flex>
        )}
      </Section>
    </div>
  );
}
