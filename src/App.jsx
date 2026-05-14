import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Projects', value: '25+' },
  { label: 'Skills', value: '30+' },
  { label: 'Certifications', value: '10+' },
  { label: 'Technologies', value: '18+' },
]

const journey = [
  { year: '2020', title: 'Started Java Foundations' },
  { year: '2022', title: 'Built Full Stack Deployments' },
  { year: '2024', title: 'Integrated AI Workflows' },
  { year: 'Now', title: 'Engineering Premium Digital Systems' },
]

const skills = [
  { name: 'Java', proficiency: 95 },
  { name: 'Spring Boot', proficiency: 92 },
  { name: 'React', proficiency: 90 },
  { name: 'PostgreSQL', proficiency: 88 },
  { name: 'AWS', proficiency: 86 },
  { name: 'Docker', proficiency: 85 },
  { name: 'GitHub', proficiency: 90 },
  { name: 'AI/ML', proficiency: 84 },
  { name: 'Full Stack Development', proficiency: 93 },
]

const projects = [
  {
    title: 'NeuroFlow Commerce Engine',
    stack: 'Java • Spring Boot • PostgreSQL • AWS',
    description: 'AI-driven commerce backend with predictive recommendations, secure APIs, and real-time analytics.',
    github: 'https://github.com/pillyigshankar/ExamplePortfolio',
    demo: '#contact',
  },
  {
    title: 'Sentinel Ops Dashboard',
    stack: 'React • Node • Docker • GitHub Actions',
    description: 'Mission-control observability UI with anomaly alerts, latency heatmaps, and role-based command views.',
    github: 'https://github.com/pillyigshankar/ExamplePortfolio',
    demo: '#contact',
  },
  {
    title: 'Astra Talent Graph',
    stack: 'Full Stack • AI/ML • Vector Search',
    description: 'Recruiter-focused intelligence platform for semantic skill matching and profile scoring automation.',
    github: 'https://github.com/pillyigshankar/ExamplePortfolio',
    demo: '#contact',
  },
]

const experiences = [
  'Shipped enterprise-grade Java microservices with resilient distributed architecture.',
  'Designed modern frontend systems with reusable components and accessibility-first UX.',
  'Automated CI/CD pipelines and cloud deployments for fast, reliable releases.',
  'Prototyped AI-powered product features with measurable performance gains.',
]

const certifications = ['AWS Certified Developer', 'Oracle Java Professional', 'Docker Certified Associate', 'Full Stack Web Development']

const commandResponses = {
  'Tell me about this developer': 'Elite software engineer focused on human-centric AI systems, Java backend excellence, and premium full stack execution.',
  'Show backend projects': 'Displaying backend modules: NeuroFlow Commerce Engine, Real-Time Event Processor, Secure API Gateway.',
  'Display AI projects': 'Displaying AI modules: Astra Talent Graph, Smart Recommendation System, Predictive Incident Analyzer.',
  'List technical skills': 'Java, Spring Boot, React, PostgreSQL, AWS, Docker, CI/CD, GitHub, AI/ML, full stack product engineering.',
}

const commands = Object.keys(commandResponses)

const sectionVariant = {
  hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65 } },
}

function TypewriterResponse({ text }) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      index += 1
      setTyped(text.slice(0, index))
      if (index >= text.length) clearInterval(timer)
    }, 16)

    return () => clearInterval(timer)
  }, [text])

  return <p className="mt-2 min-h-16">{typed}</p>
}

function AnimatedSection({ id, title, subtitle, children }) {
  return (
    <motion.section
      id={id}
      className="relative mx-auto w-full max-w-6xl px-4 py-14 md:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariant}
    >
      <div className="mb-7">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">{subtitle}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}

function ProjectCard({ project }) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })

  return (
    <motion.article
      whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onMouseMove={(event) => {
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
        setSpotlight({ x: ((event.clientX - left) / width) * 100, y: ((event.clientY - top) / height) * 100 })
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl"
      style={{ backgroundImage: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(0,220,255,0.2), rgba(12,12,28,0.9) 55%)` }}
    >
      <div className="mb-5 h-36 rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/20 via-blue-600/20 to-purple-500/20 shadow-[0_0_35px_rgba(0,180,255,0.2)]" />
      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
      <p className="mt-2 text-sm text-cyan-200">{project.stack}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-200">{project.description}</p>
      <div className="mt-5 flex gap-3">
        <a className="rounded-xl border border-cyan-300/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 transition hover:shadow-[0_0_20px_rgba(34,211,238,.5)]" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>
          GitHub
        </a>
        <a className="rounded-xl border border-purple-300/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-100 transition hover:shadow-[0_0_20px_rgba(216,180,254,.5)]" href={project.demo} aria-label={`${project.title} Live Demo`}>
          Live Demo
        </a>
      </div>
    </motion.article>
  )
}

function App() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [currentCommand, setCurrentCommand] = useState(commands[0])
  const [messageSent, setMessageSent] = useState(false)

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        delay: `${(index % 7) * 0.9}s`,
        duration: `${8 + (index % 6)}s`,
      })),
    [],
  )

  useEffect(() => {
    const handleMove = (event) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060b] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(19,26,45,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(19,26,45,0.55)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,174,255,0.22),transparent_34%),radial-gradient(circle_at_82%_14%,rgba(149,76,233,0.2),transparent_38%)]" />
      <div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/35 blur-3xl"
        style={{ left: cursor.x, top: cursor.y, width: 220, height: 220 }}
      />

      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="particle"
            style={{ left: particle.left, animationDelay: particle.delay, animationDuration: particle.duration }}
          />
        ))}
      </div>

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-6 md:px-8">
        <p className="text-sm font-semibold tracking-[0.3em] text-cyan-300">ANTIGRAVITY.OS</p>
        <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-cyan-200">
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-center px-4 pb-10 pt-8 md:px-8">
          <motion.p
            className="mb-4 w-fit rounded-full border border-cyan-200/30 bg-cyan-400/10 px-4 py-2 text-xs tracking-[0.3em] text-cyan-200"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            AI OPERATING PORTFOLIO
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-7xl"
          >
            Designing Intelligent Systems That Feel Human.
          </motion.h1>
          <p className="mt-5 text-lg text-cyan-100/90 md:text-2xl">Java Developer • AI Systems Enthusiast • Full Stack Engineer</p>

          <div className="mt-8 rounded-2xl border border-cyan-300/30 bg-black/50 p-5 font-mono text-sm text-cyan-100 shadow-[0_0_35px_rgba(0,183,255,0.35)] backdrop-blur-xl">
            <p>&gt; initializing neural systems...</p>
            <p className="mt-1">&gt; loading developer profile...</p>
            <p className="mt-1 text-green-300">&gt; AI portfolio online</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="rounded-xl border border-cyan-200/45 bg-cyan-300/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(34,211,238,.55)]">
              View Projects
            </a>
            <a href="#contact" className="rounded-xl border border-purple-300/50 bg-purple-400/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-purple-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(192,132,252,.55)]">
              Download Resume
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {['Java', 'Spring', 'React', 'AWS', 'AI'].map((icon, index) => (
              <motion.div
                key={icon}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 + index * 0.4 }}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-100 shadow-[0_0_20px_rgba(91,192,255,.35)] backdrop-blur-md"
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </section>

        <AnimatedSection id="about" title="About" subtitle="Identity Module">
          <div className="grid gap-4 md:grid-cols-5">
            <article className="glass-card md:col-span-2">
              <div className="mx-auto h-44 w-44 rounded-3xl border border-cyan-200/40 bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-purple-600/30 shadow-[0_0_30px_rgba(59,130,246,.45)]" />
              <p className="mt-5 text-sm leading-relaxed text-slate-200">
                I build secure, scalable digital products where AI capability meets elegant user experience. My engineering style blends backend rigor with cinematic frontend craft.
              </p>
            </article>
            <article className="glass-card md:col-span-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-cyan-200">{stat.value}</p>
                  </div>
                ))}
              </div>
              <ol className="mt-5 space-y-3">
                {journey.map((step) => (
                  <li key={step.year} className="timeline-node">
                    <span className="text-cyan-200">{step.year}</span>
                    <span className="text-slate-100">{step.title}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </AnimatedSection>

        <AnimatedSection id="skills" title="Skills" subtitle="Capability Matrix">
          <div className="grid gap-4 md:grid-cols-3">
            {skills.map((skill) => (
              <article key={skill.name} className="group rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl transition hover:border-cyan-300/40">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{skill.name}</p>
                  <span className="text-xs text-cyan-200">{skill.proficiency}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-900/80">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                  />
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects" title="Projects" subtitle="AI Module Showcase">
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="experience" title="Experience" subtitle="System Logs">
          <div className="relative space-y-5 pl-8">
            <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-blue-400 to-purple-500" />
            {experiences.map((experience, index) => (
              <article key={experience} className="glass-card relative">
                <span className="absolute -left-8 top-7 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,1)]" />
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Log {String(index + 1).padStart(2, '0')}</p>
                <p className="mt-2 text-slate-100">{experience}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="certifications" title="Certifications" subtitle="Certificate Vault">
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((certification) => (
              <article key={certification} className="rounded-2xl border border-purple-200/30 bg-gradient-to-br from-purple-500/10 to-cyan-400/10 p-5 transition hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(168,85,247,.4)]">
                <p className="text-sm font-medium tracking-[0.14em] text-purple-100">{certification}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="assistant" title="AI Assistant" subtitle="Command Interface">
          <div className="glass-card">
            <div className="flex flex-wrap gap-2">
              {commands.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => setCurrentCommand(command)}
                  className={`rounded-lg border px-3 py-2 text-xs transition ${currentCommand === command ? 'border-cyan-200/80 bg-cyan-300/20 text-cyan-100' : 'border-white/20 bg-white/5 text-slate-300 hover:border-cyan-300/40'}`}
                >
                  {command}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-cyan-300/30 bg-black/40 p-4 font-mono text-sm leading-relaxed text-cyan-100">
              <p className="text-cyan-300">&gt; {currentCommand}</p>
              <TypewriterResponse key={currentCommand} text={commandResponses[currentCommand]} />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" title="Contact" subtitle="Communication Terminal">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="glass-card space-y-3">
              {[
                { label: 'GitHub', href: 'https://github.com/pillyigshankar' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
                { label: 'Email', href: 'mailto:hello@antigravity.dev' },
                { label: 'LeetCode', href: 'https://leetcode.com/' },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="block rounded-xl border border-cyan-200/30 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-100 transition hover:shadow-[0_0_20px_rgba(34,211,238,.4)]">
                  {link.label}
                </a>
              ))}
            </article>
            <form
              className="glass-card space-y-3"
              onSubmit={(event) => {
                event.preventDefault()
                setMessageSent(true)
              }}
            >
              <input className="terminal-input" type="text" placeholder="Your Name" />
              <input className="terminal-input" type="email" placeholder="Your Email" />
              <textarea className="terminal-input min-h-32" placeholder="Message" />
              <button type="submit" className="w-full rounded-xl border border-cyan-200/40 bg-cyan-400/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:shadow-[0_0_20px_rgba(34,211,238,.5)]">
                Transmit Message
              </button>
              {messageSent ? <p className="text-xs text-green-300">Transmission received. Response channel active.</p> : null}
            </form>
          </div>
        </AnimatedSection>
      </main>

      <footer className="relative mx-auto mt-6 w-full max-w-6xl border-t border-cyan-300/20 px-4 py-6 md:px-8">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        <div className="flex flex-col justify-between gap-3 text-sm text-slate-300 md:flex-row">
          <p className="tracking-[0.2em] text-cyan-200">ANTIGRAVITY.OS</p>
          <p>AI Portfolio System Active</p>
        </div>
      </footer>
    </div>
  )
}

export default App
