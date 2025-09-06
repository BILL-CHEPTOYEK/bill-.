import React, { useState, useEffect } from 'react';
import './App.css'; // This import now has a corresponding CSS file

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to add fade-up animation on scroll for sections
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the item is visible
    });

    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(el => observer.observe(el));

    return () => {
      fadeUpElements.forEach(el => observer.unobserve(el));
    };
  }, []);


  return (
    <div className="App">
      {/* Navbar */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-brand">Cheptoyek Bill</div>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {['home', 'about', 'skills', 'projects', 'cv', 'contact'].map((section) => (
              <a key={section} href={`#${section}`} onClick={() => setMenuOpen(false)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>
          <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content container">
          {/* Profile image - loads from public folder */}
          <img src="/dp.jpg" alt="Cheptoyek Bill" className="profile-image" />
          <h1>Cheptoyek Bill</h1>
          <p className="subtitle">Software Engineer & Full-Stack Developer</p>
          <a href="#projects" className="btn-primary">Explore My Work</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section fade-up">
        <h2>About Me</h2>
        <p>
          I am a results-driven Software Engineer with a strong background in full-stack development,
          cloud technologies, and modern web frameworks. Passionate about clean code, performance,
          and user experience.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="section fade-up">
        <h2>Skills</h2>
        <ul className="skills-list">
          {['JavaScript', 'React.js', 'Node.js & Express', 'Flutter', 'Python', 'AI & ML', 'Data Science', 'Blockchain', 'DevOps', 'Git & GitHub', 'REST APIs', 'Agile & Scrum'].map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section id="projects" className="section fade-up">
        <h2>Projects</h2>
        <div className="projects-grid">
          {/* Accounting System Project */}
          <ProjectCard
            title="Accounting System"
            description="A robust web-based accounting system for managing financial transactions, generating reports (General Ledger, Balance Sheet, Income Statement), and ensuring double-entry principle compliance."
            github="https://github.com/BILL-CHEPTOYEK/Accounting-for-software-engineers-Resources"
            imageSrc="/accountingsystem.png"
          />

          {/* TricReality Project */}
          <ProjectCard
            title="TricReality - Real Estate & Project Management"
            description="A comprehensive real estate and project management system streamlining condominium project setup, financial tracking, sales management, payment scheduling, and customer relations. Built with Node.js, Express, PostgreSQL, and React."
            github="https://github.com/TricsoftTechnologies/TricRealty"
            imageSrc="/tricreality.png"
          />

          {/* FarmConnect Project */}
          <ProjectCard
            title="FarmConnect - Farmer-to-Market Mobile App"
            description="A Flutter mobile app empowering smallholder farmers in Uganda with direct access to urban produce markets via trusted local agents, ethical delivery, and escrow payments."
            github="https://github.com/BILL-CHEPTOYEK/FarmConnect"
            imageSrc="/farmconnect.png"
          />

          {/* Bus Ticketing System Project */}
          <ProjectCard
            title="Bus Ticketing System (BSE25-18)"
            description="A collaborative, scalable bus ticketing system with integrated CI/CD and Django backend."
            github="https://github.com/BILL-CHEPTOYEK/BSE25-18"
            imageSrc="/busticketing.svg"
          />

          {/* Hotel Management System Project */}
          <ProjectCard
            title="Hotel Management System API"
            description="Comprehensive RESTful API for hotel operations using Node.js and MongoDB."
            github="https://github.com/BILL-CHEPTOYEK/hotelms-api"
            imageSrc="/hotelapi.svg"
          />
        </div>
      </section>

      {/* Resume */}
      <section id="cv" className="section fade-up">
        <h2>Resume</h2>
        <p>Download my resume to see my experience, skills, and education in detail.</p>
        <a href="/cv.pdf" download className="btn-primary">Download Resume (PDF)</a>
      </section>

      {/* Contact */}
      <section id="contact" className="section fade-up">
        <h2>Contact Me</h2>
        <p>Email: <a href="mailto:billcheptoyek60@gmail.com">billcheptoyek60@gmail.com</a></p>
        <div className="social-links">
          <SocialLink href="https://www.linkedin.com/in/cheptoyekbill1" label="LinkedIn" color="#0077B5" />
          <SocialLink href="https://stackoverflow.com/users/yourprofile" label="Stack Overflow" color="#FE7A16" />
          <SocialLink href="https://www.kaggle.com/cheptoyekbill" label="Kaggle" color="#20BEFF" />
          <SocialLink href="https://x.com/trojan__bill" label="X" color="#000" />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Cheptoyek Bill. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ProjectCard Component - simplified without external placeholder fallbacks
function ProjectCard({ title, description, github, imageSrc }) {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img
          src={imageSrc}
          alt={title}
          className="project-image"
        />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={github} target="_blank" rel="noopener noreferrer" className="btn-secondary">View Project</a>
    </div>
  );
}

// SocialLink Component (remains unchanged)
function SocialLink({ href, label, color }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="social-link" style={{ borderColor: color }}>
      {label}
    </a>
  );
}

export default App;
