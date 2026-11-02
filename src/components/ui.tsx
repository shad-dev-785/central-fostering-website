import Link from "next/link";
import type { ReactNode } from "react";
import { SectionWave } from "./Art";
import { ArrowCircleIcon } from "./Icons";
import Reveal from "./Reveal";

export function Container({ children, className = "", narrow = false }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl"} ${className}`}>{children}</div>
  );
}

/**
 * Section background tones. `wave` is the text colour used if a curved top edge is switched on
 * (the SVG fills with currentColor, so it always matches the section behind it).
 */
const tones = {
  white: { bg: "bg-white", wave: "text-white", text: "text-ink-soft" },
  cream: { bg: "bg-cream", wave: "text-cream", text: "text-ink-soft" },
  leaf: { bg: "bg-leaf-50", wave: "text-leaf-50", text: "text-ink-soft" },
  navy: { bg: "bg-navy-50", wave: "text-navy-50", text: "text-ink-soft" },
  sky: { bg: "bg-sky-100", wave: "text-sky-100", text: "text-ink-soft" },
  tangerine: { bg: "bg-tangerine-100", wave: "text-tangerine-100", text: "text-ink-soft" },
  deepNavy: { bg: "bg-navy-800", wave: "text-navy-800", text: "text-white/90 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white" },
  deepGreen: { bg: "bg-leaf-800", wave: "text-leaf-800", text: "text-white/90 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white" },
} as const;

export type Tone = keyof typeof tones;

export function Section({
  children,
  tone = "white",
  className = "",
  id,
  narrow = false,
  wave = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  narrow?: boolean;
  /** Optional gentle curved top edge. Off by default for a clean, calm look. */
  wave?: "a" | "b" | false;
}) {
  const t = tones[tone];
  return (
    <section id={id} className={`relative overflow-x-clip ${t.bg} ${t.text} py-16 sm:py-24 ${className}`}>
      {wave && <SectionWave variant={wave} className={t.wave} />}
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] ${light ? "text-tangerine-300" : "text-tangerine-700"}`}>
      <span aria-hidden="true" className={`h-0.5 w-8 rounded-full ${light ? "bg-tangerine-300" : "bg-tangerine-500"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  intro,
  light = false,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  /** A word or phrase inside `title` to mark with a soft highlighter stroke. */
  highlight?: string;
  intro?: string;
  light?: boolean;
  center?: boolean;
}) {
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : null;
  return (
    <Reveal className={`mb-10 max-w-3xl sm:mb-14 ${center ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.25rem]">
        {parts ? (
          <>
            {parts[0]}
            <span className="squiggle">{highlight}</span>
            {parts.slice(1).join(highlight)}
          </>
        ) : (
          title
        )}
      </h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-white/90" : "text-ink-soft"}`}>{intro}</p>}
    </Reveal>
  );
}

/** Pill buttons with a circled arrow, as on the sites you liked, in our own colours. */
const buttonStyles = {
  primary: "bg-navy-700 text-white hover:bg-navy-800",
  green: "bg-leaf-800 text-white hover:bg-leaf-900",
  orange: "bg-tangerine-500 text-ink hover:bg-tangerine-400",
  light: "bg-white text-navy-800 hover:bg-navy-50",
  outline: "border-2 border-navy-700 bg-white text-navy-700 hover:bg-navy-700 hover:text-white",
  outlineLight: "border-2 border-white text-white hover:bg-white hover:text-navy-800",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  arrow?: boolean;
  className?: string;
}) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 py-3 text-base font-semibold transition-all duration-200 active:scale-[0.97] ${buttonStyles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowCircleIcon width={22} height={22} className="transition-transform duration-200 group-hover:translate-x-1" />}
    </>
  );
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-2 font-semibold text-navy-700 hover:text-navy-900">
      <span className="underline decoration-tangerine-500 decoration-2 underline-offset-4">{children}</span>
      <ArrowCircleIcon width={20} height={20} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
