# hyper-era
Exploring the present through lenses from the past and future.

Hyper-era is an experimental publication.

Its goal is to tame a [media landscape](https://www.goodreads.com/en/book/show/70254.A_User_s_Guide_to_the_Millennium) dominated by hypertext and hypermedia 
by providing analogies across time that shed light on the present.

If [analogy is the core of cognition](https://worrydream.com/refs/Hofstadter_2001_-_Analogy_as_the_Core_of_Cognition.pdf), 
historical analogies can help us understand and contextualize what's going on today.

## How it works

Hyper-era scans the RSS feeds of various publications, clusters the articles that report
the same event into one story, composes a sober overview, and then surfaces analogies
that shed light on it. Every event is paired with six analogies across three categories
— two each:

- **Historical** — precedents from the historical record
- **Literary** — passages and narratives whose themes illuminate the moment (speculative
  and science fiction welcome — this is how the *future* enters, through real works rather
  than punditry)
- **Musical / artistic** — works of music or visual art that resonate with the event

Trust is the whole point: every analogy's link and excerpt is verified before anyone sees
it, and a human editor reviews the day's drafts before they publish. Analogies are presented
as cards, one per card, each with a content excerpt and a link to the original source.
UI inspiration: the [hyper-era are.na channel](https://are.na/curran-dwyer/hyperera).

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the technical design and build stages.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript) — deployed on [Vercel](https://vercel.com/)
- [Radix Themes](https://www.radix-ui.com/themes/docs/overview/getting-started) — UI components
- [Anthropic API](https://docs.anthropic.com/) — composing overviews and surfacing analogies

## Development

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run lint     # lint
```

## Deploying to Vercel

This is a standard Next.js app; Vercel auto-detects the framework. To deploy:

1. Push this branch to GitHub.
2. In the [Vercel dashboard](https://vercel.com/new), import the `hyperera` repository.
3. Accept the detected Next.js settings and deploy. No special configuration is required.

Later stages will add an `ANTHROPIC_API_KEY` environment variable (and a database
connection string) in the Vercel project settings.
