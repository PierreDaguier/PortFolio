import { useEffect, useRef, useState } from 'react';
import truffleLogo from './img/skills/truffle.svg';
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
  'API integration engineer',
  'DevOps / Cybersecurity engineer'
];
const CYBER_WATCH_ENDPOINT = '/.netlify/functions/cyber-watch';

const severityClassName = (severity) => {
  const value = String(severity || '').toLowerCase();
  if (value.includes('critical') || value.includes('exploited')) {
    return 'severity-critical';
  }
  if (value.includes('high')) {
    return 'severity-high';
  }
  if (value.includes('medium')) {
    return 'severity-medium';
  }
  if (value.includes('low')) {
    return 'severity-low';
  }
  return 'severity-info';
};

const DISCOVERY_CALL_URL = 'mailto:pierredaguier@gmail.com?subject=Discovery%20Call%20Request';

const serviceOfferings = [
  {
    title: 'Backend & API Integrations',
    problem: 'Your product has data silos, fragile endpoints, and delivery pressure.',
    outcome: 'Production-grade APIs, resilient integration flows, and maintainable service contracts.',
    timeframe: 'Typical delivery: 1-3 weeks for scoped milestones.'
  },
  {
    title: 'Automation Workflows (n8n + AI Agents)',
    problem: 'High-value operations are still manual, slow, and error-prone.',
    outcome: 'Automated workflows with human approvals, audit logs, and reliable execution paths.',
    timeframe: 'Typical delivery: 1-2 weeks for first operational workflow.'
  },
  {
    title: 'Observability & Reliability',
    problem: 'Incidents take too long to triage and impact is hard to explain.',
    outcome: 'Metrics, logs, traces, and alert narratives that speed up decision-making.',
    timeframe: 'Typical delivery: 1-2 weeks for actionable visibility baseline.'
  }
];

const caseStudies = [
  {
    title: 'Event-Driven Automation Platform',
    label: 'Automation',
    context: 'Needed secure webhook ingestion and asynchronous processing for bursty B2B workflows.',
    delivered: 'Built signed webhooks, idempotent event handling, queue workers, retry/backoff, and DLQ safeguards.',
    impact: [
      'Demonstrated resilient processing paths with explicit failure recovery.',
      'Operational run states become traceable instead of opaque background jobs.',
      'Demo flow reduces manual reprocessing steps from multi-step triage to one replay path.'
    ],
    tech: ['Next.js', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'RabbitMQ', 'OpenTelemetry'],
    links: [
      { label: 'Repository', url: 'https://github.com/PierreDaguier/event-driven-automation-platform' },
      { label: 'Architecture', url: 'https://github.com/PierreDaguier/event-driven-automation-platform/blob/main/docs/ARCHITECTURE.md' },
      { label: 'Demo Script', url: 'https://github.com/PierreDaguier/event-driven-automation-platform/blob/main/docs/DEMO.md' }
    ]
  },
  {
    title: 'Production-Ready Go Service Template',
    label: 'Backend',
    context: 'Teams needed a reusable Go service base without compromising security or operability.',
    delivered: 'Implemented clean architecture, auth, rate limiting, telemetry, and an operations control panel.',
    impact: [
      'Accelerates project bootstrap from scratch to deployable baseline in one setup cycle.',
      'Provides consistent guardrails for API quality, reliability, and observability.',
      'Gives non-technical stakeholders a visual operations layer for faster status alignment.'
    ],
    tech: ['Go', 'React', 'Vite', 'Prometheus', 'Grafana', 'Tempo', 'Loki', 'Docker'],
    links: [
      { label: 'Repository', url: 'https://github.com/PierreDaguier/go-service-template-pro' },
      { label: 'Freelance Pitch', url: 'https://github.com/PierreDaguier/go-service-template-pro/blob/main/docs/pitch-freelance.md' },
      { label: 'Demo Script', url: 'https://github.com/PierreDaguier/go-service-template-pro/blob/main/docs/demo-script.md' }
    ]
  },
  {
    title: 'Observability Command Center Demo',
    label: 'Observability',
    context: 'Incident communication needed to work for both engineers and non-technical decision-makers.',
    delivered: 'Shipped correlation views for logs/metrics/traces, alert context, and replayable incident narratives.',
    impact: [
      'Turns telemetry noise into a clear incident storyline in minutes.',
      'Improves handoff quality between technical teams and business stakeholders.',
      'Demonstrates repeatable post-incident walkthroughs using curated scenarios.'
    ],
    tech: ['React', 'TypeScript', 'Fastify', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Loki', 'Tempo'],
    links: [
      { label: 'Repository', url: 'https://github.com/PierreDaguier/observability-command-center-demo' },
      { label: 'Architecture', url: 'https://github.com/PierreDaguier/observability-command-center-demo/blob/main/docs/architecture/command-center-architecture.svg' },
      { label: 'Client Walkthrough', url: 'https://github.com/PierreDaguier/observability-command-center-demo/blob/main/docs/demo/client-walkthrough-7min.md' }
    ]
  },
  {
    title: 'AI Automation Command Center',
    label: 'AI Agents',
    context: 'Automation needed governance: human approvals, traceability, and compliance-friendly records.',
    delivered: 'Orchestrated n8n workflows, AI-agent tasks, approval checkpoints, and audit-oriented event tracking.',
    impact: [
      'Creates auditable workflow histories instead of black-box agent actions.',
      'Adds explicit human-in-the-loop controls before high-impact operations.',
      'Demonstrates integration-ready architecture for enterprise automation rollouts.'
    ],
    tech: ['n8n', 'Next.js', 'TypeScript', 'Python', 'PostgreSQL', 'Redis', 'OpenTelemetry', 'Docker'],
    links: [
      { label: 'Repository', url: 'https://github.com/PierreDaguier/ai-automation-command-center' },
      { label: 'Walkthrough', url: 'https://github.com/PierreDaguier/ai-automation-command-center/blob/main/docs/walkthrough-7-minutes.md' },
      { label: 'Screenshots', url: 'https://github.com/PierreDaguier/ai-automation-command-center/tree/main/docs/media' }
    ]
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cyberRefreshKey, setCyberRefreshKey] = useState(0);
  const [cyberWatch, setCyberWatch] = useState({
    loading: true,
    error: '',
    articles: [],
    vulnerabilities: [],
    generatedAt: ''
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 920) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      return undefined;
    }

    const revealNodes = document.querySelectorAll('[data-reveal]');
    if (revealNodes.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const loadCyberWatch = async () => {
      setCyberWatch((previous) => ({
        ...previous,
        loading: true,
        error: ''
      }));

      try {
        const endpoint = cyberRefreshKey
          ? `${CYBER_WATCH_ENDPOINT}?refresh=${cyberRefreshKey}`
          : CYBER_WATCH_ENDPOINT;

        const response = await fetch(endpoint, {
          signal: abortController.signal,
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`Failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (!isMounted) {
          return;
        }

        setCyberWatch({
          loading: false,
          error: '',
          articles: Array.isArray(payload.articles) ? payload.articles.slice(0, 3) : [],
          vulnerabilities: Array.isArray(payload.vulnerabilities) ? payload.vulnerabilities.slice(0, 3) : [],
          generatedAt: payload.generatedAt || ''
        });
      } catch (error) {
        if (!isMounted || error.name === 'AbortError') {
          return;
        }

        setCyberWatch({
          loading: false,
          error: 'Cyber watch feed is temporarily unavailable.',
          articles: [],
          vulnerabilities: [],
          generatedAt: ''
        });
      }
    };

    loadCyberWatch();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [cyberRefreshKey]);

  const currentPhrase = HERO_TYPEWRITER_TITLES[typingState.phraseIndex];
  const typedSubtitle = typingState.reducedMotion
    ? HERO_TYPEWRITER_TITLES[0]
    : currentPhrase.slice(0, typingState.charCount);
  const hasArticleItems = cyberWatch.articles.length > 0;
  const hasVulnerabilityItems = cyberWatch.vulnerabilities.length > 0;

  return (
    <div className="site">
      <ParticleField />
      <div className="vignette" aria-hidden="true" />

      <header className="nav-shell">
        <a href="#home" className="logo">Pierre Daguier</a>
        <button
          type="button"
          className={`menu-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-nav"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>
        <nav id="primary-nav" className={`nav-links ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#case-studies" onClick={() => setMobileMenuOpen(false)}>Case Studies</a>
          <a href="#journey" onClick={() => setMobileMenuOpen(false)}>Journey</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#cyber-watch" onClick={() => setMobileMenuOpen(false)}>Cyber Watch</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero panel reveal" data-reveal>
          <p className="eyebrow">Senior Software Engineer · Freelance</p>
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
            Backend delivery, automation workflows, and reliability engineering for teams that need fast execution and
            dependable systems.
          </p>
          <div className="hero-actions">
            <a className="btn btn-solid" href={DISCOVERY_CALL_URL}>Book a discovery call</a>
            <a className="btn btn-outline" href="#case-studies">View case studies</a>
          </div>
          <div className="stats">
            <div>
              <strong className="stat-value stat-value-number">4+</strong>
              <span>Years in Production</span>
            </div>
            <div>
              <strong className="stat-value">Research + Product</strong>
              <span>Real-world delivery environments</span>
            </div>
            <div>
              <strong className="stat-value">AU + DE</strong>
              <span>Cross-region professional experience</span>
            </div>
          </div>
        </section>

        <section className="panel trust-strip reveal" data-reveal>
          <div className="trust-strip-head">
            <p className="eyebrow">Credibility Signals</p>
            <span className="availability-pill">Open to freelance projects · Typical reply &lt; 24h</span>
          </div>
          <div className="trust-grid">
            <article className="trust-card">
              <h3>Production Research Systems</h3>
              <p>
                James Cook University Research Team: software supporting research and thesis-oriented workflows
                with reliable data operations.
              </p>
            </article>
            <article className="trust-card">
              <h3>Product Delivery in Industry</h3>
              <p>
                UI Enlyte in Frankfurt: full-stack and blockchain-integrated product delivery under business timelines.
              </p>
            </article>
            <article className="trust-card">
              <h3>Proof-Backed Portfolio</h3>
              <p>
                Public repositories include architecture docs, demo scripts, workflow traces, and deployment-ready setups.
              </p>
            </article>
          </div>
        </section>

        <section id="services" className="panel section reveal" data-reveal>
          <h2>Services <span>I Deliver</span></h2>
          <p className="skills-intro">Clear scope, fast milestones, and outcomes aligned with real product constraints.</p>
          <div className="service-grid">
            {serviceOfferings.map((service, index) => (
              <article
                className="service-card reveal"
                data-reveal
                style={{ '--reveal-delay': `${index * 90}ms` }}
                key={service.title}
              >
                <h3>{service.title}</h3>
                <p><strong>Problem:</strong> {service.problem}</p>
                <p><strong>Outcome:</strong> {service.outcome}</p>
                <p className="service-time">{service.timeframe}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="panel section reveal" data-reveal>
          <h2>My <span>Journey</span></h2>
          {journeyItems.map((item) => (
            <article className="timeline-card reveal" data-reveal key={item.company}>
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

        <section id="skills" className="panel section reveal" data-reveal>
          <h2>My <span>Skillset</span></h2>
          <p className="skills-intro">Core technologies used in production delivery, architecture, and operations.</p>
          <div className="logo-marquee" aria-label="Technology logos marquee">
            {logoRows.map((row) => (
              <div className="logo-row-group reveal" data-reveal key={row.title}>
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

        <section id="case-studies" className="panel section reveal" data-reveal>
          <h2>Case <span>Studies</span></h2>
          <p className="skills-intro">Each project is presented as a client-style delivery case: context, solution, measurable impact.</p>
          <div className="project-grid">
            {caseStudies.map((project, index) => (
              <article
                className="project-card reveal"
                data-reveal
                style={{ '--reveal-delay': `${index * 90}ms` }}
                key={project.title}
              >
                <header>
                  <h3>{project.title}</h3>
                  <span className="pill">{project.label}</span>
                </header>
                <p className="case-context"><strong>Context:</strong> {project.context}</p>
                <p className="case-delivered"><strong>Delivered:</strong> {project.delivered}</p>
                <ul className="case-impact">
                  {project.impact.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="chip-wrap">
                  {project.tech.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
                <div className="proof-links">
                  {project.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="cyber-watch" className="panel section reveal" data-reveal>
          <h2>Cybersecurity <span>Watch</span></h2>
          <p className="cyber-watch-intro">
            Live snapshot with 3 recent cybersecurity media articles and 3 current vulnerability advisories.
          </p>
          <div className="cyber-watch-meta-row">
            <p className="cyber-watch-meta">
              {cyberWatch.loading
                ? 'Fetching latest advisories...'
                : cyberWatch.generatedAt
                  ? `Updated ${new Date(cyberWatch.generatedAt).toLocaleString('en-AU')}`
                  : 'Feed update timestamp unavailable'}
            </p>
            <button
              type="button"
              className="cyber-watch-refresh"
              onClick={() => setCyberRefreshKey(Date.now())}
              disabled={cyberWatch.loading}
            >
              {cyberWatch.loading ? 'Refreshing...' : 'Refresh feed'}
            </button>
          </div>
          {cyberWatch.error ? (
            <p className="cyber-watch-error">{cyberWatch.error}</p>
          ) : null}
          {!cyberWatch.loading && !cyberWatch.error && !hasArticleItems && !hasVulnerabilityItems ? (
            <p className="cyber-watch-empty">Feeds are reachable but returned no items in this refresh.</p>
          ) : null}
          <div className="cyber-watch-split">
            <div>
              <h3 className="cyber-watch-subheading">Recent Cybersecurity Articles</h3>
              <div className="cyber-watch-grid">
                {cyberWatch.articles.map((item) => (
                  <article className="cyber-watch-card" key={`${item.url}-${item.source}`}>
                    <header className="cyber-watch-card-head">
                      <h3>{item.title}</h3>
                      <span className="source-pill">{item.source || 'Media'}</span>
                    </header>
                    <p className="cyber-watch-summary">{item.summary}</p>
                    <footer className="cyber-watch-foot">
                      <span>
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString('en-CA')
                          : 'Unknown date'}
                      </span>
                      <a href={item.url} target="_blank" rel="noreferrer">Read</a>
                    </footer>
                  </article>
                ))}
                {!cyberWatch.loading && !hasArticleItems ? (
                  <article className="cyber-watch-card cyber-watch-card-empty">
                    <header className="cyber-watch-card-head">
                      <h3>No live articles this refresh</h3>
                      <span className="source-pill">Fallback</span>
                    </header>
                    <p className="cyber-watch-summary">
                      Media feeds can occasionally be rate-limited. Use the refresh button or check trusted sources directly.
                    </p>
                    <footer className="cyber-watch-foot">
                      <a href="https://thehackernews.com/" target="_blank" rel="noreferrer">The Hacker News</a>
                      <a href="https://www.bleepingcomputer.com/" target="_blank" rel="noreferrer">BleepingComputer</a>
                      <a href="https://krebsonsecurity.com/" target="_blank" rel="noreferrer">Krebs on Security</a>
                    </footer>
                  </article>
                ) : null}
              </div>
            </div>

            <div>
              <h3 className="cyber-watch-subheading">Recent Vulnerabilities</h3>
              <div className="cyber-watch-grid">
                {cyberWatch.vulnerabilities.map((item) => (
                  <article className="cyber-watch-card" key={`${item.id}-${item.source}`}>
                    <header className="cyber-watch-card-head">
                      <h3>{item.id}</h3>
                      <span className={`severity-pill ${severityClassName(item.severity)}`}>
                        {item.severity || 'Info'}
                      </span>
                    </header>
                    <p className="cyber-watch-title">{item.title}</p>
                    <p className="cyber-watch-summary">{item.summary}</p>
                    <footer className="cyber-watch-foot">
                      <span className="source-pill">{item.source || 'Feed'}</span>
                      <span>
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString('en-CA')
                          : 'Unknown date'}
                      </span>
                      <a href={item.url} target="_blank" rel="noreferrer">Details</a>
                    </footer>
                  </article>
                ))}
                {!cyberWatch.loading && !hasVulnerabilityItems ? (
                  <article className="cyber-watch-card cyber-watch-card-empty">
                    <header className="cyber-watch-card-head">
                      <h3>No live vulnerabilities this refresh</h3>
                      <span className="severity-pill severity-info">Fallback</span>
                    </header>
                    <p className="cyber-watch-summary">
                      Advisory APIs can temporarily throttle requests. Refresh, or open official vulnerability catalogs below.
                    </p>
                    <footer className="cyber-watch-foot">
                      <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank" rel="noreferrer">CISA KEV</a>
                      <a href="https://nvd.nist.gov/vuln/search" target="_blank" rel="noreferrer">NVD Search</a>
                    </footer>
                  </article>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="panel section reveal" data-reveal>
          <h2>Get <span>In Touch</span></h2>
          <p className="skills-intro">Share your scope, constraints, and target timeline. I usually reply within 24 hours.</p>
          <div className="contact-quick-actions">
            <a className="btn btn-solid" href={DISCOVERY_CALL_URL}>Book a 20-min discovery call</a>
            <a className="btn btn-outline" href="#case-studies">Review case studies first</a>
          </div>
          <div className="contact-grid">
            <form className="contact-form" action="https://formspree.io/f/mjvdlkbw" method="POST">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" placeholder="Your name" required />

              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" placeholder="your.email@example.com" required />

              <label htmlFor="projectType">Project Type</label>
              <select id="projectType" name="projectType" defaultValue="API Integration">
                <option>API Integration</option>
                <option>Automation Workflow</option>
                <option>Observability / Reliability</option>
                <option>Other</option>
              </select>

              <label htmlFor="message">Project Brief</label>
              <textarea id="message" name="message" rows="5" placeholder="What do you need delivered, and by when?" required />

              <button type="submit" className="btn btn-solid">Send project brief</button>
            </form>

            <aside className="contact-links-panel">
              <a href={DISCOVERY_CALL_URL}>
                <div className="contact-link-head">
                  <span className="contact-icon contact-icon-text" aria-hidden="true">~$</span>
                  <h3>Discovery Call</h3>
                </div>
                <p>20 minutes to scope delivery, constraints, and next steps.</p>
              </a>
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
      <div className="mobile-cta">
        <a href={DISCOVERY_CALL_URL}>Book a call</a>
        <a href="#case-studies">See case studies</a>
      </div>
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
