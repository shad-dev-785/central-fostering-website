import Link from "next/link";
import { fosteringTypes, faqs as allFaqs, processSteps } from "@/content/fostering";
import { formatPostDate, type Post } from "@/content/posts";
import type { Story } from "@/content/stories";
import { flatIcons } from "./Art";
import { ArrowCircleIcon, ChevronDownIcon } from "./Icons";
import { pick } from "./palette";
import Reveal from "./Reveal";
import { TextLink } from "./ui";

const card = "lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm";

export function TypeCards({ limit }: { limit?: number }) {
  const items = limit ? fosteringTypes.slice(0, limit) : fosteringTypes;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => {
        const c = pick(i);
        const Icon = flatIcons[i % flatIcons.length];
        return (
          <Reveal key={t.slug} delay={(i % 3) * 90}>
            <article className={card}>
              <div className={`h-1.5 ${c.bar}`} />
              <div className="flex flex-1 flex-col p-7">
                <Icon className="mb-4 h-16 w-16" />
                <h3 className="text-xl font-semibold">{t.title}</h3>
                <p className="mt-3 flex-1 text-ink-soft">{t.summary}</p>
                <Link
                  href={`/types-of-fostering#${t.slug}`}
                  className="group mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-navy-700 hover:text-navy-900"
                >
                  Find out more<span className="sr-only"> about {t.title}</span>
                  <ArrowCircleIcon width={20} height={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function StoryCards({ items }: { items: Story[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((s, i) => {
        const c = pick(i + 1);
        return (
          <Reveal key={s.slug} delay={i * 90}>
            <article className={card}>
              <div className={`h-1.5 ${c.bar}`} />
              <div className="flex flex-1 flex-col p-7">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${c.chip}`}>{s.fostering}</span>
                  {s.sample && (
                    <span className="rounded-full bg-tangerine-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-tangerine-700">Sample story</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 flex-1 text-ink-soft">{s.excerpt}</p>
                <p className={`mt-4 text-sm font-bold ${c.text}`}>{s.carer}</p>
                <Link href={`/stories#${s.slug}`} className="group mt-1 inline-flex min-h-11 items-center gap-2 font-semibold text-navy-700 hover:text-navy-900">
                  Read the story<span className="sr-only">: {s.title}</span>
                  <ArrowCircleIcon width={20} height={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function PostCards({ items }: { items: Post[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((p, i) => {
        const c = pick(i);
        return (
          <Reveal key={p.slug} delay={i * 90}>
            <article className={card}>
              <div className={`flex h-28 items-end p-5 ${c.tint}`}>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${c.chip}`}>{p.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-sm font-semibold text-ink-soft">
                  <time dateTime={p.date}>{formatPostDate(p.date)}</time> · {p.readingMinutes} min read
                </p>
                <h3 className="mt-3 text-xl font-semibold">
                  <Link href={`/blog/${p.slug}`} className="hover:text-navy-600">{p.title}</Link>
                </h3>
                <p className="mt-3 flex-1 text-ink-soft">{p.excerpt}</p>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function FaqList({ limit, withLink = false }: { limit?: number; withLink?: boolean }) {
  const items = limit ? allFaqs.slice(0, limit) : allFaqs;
  return (
    <div>
      <div className="space-y-3">
        {items.map((f) => (
          <details key={f.q} className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm open:border-navy-200">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-lg font-semibold text-navy-800 hover:bg-navy-50 sm:px-6">
              {f.q}
              <span className="chev flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white transition-transform">
                <ChevronDownIcon width={18} height={18} />
              </span>
            </summary>
            <p className="px-5 pb-6 text-ink-soft sm:px-6">{f.a}</p>
          </details>
        ))}
      </div>
      {withLink && (
        <p className="mt-6">
          <TextLink href="/faqs">See all fostering FAQs</TextLink>
        </p>
      )}
    </div>
  );
}

export function ProcessTimeline({ limit }: { limit?: number }) {
  const items = limit ? processSteps.slice(0, limit) : processSteps;
  return (
    <ol className="relative space-y-8 before:absolute before:bottom-4 before:left-6 before:top-4 before:w-0.5 before:bg-navy-200 sm:before:left-1/2 sm:before:-translate-x-1/2">
      {items.map((s, i) => {
        const c = pick(i);
        return (
          <li key={s.step} className="relative">
            <Reveal>
              <div className={`flex items-start gap-5 sm:relative sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12" : "sm:ml-auto sm:flex-row sm:pl-12"}`}>
                <span
                  className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold ring-8 ring-white ${c.dot} sm:absolute sm:top-0 ${
                    i % 2 === 0 ? "sm:right-0 sm:translate-x-1/2" : "sm:left-0 sm:-translate-x-1/2"
                  }`}
                >
                  {s.step}
                </span>
                <div className="min-w-0 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                  <p className={`text-sm font-bold uppercase tracking-wider ${c.text}`}>{s.time}</p>
                  <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.body}</p>
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
