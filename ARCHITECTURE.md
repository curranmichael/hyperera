# hyper-era — Technical Architecture

> Status: living document. Stages 1–2 are built (scaffold + RSS ingest); the stages below are the plan
> for what follows. Last revised to run a raw-LLM pipeline end-to-end first, with the example set and
> editorial review added at the end (see §4).

## 1. What hyper-era is

A counter-publication to the headline. The news cycle is "pornographic in nature, feeding the
libido without helping a person cultivate a well-informed perspective." hyper-era's response is to
slow the reader down and re-frame the present through **analogy across time** — taking its cue from
hypertext and hypermedia, and from Hofstadter's claim that analogy is the core of cognition.

The loop, per real-world **event** (not per article):

1. **Scan** the RSS feeds of various publications (a dynamic, editable list) into raw articles.
2. **Group** articles that report the same event into a single event.
3. **Compose** a sober overview of the situation.
4. **Analogize** — surface six analogies across three categories, two each:
   - **Historical** — precedents from the historical record
   - **Literary** — passages and narratives whose themes illuminate the moment (speculative/sci-fi
     works welcome — this is how the "future" lens enters: through *verifiable* art, not punditry)
   - **Musical / artistic** — works of music or visual art that resonate with the event
5. **Verify** — deterministic checks where possible (links resolve, excerpts match), adversarial or human
   review where not, before anyone sees it.
6. **Approve** — once a day, a human editor reviews the drafts and promotes the good ones.
7. **Present** — one analogy per card, each with a content excerpt and a link to the original source.

UI inspiration: the [hyper-era are.na channel](https://are.na/curran-dwyer/hyperera).

## 2. Decisions made

| Decision | Choice | Rationale |
| --- | --- | --- |
| **Story unit** | **Per-event, grouped** | One entry per real-world event, grouping articles across feeds. Better reading experience and ~5× cheaper than analyzing every near-duplicate. Matches the "fewer-but-better" ethos. |
| **"Future" lens** | **Via speculative fiction/art** | No fourth category. Speculative/sci-fi works (real Le Guin, Butler, Tarkovsky…) represent the future *through verifiable art*, not unmoored prediction — the thing HE opposes. |
| **Editorial** | **Daily human-in-the-loop** | The pipeline runs once a day and produces drafts; the editor approves/curates before anything publishes. Matches the are.na curation vibe; guards quality. |
| Analogy selection | **Raw LLM, examples last** | The model composes overviews and selects analogies directly. A hand-built set of *examples* is added last (Stage 7) to set tone and sharpen taste. Get the raw baseline working first, then see whether guidance helps. |
| Model tiering | **Cheap triage + Opus reasoning** | A cheap model (Haiku/Sonnet) groups articles and triages which events deserve a full pass; Opus 4.8 composes overviews and selects/proposes analogies. Keeps cost on-ethos (selective, not firehose). |
| Database | **Neon Postgres** | Serverless Postgres with native Vercel integration; relational model fits articles ↔ events ↔ analogies cleanly; generous free tier. |
| Framework | **Next.js (App Router, TS)** on Vercel | Already scaffolded. |
| UI | **Radix Themes** | Already scaffolded; card-based design. |
| LLM | **Anthropic API**, `claude-opus-4-8` | Composing overviews and selecting/proposing analogies. TS SDK `@anthropic-ai/sdk`. |

## 3. System overview

```
                 ┌──────────────────────────────────────────────┐
                 │  Vercel Cron — once daily                     │
                 │  runs the pipeline stages in order            │
                 └───────────────┬──────────────────────────────┘
                                 ▼
   1. ingest        2. group           3. analyze          4. verify
   fetch + parse    group articles     overview + six      fetch links,
   RSS feeds   ───▶ into one event ──▶ analogies      ───▶ validate excerpts,
   into articles    per real event     (Opus 4.8)          hold/flag bad ones
        │                │                  │                   │
        └────────────────┴─────────┬────────┴───────────────────┘
                                    ▼
                         ┌──────────────────────────┐
                         │  Neon Postgres            │
                         │  feeds · articles ·       │
                         │  events · event_articles ·│
                         │  analogies · examples    │
                         └──────────┬────────────────┘
                                    │ events in status = draft
                                    ▼
                         Admin review  (editor approves once/day)
                                    │ status = published
                                    ▼
                         Next.js App Router (RSC)
                         public card reading UI  — published events only
```

The public page is a fast read of **stored, curated** data. Overviews and analogies are generated
ahead of time by the daily pipeline and persisted — never generated in the request path.

## 4. Build stages

Each stage is independently shippable.

### Stage 1 — Scaffold ✅ (done)
Next.js + Radix, card-based landing page with placeholder content. Builds, lints, runs.

### Stage 2 — RSS → database (raw articles) ✅ (done)
- **Neon Postgres** (Vercel integration) with **Drizzle**. Driver: `drizzle-orm/node-postgres` over a
  module-scope `pg` Pool + `attachDatabasePool` (Vercel Fluid compute guidance), initialized lazily so
  `next build` never needs DB creds. See `lib/db/`.
- `feeds` holds the dynamic, editable list (`lib/feeds.ts`, upserted by `url` via `npm run db:seed`).
  AP and Reuters dropped official RSS, so they come through the Google News RSS proxy (filtered to each
  publisher's domain); the other 7 feeds are native.
- `/api/ingest` (`GET`, Bearer `CRON_SECRET`): fetches active feeds concurrently, parses (`rss-parser`),
  dedupes by `(feed_id, guid)`, batch-upserts into `articles` with `onConflictDoNothing`. One bad feed
  can't fail the run. Verified: 425 articles across 9 feeds, idempotent on re-run.
- Vercel Cron (`vercel.json`) hits `/api/ingest` daily at 11:00 UTC.
- Scripts: `db:generate`, `db:migrate`, `db:push`, `db:studio`, `db:seed`.

### Stage 3 — Grouping (articles → events)
- `/api/group`: gather ungrouped articles that report the same event into one `event` (linked via
  `event_articles`) with a cheap-model triage pass over recent articles. Each event gets a working title
  and a representative article.

### Stage 4 — Analysis (raw LLM)
- `/api/analyze`: for each event without analyses, call Anthropic to (a) compose the overview and
  (b) select six analogies, two per category, that illuminate the current event. This raw baseline is the
  thing we want working end-to-end before adding any guidance.
- Use **structured outputs** (`output_config.format` with a JSON schema) so the response is exactly six
  analogies, two per category, each `{category, title, source, excerpt, href}`. Adaptive thinking for the
  selection reasoning. Allow speculative/sci-fi works under literary/artistic for the future-facing angle.
- Persist results in `analogies`, linked to the event; the event's `overview_status` → `generated`.

### Stage 5 — Verification
- `/api/verify`: confirm every analogy stands up before a reader sees it. **Deterministic checks first** —
  fetch each `href` and confirm it resolves (real status, not a soft-404), and match the excerpt against
  the fetched source where that can be automated. Where a check can't be fully automated, fall back to an
  **adversarial pass** (a second model trying to refute the analogy) or **a human in the loop**.
- Set `verification_status ∈ {verified, held, failed}`. Only `verified` analogies are ever shown; anything
  else is held for review, never silently dropped.

### Stage 6 — Public card UI on real data
- Wire the existing card UI to **verified** events: overview at the top, six analogy cards below grouped by
  category, each with excerpt + outbound link. This closes the raw loop — real events, real analogies,
  verified — visible end-to-end. Refine toward the are.na aesthetic. (Ungated until Stage 8 adds editorial.)

### Stage 7 — Examples (tone & reference)
- With the raw pipeline running and its output in front of us, we have a baseline to improve against — and
  a clearer sense of what guidance actually helps.
- `examples`: a hand-built set of strong analogies — historical events, literary works, artworks/music,
  including speculative/sci-fi for the future angle — each a real source with a canonical link and a short
  real excerpt. These are reference, not a menu: they ride along in the analysis prompt only to establish
  tone and show the model what a compelling, insight-adding analogy looks like, so it chooses better. The
  model still selects freely; examples shape taste, not the choice itself.
- Measure against the Stage 4 baseline: keep the examples only if they demonstrably sharpen the analogies
  rather than getting echoed back.

### Stage 8 — Editorial approval (daily human-in-the-loop)
- A protected admin view lists events with their overview + six verified analogies.
- The editor approves (→ `status = published`), edits, or rejects. This adds the gate to the public site
  (Stage 6 ships ungated; here `published` becomes the filter for what readers see).
- Auth: single-user, so start simple (middleware basic-auth via an env secret, or Vercel deployment
  protection on the admin path). Upgrade to a real provider (Clerk) only if needed.

## 5. Data model (first cut)

```sql
-- The dynamic, editable list of publication feeds to scan.
feeds(id, title, url, active, created_at)

-- Raw items as ingested from feeds (the ungrouped layer).
articles(id, feed_id, guid, title, url, summary, published_at, created_at,
         event_id)                       -- event_id null until grouped

-- One row per real-world event (the unit users read). Grouped from articles.
events(id, title, overview, overview_status, status, published_at, created_at,
       approved_at)
       -- overview_status: pending | generated
       -- status: draft | published | rejected   (the editorial gate, enforced in Stage 8)

-- Many-to-many: which articles belong to an event (kept explicit for provenance).
event_articles(event_id, article_id)

-- Six per event: the analogies the model selects for a given event.
analogies(id, event_id, category, title, source, excerpt, href,
          source_id, verification_status, created_at)
          -- category: historical | literary | artistic
          -- source_id: optional FK into examples, when a selected analogy matches one
          -- verification_status: verified | held | failed

-- A hand-built set of example analogies (Stage 7). Reference for tone in the analysis
-- prompt; a selected analogy may point back via analogies.source_id when it matches.
examples(id, category, title, creator, era, excerpt, url, created_at)
         -- category: historical | literary | artistic
```

## 6. Anthropic API notes

- SDK `@anthropic-ai/sdk`. Two tiers:
  - **Triage/group:** a cheap model (Haiku or Sonnet) to group articles and pick events worth a full pass.
  - **Analysis:** `claude-opus-4-8` with adaptive thinking (`thinking: {type: "adaptive"}`) for the
    overview + analogy-selection reasoning.
- Structured outputs via `output_config.format` (JSON schema) to guarantee the six-analogy shape — do
  **not** prefill assistant turns (rejected on this model).
- Prompt the analysis step to select the most illuminating analogies directly, and to allow
  speculative/sci-fi works under literary/artistic for the future-facing angle. From Stage 7 on, a small
  set of examples rides along in the prompt to set tone and sharpen taste.
- `ANTHROPIC_API_KEY` lives in Vercel project env vars (and `.env.local` for dev), never committed.
- Generation runs in the daily cron pipeline, so latency is not user-facing; we can afford high effort.

## 7. Environment & deployment

- Vercel auto-detects Next.js — import the repo and deploy.
- Env vars to add in Vercel (later stages): `DATABASE_URL` (Neon), `ANTHROPIC_API_KEY`, and an admin
  secret for the editorial view.
- Vercel Cron is configured via `vercel.json` once the pipeline routes exist (one daily entry that runs
  ingest → group → analyze → verify in sequence).

## 8. Open questions (to revisit)

- **Pipeline orchestration:** one daily cron that chains the stages, or separate cron entries per stage?
- **Excerpt verification:** how much of "is this quote real" can be done deterministically (fetch the
  source, match the text) versus handed to an adversarial second pass or the human in the loop?
- **Do the examples earn their place?** Measure Stage 7 output against the raw Stage 4 baseline — keep the
  examples only if they sharpen the analogies rather than just getting echoed back.
- **Editor workload:** how many events per day is a comfortable review set? Tune triage selectivity to it.
```
