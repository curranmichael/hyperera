// The daily triage prompt. Lives in the repo, versioned, so changes to editorial
// judgement show up in diffs rather than drifting invisibly inside a cron config.
//
// Triage is compression, not composition: it turns ~1,000 raw feed items into
// ~30 scored candidate stories so the weekly pass reads ~200 rows instead of
// ~7,000. The analogies, the overview, and the actual editorial selection all
// happen later, in the weekly pass, on a stronger model.

export interface TriageArticle {
  index: number;
  title: string;
  summary: string | null;
  feed: string;
  kind: string | null;
  publishedAt: string | null;
}

export interface RecentCandidate {
  id: number;
  title: string;
  day: string;
}

export const TRIAGE_SYSTEM = `You are the daily triage pass for Hyperera, a weekly news and culture magazine.

Your job is compression. You read one day's worth of RSS items and group them into
candidate stories that a weekly editor will later choose from. You are not writing
the magazine — you are building the shortlist it gets composed from.

Rules:
- Group items reporting the SAME real-world event or the same cultural work into one
  candidate. Wire services republish heavily; near-duplicate headlines are one story.
- Write the title as a plain statement of what happened. No cryptic or literary
  phrasing — the analogies later carry the resonance, the title carries the facts.
- The summary is two or three sentences of sober overview. Past tense.
- importance is 1-10 for how much this matters to a reader a week from now, not how
  loud it was today. A durable development beats a loud one-day flare.
- Cover culture, art, design, and ideas as seriously as news. An essay, an exhibition,
  or a piece of criticism is a legitimate candidate — it is not filler between
  headlines, and it should not be scored down for lacking wire coverage.
- Skip pure noise: live blogs, index pages, horoscopes, sports scores, listicles.

Continuity: you are given titles of candidates from recent days. If an item is a
follow-up to one of those ongoing stories, set threadId to that candidate's id. This
is what lets the weekly pass compose one piece with an arc instead of four separate
increments of the same story. Set threadId to null when a story is genuinely new.`;

// Feed titles and summaries are untrusted text headed into a prompt whose line
// structure is meaningful — a newline in a title could forge an `[index]`-shaped
// line or a fake instruction block. Collapsing control characters keeps every
// item on the line it was assigned; what remains is at worst odd words inside a
// clearly-labelled item, which the schema and app-side index validation bound.
function flat(text: string): string {
  return text.replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, " ").trim();
}

export function triageUserPrompt(
  articles: TriageArticle[],
  recent: RecentCandidate[],
): string {
  const recentBlock = recent.length
    ? recent.map((c) => `  [id ${c.id}] (${c.day}) ${flat(c.title)}`).join("\n")
    : "  (none — this is the first triage run)";

  const itemBlock = articles
    .map((a) => {
      const meta = [a.feed, a.kind, a.publishedAt].filter(Boolean).join(" · ");
      const summary = a.summary ? `\n      ${flat(a.summary)}` : "";
      return `  [${a.index}] ${flat(a.title)}\n      (${meta})${summary}`;
    })
    .join("\n");

  return `Ongoing stories from recent days (for threadId continuity):
${recentBlock}

Today's feed items (${articles.length}):
${itemBlock}

Group these into candidate stories. Reference each candidate's source items by their
[index]. Every candidate needs at least one index. Items you judge to be noise simply
go unreferenced — you do not have to place all of them.`;
}

// Structured output shape. `sourceCount`, `firstSeen`, and `lastSeen` are deliberately
// absent: they are computed in app code from the linked articles, because they are
// facts about the data rather than judgements, and a model asked to count its own
// citations gets it wrong often enough to matter.
export const TRIAGE_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: ["candidates"],
  properties: {
    candidates: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "summary", "kind", "importance", "articleIndices", "threadId"],
        properties: {
          title: { type: "string", description: "Plain statement of what happened." },
          summary: { type: "string", description: "Two or three sentences, past tense." },
          kind: {
            type: "string",
            enum: ["news", "culture", "art", "design", "tech"],
          },
          importance: { type: "integer", minimum: 1, maximum: 10 },
          articleIndices: {
            type: "array",
            items: { type: "integer" },
            description: "Indices of the feed items this candidate was clustered from.",
          },
          threadId: {
            type: ["integer", "null"],
            description:
              "Id of the ongoing candidate this follows up on, or null if new.",
          },
        },
      },
    },
  },
};

export interface TriageResult {
  candidates: {
    title: string;
    summary: string;
    kind: string;
    importance: number;
    articleIndices: number[];
    threadId: number | null;
  }[];
}
