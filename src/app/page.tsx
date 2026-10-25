import type { CSSProperties } from "react";
import { site } from "@/config/site";
import Link from "next/link";
import { posts } from "@/content/posts";
import { stories } from "@/content/stories";
import { Backdrop, HeartBullet, IconCommunity, IconHome, IconSupport, IconTherapy, IconTraining, IconShield, PhotoSlot } from "@/components/Art";
import { FaqList, PostCards, ProcessTimeline, StoryCards, TypeCards } from "@/components/Cards";
import CtaBand from "@/components/CtaBand";
import CallbackForm from "@/components/forms/CallbackForm";
import Reveal from "@/components/Reveal";
import HeroPhoto from "@/components/HeroPhoto";
import { LogoWatermark } from "@/components/Logo";
import { ButtonLink, Container, Section, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Fostering agency in London | ${site.name}`,
  description: "Central Fostering Agency UK (CFA) is a fostering agency. Become a foster carer with expert training, a named social worker and 24/7 support. Enquire today.",
  path: "/",
  absoluteTitle: true,
});

/** Stagger for the load-in animation: style={d(200)} delays an .enter element by 200ms. */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const pillars = ["Caring homes", "Real support", "London families"];

const welcome = ["Single or a couple", "Renters welcome", "Any background", "LGBTQ+ friendly", "Working or retired"];

const quick = [
  { Icon: IconHome, t: "Could you foster?", d: "You need to be 21 or over, with a spare bedroom and time to give.", href: "/become-a-foster-carer" },
  { Icon: IconCommunity, t: "Types of fostering", d: "Short term, long term, emergency, short breaks and more.", href: "/types-of-fostering" },
  { Icon: IconShield, t: "Finance and support", d: "Allowances, training and help every step of the way.", href: "/finance-and-support" },
  { Icon: IconTraining, t: "Your journey", d: "From your first call to your first placement, step by step.", href: "/fostering-process" },
];

const why = [
  { Icon: IconSupport, t: "Support, day and night", d: "A named social worker, regular visits and an advice line that answers around the clock. When things get hard, someone picks up." },
  { Icon: IconTherapy, t: "Training that grows with you", d: "From preparation training before approval to ongoing courses on trauma and behaviour, you will always feel equipped for what comes next." },
  { Icon: IconCommunity, t: "A community that gets it", d: "Carer groups, family events and friendships with people who understand, long after a placement ends." },
];

const points = ["Your own supervising social worker", "24 hour advice line for approved carers", "Carer groups and peer support", "Respite and short breaks when you need them"];

export default function HomePage() {
  return (
    <>
      {/* Hero: the photograph lives in a negative z-index layer so the text can sit over it */}
      <section className="relative isolate overflow-hidden bg-navy-800 text-white">
        <div className="absolute inset-x-0 top-0 -z-10 h-[24rem] overflow-hidden [clip-path:inset(0)] sm:h-[30rem] lg:inset-y-0 lg:h-auto">
          <HeroPhoto />
        </div>
        <Container className="relative pb-16 pt-[19rem] sm:pb-20 sm:pt-[25rem] lg:min-h-[44rem] lg:pb-28 lg:pt-24">
          <div className="max-w-xl">
            <p className="enter-slide font-display text-2xl font-light text-white/85 sm:text-3xl">Welcome to</p>
            <h1 style={d(100)} className="enter-slide mt-1 text-5xl font-semibold leading-[1.05] !text-white sm:text-6xl lg:text-[4rem]">{site.name}</h1>
            <p style={d(220)} className="enter mt-5 text-xl font-medium text-white sm:text-2xl">
              Where every child finds a <span className="squiggle squiggle-draw">place to belong.</span>
            </p>
            <ul style={d(340)} className="enter mt-6 flex flex-wrap gap-x-6 gap-y-2 font-display text-lg font-medium text-white">
              {pillars.map((p, i) => (
                <li key={p} className="flex items-center gap-2">
                  <HeartBullet className={`h-5 w-5 ${["text-berry-400", "text-tangerine-400", "text-sky-400"][i]}`} />
                  {p}
                </li>
              ))}
            </ul>
            <p style={d(420)} className="enter mt-6 text-lg text-white/90">
              Central Fostering Agency UK (CFA) is a fostering agency in London. We help ordinary people open their homes to children and
              young people who need them. If you have a spare room and room in your life, we would love to hear from you.
            </p>
            <div style={d(500)} className="enter mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/become-a-foster-carer" variant="light" arrow>
                Become a foster carer
              </ButtonLink>
              <ButtonLink href="/fostering-process" variant="outlineLight" arrow>
                How fostering works
              </ButtonLink>
            </div>
            <ul style={d(600)} className="enter mt-8 flex flex-wrap gap-2.5 text-sm font-semibold text-white">
              {welcome.map((w) => (
                <li key={w} className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 backdrop-blur-[2px]">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Quick links */}
      <Section tone="white" className="!pt-4 sm:!pt-8">
        <Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quick.map(({ Icon, t, d, href }) => (
              <Link key={t} href={href} className="lift rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <Icon className="mb-3 h-14 w-14" />
                <h2 className="text-xl font-semibold">{t}</h2>
                <p className="mt-1 text-ink-soft">{d}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Why CFA: banner with overlapping cards */}
      <section className="relative overflow-x-clip">
        <div className="relative overflow-hidden bg-navy-800 pb-40 pt-20 text-center text-white sm:pb-44 sm:pt-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <LogoWatermark className="absolute -right-24 -top-32 w-[30rem] opacity-[0.08]" />
            <Backdrop variant="b" className="absolute -left-32 -top-20 h-[150%] w-auto min-w-[28rem] text-navy-700/70" />
            <Backdrop variant="c" className="absolute -bottom-40 -right-24 h-[120%] w-auto min-w-[26rem] text-navy-600/40" />
          </div>
          <Container narrow className="relative">
            <h2 className="text-3xl font-semibold text-white sm:text-5xl">Why foster with CFA?</h2>
            <p className="mt-4 text-lg text-white/90">
              A safe home is built by people who are backed up. Here is how we back you up.
            </p>
          </Container>
        </div>
        <Container className="relative -mt-28 pb-16 sm:-mt-32 sm:pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            {why.map(({ Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="lift flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
                  <div className="flex-1 p-8">
                    <Icon className="mb-4 h-16 w-16" />
                    <h3 className="text-2xl font-semibold">{t}</h3>
                    <p className="mt-3">{d}</p>
                  </div>
                  <div className={`h-1.5 ${["bg-berry-500", "bg-tangerine-500", "bg-sky-400"][i]}`} />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
              <Reveal variant="left" className="relative">
                <Backdrop variant="c" className="absolute -left-10 -top-8 h-[115%] w-[115%] text-tangerine-100" />
                <PhotoSlot label="Foster carer and child cooking together" tone="leaf" className="relative shadow-xl" />
              </Reveal>
              <Reveal variant="right">
                <h3 className="text-3xl font-semibold">You will never be doing this alone</h3>
                <p className="mt-4 text-lg">
                  Fostering is one of the most rewarding things you can do, and sometimes one of the hardest. That is why
                  we put so much around you.
                </p>
                <ul className="mt-5 space-y-3">
                  {points.map((p, i) => (
                    <li key={p} className="flex items-start gap-3 font-semibold text-navy-800">
                      <HeartBullet className={`mt-1 h-5 w-5 shrink-0 ${["text-berry-500", "text-tangerine-500", "text-leaf-600", "text-sky-500"][i]}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6">
                  <TextLink href="/finance-and-support">How we support our carers</TextLink>
                </p>
              </Reveal>
          </div>
        </Container>
      </section>

      {/* Types of fostering */}
      <Section tone="leaf">
        <SectionHeading
          eyebrow="Ways to foster"
          title="Whatever you can offer, there is a way to foster"
          highlight="a way to foster"
          intro="Whether you can give a few nights a month or a home for years, there is a type of fostering that could fit your life."
        />
        <TypeCards limit={6} />
        <p className="mt-10 text-center">
          <ButtonLink href="/types-of-fostering" arrow>
            See all types of fostering
          </ButtonLink>
        </p>
      </Section>

      {/* Journey */}
      <Section tone="white">
        <SectionHeading
          center
          eyebrow="Your journey"
          title="Your journey, one clear step at a time"
          highlight="one clear step"
          intro="It usually takes four to six months. Here is what to expect, with no surprises."
        />
        <ProcessTimeline />
        <p className="mt-12 text-center">
          <ButtonLink href="/fostering-process" variant="outline" arrow>
            Read more about the process
          </ButtonLink>
        </p>
      </Section>

      {/* Promise band */}
      <Section tone="deepNavy" className="!py-14 sm:!py-20">
        <Reveal>
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {[
              ["24/7", "advice line for approved carers"],
              ["London", "local children, local carers"],
              ["No pressure", "enquiring never commits you to anything"],
            ].map(([big, small]) => (
              <div key={big}>
                <p className="font-display text-4xl font-semibold text-tangerine-300 sm:text-5xl">{big}</p>
                <p className="mt-2 text-white/90">{small}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Stories */}
      <Section tone="navy">
        <SectionHeading eyebrow="Carer stories" title="Ordinary people, extraordinary homes" highlight="extraordinary homes" intro="Fostering is a series of small, steady kindnesses. Here are some of them." />
        <StoryCards items={stories} />
        <p className="mt-10">
          <TextLink href="/stories">More stories</TextLink>
        </p>
      </Section>

      {/* Callback */}
      <Section tone="deepGreen">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-5xl">Not sure yet? Let&apos;s talk it through.</h2>
            <p className="mt-5 text-lg text-white/90">
              Leave your number and the best time to ring. A friendly member of our team will call to answer your
              questions, with no pressure and no obligation.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl bg-white p-6 text-ink-soft shadow-xl sm:p-8">
              <CallbackForm compact idPrefix="home-cb" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQs */}
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading eyebrow="Questions" title="Questions we hear every week" highlight="every week" intro="Honest answers, in plain English." />
          </div>
          <FaqList limit={5} withLink />
        </div>
      </Section>

      {/* News */}
      <Section tone="white">
        <SectionHeading eyebrow="News and advice" title="Advice, answers and news" />
        <PostCards items={posts} />
        <p className="mt-10">
          <TextLink href="/blog">More news and advice</TextLink>
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
