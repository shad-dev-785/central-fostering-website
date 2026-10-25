import { boroughs } from "@/content/areas";
import { site } from "@/config/site";
import CtaBand from "@/components/CtaBand";
import { PinIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Areas we cover in London",
  description: "CFA recruits foster carers across London boroughs, so children can stay close to their school, friends and family. See where we work.",
  path: "/areas-we-cover",
});

const regions = ["Central", "North", "East", "South", "West"] as const;

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Areas we cover"
        title="Fostering across London"
        intro="Children do best when they stay close to their school, friends and family. That is why we recruit carers in communities across the capital."
      />
      <Section tone="white">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regions.map((r, i) => (
            <Reveal key={r} delay={(i % 3) * 80}>
              <div className="h-full rounded-3xl border border-leaf-100 bg-leaf-50 p-7">
                <h2 className="text-2xl font-bold">{r} London</h2>
                <ul className="mt-4 space-y-2">
                  {boroughs
                    .filter((b) => b.region === r && b.covered)
                    .map((b) => (
                      <li key={b.name} className="flex items-center gap-2 font-semibold">
                        <PinIcon width={18} height={18} className="shrink-0 text-leaf-700" />
                        {b.name}
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal delay={160}>
            <div className="h-full rounded-3xl bg-navy-800 p-7 text-white">
              <h2 className="text-2xl font-bold text-white">Not sure if we cover you?</h2>
              <p className="mt-3 text-white/90">
                Boundaries can be blurry. Give us a ring on{" "}
                <a href={site.contact.phoneHref} className="font-bold underline underline-offset-4">{site.contact.phone}</a>{" "}
                and we will tell you straight away.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
