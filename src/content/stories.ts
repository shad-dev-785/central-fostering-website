/**
 * IMPORTANT: these three stories are SAMPLES written to show the page layout.
 * They are not real people. While `sample` is true the site shows a visible
 * "Sample story" badge. Replace them with real carer stories (with written
 * permission, and first names or agreed pseudonyms only) and set sample to false.
 */
export type Story = {
  slug: string;
  title: string;
  carer: string;
  fostering: string;
  excerpt: string;
  body: string[];
  sample: boolean;
};

export const stories: Story[] = [
  {
    slug: "a-spare-room-and-an-open-door",
    title: "A spare room and an open door",
    carer: "Sample carer, Lewisham",
    fostering: "Short term fostering",
    excerpt: "Fostering began as a 'maybe one day' idea. A conversation over the phone changed that.",
    body: [
      "I had always thought fostering was for other people: bigger houses, more experience, a different kind of life. Then I picked up the phone, expecting to be told I was not suitable.",
      "Instead I was asked what my week looked like and what I was hoping for. That felt like the first time someone had asked me what I could offer rather than what I lacked.",
      "The training was honest about how hard it can be, and just as honest about how rewarding it is. I still ring my social worker when I am unsure, and she still picks up.",
    ],
    sample: true,
  },
  {
    slug: "fostering-as-a-couple",
    title: "Fostering as a couple, and as a family",
    carer: "Sample carers, Newham",
    fostering: "Long term fostering",
    excerpt: "Our own children were nervous at first. Now they are the first to say hello.",
    body: [
      "We talked for months before we made the call. Our biggest worry was our own two children. We needn't have been so concerned: the team spoke to them directly and gave them a say.",
      "The first weeks were hard, as everyone found their feet. But the carer group and the out-of-hours line meant we never felt left to cope alone.",
      "What we hadn't expected was how much our own children would grow in kindness and patience.",
    ],
    sample: true,
  },
  {
    slug: "fostering-teenagers",
    title: "Why I chose to foster teenagers",
    carer: "Sample carer, Croydon",
    fostering: "Teenage fostering",
    excerpt: "Teenagers are not the problem. They are people who need someone to stay.",
    body: [
      "People tell me I am brave to foster teenagers. I don't see it that way. I see young people who have been let down and who are waiting to find out if the next adult will stay.",
      "My job is simple: be consistent, be honest, have dinner on the table and keep the door open. The rest takes time.",
      "The young person who lived with me for two years still texts me on my birthday. That is the best thank you I could ever ask for.",
    ],
    sample: true,
  },
];
