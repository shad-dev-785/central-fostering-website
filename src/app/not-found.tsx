import type { Metadata } from "next";
import { ButtonLink, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <Section tone="cream">
      <div className="mx-auto max-w-xl py-10 text-center">
        <p className="font-display text-7xl font-bold text-leaf-700">404</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">We can&apos;t find that page</h1>
        <p className="mt-3 text-lg text-ink-soft">It may have moved, or the link might be wrong. Here are some good places to start.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href="/contact" variant="outline">Contact us</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
