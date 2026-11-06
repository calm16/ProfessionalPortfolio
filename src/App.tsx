import { FormEvent, Fragment, ReactNode, useEffect, useState } from 'react'
import { about, cv, education, experience, home, pages, profile, projects, tools, type Project } from './content'

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

// The panel's light follows the pointer. Values are written as CSS custom
// properties so the gradient itself stays in the stylesheet.
function trackPointer(event: React.MouseEvent<HTMLDivElement>) {
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${(((event.clientX - box.left) / box.width) * 100).toFixed(1)}%`)
  event.currentTarget.style.setProperty('--my', `${(((event.clientY - box.top) / box.height) * 100).toFixed(1)}%`)
}

function releasePointer(event: React.MouseEvent<HTMLDivElement>) {
  event.currentTarget.style.removeProperty('--mx')
  event.currentTarget.style.removeProperty('--my')
}

function ProjectVisual({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div
      className={`project-visual visual-${project.tone} ${featured ? 'featured' : ''}`}
      onMouseMove={trackPointer}
      onMouseLeave={releasePointer}
    >
      <div className="browser">
        <div className="browser-top"><span /><span /><span /><b>{project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '') : project.title}</b></div>
        {project.images.length > 0
          ? <img className="shot" src={project.images[0].src} alt={project.images[0].caption} loading="lazy" />
          : <div className="shot-pending" role="img" aria-label={`Screenshot of ${project.title} not yet added`}><span>Screenshot pending</span></div>}
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
        <div className="hero-system" aria-hidden="true">
          <svg viewBox="0 0 640 620" fill="none">
            <g className="system-grid">
              <path d="M80 20v580M200 20v580M320 20v580M440 20v580M560 20v580" />
              <path d="M20 80h600M20 200h600M20 320h600M20 440h600M20 560h600" />
            </g>
            <path className="system-route" pathLength="1" d="M80 560V440h120V320h240V200h120V80" />
            <g className="system-nodes">
              <circle cx="80" cy="560" r="7" />
              <circle cx="200" cy="440" r="7" />
              <circle cx="200" cy="320" r="7" />
              <circle cx="440" cy="320" r="7" />
              <circle cx="440" cy="200" r="7" />
              <circle cx="560" cy="80" r="7" />
            </g>
            <g className="system-labels">
              <text x="96" y="547">INTERFACE</text>
              <text x="218" y="270">API</text>
              <text x="458" y="187">INFRASTRUCTURE</text>
            </g>
          </svg>
        </div>
        <p className="eyebrow">{profile.role} · {profile.location}</p>
        <h1>{home.headlineLead} <span>{home.headlineEmphasis}</span></h1>
        <div className="hero-bottom">
          <p>{home.intro}</p>
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
        <div className="row-meta">{project.year && <span>{project.year}</span>}<span>{project.status}</span></div>
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
      {profile.availability && <p className="eyebrow">{profile.availability}</p>}
      <h2>{pages.contactBandHeading}</h2>
      <a className="email-display" href={`mailto:${profile.email}`}>{profile.email}</a>
      <div className="contact-foot">
        <p>Based in Ghana, working with teams locally and internationally.</p>
        <div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <Icon name="external" /></a><button onClick={() => navigate('/contact')}>Contact form <Icon name="arrow" /></button></div>
      </div>
    </section>
  )
}

function Work({ navigate }: { navigate: (path: string) => void }) {
  return <main className="shell page-main"><PageIntro index="01" title="Selected work" text={pages.workIntro} /><div className="all-work">{projects.map((project) => <ProjectRow project={project} navigate={navigate} workPage key={project.slug} />)}</div></main>
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
        <div className="case-title-row"><div><p className="eyebrow">Case study{project.year && ` · ${project.year}`}</p><h1>{project.title}</h1></div><Status>{project.status}</Status></div>
        <div className="case-meta"><div><span>Client</span><b>{project.client}</b></div>{project.year && <div><span>Year</span><b>{project.year}</b></div>}<div><span>Status</span><b>{project.status}</b></div>{project.liveUrl && <a className="arrow-link" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project<Icon name="external" /></a>}</div>
      </header>
      <ProjectVisual project={project} featured />
      <div className="case-body">
        {caseSections(project).map(({ title, body }, index) => (
          <CaseSection number={String(index + 1).padStart(2, '0')} title={title} key={title}>{body}</CaseSection>
        ))}
      </div>
      <nav className="case-pagination" aria-label="Project navigation">
        <button onClick={() => navigate(`/work/${previous.slug}`)}><span>Previous project</span><b>← {previous.shortTitle}</b></button>
        <button onClick={() => navigate(`/work/${next.slug}`)}><span>Next project</span><b>{next.shortTitle} →</b></button>
      </nav>
    </main>
  )
}

// Sections with nothing real to say are left out rather than rendered empty,
// so the numbering follows whatever the project actually has.
function caseSections(project: Project): { title: string; body: ReactNode }[] {
  const sections: { title: string; body: ReactNode }[] = [
    { title: 'What the system does', body: <p>{project.overview}</p> },
  ]
  // The lead image already sits at the top of the page, so the gallery carries
  // the rest. It comes early: a reader should see the product before reading
  // about how it was built.
  if (project.images.length > 1) {
    sections.push({
      title: 'The interface',
      body: (
        <div className="gallery">
          {project.images.slice(1).map((shot) => (
            <figure key={shot.src}>
              <a href={shot.src} target="_blank" rel="noreferrer">
                <img src={shot.src} alt={shot.caption} loading="lazy" />
              </a>
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      ),
    })
  }
  if (project.constraint) sections.push({ title: 'The hard problem', body: <p>{project.constraint}</p> })
  if (project.architecture.length > 0) {
    sections.push({ title: 'How it is built', body: <Architecture steps={project.architecture} /> })
  }
  if (project.tradeoffs.length > 0) {
    sections.push({
      title: 'Engineering tradeoffs',
      body: <ul className="tradeoffs">{project.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul>,
    })
  }
  sections.push({
    title: 'Technology',
    body: <div className="stack-table">{project.stackGroups.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div>,
  })
  sections.push({
    title: 'Where it stands',
    body: <><p>{project.current}</p><Status>{project.status}</Status></>,
  })
  return sections
}

function CaseSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <section className="case-section"><div className="case-label"><span>{number}</span><h2>{title}</h2></div><div className="case-content">{children}</div></section>
}

function Architecture({ steps }: { steps: string[] }) {
  return (
    <div className="architecture">
      {steps.map((step, index) => (
        <Fragment key={step}>
          {index > 0 && <i aria-hidden="true">→</i>}
          <div><span>{String(index + 1).padStart(2, '0')}</span><b>{step}</b></div>
        </Fragment>
      ))}
    </div>
  )
}

function About() {
  return (
    <main className="shell page-main">
      <PageIntro index="02" title="Engineer, in context." text={about.intro} />
      <section className="about-lead">
        {profile.portrait
          ? <img className="portrait-photo" src={profile.portrait} alt={profile.name} />
          : <div className="portrait" aria-label={`Portrait of ${profile.name} not yet added`}><span>EKA</span><small>{profile.location}</small></div>}
        <div className="about-copy">
          {about.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        </div>
      </section>
      <InfoSection title="Experience">{experience.map((item) => <div className="experience-row" key={item.role}><h3>{item.role}</h3>{item.dates && <span>{item.dates}</span>}<p>{item.summary}</p></div>)}</InfoSection>
      <InfoSection title="Education">{education.map((item) => <div className="education" key={item.qualification}><div><h3>{item.qualification}</h3><p>{item.institution}</p></div><span>{item.year}</span></div>)}</InfoSection>
      <InfoSection title="Working tools"><div className="tools-grid">{tools.map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}</div></InfoSection>
    </main>
  )
}

function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="info-section"><h2>{title}</h2><div>{children}</div></section>
}

function CV() {
  return (
    <main className="shell page-main">
      <PageIntro index="03" title="Curriculum vitae" text={pages.cvIntro} />
      <div className="cv-actions">
        <div className="cv-buttons">
          <a className="primary-button" href={cv.file} download><Icon name="download" />Download as PDF</a>
          <a className="arrow-link" href={cv.file} target="_blank" rel="noreferrer">Preview<Icon name="external" /></a>
        </div>
        <span>PDF · updated {cv.updated}</span>
      </div>
      <article className="cv-sheet">
        <header><div><h2>{profile.name}</h2><p>{profile.role}</p></div><div>
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {/* Short label on screen so the column stays even; the full address in
              print, where a reader cannot click it. */}
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="link-label">LinkedIn</span>
            <span className="link-url">{profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <span className="link-label">GitHub</span>
            <span className="link-url">{profile.github.replace(/^https?:\/\//, '')}</span>
          </a>
        </div></header>
        <CvSection title="Professional summary"><p>{cv.profile}</p></CvSection>
        <CvSection title="Education">{education.map((item) => <div className="cv-entry" key={item.qualification}><h3>{item.qualification}</h3>{item.year && <span>{item.year}</span>}<p>{item.institution}</p></div>)}</CvSection>
        <CvSection title="Work history">{experience.map((item) => (
          <div className="cv-entry" key={item.role}>
            <h3>{item.role}</h3>
            {item.dates && <span>{item.dates}</span>}
            <ul className="cv-bullets">{item.bullets.map((bullet) => <li key={bullet.slice(0, 40)}>{bullet}</li>)}</ul>
          </div>
        ))}</CvSection>
        <CvSection title="Selected projects">{projects.map((p) => <div className="cv-entry" key={p.slug}><h3>{p.title}</h3>{p.year && <span>{p.year}</span>}<p>{p.description} {p.stack.join(' · ')}</p></div>)}</CvSection>
        <CvSection title="Skills"><div className="cv-tech">{tools.map(([label, value]) => <Fragment key={label}><span>{label}</span><p>{value}</p></Fragment>)}<span>Networking & IT</span><p>{cv.networking}</p></div></CvSection>
        <CvSection title="Referees"><p>{cv.references}</p></CvSection>
      </article>
    </main>
  )
}

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="cv-section"><h2>{title}</h2><div>{children}</div></section>
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      // Treat anything that is not an explicit JSON acknowledgement as a failure.
      // A host that serves index.html for unknown routes answers 200 with HTML,
      // and reporting that as sent would lose the message silently.
      const body = (await response.json().catch(() => null)) as { ok?: string; error?: string } | null
      if (!response.ok || body?.ok !== 'true') {
        throw new Error(body?.error || 'That did not send. Please email directly.')
      }
      form.reset()
      setStatus('sent')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'That did not send. Please email directly.')
      setStatus('error')
    }
  }
  return (
    <main className="shell page-main contact-page">
      <PageIntro index="04" title={pages.contactTitle} text={pages.contactIntro} />
      <div className="contact-grid">
        <div className="contact-primary"><span className="eyebrow">The best route</span><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a><p>I usually reply within two working days. Based in Ghana and comfortable working across time zones.</p><div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <Icon name="external" /></a></div></div>
        <form className="contact-form" onSubmit={submit}>
          <label><span>Name</span><input name="name" required placeholder="Your name" autoComplete="name" /></label>
          <label><span>Email</span><input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></label>
          <label><span>Message</span><textarea name="message" required rows={6} placeholder="A little about what you’re working on..." /></label>
          <label className="honeypot" aria-hidden="true"><span>Company</span><input name="company" tabIndex={-1} autoComplete="off" /></label>
          <button className="primary-button" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent' : 'Send message'}
            <Icon name="arrow" />
          </button>
          <p className="form-note" role="status">{status === 'sent' ? `Thank you — that reached ${profile.email}. I usually reply within two working days.` : ''}</p>
          {status === 'error' && <p className="form-error" role="alert">{error}</p>}
        </form>
      </div>
    </main>
  )
}

// Fades blocks in as they enter view, once each. The class is added here rather
// than in the markup so that if this never runs, everything is simply visible.
function useReveal(page: string) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = document.querySelectorAll<HTMLElement>(
      '.featured-project, .project-row, .case-section, .info-section, .cv-section, .contact-band, .about-lead, .gallery figure',
    )
    targets.forEach((el) => el.classList.add('reveal'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [page])
}

export default function App() {
  const [page, setPage] = useState(window.location.pathname)
  // Dark is the default. A visitor's own choice is remembered and wins; their
  // system setting does not, because the work reads better against dark.
  const [dark, setDark] = useState(() => localStorage.getItem('eka-theme') !== 'light')
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
  useReveal(page)
  const project = page.startsWith('/work/') ? projects.find((p) => `/work/${p.slug}` === page) : undefined
  let content: ReactNode
  if (project) content = <CaseStudy project={project} navigate={navigate} />
  else if (page === '/work') content = <Work navigate={navigate} />
  else if (page === '/about') content = <About />
  else if (page === '/cv') content = <CV />
  else if (page === '/contact') content = <Contact />
  else content = <Home navigate={navigate} />
  return <><Nav page={page} navigate={navigate} dark={dark} setDark={setDark} /><div className="page-transition" key={page}>{content}</div><footer className="footer shell"><span>© {new Date().getFullYear()} {profile.name}</span><span>Designed &amp; engineered in Ghana</span></footer></>
}
