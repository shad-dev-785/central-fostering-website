import ApplyForm from "@/components/forms/ApplyForm";
import PageHero from "@/components/PageHero";
import { Container, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Apply to foster",
  description: "Start your application to become a foster carer with Central Fostering Agency UK. It takes about five minutes and commits you to nothing.",
  path: "/apply",
});

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply online"
        title="Start your fostering journey"
        intro="This short form takes around five minutes. It is not the full assessment, just a first step so we can get to know you. There is no obligation."
      />
      <Section tone="cream">
        <Container narrow>
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <ApplyForm />
          </div>
          <p className="mt-6 text-center text-sm text-ink-soft">
            We only ask for what we need at this stage. Details such as your date of birth, health and background checks
            come later, in person.
          </p>
        </Container>
      </Section>
    </>
  );
}
