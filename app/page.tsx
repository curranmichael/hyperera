import { Section, Text } from "@radix-ui/themes";
import { getCurrentIssue } from "@/lib/stories.server";
import { IssueView } from "./components/IssueView";

// The home page is the current issue, grouped into departments. Back issues live
// at /issue/[number] and are indexed at /archive — publishing a new issue no
// longer drops the old one.
export default async function Home() {
  const current = await getCurrentIssue();

  if (!current) {
    return (
      <div className="page">
        <Section size="2">
          <Text size="3" color="gray">
            No issue has been published yet.
          </Text>
        </Section>
      </div>
    );
  }

  return (
    <div className="page">
      <Section size="2" pt="0">
        <IssueView issue={current.issue} stories={current.stories} priority />
      </Section>
    </div>
  );
}
