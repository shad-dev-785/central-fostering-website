import Link from "next/link";
import { footerColumns, site } from "@/config/site";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import CopyrightYear from "./CopyrightYear";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

export default function Footer() {
  const { contact, regulation } = site;
  const hasRegulation = regulation.ofstedUrn || regulation.companyNumber || regulation.charityNumber;

  return (
    <footer className="bg-navy-900 text-white">
      <div aria-hidden="true" className="logo-strip h-1.5" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-white/80">{site.tagline} We are a Birmingham-based fostering agency recruiting foster carers across the East and West Midlands.</p>
            <ul className="mt-6 space-y-3 text-white/90">
              <li className="flex items-start gap-3">
                <PhoneIcon className="mt-1 shrink-0 text-tangerine-300" width={20} height={20} />
                <a href={contact.phoneHref} className="font-bold hover:text-tangerine-300">{contact.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon className="mt-1 shrink-0 text-tangerine-300" width={20} height={20} />
                <a href={`mailto:${contact.email}`} className="hover:text-tangerine-300">{contact.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <PinIcon className="mt-1 shrink-0 text-tangerine-300" width={20} height={20} />
                <address className="not-italic">
                  <span className="block font-semibold text-white">Our office is in {contact.addressParts.locality}</span>
                  {contact.address.join(", ")}
                </address>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="mt-1 shrink-0 text-tangerine-300" width={20} height={20} />
                <span>{contact.hours}</span>
              </li>
            </ul>
            <SocialLinks className="mt-6" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mb-4 font-display text-lg font-bold text-white">{col.title}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="inline-block py-2 text-white/80 hover:text-tangerine-300">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          {hasRegulation && (
            <p>
              {regulation.ofstedUrn && <>Ofsted registered, URN {regulation.ofstedUrn}. </>}
              {regulation.companyNumber && <>Company no. {regulation.companyNumber}. </>}
              {regulation.charityNumber && <>Charity no. {regulation.charityNumber}.</>}
            </p>
          )}
          <p className="flex gap-4">
            <Link href="/privacy-policy" className="inline-block py-2 hover:text-tangerine-300">Privacy</Link>
            <Link href="/cookie-policy" className="inline-block py-2 hover:text-tangerine-300">Cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
