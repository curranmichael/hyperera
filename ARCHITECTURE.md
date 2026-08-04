# hyper-era — Technical Architecture

> Status: living document, **mid-rewrite**. hyper-era is converting from a thrice-daily edition to a
> **weekly news and culture magazine**. The raw-article **ingest** layer, described below as retired, is
> now the backbone: a daily cron persists feed items to Postgres, a daily triage pass compresses them into
> scored candidate stories, and one weekly pass composes an issue from the accumulated week. Daily work
> writes only to the database, so the site rebuilds once a week.
>
> Sections 2–8 still describe the old live-read, no-persist daily design and are being revised phase by
> phase. Where this header and a section below disagree, this header is current.

## 1. What hyper-era is

A counter-publication to the headline. The news cycle is "pornographic in nature, feeding the
libido without helping a person cultivate a well-informed perspective." hyper-era's response is to
slow the reader down and re-frame the present through **analogy across time** — taking its cue from
hypertext and hypermedia, and from Hofstadter's claim that analogy is the core of cognition.

The loop, per real-world **event** (not per article):

1. **Read** the RSS feeds of various publications (a dynamic, editable list) **live** — fetched and parsed
   in memory each run, never persisted as raw items.
2. **Select & group** — one model pass reads the live feed, groups items reporting the same event, drops
   anything already covered, and picks which new events deserve a full pass.
3. **Compose** a sober, plainly-stated overview of the situation.
4. **Analogize** — surface six analogies across three categories, two each:
   - **Historical** — precedents from the historical record
   - **Literary** — passages and narratives whose themes illuminate the moment (speculative/sci-fi
     works welcome — this is how the "future" lens enters: through *verifiable* art, not punditry)
   - **Musical / artistic** — works of music or visual art that resonate with the event

   Each analogy is paired with a **rights-clean image of its subject** — the artwork itself, a
   manuscript page, a portrait, a title page — from Wikimedia Commons or an open archive, never
   AI-generated. Omitted only when nothing rights-clean can be found.
5. **Verify** — deterministic checks where possible (links resolve, excerpts match, image URLs serve
   real images), adversarial or human review where not, before anyone sees it.
6. **Approve** — once a day, a human editor reviews the drafts and promotes the good ones.
7. **Present** — one analogy per card, each with a content excerpt, its image, and a link to the
   original source. The home hero crossfades its cover to the hovered analogy's image.

UI inspiration: the [hyper-era are.na channel](https://are.na/curran-dwyer/hyperera).

## 2. Decisions made

| Decision | Choice | Rationale |
| --- | --- | --- |
| **Ingestion** | **Live read, no raw persistence** | Feeds are read fresh each run in app code (`fetch` + `rss-parser`, in memory). Only curated events/analogies persist. RSS is a rolling window — the one thing we must remember is *what we've already covered*, which the `events` table already holds. Deletes a table and a cron versus the old ingest layer. |
| **Story unit** | **Per-event, grouped** | One entry per real-world event, grouping items across feeds. Better reading experience and far cheaper than analyzing every near-duplicate. Grouping now happens *inside* the analysis pass, not a separate stage. |
| **Model tiering** | **Single Opus pass (no cheap triage tier)** | Reading the feed summaries is modest tokens (tens of thousands). One model that *selects* also *analogizes* → better coherence and fewer moving parts than a Haiku-triage → Opus-analyze split. The cheap tier is dropped. |
| **Per-event fan-out** | **Message Batches API** | Analysis is per-event and latency-insensitive. Batches gives a 50% discount and async fan-out with no orchestration code; most batches finish in under an hour. |
| **Pipeline orchestration** | **One daily cron on Fluid Compute** | A single cron runs read → select → analyze → verify; the steps stay distinct in code so verify can split into its own cron later if needed. Fluid Compute is on (`fluid: true`), so the model's I/O wait pauses CPU billing — we pay for the model's thinking in latency, not CPU. |
| **Structured output** | **`output_config.format` (JSON schema)** | Guarantees the exact six-analogy shape with no parse-retry loop. GA on `claude-opus-4-8`, no beta header. |
| **Verification fetch** | **`web_fetch` tool (Stage 4 only)** | Reserved for fetching the *analogy source pages* (text/PDF, with citations). Feeds are parsed in app code, never via `web_fetch` (it handles text/PDF, not XML, and caches by default). |
| **"Future" lens** | **Via speculative fiction/art** | No fourth category. Speculative/sci-fi works (real Le Guin, Butler, Tarkovsky…) represent the future *through verifiable art*, not unmoored prediction — the thing HE opposes. |
| **Editorial** | **Daily human-in-the-loop** | The pipeline produces drafts; the editor approves/curates before anything publishes. Matches the are.na curation vibe; guards quality. |
| **Analogy selection** | **Raw LLM, examples last** | The model composes overviews and selects analogies directly. A hand-built *example* set is added last (Stage 6) to set tone. Get the raw baseline working first, then see whether guidance helps. |
| **Database** | **Neon Postgres** | Serverless Postgres with native Vercel integration; now stores only the curated output. Generous free tier. |
| **Framework** | **Next.js (App Router, TS)** on Vercel | Already scaffolded. |
| **UI** | **Radix Themes** | Already scaffolded; card-based design. |
| **LLM** | **Anthropic API**, `claude-opus-4-8` | Composing overviews and selecting analogies, with adaptive thinking + the `effort` parameter. TS SDK `@anthropic-ai/sdk`. |

## 3. System overview

```
                ┌──────────────────────────────────────────────┐
                │  Vercel Cron — once daily                     │
                │  read → select → analyze → verify             │
                └───────────────┬──────────────────────────────┘
                                ▼
   read feeds (live)    select + analyze              verify
   fetch + parse all    Opus 4.8: group into new      web_fetch each
   active feeds in  ──▶ events, compose overview  ──▶ analogy link,
   memory               + six analogies               match excerpt,
   (rss-parser)         (per-event via Batches)        hold bad ones
        │                       │                          │
        └───────────────┬───────┴──────────────────────────┘
                        ▼
             ┌──────────────────────────────┐
             │  Neon Postgres                │
             │  (curated output only)        │
             │  feeds · events ·             │
             │  event_sources ·              │
             │  analogies · examples         │
             └──────────┬────────────────────┘
                        │ events in status = draft
                        ▼
             Admin review  (editor approves once/day)
                        │ status = published
                        ▼
             Next.js App Router (RSC)
             public card reading UI  — published events only
```

Raw feed items are never stored: they are fetched, parsed, and handed to the model in one run, then
discarded. The public page is a fast read of **stored, curated** data — overviews and analogies are
generated ahead of time by the daily pipeline and persisted, never generated in the request path.

## 4. Build stages

Each stage is independently shippable.

### Stage 1 — Scaffold ✅ (done)
Next.js + Radix, card-based landing page with placeholder content. Builds, lints, runs.

### Stage 2 — Feeds list + live read (feeds done; ingest retired)
- **Neon Postgres** (Vercel integration) with **Drizzle**. Driver: `drizzle-orm/node-postgres` over a
  module-scope `pg` Pool + `attachDatabasePool` (Vercel Fluid compute guidance), initialized lazily so
  `next build` never needs DB creds. See `lib/db/`.
- `feeds` holds the dynamic, editable list (`lib/feeds.ts`, upserted by `url` via `npm run db:seed`) — **kept**.
  AP and Reuters dropped official RSS, so they come through the Google News RSS proxy (filtered to each
  publisher's domain); the other 7 feeds are native.
- **Live read module** (replaces the old ingest): at run time, fetch all active feeds concurrently and parse
  with `rss-parser` **in memory** into `{title, url, summary, publishedAt, feedTitle}` items. One bad feed
  can't fail the run. Nothing is written to the DB at this step.
- **Retired:** the `articles` and `event_articles` tables, the `/api/ingest` route, and its daily cron.

### Stage 3 — Select + analyze (the daily pass)
One daily cron, two Opus phases:
- **Phase A — select.** App code hands Opus the live feed items **plus a list of recently-covered event
  titles** (from the DB). Opus groups items into candidate events, drops anything already covered, and picks
  which *new* events deserve a full pass. Structured output: an array of events, each with a working title and
  the indices of the source items that belong to it.
- **Phase B — analyze (Batches).** For each selected event, an Opus call composes the overview and selects six
  analogies, two per category. Fan out via the **Message Batches API**. Structured output per event:
  `{overview, analogies: [{category, title, source, excerpt, href, image: {url, alt, credit}} × 6]}`. Adaptive
  thinking for the selection reasoning. Allow speculative/sci-fi works under literary/artistic for the
  future-facing angle.
- **An image per analogy.** Each analogy's `image.url` nominates a rights-clean visual of its subject —
  prefer the work itself (the artwork, a manuscript page, a title page, a portrait of the author or
  composer) from Wikimedia Commons (`Special:FilePath`, `?width=1200`) or an open archive; never
  AI-generated. The run dithers each to `public/covers/<slug>--historical-1|2 / --literary-1|2 / --music /
  --art.png` via `scripts/dither-art.ts`. An analogy with no rights-clean image simply omits it — the home
  hero then keeps the story cover for that analogy's hover.
- **Plain headlines.** The event title and overview state plainly *what happened* — no cryptic or literary
  phrasing. The analogies carry the resonance; the headline carries the facts.
- Persist `events` (`status = draft`), `event_sources` (provenance for the selected items only), and `analogies`.

### Stage 4 — Verification
- Confirm every analogy stands up before a reader sees it. **Deterministic checks first** — `web_fetch` each
  `href`, confirm it resolves (real status, not a soft-404), match the excerpt against the fetched source
  where that can be automated, and confirm each analogy `image.url` serves an actual image. Where a check can't be fully automated, fall back to an **adversarial pass**
  (a second model trying to refute the analogy) or **a human in the loop**.
- Set `verification_status ∈ {verified, held, failed}` per analogy and roll it up to the event. Only `verified`
  analogies are ever shown; anything else is held for review, never silently dropped.

### Stage 5 — Public card UI on real data
- Wire the existing card UI to **verified** events: overview at the top, six analogy cards below grouped by
  category, each with excerpt, image + outbound link. This closes the raw loop — real events, real analogies,
  verified — visible end-to-end. Refine toward the are.na aesthetic. (Ungated until Stage 7 adds editorial.)

### Stage 6 — Examples (tone & reference)
- With the raw pipeline running and its output in front of us, we have a baseline to improve against — and
  a clearer sense of what guidance actually helps.
- `examples`: a hand-built set of strong analogies — historical events, literary works, artworks/music,
  including speculative/sci-fi for the future angle — each a real source with a canonical link and a short
  real excerpt. These are reference, not a menu: they ride along in the analysis prompt only to establish
  tone and show the model what a compelling, insight-adding analogy looks like, so it chooses better. Mark the
  examples block with `cache_control` so it's written once and reused across every per-event Batches call. The
  model still selects freely; examples shape taste, not the choice itself.
- Measure against the Stage 3 baseline: keep the examples only if they demonstrably sharpen the analogies
  rather than getting echoed back.

### Stage 7 — Editorial approval (daily human-in-the-loop)
- A protected admin view lists events with their overview + six verified analogies.
- The editor approves (→ `status = published`), edits, or rejects. This adds the gate to the public site
  (Stage 5 ships ungated; here `published` becomes the filter for what readers see).
- Auth: single-user, so start simple (middleware basic-auth via an env secret, or Vercel deployment
  protection on the admin path). Upgrade to a real provider (Clerk) only if needed.

## 5. Data model (first cut)

```sql
-- The dynamic, editable list of publication feeds to read.
-- Read live each run; raw items are never persisted.
feeds(id, title, url, active, created_at)

-- One row per real-world event (the unit readers read). Created already-analyzed by the daily pass.
events(id, title, overview, status, verification_status, published_at, approved_at, created_at)
       -- status: draft | published | rejected           (the editorial gate, Stage 7)
       -- verification_status: verified | held | failed   (rollup of its analogies, Stage 4)

-- Provenance: the live feed items that informed an event. Stored only for selected events, not the feed.
event_sources(id, event_id, title, url, feed_title, published_at)

-- Six per event: the analogies the model selects for a given event.
analogies(id, event_id, category, title, source, excerpt, href,
          image_src, image_alt, image_credit,
          source_id, verification_status, created_at)
          -- category: historical | literary | artistic
          -- source_id: optional FK into examples, when a selected analogy matches one
          -- verification_status: verified | held | failed

-- A hand-built set of example analogies (Stage 6). Reference for tone in the analysis
-- prompt; a selected analogy may point back via analogies.source_id when it matches.
examples(id, category, title, creator, era, excerpt, url, created_at)
         -- category: historical | literary | artistic
```

## 6. Anthropic API notes

- **Messages API**, SDK `@anthropic-ai/sdk`. A single Opus tier — `claude-opus-4-8` — does both selection
  and analysis (no cheap triage model).
- **Adaptive thinking is required on Opus 4.8.** Use `thinking: {type: "adaptive"}` paired with the
  `effort` parameter (higher for analysis, lower for selection). Manual `{type: "enabled", budget_tokens}`
  returns a **400** on this model.
- **Structured outputs** via `output_config.format` (`type: "json_schema"`) to guarantee the six-analogy
  shape — no beta header, GA on Opus 4.8. Use `additionalProperties: false` and `required` on every field;
  the TS helper `client.messages.parse({ output_config: { format: zodOutputFormat(schema) } })` returns a
  typed `parsed_output`. Prefill is unnecessary (and rejected on this model).
- **Message Batches API** for the per-event analysis fan-out: 50% cheaper, async, most batches finish within
  an hour (24h cap; up to 100k requests / 256 MB). Supports structured outputs, adaptive thinking, and the
  `web_fetch` tool. Ideal for a once-daily, latency-insensitive job.
- **Prompt caching:** once Stage 6 adds examples, cache the system prompt + examples block (`cache_control`)
  so it's written once and reused across every per-event call that day.
- **`web_fetch` (Stage 4 verification only):** supports text and PDF (not XML), with optional citations. It
  can only fetch URLs already present in context, and caches by default — pass `use_cache: false` for fresh
  fetches. Reserve it for the analogy *source pages*, never for the feeds.
- **Timeouts:** if a long synchronous Opus call risks the 300s Fluid budget, stream the response; the Batches
  path sidesteps this entirely.
- `ANTHROPIC_API_KEY` lives in Vercel project env vars (and `.env.local` for dev), never committed.
- `max_tokens` is required on every request, including batched ones.

## 7. Environment & deployment

- Vercel auto-detects Next.js — import the repo and deploy.
- Env vars to add in Vercel (later stages): `DATABASE_URL` (Neon), `ANTHROPIC_API_KEY`, `CRON_SECRET` (Bearer
  token protecting the daily cron), and an admin secret for the editorial view.
- Vercel Cron is configured via `vercel.json`: a single daily **generate** entry with `fluid: true`
  (read → select → analyze → verify). The old `/api/ingest` entry is removed.

## 8. Open questions (to revisit)

- **Missed-run durability:** with no raw persistence, a failed daily run loses that day's feed window. Is
  "we take today's feed" acceptable, or do we want a lightweight safety net (retry, or a short feed-snapshot)?
- **Dedup representation:** how to give the select phase "what we've already covered" cheaply — recent event
  titles, a date window, embeddings? Enough to stop re-surfacing an ongoing event without bloating the prompt.
- **Excerpt verification:** how much of "is this quote real" can be done deterministically (fetch the source,
  match the text) versus handed to an adversarial second pass or the human in the loop?
- **Approve-to-publish vs auto-publish:** does nothing publish without a human (safer, on-ethos), or does a
  draft auto-publish if not reviewed by some cutoff? Default leans approve-to-publish.
- **Verify inline vs its own cron:** keep verification in the daily pass, or split it out for failure isolation?
- **Do the examples earn their place?** Measure Stage 6 output against the raw Stage 3 baseline — keep the
  examples only if they sharpen the analogies rather than just getting echoed back.
- **Editor workload:** how many events per day is a comfortable review set? Tune selection selectivity to it.
```
