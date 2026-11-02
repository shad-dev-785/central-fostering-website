import Image from "next/image";
import { team } from "@/content/team";
import { pick } from "@/components/palette";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Meet our fostering team",
  description: "Meet the people leading Central Fostering Agency UK: experienced social workers and leaders who recruit, train and support foster carers across the East and West Midlands.",
  path: "/our-team",
});

export default function OurTeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Meet the people behind CFA"
        intro="Behind every foster carer is a team that picks up the phone. Here are the people leading Central Fostering Agency UK."
      />
      {team.map((m, i) => {
        const c = pick(i + 1);
        return (
          <section key={m.slug} id={m.slug} className={`scroll-mt-28 py-14 sm:py-20 ${i % 2 === 0 ? "bg-white" : "bg-navy-50"}`}>
            <Container>
              <div className="grid items-start gap-8 md:grid-cols-[minmax(0,13rem)_1fr] md:gap-10 lg:grid-cols-[minmax(0,15rem)_1fr]">
                <Reveal>
                  <div className={`relative mx-auto aspect-[4/5] w-full max-w-[13rem] overflow-hidden rounded-3xl shadow-lg md:mx-0 lg:max-w-[15rem] ${c.tint}`}>
                    <Image
                      src={m.photo}
                      alt={`${m.name}, ${m.role}`}
                      fill
                      sizes="(min-width: 1024px) 240px, 208px"
                      placeholder="blur"
                      priority={i === 0}
                      className="photo-img object-cover object-top"
                    />
                  </div>
                </Reveal>
                <Reveal delay={100}>
                  <h2 className="text-3xl font-bold sm:text-4xl">{m.name}</h2>
                  <p className={`mt-2 inline-block rounded-full px-4 py-1.5 text-sm font-bold ${c.chip}`}>{m.role}</p>
                  <div className="prose-body mt-6 max-w-prose text-lg text-ink-soft">
                    {m.bio.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}
      <CtaBand title="Come and say hello" />
    </>
  );
}
