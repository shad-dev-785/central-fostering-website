import Link from "next/link";
import { site } from "@/config/site";
import PageHero from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie policy",
  description: "Which cookies the Central Fostering Agency UK website uses. Currently none beyond what is strictly necessary.",
  path: "/cookie-policy",
});

/*
 * Accurate for the site as built: no analytics, advertising or tracking scripts.
 * If analytics or embeds (maps, video) are added later, update this page AND add a
 * consent banner that blocks them until the visitor agrees (UK PECR).
 */
export default function CookiePage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie policy" intro="Short version: we keep it simple." />
      <Section tone="white">
        <Container narrow>
          <div className="prose-body text-lg text-ink-soft">
            <h2>What are cookies?</h2>
            <p>Cookies are small files a website can save on your device. Some are essential, and others track what you do.</p>
            <h2>What we use</h2>
            <p>
              At the moment this website does not use analytics, advertising or tracking cookies. We do not use any
              cookies that need your consent. Your browser may keep ordinary technical data, such as cached files, to make pages load faster.
            </p>
            <h2>If this changes</h2>
            <p>
              If we later add tools such as analytics, we will update this page and ask for your permission first.
            </p>
            <h2>Questions</h2>
            <p>
              Contact us at {site.contact.email}. See also our <Link href="/privacy-policy">privacy policy</Link>.
            </p>
            <p className="text-sm">Last updated: October 2026.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
