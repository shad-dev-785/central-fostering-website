import { fosteringTypes } from "@/content/fostering";
import CtaBand from "@/components/CtaBand";
import { flatIcons } from "@/components/Art";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ButtonLink, Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Types of fostering in London",
  description: "Short term, long term, emergency, short breaks, parent and child, teenagers, sibling groups and therapeutic fostering. Find the type that fits your life.",
  path: "/types-of-fostering",
});

export default function TypesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ways to foster"
        title="Types of fostering"
        intro="Children need different things at different times. Whatever you can offer, there is likely a way to make it count."
      >
        <ButtonLink href="/request-a-call-back" variant="orange">Talk to us about which suits you</ButtonLink>
      </PageHero>

      {/* Jump links */}
      <nav aria-label="Types of fostering" className="border-b border-leaf-100 bg-white">
        <Container className="flex gap-2 overflow-x-auto py-4">
          {fosteringTypes.map((t) => (
            <a key={t.slug} href={`#${t.slug}`} className="shrink-0 rounded-full bg-leaf-50 px-4 py-3 text-sm font-bold text-leaf-800 hover:bg-leaf-700 hover:text-white">
              {t.title}
            </a>
          ))}
        </Container>
      </nav>

      {fosteringTypes.map((t, i) => (
        <section key={t.slug} id={t.slug} className={`py-14 sm:py-20 ${i % 2 === 0 ? "bg-white" : "bg-leaf-50"}`}>
          <Container>
            <Reveal>
              <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
                {(() => { const Icon = flatIcons[i % flatIcons.length]; return <Icon className="h-24 w-24" />; })()}
                <div className="max-w-3xl">
                  <h2 className="text-3xl font-bold sm:text-4xl">{t.title}</h2>
                  <p className="mt-3 text-xl font-semibold text-leaf-800">{t.summary}</p>
                  <p className="mt-4 text-lg text-ink-soft">{t.detail}</p>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      ))}

      <CtaBand title="Not sure which type is right for you?" text="You do not have to decide now. Talk it through with our team and we will help you find the best fit." />
    </>
  );
}
