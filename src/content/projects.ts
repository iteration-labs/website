export type Project = {
  name: string;
  slug: string;
  tagline: string;
  summary: string;
  detail: string;
  accent: 'olive' | 'rust' | 'ink';
};

export const projects: Project[] = [
  {
    name: 'FamilyOps',
    slug: 'familyops',
    tagline: 'AI for family operations.',
    summary:
      'A system for reducing parental cognitive overload so home life feels less like an endless backstage production.',
    detail:
      'FamilyOps tries to take the tangle out of family logistics: calendars, routines, responsibilities, invisible labor. Less juggling. More actual family.',
    accent: 'olive',
  },
  {
    name: 'Today in Emojis',
    slug: 'today-in-emojis',
    tagline: 'News, culture, and collective absurdity compressed into symbols.',
    summary:
      'A playful commentary on clickbait culture and media overload, translated into the language of compression, parody, and speed.',
    detail:
      'It mirrors the ridiculous pace of modern attention by asking how much of the world can be flattened into tiny pictograms before meaning starts to wobble.',
    accent: 'rust',
  },
  {
    name: 'Math is Punk',
    slug: 'math-is-punk',
    tagline: 'Mathematics as elegance, rebellion, and art.',
    summary:
      'A love letter to mathematics as pattern, beauty, structure, and one of the strangest forms of human expression.',
    detail:
      'It treats math less like a school subject and more like a radical aesthetic language: precise, unruly, severe, ecstatic.',
    accent: 'ink',
  },
];
