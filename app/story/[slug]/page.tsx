import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getRecentStorySlugs,
  getStoryBySlug,
  PRERENDERED_ISSUES,
} from "@/lib/stories.server";
import { StoryView } from "@/app/components/StoryView";

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
