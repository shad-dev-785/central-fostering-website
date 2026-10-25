/**
 * Single source of truth for everything an agency owner will want to change:
 * name, contact details, social links and navigation.
 *
 * Name: the full name "Central Fostering Agency UK" is used on the front of the site and in legal text; the short form
 * "CFA" is used in sub headings and tight spaces.
 * Still to confirm: opening hours (see contact.hours) and social links (empty ones are hidden).
 */
export const site = {
  name: "Central Fostering Agency UK",
  shortName: "CFA",
  // Logo files live in /public. logo = dark text, for light backgrounds; logoLight = white text, for navy backgrounds;
  // logoMark = the aperture on its own (favicon, structured data). All are transparent PNGs cut from the supplied artwork.
  logo: "/logo.png",
  logoLight: "/logo-light.png",
  logoMark: "/logo-mark.png",
  logoSize: { width: 889, height: 272 },
  logoAlt: "Central Fostering Agency UK",
  tagline: "Where every child finds a place to belong.",
  description:
    "Central Fostering Agency UK (CFA) is a fostering agency that recruits, trains and supports foster carers to give children and young people a safe, caring home.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    phone: "0333 188 6786",
    phoneHref: "tel:+443331886786",
    email: "foster@centralfostering.org.uk",
    // Lines as shown on the site (footer, contact page, privacy policy), starting with the addressee.
    address: ["Central Fostering Agency", "115-119 Regus", "Fort Dunlop", "Fort Parkway", "Birmingham", "B24 9FD"],
    // The same address split up for search-engine data (schema.org PostalAddress).
    addressParts: { street: "115-119 Regus, Fort Dunlop, Fort Parkway", locality: "Birmingham", region: "West Midlands", postcode: "B24 9FD" },
    hours: "Monday to Friday, 9am to 5pm",
    outOfHours: "Out-of-hours support line for approved foster carers: 24 hours a day, 365 days a year.",
  },

  // Leave a value empty ("") to hide that icon.
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
    tiktok: "",
    youtube: "",
  },

  // Ofsted details are legally sensitive. Fill these in with the real
  // registration and latest inspection outcome; the footer shows them only when set.
  regulation: {
    ofstedUrn: "",
    ofstedReportUrl: "",
    companyNumber: "",
    charityNumber: "",
  },
} as const;

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; links: NavLink[] };

export const navGroups: NavGroup[] = [
  {
    label: "Could you foster?",
    links: [
      {
        label: "Become a foster carer",
        href: "/become-a-foster-carer",
        description: "Who can foster, and what it takes",
      },
      {
        label: "Types of fostering",
        href: "/types-of-fostering",
        description: "Short term, long term, emergency and more",
      },
      { label: "Fostering FAQs", href: "/faqs", description: "Straight answers to common questions" },
    ],
  },
  {
    label: "Why CFA?",
    links: [
      { label: "About us", href: "/about", description: "Who we are and what we stand for" },
      {
        label: "Finance and support",
        href: "/finance-and-support",
        description: "Allowances, training and 24/7 help",
      },
      { label: "Carer stories", href: "/stories", description: "Hear from people who foster" },
    ],
  },
  {
    label: "Your journey",
    links: [
      {
        label: "The fostering process",
        href: "/fostering-process",
        description: "From first call to your first placement",
      },
      { label: "Apply online", href: "/apply", description: "Start your application" },
      {
        label: "Request a call back",
        href: "/request-a-call-back",
        description: "We will ring you at a time that suits",
      },
    ],
  },
];

export const topLevelLinks: NavLink[] = [
  { label: "Areas we cover", href: "/areas-we-cover" },
  { label: "News and advice", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Fostering",
    links: [
      { label: "Become a foster carer", href: "/become-a-foster-carer" },
      { label: "Types of fostering", href: "/types-of-fostering" },
      { label: "The fostering process", href: "/fostering-process" },
      { label: "Fostering FAQs", href: "/faqs" },
      { label: "Apply online", href: "/apply" },
    ],
  },
  {
    title: "Who we are",
    links: [
      { label: "About us", href: "/about" },
      { label: "Finance and support", href: "/finance-and-support" },
      { label: "Carer stories", href: "/stories" },
      { label: "Areas we cover", href: "/areas-we-cover" },
      { label: "News and advice", href: "/blog" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Request a call back", href: "/request-a-call-back" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Cookie policy", href: "/cookie-policy" },
    ],
  },
];
