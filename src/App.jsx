
// Favicon: Job icons created by Yogi Aprelliyanto - Flaticon
// https://www.flaticon.com/free-icons/job
// <a href="https://www.flaticon.com/free-icons/job" title="job icons">Job icons created by Yogi Aprelliyanto - Flaticon</a>
import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

// --- New Animated Theme Toggle Component ---
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme or system preference
    const prefersDark = localStorage.theme === 'dark' || 
                       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    // Apply theme
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-500
                  ${isDarkMode ? 'bg-purple-900' : 'bg-cyan-300'}`}
      aria-label="Toggle theme"
    >
      {/* Sun/Moon Icons */}
      <div className="absolute left-1.5 top-1.5 transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="yellow" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
             className={`transition-all duration-500 ${isDarkMode ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </div>
      <div className="absolute left-1.5 top-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={`transition-all duration-500 ${isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>
      
      {/* Sliding Toggle Circle */}
      <div
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-500 ease-in-out
                    ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
      ></div>
    </button>
  );
};

// --- New Dynamic Background Component ---
const DynamicBackground = () => (
  <div 
    className="fixed inset-0 -z-20 w-full h-full 
               transition-all duration-500
               dynamic-bg-light animate-lightwave
               dark:dynamic-bg-dark dark:animate-aurora"
  >
    {/* This overlay is only for the dark mode aurora effect */}
    <div className="absolute inset-0 -z-10 w-full h-full opacity-0 dark:opacity-100 aurora-overlay transition-opacity duration-500"></div>
  </div>
);


function App() {
  // Add favicon to document head
  useEffect(() => {
    const faviconUrl = "https://cdn-icons-png.flaticon.com/512/921/921347.png";
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
    // Attribution as comment
    const comment = document.createComment(
      'Favicon: Job icons created by Yogi Aprelliyanto - Flaticon (https://www.flaticon.com/free-icons/job)'
    );
    document.head.appendChild(comment);
  }, []);
  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className="px-3 py-2 text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
    >
      {children}
    </a>
  );

  const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
      )}
    </div>
  );

  const Tag = ({ children, href }) => {
    const Comp = href ? "a" : "span";
    return (
      <Comp
        href={href}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        className="inline-block px-3 py-1 rounded-full 
                   bg-gray-100 dark:bg-gray-800/80 
                   border border-gray-300 dark:border-white/10 
                   text-sm text-gray-700 dark:text-gray-200 
                   hover:bg-gray-200 dark:hover:bg-gray-700/70 
                   hover:border-gray-400 dark:hover:border-white/20 
                   transition-colors"
      >
        {children}
      </Comp>
    );
  };

  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // Honeypot: if filled, silently succeed
    if (fd.get('website')) {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 1200);
      return;
    }
    setFormSubmitted(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          subject: fd.get('subject'),
          message: fd.get('message'),
          website: fd.get('website') || ''
        })
      });
      if (!res.ok) throw new Error('Failed to send');
      form.reset();
      alert('Thanks! Your message has been sent.');
    } catch (err) {
      console.error(err);
      alert('Sorry, failed to send. Please email me directly at parthpatidar202@gmail.com');
    } finally {
      setFormSubmitted(false);
    }
  };
  // College branding (logo + link)
  const collegeUrl = "https://www.nitt.edu";
  // Project GitHub links (adjust to your actual repos)
  const projectLinks = {
    rag: "https://github.com/parthpatidar03/ai-chatbot-rag",
    mern: "https://github.com/parthpatidar03/mern-stack-application",
    eupchaar: "https://github.com/parthpatidar03/eupchaar",
  };

  return (
    // Main div now controls the base colors for light/dark mode
  <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
      <DynamicBackground /> {/* <-- Add the dynamic background */}
      
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/60 border-b border-gray-200 dark:border-white/10 transition-colors">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">Parth Patidar</div>
          <div className="hidden md:flex items-center gap-2">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <div className="ml-4">
              <ThemeToggle /> {/* <-- Add the new toggle button */}
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-10"> {/* Add relative z-10 to ensure main content is above background */}
        {/* Hero Section */}
        <section id="home" className="pt-10 md:pt-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight min-h-[70px]">
                  <Typewriter
                    options={{
                      loop: true,
                      delay: 60,
                      deleteSpeed: 40,
                      autoStart: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Hello, I'm Parth Patidar")
                        .pauseFor(1200)
                        .deleteAll()
                        .typeString("I am a Software Developer")
                        .pauseFor(1200)
                        .deleteAll()
                        .typeString("I am an AI/ML Enthusiast")
                        .pauseFor(1200)
                        .deleteAll()
                        .typeString("DSA Problem Solver")
                        .pauseFor(1200)
                        .deleteAll()
                        .start();
                    }}
                  />
                </h1>
                <p className="mt-4 text-2xl text-gray-700 dark:text-gray-300">
                  AI & Web Developer | OpenAI | MERN Stack | GenAI
                </p>
                <p className="mt-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                  Hi, I'm Parth, a second-year B.Tech student at NIT Trichy,
                  passionate about Tech & Software Development having skills in building AI powered websites &
                  Full stack Projects. Self-driven learner, skilled in MERN stack. Eager to contribute to innovative projects and collaborate with
                  like-minded professionals.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    target="_blank"
                    href="https://docs.google.com/document/d/1v3l-t50wGauZMhg5S03p7YLXCHejmo3QZNGExJsngVQ/edit?usp=drive_link"
                    className="inline-flex items-center justify-center rounded-md 
                               bg-gray-900 text-white dark:bg-white dark:text-black 
                               font-semibold px-5 py-2 shadow-sm 
                               hover:bg-gray-700 dark:hover:opacity-90 transition-all"
                  >
                    Download Resume
                  </a>
                  <a
                    href="https://github.com/parthpatidar03"
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-md 
                               border border-gray-700 dark:border-gray-400 
                               text-gray-900 dark:text-white 
                               font-semibold px-5 py-2 
                               hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    View My Work
                  </a>
                </div>

                {/* Socials */}
                <div className="mt-6 flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/parth-patidar-726745314"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 rounded-md 
                               border border-gray-300 dark:border-white/10 
                               hover:border-gray-500 dark:hover:border-white/30 
                               hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.5c0-1.55-.03-3.54-2.16-3.54-2.17 0-2.5 1.7-2.5 3.43V23h-4V8.5z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/parthpatidar03"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 rounded-md 
                               border border-gray-300 dark:border-white/10 
                               hover:border-gray-500 dark:hover:border-white/30 
                               hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.66-3.71-1.28-3.71-1.28-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.67 2.56 1.19 3.18.91.1-.71.38-1.19.68-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.4.1-2.91 0 0 .93-.3 3.05 1.13.88-.24 1.83-.36 2.77-.36.94 0 1.88.12 2.77.36 2.12-1.43 3.05-1.13 3.05-1.13.59 1.51.21 2.63.1 2.91.69.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.15-5.02 5.43.39.33.73.98.73 1.98 0 1.43-.01 2.58-.01 2.94 0 .29.2.64.75.53 4.37-1.45 7.52-5.56 7.52-10.41C23.01 5.24 18.27.5 12 .5z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-center md:items-end">
                <img
                  target="_blank"
                  src="https://ik.imagekit.io/qfvuxdt5o/portfolio%20picture.jpg?updatedAt=1762254380977" 
                  alt="Parth Patidar"
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover 
                             border-4 border-gray-300 dark:border-gray-800 shadow-lg transition-colors"
                />
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for hire
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-12 border-t border-gray-200 dark:border-white/10 pt-6 transition-colors">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="rounded-lg bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-white/10 p-6 transition-colors">
                  <div className="text-3xl font-bold">10+</div>
                  <div className="text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <div className="rounded-lg bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-white/10 p-6 transition-colors">
                  <div className="text-3xl font-bold">1+</div>
                  <div className="text-gray-600 dark:text-gray-400">Years Exp</div>
                </div>
                <div className="rounded-lg bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-white/10 p-6 transition-colors">
                  <div className="text-3xl font-bold">150+</div>
                  <div className="text-gray-600 dark:text-gray-400">DSA Problems Solved</div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                <span>Scroll to explore</span>
                <a href="#skills" aria-label="Scroll to skills">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 animate-bounce"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle
              title="Technical Skills"
              subtitle="A comprehensive overview of my modern development stack and areas of expertise."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4">
                  AI & Machine Learning
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Tag>GenAI</Tag>
                  <Tag>Python</Tag>
                  <Tag>OpenAI</Tag>
                  <Tag>LangChain</Tag>
                  <Tag>Chatbots</Tag>
                  <Tag>RAG</Tag>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4">
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Tag>JavaScript</Tag>
                  <Tag>Python</Tag>
                  <Tag>C++</Tag>
                  <Tag>SQL</Tag>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4">MERN Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <Tag>Node.js</Tag>
                  <Tag>React.js</Tag>
                  <Tag>Express.js</Tag>
                  <Tag>MongoDB</Tag>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4">DevOps & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  <Tag>Git</Tag>
                  <Tag>GitHub</Tag>
                  <Tag>Docker</Tag>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4">DSA & Algorithms</h3>
                <div className="flex flex-wrap gap-2">
                  <Tag>Data Structures</Tag>
                  <Tag>Algorithms</Tag>
                  <Tag>Problem Solving</Tag>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4">DSA & CP Profiles</h3>
                <div className="flex flex-wrap gap-2">
                  <Tag href="https://leetcode.com/u/ParthNITT/">LeetCode</Tag>
                  <Tag href="https://takeuforward.org/plus/profile/alwaysCoder">
                    TakeUForward
                  </Tag>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4">Web Development</h3>
                <div className="flex flex-wrap gap-2">
                  <Tag>HTML</Tag>
                  <Tag>CSS</Tag>
                  <Tag>Tailwind CSS</Tag>
                  <Tag>Web Sockets</Tag>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  <Tag>Firebase</Tag>
                  <Tag>PostgreSQL</Tag>
                  <Tag>SQL</Tag>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-4">
                  Interpersonal Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Tag>Public Speaking</Tag>
                  <Tag>Collaboration</Tag>
                  <Tag>Leadership</Tag>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle title="Education" />
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6 max-w-2xl mx-auto border border-gray-200 dark:border-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <a
                  href={collegeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 group"
                  aria-label="Visit NIT Trichy website"
                  title="NIT Trichy"
                >
                  <img
                    src="https://ik.imagekit.io/qfvuxdt5o/clg1.png?updatedAt=1762255352668"
                    alt="NIT Trichy logo"
                    className="h-12 w-12 rounded-md object-contain ring-1 ring-gray-300 dark:ring-white/10 bg-white transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // hide broken image gracefully
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="sr-only">NIT Trichy</span>
                </a>
                <div>
                  <div className="text-xl font-bold">
                    National Institute of Technology Tiruchirappalli (NIT Trichy)
                  </div>
                  <div className="mt-1 text-lg text-gray-700 dark:text-gray-300">
                    Bachelor of Technology(B. Tech)
                  </div>
                  <div className="mt-1 text-gray-500 dark:text-gray-400">2024 - 2028</div>
                  <div className="mt-2 text-gray-800 dark:text-gray-200">CGPA : 8.65</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle
              title="Featured Projects"
              subtitle="A selection of projects demonstrating my expertise in full-stack and Gen AI."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 transition-colors">
                {/* <div className="h-48 w-full bg-gray-300 dark:bg-gray-700" /> */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold">AI Chatbot (RAG System)</h3>
                    <a
                      href={projectLinks.rag}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View AI Chatbot (RAG System) on GitHub"
                      className="inline-flex items-center justify-center rounded-md p-2 border border-gray-300 dark:border-white/10 hover:border-gray-500 dark:hover:border-white/30 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                      title="GitHub"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.66-3.71-1.28-3.71-1.28-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.67 2.56 1.19 3.18.91.1-.71.38-1.19.68-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.4.1-2.91 0 0 .93-.3 3.05 1.13.88-.24 1.83-.36 2.77-.36.94 0 1.88.12 2.77.36 2.12-1.43 3.05-1.13 3.05-1.13.59 1.51.21 2.63.1 2.91.69.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.15-5.02 5.43.39.33.73.98.73 1.98 0 1.43-.01 2.58-.01 2.94 0 .29.2.64.75.53 4.37-1.45 7.52-5.56 7.52-10.41C23.01 5.24 18.27.5 12 .5z" />
                      </svg>
                    </a>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    An intelligent chatbot built using a Retrieval-Augmented
                    Generation (RAG) architecture to provide answers from a custom
                    knowledge base.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Tag>GenAI</Tag>
                    <Tag>RAG</Tag>
                    <Tag>Python</Tag>
                    <Tag>LangChain</Tag>
                    <Tag>Firebase</Tag>
                  </div>
                </div>
              </article>

              <article className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 transition-colors">
                {/* <div className="h-48 w-full bg-gray-300 dark:bg-gray-700" /> */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold">MERN Stack Application</h3>
                    <a
                      href={projectLinks.mern}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View MERN Stack Application on GitHub"
                      className="inline-flex items-center justify-center rounded-md p-2 border border-gray-300 dark:border-white/10 hover:border-gray-500 dark:hover:border-white/30 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                      title="GitHub"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.66-3.71-1.28-3.71-1.28-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.67 2.56 1.19 3.18.91.1-.71.38-1.19.68-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.4.1-2.91 0 0 .93-.3 3.05 1.13.88-.24 1.83-.36 2.77-.36.94 0 1.88.12 2.77.36 2.12-1.43 3.05-1.13 3.05-1.13.59 1.51.21 2.63.1 2.91.69.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.15-5.02 5.43.39.33.73.98.73 1.98 0 1.43-.01 2.58-.01 2.94 0 .29.2.64.75.53 4.37-1.45 7.52-5.56 7.52-10.41C23.01 5.24 18.27.5 12 .5z" />
                      </svg>
                    </a>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Full-stack solution with user auth, payment processing, and an
                    admin dashboard, built with the MERN stack.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Tag>React.js</Tag>
                    <Tag>Node.js</Tag>
                    <Tag>Express.js</Tag>
                    <Tag>MongoDB</Tag>
                  </div>
                </div>
              </article>

              <article className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 transition-colors">
                {/* <div className="h-48 w-full bg-gray-300 dark:bg-gray-700" /> */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold">Telemedicine App [eUpchaar]</h3>
                    <a
                      href={projectLinks.eupchaar}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Telemedicine App on GitHub"
                      className="inline-flex items-center justify-center rounded-md p-2 border border-gray-300 dark:border-white/10 hover:border-gray-500 dark:hover:border-white/30 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                      title="GitHub"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.41.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.66-3.71-1.28-3.71-1.28-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.67 2.56 1.19 3.18.91.1-.71.38-1.19.68-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.12-2.95-.11-.28-.49-1.4.1-2.91 0 0 .93-.3 3.05 1.13.88-.24 1.83-.36 2.77-.36.94 0 1.88.12 2.77.36 2.12-1.43 3.05-1.13 3.05-1.13.59 1.51.21 2.63.1 2.91.69.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.15-5.02 5.43.39.33.73.98.73 1.98 0 1.43-.01 2.58-.01 2.94 0 .29.2.64.75.53 4.37-1.45 7.52-5.56 7.52-10.41C23.01 5.24 18.27.5 12 .5z" />
                      </svg>
                    </a>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    A telemedicine application that connects patients with healthcare providers for remote consultations.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Tag>React Native</Tag>
                    <Tag>Node.js</Tag>
                    <Tag>Express.js</Tag>
                    <Tag>MongoDB</Tag>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle
              title="Let's Work Together"
              subtitle="Ready to build something amazing? Let's connect."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left */}
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-gray-500 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 4h16v16H4z" opacity=".1" />
                      <path d="M4 4h16v16H4zM22 6l-10 7L2 6" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold">Email</div>
                    <a
                      href="mailto:parthpatidar202@gmail.com"
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      parthpatidar202@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 text-gray-500 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 16.92V21a1 1 0 0 1-1.1 1 19.86 19.86 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 11.73 19.86 19.86 0 0 1 0 3.1 1 1 0 0 1 1 2h4.09a1 1 0 0 1 1 .75c.26.97.6 1.91 1 2.81a1 1 0 0 1-.23 1.11L5.9 8.09a16 16 0 0 0 6 6l1.42-1.94a1 1 0 0 1 1.1-.23c.9.4 1.84.74 2.81 1a1 1 0 0 1 .75 1V21a1 1 0 0 1-1.06.92z" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a
                      href="tel:+917804079008"
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      +91 7804079008
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 text-gray-500 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
                      <circle cx="12" cy="11" r="2" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-gray-700 dark:text-gray-300">
                      Indore, Madhya Pradesh, India
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Honeypot field (hidden for humans) */}
                <input type="text" name="website" className="hidden" tabIndex="-1" autoComplete="off" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full rounded-md 
                               bg-gray-100 dark:bg-gray-800 
                               border border-gray-300 dark:border-white/10 
                               px-4 py-3 placeholder-gray-500 
                               focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/60
                               transition-all"
                    required
                  />
                  <input
                     type="email"
                     name="email"
                     placeholder="Your Email"
                     className="w-full rounded-md 
                                bg-gray-100 dark:bg-gray-800 
                                border border-gray-300 dark:border-white/10 
                                px-4 py-3 placeholder-gray-500 
                                focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/60
                                transition-all"
                     required
                   />
                </div>
                <input
                   type="text"
                   name="subject"
                   placeholder="Subject"
                   className="w-full rounded-md 
                              bg-gray-100 dark:bg-gray-800 
                              border border-gray-300 dark:border-white/10 
                              px-4 py-3 placeholder-gray-500 
                              focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/60
                              transition-all"
                 />
                <textarea
                   rows="5"
                   name="message"
                   placeholder="Your Message"
                   className="w-full rounded-md 
                              bg-gray-100 dark:bg-gray-800 
                              border border-gray-300 dark:border-white/10 
                              px-4 py-3 placeholder-gray-500 
                              focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/60
                              transition-all"
                   required
                 />
                <button
                  type="submit"
                  disabled={formSubmitted} 
                  className="inline-flex items-center justify-center rounded-md 
                             bg-gray-900 text-white dark:bg-white dark:text-black 
                             font-semibold px-6 py-3 
                             hover:bg-gray-700 dark:hover:opacity-90 
                             transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formSubmitted ? "Message Sent!" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Parth Patidar. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
