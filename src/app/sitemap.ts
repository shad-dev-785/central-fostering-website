import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { absoluteUrl, lastUpdated } from "@/lib/seo";

type Entry = { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" };

// Most important pages first. Priority is a hint, not a command.
const pages: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/become-a-foster-carer", priority: 0.9, changeFrequency: "monthly" },
  { path: "/types-of-fostering", priority: 0.9, changeFrequency: "monthly" },
  { path: "/fostering-process", priority: 0.9, changeFrequency: "monthly" },
  { path: "/finance-and-support", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faqs", priority: 0.8, changeFrequency: "monthly" },
  { path: "/apply", priority: 0.8, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/request-a-call-back", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/areas-we-cover", priority: 0.7, changeFrequency: "monthly" },
  { path: "/our-team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified: lastUpdated, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
