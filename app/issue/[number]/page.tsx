import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Flex, Section } from "@radix-ui/themes";
import { getIssue, listIssues, PRERENDERED_ISSUES } from "@/lib/stories.server";
import { IssueMeta, IssueView } from "@/app/components/IssueView";

export const dynamicParams = true;

// Digits only, so /issue/7 is the one canonical URL for issue 7 — Number()
// alone would also accept "007", "1e1", or " 7", cache each as its own page,
// and pass NaN through to the integer column for garbage segments.
function parseIssueNumber(raw: string): number | null {
  return /^\d+$/.test(raw) ? Number(raw) : null;
}

export async function generateStaticParams() {
  const issues = await listIssues(); // newest first
  return issues
    .slice(0, PRERENDERED_ISSUES)
    .map((i) => ({ number: String(i.number) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const parsed = parseIssueNumber(number);
  if (parsed === null) return {};
  const found = await getIssue(parsed);
  if (!found) return {};
  return {
    title: `${found.issue.title} — Hyperera`,
    description: `${found.issue.storyCount} stories.`,
  };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const parsed = parseIssueNumber(number);
  if (parsed === null) notFound();

  const found = await getIssue(parsed);
  if (!found) notFound();

  return (
    <div className="page">
      <Section size="2" pt="0">
        <Flex mb="5">
          <IssueMeta issue={found.issue} />
        </Flex>
        <IssueView issue={found.issue} stories={found.stories} />
      </Section>
    </div>
  );
}
