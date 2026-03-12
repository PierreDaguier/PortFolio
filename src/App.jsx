import { useEffect, useRef, useState } from 'react';
import truffleLogo from './img/truffle.png';
import javascriptLogo from './img/skills/javascript.svg';
import typescriptLogo from './img/skills/typescript.svg';
import pythonLogo from './img/skills/python.svg';
import goLogo from './img/skills/go.svg';
import reactLogo from './img/skills/react.svg';
import vueLogo from './img/skills/vuedotjs.svg';
import flutterLogo from './img/skills/flutter.svg';
import graphqlLogo from './img/skills/graphql.svg';
import solidityLogo from './img/skills/solidity.svg';
import mariadbLogo from './img/skills/mariadb.svg';
import postgresqlLogo from './img/skills/postgresql.svg';
import mongodbLogo from './img/skills/mongodb.svg';
import rabbitmqLogo from './img/skills/rabbitmq.svg';
import dockerLogo from './img/skills/docker.svg';
import jenkinsLogo from './img/skills/jenkins.svg';
import n8nLogo from './img/skills/n8n.svg';
import openapiLogo from './img/skills/openapiinitiative.svg';
import prometheusLogo from './img/skills/prometheus.svg';
import grafanaLogo from './img/skills/grafana.svg';
import linuxLogo from './img/skills/linux.svg';
import apacheLogo from './img/skills/apache.svg';
import nginxLogo from './img/skills/nginx.svg';
import nessusLogo from './img/skills/nessus.svg';
import eprintLogo from './img/skills/eprint.svg';
import gmailIcon from './img/contact/gmail.svg';
import linkedinIcon from './img/contact/linkedin.svg';
import githubIcon from './img/contact/github.svg';

const journeyItems = [
  {
    company: 'James Cook University',
    role: 'Senior Software Engineer · Research Team',
    period: '2.5 years',
    place: 'Townsville, Australia',
    bullets: [
      'Built and maintained research-facing systems supporting thesis and publication workflows.',
      'Delivered EPrint and SQL-backed capabilities for reliable academic data management and retrieval.',
      'Collaborated with researchers and stakeholders to translate complex research requirements into robust software.'
    ]
  },
  {
    company: 'UI Enlyte',
    role: 'Blockchain / Full-Stack Developer',
    period: '2 years',
    place: 'Frankfurt am Main, Germany',
    bullets: [
      'Developed full-stack product features across frontend, backend, and blockchain integrations.',
      'Built smart-contract and web application workflows focused on production readiness.',
      'Contributed to product delivery speed with clean architecture and clear implementation standards.'
    ]
  }
];

const logoRows = [
  {
    title: 'Languages & Frameworks',
    reverse: false,
    items: [
      { name: 'JavaScript', asset: javascriptLogo },
      { name: 'TypeScript', asset: typescriptLogo },
      { name: 'Python', asset: pythonLogo },
      { name: 'Golang', asset: goLogo },
      { name: 'ReactJS', asset: reactLogo },
      { name: 'VueJS', asset: vueLogo },
      { name: 'Flutter', asset: flutterLogo },
      { name: 'GraphQL', asset: graphqlLogo },
      { name: 'Solidity', asset: solidityLogo },
      { name: 'Truffle', asset: truffleLogo }
    ]
  },
  {
    title: 'Backend, Data, DevOps & Reliability',
    reverse: true,
    items: [
      { name: 'MariaDB', asset: mariadbLogo },
      { name: 'PostgreSQL', asset: postgresqlLogo },
      { name: 'MongoDB', asset: mongodbLogo },
      { name: 'RabbitMQ', asset: rabbitmqLogo },
      { name: 'Docker', asset: dockerLogo },
      { name: 'Jenkins', asset: jenkinsLogo },
      { name: 'n8n', asset: n8nLogo },
      { name: 'OpenAPI', asset: openapiLogo },
      { name: 'Prometheus', asset: prometheusLogo },
      { name: 'Grafana', asset: grafanaLogo },
      { name: 'Linux', asset: linuxLogo },
      { name: 'Apache', asset: apacheLogo },
      { name: 'Nginx', asset: nginxLogo },
      { name: 'Nessus', asset: nessusLogo },
      { name: 'EPrint', asset: eprintLogo }
    ]
  }
];

const logoSource = (logo) => logo.asset || FALLBACK_LOGO;
const logoId = (logo) => logo.slug || logo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const FALLBACK_LOGO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><circle cx='12' cy='12' r='9' fill='%2348ff82'/></svg>";
const HERO_TYPEWRITER_TITLES = [
  'Full-stack engineer',
  'Automation engineer',
  'Blockchain engineer',
  'DevOps / Cybersecurity engineer'
];

const projects = [
  {
    title: 'Event-Driven Automation Platform',
    label: 'Automation',
    summary:
      'Client-facing B2B workflow automation demo with secure webhook ingestion, rule engine, retries with DLQ, and observability-ready operations dashboard.',
    tech: ['Next.js', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'RabbitMQ', 'OpenTelemetry'],
    demoUrl: null,
    repoUrl: 'https://github.com/PierreDaguier/event-driven-automation-platform'
  },
  {
    title: 'Production-Ready Go Service Template',
    label: 'Backend',
    summary:
      'Go microservice template built with clean architecture, auth, rate limiting, observability, and an operations control panel for stakeholder visibility.',
    tech: ['Go', 'React', 'Vite', 'Prometheus', 'Grafana', 'Tempo', 'Loki', 'Docker'],
    demoUrl: null,
    repoUrl: 'https://github.com/PierreDaguier/go-service-template-pro'
  },
  {
    title: 'Observability Command Center Demo',
    label: 'Observability',
    summary:
      'Premium command center for logs-metrics-traces correlation, incident timeline, and replay scenarios, designed for fast non-technical stakeholder understanding.',
    tech: ['React', 'TypeScript', 'Fastify', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Loki', 'Tempo'],
    demoUrl: null,
    repoUrl: 'https://github.com/PierreDaguier/observability-command-center-demo'
  },
  {
    title: 'AI Automation Command Center',
    label: 'AI Agents',
    summary:
      'Enterprise-focused automation platform combining n8n orchestration, AI agent execution, human-in-the-loop approvals, and audit-ready operation tracking.',
    tech: ['n8n', 'Next.js', 'TypeScript', 'Python', 'PostgreSQL', 'Redis', 'OpenTelemetry', 'Docker'],
    demoUrl: null,
    repoUrl: 'https://github.com/PierreDaguier/ai-automation-command-center'
  }
];

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let frameId = null;
    let width = 0;
    let height = 0;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = reducedMotion ? 45 : 140;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.00055 + 0.0001,
      drift: (Math.random() - 0.5) * 0.00028
    }));

    const resize = () => {
      width = window.innerWidth;
      height = Math.max(document.body.scrollHeight, window.innerHeight);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      const yShift = window.scrollY * 0.05;

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += particle.drift;

        if (particle.y < -0.02) {
          particle.y = 1.02;
          particle.x = Math.random();
        }

        if (particle.x < -0.02) {
          particle.x = 1.02;
        }

        if (particle.x > 1.02) {
          particle.x = -0.02;
        }

        const px = particle.x * width;
        const py = particle.y * height + yShift;

        context.beginPath();
        context.fillStyle = `rgba(72, 255, 130, ${particle.alpha})`;
        context.shadowColor = 'rgba(72, 255, 130, 0.58)';
        context.shadowBlur = particle.size * 4.5;
        context.arc(px, py, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener('resize', resize);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}

function App() {
  const [typingState, setTypingState] = useState({
    phraseIndex: 0,
    charCount: 0,
    deleting: false,
    reducedMotion: false
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTypingState((previous) => ({
      ...previous,
      reducedMotion,
      charCount: reducedMotion ? HERO_TYPEWRITER_TITLES[0].length : 0
    }));
  }, []);

  useEffect(() => {
    if (typingState.reducedMotion) {
      return undefined;
    }

    const currentPhrase = HERO_TYPEWRITER_TITLES[typingState.phraseIndex];
    const isPhraseComplete = typingState.charCount >= currentPhrase.length;
    const isPhraseEmpty = typingState.charCount <= 0;
    let timeoutId;

    if (!typingState.deleting && isPhraseComplete) {
      timeoutId = window.setTimeout(() => {
        setTypingState((previous) => ({ ...previous, deleting: true }));
      }, 1500);
    } else if (typingState.deleting && isPhraseEmpty) {
      timeoutId = window.setTimeout(() => {
        setTypingState((previous) => ({
          ...previous,
          deleting: false,
          phraseIndex: (previous.phraseIndex + 1) % HERO_TYPEWRITER_TITLES.length
        }));
      }, 320);
    } else {
      const delta = typingState.deleting ? -1 : 1;
      const speed = typingState.deleting ? 40 : 78;

      timeoutId = window.setTimeout(() => {
        setTypingState((previous) => ({
          ...previous,
          charCount: previous.charCount + delta
        }));
      }, speed);
    }

    return () => window.clearTimeout(timeoutId);
  }, [typingState]);

  const currentPhrase = HERO_TYPEWRITER_TITLES[typingState.phraseIndex];
  const typedSubtitle = typingState.reducedMotion
    ? HERO_TYPEWRITER_TITLES[0]
    : currentPhrase.slice(0, typingState.charCount);

  return (
    <div className="site">
      <ParticleField />
      <div className="vignette" aria-hidden="true" />

      <header className="nav-shell">
        <a href="#home" className="logo">Pierre Daguier</a>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#journey">Journey</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero panel">
          <p className="eyebrow">Senior Software Engineer</p>
          <h1>
            Hi, I am <span>Pierre Daguier</span>
          </h1>
          <p className="hero-subtitle typewriter" aria-live="polite">
            <span>{typedSubtitle}</span>
            <span
              className={`typewriter-cursor ${typingState.reducedMotion ? 'typewriter-cursor-hidden' : ''}`}
              aria-hidden="true"
            >
              |
            </span>
          </p>
          <p className="hero-text">
            4+ years across enterprise software engineering, blockchain products, and production-grade platform delivery.
          </p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#contact">Get in touch</a>
            <a className="btn btn-outline" href="#projects">See projects</a>
          </div>
          <div className="stats">
            <div>
              <strong>4+</strong>
              <span>Years Experience</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Long-Term Roles</span>
            </div>
            <div>
              <strong>4</strong>
              <span>Flagship Projects</span>
            </div>
          </div>
        </section>

        <section id="journey" className="panel section">
          <h2>My <span>Journey</span></h2>
          {journeyItems.map((item) => (
            <article className="timeline-card" key={item.company}>
              <div className="timeline-head">
                <h3>{item.company}</h3>
                <p className="timeline-role">{item.role}</p>
                <div className="meta-row">
                  <span>{item.period}</span>
                  <span>{item.place}</span>
                </div>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="skills" className="panel section">
          <h2>My <span>Skillset</span></h2>
          <p className="skills-intro">Core technologies used in production delivery, architecture, and operations.</p>
          <div className="logo-marquee" aria-label="Technology logos marquee">
            {logoRows.map((row) => (
              <div className="logo-row-group" key={row.title}>
                <p className="logo-row-label">{row.title}</p>
                <div className="logo-row-mask">
                  <div className={`logo-row-track ${row.reverse ? 'logo-row-track-reverse' : ''}`}>
                    {[...row.items, ...row.items].map((logo, index) => (
                      <span className="logo-badge" key={`${logoId(logo)}-${index}`}>
                        <img
                          src={logoSource(logo)}
                          alt={`${logo.name} logo`}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = FALLBACK_LOGO;
                          }}
                        />
                        <span>{logo.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="panel section">
          <h2>Featured <span>Projects</span></h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <header>
                  <h3>{project.title}</h3>
                  <span className="pill">{project.label}</span>
                </header>
                <p>{project.summary}</p>
                <div className="chip-wrap">
                  {project.tech.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-solid">Live demo</a>
                  ) : null}
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className={project.demoUrl ? 'btn btn-outline' : 'btn btn-solid'}>
                    Repository
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="panel section">
          <h2>Get <span>In Touch</span></h2>
          <div className="contact-grid">
            <form className="contact-form" action="https://formspree.io/f/mjvdlkbw" method="POST">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" placeholder="Your name" required />

              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" placeholder="your.email@example.com" required />

              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" placeholder="Project scope" />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" placeholder="What are you building?" required />

              <button type="submit" className="btn btn-solid">Send message</button>
            </form>

            <aside className="contact-links-panel">
              <a href="mailto:pierredaguier@gmail.com">
                <div className="contact-link-head">
                  <span className="contact-icon" aria-hidden="true">
                    <img
                      src={gmailIcon}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = FALLBACK_LOGO;
                      }}
                    />
                  </span>
                  <h3>Gmail</h3>
                </div>
                <p>pierredaguier@gmail.com</p>
              </a>
              <a href="https://www.linkedin.com/in/pierre-daguier/" target="_blank" rel="noreferrer">
                <div className="contact-link-head">
                  <span className="contact-icon" aria-hidden="true">
                    <img
                      src={linkedinIcon}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = FALLBACK_LOGO;
                      }}
                    />
                  </span>
                  <h3>LinkedIn</h3>
                </div>
                <p>Connect professionally</p>
              </a>
              <a href="https://github.com/PierreDaguier" target="_blank" rel="noreferrer">
                <div className="contact-link-head">
                  <span className="contact-icon" aria-hidden="true">
                    <img
                      src={githubIcon}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = FALLBACK_LOGO;
                      }}
                    />
                  </span>
                  <h3>GitHub</h3>
                </div>
                <p>Explore code and projects</p>
              </a>
            </aside>
          </div>
        </section>
      </main>
      <footer className="site-footer panel">
        <div className="site-footer-inner">
          <p className="footer-main">Pierre Daguier · Senior Software Engineer</p>
          <p className="footer-sub">Research-grade systems, automation platforms, and production-ready product delivery.</p>
          <div className="footer-links">
            <a href="mailto:pierredaguier@gmail.com">Gmail</a>
            <a href="https://www.linkedin.com/in/pierre-daguier/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/PierreDaguier" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Pierre Daguier</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
