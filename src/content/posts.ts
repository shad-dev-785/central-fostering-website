export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  /** Shorter title for search results when the headline is long. Optional. */
  metaTitle?: string;
  date: string; // ISO yyyy-mm-dd
  category: "Advice" | "News" | "Myth busting";
  readingMinutes: number;
  excerpt: string;
  blocks: Block[];
};

/** Newest first. Add a post by adding an object here. */
export const posts: Post[] = [
  {
    slug: "five-fostering-myths",
    title: "Five fostering myths, and what is actually true",
    metaTitle: "5 fostering myths, busted",
    date: "2026-09-18",
    category: "Myth busting",
    readingMinutes: 4,
    excerpt: "Too old, too busy, wrong kind of home? Many people rule themselves out before they ever ask.",
    blocks: [
      {
        type: "p",
        text: "Every week we speak to people who have thought about fostering for years but never rang, because of something they assumed would rule them out. Here are the five assumptions we hear most often.",
      },
      { type: "h2", text: "Myth 1: You have to be married and own your home" },
      {
        type: "p",
        text: "You do not. Single people, couples, renters and homeowners all foster. What matters is a safe, stable home with a spare bedroom and a genuine wish to help.",
      },
      { type: "h2", text: "Myth 2: You can't foster if you work" },
      {
        type: "p",
        text: "Many carers work. Some foster full time and others choose short breaks or part time arrangements. The key is to be honest about what your week looks like so that we can find a placement that suits it.",
      },
      { type: "h2", text: "Myth 3: You need to have raised children" },
      {
        type: "p",
        text: "Experience of children helps, but training and support are built in. Life experience, patience and a sense of humour count for a great deal.",
      },
      { type: "h2", text: "Myth 4: You're too old" },
      {
        type: "p",
        text: "You need to be at least 21. There is no upper age limit. What matters is your health, energy and ability to meet a child's needs.",
      },
      { type: "h2", text: "Myth 5: It's a huge commitment you can't back out of" },
      {
        type: "p",
        text: "Enquiring places you under no obligation. You can step back at any stage of the process, and we would rather you were sure than pressured.",
      },
    ],
  },
  {
    slug: "what-happens-at-a-home-visit",
    title: "What happens at a fostering home visit?",
    metaTitle: "What happens at a home visit?",
    date: "2026-08-04",
    category: "Advice",
    readingMinutes: 3,
    excerpt: "Nervous about a social worker visiting your home? Here is what really happens, and what we are not looking for.",
    blocks: [
      {
        type: "p",
        text: "After your first call, one of our social workers will arrange to visit you at home. For many people this is the part they feel most anxious about, so let us take the mystery out of it.",
      },
      { type: "h2", text: "What we are looking for" },
      {
        type: "ul",
        items: [
          "A safe, reasonably comfortable home where a child could have their own bedroom",
          "Who lives in the household and how everyone feels about fostering",
          "Your routine, your support network and your reasons for wanting to foster",
        ],
      },
      { type: "h2", text: "What we are not looking for" },
      {
        type: "p",
        text: "A show home. Toys on the floor and a pile of washing do not worry us. We want to see where a child would really live, not where you would host a dinner party.",
      },
      { type: "h2", text: "Questions to ask us" },
      {
        type: "p",
        text: "The visit goes both ways. Ask about training, allowances, support and what a typical week looks like. Write your questions down beforehand, because everyone forgets them once the kettle goes on.",
      },
    ],
  },
  {
    slug: "why-the-midlands-needs-more-foster-carers",
    title: "Why the Midlands needs more foster carers",
    metaTitle: "Why the Midlands needs carers",
    date: "2026-06-22",
    category: "News",
    readingMinutes: 3,
    excerpt: "Children are often placed far from their schools, friends and families. Local carers change that.",
    blocks: [
      {
        type: "p",
        text: "When a child comes into care, one of the biggest factors in how well they cope is whether they can stay close to what they already know: their school, their friends, their community.",
      },
      {
        type: "p",
        text: "When there are not enough local foster homes, children can be placed many miles from everything familiar. That adds disruption on top of an already difficult time.",
      },
      { type: "h2", text: "How local carers help" },
      {
        type: "ul",
        items: [
          "Children can keep going to the same school and see the same friends",
          "Contact with brothers, sisters and family is easier to arrange",
          "Carers understand the local area and its services",
        ],
      },
      {
        type: "p",
        text: "If you live in the East or West Midlands and have a spare room and room in your life, we would love to talk to you.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string) {
  // Fixed-locale formatting of an ISO date string: deterministic, no "now" involved.
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
