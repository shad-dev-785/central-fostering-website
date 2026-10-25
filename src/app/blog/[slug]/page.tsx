import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { articleLd, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { formatPostDate, getPost, posts } from "@/content/posts";
import { PostCards } from "@/components/Cards";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.metaTitle ?? post.title, description: post.excerpt, path: `/blog/${post.slug}`, type: "article", publishedTime: post.date });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleLd(post)} />
      <PageHero
        crumb={{ label: "News and advice", href: "/blog" }}
        eyebrow={post.category}
        title={post.title}
        intro={`${formatPostDate(post.date)} · ${post.readingMinutes} min read`}
      />
      <Section tone="white">
        <Container narrow>
          <article className="prose-body text-lg text-ink-soft">
            {post.blocks.map((b, i) => {
              if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "ul")
                return (
                  <ul key={i}>
                    {b.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </article>
          <div className="mt-10 rounded-3xl bg-leaf-50 p-7">
            <p className="font-display text-2xl font-bold">Thinking about fostering?</p>
            <p className="mt-2 text-ink-soft">We would love to talk. There is no pressure and no obligation.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Get in touch</ButtonLink>
              <ButtonLink href="/request-a-call-back" variant="outline">Request a call back</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
      {more.length > 0 && (
        <Section tone="cream">
          <SectionHeading title="More to read" />
          <PostCards items={more} />
        </Section>
      )}
      <CtaBand />
    </>
  );
}
