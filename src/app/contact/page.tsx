import { site } from "@/config/site";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { ClockIcon, MailIcon, MoonIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import SocialLinks from "@/components/SocialLinks";
import { ButtonLink, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact our fostering team",
  description: "Get in touch with Central Fostering Agency UK by phone, email or our enquiry form. A friendly team is ready to answer your fostering questions.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = site;
  const items = [
    { icon: <PhoneIcon />, label: "Call us", content: <a href={contact.phoneHref} className="text-xl font-bold text-navy-800 hover:text-leaf-700">{contact.phone}</a> },
    { icon: <MailIcon />, label: "Email us", content: <a href={`mailto:${contact.email}`} className="font-bold text-navy-800 hover:text-leaf-700 break-all">{contact.email}</a> },
    { icon: <PinIcon />, label: `Our office (${contact.addressParts.locality})`, content: <address className="not-italic text-ink-soft">{contact.address.join(", ")}<span className="mt-1 block text-sm">Our office is in {contact.addressParts.locality}. We recruit and support foster carers across London.</span></address> },
    { icon: <ClockIcon />, label: "Office hours", content: <span className="text-ink-soft">{contact.hours}</span> },
    { icon: <MoonIcon />, label: "Out of hours", content: <span className="text-ink-soft">{contact.outOfHours}</span> },
  ];

  return (
    <>
      <PageHero eyebrow="Contact us" title="Let's talk" intro="Whether you are ready to apply or simply curious, we would love to hear from you. There is never any pressure." />
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold">Get in touch</h2>
            <ul className="mt-8 space-y-6">
              {items.map((i) => (
                <li key={i.label} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-700 text-white">{i.icon}</span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-leaf-700">{i.label}</p>
                    {i.content}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <SocialLinks tone="dark" />
            </div>
            <div className="mt-8 rounded-3xl bg-navy-50 p-6">
              <p className="font-display text-xl font-bold">Prefer us to ring you?</p>
              <p className="mt-1 text-ink-soft">Tell us the best time and we will call.</p>
              <div className="mt-4">
                <ButtonLink href="/request-a-call-back" variant="primary">Request a call back</ButtonLink>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <h2 className="mb-6 text-3xl font-bold">Send us a message</h2>
            <EnquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
}
