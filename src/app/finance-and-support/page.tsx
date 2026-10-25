import { site } from "@/config/site";
import { supportList } from "@/content/fostering";
import CtaBand from "@/components/CtaBand";
import { BookIcon, HeartIcon, HomeIcon, MoonIcon, ShieldIcon, UsersIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Foster carer allowances and support",
  description: "How foster carers are supported with allowances, tax relief, training, a named social worker and a 24 hour advice line at Central Fostering.",
  path: "/finance-and-support",
});

const money = [
  {
    title: "Fostering allowance",
    text: "A weekly payment that covers the cost of looking after a child: food, clothing, travel, activities and pocket money. It is set according to the child's age.",
  },
  {
    title: "Reward for your skills",
    text: "Carers also receive a fee in recognition of their time, skills and experience. This can grow as you train and take on more.",
  },
  {
    title: "Tax relief",
    text: "Foster carers benefit from a generous tax relief scheme, so many carers pay little or no tax on their fostering income. Check the current rules on GOV.UK.",
  },
  {
    title: "Other support",
    text: "Many carers also receive help with things like mileage for contact visits and National Insurance credits. We will explain what applies to you.",
  },
];

const icons = [<ShieldIcon key="s" />, <BookIcon key="b" />, <MoonIcon key="m" />, <UsersIcon key="u" />, <HeartIcon key="h" />, <HomeIcon key="o" />];

export default function FinancePage() {
  return (
    <>
      <PageHero
        eyebrow="Finance and support"
        title="You will be paid fairly, and supported fully"
        intro="Fostering is not a job in the usual sense, but it is real work. Here is how carers are supported financially, and in every other way."
      >
        <ButtonLink href="/request-a-call-back" variant="orange">Ask about current rates</ButtonLink>
      </PageHero>

      <Section tone="white">
        <SectionHeading eyebrow="Money matters" title="How fostering is paid" intro="Fostering payments are made up of a few parts. We will talk you through exactly how they work for you." />
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
              Rates depend on the child&apos;s age, the type of fostering and your experience. We are happy to give you
              the exact current figures. Call us on{" "}
              <a href={site.contact.phoneHref} className="font-bold underline underline-offset-4">{site.contact.phone}</a>{" "}
              or ask for a call back.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section tone="leaf">
        <SectionHeading eyebrow="Support" title="Everything we put around you" intro="Looking after a child can be hard. We make sure you never have to do it alone." />
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
