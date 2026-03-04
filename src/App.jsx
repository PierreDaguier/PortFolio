import { useEffect } from 'react';

const services = [
  {
    title: 'Product-Focused Frontend',
    text: 'I design and build conversion-oriented interfaces with strong UX structure, clean component architecture, and production-level performance.'
  },
  {
    title: 'Backend & API Delivery',
    text: 'I ship robust APIs and service layers with validation, observability, and deployment-ready environments for fast iteration.'
  },
  {
    title: 'Technical Partnership',
    text: 'From scoping to release, I help founders and teams make the right tradeoffs to move quickly without creating long-term debt.'
  }
];

const projects = [
  {
    name: 'JCU Weather Prediction',
    stack: 'React, Go, Python, FastAPI, ML',
    summary:
      'End-to-end weather prediction platform with production API, model-serving workflow, and a modern interface for inference and documentation.',
    liveUrl: 'https://jcu-weather-prediction.netlify.app',
    sourceUrl: 'https://github.com/PierreDaguier/JCU-Weather-Prediction',
    highlight: 'Live'
  },
  {
    name: 'CryptoCactus',
    stack: 'Solidity, Vue.js, Node.js',
    summary:
      'Web3 product around smart-contract driven interactions and marketplace logic, with front-to-back implementation ownership.',
    liveUrl: 'https://www.cryptocactus.net',
    sourceUrl: 'https://github.com/PierreDaguier/CryptoCactus',
    highlight: 'Blockchain'
  }
];

const processSteps = [
  'Discovery call and scope framing',
  'Architecture and UX direction',
  'Weekly deliverables with demos',
  'Deployment, handover, and follow-up'
];

function App() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setPointerGlow = (event) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    };

    if (!reducedMotion) {
      window.addEventListener('pointermove', setPointerGlow);
    }

    const revealElements = document.querySelectorAll('.scroll-reveal');
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
        threshold: 0.2
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    const tiltCards = document.querySelectorAll('[data-tilt]');
    const handlePointerMove = (event) => {
      if (reducedMotion) {
        return;
      }

      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    };

    const resetTilt = (event) => {
      event.currentTarget.style.transform = '';
    };

    tiltCards.forEach((card) => {
      card.addEventListener('pointermove', handlePointerMove);
      card.addEventListener('pointerleave', resetTilt);
    });

    return () => {
      window.removeEventListener('pointermove', setPointerGlow);
      observer.disconnect();
      tiltCards.forEach((card) => {
        card.removeEventListener('pointermove', handlePointerMove);
        card.removeEventListener('pointerleave', resetTilt);
      });
    };
  }, []);

  return (
    <div className="site-shell">
      <div className="cursor-glow" aria-hidden="true" />
      <div className="mesh-overlay" aria-hidden="true" />
      <div className="bg-shape bg-shape-a" aria-hidden="true" />
      <div className="bg-shape bg-shape-b" aria-hidden="true" />

      <header className="topbar scroll-reveal is-visible">
        <a className="brand" href="#home">Pierre Daguier</a>
        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero scroll-reveal is-visible">
          <p className="kicker">Freelance Software Engineer · Brisbane</p>
          <h1>Senior-level web products that look sharp and ship fast.</h1>
          <p className="hero-copy">
            I build modern digital products from concept to production: frontend,
            backend, and delivery pipelines designed for business outcomes.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">See Selected Work</a>
            <a className="btn btn-ghost" href="#contact">Start a Project</a>
          </div>
        </section>

        <section id="services" className="section scroll-reveal" style={{ '--delay': '80ms' }}>
          <div className="section-head">
            <p className="kicker">What I Deliver</p>
            <h2>Built for clients who need quality and speed.</h2>
          </div>
          <div className="grid services-grid">
            {services.map((service, index) => (
              <article
                className="card scroll-reveal"
                style={{ '--delay': `${120 + index * 70}ms` }}
                data-tilt
                key={service.title}
              >
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section scroll-reveal" style={{ '--delay': '120ms' }}>
          <div className="section-head">
            <p className="kicker">Selected Projects</p>
            <h2>Recent work aligned with real market expectations.</h2>
          </div>
          <div className="grid projects-grid">
            {projects.map((project, index) => (
              <article
                className="project-card scroll-reveal"
                style={{ '--delay': `${140 + index * 80}ms` }}
                data-tilt
                key={project.name}
              >
                <div className="project-top">
                  <span className="badge">{project.highlight}</span>
                  <p>{project.stack}</p>
                </div>
                <h3>{project.name}</h3>
                <p className="project-summary">{project.summary}</p>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo</a>
                  <a href={project.sourceUrl} target="_blank" rel="noreferrer">Source code</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section scroll-reveal process" style={{ '--delay': '120ms' }}>
          <div className="section-head">
            <p className="kicker">How I Work</p>
            <h2>Clear communication, clear execution.</h2>
          </div>
          <ol>
            {processSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section id="contact" className="section scroll-reveal contact" style={{ '--delay': '140ms' }}>
          <div className="section-head">
            <p className="kicker">Contact</p>
            <h2>Available for freelance missions and long-term collaboration.</h2>
          </div>
          <p>
            Tell me what you are building and your timeline. I will reply with a
            practical plan and next steps.
          </p>
          <div className="contact-links">
            <a className="btn btn-primary" href="mailto:pierredaguier@gmail.com">pierredaguier@gmail.com</a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/pierre-daguier/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn btn-ghost" href="https://github.com/PierreDaguier" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
