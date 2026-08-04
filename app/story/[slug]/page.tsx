import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecentStorySlugs, getStoryBySlug } from "@/lib/stories.server";
import { StoryView } from "@/app/components/StoryView";

// Prerender the stories of recent issues at build time; anything older in the
// archive renders on demand and is cached from then on, so build time stays flat
// as the archive grows.
const PRERENDERED_ISSUES = 8;

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getRecentStorySlugs(PRERENDERED_ISSUES);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: `${story.headline} — Hyperera`,
    description: story.overview,
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();
  return <StoryView story={story} />;
}
