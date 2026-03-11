import { useEffect, useRef } from 'react';

const journeyItems = [
  {
    company: 'Freelance Missions',
    period: '2023 - Present',
    place: 'Brisbane / Remote',
    bullets: [
      'Built and delivered full-stack web products for clients from concept to production.',
      'Led architecture decisions to reduce delivery risk and speed up launch cycles.',
      'Improved business outcomes by focusing on UX conversion and performance budgets.'
    ]
  }
];

const skillGroups = [
  {
    title: 'Languages & Frameworks',
    items: ['JavaScript', 'TypeScript', 'Python', 'Go', 'React', 'Next.js', 'Node.js', 'FastAPI']
  },
  {
    title: 'UI & Product Delivery',
    items: ['Design Systems', 'Accessibility', 'Animation Design', 'UX Writing', 'Performance', 'SEO']
  },
  {
    title: 'DevOps & Cloud',
    items: ['Docker', 'CI/CD', 'Nginx', 'Linux', 'GitHub Actions', 'Netlify', 'Render', 'Observability']
  }
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
          <p className="eyebrow">Freelance Software Engineer</p>
          <h1>
            Hi, I am <span>Pierre Daguier</span>
          </h1>
          <p className="hero-subtitle">I craft growth-focused web products with clean execution and senior-level reliability.</p>
          <p className="hero-text">
            Transforming complex requirements into elegant, fast, and future-proof digital platforms.
          </p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#contact">Get in touch</a>
            <a className="btn btn-outline" href="#projects">See projects</a>
          </div>
          <div className="stats">
            <div>
              <strong>20+</strong>
              <span>Projects Delivered</span>
            </div>
            <div>
              <strong>3+</strong>
              <span>Years Building</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Client Focus</span>
            </div>
          </div>
        </section>

        <section id="journey" className="panel section">
          <h2>My <span>Journey</span></h2>
          {journeyItems.map((item) => (
            <article className="timeline-card" key={item.company}>
              <div className="timeline-head">
                <h3>{item.company}</h3>
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
