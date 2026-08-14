# Hyperera — Technical Architecture

## 1. What Hyperera is

A counter-publication to the headline. The news cycle is "pornographic in nature, feeding the
libido without helping a person cultivate a well-informed perspective." Hyperera's response is to
slow the reader down and re-frame the present through **analogy across time** — taking its cue from
hypertext and hypermedia, and from Hofstadter's claim that analogy is the core of cognition.

Every story carries six analogies across three categories, two each:

- **Historical** — precedents from the historical record
- **Literary** — passages and narratives whose themes illuminate the moment (speculative and science
  fiction welcome — this is how the "future" lens enters: through *verifiable* art, not punditry)
- **Musical / artistic** — works of music or visual art that resonate with the event

Each analogy is paired with a **rights-clean image of its subject** — the artwork itself, a
manuscript page, a portrait, a title page — from Wikimedia Commons or an open archive, never
AI-generated. Omitted only when nothing rights-clean can be found.

Hyperera publishes **one issue a week**, on Friday. It ran as a thrice-daily edition until August
2026; the final daily editions are preserved in the archive as issues 1–5, and the weekly numbering
continues from there.

UI inspiration: the [Hyperera are.na channel](https://are.na/curran-dwyer/hyperera).

## 2. The shape of the system

Two crons write to Postgres, one Claude routine reads and writes Postgres, and a git push builds a
static site from Postgres. Data flows one direction and no service calls another service.

```
  05:00 daily          06:00 daily              Friday morning
┌──────────────┐   ┌──────────────────┐   ┌────────────────────────────────────┐
│ /api/ingest  │   │ /api/triage      │   │ Claude routine · /publish-weekly   │
│ Vercel cron  │   │ Vercel cron      │   │ composes, publishes, ships covers  │
└──────┬───────┘   └────────┬─────────┘   └─────────┬──────────────────┬───────┘
       │ ~1,000/day          │ ~30/day               │ 15–20/week       │ covers PR
       ▼                     ▼                       ▼                  ▼
   articles ──────────▶ candidates ───────────▶ issues · stories    merge to main
      │  candidate_articles  │   story_candidates  · analogies  ──▶  one build/week
      └──────────────────────┴──────────────────────┘                (static HTML)
                    provenance chain
```

The routine publishes unattended, the way the thrice-daily edition routine did. The
merge of its covers PR is what deploys — a git push has always been this project's
build trigger, and moving the magazine into Postgres didn't change that.

Every stage is idempotent, so the recovery procedure for any failure is *run it again*:

| Stage | Idempotency key |
| --- | --- |
| ingest | `unique (feed_id, guid)` with `on conflict do nothing` |
| triage | `articles.triaged_at` — the watermark lives in the data, not in a runs table |
| publish | `issues.number` is unique, and a published issue is never rewritten |

The full provenance chain is walkable end to end:
`story → candidates → articles → source URL + feed + publish date`.

## 3. Why the layers exist

Three findings from measuring the feeds drove this design.

**The news feeds don't hold a week; the culture feeds do.** AP and Reuters via Google News hold ~1
day; BBC World ~2.8 days. But BBC's section feeds run deep (Science ~138d, Business ~92d, In Depth
~43d), as do the culture sources (Public Domain Review ~434d, Paris Review ~20d, Aeon ~19d). A
weekly magazine that reads feeds live on Friday would simply not see Monday.

**Google News caps every query at 100 items and rejects time filters on ranked feeds.** Day-sharding
with explicit `after:`/`before:` bounds returns 668 unique items against 101 for a single `when:7d`
call — 6.6×, and the `when:7d` set is a strict subset. Hence `fetch_strategy = 'daily_shard'`, and
hence backfill by date is possible at all.

**"Top stories for the week" cannot be queried anywhere.** No feed exposes ranking or popularity.
Importance has to be *computed* from a stored week — which is what candidates are for, and why
`source_count` (how many independent feeds carried a story) matters: cross-source corroboration is
the closest thing to a ranking signal RSS offers.

## 4. Data model

```sql
-- The editable list of feeds. Seeded from lib/feeds.ts by `npm run db:seed`.
feeds(id, title, url, kind, fetch_strategy, url_template, active, created_at)
      -- fetch_strategy: static | daily_shard   (daily_shard expands url_template per day)

-- Raw feed items. Swept after 60 days unless a candidate references them.
articles(id, feed_id, guid, title, url, summary, published_at, triaged_at, created_at)
         -- unique (feed_id, guid); triaged_at null = not yet clustered

-- One clustered story-of-the-day: ~30 rows stand in for ~1,000 articles.
candidates(id, day, title, summary, kind, importance, source_count,
           first_seen, last_seen, thread_id, created_at)
           -- thread_id → candidates.id: follow-ups point at the day the story opened

candidate_articles(candidate_id, article_id)   -- provenance

-- The magazine.
issues(id, number, title, week_start, week_end, status, published_at, created_at)
       -- status: draft | published — the editorial gate, and the filter every public read applies

stories(id, issue_id, slug, headline, overview, genre, sources, rank, lead,
        image_src, image_alt, image_credit, published_at, created_at)
        -- sources is jsonb: display-only provenance, never queried

analogies(id, story_id, position, category, title, source, excerpt, href,
          image_src, image_alt, image_credit, verification_status, created_at)
          -- six per story, two per category; position preserves authored order

story_candidates(story_id, candidate_id)       -- closes the chain
```

Schema changes go through `npm run db:generate`; `drizzle/` is generated and never hand-edited.

**Threads are the weekly unit.** A story running Monday→Thursday is four candidate rows sharing one
`thread_id`, which is what lets the weekly pass compose one piece with an arc instead of four
increments. It also makes "ran 5 of 7 days" a `count(distinct day) group by thread_id` query — an
editorial signal a daily edition structurally cannot see. It is a query, not a feature: there is no
trends table, page, or chart.

## 5. The daily pipeline

### `/api/ingest` — 05:00 UTC

Fetches every active feed concurrently, parses with `rss-parser`, inserts with
`on conflict do nothing`. Per-feed errors are captured, never thrown: the Google News API is
undocumented and reverse-engineered, so a silent format change must degrade one feed rather than
fail the run.

- `daily_shard` feeds expand into one URL per day, fetched in sequence, each shard carrying its own
  100-item budget. Shards that come back at the cap are reported as `truncated` — visible truncation
  beats silent partial coverage.
- `?days=N` (default 2, max 14) backfills a missed window. Only day-sharded feeds can be backfilled
  by date; static feeds expose whatever their rolling window holds. The default of 2 exists because a
  single-day window leaves a hole: the "today" shard fetched at 05:00 captures only what published
  before it, and nothing revisits that day.
- Finishes with the retention sweep: delete `articles` older than 60 days that **no**
  `candidate_articles` row references.

### `/api/triage` — 06:00 UTC

One structured-output call on **Sonnet** — this is compression, not judgement; Opus is reserved for
weekly composition. It reads every article with `triaged_at is null`, plus 14 days of existing
candidate titles for thread continuity, and returns clusters with `importance` and source indices.

`source_count`, `first_seen` and `last_seen` are computed in app code from the linked articles rather
than asked of the model: they are facts about the data, and a model asked to count its own citations
gets it wrong often enough to matter.

Candidates and the `triaged_at` stamp are written in one transaction, and *every* article in the
batch is stamped — including ones no candidate referenced — or the noise is re-read forever. A
`MAX_ARTICLES` cap of 1,200 is a safety valve against the 300s function limit, not a batching
strategy: the remainder keeps its null watermark and the next run picks it up.

## 6. The weekly pass

The prompt is `.claude/commands/publish-weekly.md`, versioned in the repo rather than pasted into
routine config where it would drift invisibly. A Claude routine runs it Friday morning:

1. `npm run week:candidates` → `scratch/week.json`: the week's candidates merged by thread, each with
   its arc, corroboration score, provenance, and last week's headlines for cross-week dedupe.
2. Select 15–20 by filling **department slots, not one global ranking**.
   `importance × source_count × day_span` is a corroboration score — right for news, structurally
   wrong for culture, where an Aeon essay has one source and one day by nature and would lose every
   global sort. News ranks by the formula; culture ranks on importance alone.
3. Compose each story: headline, the week's arc in past/summary framing (not daily wire copy), and
   six analogies with verbatim excerpts and canonical links.
4. Source and dither images to `public/covers/` via `scripts/dither-art.ts` (remote, rights-clean) and
   `scripts/generate-covers.ts` (generated, for covers only).
5. `npm run issue:publish` validates and writes the issue with its `story_candidates` links.
6. Push the covers on a `claude/issue-<n>-covers` branch, open a PR carrying the lineup, and merge
   it. The merge builds `main`, and the issue goes live with its images.

Dedupe across days and weeks is a prompt-level mechanism: 14 days of candidate titles in the triage
prompt, last week's headlines in the weekly one. No embeddings. Add vectors only if duplicate threads
show up in a real issue.

### Publishing and the build

Validation, not approval, is what stands between a composed issue and readers. `publish-issue.ts`
refuses genres outside the vocabulary, analogy sets that aren't two-per-category, malformed links
(well-formedness only — nothing here fetches an href, so link *resolution* is the composing
routine's responsibility), missing lead, duplicate slugs, cover files absent from disk, and
`candidateIds` that resolve to nothing. It reports every failure in one pass, because it runs at
the end of a long composition and failing one at a time would mean six re-runs.

Two properties keep an unattended publisher safe:

- **A published issue is never rewritten.** `--replace` refuses one. Readers hold those URLs, so a
  mistake is fixed forward — in the next issue, or with a corrected story — never by mutating
  what shipped.
- **`--draft` still exists** for staging an issue you want to look at before it counts. Re-running
  without it publishes. Nothing in the request path ever returns a draft.

The covers PR is the audit trail: one per issue, carrying the lineup in its body, which is what to
read when something looks wrong after the fact. `claude/*` branches skip preview builds
(`ignoreCommand` in `vercel.json`), so the merge to `main` is the week's only build.

## 7. The site

`lib/stories.ts` holds the reading model's types and presentation vocabulary and is imported by
client components, so it must stay free of runtime imports. The Drizzle queries live beside it in
`lib/stories.server.ts` — a server/client boundary, not a repository layer. Three read paths do not
justify repositories, DTOs, or mappers.

Only stories in a **published** issue are ever returned. A staged draft is invisible to every read
path, so it can sit in the database indefinitely without leaking.

**Genres are departments.** The twelve-genre list (`Politics · Conflict · Economy · Climate ·
Science · Technology · Culture · Art · Books · Music · Film · Architecture`) *is* the department
list — one vocabulary, one column, no parallel `department` field and no taxonomy table. The culture
half was added when the publication went weekly: the original seven were news-shaped, and "Culture"
had become the largest bucket by carrying everything that wasn't politics or economics.

| Route | What it is |
| --- | --- |
| `/` | the current issue, grouped by department, lead story as hero |
| `/issue/[number]` | a back issue, same layout |
| `/archive` | every published issue, newest first |
| `/story/[slug]` | one story with its six analogies |

Build time stays flat as the archive grows: `generateStaticParams` prerenders only the 8 most recent
issues and their stories, with `dynamicParams: true` so older ones render on demand and are cached
from then on. `DATABASE_URL` must therefore be present in the **Build** environment, not just
Production.

## 8. Environment & deployment

| Variable | Used by |
| --- | --- |
| `DATABASE_URL` | deployed app and local fallback; required at build time as well as runtime |
| `HYPERERA_DATABASE_URL` | weekly cloud routine; deliberately wins over an integration-injected `DATABASE_URL` |
| `CRON_SECRET` | `/api/ingest`, `/api/triage` — both fail closed when unset |
| `AI_GATEWAY_API_KEY` | triage, cover generation |

Builds run on pushes to `main`, as they always have. `claude/*` branches are skipped by the
`ignoreCommand` so the routine's covers branch doesn't burn a preview build; merging it does the one
build that matters. Cron schedules live in `vercel.json`; the weekly publish is a Claude routine, not
a Vercel cron.

**The routine's cloud environment** needs two variables — `HYPERERA_DATABASE_URL` and
`AI_GATEWAY_API_KEY` (Step 4's cover generation) — and these hosts under Custom network access, since the
[default allowlist](https://code.claude.com/docs/en/cloud-environments) covers package registries
and GitHub but none of what the publish pass actually talks to:

- `*.neon.tech` over HTTPS/WSS 443 — `week:candidates` and `issue:publish`
- `upload.wikimedia.org`, `commons.wikimedia.org` — analogy artwork for `dither-art.ts`
- `ai-gateway.vercel.sh` — generated covers
- `www.hyperera.news` — the Step 7 post-deploy check

Cloud environments have no secrets store and their variables are readable by anyone using the
environment, so the routine should hold a Neon role scoped to this database rather than the owner
connection string. The publication-specific variable name is intentional: `lib/db` refuses a
generic `DATABASE_URL` outside Vercel when the surrounding variables show that a Neon integration
injected it. GitHub access goes through Anthropic's proxy and needs no token of its own.

## 9. Operating it

| Situation | What to do |
| --- | --- |
| Ingest missed a day | `curl -H "Authorization: Bearer $CRON_SECRET" .../api/ingest?days=3` |
| Triage failed | Nothing — the next run picks up everything still unstamped |
| Triage hit `MAX_ARTICLES` | `backlog: true` in the response; run it again to drain |
| Draft needs a revision | Re-run `npm run issue:publish -- --replace` |
| Issue published, site unchanged | No commit reached `main`; merge the covers PR (or push an empty commit) |
| A published issue is wrong | Fix forward — a corrected story or a note in the next issue. Never rewrite it |
| Feed went silent | Per-feed `error` in the ingest response; the run itself still succeeds |

## 10. What this deliberately does not have

The whole system is four moving parts. Each item below is something it does *not* need, and adding
one makes the project slower to change without making it better.

- **No orchestration layer.** No queues, no workflow engine, no durable execution. "Retry with
  backoff" is tomorrow's cron plus `?days=N`.
- **No embeddings for dedup.** Titles in the prompt are the dedup mechanism.
- **No admin surface.** The routine publishes what it composes, gated by validation rather than by a
  review UI. No auth library, no dashboard kit, no CMS, no draft-preview deployments. If an issue
  ever does need eyes before it ships, `--draft` stages it and a second command publishes it — that
  is the whole feature.
- **No caching layer.** The site is static HTML rebuilt weekly. There is nothing to cache.
- **No repository/service split.** Types in `lib/stories.ts`, queries in `lib/stories.server.ts`.
- **Sources stay jsonb; images stay columns.** Read-only display data with no query need doesn't get
  its own table.
- **Two fetch strategies, as an if-branch.** Not a strategy registry, not per-feed plugin modules.
- **One triage call.** Don't shard it per-feed until a single call demonstrably overflows the context
  or the 300s limit.

## 11. Known risks

- **Google's 100-item/day cap** truncates AP even when sharded. If coverage feels thin, shard further
  by section within each day. Truncation is reported per shard rather than hidden.
- **The Google News API is undocumented.** Every parameter is reverse-engineered with no SLA;
  `scoring=n` is already documented-but-dead. Per-feed error isolation is the mitigation.
- **Triage inside a 300s function.** One call over a day of headlines fits with room to spare; a
  large backlog drains across runs. If that stops being true, move triage into the Claude routine or
  use the Batches API.
- **`public/covers` grows without bound.** 22MB for three editions, and `.git` is already ~530MB. A
  permanent archive makes this unbounded — moving covers to Vercel Blob is deferred, not solved, and
  will bite within a year.
