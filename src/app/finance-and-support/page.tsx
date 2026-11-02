import { site } from "@/config/site";
import { supportList } from "@/content/fostering";
import supportDrawing from "@/assets/photos/support-drawing.jpg";
import { PhotoSlot } from "@/components/Art";
import CtaBand from "@/components/CtaBand";
import { BookIcon, HeartIcon, HomeIcon, MoonIcon, ShieldIcon, UsersIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Foster carer allowances",
  description: "How foster carers are supported with allowances, tax relief, training, a named social worker and a 24 hour advice line at CFA.",
  path: "/finance-and-support",
});

const money = [
  {
    title: "Fostering allowance",
    text: "A weekly payment for the cost of looking after a child: food, clothing, travel, activities and pocket money. Set by the child's age.",
  },
  {
    title: "Reward for your skills",
    text: "A fee that recognises your time, skills and experience. It can grow as you train and take on more.",
  },
  {
    title: "Tax relief",
    text: "Foster carers benefit from a generous tax relief scheme, so many pay little or no tax on their fostering income. Check the current rules on GOV.UK.",
  },
  {
    title: "Other support",
    text: "Many carers also get help with things like mileage for contact visits and National Insurance credits. We'll explain what applies to you.",
  },
];

const icons = [<ShieldIcon key="s" />, <BookIcon key="b" />, <MoonIcon key="m" />, <UsersIcon key="u" />, <HeartIcon key="h" />, <HomeIcon key="o" />];

export default function FinancePage() {
  return (
    <>
      <PageHero
        eyebrow="Finance and support"
        title="Paid fairly. Supported fully."
        intro="Fostering isn't a job in the usual sense, but it is real work. Here's how carers are supported, in money and in every other way."
      >
        <ButtonLink href="/request-a-call-back" variant="orange">Ask about current rates</ButtonLink>
      </PageHero>

      <Section tone="white">
        <SectionHeading eyebrow="Money matters" title="How fostering is paid" intro="Payments come in a few parts. We'll talk you through exactly how they work for you." />
        <div className="grid gap-6 sm:grid-cols-2">
          {money.map((m, i) => (
            <Reveal key={m.title} delay={(i % 2) * 90}>
              <div className="h-full rounded-3xl border border-leaf-100 bg-leaf-50 p-8">
                <h3 className="text-2xl font-bold">{m.title}</h3>
                <p className="mt-3 text-lg text-ink-soft">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 rounded-3xl bg-navy-800 p-8 text-white sm:p-10">
            <h3 className="text-2xl font-bold text-white">Current weekly rates</h3>
            <p className="mt-3 max-w-3xl text-lg text-white/90">
              Rates depend on the child&apos;s age, the type of fostering and your experience. Want the exact current
              figures? Call us on{" "}
              <a href={site.contact.phoneHref} className="font-bold underline underline-offset-4">{site.contact.phone}</a>{" "}
              or ask for a call back.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section tone="leaf">
        <div className="mb-10 grid items-center gap-8 sm:mb-14 lg:grid-cols-2 lg:gap-14">
          <div className="[&>div]:mb-0">
            <SectionHeading eyebrow="Support" title="Everything we put around you" intro="Looking after a child can be hard. You won't be doing it alone." />
          </div>
          <Reveal variant="right">
            <PhotoSlot
              src={supportDrawing}
              alt="A woman and a girl lying on a wooden floor, drawing together"
              label="A carer and child drawing together"
              ratio="aspect-[16/9]"
              tone="navy"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="shadow-xl"
            />
          </Reveal>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supportList.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <div className="h-full rounded-3xl bg-white p-7 shadow-sm">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-700 text-white">{icons[i % icons.length]}</span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-ink-soft">{site.contact.outOfHours}</p>
      </Section>

      <CtaBand />
    </>
  );
}
