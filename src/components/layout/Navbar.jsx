import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GithubLogo, LinkedinLogo, List, X } from "@phosphor-icons/react";
import { NAV_LINKS, RESUME_URL, SOCIAL_LINKS } from "../../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const sentinelRef = useRef(null);
  const isClickScrolling = useRef(false);
  const reduce = useReducedMotion();

  // Toggle the scrolled backdrop via a 1px sentinel instead of a
  // scroll listener, so this never runs on the scroll thread.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Scrollspy: highlight the nav link for the section in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href));
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    isClickScrolling.current = true;
    setActiveHref(href);
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 h-1 w-full" aria-hidden="true" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-zinc-950/85 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-content items-center justify-between px-6 md:px-10">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2.5 font-display text-sm font-semibold text-zinc-100"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 font-display text-xs font-bold text-zinc-950">
              PP
            </span>
            <span className="hidden sm:inline">Parth Patidar</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    activeHref === link.href
                      ? "text-zinc-950"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {activeHref === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-lime-400"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <GithubLogo size={20} weight="regular" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <LinkedinLogo size={20} weight="regular" />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-lime-400/60 hover:text-lime-300"
            >
              Resume
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-100 lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-white/10 bg-zinc-950 lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-6 py-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block rounded-xl px-4 py-3 text-base ${
                        activeHref === link.href
                          ? "bg-lime-400 text-zinc-950"
                          : "text-zinc-300"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 flex items-center gap-4 px-4">
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400">
                    <GithubLogo size={20} />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400">
                    <LinkedinLogo size={20} />
                  </a>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-100"
                  >
                    Resume
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
