// Every fact shown on the site lives here.
//
// Nothing in this file may be invented. If a value is not known, leave it as an
// empty string or empty array — the components hide empty fields rather than
// render a guess. Items marked NEEDS are waiting on Emmanuel.

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
  /** Service hops, in order. Empty hides the diagram. */
  architecture: string[]
  tradeoffs: string[]
  stackGroups: [string, string][]
  current: string
  tone: string
}

export const profile = {
  name: 'Emmanuel Koranteng Ankamah',
  role: 'Software & AI Engineer',
  location: 'Ghana',
  email: 'emmanuelkorantenga@gmail.com',
  linkedin: 'https://www.linkedin.com/in/emmanuel-koranteng-ankamah-2ab032330',
  github: 'https://github.com/calm16',
  availability: 'Open to engineering roles',
  // NEEDS REAL VALUE — portrait photograph, professional shoot booked.
  portrait: '',
}

// Approved by Emmanuel: the headline and the two sentences under it.
export const home = {
  headlineLead: 'I build production systems for',
  headlineEmphasis: 'real-world complexity.',
  intro:
    'I’m Emmanuel Koranteng Ankamah. I design and engineer dependable software across payments, applied AI, and digital products.',
}

// Approved by Emmanuel. Written as one arc — foundation, infrastructure, commissioned
// work, current work, what he is building toward — rather than a list of topics, so the
// register stays level. Formal throughout: no contractions.
export const about = {
  intro:
    'I am interested in how a system holds up when conditions are not ideal — unclear requirements, no precedent to follow, thin data.',
  paragraphs: [
    'I am a software and AI engineer based in Ghana, working across product engineering, backend systems and applied machine learning. My foundation is in systems design — service boundaries, data models, and the contracts between them — and most of what I build is meant to run in production rather than demonstrate an idea.',
    'I began in enterprise infrastructure. During my national service at the Electricity Company of Ghana I worked across server configuration, network systems and recovery operations — which is where I learned what it costs when a system people depend on stops working.',
    'Since then my work has been commissioned: production systems built for clients and running under real conditions. That is where software meets operational reality — intermittent connectivity, asynchronous payments, incomplete data, and requirements that change while you build. Those constraints are not edge cases; they are the material of the work.',
    'Currently at FarmaNet, I work on machine learning systems supporting agricultural decision-making. It is work I did not expect to be doing, and it sharpened what I now look for in any system: the quality of its reasoning, not only its output. A model short of data can decline to answer, or it can give a considered estimate and state exactly how much weight that estimate deserves. The second takes research and judgement before it takes code, and it is the difference between a system that is technically correct and one that is genuinely usable.',
    'Longer term, what I am working toward is a tech startup of my own — contract work for organisations alongside products we originate ourselves, built from the limitations we continue to encounter in the systems enterprises already run.',
  ],
}

// Headings and standfirsts for each page. The contact band closes the home page.
export const pages = {
  workIntro: 'Three production systems, built for clients and running under real conditions.',
  cvIntro: 'A concise record of selected work, technical focus, and experience.',
  contactTitle: 'Let’s talk.',
  contactIntro: 'For client work, technical collaboration, or an engineering role.',
  contactBandHeading: 'Have a system worth building?',
}

export const projects: Project[] = [
  {
    slug: 'swiftvote',
    title: 'SwiftVote',
    shortTitle: 'SwiftVote',
    year: '2026',
    client: 'Elvis Innovations',
    status: 'Live',
    liveUrl: 'https://swiftvote.website',
    // NEEDS REAL VALUE — screenshot of the live product, placed in /public.
    image: '',
    description:
      'A voting and ticketing platform for Ghanaian campus awards shows, taking mobile-money payments over both the web and USSD.',
    stack: ['React 19', 'TypeScript', 'Node', 'Express 5', 'PostgreSQL', 'Prisma', 'Railway'],
    facts: [
      ['Channels', 'Web + USSD'],
      ['Payments', 'Mobile money'],
      ['Client', 'Elvis Innovations'],
    ],
    overview:
      'Organisers create an event, open public nominations, approve nominees into contestants, and run paid voting with per-category pricing and discounted vote bundles. The public votes from the website or from any feature phone by dialling a shortcode — no internet, no app, no account. Every vote is tied to a confirmed mobile-money payment, and organisers watch standings, reconcile every collection attempt, and withdraw their earnings. A super admin approves events before anything reaches the public.',
    constraint:
      'Collecting hundreds of one-cedi payments reliably, through a payment provider whose confirmation arrives seconds or minutes after the request, on a network where the voter may be on a feature phone that cannot hold a session. A vote that counts before the money confirms is fraud; a payment that confirms without its vote is theft. The two have to move together or not at all, across two channels, with no guarantee the confirmation ever arrives.',
    architecture: ['React client / USSD shortcode', 'Express API and vote ledger', 'Junipay, Arkesel, Nalo'],
    tradeoffs: [
      'Trusted nothing the payment provider sent us. Their callbacks carry no signature, so the webhook treats the message as a rumour: it names a payment, and the server then asks the provider what actually happened before writing anything. Slower and chattier than acting on the callback, but a forged callback cannot create a vote, and a callback that never arrives is recovered by the same code asking later.',
      'Derived every vote count instead of storing it. Totals are computed from individual vote records rather than kept as a running tally. That costs query time on every page. It buys figures that cannot drift — there is no counter to get out of step with reality after a failed payment or a refund.',
      'Made morale votes impossible to count as revenue, structurally. Promotional votes carry no payment record at all, rather than a flag that revenue queries filter out. A filter can be forgotten in the next query someone writes; an absent foreign key cannot.',
    ],
    stackGroups: [
      ['Frontend', 'React 19, Vite, TypeScript, Tailwind CSS v4, React Router'],
      ['Backend', 'Node, Express 5, PostgreSQL, Prisma'],
      [
        'Integrations',
        'Junipay (mobile money, web and USSD), Nalo and Arkesel (USSD shortcodes), Arkesel (SMS), Brevo (transactional email), Cloudinary (images)',
      ],
      ['Infrastructure', 'Railway — static site, Node service and Postgres, custom domains, CI from GitHub'],
    ],
    current: 'Live and taking real payments. Running events for the commissioning client.',
    tone: 'blue',
  },
  {
    slug: 'farmanet',
    title: 'FarmaNet crop yield estimator',
    shortTitle: 'FarmaNet',
    year: '2026',
    client: 'Farmanet GH',
    status: 'Approved, pending integration',
    liveUrl: '',
    // NEEDS REAL VALUE — estimator interface screenshot, data masked if required.
    image: '',
    description:
      'An ML-powered crop yield estimator that predicts yields across Ghana’s agroecological zones and, crucially, tells users how much to trust each prediction.',
    stack: ['Python', 'Django REST', 'scikit-learn', 'pandas', 'Spring Boot', 'PostgreSQL'],
    facts: [
      ['Coverage', '10 crops, 5 zones'],
      ['Model', 'Random Forest'],
      ['Output', 'Yield + confidence'],
    ],
    overview:
      'Given a farm’s crop, region, size, and planting date, it predicts expected yield per unit area and returns a confidence level, a risk assessment, and a plain-language explanation of its reasoning. It’s built for a Ghanaian agri-tech platform connecting investors with farms, so the predictions feed real funding decisions. The system covers ten crops across all five of Ghana’s agroecological zones, handling everything from well-evidenced staples to sparse, unobserved crop-region combinations. What sets it apart is an “honesty layer” that separates how confident the model is from whether the planting decision is sound — two things most yield tools conflate.',
    constraint:
      'Training data was thin and unevenly distributed — a few hundred farms, concentrated in the north, with some crops and regions barely represented. A naive model would either refuse to answer outside its comfort zone or, worse, answer with false confidence. The core challenge was building a system that stays genuinely useful and honest under severe data scarcity: it had to give a sensible estimate for a crop-region it had never seen, while being transparent that it was extrapolating — rather than emitting a confident-looking number that could misdirect an investment.',
    architecture: ['Estimator interface', 'Spring Boot / JSP host application', 'Django REST inference service'],
    // Held back at Emmanuel's request. The section is hidden while this is empty.
    tradeoffs: [],
    stackGroups: [
      ['Frontend', 'HTML, CSS, JavaScript estimator interface — migrating to JSP for the host application'],
      ['Backend', 'Python, Django REST service; scikit-learn (Random Forest); pandas and NumPy for the data pipeline'],
      ['Integrations', 'Consumed by a Spring Boot / JSP application over HTTP via a Jersey client; PostgreSQL-backed host platform'],
      ['Infrastructure', 'Git and GitHub, PR-based workflow; served through the FarmaNet application stack'],
    ],
    current:
      'First version complete, tested across a full scenario matrix, and approved in a stakeholder demo. Currently being hardened and prepared for integration into the main FarmaNet Java application; the model and its intelligence layers are done, with live deployment pending integration and a further data-collection round.',
    tone: 'mist',
  },
  {
    slug: 'drinkfresh',
    title: 'DrinkFresh',
    shortTitle: 'DrinkFresh',
    year: '2027',
    client: 'DrinkFresh',
    status: 'In development',
    liveUrl: '',
    // NEEDS REAL VALUE — screenshot once there is something to show.
    image: '',
    // NEEDS APPROVAL — assembled from what Emmanuel described, not his own sentence.
    description:
      'The commercial site for a fresh yoghurt business — custom orders, delivery, wholesale purchasing, and a directory of the places you can buy it.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Junipay'],
    facts: [
      ['Ordering', 'Custom mixes'],
      ['Trade', 'Wholesale'],
      ['Locations', 'Pickup + vending'],
    ],
    // NEEDS APPROVAL — assembled from what Emmanuel described.
    overview:
      'DrinkFresh is the commercial presence for a fresh yoghurt business. Customers build and customise their own orders for delivery, trade buyers purchase at wholesale, and anyone can find where to buy in person — pickup points, vending stations and general sales points for walk-ins. The site also carries the brand’s public-facing presence and publicity.',
    // NEEDS REAL VALUE — the hard problem. Section hidden until supplied.
    constraint: '',
    architecture: ['Next.js storefront and admin', 'Route handlers and PostgreSQL', 'Junipay, Cloudinary, Brevo'],
    // NEEDS REAL VALUE — section hidden until supplied.
    tradeoffs: [],
    stackGroups: [
      ['Frontend', 'Next.js 15 (App Router), TypeScript, Tailwind CSS'],
      ['Backend', 'Next.js route handlers, PostgreSQL, Prisma'],
      [
        'Integrations',
        'Junipay (mobile money), Cloudinary (product imagery), Brevo (order email), Arkesel (delivery SMS)',
      ],
      ['Infrastructure', 'Vercel, managed PostgreSQL'],
    ],
    current:
      'In development. Deployment is paused while the client finalises branding and related changes.',
    tone: 'lavender',
  },
]

// One source of truth for roles. The about page shows the summary; the CV shows
// the bullets. Bullets are condensed from Emmanuel's own CV and project write-ups.
export const experience: {
  role: string
  dates: string
  summary: string
  bullets: string[]
}[] = [
  {
    role: 'AI/ML engineer — FarmaNet',
    dates: 'Jan 2026 — present',
    summary:
      'Part of the AI engineering team building machine-learning systems for agricultural decision-making, including the crop yield estimator.',
    bullets: [
      'Developed and evaluated machine-learning solutions for crop yield prediction using Random Forest regression, as part of FarmaNet’s crop yield estimation system.',
      'Prepared, cleaned, validated and engineered agricultural datasets for training, and defined dataset schemas, feature requirements and historical training-data specifications.',
      'Assessed model performance against MAE, RMSE and R², and established evaluation procedures supporting iterative improvement.',
      'Contributed to the Spring Boot and Django integration for prediction services, covering API design, request validation and end-to-end workflow testing.',
      'Worked with the CTO and stakeholders on AI roadmap planning, training-data acquisition, deployment strategy and production readiness.',
    ],
  },
  {
    role: 'Commissioned software engineering',
    dates: 'Aug 2026 — present',
    summary: 'Production systems built for clients, including SwiftVote and DrinkFresh.',
    bullets: [
      'Built and shipped SwiftVote, a voting and ticketing platform for Ghanaian campus awards, live and processing real mobile-money payments across both web and USSD.',
      'Designed the transaction model so every vote is issued exactly once against a confirmed payment, with idempotent handling of unsigned provider callbacks and recovery when confirmations never arrive.',
      'Integrated mobile money, USSD shortcodes, SMS, transactional email and image delivery against third-party APIs.',
      'Delivered across the full lifecycle — requirements, architecture, implementation and deployment — for clients in events and commerce.',
    ],
  },
  {
    role: 'IT national service — Electricity Company of Ghana',
    dates: 'Nov 2024 — Sep 2025',
    summary:
      'Enterprise IT and infrastructure support across branches: server and network maintenance, system deployment, and recovery of server-room failures.',
    bullets: [
      'Diagnosed and repaired server room failures, restoring network functionality for hundreds of employees.',
      'Implemented preventive maintenance on servers, reducing critical outages and improving reliability.',
      'Deployed and configured systems, applications and security compliance tools, and managed remote access solutions.',
      'Coordinated support deployments across ECG branches, resolving technical issues affecting over fifty staff per visit.',
    ],
  },
  {
    role: 'IT trainee — Electricity Company of Ghana',
    dates: 'Sep 2023 — Nov 2023',
    summary:
      'Network hardware, cabling and configuration across a multi-department site, alongside senior engineers.',
    bullets: [
      'Installed and configured cabling, patch panels and network hardware across a site of more than fifty offices.',
      'Applied security measures and configured network settings to meet operational requirements.',
      'Documented troubleshooting methods alongside senior engineers.',
    ],
  },
]

// Dates taken from the CV. NEEDS CONFIRMATION.
export const education: { qualification: string; institution: string; year: string }[] = [
  ['Full Stack Development certificate', 'IBM', '2025 — present'],
  ['Frontend Developer professional certificate', 'Meta', '2025 — present'],
  ['BSc Computer Science', 'Kwame Nkrumah University of Science and Technology', '2021 — 2024'],
  ['WASSCE, General Science', 'Prempeh College', '2017 — 2020'],
].map(([qualification, institution, year]) => ({ qualification, institution, year }))

// Third-party services are deliberately absent: naming five vendors implies those
// five are the limit, and any service with API documentation is workable.
// Networking and IT support live on the CV rather than here.
export const tools: [string, string][] = [
  ['Languages', 'TypeScript, JavaScript, Java, Python, SQL, HTML, CSS, Bash'],
  ['Frontend', 'React 19, Next.js 15, Vite, Tailwind CSS v4, React Router, JSP'],
  [
    'Backend',
    'Node, Express 5, Django, Django REST Framework, Spring Boot, REST API design, webhook handling and idempotency',
  ],
  ['Data', 'PostgreSQL, Prisma, schema design'],
  [
    'Machine learning',
    'scikit-learn, Random Forest regression, pandas, NumPy, data preprocessing, feature engineering, model evaluation (MAE, RMSE, R²)',
  ],
  ['Infrastructure & tooling', 'Railway, Vercel, Git, GitHub, CI from GitHub, PR-based workflow'],
]

// The CV carries everything the about page's tools grid does, plus the networking
// and IT work, which belongs on the CV rather than beside scikit-learn.
export const cv = {
  profile:
    'Software and AI engineer working across product engineering, backend systems and applied machine learning. Grounded in systems design, with particular attention to service boundaries, data models and the contracts between them. Production experience spans payment integration, multi-service architecture and applied machine learning under sparse data. Takes projects from requirements through architecture and implementation to deployment, and works comfortably with clients, stakeholders and cross-functional teams.',
  networking:
    'Network architecture and configuration, IP routing, network security protocols, server administration, hardware installation, IoT connectivity, ICT service management',
  references: 'Available on request',
  // The public download. Generated from this page, so it carries no phone
  // number and no referee details — those live only in the private document.
  file: '/Emmanuel-Koranteng-Ankamah-CV.pdf',
  updated: 'October 2026',
}
