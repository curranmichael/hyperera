# hyper-era — Technical Architecture

> Status: living document. Stage 1 (scaffold) is built; the stages below are the plan for what follows.
> Last revised after locking four design decisions (see §2).

## 1. What hyper-era is

A counter-publication to the headline. The news cycle is "pornographic in nature, feeding the
libido without helping a person cultivate a well-informed perspective." hyper-era's response is to
slow the reader down and re-frame the present through **analogy across time** — taking its cue from
hypertext and hypermedia, and from Hofstadter's claim that analogy is the core of cognition.

The loop, per real-world **event** (not per article):

1. **Scan** the RSS feeds of various publications (a dynamic, editable list) into raw articles.
2. **Cluster** articles that report the same event into a single event.
3. **Compose** a sober overview of the situation.
4. **Analogize** — surface six analogies across three categories, two each:
   - **Historical** — precedents from the historical record
   - **Literary** — passages and narratives whose themes illuminate the moment (speculative/sci-fi
     works welcome — this is how the "future" lens enters: through *verifiable* art, not punditry)
   - **Musical / artistic** — works of music or visual art that resonate with the event
5. **Verify** — confirm every analogy's link resolves and its excerpt is real before anyone sees it.
6. **Approve** — once a day, a human editor reviews the drafts and promotes the good ones.
7. **Present** — one analogy per card, each with a content excerpt and a link to the original source.

**Trust is the whole product.** HE only earns its "more nourishing than the news" claim if it never
serves a fabricated quote or a dead link. So verification (step 5) and editorial approval (step 6) are
first-class stages, not afterthoughts. A hallucinated analogy is *worse* than a headline.

UI inspiration: the [hyper-era are.na channel](https://are.na/curran-dwyer/hyperera).

## 2. Decisions made

| Decision | Choice | Rationale |
| --- | --- | --- |
| **Story unit** | **Per-event, clustered** | One entry per real-world event, grouping articles across feeds. Better reading experience and ~5× cheaper than analyzing every near-duplicate. Matches the "fewer-but-better" ethos. |
| **Verification** | **Strict** | Every analogy's link must resolve and its excerpt must be real (corpus text preferred) before a reader sees it. Unverifiable analogies are *held*, never shown. Protects the core trust promise. |
| **"Future" lens** | **Via speculative fiction/art** | No fourth category. Speculative/sci-fi works (real Le Guin, Butler, Tarkovsky…) represent the future *through verifiable art*, not unmoored prediction — the thing HE opposes. |
| **Editorial** | **Daily human-in-the-loop** | The pipeline runs once a day and produces drafts; the editor approves/curates before anything publishes. Matches the are.na curation vibe; guards quality. |
| Analogy sourcing | **Hybrid** | Seed a curated corpus of vetted analogy sources; let the model also propose new analogies. Proposed analogies are *candidates only* until verified, then promoted into the corpus so they become reusable. |
| Model tiering | **Cheap triage + Opus reasoning** | A cheap model (Haiku/Sonnet) clusters articles and triages which events deserve a full pass; Opus 4.8 composes overviews and selects/proposes analogies. Keeps cost on-ethos (selective, not firehose). |
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
   1. ingest        2. cluster         3. analyze          4. verify
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
                         │  analogies · analogy_sources
                         └──────────┬────────────────┘
                                    │ events in status = draft
                                    ▼
                         Admin review  (editor approves once/day)
                                    │ status = published
                                    ▼
                         Next.js App Router (RSC)
                         public card reading UI  — published events only
```

The public page is a fast read of **stored, approved** data. Overviews and analogies are generated
ahead of time by the daily pipeline and persisted — never generated in the request path.

## 4. Build stages

Each stage is independently shippable.

### Stage 1 — Scaffold ✅ (done)
Next.js + Radix, card-based landing page with placeholder content. Builds, lints, runs.

### Stage 2 — RSS → database (raw articles)
- Add **Neon Postgres** (Vercel integration) and a migration tool (`drizzle` or plain SQL via
  `@neondatabase/serverless`).
- `feeds` table holds the dynamic, editable list of publication feed URLs.
- `/api/ingest`: fetch each active feed, parse (`rss-parser`), dedupe by GUID/link, upsert into `articles`.
- Vercel Cron hits the daily pipeline (or `/api/ingest` directly) on a schedule.

### Stage 3 — Clustering (articles → events)
- `/api/cluster`: group un-clustered articles that report the same event into one `event` (linked via
  `event_articles`). Start with a cheap-model triage pass over recent articles; add embeddings later if
  precision needs it. Each event gets a working title and a representative article.

### Stage 4 — Analogy corpus (the curated half)
- `analogy_sources`: the curated corpus (historical events, literary works, artworks/music) with
  metadata (title, creator/era, category, canonical link, short excerpt; embeddings later for semantic
  retrieval). Seed with an initial hand-picked set, including speculative works for the "future" angle.

### Stage 5 — Anthropic analysis
- `/api/analyze`: for each event without analyses, call Anthropic to (a) compose the overview and
  (b) select the six best-fit analogies. The model is handed the curated corpus as candidates **and**
  may propose new analogies it knows of, each with a real source link.
- Use **structured outputs** (`output_config.format` with a JSON schema) so the response is exactly six
  analogies, two per category, each `{category, title, source, excerpt, href, origin}` where
  `origin ∈ {corpus, proposed}`. Adaptive thinking for the selection reasoning.
- Persist results in `analogies`, linked to the event; the event's `overview_status` → `generated`.

### Stage 6 — Strict verification
- `/api/verify`: for each analogy, fetch `href` and confirm it resolves; confirm the excerpt is real
  (corpus excerpts are trusted; proposed excerpts must be checkable against the fetched source).
  Set `verification_status ∈ {verified, held, failed}`. Only `verified` analogies are ever shown.
- Good `proposed` analogies are promoted into `analogy_sources` (with `verified = true`) so they become
  reusable corpus entries — the "hybrid" flywheel.

### Stage 7 — Editorial approval (daily human-in-the-loop)
- A protected admin view lists events in `status = draft` with their overview + six verified analogies.
- The editor approves (→ `status = published`), edits, or rejects. Approval is the gate to the public site.
- Auth: single-user, so start simple (middleware basic-auth via an env secret, or Vercel deployment
  protection on the admin path). Upgrade to a real provider (Clerk) only if needed.

### Stage 8 — Public card UI on real data
- Wire the existing card UI to **published** events: overview at the top, six analogy cards below grouped
  by category, each with excerpt + outbound link. Refine toward the are.na aesthetic.

## 5. Data model (first cut)

```sql
-- The dynamic, editable list of publication feeds to scan.
feeds(id, title, url, active, created_at)

-- Raw items as ingested from feeds (the un-clustered layer).
articles(id, feed_id, guid, title, url, summary, published_at, created_at,
         event_id)                       -- event_id null until clustered

-- One row per real-world event (the unit users read). Clustered from articles.
events(id, title, overview, overview_status, status, published_at, created_at,
       approved_at)
       -- overview_status: pending | generated
       -- status: draft | published | rejected   (the editorial gate)

-- Many-to-many: which articles belong to an event (kept explicit for provenance).
event_articles(event_id, article_id)

-- The curated corpus of analogy sources (the "database" of Stage 4).
analogy_sources(id, category, title, creator, era, excerpt, url,
                verified, created_at)
                -- category: historical | literary | artistic

-- Six per event: the analogies surfaced for a given event.
analogies(id, event_id, category, title, source, excerpt, href,
          origin, source_id, verification_status, created_at)
          -- origin: corpus | proposed
          -- source_id: FK into analogy_sources when origin = corpus
          -- verification_status: verified | held | failed
```

## 6. Anthropic API notes

- SDK `@anthropic-ai/sdk`. Two tiers:
  - **Triage/cluster:** a cheap model (Haiku or Sonnet) to group articles and pick events worth a full pass.
  - **Analysis:** `claude-opus-4-8` with adaptive thinking (`thinking: {type: "adaptive"}`) for the
    overview + analogy-selection reasoning.
- Structured outputs via `output_config.format` (JSON schema) to guarantee the six-analogy shape — do
  **not** prefill assistant turns (rejected on this model).
- Prompt the analogy step to treat the curated corpus as preferred candidates, to mark anything new as
  `proposed` with a real link, and to allow speculative/sci-fi works under literary/artistic for the
  future-facing angle.
- `ANTHROPIC_API_KEY` lives in Vercel project env vars (and `.env.local` for dev), never committed.
- Generation runs in the daily cron pipeline, so latency is not user-facing; we can afford high effort.

## 7. Environment & deployment

- Vercel auto-detects Next.js — import the repo and deploy.
- Env vars to add in Vercel (later stages): `DATABASE_URL` (Neon), `ANTHROPIC_API_KEY`, and an admin
  secret for the editorial view.
- Vercel Cron is configured via `vercel.json` once the pipeline routes exist (one daily entry that runs
  ingest → cluster → analyze → verify in sequence).

## 8. Open questions (to revisit)

- **Clustering precision:** cheap-model triage may be enough; add embeddings to `articles` /
  `analogy_sources` for semantic clustering and corpus retrieval once volume grows.
- **Pipeline orchestration:** one daily cron that chains the stages, or separate cron entries per stage?
  (Start chained; split if any stage gets slow or flaky.)
- **Excerpt provenance for proposed analogies:** how hard to verify the *text* (not just the link) —
  fetch-and-match, or trust-but-flag for the editor? (Strict verification leans toward fetch-and-match.)
- **Editor workload:** how many events per day is a comfortable review set? Tune triage selectivity to it.
```
