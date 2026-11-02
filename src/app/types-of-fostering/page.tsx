import type { StaticImageData } from "next/image";
import { fosteringTypes } from "@/content/fostering";
import CtaBand from "@/components/CtaBand";
import { PhotoSlot } from "@/components/Art";
import PageHero from "@/components/PageHero";
import shortTerm from "@/assets/photos/type-short-term.jpg";
import longTerm from "@/assets/photos/type-long-term.jpg";
import emergency from "@/assets/photos/type-emergency.jpg";
import shortBreaks from "@/assets/photos/type-short-breaks.jpg";
import parentChild from "@/assets/photos/type-parent-child.jpg";
import teenagers from "@/assets/photos/type-teenagers.jpg";
import siblings from "@/assets/photos/type-siblings.jpg";
import specialist from "@/assets/photos/type-specialist.jpg";
import Reveal from "@/components/Reveal";
import { ButtonLink, Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Fostering types in the Midlands",
  description: "Short term, long term, emergency, short breaks, parent and child, teenagers, sibling groups and therapeutic fostering. Find the type that fits your life.",
  path: "/types-of-fostering",
});

/** One photo per type, keyed by the slug in src/content/fostering.ts. Stock photography, so the alt text describes the picture. */
const photos: Record<string, { src: StaticImageData; alt: string; objectPosition?: string }> = {
  "short-term": { src: shortTerm, alt: "A girl and an older woman lying on a rug, drawing together" },
  "long-term": { src: longTerm, alt: "A smiling mother and father with their daughter hugging between them" },
  emergency: { src: emergency, alt: "A boy and a girl smiling over the shoulder of a woman who is hugging them" },
  "short-breaks": { src: shortBreaks, alt: "A woman and a young boy clapping hands together on a park bench" },
  "parent-and-child": { src: parentChild, alt: "A woman and a young girl talking together on a grey sofa" },
  teenagers: { src: teenagers, alt: "A teenage boy and an older man with their arms around each other, smiling in a garden" },
  "sibling-groups": { src: siblings, alt: "A group of children chatting and laughing together outdoors", objectPosition: "28% 50%" },
  therapeutic: { src: specialist, alt: "Two women smiling at a table, one holding a pencil, doing an activity together" },
};

export default function TypesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ways to foster"
        title="Types of fostering"
        intro="Children need different things at different times. Whatever you can offer, there's usually a way to make it count."
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
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <Reveal variant={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:order-2" : ""}>
                {photos[t.slug] && (
                  <PhotoSlot
                    src={photos[t.slug].src}
                    alt={photos[t.slug].alt}
                    objectPosition={photos[t.slug].objectPosition}
                    label={t.title}
                    ratio="aspect-[4/3]"
                    tone={i % 2 === 0 ? "leaf" : "navy"}
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="shadow-xl"
                  />
                )}
              </Reveal>
              <Reveal delay={100}>
                <h2 className="text-3xl font-bold sm:text-4xl">{t.title}</h2>
                <p className="mt-3 text-xl font-semibold text-leaf-800">{t.summary}</p>
                <p className="mt-4 text-lg text-ink-soft">{t.detail}</p>
              </Reveal>
            </div>
          </Container>
        </section>
      ))}

      <CtaBand title="Not sure which type is right for you?" text="No need to decide now. Talk it through with our team and we'll help you find the best fit." />
    </>
  );
}
