# hyper-era — Technical Architecture

> Status: living document. Stage 1 (scaffold) is built; the stages below are the plan for what follows.

## 1. What hyper-era is

A counter-publication to the headline. The news cycle is "pornographic in nature, feeding the
libido without helping a person cultivate a well-informed perspective." hyper-era's response is to
slow the reader down and re-frame the present through **analogy across time** — taking its cue from
hypertext and hypermedia, and from Hofstadter's claim that analogy is the core of cognition.

The loop, per news item:

1. **Scan** the RSS feeds of various publications (a dynamic, editable list).
2. **Compose** a sober overview of the situation.
3. **Analogize** — surface six analogies across three categories, two each:
   - **Historical** — precedents from the historical record
   - **Literary** — passages and narratives whose themes illuminate the moment
   - **Musical / artistic** — works of music or visual art that resonate with the event
4. **Present** — one analogy per card, each with a content excerpt and a link to the original source.

UI inspiration: the [hyper-era are.na channel](https://are.na/curran-dwyer/hyperera).

## 2. Decisions made

| Decision | Choice | Rationale |
| --- | --- | --- |
| Analogy sourcing | **Hybrid** | Seed a curated corpus of vetted analogy sources; let the model also propose new analogies, which are added to the corpus once verified. Best long-term quality + breadth. |
| Database | **Neon Postgres** | Serverless Postgres with native Vercel integration; relational model fits stories ↔ analogies cleanly; generous free tier. |
| Framework | **Next.js (App Router, TS)** on Vercel | Already scaffolded. |
| UI | **Radix Themes** | Already scaffolded; card-based design. |
| LLM | **Anthropic API**, `claude-opus-4-8` | Composing overviews and selecting/proposing analogies. TS SDK `@anthropic-ai/sdk`. |

## 3. System overview

```
                    ┌──────────────────────────────────────────────┐
                    │  Vercel Cron (scheduled)                      │
                    └──────────────┬───────────────────────────────┘
                                   │ triggers
          ┌────────────────────────┼────────────────────────┐
          ▼                        ▼                         ▼
  /api/ingest              /api/analyze               /api/verify
  fetch + parse RSS        compose overview +         promote model-proposed
  → upsert stories         select/propose            analogies into the
                           analogies (Anthropic)      curated corpus
          │                        │                         │
          └────────────┬───────────┴─────────────┬───────────┘
                       ▼                          ▼
                ┌─────────────────────────────────────┐
                │  Neon Postgres                       │
                │  feeds · stories · analogy_sources · │
                │  analogies                           │
                └──────────────┬──────────────────────┘
                               │ read
                               ▼
                    Next.js App Router (RSC)
                    card-based reading UI
```

The page is a fast read of **stored** data — overviews and analogies are generated ahead of time by
the cron pipeline and persisted, never generated in the request path.

## 4. Build stages

### Stage 1 — Scaffold ✅ (done)
Next.js + Radix, card-based landing page with placeholder content. Builds, lints, runs.

### Stage 2 — RSS → database
- Add **Neon Postgres** (Vercel integration) and a migration tool (`drizzle` or plain SQL via `@neondatabase/serverless`).
- `feeds` table holds the dynamic list of publication feed URLs.
- `/api/ingest` route: fetch each feed, parse (e.g. `rss-parser`), dedupe by GUID/link, upsert into `stories`.
- Vercel Cron entry hits `/api/ingest` on a schedule.
- This seeds a collection of stories to work from.

### Stage 3 — Analogy sources database (the corpus)
- `analogy_sources` table: the curated corpus (historical events, literary works, artworks/music) with
  metadata (title, creator/era, category, canonical link, a short excerpt, and embeddings later if we
  want semantic retrieval).
- Seed it with an initial hand-picked set.
- This is the "curated" half of the hybrid model.

### Stage 4 — Anthropic integration
- `/api/analyze` route: for each story without analyses, call the Anthropic API to
  (a) compose the overview and (b) select the six best-fit analogies. The model is given the curated
  corpus as candidates **and** may propose new analogies it knows of, with a real source link.
- Use **structured outputs** (`output_config.format` with a JSON schema) so the response is exactly
  six analogies, two per category, each with `{category, title, source, excerpt, href, origin}` where
  `origin ∈ {corpus, proposed}`.
- Persist results in `analogies`, linked to the story.
- The "hybrid" half: model-`proposed` analogies land in a review queue; `/api/verify` (or a manual
  admin action) promotes good ones into `analogy_sources` so they become reusable corpus entries.

### Stage 5 — Card UI
- Already prototyped. Wire it to real data: story overview at the top, six analogy cards below grouped
  by category, each with excerpt + outbound link. Refine toward the are.na aesthetic.

## 5. Data model (first cut)

```sql
-- The dynamic list of publication feeds to scan.
feeds(id, title, url, active, created_at)

-- One row per news item ingested from a feed.
stories(id, feed_id, guid, title, url, summary, published_at,
        overview, overview_status, created_at)
        -- overview_status: pending | generated

-- The curated corpus of analogy sources (the "database" of Stage 3).
analogy_sources(id, category, title, creator, era, excerpt, url,
                verified, created_at)
                -- category: historical | literary | artistic

-- Six per story: the analogies surfaced for a given news item.
analogies(id, story_id, category, title, source, excerpt, href,
          origin, source_id, created_at)
          -- origin: corpus | proposed
          -- source_id: FK into analogy_sources when origin = corpus
```

## 6. Anthropic API notes

- SDK: `@anthropic-ai/sdk`; model `claude-opus-4-8`; adaptive thinking (`thinking: {type: "adaptive"}`)
  for the analogy-selection reasoning.
- Structured outputs via `output_config.format` (JSON schema) to guarantee the six-analogy shape — do
  **not** prefill assistant turns (rejected on this model).
- `ANTHROPIC_API_KEY` lives in Vercel project env vars (and `.env.local` for dev), never committed.
- Generation runs in the cron pipeline, so latency is not user-facing; we can afford high effort.

## 7. Environment & deployment

- Vercel auto-detects Next.js — import the repo and deploy.
- Env vars to add in Vercel (later stages): `DATABASE_URL` (Neon), `ANTHROPIC_API_KEY`.
- Vercel Cron is configured via `vercel.json` once the ingest/analyze routes exist.

## 8. Open questions (to revisit)

- Cadence: how often should the feed scan and analysis run?
- Verification: fully manual review of proposed analogies, or model-assisted (a second pass that
  checks the source link resolves and the analogy holds)?
- Semantic retrieval: do we add embeddings to `analogy_sources` so the model retrieves candidates by
  similarity rather than being handed the whole corpus? (Worth it once the corpus grows.)
