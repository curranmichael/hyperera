# Hyperera
Exploring the present through lenses from the past and future.

Hyperera is an experimental publication.

Its goal is to tame a [media landscape](https://www.goodreads.com/en/book/show/70254.A_User_s_Guide_to_the_Millennium) dominated by hypertext and hypermedia 
by providing analogies across time that shed light on the present.

If [analogy is the core of cognition](https://worrydream.com/refs/Hofstadter_2001_-_Analogy_as_the_Core_of_Cognition.pdf), 
historical analogies can help us understand and contextualize what's going on today.

## How it works

Hyperera is a **weekly magazine**, published on Friday.

A daily cron reads the RSS feeds of news, culture, art and design publications into Postgres, and a
second daily pass compresses that flood into a shortlist of candidate stories, tracking which ones
run for days. On Friday morning a Claude routine reads the accumulated week, picks 15–20 stories
across the magazine's departments, composes each one, and publishes the issue — one build a week.

Every story is paired with six analogies across three categories — two each:

- **Historical** — precedents from the historical record
- **Literary** — passages and narratives whose themes illuminate the moment
- **Musical / artistic** — works of music or visual art that resonate with the event

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the technical design.

## Running it

```bash
npm install
cp .env.example .env.local     # then fill it in
npm run db:migrate && npm run db:seed
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run week:candidates` | dump the week's candidate stories, merged by thread |
| `npm run issue:publish` | validate a composed issue and publish it (`--draft` to stage) |

## Tech stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript) — deployed on [Vercel](https://vercel.com/)
- [Radix Themes](https://www.radix-ui.com/themes/docs/overview/getting-started) — UI components
- [Neon Postgres](https://neon.com/) with [Drizzle](https://orm.drizzle.team/) — feeds, candidates,
  and the magazine itself
- [Claude](https://docs.anthropic.com/) — compressing the day's feeds, and composing the week's issue
