// Pure pieces of the weekly composition pass, split from scripts/week-candidates.ts
// so they can be unit-tested — the script executes on import, this module doesn't.

// Which department a candidate's kind belongs to. This is the split the selection
// rule turns on: news is corroborated across wires, culture is singular by nature.
export const NEWS_KINDS = new Set(["news", "tech"]);

export type Department = "news" | "culture";

// The corroboration score: how many independent feeds carried a story, over how
// many days, weighted by how much it mattered. It is the right ranking for news
// and structurally wrong for culture — an Aeon essay has one source and one day by
// nature, and would lose every global sort it entered. So culture is ranked on
// importance alone and gets its own slots, rather than competing on a signal its
// sources cannot produce.
export function scoreOf(t: {
  department: Department;
  importance: number;
  sourceCount: number;
  daySpan: number;
}): number {
  return t.department === "news"
    ? t.importance * t.sourceCount * t.daySpan
    : t.importance;
}

// "Issue 4 · 10–16 August 2026", collapsing the month when the week doesn't cross one.
export function suggestTitle(number: number, start: string, end: string): string {
  const from = new Date(`${start}T00:00:00Z`);
  const to = new Date(`${end}T00:00:00Z`);
  const day = (d: Date) => d.getUTCDate();
  const month = (d: Date) =>
    new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(
      d,
    );
  const range =
    month(from) === month(to)
      ? `${day(from)}–${day(to)} ${month(to)} ${to.getUTCFullYear()}`
      : `${day(from)} ${month(from)} – ${day(to)} ${month(to)} ${to.getUTCFullYear()}`;
  return `Issue ${number} · ${range}`;
}
