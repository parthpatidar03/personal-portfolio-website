/**
 * Portfolio Website - DataByte Electric Blue Design
 * Created by Parth Patidar
 * 
 * Features:
 * - Wave particle background (canvas-based)
 * - Water ripple cursor effect
 * - Scroll-reveal animations
 * - Glassmorphic components
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";

// ===============================================
// TYPEWRITER EFFECT COMPONENT (Real typing + deleting + blinking cursor)
// ===============================================
const TypewriterEffect = ({ texts, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const currentText = texts[currentIndex];
    
    // If paused (after finishing typing), wait before deleting
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }
    
    // Typing logic
    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        // Type next character
        const typeTimer = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(typeTimer);
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
      }
    } 
    // Deleting logic
    else {
      if (displayText.length > 0) {
        // Delete character
        const deleteTimer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(deleteTimer);
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, currentIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration]);
  
  return (
    <span className="typewriter">
      {displayText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

// Keep AnimatedText as alias for compatibility
const AnimatedText = TypewriterEffect;

// ===============================================
// PREMIUM GRID BACKGROUND (Exact Figma Reference)
// ===============================================
const GridBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    
    const setCanvasSize = () => {
      // For position: fixed, use viewport dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial size
    setCanvasSize();
    
    // Debounced resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 100);
    };
    window.addEventListener('resize', handleResize);
    
    const drawBackground = () => {
      // Deep navy to black gradient (#0A0F1E → #020409)
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#0A0F1E');
      bgGradient.addColorStop(0.5, '#060A14');
      bgGradient.addColorStop(1, '#020409');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    const drawGrid = () => {
      const gridSize = 50;
      
      // Draw grid with fade toward bottom
      for (let y = 0; y < canvas.height; y += gridSize) {
        // Fade grid opacity toward bottom of each viewport section
        const viewportY = y % window.innerHeight;
        const fadeProgress = viewportY / window.innerHeight;
        const baseOpacity = 0.15 - (fadeProgress * 0.1); // Fade from 15% to 5%
        
        // Horizontal lines
        ctx.strokeStyle = `rgba(111, 168, 255, ${Math.max(0.03, baseOpacity * 0.8)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines with similar fade
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.strokeStyle = `rgba(111, 168, 255, 0.12)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    };
    
    const drawLightRays = () => {
      const pulse = 1 + Math.sin(time * 0.002) * 0.05;
      
      // Main radial glow from top-right corner (#9EC9FF)
      const mainGlow = ctx.createRadialGradient(
        canvas.width * 1.1, -canvas.height * 0.1, 0,
        canvas.width * 0.5, canvas.height * 0.3, canvas.width * 0.8
      );
      mainGlow.addColorStop(0, `rgba(158, 201, 255, ${0.25 * pulse})`);
      mainGlow.addColorStop(0.2, `rgba(127, 179, 255, ${0.15 * pulse})`);
      mainGlow.addColorStop(0.5, `rgba(111, 168, 255, ${0.08 * pulse})`);
      mainGlow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = mainGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Secondary soft glow (blue-white bloom)
      const bloomGlow = ctx.createRadialGradient(
        canvas.width, 0, 0,
        canvas.width * 0.6, canvas.height * 0.2, canvas.width * 0.5
      );
      bloomGlow.addColorStop(0, `rgba(200, 220, 255, ${0.2 * pulse})`);
      bloomGlow.addColorStop(0.3, `rgba(158, 201, 255, ${0.1 * pulse})`);
      bloomGlow.addColorStop(0.6, `rgba(111, 168, 255, ${0.04 * pulse})`);
      bloomGlow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = bloomGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    const addNoiseOverlay = () => {
      // Very subtle noise/grain (cinematic feel)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8; // Very subtle
        data[i] += noise;     // R
        data[i + 1] += noise; // G
        data[i + 2] += noise; // B
      }
      
      ctx.putImageData(imageData, 0, 0);
    };
    
    const render = () => {
      time++;
      
      drawBackground();
      drawGrid();
      drawLightRays();
      
      // Only add noise occasionally for performance
      if (time % 30 === 0) {
        // Skip noise for performance - it's very subtle anyway
      }
      
      animationId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="grid-canvas" />;
};

// ===============================================
// WATER RIPPLE CURSOR EFFECT
// ===============================================
const useWaterRipple = () => {
  useEffect(() => {
    const createRipple = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
    };
    
    document.addEventListener('click', createRipple);
    return () => document.removeEventListener('click', createRipple);
  }, []);
};

// ===============================================
// SCROLL REVEAL HOOK
// ===============================================
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
};

// ===============================================
// ICON COMPONENTS
// ===============================================
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.66-3.71-1.28-3.71-1.28-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.67 2.56 1.19 3.18.91.1-.71.38-1.19.68-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.4.1-2.91 0 0 .93-.3 3.05 1.13.88-.24 1.83-.36 2.77-.36.94 0 1.88.12 2.77.36 2.12-1.43 3.05-1.13 3.05-1.13.59 1.51.21 2.63.1 2.91.69.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.15-5.02 5.43.39.33.73.98.73 1.98 0 1.43-.01 2.58-.01 2.94 0 .29.2.64.75.53 4.37-1.45 7.52-5.56 7.52-10.41C23.01 5.24 18.27.5 12 .5z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="14" height="14">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

// ===============================================
// DATA
// ===============================================
const SOCIAL_LINKS = {
  github: "https://github.com/parthpatidar03",
  linkedin: "https://www.linkedin.com/in/patidar-parth/"
};

const PROJECTS = [
  {
    title: "Book Buddy: Personal Library Management",
    date: "Oct 2025",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    description: "Full-stack reading tracker with role-based access control and personalized recommendations.",
    features: [
      "JWT authentication & MongoDB compound indexing",
      "Collaborative filtering with Gutendex API",
      "8+ MVC controllers with real-time progress tracking",
      "Multer file uploads & analytics dashboards"
    ],
    github: "https://github.com/parthpatidar03/Book-Buddy"
  },
  {
    title: "Smart Campus E-Gate Entry-Exit System",
    date: "Dec 2025",
    tech: ["React", "EJS", "Node.js", "Express", "MongoDB"],
    description: "Secure campus access management system for NIT Trichy digitizing entry-exit verification.",
    features: [
      "OTP-based auth & time-bound QR code generation",
      "Guard-facing interface for real-time scanning",
      "JWT-based auth with RBAC implementation",
      "Automated audit logs for accountability"
    ],
    github: "https://github.com/parthpatidar03/smart-campus-egate"
  },
  {
    title: "Reel-to-Real: AI Place Discovery Platform",
    date: "Feb 2026",
    tech: ["React", "Express", "MongoDB", "Redis", "OpenAI"],
    description: "AI-powered platform to extract venue data from Instagram Reels for travel discovery.",
    features: [
      "OpenAI Whisper, GPT-4, Tesseract OCR (70-80% accuracy)",
      "BullMQ async queues with <200ms API response",
      "Geospatial 2dsphere indexing in MongoDB",
      "Mapbox GL frontend with Zustand state management"
    ],
    github: "https://github.com/parthpatidar03/Reel2Real"
  }
];

const SKILLS = [
  {
    category: "Programming Languages",
    items: ["C++", "JavaScript", "Python", "TypeScript"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Redux", "Node.js", "Express.js", "FastAPI", "Next.js"]
  },
  {
    category: "AI & GenAI Tools",
    items: ["LangChain", "OpenAI API", "Hugging Face", "Ollama", "MCP"]
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "SQL", "Qdrant (Vector)"]
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "Docker", "Postman", "AWS (Basic)"]
  },
  {
    category: "Web Development",
    items: ["HTML/CSS", "TailwindCSS", "REST APIs", "WebSockets"]
  }
];

// ===============================================
// NAVBAR COMPONENT
// ===============================================
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" }
  ];
  
  return (
    <nav className="navbar" style={{ background: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)' }}>
      <div className="container navbar-content">
        <div className="navbar-brand">
          Parth Patidar
          <div className="social-dropdown">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
        
        <div className="nav-links">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}
        </div>
        
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <div className={`mobile-nav ${mobileOpen ? 'active' : ''}`}>
        <div className="nav-links">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="nav-link" onClick={() => setMobileOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ===============================================
// HERO SECTION
// ===============================================
const HeroSection = () => (
  <section id="home" className="hero section">
    <div className="container">
      <div className="hero-content">
        <div className="hero-text reveal">
          <h1 className="two-tone-text">
            Hi, I'm <AnimatedText texts={["Parth Patidar", "a Full-Stack Developer", "an AI/GenAI Enthusiast"]} />
          </h1>
          <p className="subtitle">MERN Stack • AI/GenAI • Building Innovative Solutions</p>
          <p className="description">
            Second-year B.Tech student at NIT Trichy, passionate about building AI-powered 
            web applications and full-stack solutions. Self-driven learner skilled in 
            modern technologies, eager to create impactful digital experiences.
          </p>
          <div className="hero-buttons">
            <a 
              href="https://drive.google.com/file/d/1WwqlzUkxtvI_J-BxA_bQnbDXgKacAdhL/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Download Resume
            </a>
            <a href="#projects" className="btn btn-secondary">
              View My Work
            </a>
          </div>
          
          {/* Prominent Social Links */}
          <div className="hero-social-links">
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-social-link github"
            >
              <GitHubIcon /> GitHub
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-social-link linkedin"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>
        
        <div className="hero-image reveal">
          <img 
            src="https://ik.imagekit.io/qfvuxdt5o/Gemini_Generated_Image_sq6ehusq6ehusq6e.png?updatedAt=1762272137414" 
            alt="Parth Patidar" 
            className="hero-avatar"
          />
          <div className="status-badge">
            <span className="status-dot"></span>
            Open for Internships
          </div>
        </div>
      </div>
      
      <div className="stats-bar reveal">
        <div className="stat-card">
          <div className="stat-number">10+</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">1+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">150+</div>
          <div className="stat-label">DSA Problems Solved</div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a href="#skills" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Scroll to explore <ArrowDownIcon />
        </a>
      </div>
    </div>
  </section>
);

// ===============================================
// SKILLS SECTION
// ===============================================
const SkillsSection = () => (
  <section id="skills" className="section">
    <div className="container">
      <div className="section-title reveal">
        <h2>Technical <span className="gradient-text">Skills</span></h2>
        <p>A comprehensive overview of my modern development stack and areas of expertise.</p>
      </div>
      
      <div className="skills-grid reveal-stagger">
        {SKILLS.map((skill, index) => (
          <div key={index} className="glass-card skill-card">
            <h3>{skill.category}</h3>
            <div className="skill-tags">
              {skill.items.map((item, i) => (
                <span key={i} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ===============================================
// PROJECTS SECTION
// ===============================================
const ProjectsSection = () => (
  <section id="projects" className="section">
    <div className="container">
      <div className="section-title reveal">
        <h2>Featured <span className="gradient-text">Projects</span></h2>
        <p>Showcasing my expertise in full-stack development and AI-powered applications.</p>
      </div>
      
      <div className="projects-grid reveal-stagger">
        {PROJECTS.map((project, index) => (
          <article key={index} className="glass-card project-card">
            <div className="project-header">
              <h3>{project.title}</h3>
              <div className="project-links">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>
            <div className="project-body">
              <div className="project-date">
                <CalendarIcon /> {project.date}
              </div>
              <p className="project-description">{project.description}</p>
              <ul className="project-features">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="project-tags">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ===============================================
// EDUCATION SECTION
// ===============================================
const EducationSection = () => (
  <section id="education" className="section">
    <div className="container">
      <div className="section-title reveal">
        <h2>Education</h2>
      </div>
      
      <div className="glass-card education-card reveal">
        <a href="https://www.nitt.edu" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://ik.imagekit.io/qfvuxdt5o/clg1.png?updatedAt=1762255352668" 
            alt="NIT Trichy Logo" 
            className="education-logo"
          />
        </a>
        <div className="education-details">
          <h3>National Institute of Technology Tiruchirappalli</h3>
          <p className="education-degree">Bachelor of Technology (B.Tech)</p>
          <p className="education-duration">2024 - 2028</p>
          <p className="education-cgpa">CGPA: <strong>8.87</strong></p>
        </div>
      </div>
    </div>
  </section>
);

// ===============================================
// CONTACT SECTION (Simple - Just Email Link)
// ===============================================
const ContactSection = () => (
  <section id="contact" className="section">
    <div className="container">
      <div className="section-title reveal">
        <h2>Let's <span className="gradient-text">Connect</span></h2>
        <p>Ready to build something amazing? Let's work together.</p>
      </div>
      
      <div className="contact-simple reveal">
        <a 
          href="mailto:parthpatidar202@gmail.com" 
          className="btn btn-primary contact-email-btn"
        >
          <MailIcon /> Email Me
        </a>
        <p className="contact-email-text">parthpatidar202@gmail.com</p>
        
        <div className="contact-socials">
          <a 
            href={SOCIAL_LINKS.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-social-link"
          >
            <GitHubIcon /> GitHub
          </a>
          <a 
            href={SOCIAL_LINKS.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-social-link"
          >
            <LinkedInIcon /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ===============================================
// FOOTER COMPONENT
// ===============================================
const Footer = () => (
  <footer className="footer">
    <div className="container">
      © {new Date().getFullYear()} Parth Patidar. All rights reserved.
    </div>
  </footer>
);

// ===============================================
// MAIN APP COMPONENT
// ===============================================
function App() {
  // Initialize effects
  useWaterRipple();
  useScrollReveal();
  
  return (
    <>
      <GridBackground />
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
