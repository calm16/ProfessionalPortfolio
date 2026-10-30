// Every fact shown on the site lives here.
//
// Nothing in this file may be invented. If a value is not known, leave it as an
// empty string — the components hide empty fields rather than render a guess.
// Items marked NEEDS REAL VALUE are placeholders waiting on Emmanuel.

export type Project = {
  slug: string
  title: string
  shortTitle: string
  year: string
  client: string
  status: string
  liveUrl: string
  image: string
  description: string
  stack: string[]
  facts: [string, string][]
  overview: string
  constraint: string
  tradeoffs: string[]
  stackGroups: [string, string][]
  current: string
  tone: string
}

export const profile = {
  name: 'Emmanuel Koranteng Ankamah',
  role: 'Software & AI Engineer',
  location: 'Accra, Ghana',
  email: 'emmanuelkorantenga@gmail.com',
  linkedin: 'https://www.linkedin.com/in/emmanuel-koranteng-ankamah-2ab032330',
  github: 'https://github.com/calm16',
  // NEEDS DECISION — one short line on what he is open to, or left empty to show nothing.
  availability: '',
  // NEEDS REAL VALUE — portrait photograph, professional shoot booked.
  portrait: '',
}

export const projects: Project[] = [
  {
    slug: 'swiftvote',
    title: 'SwiftVote',
    shortTitle: 'SwiftVote',
    // NEEDS REAL VALUE — delivery year.
    year: '',
    client: 'Commissioned client',
    status: 'Live',
    liveUrl: 'https://swiftvote.website',
    // NEEDS REAL VALUE — screenshot of the live product, placed in /public.
    image: '',
    description:
      'Voting and ticketing infrastructure built around the realities of Ghanaian payments.',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express 5', 'PostgreSQL', 'Prisma', 'Railway'],
    facts: [
      ['Channel', 'Web + USSD'],
      ['Payments', 'Mobile money'],
      ['Status', 'Live in production'],
    ],
    overview:
      'SwiftVote gives event organisers one dependable place to run public voting, sell tickets, reconcile transactions, and follow live participation. Voters can use the web or a USSD session, with mobile-money payments recorded against the same event ledger.',
    constraint:
      'The system had to remain coherent across web and USSD while payment providers completed transactions asynchronously. A voter can lose connectivity, close a session, or receive a delayed confirmation; each vote and ticket still needs to be issued exactly once.',
    tradeoffs: [
      'A shared transaction state machine over channel-specific logic',
      'Explicit idempotency at every payment callback boundary',
      'Operational clarity and audit trails over premature automation',
    ],
    stackGroups: [
      ['Frontend', 'React 19, Vite, Tailwind, TypeScript'],
      ['Backend', 'Node.js, Express 5, PostgreSQL, Prisma'],
      ['Integrations', 'Junipay (mobile money, web + USSD), Arkesel SMS, Brevo email, Cloudinary'],
      ['Infrastructure', 'Railway'],
    ],
    current:
      'Live in production, processing real mobile-money payments for campus awards and event ticketing.',
    tone: 'blue',
  },
  {
    slug: 'farmanet',
    title: 'FarmaNet crop yield estimator',
    shortTitle: 'FarmaNet',
    // NEEDS REAL VALUE — start year of the engagement.
    year: '',
    client: 'FarmaNet',
    status: 'Approved, pending deployment',
    liveUrl: '',
    // NEEDS REAL VALUE — internal interface screenshot, data masked if required.
    image: '',
    description:
      'A machine-learning system that estimates crop yield and harvest ahead of time.',
    stack: ['React', 'Java', 'Spring Boot', 'Python', 'Django', 'Machine learning'],
    facts: [
      ['Interface', 'Internal web'],
      ['Model', 'Yield estimation'],
      ['Status', 'Stakeholder approved'],
    ],
    overview:
      'FarmaNet turns field and crop observations into an early estimate of likely yield and harvest timing. Agricultural companies and selected commercial farms use a focused internal interface to submit inputs and review model output.',
    constraint:
      'A useful prediction needed to cross a mixed technology boundary without making the statistical model part of the operational application. The model also had to be candid about the limits of a still-growing training dataset.',
    tradeoffs: [
      'A separate Python inference service rather than embedding model code in Java',
      'Stable prediction contracts between services',
      'Deployment held until the training set supports responsible production use',
    ],
    stackGroups: [
      ['Frontend', 'React, Vite, TypeScript'],
      ['Backend', 'Java, Spring Boot'],
      ['AI service', 'Python, Django, Django REST Framework'],
      ['Infrastructure', 'Container-ready services'],
    ],
    current:
      'Approved by stakeholders and running with selected clients. Deployment is pending a larger training dataset.',
    tone: 'mist',
  },
  {
    slug: 'drinkfresh',
    title: 'DrinkFresh',
    shortTitle: 'DrinkFresh',
    // NEEDS REAL VALUE — delivery year.
    year: '',
    client: 'DrinkFresh',
    status: 'Delivered',
    liveUrl: '',
    // NEEDS REAL VALUE — screenshot, if the site is still reachable.
    image: '',
    description:
      'A product web application delivered from initial requirements through deployment.',
    // NEEDS REVIEW — stack taken from the previous portfolio and may be out of date.
    stack: ['JavaScript', 'HTML', 'CSS', 'REST APIs'],
    facts: [
      ['Scope', 'End to end'],
      ['Type', 'Product web app'],
      ['Role', 'Full-stack developer'],
    ],
    overview:
      'DrinkFresh brings the yoghurt business, product range, and customer journey into one straightforward web application. The engagement covered requirements discovery, interface design, implementation, and production delivery.',
    constraint:
      'The project needed to turn an evolving, largely verbal set of business requirements into a usable product without adding operational complexity for a small team.',
    tradeoffs: [
      'A compact content model the business could maintain',
      'Familiar purchase paths over novel interaction patterns',
      'A deliberately small deployment footprint',
    ],
    stackGroups: [
      ['Frontend', 'JavaScript, HTML, CSS'],
      ['Integration', 'REST APIs'],
      ['Product', 'Requirements, UX, delivery'],
      ['Infrastructure', 'Managed deployment'],
    ],
    current: 'Delivered to the client and deployed.',
    tone: 'lavender',
  },
]

// NEEDS REAL VALUES — roles, dates and descriptions. The entries below are the
// engagements we know are real; the dates are blank because none were given.
export const experience: [string, string, string][] = [
  [
    'AI engineer, FarmaNet',
    '',
    'Contracted on a permanent basis. Building machine-learning systems for agricultural decision-making, including the crop yield estimator.',
  ],
  [
    'Commissioned software engineering',
    '',
    'Delivering production systems for clients, including SwiftVote and DrinkFresh.',
  ],
  [
    'IT national service, Electricity Company of Ghana',
    '',
    'Enterprise infrastructure support — server configuration, network maintenance, and coordinated recovery after a major fibre cut.',
  ],
]

export const education = {
  qualification: 'BSc Computer Science',
  // NEEDS REAL VALUE — institution and graduation year.
  institution: '',
  year: '',
  note: 'Software engineering, AI and machine learning.',
}

export const tools: [string, string][] = [
  ['Languages', 'TypeScript, JavaScript, Java, Python, SQL'],
  ['Frontend', 'React, Vite, Tailwind CSS'],
  ['Backend', 'Node.js, Express, Spring Boot, Django, Django REST Framework'],
  ['Data & delivery', 'PostgreSQL, Prisma, ML pipelines, Railway, Git'],
]
