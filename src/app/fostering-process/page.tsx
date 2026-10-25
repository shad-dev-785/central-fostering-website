import { ProcessTimeline } from "@/components/Cards";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How fostering works",
  description: "From first call to first placement: a clear, step-by-step guide to becoming a foster carer with Central Fostering Agency UK, including checks and training.",
  path: "/fostering-process",
});

const checks = [
  ["Enhanced DBS checks", "For you and everyone aged 18 or over in your home."],
  ["Health check", "A medical assessment from your GP, to make sure you can look after a child."],
  ["References", "From personal contacts and, where relevant, employers and former partners."],
  ["Local authority checks", "Standard safeguarding checks made with relevant authorities."],
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Your journey"
        title="The fostering process, step by step"
        intro="Becoming a foster carer takes care and time, because the children you look after deserve it. Here is what to expect."
      >
        <ButtonLink href="/apply" variant="orange" arrow>Start your application</ButtonLink>
      </PageHero>

      <Section tone="cream">
        <ProcessTimeline />
      </Section>

      <Section tone="leaf">
        <SectionHeading eyebrow="Safeguarding" title="The checks we carry out" intro="These checks are required for every foster carer, at every agency. They are there to keep children safe." />
        <div className="grid gap-6 sm:grid-cols-2">
          {checks.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="h-full rounded-3xl bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="mt-2 text-ink-soft">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-ink-soft">
          Having a past mistake does not always rule you out. Be honest with us from the start and we will explain how
          it would be treated.
        </p>
      </Section>

      <CtaBand title="Ready to take the first step?" />
    </>
  );
}
