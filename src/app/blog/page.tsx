import { posts } from "@/content/posts";
import { PostCards } from "@/components/Cards";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Fostering news and advice",
  description: "Practical fostering advice, myth busting and news from the CFA team. Honest answers for people thinking about fostering.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="News and advice" title="Fostering news, advice and answers" intro="Practical guides, myth busting and updates from the CFA team." />
      <Section tone="cream">
        <PostCards items={posts} />
      </Section>
      <CtaBand />
    </>
  );
}
