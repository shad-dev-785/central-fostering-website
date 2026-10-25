/**
 * Single source of truth for everything an agency owner will want to change:
 * name, contact details, social links and navigation.
 *
 * PLACEHOLDERS: the phone, email and address below are reserved/example values
 * (020 7946 0xxx is an Ofcom drama number, .example is a reserved domain).
 * Replace them before launch. Social links that are left empty are hidden.
 */
export const site = {
  name: "Central Fostering",
  shortName: "Central",
  // Logo files live in /public. logo = dark text, for light backgrounds; logoLight = white text, for navy backgrounds;
  // logoMark = the aperture on its own (favicon, structured data). All are transparent PNGs cut from the supplied artwork.
  logo: "/logo.png",
  logoLight: "/logo-light.png",
  logoMark: "/logo-mark.png",
  logoSize: { width: 889, height: 272 },
  logoAlt: "Central Fostering",
  tagline: "Where every child finds a place to belong.",
  description:
    "Central Fostering is a London fostering agency that recruits, trains and supports foster carers to give children and young people a safe, caring home.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    phone: "020 7946 0000",
    phoneHref: "tel:+442079460000",
    email: "enquiries@centralfostering.example",
    address: ["123 Example Road", "London", "E1 0AA"],
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
    label: "Why Central?",
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
