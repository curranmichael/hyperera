// Publish committed issues into Neon. Runs before `next build` (see package.json).
//
// The weekly routine holds no database credential. It commits its composed issue
// to content/issues/<number>.json alongside the covers, and this step — running
// in the Vercel build, which already has DATABASE_URL — writes it. So the merge
// that ships the covers is also the publish, and the prerender that follows sees
// the new issue.
//
// Idempotent: an issue whose number is already published is skipped, so every
// later build is a no-op for it (published issues are never rewritten). A draft
// with the same number is replaced by the committed file. Anything that fails
// validation fails the build loudly — the previous deployment stays live rather
// than shipping a half-published issue.

import { spawnSync } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { inArray } from "drizzle-orm";
import { db } from "../lib/db";
import { issues } from "../lib/db/schema";

const DIR = join(process.cwd(), "content", "issues");

async function main() {
  let files: string[];
  try {
    files = (await readdir(DIR)).filter((f) => f.endsWith(".json")).sort();
  } catch {
    files = [];
  }
  if (files.length === 0) {
    console.log("import-issues: no committed issues");
    return;
  }

  const byNumber = new Map<number, string>();
  for (const file of files) {
    const { number } = JSON.parse(await readFile(join(DIR, file), "utf8")) as {
      number?: unknown;
    };
    if (!Number.isInteger(number) || (number as number) < 1) {
      throw new Error(`content/issues/${file}: "number" must be a positive integer`);
    }
    if (byNumber.has(number as number)) {
      throw new Error(`content/issues: two files claim issue ${number}`);
    }
    byNumber.set(number as number, file);
  }

  const existing = await db
    .select({ number: issues.number, status: issues.status })
    .from(issues)
    .where(inArray(issues.number, [...byNumber.keys()]));
  const status = new Map(existing.map((i) => [i.number, i.status]));

  for (const [number, file] of byNumber) {
    if (status.get(number) === "published") {
      console.log(`import-issues: issue ${number} already published — skipped`);
      continue;
    }
    console.log(`import-issues: publishing issue ${number} from content/issues/${file}`);
    const args = ["--import", "tsx", "scripts/publish-issue.ts", join("content", "issues", file)];
    if (status.get(number) === "draft") args.push("--replace");
    const run = spawnSync(process.execPath, args, { stdio: "inherit" });
    if (run.status !== 0) {
      throw new Error(`import-issues: issue ${number} failed to publish (see above)`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
