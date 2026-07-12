import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react";
import { RESUME_URL } from "../../data/content";
import MagneticButton from "../common/MagneticButton";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24"
    >
      {/* Ambient backdrop: subtle grid + accent glow, fixed depth cue */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute right-[-10%] top-1/4 h-[420px] w-[420px] rounded-full bg-lime-400/20 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
            Full-stack engineer.
            <br />
            AI systems builder.
          </h1>

          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-zinc-400 md:text-lg">
            Pre-final year at NIT Trichy, building production RAG pipelines,
            autonomous agents, and full-stack apps that ship.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({
                  behavior: reduce ? "auto" : "smooth",
                });
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition-transform"
            >
              View projects
              <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-lime-400/60 hover:text-lime-300"
            >
              <DownloadSimple size={16} weight="bold" />
              Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
            <img
              src="/avatar.png"
              alt="Parth Patidar"
              width={480}
              height={560}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-zinc-900/95 px-4 py-2 text-xs font-medium text-zinc-200 shadow-lg shadow-black/40 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            Open to internships
          </div>
        </motion.div>
      </div>
    </section>
  );
}
