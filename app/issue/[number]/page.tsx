import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Flex, Section } from "@radix-ui/themes";
import { getIssue, listIssues } from "@/lib/stories.server";
import { IssueMeta, IssueView } from "@/app/components/IssueView";

// Prerender recent issues at build time; older ones render on demand and are then
// cached. Prerendering the whole archive would make build time grow with every
// issue published, for pages that are read once and never change.
const PRERENDERED_ISSUES = 8;

export const dynamicParams = true;

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
  const found = await getIssue(Number(number));
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
  const parsed = Number(number);
  if (!Number.isInteger(parsed)) notFound();

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
