import { site } from "@/config/site";
import { Backdrop, PhotoSlot } from "@/components/Art";
import CtaBand from "@/components/CtaBand";
import { HeartIcon, HomeIcon, ShieldIcon, UsersIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About our London fostering agency",
  description: "Meet Central Fostering, a London fostering agency built around children and carers. Learn our values and how we support every foster family.",
  path: "/about",
});

const values = [
  { icon: <HeartIcon />, title: "Children first", text: "Every decision starts with one question: is this right for the child?" },
  { icon: <UsersIcon />, title: "Carers are partners", text: "You are the expert on the child in your home. We listen, and we support you." },
  { icon: <ShieldIcon />, title: "Safe and honest", text: "Safeguarding comes first, and we are open about both the joys and the challenges." },
  { icon: <HomeIcon />, title: "Rooted in London", text: "Local carers keep children close to their schools, friends and communities." },
];

export default function AboutPage() {
  const { regulation } = site;
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A London fostering agency built around people"
        intro="We find, train and support the carers who give children a safe place to grow up."
      />

      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Who we are" title="Small enough to know you, strong enough to support you" />
            <div className="prose-body text-lg text-ink-soft">
              <p>
                Central Fostering is a fostering agency working with London children&apos;s services to find loving
                homes for children and young people who cannot live with their own families.
              </p>
              <p>
                We believe good fostering comes from good relationships. That is why every carer has a named social
                worker who knows them and their family, and why we keep our support practical: clear answers, quick
                call backs and help when it matters.
              </p>
              <p>
                Our carers come from every background. What they share is patience, honesty and a wish to make a
                difference.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative"><Backdrop variant="a" className="absolute -right-8 -top-8 h-[115%] w-[115%] text-leaf-100" /><PhotoSlot label="Carer and child at home together" tone="navy" className="relative shadow-xl" /></div>
          </Reveal>
        </div>
      </Section>

      <Section tone="leaf">
        <SectionHeading center eyebrow="What we stand for" title="Our values" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-3xl bg-white p-7 shadow-sm">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-100 text-navy-700">{v.icon}</span>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-ink-soft">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">Our promise to children</h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-lg text-ink-soft">
              <li>A carer who has been carefully assessed, trained and supported</li>
              <li>A home as close as possible to their school, friends and family</li>
              <li>A voice in decisions that affect them</li>
              <li>Help to keep in touch with the people who matter to them</li>
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-3xl font-bold sm:text-4xl">Our promise to carers</h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-lg text-ink-soft">
              <li>A dedicated social worker and 24 hour out-of-hours advice</li>
              <li>Training that goes on long after you are approved</li>
              <li>Honest, timely communication, including when the news is hard</li>
              <li>Respect for you and for your family</li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {(regulation.ofstedUrn || regulation.ofstedReportUrl) && (
        <Section tone="navy">
          <SectionHeading eyebrow="Regulation" title="Registered and inspected" />
          <p className="max-w-3xl text-lg text-ink-soft">
            Central Fostering is registered with Ofsted
            {regulation.ofstedUrn ? ` (URN ${regulation.ofstedUrn})` : ""}.{" "}
            {regulation.ofstedReportUrl && (
              <a href={regulation.ofstedReportUrl} className="font-bold text-navy-700 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                Read our latest inspection report
              </a>
            )}
          </p>
        </Section>
      )}

      <Section tone="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Want to know more?</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-soft">We are always happy to talk, and there is never any pressure.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" arrow>Get in touch</ButtonLink>
            <ButtonLink href="/become-a-foster-carer" variant="outline">Could you foster?</ButtonLink>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
