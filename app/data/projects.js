export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ux-ui', label: 'UX/UI Design & Development' },
  { id: 'graphic', label: 'Graphic Designs' },
  { id: 'motion', label: 'Motion Graphic' },
];

/** Recent projects shown in carousel and on projects page (button = View Project or Coming Soon) */
export const RECENT_PROJECTS = [
  { id: 'rp-1', title: 'Tandem', tags: ['UX/UI Design', 'App Development'], image: '/Recent-project/recent project Tandem.jpg', category: 'ux-ui', description: 'An app for parents in the trades that helps balance work and childcare.', projectSlug: 'Tandem' },
  { id: 'rp-2', title: 'TeaTiny', tags: ['Product Design', 'Packaging'], image: '/Recent-project/Teatiny-can.jpg', category: 'graphic', description: 'Premium flower tea can series with playful character illustrations.', projectSlug: 'teatiny' },
  { id: 'rp-3', title: 'The Unseen Vietnam', tags: ['Product Design', 'Editorial'], image: '/Recent-project/vietnamese magazine mock up.jpg', category: 'graphic', description: 'A 12-day luxury tour magazine from Hanoi to the Mekong Delta.', projectSlug: 'the-unseen-vietnam' },
  { id: 'rp-4', title: 'Crimson & Gold', tags: ['Branding', 'Visual Design'], image: '/Recent-project/Crimpson&gold.jpg', category: 'graphic', description: "A visual celebration of Vietnam's royal attire from Huế.", projectSlug: 'crimson-gold' },
  { id: 'rp-5', title: 'Space Animal', tags: ['UI/UX', 'Visual Design'], image: '/Recent-project/Space-animal.jpg', category: 'ux-ui', description: 'User experience and visual design.', projectSlug: null },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'TeaTiny',
    tags: ['Product Design', 'Packaging'],
    image: '/Teatiny-can.jpg',
    category: 'graphic',
    description:
      'A playful beverage can design for TeaTiny, featuring cute character illustrations and distinct flavours including Sakura, Mallow, and Chamomile. The design focuses on shelf appeal and brand recognition for a young, lifestyle-oriented audience.',
    layout: 'hero',
    projectSlug: 'teatiny',
    role: 'Lead Designer (Art Direction, Layout, Visual System)',
    timeline: '3 week',
    industry: 'Adobe Photoshop - Adobe InDesign - Adobe Illustrator',
    tools: 'Sakura, Mallow, and Chamomile flavours (16 fl oz / 473ml cans)',
    subtitle: 'Premium Flower Tea Can Series',
    featureBannerImage: '/Teatiny-can.jpg',
    tabs: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'achievements', label: 'Key Achievements' },
    ],
    quote: 'Sweetness and purity in every sip',
    overviewTitle: 'Overview',
    overviewParagraphs: [
      'TeaTiny was born from a simple observation: fruit teas (like peach, strawberry, and lemon) are ubiquitous on beverage shelves, but floral teas are almost absent from can designs. Inspired by this market gap, I aimed to create a premium floral tea line with a completely different look and flavour. As someone easily drawn to cute, simple, and approachable designs on supermarket shelves, I built the entire brand world around sweetness and purity.',
      'From the name "TeaTiny" (Tiny = small, adorable), I wanted to do a brand identity that includes friendly, rounded typography and meticulously hand-drawn floral mascots for each flavor: Chamomile, Sakura, and Mallow. Every detail aims to transform the can into a gentle invitation, promising a moment of "tiny" peace amidst the hustle and bustle of life.',
    ],
    designRationaleTitle: 'Design Rationale & Key Decisions',
    designRationaleParagraph:
      'The design strategy focused on blending sophisticated botanical appeal with approachable charm to target health-conscious consumers who appreciate both quality and design.',
    introBrandBlock: {
      title: '1. Brand Identity with a "Tiny" Personality',
      text: 'The brand name "TeaTiny" set the creative direction. I developed custom typography that is soft, rounded, and friendly. This "cute vibe" makes the product feel welcoming and gentle, directly appealing to moments of self-care and relaxation, while maintaining a premium feel through careful letter-spacing and weight.',
      flavorLabel: 'Chamomile Flavour',
      logoPath: '/Teatiny/teatiny-title.svg',
    },
    introMascotsBlock: {
      title: '2. Illustrative Mascots as Flavour Heroes',
      text: 'Instead of generic photos, each flavour is represented by a unique hand-drawn floral mascot (Sakura, Mallow, Chamomile). This illustrative approach tells a story, gives the brand a cohesive and ownable visual language, and creates an emotional, almost collectible connection with the customer. The drawings are detailed enough to feel natural but stylized to fit the cute brand world.',
      images: ['/Teatiny/illustrative-mascot-sketch.png'],
    },
    introColourBlock: {
      title: '3. A Cohesive Colour-Coded System',
      text: 'Each flavour has a dedicated, soft colour theme derived from its flower (e.g., blush pink for Sakura, lavender for Mallow, sunny yellow for Chamomile). This creates an instant visual differentiation on the shelf while ensuring the entire series looks harmonious and intentionally designed as a family.',
      paletteImage: '/Teatiny/color-pallete.jpg',
    },
    introParagraph:
      'TeaTiny was born from a simple observation: fruit teas (like peach, strawberry, and lemon) are ubiquitous on beverage shelves, but floral teas are almost absent from can designs. Inspired by this market gap, I aimed to create a premium floral tea line with a completely different look and flavour. As someone easily drawn to cute, simple, and approachable designs on supermarket shelves, I built the entire brand world around sweetness and purity.',
    roleParagraph: '',
    roleParagraphBold: [],
    introductionPhoneImage: '',
    keyAchievements: {
      title: 'Design Rationale & Key Decisions',
      subtitle: 'Blending botanical appeal with approachable charm',
      intro:
        'The design strategy focused on blending sophisticated botanical appeal with approachable charm to target health-conscious consumers who appreciate both quality and design.',
      achievements: [
        {
          id: 'brand-identity',
          icon: 'document',
          title: '1. Brand Identity with a "Tiny" Personality',
          text: 'The brand name "TeaTiny" set the creative direction. I developed custom typography that is soft, rounded, and friendly. This "cute vibe" makes the product feel welcoming and gentle, directly appealing to moments of self-care and relaxation, while maintaining a premium feel through careful letter-spacing and weight.',
        },
        {
          id: 'mascots',
          icon: 'grid',
          title: '2. Illustrative Mascots as Flavour Heroes',
          text: 'Instead of generic photos, each flavour is represented by a unique hand-drawn floral mascot (Sakura, Mallow, Chamomile). This illustrative approach tells a story, gives the brand a cohesive and ownable visual language, and creates an emotional, almost collectible connection with the customer. The drawings are detailed enough to feel natural but stylized to fit the cute brand world.',
        },
        {
          id: 'colour-system',
          icon: 'thumbs-up',
          title: '3. A Cohesive Colour-Coded System',
          text: 'Each flavour has a dedicated, soft colour theme derived from its flower (e.g., blush pink for Sakura, lavender for Mallow, sunny yellow for Chamomile). This creates an instant visual differentiation on the shelf while ensuring the entire series looks harmonious and intentionally designed as a family.',
        },
      ],
      outcome: {
        title: 'The Outcome',
        text: 'The TeaTiny design successfully communicates premium quality and natural ingredients through a whimsical, illustrated lens. It transforms a simple tea can into a delightful object that appeals to both the eye and the desire for a pure, peaceful moment.',
      },
    },
    introFooterImages: [
      '/Teatiny/foreground-flowers.png',
      '/Teatiny/Chamomile mockup.jpg',
      '/Teatiny/Chamomile-design.jpg',
      '/Teatiny/Mallow mockup.jpg',
      '/Teatiny/Mallow-design.jpg',
      '/Teatiny/Sakura mockup.jpg',
      '/Teatiny/Sakura-design.jpg',
    ],
  },
  {
    id: 3,
    title: 'The Unseen Vietnam',
    tags: ['Product Design', 'Editorial'],
    image: '/Recent-project/vietnamese magazine mock up.jpg',
    category: 'graphic',
    description:
      'A high-concept tour magazine marketing a 12-day luxury itinerary from Hanoi to Ho Chi Minh City and the Mekong Delta—a grand narrative and practical day-by-day guide.',
    layout: 'hero',
    projectSlug: 'the-unseen-vietnam',
    role: 'Lead Designer (Art Direction, Editorial Layout, Typography)',
    timeline: '4 weeks',
    industry: 'Editorial · Travel',
    tools: 'Adobe InDesign · Adobe Photoshop · Adobe Illustrator',
    subtitle: 'Luxury Tour Magazine & Itinerary Guide',
    featureBannerImage: '/Recent-project/vietnamese magazine mock up.jpg',
    tabs: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'achievements', label: 'Key Achievements' },
    ],
    overviewTitle: 'Overview',
    overviewParagraphs: [
      '"The Unseen Vietnam" is a high-concept tour magazine I designed to market and detail an unprecedented luxury itinerary: a complete 12 days guided journey from Hanoi to Ho Chi Minh City and the Mekong Delta.',
      'The challenge was not just to list destinations, but to design a reading experience that could organize two years of discovery into something beautiful, clear, and inspiring. This project was my effort to create a worthy companion for an epic adventure and a book that feels both like a grand narrative and a practical, day-by-day guide.',
    ],
    designRationaleBlock: {
      title: 'Design Rationale',
      intro:
        'This magazine is for a special 12-day tour of Vietnam. The design had to do two main things: make the tour look amazing, and make the plan easy to understand.',
      forTheTraveler:
        'I made this for people who want to see more than just the main tourist spots. They want a real, local feel of Vietnam, from Hanoi to the Mekong Delta.',
      keyDesignChoices: [
        {
          title: 'Clear "Day" Layout',
          text: 'The biggest design choice was putting "DAY 1", "DAY 2", etc., in big, clear text on every page. This makes the 12-day plan super easy to follow. Readers always know exactly where they are in the journey.',
        },
        {
          title: 'Clean & Spacious Look',
          text: 'I used a simple layout with lots of space. This makes the magazine feel calm, premium, and easy to read, so the beautiful photos and stories are the main focus.',
        },
        {
          title: 'Trust Through Design',
          text: 'By showing the whole plan in a clean, organized way, the design helps people trust the tour. It shows that every day is well-planned and that they will be in good hands.',
        },
      ],
    },
    introParagraph:
      '"The Unseen Vietnam" is a high-concept tour magazine I designed to market and detail an unprecedented luxury itinerary: a complete 12 days guided journey from Hanoi to Ho Chi Minh City and the Mekong Delta. The challenge was not just to list destinations, but to design a reading experience that could organize two years of discovery into something beautiful, clear, and inspiring. This project was my effort to create a worthy companion for an epic adventure and a book that feels both like a grand narrative and a practical, day-by-day guide.',
    roleParagraph: '',
    roleParagraphBold: [],
    introductionPhoneImage: '',
    magazinePdfUrl: '/the-unseen-vietnam/magazine.pdf',
    magazineMockupImage: '/the-unseen-vietnam/Mockup.jpg',
    keyAchievements: {
      title: 'Design Rationale & Key Decisions',
      subtitle: 'A grand narrative and a practical day-by-day guide',
      intro:
        'The challenge was not just to list destinations, but to design a reading experience that could organize two years of discovery into something beautiful, clear, and inspiring. Strong typographic choices, a carefully curated colour palette, and a clear grid system ensure the magazine feels both like a grand narrative and a practical companion.',
      achievements: [
        {
          id: 'typography',
          icon: 'document',
          title: '1. Strong Typographic Hierarchy',
          text: 'I established a clear hierarchy using contrasting typefaces for headlines, subheads, and body text. This allows readers to scan content quickly while creating visual rhythm across spreads. The typography draws inspiration from both contemporary editorial design and traditional Vietnamese visual language.',
        },
        {
          id: 'photography',
          icon: 'grid',
          title: '2. Photography-Driven Layouts',
          text: 'Each spread is built around strong imagery that tells a story. I used full-bleed photos, strategic cropping, and careful placement to create visual anchors and guide the reader’s eye. The photography captures authentic moments—street scenes, local life, landscapes—that feel both intimate and expansive.',
        },
        {
          id: 'colour-palette',
          icon: 'thumbs-up',
          title: '3. Curated Colour Palette',
          text: 'The colour system draws from Vietnam’s visual identity: warm terracottas, deep greens, and neutral tones. These colours are used consistently across the magazine to create a cohesive, premium feel while evoking the warmth and richness of the destination.',
        },
      ],
    },
  },
  {
    id: 5,
    title: 'Crimson & Gold',
    tags: ['Branding', 'Graphic Design', 'Poster Series'],
    image: '/Recent-project/Crimpson&gold.jpg',
    category: 'graphic',
    description:
      "A personal project celebrating the beauty of Vietnam's royal attire from Huế. Each poster highlights a different historical costume, set against the Imperial City's iconic backdrop.",
    layout: 'hero',
    projectSlug: 'crimson-gold',
    role: 'Designer (Art Direction, Typography, Visual Design)',
    timeline: '3 weeks',
    industry: 'Cultural · Poster Series',
    tools: 'Adobe InDesign · Adobe Photoshop · Adobe Illustrator',
    subtitle: "Poster Series Celebrating Vietnam's Royal Attire",
    featureBannerImage: '/Recent-project/Crimpson&gold.jpg',
    tabs: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'achievements', label: 'Key Achievements' },
    ],
    overviewTitle: 'Overview',
    overviewParagraphs: [
      "“Crimson & Gold” is a personal passion project: a series of documentary posters I created to showcase the elegance and diversity of Vietnam’s royal attire from Huế. More than just promoting a film, these posters are a visual love letter to my heritage. The goal was to show the world that Vietnamese attire is not just the modern áo dài, but includes many other beautiful, elegant, and historically rich styles from the old royal courts of Huế. Each poster highlights a different color theme and a unique costume detail, set against the iconic backdrop of the Imperial City and other historic sites. I designed the typography to feel like it came from old history books and classic Vietnamese publications, creating a look that feels both timeless and distinctly Vietnamese. Through this work, I wanted to share my deep pride in our country’s history, beauty, and cultural identity with a global audience.",
    ],
    introSketchesBlock: {
      title: 'First Sketches',
      intro: 'Early poster concepts exploring composition and the "Crimson & Gold" wordmark. These sketches led to the final documentary poster series.',
      images: ['/crimson-gold/sketch%201.png', '/crimson-gold/sketch%202.png', '/crimson-gold/sketch%203.png'],
    },
    posterMockupSection: {
      title: 'Poster Mockup',
      images: ['/crimson-gold/red mock up.jpg', '/crimson-gold/purple mock up.jpg', '/crimson-gold/yellow mock up.jpg'],
      viewDesignsImages: ['/crimson-gold/documentary movie a.jpg', '/crimson-gold/documentary movie b.jpg', '/crimson-gold/documentary movie c.jpg'],
    },
    introParagraph:
      "A personal project celebrating the beauty of Vietnam's royal attire from Huế. Each poster highlights a different historical costume, set against the Imperial City's iconic backdrop. I wanted to show that Vietnamese fashion is more than just the modern áo dài — it's rich, diverse, and deeply elegant. The typography draws inspiration from old Vietnamese books, giving it a timeless feel. This series is my visual love letter to our culture and history.",
    roleParagraph: '',
    roleParagraphBold: [],
    introductionPhoneImage: '',
    keyAchievements: {
      title: 'Design Rationale & Key Decisions',
      subtitle: 'A visual love letter to culture and history',
      intro:
        "This poster series aims to celebrate the richness and diversity of Vietnamese royal fashion, moving beyond the familiar áo dài to showcase historical costumes in an elegant, timeless way.",
      achievements: [
        {
          id: 'historical-costumes',
          icon: 'document',
          title: '1. Celebrating Royal Attire',
          text: "Each poster highlights a different historical costume from Huế, set against the Imperial City's iconic backdrop. The design showcases that Vietnamese fashion is rich, diverse, and deeply elegant.",
        },
        {
          id: 'typography',
          icon: 'grid',
          title: '2. Timeless Typography',
          text: "The typography draws inspiration from old Vietnamese books, giving the series a timeless feel that honours tradition while feeling contemporary.",
        },
        {
          id: 'cultural-story',
          icon: 'thumbs-up',
          title: '3. A Visual Love Letter',
          text: "This series is a personal visual love letter to Vietnamese culture and history — celebrating what often goes unseen in mainstream representations of our heritage.",
        },
      ],
    },
  },
  // {
  //   id: 2,
  //   title: 'ButterDeedoChee',
  //   tags: ['Product Design', 'Branding'],
  //   image: '/Tandem/recent project Tandem.jpg',
  //   category: 'graphic',
  //   description:
  //     'A whimsical book project with a glowing, butterfly-inspired creature on the cover. The design captures a magical, small-world narrative with a distinctive visual identity.',
  // },
  {
    id: 4,
    title: 'Tandem',
    projectSlug: 'Tandem',
    tags: ['UX/UI Design', 'App Development'],
    image: '/Tandem/recent project Tandem.jpg',
    category: 'ux-ui',
    description:
      'An app for parents in the trades that helps balance work and childcare.',
    layout: 'hero',
    role: 'Lead UX/UI Designer - Social Media Marketing',
    team: 'Team of 5 designers & 3 developers',
    timeline: 'Sept 5th - Dec 5th, 2025',
    industry: 'Tradeworkers Industry Support',
    tools: 'Figma - Figjam - Trello - VScode',
    prototypeUrl: '#',
    featureBannerImage: '/Tandem/Tandem banner.png',
    tabs: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'progress', label: 'Progress' },
      { id: 'achievements', label: 'Key Achievements' },
    ],
    quote: 'Bridging the gap between work and childcare',
    subtitle: 'An app for parents in the trades that helps balance work and childcare.',
    overviewSubtitle: 'UX/UI Design for Parental Support in the Trades',
    introParagraph:
      'As the Lead and UX/UI Designer for Tandem, I led the design of an innovative application tailored for skilled tradeworkers who are parents. Tandem intelligently leverages AI to help users seamlessly balance demanding work schedules with family responsibilities. The platform delivers trusted, personalized recommendations and access to reliable childcare solutions, empowering parents to secure care with ease, thereby reducing stress and fostering a healthier work-life experience.',
    roleParagraph:
      'In this role, I was responsible for the complete design lifecycle, including: conducting user research and usability testing; developing wireframes and interactive prototypes; designing the application interface and brand identity, including promotional stickers; managing social media marketing initiatives; and contributing to front-end development to ensure design fidelity.',
    roleParagraphBold: ['Lead and UX/UI Designer', 'front-end development'],
    roleBullets: [
      { title: 'Full Design Lifecycle', text: 'User research, wireframing, prototyping, UI design' },
      { title: 'Brand Identity', text: 'App interface, promotional stickers, social media marketing' },
      { title: 'Development', text: 'Front-end collaboration' },
    ],
    introductionPhoneImage: '/Tandem/home-screen-schedule.png',
    coreValues: {
      title: 'Core Values',
      subtitle: 'To design a truly supportive tool, we first had to define what we stood for',
      values: [
        {
          id: 'trust',
          icon: 'shield',
          title: 'Trust',
          text: "We are committed to the highest standards of safety and data security, giving parents the confidence that their family’s well-being and personal information are protected.",
          accent: 'blue',
        },
        {
          id: 'balance',
          icon: 'balance',
          title: 'Balance',
          text: 'Our mission is to harmonize the demands of work and parenthood, creating seamless schedules that support a happier, more balanced life.',
          accent: 'blue',
        },
        {
          id: 'support',
          icon: 'handshake',
          title: 'Support',
          text: 'We provide reliable support for the unpredictable nature of work, transforming the traditionally stressful childcare experience into one of confidence and ease.',
          accent: 'green',
        },
      ],
    },
    keyFeatures: {
      intro:
        'Guided by user research, I translated core user needs into three defining features that address the unique challenges faced by parents in the trades.',
      features: [
        {
          number: '01',
          title: 'AI Powered Scheduling',
          subtitle: 'Designing for clarity',
          description:
            'This feature required a system to simplify chaotic schedules blending work and childcare. I solved this by creating a color-coded tagging system to allow instant recognition: green for work/finance and trustworthy blue for nanny care. The current day is always visually highlighted as the primary anchor on the homepage. I structured the layout into clear zones for the calendar, agenda, and AI status, transforming a complex data mix into an intuitive, scannable interface that reduces cognitive load for busy parents.',
          layout: 'textLeft',
          images: ['/Tandem/ai-scheduling.png'],
        },
        {
          number: '02',
          title: 'Seamless Nanny Booking',
          subtitle: 'Designing for Trust',
          description:
            'I worked on making this nanny booking flow cleaner and easier to scan. Parents have a lot going on, so I wanted them to get through it quickly. I organized the steps in a simple top-to-bottom flow. I kept everything in one clean column so users don\'t have to jump around the screen. They just select dates, add details, then confirm—one step after the next. The goal was to make booking feel like a quick checklist, not a complicated form.',
          layout: 'phoneLeft',
          image: '/Tandem/nanny-booking.png',
        },
        {
          number: '03',
          title: 'Secure Nanny Sharing',
          subtitle: 'Designing for clarity',
          description:
            '<ul><li><strong>My Requests page:</strong> I designed a tag and added a green dot on the top right of it. This simple visual circle lets parents know right away that someone has already asked to join their share. No need to open each one to check, just a quick glance can tell them there\'s activity.</li><li><strong>Available page:</strong> I kept everything clean and scannable. Each share slot shows the key info at once: date, time, nanny name, and how many spots are open. Same layout for every card so users know where to look. The "Request to join" button is easy to find when they\'re ready.</li></ul>',
          layout: 'textLeft',
          images: ['/Tandem/Nanny-sharing.png'],
        },
      ],
    },
    finalProduct: {
      title: 'Final Product',
      screens: [
        { id: 'welcome', label: 'Welcome to Tandem', image: '/Tandem/Final Product/WelcomeToTandem.png' },
        { id: 'workplace', label: 'Add Workplace Details', image: '/Tandem/Final Product/add-workplace-details.png' },
        { id: 'schedule-weekly', label: 'Schedule · Weekly', image: '/Tandem/Final Product/schedule-weekly.png' },
        { id: 'schedule-monthly', label: 'Schedule · Monthly', image: '/Tandem/Final Product/schedule-monthly.png' },
        { id: 'nanny-schedule', label: 'Plan Nanny Schedule', image: '/Tandem/Final Product/plan-nanny-schedule.png' },
        { id: 'upload-file', label: 'Upload Schedule · File', image: '/Tandem/Final Product/upload-schedule.png' },
        { id: 'upload-voice', label: 'Upload Schedule · Voice', image: '/Tandem/Final Product/upload-schedule-voice.png' },
        { id: 'nanny-sharing', label: 'Nanny Sharing Requests', image: '/Tandem/Final Product/nanny-sharing-requests.png' },
      ],
    },
    appInteraction: {
      title: 'App Interaction',
      subtitle: 'See how it works in action!',
      figmaEmbedUrl: 'https://embed.figma.com/proto/bWGbW5Heq2LaMCX1FVoUz5/Tandem-High-fi?node-id=7635-15682&p=f&scaling=contain&content-scaling=fixed&page-id=7635%3A13393&starting-point-node-id=7635%3A15728&embed-host=share',
    },
    keyAchievements: {
      title: 'What I learned from this project?',
      subtitle: 'My Journey as a Lead Designer',
      intro:
        'Leading a project from concept to launch taught me that great design is about everything, not just the app. For me, Tandem was a journey from being a designer of interfaces to a designer of experiences. This project helped my skills grow in several key areas:',
      achievements: [
        {
          id: 'strategic-brand',
          icon: 'document',
          title: 'Building a Complete Strategic Brand:',
          text: 'I learned how every part of the app from app UX/UI, frontend development, blog, social media posts, brochure, business card, commercial video, and even stickers that they need to work together in order to tell one clear and compelling brand story.',
        },
        {
          id: 'power-of-process',
          icon: 'refresh',
          title: 'The Power of Process:',
          text: 'Iterating through six versions of our user flow proved that the best solutions aren\'t the first ideas, but it\'s the one you keep improving through feedback and testing.',
        },
        {
          id: 'best-for-app',
          icon: 'thumbs-up',
          title: '"We want the best for the app":',
          text: 'Partnering with another designers on the new app look and collaborating with full-stack developers on building coded app taught me a bigger lesson: effective collaboration isn\'t about always agreeing, but about aligning on a shared purpose. Our discussions were passionate, with everyone advocating strongly for their own ideas. However, I realized that beneath those differing opinions, we all shared the same fundamental goal: to create the best possible app for our users. This understanding changed how we worked. We committed to sharing ideas more openly, practicing active listening, and being willing to accept perspectives different from our own, rather than sticking rigidly to our initial concepts. This process, while sometimes challenging, ultimately led us to stronger, more well-rounded solutions that no single person could have devised alone.',
        },
        {
          id: 'empathy-as-tool',
          icon: 'grid',
          title: 'Empathy as a Tool:',
          text: 'Our survey-driven personas stopped us from designing for a vague "user" and instead let us solve problems for real people like tradeworkers who are struggle parents. This empathy became our most effective guide for every decision.',
        },
      ],
    },
    progressOverview: {
      title: 'Tandem Progress Overview',
      subtitle:
        "A look back at the project's journey, highlighting key milestones and how the finished app came together.",
      categories: [
        { id: 'all', label: 'All' },
        { id: 'background', label: 'Background Research' },
        { id: 'ideation', label: 'App ideation & Workflow' },
        { id: 'design', label: 'Design Progress' },
        { id: 'printed', label: 'Printed Media Materials' },
        { id: 'marketing', label: 'Marketing & Business Strategy' },
      ],
      background: {
        heading: 'Background Research',
        coreProblem: {
          title: 'Uncovering the Core Problem',
          stat: '63%',
          statLabel: 'of tradeswomen are parents',
          tagline: "A systemic gap that forces parents to choose between livelihood and family. Tandem was conceived to bridge it.",
          bullets: [
            'The journey began with an outstanding statistic: 63% of tradeswomen are parents, and all face a critical childcare struggle. The unpredictable, demanding schedules of trade work clash directly with the rigid availability of traditional childcare, creating a daily crisis of logistics and stress for an entire community.',
            "This isn't just a scheduling problem! It's a systemic gap that forces parents to choose between their livelihood and their family. Tandem was conceived to bridge this very gap.",
          ],
          boldPhrases: ['The journey began with an outstanding statistic:', "This isn't just a scheduling problem!"],
        },
        targetMarket: {
          title: 'Identify Target Market',
          intro: 'The data defined a distinct and underserved demographic: parents working in the skilled trades. This segment faces unique scheduling constraints that standard childcare solutions fail to address, presenting a clear opportunity for a tailored product.',
          cards: [
            { label: 'Who', text: 'Parents in skilled trades (construction, electrical, plumbing).' },
            { label: 'Core Need', text: 'Childcare that adapts to unpredictable, non-standard work hours.' },
            { label: 'Key Value', text: 'Trust, flexibility, and community-backed reliability.' },
          ],
          bullets: [
            'Who: Parents employed in the skilled trades (e.g., construction, electrical, plumbing).',
            'Core Need: Childcare that adapts to unpredictable, non-standard work hours.',
            'Key Value: A solution built for trust, flexibility, and community-backed reliability.',
          ],
          boldPhrases: ['Who:', 'Core Need:', 'Key Value:'],
        },
        userPersonas: {
          title: 'User Personas',
          intro: 'Our personas came directly from a survey of trade parents. They reflected real schedules and anxieties, giving us a clear, user-focused path for the entire design process.',
          personas: [
            { image: '/Tandem/Progress/persona1.jpg' },
            { image: '/Tandem/Progress/persona2.jpg' },
          ],
        },
      },
      ideation: {
        heading: 'App Ideation & Workflow',
        ourIdeation: {
          title: 'Our Ideation',
          paragraph:
            'Our ideation was driven by a single goal: to create an app that meaningfully supports trade families by solving the core challenges they face. We focused on three core ideas derived from research:',
          cards: [
            { label: 'Scheduling as a Foundation', text: 'Building the app around the employee\'s dynamic schedule, not fixed childcare slots.' },
            { label: 'Community as a Lever', text: 'Enabling a parent network for sharing resources, costs, and trust.' },
            { label: 'Simplicity as a Principle', text: 'Making every interaction from AI suggestions to booking feel easy and consistent.' },
          ],
          bullets: [
            'Scheduling as a Foundation: Building the app around the employee\'s dynamic schedule, not fixed childcare slots.',
            'Community as a Lever: Enabling a parent network for sharing resources, costs, and trust.',
            'Simplicity as a Principle: Making every interaction from AI suggestions to booking feel easy and consistent.',
          ],
          boldPhrases: ['Scheduling as a Foundation:', 'Community as a Lever:', 'Simplicity as a Principle:'],
        },
        appWorkflow: {
          title: 'App Workflow',
          versionCount: 7,
          tagline: 'We iterated through 7 versions—adding, removing, and rearranging screens until the journey from schedule to booking felt simple and buildable.',
          paragraph:
            "The final design wasn't our first try as it was our seventh. Through team discussions, design reviews, and technical checks, we worked through 7 different versions. Each time, we added, removed, and rearranged screens to make the app easier to use. We focused on the most important features and made sure the journey from adding your schedule to booking care felt simple and made sense. This careful process made sure our final design was both user-friendly and practical to build.",
          figmaEmbedUrl: 'https://embed.figma.com/board/iI7KfeCQSYxIn95M5v4qM4/Tandem-Workflow?node-id=0-1&embed-host=share',
          workflowViewUrl: 'https://www.figma.com/board/iI7KfeCQSYxIn95M5v4qM4/Tandem-Workflow',
        },
        workflowLabels: [
          'Version 2 User workflow',
          'Refining User workflow',
          'Version 3 refining User workflow',
          'HELP ME version Refining User workflow',
          'Version 4 User workflow',
          'Version 5 Main Flow',
          'Reference',
          'User Chaining Activities',
        ],
      },
      design: {
        heading: 'Design Progress',
        viewWorkflowUrl: '',
        colors: {
          title: 'Colors',
          intro: 'Our color palette was designed to reflect our core values of Trust, Balance, and Support.',
          items: [
            { name: 'Blue', hex: '#3373cc', line: 'Our main color. Calm, safety, and reliability, helping users feel secure as they manage their family\'s schedule.' },
            { name: 'Green', hex: '#92f189', line: 'Balance and growth. We use it for work-related features and action buttons, giving a sense of control and progress.' },
            { name: 'Light blue & gradient', hex: '#68d5ff', line: 'Light blue and the gentle gradient between blue and green blend care and work into one visual theme. Efficient and warm.' },
          ],
          closing: 'Together, these colors make the app feel like a supportive and trustworthy partner.',
          swatches: [
            { hex: '#3373cc', name: 'Bright Blue' },
            { hex: '#255495', name: 'Dark Blue' },
            { hex: '#92f189', name: 'Light Green' },
            { hex: '#6bb064', name: 'Medium Green' },
            { hex: '#68d5ff', name: 'Light Sky Blue' },
            { hex: '#4c9bba', name: 'Teal/Cyan' },
          ],
        },
        typography: {
          title: 'Typography',
          paragraph:
            'We chose Alan Sans (headings) and Omnes (body), they work together to make the app easy to read and navigate. The clear headings help users scan quickly, while the friendly body text makes reading details comfortable and approachable.',
          image: '/Tandem/Progress/typo.png',
        },
        appDesign: {
          title: 'App Design (Lofi - Hifi)',
          paragraphs: [
            'Our design process evolved from initial ideas to the finished interface. I started with rough interface sketches, focusing on user flow, layout logic, and core functionality.',
            'For the high-fidelity phase, I led the redesign in collaboration with one other designer. We rebuilt the visual interface from scratch to modern, clean, intuitive, and refined every element for a coherent, user-friendly experience. The result was both visually appealing and highly functional.',
          ],
          lofiEmbedUrl: 'https://embed.figma.com/design/bWRgTxuwvtrP8XxNSehRkL/Tandem-Mid-fi--Copy-?node-id=2533-3139&embed-host=share',
          hifiEmbedUrl: 'https://embed.figma.com/design/bWGbW5Heq2LaMCX1FVoUz5/Tandem-High-fi?node-id=7635-13393&embed-host=share',
          lofiViewUrl: 'https://www.figma.com/design/bWRgTxuwvtrP8XxNSehRkL/Tandem-Mid-fi--Copy-',
          hifiViewUrl: 'https://www.figma.com/design/bWGbW5Heq2LaMCX1FVoUz5/Tandem-High-fi',
        },
      },
      printed: {
        heading: 'Printed Media Materials',
        logo: {
          title: 'Logo',
          paragraph:
            "Our logo features a simple hammer. Its handle is designed to connect, symbolizing balance and partnership. We used Tandem's brand colors, blue and green, to create a clear link to trade workers and build a trustworthy brand.",
          image: '/Tandem/Progress/Logo.png',
        },
        stickers: {
          title: 'Stickers',
          paragraph:
            "I had the opportunity to explore the fun and visual side of branding by designing a sticker set for Tandem! It wasn't just about making things look cute (although they are cute!). I thought about where they would be placed: on toolboxes, work helmets, and lunch boxes. I chose durable, weather-resistant materials so they could withstand harsh working conditions. The designs combine our logo with friendly symbols related to balance and support, creating little snippets of brand joy. They're perfect for community events, app rewards, or simply as gifts, turning our users into brand ambassadors.",
        },
        businessCard: {
          title: 'Business Card',
          paragraph: 'Our project included custom business cards for team member introductions and networking.',
        },
        stickersShowcaseImage: '/Tandem/Progress/stickers.jpg',
        brochure: {
          title: 'Brochure',
          paragraph: "This brochure is designed to explain the app's stories, benefits and features to our potential users and partners.",
          image: '/Tandem/Progress/brochure.jpg',
        },
      },
      marketing: {
        heading: 'Marketing & Business Strategy',
        promotionVideo: {
          title: 'Promotion Video',
          paragraph:
            'To reach more people, I also contributed on a promotion video for Tandem. We filmed and edited the shoots using Premiere Pro, crafting a video that captures the real-life challenges and relief Tandem brings to parents in the trades.',
          videoUrl: '/Tandem/Progress/promotion-video.mp4',
        },
        tandemBlog: {
          title: 'Tandem Blog',
          paragraph:
            "To connect with parents, I helped create the Tandem blog as a companion to the app. The blog shares stories, and updates about our features. We designed it to be a supportive space that reflects our brand, with a clean layout that's easy to read and explore.",
          blogUrl: 'https://tandem-blog.vercel.app/',
          image: '/Tandem/Progress/tandem-blog.png',
        },
        socialMedia: {
          title: 'Social Media',
          paragraph:
            "I also designed posts and managed Tandem's social media strategy. This included designing all visual posts and managing daily content on Facebook and Instagram to foster community, share user stories, and communicate brand values of support and trust to our target audience.",
          image: '/Tandem/Progress/social-media.png',
          facebookUrl: 'https://www.facebook.com/profile.php?id=61583428771048',
          instagramUrl: 'https://www.instagram.com/the.tandem.app?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        },
      },
    },
  },
  // {
  //   id: 5,
  //   title: 'Tandem - Parent App',
  //   tags: ['App Design', 'Development'],
  //   image: '/Tandem/Tandem Banner.png',
  //   category: 'ux-ui',
  //   description:
  //     'A companion app experience for Tandem, featuring calendar views, event management, and seamless coordination for busy parents managing work and kids.',
  // },
];

export function getProjectById(idOrSlug) {
  const numId = Number(idOrSlug);
  if (!Number.isNaN(numId)) {
    const byId = PROJECTS.find((p) => p.id === numId);
    if (byId) return byId;
  }
  return PROJECTS.find((p) => p.projectSlug && p.projectSlug === idOrSlug) ?? null;
}

export function getCategoryLabel(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId;
}

/** Get other projects to suggest (same category first, then rest), excluding current. */
export function getSuggestedProjects(currentProject, limit = 3) {
  const rest = PROJECTS.filter((p) => p.id !== currentProject.id);
  const sameCategory = rest.filter((p) => p.category === currentProject.category);
  const otherCategory = rest.filter((p) => p.category !== currentProject.category);
  const combined = [...sameCategory, ...otherCategory];
  return combined.slice(0, limit);
}
