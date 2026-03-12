import { useEffect, useRef } from 'react';

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

const skillGroups = [
  {
    title: 'Languages & Frameworks',
    items: ['JavaScript', 'TypeScript', 'Python', 'Golang', 'ReactJS', 'VueJS', 'Flutter', 'GraphQL', 'Solidity', 'Truffle']
  },
  {
    title: 'Backend, Data & APIs',
    items: ['MariaDB', 'PostgreSQL', 'MongoDB', 'RabbitMQ', 'REST APIs', 'OpenAPI', 'Microservices']
  },
  {
    title: 'Automation, DevOps & Reliability',
    items: ['Docker', 'CI/CD', 'Jenkins', 'n8n', 'Prometheus', 'Grafana', 'Linux', 'Apache', 'Nginx', 'Nessus', 'EPrint']
  }
];

const logoRows = [
  [
    { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
    { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
    { name: 'Python', slug: 'python', color: '3776AB' },
    { name: 'Golang', slug: 'go', color: '00ADD8' },
    { name: 'ReactJS', slug: 'react', color: '61DAFB' },
    { name: 'VueJS', slug: 'vuedotjs', color: '4FC08D' },
    { name: 'Flutter', slug: 'flutter', color: '02569B' },
    { name: 'GraphQL', slug: 'graphql', color: 'E10098' },
    { name: 'Solidity', slug: 'solidity', color: 'FFFFFF' },
    { name: 'Truffle', slug: 'truffle', color: '5E464D' }
  ],
  [
    { name: 'MariaDB', slug: 'mariadb', color: '003545' },
    { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1' },
    { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
    { name: 'RabbitMQ', slug: 'rabbitmq', color: 'FF6600' },
    { name: 'Docker', slug: 'docker', color: '2496ED' },
    { name: 'Jenkins', slug: 'jenkins', color: 'D24939' },
    { name: 'n8n', slug: 'n8n', color: 'EA4B71' },
    { name: 'OpenAPI', slug: 'openapiinitiative', color: '6BA539' },
    { name: 'Prometheus', slug: 'prometheus', color: 'E6522C' },
    { name: 'Grafana', slug: 'grafana', color: 'F46800' },
    { name: 'Linux', slug: 'linux', color: 'FCC624' },
    { name: 'Apache', slug: 'apache', color: 'D22128' },
    { name: 'Nginx', slug: 'nginx', color: '009639' }
  ]
];

const logoUrl = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`;

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
  return (
    <div className="site">
      <ParticleField />
      <div className="vignette" aria-hidden="true" />

      <header className="nav-shell">
        <a href="#home" className="logo">PD</a>
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
          <p className="hero-subtitle">Backend, automation, and full-stack delivery for teams that need fast execution and reliable systems.</p>
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
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <div className="chip-wrap">
                  {group.items.map((chip) => (
                    <span key={chip} className="chip">{chip}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="logo-marquee" aria-label="Technology logos marquee">
            {logoRows.map((row, rowIndex) => (
              <div className="logo-row-mask" key={`logo-row-${rowIndex}`}>
                <div className={`logo-row-track ${rowIndex === 1 ? 'logo-row-track-reverse' : ''}`}>
                  {[...row, ...row].map((logo, index) => (
                    <span className="logo-badge" key={`${logo.slug}-${index}`}>
                      <img src={logoUrl(logo.slug, logo.color)} alt={`${logo.name} logo`} loading="lazy" />
                      <span>{logo.name}</span>
                    </span>
                  ))}
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
                <h3>Email</h3>
                <p>pierredaguier@gmail.com</p>
              </a>
              <a href="https://www.linkedin.com/in/pierre-daguier/" target="_blank" rel="noreferrer">
                <h3>LinkedIn</h3>
                <p>Connect professionally</p>
              </a>
              <a href="https://github.com/PierreDaguier" target="_blank" rel="noreferrer">
                <h3>GitHub</h3>
                <p>Explore code and projects</p>
              </a>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
