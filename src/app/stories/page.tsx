import { stories } from "@/content/stories";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Foster carer stories",
  description: "Read stories from people who foster in London: why they started, what surprised them, and what keeps them going.",
  path: "/stories",
});

export default function StoriesPage() {
  return (
    <>
      <PageHero eyebrow="Carer stories" title="Stories from people who foster" intro="Real fostering is ordinary people doing something extraordinary, one day at a time." />
      {stories.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`py-14 sm:py-20 ${i % 2 === 0 ? "bg-white" : "bg-navy-50"}`}>
          <Container narrow>
            <Reveal>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-leaf-800">{s.fostering}</span>
                {s.sample && (
                  <span className="rounded-full bg-tangerine-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">Sample story</span>
                )}
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">{s.title}</h2>
              <p className="mt-2 font-bold text-leaf-700">{s.carer}</p>
              <div className="prose-body mt-6 text-lg text-ink-soft">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      ))}
      <CtaBand title="Could your story be next?" />
    </>
  );
}
