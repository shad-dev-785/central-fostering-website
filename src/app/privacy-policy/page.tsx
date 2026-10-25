import Link from "next/link";
import { site } from "@/config/site";
import PageHero from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How Central Fostering collects, uses and protects the personal information you give us through this website.",
  path: "/privacy-policy",
});

/*
 * DRAFT TEMPLATE: written to match what this site actually does (see src/lib/db.ts and
 * src/app/api/*). It must be reviewed by the agency's data protection lead or a solicitor
 * before launch, and the retention periods below must be confirmed.
 */
export default function PrivacyPage() {
  const { contact } = site;
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" intro="We take your privacy seriously. This explains what we collect through this website and why." />
      <Section tone="white">
        <Container narrow>
          <div className="prose-body text-lg text-ink-soft">
            <h2>Who we are</h2>
            <p>
              {site.name} (&quot;we&quot;, &quot;us&quot;) is the data controller for personal information collected through this website.
              You can contact us at {contact.email}, on {contact.phone}, or by post at {contact.address.join(", ")}.
            </p>

            <h2>What we collect</h2>
            <p>We only collect what you choose to send us through our forms:</p>
            <ul>
              <li><strong>Enquiry form:</strong> your name, email address, optional phone number, how you would like us to contact you, and your message.</li>
              <li><strong>Call back form:</strong> your name, phone number and best time to call.</li>
              <li><strong>Online application:</strong> your name, email, phone number, postcode, whether you are 21 or over, information about your home and household size, pets, your experience with children, the types of fostering you are interested in, how you heard about us, and any notes you add.</li>
            </ul>
            <p>
              We do not ask for your date of birth, health information or criminal record details on this website. Please
              do not include them in free-text boxes. Those are discussed securely and in person during assessment.
            </p>

            <h2>Why we use it, and our legal basis</h2>
            <p>
              We use your details to reply to you, to call you back, and to start the process of assessing whether
              you could become a foster carer. Our lawful basis is your consent (which you give by ticking the box on each form), and
              our legitimate interest in responding to enquiries you have made. You can withdraw consent at any time.
            </p>

            <h2>Who sees it</h2>
            <p>
              Only our recruitment and social work team. We use trusted service providers to host this website, store
              submissions and send us notification emails. They process data only on our instructions. We do not sell your data or
              use it for advertising.
            </p>

            <h2>How long we keep it</h2>
            <p>
              If you do not go on to apply, we keep your enquiry for no more than 12 months and then delete it. If you
              do apply, your information becomes part of your fostering record, which we keep as required by fostering regulations.
            </p>

            <h2>How we protect it</h2>
            <p>
              Forms are sent over an encrypted connection. Submissions are stored in access-controlled systems, and we do not
              record personal details in our website logs.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask to see the information we hold about you, have it corrected or deleted, restrict or object to how we
              use it, or withdraw consent. Contact us using the details above. If you are unhappy with how we handle your data,
              you can complain to the Information Commissioner&apos;s Office at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
            </p>

            <h2>Cookies</h2>
            <p>
              See our <Link href="/cookie-policy">cookie policy</Link>.
            </p>

            <p className="text-sm">Last updated: October 2026.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
