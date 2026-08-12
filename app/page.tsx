'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ============================================================
   PROJECT DATA
============================================================ */
const projectData = [
  {
    bg: '#050b0d',
    number: 'PROJECT 01 / 05',
    kicker: 'AI + SAAS',
    title: 'ZerroLabs',
    desc: 'AI-powered gym management SaaS with multi-tenant architecture, QR attendance, memberships, analytics and Razorpay payments.',
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Gemini AI', 'Razorpay'],
    live: 'https://zerrolabs.vercel.app/',
    github: 'https://github.com/RoyGraves606/ZerrolabsGymManagement',
  },
  {
    bg: '#0b0805',
    number: 'PROJECT 02 / 05',
    kicker: 'AI + E-COMMERCE',
    title: 'Zerro Gifts',
    desc: 'AI-powered e-commerce and event platform with personalized product recommendations, event booking, admin workflows and payments.',
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'MongoDB'],
    live: 'https://zerrogifts.vercel.app/',
    github: 'https://github.com/RoyGraves606/Zerro.2.0',
  },
  {
    bg: '#07080d',
    number: 'PROJECT 03 / 05',
    kicker: 'HEALTHCARE + REAL-TIME',
    title: 'Clinic Platform',
    desc: 'End-to-end doctor appointment booking platform with an AI patient assistant, real-time appointment updates and scheduled expiry.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Gemini AI'],
    live: null,
    github: 'https://github.com/RoyGraves606/Landing-page-and-booking-system-for-clinic',
  },
  {
    bg: '#040d0a',
    number: 'PROJECT 04 / 05',
    kicker: 'FREELANCE · BUSINESS',
    title: 'Perfect Water\nSolutions',
    desc: 'Fast, responsive and SEO-focused business website for a water solutions company — designed to present services clearly and support lead generation.',
    stack: ['Next.js', 'SEO', 'Responsive', 'Production'],
    live: 'https://www.perfectwatersolution.co.in',
    github: null,
  },
  {
    bg: '#0f0514',
    number: 'PROJECT 05 / 05',
    kicker: 'AGENCY · AI',
    title: 'Black Swan',
    desc: 'Modern, responsive web development agency website built with React and TypeScript, featuring animated branding and an integrated AI assistant designed to engage potential clients.',
    stack: ['React', 'TypeScript', 'Performance', 'Animation'],
    live: 'https://blackswanin.vercel.app/',
    github: 'https://github.com/RoyGraves606/BlackSwan',
  },
]

const sideLabels = ['01 ZERROLABS', '02 ZERRO GIFTS', '03 CLINIC', '04 WATER', '05 BLACK SWAN']

/* ============================================================
   HERO WAVE CANVAS
============================================================ */
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let rafId: number

    function resize() {
      const currentCanvas = canvasRef.current
      if (!currentCanvas) return
      W = window.innerWidth; H = window.innerHeight
      currentCanvas.width = W * dpr; currentCanvas.height = H * dpr
      currentCanvas.style.width = W + 'px'; currentCanvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    window.addEventListener('resize', resize)
    resize()

    function draw(t: number) {
      ctx.clearRect(0, 0, W, H)
      const strands = 5
      for (let s = 0; s < strands; s++) {
        const freq = 0.006 + s * 0.0016
        const amp = 34 + s * 13
        const yOff = H * 0.30 + s * (H * 0.095)
        const phase = t * 0.00032 + s * 1.35
        ctx.beginPath()
        const startX = W * 0.50
        for (let x = startX; x <= W; x += 4) {
          const y = yOff + Math.sin(x * freq + phase) * amp * Math.cos(phase * 0.4 + s)
          if (x === startX) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(255,255,255,${0.85 - s * 0.12})`
        ctx.lineWidth = 1.6
        ctx.stroke()
      }
      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas id="waveCanvas" ref={canvasRef} />
}

/* ============================================================
   ABOUT — MOBILE PANELS
============================================================ */
const aboutPanels = [
  {
    kicker: 'Profile',
    title: 'End-to-end developer.',
    body: 'I build complete applications rather than isolated UI screens: frontend, REST APIs, database architecture, authentication, AI integration and production deployment.',
    grid: null,
    num: '01',
  },
  {
    kicker: 'Stack',
    title: 'JavaScript at the core.',
    body: 'React, Next.js, Node.js, Express, TypeScript, MongoDB and modern AI APIs form my main stack.',
    grid: ['React / Next.js', 'Node / Express', 'TypeScript', 'MongoDB', 'Gemini API', 'REST / JWT / RBAC'],
    num: '02',
  },
  {
    kicker: 'Mindset',
    title: 'Learn by building.',
    body: 'I prefer solving real problems, breaking systems into smaller pieces and learning whatever the project needs next.',
    grid: null,
    num: '03',
  },
]


/* ============================================================
   MAIN PAGE
============================================================ */
export default function Home() {
  // scroll progress
  const progressRef = useRef<HTMLDivElement>(null)

  // about desktop
  const aboutRef = useRef<HTMLElement>(null)
  const [aboutIdx, setAboutIdx] = useState(0)

  // projects
  const projectsRef = useRef<HTMLElement>(null)
  const [projectIdx, setProjectIdx] = useState(0)
  const projectCardRef = useRef<HTMLDivElement>(null)
  const lastProjectIdx = useRef(-1)
  const projectBarRef = useRef<HTMLDivElement>(null)

  // contact
  const contactRef = useRef<HTMLElement>(null)
  const contactTrackRef = useRef<HTMLDivElement>(null)
  const contactFillRef = useRef<HTMLDivElement>(null)
  const contactCounterRef = useRef<HTMLSpanElement>(null)

  // intersection observer for animations
  useEffect(() => {
    const animated = document.querySelectorAll(
      '.anim-fade-up,.anim-left,.anim-right,.anim-scale,.anim-flip'
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
          else e.target.classList.remove('visible')
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )
    animated.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const sectionPct = useCallback((el: HTMLElement) => {
    const total = el.offsetHeight - window.innerHeight
    return Math.max(0, Math.min(1, -el.getBoundingClientRect().top / total))
  }, [])

  /* project card transition helper */
  const transitionProject = useCallback((newIdx: number) => {
    if (newIdx === lastProjectIdx.current) return
    const card = projectCardRef.current
    if (!card) {
      lastProjectIdx.current = newIdx
      setProjectIdx(newIdx)
      return
    }
    card.classList.add('exiting')
    setTimeout(() => {
      card.classList.remove('exiting')
      card.classList.add('entering')
      lastProjectIdx.current = newIdx
      setProjectIdx(newIdx)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.remove('entering')
        })
      })
    }, 320)
  }, [])
  /* main scroll handler */
  useEffect(() => {
    let ticking = false

    function onScroll() {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current)
        progressRef.current.style.width = (maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0) + '%'

      // about desktop
      if (aboutRef.current) {
        const p = sectionPct(aboutRef.current)
        const idx = Math.min(2, Math.floor(p * 3))
        setAboutIdx(idx)
      }

      // projects
      if (projectsRef.current) {
        const p = sectionPct(projectsRef.current)
        const idx = Math.min(4, Math.floor(p * 5))
        transitionProject(idx)
        if (projectBarRef.current)
          projectBarRef.current.style.width = (p * 100) + '%'
      }
      // contact
      if (contactRef.current && contactTrackRef.current && contactFillRef.current && contactCounterRef.current) {
        const p = sectionPct(contactRef.current)
        const idx = Math.min(2, Math.floor(p * 3))
        contactTrackRef.current.style.transform = `translateX(-${idx * 33.333333}%)`
        contactFillRef.current.style.width = (p * 100) + '%'
        contactCounterRef.current.textContent = `0${idx + 1} / 03`
      }

      ticking = false
    }

    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(onScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionPct, transitionProject])

  const data = projectData[projectIdx]

  return (
    <>
      <div id="progress" ref={progressRef} />

      {/* ===== NAV ===== */}
      <nav className="nav">
        <a className="nav-logo" href="#home">THAMIZH</a>
        <div className="nav-links">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link" href="#contact">Contact</a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <HeroCanvas />
        <div id="lineShape" />
        <div className="hero-inner">
          <p className="hero-eyebrow">Full-Stack Developer</p>
          <h1 className="hero-title">Thamizh</h1>
          <p className="hero-sub">MERN &amp; AI Systems</p>
          <p className="hero-desc">
            I design and ship production software solo — clinic platforms,
            billing engines and AI-powered business systems.
          </p>
        </div>
        <div className="hero-scroll">Scroll to explore</div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="sticky-section" ref={aboutRef}>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="sticky-inner about-sticky">
          <div className="about-left">
            <p className="section-kicker anim-fade-up">01 — About</p>
            <h2 className="section-title anim-fade-up">BUILD.<br />LEARN.<br />SHIP.</h2>
            <p className="section-copy anim-fade-up">
              Self-taught full-stack developer focused on turning real business
              problems into working software. I like owning the full product —
              UI, APIs, databases, security and deployment.
            </p>
            <div className="step-list">
              {['Profile', 'Stack', 'Mindset'].map((label, i) => (
                <div
                  key={i}
                  className={`step${aboutIdx === i ? ' active' : ''}`}
                  data-about-step={i}
                >
                  <span className="step-num">0{i + 1}</span>
                  <span className="step-text">{label}</span>
                </div>
              ))}
            </div>
            <div className="about-line" />
          </div>

          <div className="about-right">
            {/* Panel 0 — Profile */}
            <article
              className={`about-panel${aboutIdx === 0 ? ' active' : ''}`}
              data-about-panel="0"
              data-num="01"
            >
              <span className="section-kicker">Profile</span>
              <h3 className="anim-fade-up">End-to-end<br />developer.</h3>
              <p className="anim-fade-up">
                I build complete applications rather than isolated UI screens:
                frontend, REST APIs, database architecture, authentication,
                AI integration and production deployment.
              </p>
            </article>

            {/* Panel 1 — Stack */}
            <article
              className={`about-panel${aboutIdx === 1 ? ' active' : ''}`}
              data-about-panel="1"
              data-num="02"
            >
              <span className="section-kicker">Stack</span>
              <h3 className="anim-fade-up">JavaScript<br />at the core.</h3>
              <p className="anim-fade-up">
                React, Next.js, Node.js, Express, TypeScript, MongoDB and modern
                AI APIs form my main stack.
              </p>
              <div className="mini-grid">
                {['React / Next.js', 'Node / Express', 'TypeScript', 'MongoDB', 'Gemini API', 'REST / JWT / RBAC'].map(t => (
                  <div className="mini-tag" key={t}>{t}</div>
                ))}
              </div>
            </article>

            {/* Panel 2 — Mindset */}
            <article
              className={`about-panel${aboutIdx === 2 ? ' active' : ''}`}
              data-about-panel="2"
              data-num="03"
            >
              <span className="section-kicker">Mindset</span>
              <h3 className="anim-fade-up">Learn by<br />building.</h3>
              <p className="anim-fade-up">
                I prefer solving real problems, breaking systems into smaller
                pieces and learning whatever the project needs next.
              </p>
            </article>
          </div>
        </div>

        {/* ── MOBILE LAYOUT (non-sticky, pure flow) ── */}
        <div className="about-mobile-wrap">
          <div className="about-mob-header">
            <p className="about-mob-eyebrow">01 — About</p>
            <h2 className="about-mob-title">BUILD.<br />LEARN.<br />SHIP.</h2>
            <p className="about-mob-copy">
              Self-taught full-stack developer turning real business problems
              into working software — UI, APIs, databases &amp; deployment.
            </p>
          </div>
          <div className="about-mob-panels">
            {aboutPanels.map((panel, i) => (
              <article key={i} className="about-mob-panel">
                <span className="about-mob-panel-kicker">{panel.kicker}</span>
                <h3>{panel.title}</h3>
                <p>{panel.body}</p>
                {panel.grid && (
                  <div className="mob-mini-grid">
                    {panel.grid.map(t => (
                      <div className="mob-mini-tag" key={t}>{t}</div>
                    ))}
                  </div>
                )}
                <span className="about-mob-panel-ghost">{panel.num}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="sticky-section" ref={projectsRef}>
        
        {/* DESKTOP (Sticky text-swapping scroll) */}
        <div className="sticky-inner projects-sticky projects-desktop">
          <div className="project-bg" id="projectBg" style={{ background: data.bg }} />

          <div className="project-content">
            <div className="project-card" ref={projectCardRef}>
              <div className="project-number">{data.number}</div>
              <div className="project-kicker-pill">{data.kicker}</div>
              <h2 className="project-title" style={{ whiteSpace: 'pre-line' }}>{data.title}</h2>
              <p className="project-sub">{data.desc}</p>

              <div className="project-stack">
                {data.stack.map(tag => (
                  <span className="stack-tag" key={tag}>{tag}</span>
                ))}
              </div>

              <div className="project-links">
                {data.live && (
                  <a className="project-link live-link" href={data.live} target="_blank" rel="noreferrer">
                    Visit Live ↗
                  </a>
                )}
                {data.github && (
                  <a className="project-link" href={data.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* side dot nav */}
          <div className="project-side">
            {sideLabels.map((label, i) => (
              <div
                key={i}
                className={`project-dot-item${projectIdx === i ? ' active' : ''}`}
                data-project-step={i}
              >
                <span className="project-dot-label">{label}</span>
                <span className="project-dot" />
              </div>
            ))}
          </div>

          {/* progress bar */}
          <div className="project-bar">
            <div className="project-bar-fill" ref={projectBarRef} />
          </div>
        </div>

        {/* MOBILE (Sticky Card Stack) */}
        <div className="projects-stack-container projects-mobile">
          {projectData.map((pd, i) => (
            <div
              className="project-card-wrapper"
              key={pd.title}
              style={{ '--idx': i } as React.CSSProperties}
            >
              <div className="project-stack-card" style={{ background: pd.bg }}>
                <div className="project-number">{pd.number}</div>
                <div className="project-kicker-pill">{pd.kicker}</div>
                <h2 className="project-title" style={{ whiteSpace: 'pre-line' }}>{pd.title}</h2>
                <p className="project-sub">{pd.desc}</p>
                
                <div className="project-stack">
                  {pd.stack.map(tag => (
                    <span className="stack-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  {pd.live && (
                    <a className="project-link live-link" href={pd.live} target="_blank" rel="noreferrer">
                      Visit Live ↗
                    </a>
                  )}
                  {pd.github && (
                    <a className="project-link" href={pd.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="sticky-section" ref={contactRef}>
        <div className="sticky-inner contact-sticky">
          <div className="contact-track" ref={contactTrackRef}>

            <article className="contact-panel">
              <p className="section-kicker anim-scale" style={{ color: '#555' }}>01 — Contact</p>
              <h2 className="contact-big anim-flip">LET&apos;S<br />BUILD.</h2>
              <p className="anim-scale">
                Have a product idea, freelance requirement or junior developer
                opportunity? I am open to building useful software with a team.
              </p>
              <a className="contact-email anim-scale" href="mailto:roygraves606@gmail.com">
                roygraves606@gmail.com
              </a>
            </article>

            <article className="contact-panel">
              <p className="section-kicker anim-scale" style={{ color: '#555' }}>02 — Connect</p>
              <h2 className="contact-big anim-flip">FIND<br />ME.</h2>
              <p className="anim-scale">
                Explore my projects, source code and professional profile.
              </p>
              <div className="contact-details anim-scale">
                <a className="contact-box" href="https://github.com/RoyGraves606" target="_blank" rel="noreferrer">
                  <strong>GitHub</strong>github.com/RoyGraves606
                </a>
                <a className="contact-box" href="https://www.linkedin.com/in/thamizh606" target="_blank" rel="noreferrer">
                  <strong>LinkedIn</strong>linkedin.com/in/thamizh606
                </a>
                <a className="contact-box" href="https://th.vercel.app" target="_blank" rel="noreferrer">
                  <strong>Portfolio</strong>th.vercel.app
                </a>
              </div>
            </article>

            <article className="contact-panel">
              <p className="section-kicker anim-scale" style={{ color: '#555' }}>03 — Next</p>
              <h2 className="contact-big anim-flip">MAKE<br />IT REAL.</h2>
              <p className="anim-scale">
                From a rough idea to a deployed application — let&apos;s turn the
                problem into a system that people can actually use.
              </p>
              <a className="contact-email anim-scale" href="mailto:roygraves606@gmail.com">
                Start a conversation →
              </a>
            </article>

          </div>

          <div className="contact-nav">
            <span ref={contactCounterRef}>01 / 03</span>
          </div>
          <div className="contact-progress">
            <div className="contact-fill" ref={contactFillRef} />
          </div>
        </div>
      </section>
    </>
  )
}
