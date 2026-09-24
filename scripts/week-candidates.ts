// The week's corpus, as the weekly composition pass reads it. See lib/week.ts for
// how threads are merged and scored.
//
//   npm run week:candidates                       -- the 7 days ending today
//   npm run week:candidates -- --days 7 --end 2026-08-14
//   npm run week:candidates -- --start 2026-08-08 --end 2026-08-14
//   npm run week:candidates -- --limit 60 --out scratch/week.json
//   npm run week:candidates -- --db               -- query Neon directly
//
// By default it reads https://www.hyperera.news/api/week, so the weekly routine
// needs no database credential (override the site with HYPERERA_SITE_URL). `--db`
// builds the same payload from a local connection instead.
//
// Output is JSON (default scratch/week.json, gitignored).

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const DEFAULT_SITE = "https://www.hyperera.news";
const DEFAULT_OUT = join("scratch", "week.json");
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function arg(name: string): string | undefined {
  const flag = `--${name}`;
  const i = process.argv.indexOf(flag);
  if (i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--")) {
    return process.argv[i + 1];
  }
  const inline = process.argv.find((a) => a.startsWith(`${flag}=`));
  return inline?.slice(flag.length + 1);
}

function numberArg(name: string, fallback: number): number {
  const raw = arg(name);
  if (raw === undefined) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) {
    throw new Error(`--${name} must be a positive number, got ${raw}`);
  }
  return Math.trunc(n);
}

// Like arg(), but the value must be a YYYY-MM-DD date — everything downstream
// compares these as strings against `candidates.day`, so a malformed date would
// silently match nothing rather than error.
function dateArg(name: string): string | undefined {
  const raw = arg(name);
  if (raw !== undefined && !ISO_DATE.test(raw)) {
    throw new Error(`--${name} must be YYYY-MM-DD, got ${raw}`);
  }
  return raw;
}

async function fromDatabase(start: string, end: string, limit: number) {
  const { buildWeek } = await import("../lib/week");
  return buildWeek({ start, end, limit });
}

async function fromSite(start: string, end: string, limit: number) {
  const site = (process.env.HYPERERA_SITE_URL ?? DEFAULT_SITE).replace(/\/$/, "");
  const url = `${site}/api/week?start=${start}&end=${end}&limit=${limit}`;
  let lastError = "";
  // The edge occasionally answers an automated client with a transient 403/5xx;
  // a few spaced retries ride that out without masking a real failure.
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { accept: "application/json" } });
      const body = await res.text();
      if (res.ok) return JSON.parse(body);
      lastError = `${res.status} from ${url}: ${body.slice(0, 300)}`;
      if (res.status === 400 || res.status === 404) break;
    } catch (err) {
      lastError = `${url}: ${err instanceof Error ? err.message : String(err)}`;
    }
    await new Promise((r) => setTimeout(r, attempt * 5_000));
  }
  throw new Error(lastError);
}

async function main() {
  const end = dateArg("end") ?? new Date().toISOString().slice(0, 10);
  let start = dateArg("start");
  if (!start) {
    const from = new Date(`${end}T00:00:00Z`);
    from.setUTCDate(from.getUTCDate() - (numberArg("days", 7) - 1));
    start = from.toISOString().slice(0, 10);
  }
  const limit = numberArg("limit", 40);
  const out = arg("out") ?? DEFAULT_OUT;

  const payload = process.argv.includes("--db")
    ? await fromDatabase(start, end, limit)
    : await fromSite(start, end, limit);

  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, `${JSON.stringify(payload, null, 2)}\n`);

  const { counts } = payload;
  console.log(
    `${out}: ${counts.candidates} candidates → ${counts.threads} threads ` +
      `(${counts.news} news, ${counts.culture} culture) for ${start}..${end}; ` +
      `next issue is ${payload.issue.number}`,
  );
  const omitted = counts.omittedByLimit;
  if (omitted.news.count || omitted.culture.count) {
    console.log(
      `  capped at --limit ${limit}: omitted ${omitted.news.count} news, ` +
        `${omitted.culture.count} culture (titles listed in ${out})`,
    );
  }
  console.log(`  ${counts.multiDayThreads} thread(s) ran more than one day`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
