import { areas, regions } from "@/content/areas";
import { site } from "@/config/site";
import CtaBand from "@/components/CtaBand";
import { PinIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Areas we cover in the Midlands",
  description: "CFA is recruiting foster carers across the East and West Midlands, so children can stay close to their school, friends and family. See the areas we cover.",
  path: "/areas-we-cover",
});

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Areas we cover"
        title="Fostering across the Midlands"
        intro="We are based in Birmingham and are currently recruiting foster carers across the East and West Midlands. Children do best when they stay close to their school, friends and family, which is why we look for carers in local communities."
      />
      <Section tone="white">
        <div className="grid gap-8 md:grid-cols-2">
          {regions.map((r, i) => (
            <Reveal key={r} delay={(i % 3) * 80}>
              <div className="h-full rounded-3xl border border-leaf-100 bg-leaf-50 p-7">
                <h2 className="text-2xl font-bold">{r}</h2>
                <ul className="mt-4 grid gap-x-4 gap-y-2 lg:grid-cols-2">
                  {areas
                    .filter((a) => a.region === r && a.covered)
                    .map((a) => (
                      <li key={a.name} className="flex items-center gap-2 break-normal font-semibold">
                        <PinIcon width={18} height={18} className="shrink-0 text-leaf-700" />
                        {a.name}
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal delay={160} className="md:col-span-2">
            <div className="h-full rounded-3xl bg-navy-800 p-7 text-white">
              <h2 className="text-2xl font-bold text-white">Not sure if we cover you?</h2>
              <p className="mt-3 text-white/90">
                Boundaries can be blurry, and our areas grow over time. Give us a ring on{" "}
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
