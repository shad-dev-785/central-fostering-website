import familyAutumn from "@/assets/photos/family-autumn.jpg";
import { Backdrop, PhotoSlot } from "@/components/Art";
import { FaqList, ProcessTimeline } from "@/components/Cards";
import CtaBand from "@/components/CtaBand";
import { CheckIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ButtonLink, Section, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Become a Midlands foster carer",
  description: "Could you foster? Find out who can become a foster carer in the East or West Midlands, what it takes, and how Central Fostering Agency UK supports you.",
  path: "/become-a-foster-carer",
});

const yes = [
  "You are 21 or over",
  "You have a spare bedroom",
  "You live in the East or West Midlands, or nearby",
  "You have the right to live in the UK",
  "You can offer time, patience and a listening ear",
  "You are single, married, partnered, or divorced",
  "You rent your home or own it",
  "You are LGBTQ+, of any faith or none, of any ethnicity",
  "You work, or you do not",
];

const qualities = [
  ["Patience", "Children who have had a difficult start need time to trust."],
  ["Resilience", "Some days are hard. You will bounce back, with support."],
  ["Warmth", "A kind word and a hot meal go a very long way."],
  ["Reliability", "Being there, consistently, is what children remember."],
];

export default function BecomeCarerPage() {
  return (
    <>
      <PageHero
        eyebrow="Could you foster?"
        title="You might be more suited to fostering than you think"
        intro="Foster carers come from every walk of life. It's not who you are on paper. It's what you can offer a child."
      >
        <ButtonLink href="/apply" variant="orange" arrow>Apply online</ButtonLink>
        <ButtonLink href="/request-a-call-back" variant="outlineLight">Request a call back</ButtonLink>
      </PageHero>

      <Section tone="white">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Who can foster" title="If this sounds like you, get in touch" />
            <ul className="space-y-3">
              {yes.map((y) => (
                <li key={y} className="flex items-start gap-3 text-lg">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-700 text-white">
                    <CheckIcon width={14} height={14} strokeWidth={3} />
                  </span>
                  {y}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-soft">
              Not sure something rules you out? Ask us. Age, health, a past mistake, the size of your home: none of
              these automatically stops you fostering.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative"><Backdrop variant="c" className="absolute -right-8 -top-8 h-[115%] w-[115%] text-tangerine-100" /><PhotoSlot
              src={familyAutumn}
              alt="A family of five laughing together on an autumn woodland path"
              objectPosition="50% 30%"
              ratio="aspect-[3/2]"
              label="Foster carer reading with a child"
              tone="leaf"
              className="relative shadow-xl"
            /></div>
          </Reveal>
        </div>
      </Section>

      <Section tone="leaf">
        <SectionHeading center eyebrow="What it takes" title="The qualities that matter most" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {qualities.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="h-full rounded-3xl bg-white p-7 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-leaf-700">{t}</h3>
                <p className="mt-2 text-ink-soft">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center">
          <TextLink href="/types-of-fostering">Explore the types of fostering</TextLink>
        </p>
      </Section>

      <Section tone="cream">
        <SectionHeading center eyebrow="The path to approval" title="Six steps. Four to six months." intro="With support at every one." />
        <ProcessTimeline />
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Questions" title="Common questions" />
          <FaqList limit={6} withLink />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
