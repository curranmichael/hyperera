import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStorySlugs } from "@/lib/stories";
import { StoryView } from "@/app/components/StoryView";

// Pre-render every published story at build time. When stories move to Neon,
// this stays the same shape; on publish we'll `revalidatePath` the new route.
export async function generateStaticParams() {
  const slugs = await getStorySlugs();
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
