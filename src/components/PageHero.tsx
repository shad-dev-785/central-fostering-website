import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Backdrop } from "./Art";
import { LogoWatermark } from "./Logo";
import JsonLd from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { Container, Eyebrow } from "./ui";

/** Banner at the top of every inner page: deep navy with soft organic shapes. Clean, calm, confident. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  children,
  crumb,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  crumb?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <LogoWatermark className="absolute -right-28 -top-28 w-[26rem] opacity-[0.09] sm:w-[32rem]" />
        <Backdrop variant="b" className="absolute -right-32 -top-24 h-[140%] w-auto min-w-[30rem] text-navy-700/70" />
        <Backdrop variant="c" className="absolute -bottom-40 right-[18%] hidden h-80 w-auto text-navy-600/40 md:block" />
        <div className="absolute right-[12%] top-14 hidden h-5 w-5 rounded-full bg-tangerine-500 sm:block" />
        <div className="absolute bottom-10 left-[46%] hidden h-3 w-3 rounded-full bg-leaf-500 md:block" />
      </div>
      <Container className="relative py-16 sm:py-24">
        <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...(crumb ? [{ name: crumb.label, path: crumb.href }] : []), { name: title }])} />
        <nav aria-label="Breadcrumb" className="mb-5 text-sm">
          <ol className="flex flex-wrap items-center">
            <li><Link href="/" className="inline-block py-2 text-white/80 hover:text-white">Home</Link></li>
            {crumb && (
              <li className="flex items-center">
                <span className="mx-2 text-white/50" aria-hidden="true">/</span>
                <Link href={crumb.href} className="inline-block py-2 text-white/80 hover:text-white">{crumb.label}</Link>
              </li>
            )}
            <li className="flex items-center">
              <span className="mx-2 text-white/50" aria-hidden="true">/</span>
              <span aria-current="page" className="py-2 text-white">{title}</span>
            </li>
          </ol>
        </nav>
        {eyebrow && <div className="enter"><Eyebrow light>{eyebrow}</Eyebrow></div>}
        <h1 style={{ "--d": "100ms" } as CSSProperties} className="enter-slide max-w-3xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p style={{ "--d": "220ms" } as CSSProperties} className="enter mt-5 max-w-2xl text-lg text-white/90 sm:text-xl">{intro}</p>}
        {children && <div style={{ "--d": "340ms" } as CSSProperties} className="enter mt-8 flex flex-wrap gap-4">{children}</div>}
      </Container>
    </section>
  );
}
