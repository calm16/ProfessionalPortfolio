import { FormEvent, ReactNode, useEffect, useState } from 'react'

type Project = {
  slug: string
  title: string
  shortTitle: string
  year: string
  client: string
  status: string
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

const projects: Project[] = [
  {
    slug: 'swiftvote',
    title: 'SwiftVote',
    shortTitle: 'SwiftVote',
    year: '2024',
    client: 'Campus awards & event operators',
    status: 'Live',
    description: 'Voting and ticketing infrastructure built around the realities of Ghanaian payments.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Railway'],
    facts: [['Channel', 'Web + USSD'], ['Payments', 'Mobile money'], ['Role', 'Lead engineer']],
    overview: 'SwiftVote gives event organisers one dependable place to run public voting, sell tickets, reconcile transactions, and follow live participation. Voters can use the web or a USSD session, with mobile-money payments recorded against the same event ledger.',
    constraint: 'The system had to remain coherent across web and USSD while payment providers completed transactions asynchronously. A voter can lose connectivity, close a session, or receive a delayed confirmation; each vote and ticket still needs to be issued exactly once.',
    tradeoffs: ['A shared transaction state machine over channel-specific logic', 'Explicit idempotency at every payment callback boundary', 'Operational clarity and audit trails over premature automation'],
    stackGroups: [['Frontend', 'React, TypeScript'], ['Backend', 'Node.js, Express, PostgreSQL'], ['Integrations', 'Mobile money, USSD gateway'], ['Infrastructure', 'Railway, managed PostgreSQL']],
    current: 'Live in production, processing real payments for campus awards and event ticketing.',
    tone: 'blue',
  },
  {
    slug: 'farmanet',
    title: 'FarmaNet crop yield estimator',
    shortTitle: 'FarmaNet',
    year: '2024',
    client: 'Agricultural stakeholders',
    status: 'Approved, pending deployment',
    description: 'A machine-learning system that estimates crop yield and harvest ahead of time.',
    stack: ['React', 'Spring Boot', 'Python', 'Django', 'Machine learning'],
    facts: [['Interface', 'Internal web'], ['Model', 'Yield estimation'], ['Role', 'Full-stack / ML']],
    overview: 'FarmaNet turns field and crop observations into an early estimate of likely yield and harvest timing. Agricultural companies and selected commercial farms use a focused internal interface to submit inputs and review model output.',
    constraint: 'A useful prediction needed to cross a mixed technology boundary without making the statistical model part of the operational application. The model also had to be candid about the limits of a still-growing training dataset.',
    tradeoffs: ['A separate Python inference service rather than embedding model code in Java', 'Stable prediction contracts between services', 'Deployment held until the training set supports responsible production use'],
    stackGroups: [['Frontend', 'React'], ['Backend', 'Java, Spring Boot'], ['AI service', 'Python, Django, ML pipeline'], ['Infrastructure', 'Container-ready services']],
    current: 'Approved by stakeholders and running with selected clients. Wider deployment is pending a larger training dataset.',
    tone: 'mist',
  },
  {
    slug: 'drinkfresh',
    title: 'DrinkFresh',
    shortTitle: 'DrinkFresh',
    year: '2023',
    client: 'DrinkFresh yoghurt',
    status: 'Delivered',
    description: 'A product web application delivered from initial requirements through deployment.',
    stack: ['React', 'TypeScript', 'Node.js', 'Product design'],
    facts: [['Scope', 'End to end'], ['Type', 'Product web app'], ['Role', 'Product engineer']],
    overview: 'DrinkFresh brings the yoghurt business, product range, and customer journey into one straightforward web application. The engagement covered requirements discovery, interface design, implementation, and production delivery.',
    constraint: 'The project needed to turn an evolving, largely verbal set of business requirements into a usable product without adding operational complexity for a small team.',
    tradeoffs: ['A compact content model the business could maintain', 'Familiar purchase paths over novel interaction patterns', 'A deliberately small deployment footprint'],
    stackGroups: [['Frontend', 'React, TypeScript'], ['Backend', 'Node.js'], ['Product', 'Requirements, UX, delivery'], ['Infrastructure', 'Managed deployment']],
    current: 'Delivered to the client and deployed.',
    tone: 'lavender',
  },
]

const experience = [
  ['Independent software engineer', '2023 — now', 'Building production software for clients across commerce, events, and agriculture.'],
  ['AI & backend engineering', '2022 — now', 'Designing service boundaries and applied machine-learning workflows for practical use.'],
  ['Technical project delivery', 'Ongoing', 'Taking products from uncertain requirements to deployed, maintainable systems.'],
]

function Icon({ name }: { name: 'arrow' | 'moon' | 'sun' | 'menu' | 'close' | 'download' | 'external' }) {
  const paths: Record<typeof name, ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    moon: <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />,
    sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>,
    menu: <><path d="M4 8h16M4 16h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5M4 21h16" /></>,
    external: <><path d="M14 5h5v5M19 5l-9 9" /><path d="M19 14v5H5V5h5" /></>,
  }
  return <svg aria-hidden="true" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">{paths[name]}</svg>
}

function Status({ children }: { children: ReactNode }) {
  return <span className="status"><span className="status-dot" />{children}</span>
}

function Stack({ items }: { items: string[] }) {
  return <div className="stack-list">{items.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
}

function Nav({ page, navigate, dark, setDark }: { page: string; navigate: (path: string) => void; dark: boolean; setDark: (value: boolean) => void }) {
  const [open, setOpen] = useState(false)
  const go = (path: string) => { navigate(path); setOpen(false) }
  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Primary navigation">
        <button className="wordmark" onClick={() => go('/')}>EKA<span>.</span></button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          <div className="mobile-nav-head">
            <span className="wordmark-static">EKA<span>.</span></span>
            <button className="icon-button" aria-label="Close menu" onClick={() => setOpen(false)}><Icon name="close" /></button>
          </div>
          {['Home', 'Work', 'About', 'CV', 'Contact'].map((item) => {
            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`
            const active = page === path || (item === 'Work' && page.startsWith('/work/'))
            return <button className={`nav-link ${active ? 'active' : ''}`} key={item} onClick={() => go(path)}>{item}</button>
          })}
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>
            <Icon name={dark ? 'sun' : 'moon'} /><span>{dark ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
        <button className="icon-button menu-button" aria-label="Open menu" onClick={() => setOpen(true)}><Icon name="menu" /></button>
      </nav>
    </header>
  )
}

function ProjectVisual({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div className={`project-visual visual-${project.tone} ${featured ? 'featured' : ''}`} aria-label={`${project.title} interface preview`}>
      <div className="browser">
        <div className="browser-top"><span /><span /><span /><b>{project.slug}.app</b></div>
        {project.slug === 'swiftvote' && <div className="vote-ui"><div className="side"><strong>SV</strong><i /><i /><i /></div><div className="screen"><small>LIVE OVERVIEW</small><h3>Campus Choice Awards</h3><div className="metric-row"><div><b>18,492</b><span>Votes</span></div><div><b>GHS 42.8k</b><span>Processed</span></div></div><div className="bars"><i /><i /><i /><i /><i /><i /><i /></div></div></div>}
        {project.slug === 'farmanet' && <div className="farm-ui"><div className="farm-head"><b>Yield forecast</b><span>Model v2.4</span></div><div className="chart"><i /><i /><i /><i /><i /><i /><i /></div><div className="farm-stats"><span><b>28.4t</b>Expected yield</span><span><b>86%</b>Confidence</span></div></div>}
        {project.slug === 'drinkfresh' && <div className="drink-ui"><div className="drink-copy"><small>FRESHLY MADE</small><b>Yoghurt, made<br />the good way.</b><span>Simple ingredients. Fresh taste.</span></div><div className="bottle"><i>DF</i></div></div>}
      </div>
    </div>
  )
}

function ArrowLink({ children, onClick, external = false }: { children: ReactNode; onClick?: () => void; external?: boolean }) {
  return <button className="arrow-link" onClick={onClick}>{children}<Icon name={external ? 'external' : 'arrow'} /></button>
}

function Home({ navigate }: { navigate: (path: string) => void }) {
  return (
    <main>
      <section className="hero shell">
        <p className="eyebrow">Software & AI engineer · Accra, Ghana</p>
        <h1>I build production systems for <span>real-world complexity.</span></h1>
        <div className="hero-bottom">
          <p>I’m Emmanuel Koranteng Ankamah. I design and engineer dependable software across payments, applied AI, and digital products.</p>
          <ArrowLink onClick={() => navigate('/work')}>Explore selected work</ArrowLink>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading"><p className="eyebrow">01 / Selected work</p><p>Three systems, built for use.</p></div>
        <article className="featured-project">
          <ProjectVisual project={projects[0]} featured />
          <div className="featured-copy">
            <div className="project-title-line"><h2>SwiftVote</h2><Status>Live</Status></div>
            <p className="project-lede">{projects[0].description}</p>
            <div className="fact-grid">{projects[0].facts.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div>
            <Stack items={projects[0].stack} />
            <ArrowLink onClick={() => navigate('/work/swiftvote')}>Read the case study</ArrowLink>
          </div>
        </article>
        <div className="project-list">
          {projects.slice(1).map((project) => <ProjectRow project={project} key={project.slug} navigate={navigate} />)}
        </div>
      </section>
      <ContactBand navigate={navigate} />
    </main>
  )
}

function ProjectRow({ project, navigate, workPage = false }: { project: Project; navigate: (path: string) => void; workPage?: boolean }) {
  return (
    <article className={`project-row ${workPage ? 'work-row' : ''}`}>
      <ProjectVisual project={project} />
      <div className="project-row-copy">
        <div className="row-meta"><span>{project.year}</span><span>{project.status}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Stack items={project.stack} />
        <ArrowLink onClick={() => navigate(`/work/${project.slug}`)}>View case study</ArrowLink>
      </div>
    </article>
  )
}

function ContactBand({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="contact-band shell">
      <p className="eyebrow">Open to thoughtful work</p>
      <h2>Have a system worth building?</h2>
      <a className="email-display" href="mailto:hello@emmanuelankamah.com">hello@emmanuelankamah.com</a>
      <div className="contact-foot">
        <p>Based in Ghana, working with teams locally and internationally.</p>
        <div><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub <Icon name="external" /></a><button onClick={() => navigate('/contact')}>Contact form <Icon name="arrow" /></button></div>
      </div>
    </section>
  )
}

function Work({ navigate }: { navigate: (path: string) => void }) {
  return <main className="shell page-main"><PageIntro index="01" title="Selected work" text="Production systems shaped around real operational constraints, not portfolio prompts." /><div className="all-work">{projects.map((project) => <ProjectRow project={project} navigate={navigate} workPage key={project.slug} />)}</div></main>
}

function PageIntro({ index, title, text }: { index: string; title: string; text: string }) {
  return <header className="page-intro"><p className="eyebrow">{index} / EKA</p><h1>{title}</h1><p>{text}</p></header>
}

function CaseStudy({ project, navigate }: { project: Project; navigate: (path: string) => void }) {
  const index = projects.findIndex((p) => p.slug === project.slug)
  const previous = projects[(index + projects.length - 1) % projects.length]
  const next = projects[(index + 1) % projects.length]
  return (
    <main className="shell case-main">
      <header className="case-header">
        <button className="back-link" onClick={() => navigate('/work')}>← All work</button>
        <div className="case-title-row"><div><p className="eyebrow">Case study · {project.year}</p><h1>{project.title}</h1></div><Status>{project.status}</Status></div>
        <div className="case-meta"><div><span>Client</span><b>{project.client}</b></div><div><span>Year</span><b>{project.year}</b></div><div><span>Status</span><b>{project.status}</b></div><ArrowLink external>Visit live project</ArrowLink></div>
      </header>
      <ProjectVisual project={project} featured />
      <div className="case-body">
        <CaseSection number="01" title="What the system does"><p>{project.overview}</p></CaseSection>
        <CaseSection number="02" title="The hard constraint"><p>{project.constraint}</p></CaseSection>
        <CaseSection number="03" title="How it is built">
          <p>The architecture keeps the user-facing application responsive while isolating specialised services and third-party dependencies behind explicit boundaries.</p>
          <Architecture project={project} />
        </CaseSection>
        <CaseSection number="04" title="Engineering tradeoffs"><ul className="tradeoffs">{project.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul></CaseSection>
        <CaseSection number="05" title="Technology"><div className="stack-table">{project.stackGroups.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div></CaseSection>
        <CaseSection number="06" title="Current status"><p>{project.current}</p><Status>{project.status}</Status></CaseSection>
      </div>
      <nav className="case-pagination" aria-label="Project navigation">
        <button onClick={() => navigate(`/work/${previous.slug}`)}><span>Previous project</span><b>← {previous.shortTitle}</b></button>
        <button onClick={() => navigate(`/work/${next.slug}`)}><span>Next project</span><b>{next.shortTitle} →</b></button>
      </nav>
    </main>
  )
}

function CaseSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <section className="case-section"><div className="case-label"><span>{number}</span><h2>{title}</h2></div><div className="case-content">{children}</div></section>
}

function Architecture({ project }: { project: Project }) {
  const middle = project.slug === 'swiftvote' ? 'API + transaction engine' : project.slug === 'farmanet' ? 'Spring Boot API' : 'Application layer'
  const end = project.slug === 'swiftvote' ? 'Payments / USSD' : project.slug === 'farmanet' ? 'Django AI service' : 'Content + deployment'
  return <div className="architecture"><div><span>01</span><b>React client</b></div><i>→</i><div><span>02</span><b>{middle}</b></div><i>→</i><div><span>03</span><b>{end}</b></div></div>
}

function About() {
  return (
    <main className="shell page-main">
      <PageIntro index="02" title="Engineer, in context." text="I care about the space between a sound technical decision and a system that genuinely works for the people using it." />
      <section className="about-lead">
        <div className="portrait" aria-label="Portrait placeholder for Emmanuel Koranteng Ankamah"><span>EKA</span><small>Accra, GH</small></div>
        <div className="about-copy">
          <p>I’m Emmanuel, a software and AI engineer based in Ghana. My work sits across product engineering, backend systems, and applied machine learning.</p>
          <p>I’m drawn to projects where software meets operational reality: intermittent connectivity, asynchronous payments, incomplete data, and changing requirements. Those constraints are not edge cases; they are the material of the work.</p>
          <p>I work closely with clients and stakeholders to move from a useful question to a maintainable system—without hiding the tradeoffs along the way.</p>
        </div>
      </section>
      <InfoSection title="Experience">{experience.map(([title, date, desc]) => <div className="experience-row" key={title}><h3>{title}</h3><span>{date}</span><p>{desc}</p></div>)}</InfoSection>
      <InfoSection title="Education"><div className="education"><div><h3>Computer Science & Engineering</h3><p>Foundations in software systems, data, and applied computing.</p></div><span>Ghana</span></div></InfoSection>
      <InfoSection title="Working tools"><div className="tools-grid"><div><span>Languages</span><p>TypeScript, JavaScript, Java, Python, SQL</p></div><div><span>Frontend</span><p>React, HTML, CSS, interface systems</p></div><div><span>Backend</span><p>Node.js, Express, Spring Boot, Django</p></div><div><span>Data & delivery</span><p>PostgreSQL, ML workflows, Railway, Git</p></div></div></InfoSection>
    </main>
  )
}

function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="info-section"><h2>{title}</h2><div>{children}</div></section>
}

function CV() {
  const cvText = `Emmanuel Koranteng Ankamah — Software & AI Engineer\n\nBased in Ghana\nEmail: hello@emmanuelankamah.com\n\nEXPERIENCE\nIndependent software engineer, 2023—now\nBuilding production software across commerce, events, and agriculture.\n\nSELECTED WORK\nSwiftVote — Voting and ticketing infrastructure\nFarmaNet — ML crop yield estimation system\nDrinkFresh — End-to-end product web application\n\nTOOLS\nTypeScript, React, Node.js, Express, Java, Spring Boot, Python, Django, PostgreSQL`
  return (
    <main className="shell page-main">
      <PageIntro index="03" title="Curriculum vitae" text="A concise record of selected work, technical focus, and experience." />
      <div className="cv-actions"><a className="primary-button" href={`data:text/plain;charset=utf-8,${encodeURIComponent(cvText)}`} download="Emmanuel-Koranteng-Ankamah-CV.txt"><Icon name="download" />Download CV</a><span>TXT · Updated June 2025</span></div>
      <article className="cv-sheet">
        <header><div><h2>Emmanuel Koranteng<br />Ankamah</h2><p>Software & AI Engineer</p></div><div><a href="mailto:hello@emmanuelankamah.com">hello@emmanuelankamah.com</a><span>Accra, Ghana</span><span>Available internationally</span></div></header>
        <CvSection title="Profile"><p>Software and AI engineer building production systems across payments, applied machine learning, and digital products. Experienced in taking technical projects from requirements through architecture, implementation, and deployment.</p></CvSection>
        <CvSection title="Experience">{experience.slice(0, 2).map(([title, date, desc]) => <div className="cv-entry" key={title}><h3>{title}</h3><span>{date}</span><p>{desc}</p></div>)}</CvSection>
        <CvSection title="Selected projects">{projects.map((p) => <div className="cv-entry" key={p.slug}><h3>{p.title}</h3><span>{p.year}</span><p>{p.description} {p.stack.join(' · ')}</p></div>)}</CvSection>
        <CvSection title="Technical"><div className="cv-tech"><span>Languages</span><p>TypeScript, JavaScript, Java, Python, SQL</p><span>Systems</span><p>React, Node.js, Express, Spring Boot, Django, PostgreSQL</p><span>Practice</span><p>System design, API design, applied ML, product delivery, deployment</p></div></CvSection>
      </article>
    </main>
  )
}

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="cv-section"><h2>{title}</h2><div>{children}</div></section>
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true) }
  return (
    <main className="shell page-main contact-page">
      <PageIntro index="04" title="Let’s talk." text="For thoughtful product work, technical collaborations, or an engineering role." />
      <div className="contact-grid">
        <div className="contact-primary"><span className="eyebrow">The best route</span><a href="mailto:hello@emmanuelankamah.com">hello@<br />emmanuelankamah.com</a><p>I usually reply within two working days. Based in Accra and comfortable working across time zones.</p><div><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub <Icon name="external" /></a></div></div>
        <form className="contact-form" onSubmit={submit}>
          <label><span>Name</span><input name="name" required placeholder="Your name" /></label>
          <label><span>Email</span><input name="email" type="email" required placeholder="you@company.com" /></label>
          <label><span>Message</span><textarea name="message" required rows={6} placeholder="A little about what you’re working on..." /></label>
          <button className="primary-button" type="submit">{sent ? 'Message noted' : 'Send message'}<Icon name="arrow" /></button>
          {sent && <p className="form-note">Thank you. Please also email Emmanuel directly for the quickest response.</p>}
        </form>
      </div>
    </main>
  )
}

export default function App() {
  const [page, setPage] = useState(window.location.pathname)
  const [dark, setDark] = useState(() => localStorage.getItem('eka-theme') === 'dark' || (!localStorage.getItem('eka-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches))
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('eka-theme', dark ? 'dark' : 'light')
  }, [dark])
  useEffect(() => {
    const onPop = () => setPage(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    setPage(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const project = page.startsWith('/work/') ? projects.find((p) => `/work/${p.slug}` === page) : undefined
  let content: ReactNode
  if (project) content = <CaseStudy project={project} navigate={navigate} />
  else if (page === '/work') content = <Work navigate={navigate} />
  else if (page === '/about') content = <About />
  else if (page === '/cv') content = <CV />
  else if (page === '/contact') content = <Contact />
  else content = <Home navigate={navigate} />
  return <><Nav page={page} navigate={navigate} dark={dark} setDark={setDark} />{content}<footer className="footer shell"><span>© 2025 Emmanuel Koranteng Ankamah</span><span>Designed & engineered in Ghana</span></footer></>
}
