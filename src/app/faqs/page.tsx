import { faqs } from "@/content/fostering";
import { FaqList } from "@/components/Cards";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Fostering FAQs",
  description: "Straight answers about becoming a foster carer: who can foster, how long approval takes, allowances, support and more. Ask us anything.",
  path: "/faqs",
});

export default function FaqsPage() {
  // Structured data lets search engines show these answers directly in results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero eyebrow="Fostering FAQs" title="Your questions, answered" intro="If you cannot find what you are looking for, just ask. Nothing is too small or too silly." />
      <Section tone="cream" narrow>
        <FaqList />
      </Section>
      <CtaBand title="Still have a question?" text="Our team is happy to talk it through. Call, email or ask for a call back." />
    </>
  );
}
