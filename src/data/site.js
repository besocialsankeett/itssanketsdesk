/* ==========================================================================
   SITE CONFIG — identity, contact, experience.
   Everything here comes from Sanket's resume. Edit this file, not the JSX.
   ========================================================================== */

export const contact = {
  email: 'sanketathawale0508@gmail.com',

  links: [
    {
      id: 'email',
      label: 'EMAIL',
      value: 'sanketathawale0508@gmail.com',
      href: 'mailto:sanketathawale0508@gmail.com',
      note: 'fastest way in',
    },
    {
      id: 'instagram',
      label: 'INSTAGRAM',
      value: '@social.sankeett',
      href: 'https://www.instagram.com/social.sankeett/',
      note: 'scripts, reels, work in progress',
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      value: '/in/sanket-athawale',
      href: 'https://www.linkedin.com/in/sanket-athawale/',
      note: 'the tidy version of me',
    },
    {
      id: 'resume',
      label: 'RESUME',
      value: 'PDF · one page',
      href: '/resume.pdf',
      note: 'if you need the formal one',
      download: true,
    },
  ],
}

export const identity = {
  name: 'SANKET ATHAWALE',
  first: 'SANKET',
  last: 'ATHAWALE',
  role: 'Content × Social × Design × Video',
  disciplines: ['CONTENT', 'SOCIAL', 'DESIGN', 'VIDEO'],
  currently: 'Social Media & Marketing Manager — Bibliophiles',
  location: 'Navi Mumbai, IN',
  tools: ['CapCut', 'Canva', 'Figma', 'Blender', 'Photoshop', 'Illustrator', 'Wix Studio', 'Spline'],
}

/* ---- Experience — straight from the resume, nothing inflated ------------- */
export const experience = [
  {
    id: 'bibliophiles',
    org: 'Bibliophiles',
    role: 'Social Media & Marketing Manager',
    period: 'Sep 2025 — Present',
    status: 'CURRENT',
    summary:
      'Running content end to end for a book-and-lifestyle brand — writing it, shooting it, editing it, and closing the deals that get it made.',
    points: [
      'Write scripted video content and blog copy — voiceover scripts, captions, text overlays — across influencer, UGC and celebrity order-reveal formats, including campaigns featuring Deepika Padukone and Sonam Kapoor.',
      'Pitch, negotiate and close brand collaborations with influencers over calls; ran a 30-influencer UGC campaign end to end, from first outreach to final content delivery.',
      'Edit short-form video for Instagram and YouTube, turning raw footage into publish-ready reels and product showcases.',
      'Direct product shoots and manage day-to-day community engagement, keeping the brand voice consistent across platforms.',
    ],
    tags: ['Scripts', 'Reels', 'UGC', 'Influencer campaigns', 'Product shoots', 'Community'],
  },
  {
    id: 'netizens',
    org: 'The Indian Netizens',
    role: 'Wix Studio Developer Intern',
    period: 'Jun 2025 — Aug 2025',
    link: 'https://www.theindiannetizens.in/',
    summary:
      'An independent, youth-led think-tank. I worked on the website and on the content that goes on it.',
    points: [
      'Designed website layouts and UI structure in Wix Studio, translating creative concepts into functional, visually engaging pages.',
      'Wrote blog content and edited UGC-style videos as part of the team’s regular content output.',
    ],
    tags: ['Wix Studio', 'Web layout', 'UI', 'Blog', 'Video edits'],
  },
  {
    id: 'avalon',
    org: 'Avalon Tech Fest',
    role: 'Creative Head',
    period: '2024',
    summary: 'The college’s flagship fest. I ran the creative side of it.',
    points: [
      'Led a creative team producing campaign visuals and promotional content for the fest.',
      'Directed creative concept and execution across all marketing materials, from ideation to final assets.',
    ],
    tags: ['Creative direction', 'Campaign visuals', 'Team lead'],
  },
]

/* Small print scattered around the desk. */
export const marginalia = {
  hero: ['DESK ITEM 01', 'SCALE 1:1', 'DO NOT DELETE', 'STILL FIGURING IT OUT', 'CTRL + Z'],
  work: ['IDEA #027', 'EXPORT_FINAL_v7', 'FILED UNDER: MADE'],
  process: ['MADE AT 02:17 AM', 'REV. C', 'NOT TO SCALE'],
  footer: ['HANDLE WITH CREATIVITY', 'THIS SIDE UP', 'FRAGILE — IDEAS INSIDE'],
}

export const navLinks = [
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'play', label: 'PLAY', href: '#play' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
]
