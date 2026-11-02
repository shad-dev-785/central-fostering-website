"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navGroups, site, topLevelLinks } from "@/config/site";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { ChevronDownIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "./Icons";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on Escape or when clicking outside the nav.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const closeAll = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div aria-hidden="true" className="logo-strip h-1.5" />
      {/* Top bar: phone, email, social */}
      <div className="hidden bg-navy-900 text-sm text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2">
          <div className="flex items-center gap-6">
            <a href={site.contact.phoneHref} className="flex items-center gap-2 font-bold hover:text-tangerine-300">
              <PhoneIcon width={16} height={16} />
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 hover:text-tangerine-300">
              <MailIcon width={16} height={16} />
              {site.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/75">{site.contact.hours}</span>
            <SocialLinks className="[&_a]:h-8 [&_a]:w-8" />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-navy-800">
        <nav ref={navRef} aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" onClick={closeAll}>
            <Logo light />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {navGroups.map((group) => {
              const isOpen = openGroup === group.label;
              return (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 font-bold text-white hover:bg-white/10 hover:text-white 2xl:px-4"
                  >
                    {group.label}
                    <ChevronDownIcon width={16} height={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 top-full w-80 pt-2">
                      <ul className="rounded-2xl border border-leaf-100 bg-white p-3 shadow-xl">
                        {group.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={closeAll}
                              className="block rounded-xl px-4 py-3 hover:bg-navy-50"
                            >
                              <span className="block font-bold text-navy-800">{l.label}</span>
                              {l.description && <span className="block text-sm text-ink-soft">{l.description}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
            {topLevelLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="whitespace-nowrap rounded-full px-3 py-2 font-bold text-white hover:bg-white/10 hover:text-white 2xl:px-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden whitespace-nowrap rounded-full bg-tangerine-400 px-5 py-2.5 font-semibold text-ink transition-colors hover:bg-tangerine-300 sm:inline-block"
            >
              Enquire now
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        {mobileOpen && (
          <div id="mobile-menu" data-lenis-prevent className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-white/15 bg-navy-800 xl:hidden">
            <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
              {navGroups.map((group) => (
                <details key={group.label} className="border-b border-white/15 py-1">
                  <summary className="flex cursor-pointer items-center justify-between py-3 font-bold text-white">
                    {group.label}
                    <ChevronDownIcon width={18} height={18} className="chev transition-transform" />
                  </summary>
                  <ul className="pb-3 pl-2">
                    {group.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={closeAll} className="block rounded-lg px-3 py-2.5 text-white/90 hover:bg-white/10 hover:text-white">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              {topLevelLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={closeAll} className="block border-b border-white/15 py-4 font-bold text-white">
                  {l.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 py-5">
                <Link href="/contact" onClick={closeAll} className="rounded-full bg-tangerine-400 px-6 py-3 text-center font-semibold text-ink hover:bg-tangerine-300">
                  Enquire now
                </Link>
                <a href={site.contact.phoneHref} className="rounded-full border-2 border-white px-6 py-3 text-center font-bold text-white hover:bg-white/10">
                  Call {site.contact.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
