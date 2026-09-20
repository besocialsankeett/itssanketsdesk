/* ==========================================================================
   PROJECTS
   ⚠️  SANKET — this is the only file you touch to change the work on the desk.

   HOW TO ADD A PROJECT
   1. Drop a 1600px-wide jpg in  public/assets/projects/
      and an 800px-wide copy in public/assets/projects/sm/  (same filename).
   2. Call img('your-filename') — no extension, no folder.
   3. Add an object to the array below.

   `type` drives how the card is cut and how the case study is paced:
     'poster' | 'folder' | 'strip' | 'frame' | 'print' | 'screen'
   `span` is the grid width: 'wide' (7 cols) | 'half' (6) | 'tall' (5) | 'narrow' (4)
   `caseStudy.blocks` is an ordered list. Mix them freely — no two projects
   should read the same. Available block kinds are documented in
   components/CaseStudy.jsx.
   ========================================================================== */

const img = (name) => ({
  src: `/assets/projects/${name}.jpg`,
  sm: `/assets/projects/sm/${name}.jpg`,
})

const all = [
  /* ==================================================================== */
  /*  LIVE WORK — these open the real thing                               */
  /* ==================================================================== */

  /* ---------------------------------------------------------------- 01 -- */
  {
    id: 'netizens',
    index: '01',
    title: 'THE INDIAN NETIZENS',
    client: 'The Indian Netizens · internship',
    category: 'Website & UI · Wix Studio',
    year: '2025',
    kind: 'Internship',
    link: 'https://www.theindiannetizens.in/',
    description:
      'An independent, youth-led think-tank. I built page layouts and UI in Wix Studio for the site you can open right now, and wrote and cut content for it.',
    color: '#111111',
    accent: '#ffd230',
    type: 'screen',
    span: 'wide',
    rotate: -0.8,
    cover: img('netizens-home'),
    caseStudy: {
      tint: '#f3efe4',
      blocks: [
        {
          kind: 'brief',
          label: 'THE JOB',
          title: 'Three months inside a think-tank, making the website say what the people do.',
          body: 'The Indian Netizens publishes articles, reports and a magazine from a young editorial team. I joined as a Wix Studio developer intern from June to August 2025 — designing website layouts and UI structure in Wix Studio, and turning creative concepts into functional, visually engaging pages. Alongside that I wrote blog content and edited UGC-style videos as part of the team’s regular output.',
        },
        {
          kind: 'image',
          ...img('netizens-home'),
          alt: 'Homepage of theindiannetizens.in — tricolour stripe, black masthead reading THE INDIAN NETIZENS, a hero photograph of Rashtrapati Bhavan',
          caption: 'Live homepage, captured September 2026. The site continues to evolve with the team.',
          frame: 'plain',
          span: 'full',
        },
        {
          kind: 'did',
          items: [
            'Website layouts and UI structure in Wix Studio',
            'Translating creative concepts into working pages',
            'Blog content writing',
            'UGC-style video editing',
          ],
        },
        {
          kind: 'specs',
          rows: [
            ['Role', 'Wix Studio Developer Intern'],
            ['Period', 'Jun — Aug 2025'],
            ['Tools', 'Wix Studio, CapCut, Canva'],
            ['Status', 'Live'],
          ],
        },
        {
          kind: 'link',
          href: 'https://www.theindiannetizens.in/',
          label: 'OPEN THE LIVE SITE',
          note: 'theindiannetizens.in — opens in a new tab',
        },
        {
          kind: 'learning',
          body: 'Building inside someone else’s CMS is a different job from designing a page in Figma. Every layout decision had to survive an editor adding a 900-word article to it at midnight. That constraint made me a better designer than freedom would have.',
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- 02 -- */
  {
    id: 'papercut',
    index: '02',
    title: 'PAPER CUT',
    client: 'Self-initiated brand',
    category: 'Brand identity',
    year: '2025',
    kind: 'Self-initiated',
    link: 'https://www.figma.com/proto/wW10sikCjkx96z6IMONxim/Untitled?node-id=25-3',
    description:
      'A DIY paper-craft kit brand for a Gen Z audience — logo, wordmark and a full visual system for origami, cardboard-build and puzzle kits.',
    color: '#04183a',
    accent: '#2f79f2',
    type: 'folder',
    span: 'tall',
    rotate: 1.4,
    cover: img('papercut-cover'),
    caseStudy: {
      tint: '#f3efe4',
      blocks: [
        {
          kind: 'brief',
          label: 'THE BRIEF',
          title: 'A brand for kids who would rather build the thing than buy it finished.',
          body: 'Paper Cut is a DIY paper-craft brand — origami kits, 3D cardboard cut-out builds, puzzle kits — aimed at a generation that treats a papercut as a badge of honour, not a complaint. The identity had to feel bold, hands-on and unapologetically imperfect, and it had to work on a kit box, an app icon and a social post without being redrawn.',
        },
        {
          kind: 'image',
          ...img('papercut-cover'),
          alt: 'Paper Cut brand guide cover — the four-square fold icon and lowercase wordmark on ink navy, then the brand overview page',
          caption: 'Brand guide, opening spread. The icon is four squares with a fold in each — the logo is literally a paper cut.',
          frame: 'tape',
          span: 'full',
        },
        {
          kind: 'idea',
          body: 'fold your own. build weird stuff.',
          note: 'Every headline in the system is short, lowercase and imperative. Never a paragraph where a phrase will do.',
        },
        {
          kind: 'gallery',
          layout: 'row',
          items: [
            { ...img('papercut-name'), alt: 'The Name — why “paper cut”, with the wordmark shown large', caption: 'The name. The dot on the “e” is an eye; the tail on the “t” echoes the fold.' },
            { ...img('papercut-logo'), alt: 'Logo system — the four-state icon P·R·C·T and clear-space rules', caption: 'Logo system. Four states spell P·R·C·T and double as a loading sequence.' },
          ],
        },
        {
          kind: 'image',
          ...img('papercut-color'),
          alt: 'Colour system — paper cut blue, fold blue, ink navy and white',
          caption: 'A monochrome-blue system by design. The logo already does the talking in one colour.',
          frame: 'plain',
          span: 'wide',
        },
        {
          kind: 'swatches',
          colors: [
            { hex: '#2F79F2', name: 'Paper cut blue' },
            { hex: '#5E99FA', name: 'Fold blue' },
            { hex: '#04183A', name: 'Ink navy' },
            { hex: '#FFFFFF', name: 'White' },
          ],
        },
        {
          kind: 'gallery',
          layout: 'stack',
          items: [
            { ...img('papercut-type'), alt: 'Typography — Cabinet Grotesk headlines, General Sans body', caption: 'Type. Cabinet Grotesk for the shouting, General Sans for the rest.' },
            { ...img('papercut-pattern'), alt: 'Pattern library — flat, faceted animal fold shapes with dashed crease lines', caption: 'Pattern library: animal folds. Flat faceted shapes with crease lines, echoing the logo.' },
          ],
        },
        {
          kind: 'did',
          items: ['Naming & brand voice', 'Logo & wordmark', 'Colour and type system', 'Pattern library', 'Brand guidelines document'],
        },
        {
          kind: 'link',
          href: 'https://www.figma.com/proto/wW10sikCjkx96z6IMONxim/Untitled?node-id=25-3',
          label: 'OPEN THE FIGMA PROTOTYPE',
          note: 'Full brand guide, scrollable — opens in a new tab',
        },
        {
          kind: 'learning',
          body: 'The hardest part was not the logo. It was writing rules loose enough that the brand can be handed to someone else and still come back looking like itself.',
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- 03 -- */
  {
    id: 'forest',
    index: '03',
    title: 'FOREST PHYSICS',
    client: 'Experiment',
    category: 'Interactive 3D · Spline',
    year: '2025',
    kind: 'Experiment',
    link: 'https://my.spline.design/forestphysicscopy-Yxj2Fsft4q4KJqQo6B37vY1E/',
    description:
      'A low-poly campsite you can drive around. Built in Spline to learn how physics, camera and scene composition behave in the browser.',
    color: '#f4dfae',
    accent: '#2f6b57',
    type: 'frame',
    span: 'half',
    rotate: 0.7,
    cover: img('spline-forest'),
    caseStudy: {
      tint: '#f3efe4',
      blocks: [
        {
          kind: 'brief',
          label: 'WHY',
          title: 'I wanted to know what “interactive” actually costs to build.',
          body: 'Spline lets you put real physics into a browser scene without writing code. This is a campsite — tent, deck chairs, a picnic table, a bridge over a stream, a buggy you can drive — assembled to find out where the tool stops being easy.',
        },
        {
          kind: 'image',
          ...img('spline-forest'),
          alt: 'Top-down low-poly 3D campsite: yellow tent, pine trees on green islands, a stream with a wooden bridge, a small buggy on the sand',
          caption: 'The scene, captured from the live link. Everything on the sand is a rigid body.',
          frame: 'plain',
          span: 'full',
        },
        {
          kind: 'idea',
          body: 'Restraint is what makes low-poly read as charming rather than cheap: one sand colour, one green, one wood, and nothing else.',
        },
        {
          kind: 'link',
          href: 'https://my.spline.design/forestphysicscopy-Yxj2Fsft4q4KJqQo6B37vY1E/',
          label: 'OPEN THE SCENE — IT RUNS IN YOUR BROWSER',
          note: 'Loads the full 3D scene; give it a few seconds',
        },
        {
          kind: 'learning',
          body: 'Physics is fun for exactly as long as the frame rate holds. Half the work was deleting objects I liked so the ones that mattered could move.',
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- 04 -- */
  {
    id: 'stickers',
    index: '04',
    title: '3D STICKERS',
    client: 'Concept',
    category: 'Interactive web · Framer',
    year: '2025',
    kind: 'Concept',
    link: 'https://3dstickersntt.framer.website/',
    description:
      'Stick stickers to your phone. A small interactive page where the stickers are the interface — grab one, drop it on the case.',
    color: '#ffffff',
    accent: '#e4462f',
    type: 'screen',
    span: 'tall',
    rotate: -1.6,
    cover: img('stickers-framer'),
    caseStudy: {
      tint: '#f3efe4',
      blocks: [
        {
          kind: 'brief',
          label: 'THE IDEA',
          title: 'A product page where you do the thing the product is for.',
          body: 'Instead of describing 3D stickers, the page hands you a phone and a pile of them. Lemon, a Lego head, a mixtape, a playing card, a couple of Devanagari word-stickers — pick them up and stick them on. Built in Framer as a study in making a web page feel like an object.',
        },
        {
          kind: 'image',
          ...img('stickers-framer'),
          alt: 'A silver iPhone in a clear case centred on white, with six 3D stickers floating either side of it: a lemon, two Devanagari word stickers, a Lego Spider-Man head, a mixtape CD and a playing card',
          caption: 'Captured from the live page. Every sticker is draggable.',
          frame: 'plain',
          span: 'full',
        },
        {
          kind: 'link',
          href: 'https://3dstickersntt.framer.website/',
          label: 'TRY IT — STICK SOMETHING ON',
          note: '3dstickersntt.framer.website — opens in a new tab',
        },
        {
          kind: 'learning',
          body: 'The page has almost no copy and it does not need any. If the interaction explains the product, the headline is decoration.',
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- 05 -- */
  {
    id: 'rotating',
    index: '05',
    title: 'ROTATING OBJECT',
    client: 'Experiment',
    category: '3D study · Spline',
    year: '2025',
    kind: 'Experiment',
    link: 'https://my.spline.design/hq3drotatingobjectcopy-VxAxCnKHdrpnrBaXhrERPpQs/',
    description:
      'Black discs, one light, and a slow turn. A material study — how reflective surfaces catch a single source as they rotate.',
    color: '#050505',
    accent: '#9fd6ff',
    type: 'frame',
    span: 'half',
    rotate: 2.1,
    cover: img('spline-rotating'),
    caseStudy: {
      tint: '#0c0c10',
      dark: true,
      blocks: [
        {
          kind: 'brief',
          label: 'WHY',
          title: 'Learning what a material looks like from every angle, not one.',
          body: 'A static render lets you cheat: you light for the one angle you show. A rotating object does not. This scene is a stack of glossy black discs turning under one light, made to see where the highlights land as the geometry passes through them.',
        },
        {
          kind: 'image',
          ...img('spline-rotating'),
          alt: 'Glossy black discs on a black background catching a single rim light as they rotate',
          caption: 'One frame of the turn. The scene itself never stops moving.',
          frame: 'plain',
          span: 'full',
        },
        {
          kind: 'link',
          href: 'https://my.spline.design/hq3drotatingobjectcopy-VxAxCnKHdrpnrBaXhrERPpQs/',
          label: 'WATCH IT TURN',
          note: 'Live Spline scene — opens in a new tab',
        },
        {
          kind: 'learning',
          body: 'Black-on-black only works if the edges are honest. Bevel too much and it turns to plastic; too little and it disappears. There is a two-millimetre window and I found it by missing on both sides.',
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- 06 -- */
  {
    id: 'sxnt',
    index: '06',
    title: 'SXNT SCROLL EFFECT',
    client: 'Experiment',
    category: 'Scroll interaction · Framer',
    year: '2026',
    kind: 'Experiment',
    link: 'https://sxntscrolleffect.framer.website/',
    description:
      'A wall of tilted film frames that moves as you scroll — five treatments of one figure, repeated until the grid becomes the image.',
    color: '#0a0a0a',
    accent: '#ff4a1f',
    type: 'frame',
    span: 'wide',
    rotate: 1.1,
    cover: img('sxnt-grid'),
    caseStudy: {
      tint: '#0b0b0d',
      dark: true,
      blocks: [
        {
          kind: 'brief',
          label: 'THE IDEA',
          title: 'What if the gallery was the motion, not the thing inside it.',
          body: 'Most scroll effects decorate a page. This one is the page: a grid of film frames, each slightly off-axis, that shifts as a body as you scroll. The frames hold five treatments of the same figure — Ripple Walk, Blur Signal, Drift Apart, Vapour Edge, Rage Motion — heat-mapped, smeared and solarised, and labelled the way contact sheets are.',
        },
        {
          kind: 'image',
          ...img('sxnt-grid'),
          alt: 'A dark grid of tilted film frames, each holding a distorted, heat-mapped photograph of a figure, labelled RIPPLE WALK, BLUR SIGNAL, DRIFT APART, VAPOUR EDGE and RAGE MOTION · 2026',
          caption: 'Captured from the live page. Every frame sits at its own small angle; scrolling moves the whole wall.',
          frame: 'plain',
          span: 'full',
        },
        {
          kind: 'idea',
          body: 'Five images. Repeated, tilted, and moving, they stop being five images and become one surface.',
          note: 'The labels and the 2026 stamp are the only type on the page. Everything else is the frames.',
        },
        {
          kind: 'gallery',
          layout: 'offset',
          items: [
            { ...img('sxnt-strip'), alt: 'One row of the film-frame grid', caption: 'One row, at rest' },
            { ...img('sxnt-frame'), alt: 'A single frame from the grid: RAGE MOTION, a figure dissolved into red and yellow thermal colour', caption: 'RAGE MOTION · 2026' },
          ],
        },
        {
          kind: 'specs',
          rows: [
            ['Built in', 'Framer'],
            ['Treatments', '5, on one source figure'],
            ['Type', 'Mono labels only'],
            ['Status', 'Live'],
          ],
        },
        {
          kind: 'link',
          href: 'https://sxntscrolleffect.framer.website/',
          label: 'SCROLL IT YOURSELF',
          note: 'sxntscrolleffect.framer.website — opens in a new tab',
        },
        {
          kind: 'learning',
          body: 'The effect only works because the frames are imperfect. Line them up straight and the motion reads as a spreadsheet sliding; tilt each one a few degrees and it reads as a wall of prints being pushed across a table.',
        },
      ],
    },
  },
]

/* Display order — rows tile the 12-column grid as 7+5 or 6+6. Reorder here. */
const ORDER = ['netizens', 'papercut', 'sxnt', 'stickers', 'forest', 'rotating']
export const projects = ORDER.map((id) => all.find((p) => p.id === id))
  .filter(Boolean)
  // the printed number follows the position on the desk, not the file
  .map((p, i) => ({ ...p, index: String(i + 1).padStart(2, '0') }))

/* Small helper so components never index into the array by number. */
export const getProjectById = (id) => projects.find((p) => p.id === id) || null
