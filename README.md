# Hyperera
Exploring the present through lenses from the past and future.

Hyperera is an experimental publication.

Its goal is to tame a [media landscape](https://www.goodreads.com/en/book/show/70254.A_User_s_Guide_to_the_Millennium) dominated by hypertext and hypermedia 
by providing analogies across time that shed light on the present.

If [analogy is the core of cognition](https://worrydream.com/refs/Hofstadter_2001_-_Analogy_as_the_Core_of_Cognition.pdf), 
historical analogies can help us understand and contextualize what's going on today.

## How it works

Hyperera scans the RSS feeds of various publications, chooses the day's most important current events, and surfaces analogies
that shed light on them. Every event is paired with six analogies across three categories
— two each:

- **Historical** — precedents from the historical record
- **Literary** — passages and narratives whose themes illuminate the moment
- **Musical / artistic** — works of music or visual art that resonate with the event

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the technical design and build stages.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript) — deployed on [Vercel](https://vercel.com/)
- [Radix Themes](https://www.radix-ui.com/themes/docs/overview/getting-started) — UI components
- [Anthropic API](https://docs.anthropic.com/) — composing overviews and surfacing analogies
