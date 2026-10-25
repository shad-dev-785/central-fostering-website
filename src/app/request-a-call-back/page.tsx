import { site } from "@/config/site";
import CallbackForm from "@/components/forms/CallbackForm";
import PageHero from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a call back",
  description: "Leave your number and the best time to call, and a friendly member of the CFA team will ring you to talk about fostering.",
  path: "/request-a-call-back",
});

export default function CallbackPage() {
  return (
    <>
      <PageHero eyebrow="Request a call back" title="We'll call you" intro="Tell us when suits you and we will ring. No pressure, no obligation, just a chat." />
      <Section tone="cream">
        <Container narrow>
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <CallbackForm idPrefix="page-cb" />
          </div>
          <p className="mt-6 text-center text-ink-soft">
            Rather speak now? Call{" "}
            <a href={site.contact.phoneHref} className="font-bold text-navy-700 underline underline-offset-4">{site.contact.phone}</a>
            . We are open {site.contact.hours.toLowerCase()}.
          </p>
        </Container>
      </Section>
    </>
  );
}
