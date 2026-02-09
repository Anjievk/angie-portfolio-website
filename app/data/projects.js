export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ux-ui', label: 'UX/UI Design & Development' },
  { id: 'graphic', label: 'Graphic Designs' },
  { id: 'motion', label: 'Motion Graphic' },
];

export const PROJECTS = [
  // {
  //   id: 1,
  //   title: 'TeaTiny - Can Design',
  //   tags: ['Product Design', 'Packaging'],
  //   image: '/Teatiny-can.jpg',
  //   category: 'graphic',
  //   description:
  //     'A playful beverage can design for TeaTiny, featuring cute character illustrations and distinct flavours including Sakura, Mallow, and Chamomile. The design focuses on shelf appeal and brand recognition for a young, lifestyle-oriented audience.',
  // },
  // {
  //   id: 2,
  //   title: 'ButterDeedoChee',
  //   tags: ['Product Design', 'Branding'],
  //   image: '/Tandem/recent project Tandem.jpg',
  //   category: 'graphic',
  //   description:
  //     'A whimsical book project with a glowing, butterfly-inspired creature on the cover. The design captures a magical, small-world narrative with a distinctive visual identity.',
  // },
  // {
  //   id: 3,
  //   title: 'The Unseen Vietnam',
  //   tags: ['Product Design', 'Editorial'],
  //   image: '/vietnamese%20magazine%20mock%20up.jpg',
  //   category: 'graphic',
  //   description:
  //     'An editorial magazine and brochure exploring Vietnam in a unique way. The design combines strong typography, photography, and layout to guide readers through day-by-day journeys and table of content experiences.',
  // },
  {
    id: 4,
    title: 'Tandem',
    tags: ['UX/UI Design', 'App Development'],
    image: '/Tandem/recent project Tandem.jpg',
    category: 'ux-ui',
    description:
      'An app for parents in the trades that helps balance work and childcare.',
    layout: 'hero',
    role: 'Lead UX/UI Designer - Social Media Marketing',
    team: 'Team of 5 designers & 5 developers',
    timeline: 'Sept 5th - Dec 5th, 2025',
    industry: 'Tradeworkers Industry Support',
    tools: 'Figma - Figjam - Trello - VScode',
    prototypeUrl: '#',
    featureBannerImage: '/Tandem/Tandem Banner.png',
    tabs: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'progress', label: 'Progress' },
      { id: 'achievements', label: 'Key Achievements' },
    ],
    quote: 'Bridging the gap between work and schedule',
    subtitle: 'UX/UI Design for Parental Support in the Trades',
    introParagraph:
      'As Lead and UX/UI Designer for Tandem, I helped shape an innovative application tailored for skilled tradeworkers who are parents. Tandem uses AI to help users balance work schedules and family responsibilities, offering personalized recommendations and access to reliable childcare solutions.',
    roleParagraph:
      'As Lead and UX/UI Designer, my responsibilities included conducting user research and usability testing; developing wireframes and interactive prototypes; designing the application interface and brand identity, including promotional stickers; managing social media marketing initiatives; and contributing to front-end development to ensure design fidelity.',
    roleParagraphBold: ['Lead and UX/UI Designer', 'front-end development'],
    introductionPhoneImage: '/Tandem/Home screen schedule.png',
    coreValues: {
      title: 'Core Values',
      subtitle: 'To design a truly supportive tool, we first had to define what we stood for',
      values: [
        {
          id: 'trust',
          icon: 'shield',
          title: 'Trust',
          text: "We are committed to the highest standards of safety and data security, giving parents the confidence that their family's well-being and personal information are protected.",
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
          images: ['/Tandem/AI Scheduling.png'],
        },
        {
          number: '02',
          title: 'Seamless Nanny Booking',
          subtitle: 'Designing for Trust',
          description:
            'This feature was designed to transform the proactive planning of nanny care into a visually clear and controlled process. The layout centers on an interactive weekly calendar, providing an immediate overview. Dedicated input zones for child details and special notes are cleanly separated from the calendar, preventing clutter. The overall visual flow intuitively guides the parent from selecting dates → specifying needs → confirming the booking, making future planning feel manageable rather than overwhelming.',
          layout: 'phoneLeft',
          image: '/Tandem/nanny booking.png',
        },
        {
          number: '03',
          title: 'Secure Nanny Sharing',
          subtitle: 'Designing for clarity',
          description:
            'This interface was designed to function as a clean, trustworthy board for discovering and joining shared nanny arrangements. I gave each shared time slot a consistent card-based layout, making it easy to scan and compare key details like cost, age group, and available spots. To build visual trust and community, each card features a clear profile section for the host parent. Important actions, such as "Request to join," are highlighted with our brand\'s action color, creating a clear path from discovery to participation. The structured layout and repeated visual patterns transform the concept of nanny sharing from a complex coordination task into a simple, browsable, and secure process.',
          layout: 'textLeft',
          images: ['/Tandem/Nanny sharing.png'],
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
      figmaEmbedUrl: 'https://embed.figma.com/proto/bWGbW5Heq2LaMCX1FVoUz5/Tandem-High-fi--Copy-?page-id=7635%3A13393&node-id=7635-15682&p=f&viewport=670%2C462%2C0.06&scaling=scale-down&content-scaling=fixed&starting-point-node-id=7635%3A15728&show-proto-sidebar=1&embed-host=share',
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
        { id: 'printed', label: 'Printed Material & Commercial Ads' },
      ],
      background: {
        heading: 'Background Research',
        coreProblem: {
          title: 'Uncovering the Core Problem',
          bullets: [
            'The journey began with an outstanding statistic: 63% of tradeswomen are parents, and all face a critical childcare struggle. The unpredictable, demanding schedules of trade work clash directly with the rigid availability of traditional childcare, creating a daily crisis of logistics and stress for an entire community.',
            "This isn't just a scheduling problem! It's a systemic gap that forces parents to choose between their livelihood and their family. Tandem was conceived to bridge this very gap.",
          ],
          boldPhrases: ['The journey began with an outstanding statistic:', "This isn't just a scheduling problem!"],
        },
        targetMarket: {
          title: 'Identify Target Market',
          bullets: [
            'Who: Parents employed in the skilled trades (e.g., construction, electrical, plumbing).',
            'Core Need: Childcare that adapts to unpredictable, non-standard work hours.',
            'Key Value: A solution built for trust, flexibility, and community-backed reliability.',
          ],
          boldPhrases: ['Who:', 'Core Need:', 'Key Value:'],
        },
        userPersonas: {
          title: 'User Personas',
          intro: 'These personas came from a survey of trade parents to guide the design process.',
          personas: [
            {
              id: 'alfreda',
              name: 'Alfreda Pennysworth',
              image: '',
              age: 44,
              occupation: 'Electrical Construction Worker',
              workHours: 'Often 7 AM - 3:30 PM',
              location: 'Coquitlam',
              maritalStatus: 'Married (Parent with partner), mother of two (son 2 years old, daughter 4 years old)',
              income: '$65,000 per year',
              bio: 'Alfreda is a trade worker in Electrical Construction at Coquitlam, BC, a BCIT Electrical Foundation program graduate seeking a stable, well-paying, hands-on career. She has two children (2 and 4 years old) and a busy family life with two incomes. Her husband, Mark, is a project coordinator for a civil engineering company with very early and late hours (7:30 AM - 8:00 PM) and low flexibility. Alfreda loves her job but faces unstable work schedules (often 7:00 AM starts at various locations) and fixed childcare hours (8:30 AM - 5:30 PM) that don\'t fit.',
              behaviours: 'Uses Excel/Google Sheets for her work schedule. Tracks daily work schedule with Apple Calendar. Reaches out to other parents for help with kids\' pick-up. Joins Facebook communities for nannies and event info. Work schedule is a mix of advance and last-minute scheduling. Struggles to balance childcare and work due to unstable shifts. Relies heavily on reviews and word of mouth for referrals.',
              needs: 'Clear schedule display, security/protection, community for parents, last-minute/quick childcare options, easy schedule upload.',
              mustHaves: 'One platform for managing schedule and childcare. Schedule sharing between parents. Extensive trustworthy safety features. Reliable info from trade parent communities. Easy schedule input to reduce workload.',
              neverDos: 'Utilize AI too much. Time-consuming childcare applications (multiple daycares). Untrustworthy communities. Expensive and overpriced services.',
              goals: 'Find easy-to-apply, quick-response childcare nearby. Discover communities that support struggling parents. Receive trustworthy childcare. Engage with supportive communities.',
              painPoints: 'Childcare system takes too long to register, often requiring months in advance at multiple locations. Relies on family for last-minute cancellations, causing stress. Can\'t find nearby or trusted childcare with proper certification. Nanny services are too expensive.',
              scenario: 'Alfreda has a new electrical construction project in Port Coquitlam with a start time moved to 6:30 AM for two weeks, but her daycare opens at 8:30 AM. She\'s searched, contacted relatives, and checked schedules with her husband via Google Sheets, but the situation is unresolved. She messaged other Facebook groups looking for a nanny or alternative solutions.',
            },
            {
              id: 'carlson',
              name: 'Carlson Jason',
              image: '',
              age: 54,
              occupation: 'Mechanic',
              workHours: 'Often 7 AM - 5 PM',
              location: 'Langley',
              maritalStatus: 'Parent with a partner - a father with 2 daughters',
              bio: 'Carlson is a skilled mechanic with 25 years of experience. Immigrated from Poland with his family 5 years ago for a secure future in BC, Canada. Passionate about his work and providing for his kids. Finds it difficult to find childcare support without local family. Gets stressed by the confusing and slow childcare sign-up process. Prefers clear, simple, fast solutions due to limited research time. His functional English sometimes struggles with professional vocabulary due to trade experience.',
              behaviours: 'Struggled to navigate and register children in complex childcare system after immigration. Uses internet to search for "childcare with space available now," frustrated by unclear websites. Joins Polish and trade communities for advice. Writes down names, phone numbers, and contact info from referrals.',
              goals: 'Find childcare quickly and efficiently. Easily track childcare options. Get childcare questions answered promptly. Ensure childcare has appropriate registration and certification.',
              painPoints: 'Childcare takes too long to sign up/register. Childcare is often full, making sign-up impossible. Lacks other resources or family support.',
            },
          ],
        },
      },
      ideation: {
        heading: 'App Ideation & Workflow',
        ourIdeation: {
          title: 'Our Ideation',
          paragraph:
            'Our ideation was driven by a single goal: to create an app that meaningfully supports trade families by solving the core challenges they face. We focused on three core ideas derived from research:',
          bullets: [
            'Scheduling as a Foundation: Building the app around the employee\'s dynamic schedule, not fixed childcare slots.',
            'Community as a Lever: Enabling a parent network for sharing resources, costs, and trust.',
            'Simplicity as a Principle: Making every interaction from AI suggestions to booking feel easy and consistent.',
          ],
        },
        appWorkflow: {
          title: 'App Workflow',
          paragraph:
            "The final design wasn't our first try as it was our seventh. Through team discussions, design reviews, and technical checks, we worked through 7 different versions. Each time, we added, removed, and rearranged screens to make the app easier to use. We focused on the most important features and made sure the journey from adding your schedule to booking care felt simple and made sense. This careful process made sure our final design was both user-friendly and practical to build.",
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
          paragraph:
            'Our color palette reflects Trust, Balance, and Support. Blue (#3373cc) is our main color, representing calm, safety, and reliability. Green (#92f189) stands for balance and growth—we use it for work-related features and action buttons. Light blue (#68d5ff) and the gentle gradient between blue and green blend care and work into one visual theme. Together, these colors make the app feel like a supportive and trustworthy partner.',
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
            'Alan Sans (headings) and Omnes (body) work together to make the app easy to read and navigate. The clear headings help users scan quickly, while the friendly body text makes reading details comfortable and approachable.',
          headingFont: 'Alan Sans (Heading)',
          bodyFont: 'Omnes (Body)',
          samples: ['Heading (H1) Black - 40px', 'Heading (H2) Extra Bold - 32px', 'Heading (H3) Bold: 24px', 'Heading (H4) Medium: 20px', 'Body Text Regular: 16px', 'Caption: 12px', 'Label: 10px'],
        },
        appDesign: {
          title: 'App Design (Lofi - Hifi)',
          paragraphs: [
            'We started with rough interface sketches, focusing on user flow, layout logic, and core functionality.',
            'In the high-fidelity phase, we rebuilt the visual interface in collaboration, prioritizing a modern, clean aesthetic and intuitive navigation, resulting in a visually appealing and highly functional product.',
          ],
          lofiUrl: '',
          hifiUrl: '',
        },
      },
      printed: {
        heading: 'Printed Material & Commercial Ads',
        logo: {
          title: 'Logo',
          paragraph:
            "Our logo features a simple hammer. Its handle is designed to connect, symbolizing balance and partnership. We used Tandem's brand colors, blue and green, to create a clear link to trade workers and build a trustworthy brand.",
          images: [],
        },
        stickers: {
          title: 'Stickers',
          paragraph:
            "I had the opportunity to explore the fun and visual side of branding by designing a sticker set for Tandem! It wasn't just about making things look cute (although they are cute!). I thought about where they would be placed: on toolboxes, work helmets, and lunch boxes. I chose durable, weather-resistant materials so they could withstand harsh working conditions. The designs combine our logo with friendly symbols related to balance and support, creating little snippets of brand joy. They're perfect for community events, app rewards, or simply as gifts, turning our users into brand ambassadors.",
          images: [],
        },
        businessCard: {
          title: 'Business Card',
          paragraph: 'Our project included custom business cards for team member introductions and networking.',
          image: '',
        },
        brochure: {
          title: 'Brochure',
          paragraph: "This brochure is designed to explain the app's stories, benefits and features to our potential users and partners.",
          image: '',
        },
        marketing: {
          title: 'Marketing & Business Strategy',
          promotionVideo: {
            title: 'Promotion Video',
            paragraph:
              'To reach more people, I worked on a promotion video for Tandem. We filmed and edited the shoots using Premiere Pro, crafting a video that captures the real-life challenges and relief Tandem brings to parents in the trades.',
            videoUrl: '',
          },
          tandemBlog: {
            title: 'Tandem Blog',
            paragraph: 'Companion to the app with supportive, clean design—I created the Tandem blog to share stories and updates.',
            blogUrl: '',
          },
          socialMedia: {
            title: 'Social Media',
            paragraph:
              "I designed and managed Tandem's social media strategy, including visual posts and content for Facebook and Instagram to foster community and communicate brand values.",
            facebookUrl: '',
            instagramUrl: '',
          },
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

export function getProjectById(id) {
  const numId = Number(id);
  return PROJECTS.find((p) => p.id === numId) ?? null;
}

export function getCategoryLabel(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId;
}
