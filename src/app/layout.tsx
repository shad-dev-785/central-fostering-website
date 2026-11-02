import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import EnquireTab from "@/components/EnquireTab";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import { isLiveSite, organizationLd, websiteLd } from "@/lib/seo";

// Poppins for confident, modern headings; Nunito Sans for easy, friendly body text.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// "optional": if the font is not ready almost instantly the metrics-matched fallback is used for that visit,
// so body text never jumps or re-flows. That keeps Largest Contentful Paint fast on slow connections.
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Birmingham & Midlands fostering | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Fostering and adoption services",
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  // Keep search engines out until the real domain is configured (NEXT_PUBLIC_SITE_URL).
  robots: isLiveSite
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_GB",
    title: `Birmingham & Midlands fostering | ${site.name}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#131b41",
};

/**
 * Starts scroll-reveals on first load without waiting for React to hydrate (hydration can take seconds on a slow
 * phone, and until then revealed content would stay invisible). Reveal.tsx takes over for in-site navigation.
 */
const revealOnLoad = `(function(){var els=document.querySelectorAll('.reveal');if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-visible')});return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});els.forEach(function(e){io.observe(e)})})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${poppins.variable} ${nunitoSans.variable}`}>
      <body className="flex min-h-screen flex-col pb-16 antialiased xl:pb-0">
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
        <SmoothScroll />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-tangerine-400 px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <EnquireTab />
        <script dangerouslySetInnerHTML={{ __html: revealOnLoad }} />
      </body>
    </html>
  );
}
