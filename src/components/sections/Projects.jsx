import { GithubLogo, ArrowUpRight, CalendarBlank } from "@phosphor-icons/react";
import Reveal from "../common/Reveal";
import { PROJECTS } from "../../data/content";

const initials = (title) =>
  title
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function ProjectLinks({ project }) {
  return (
    <div className="flex items-center gap-3">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-lime-400/50 hover:text-lime-300"
        >
          <GithubLogo size={16} />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live site`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-lime-400/50 hover:text-lime-300"
        >
          <ArrowUpRight size={16} />
        </a>
      )}
    </div>
  );
}

function FlagshipCard({ project }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-lime-400/20 bg-white/[0.02] p-8 md:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lime-400/20 blur-[100px]" />

      <div className="relative grid gap-8 lg:grid-cols-[auto_1fr]">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-lime-400 font-display text-2xl font-bold text-zinc-950">
          {initials(project.title)}
        </div>

        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-300">
                Flagship project
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-zinc-50 md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-500">{project.subtitle}</p>
            </div>
            <ProjectLinks project={project} />
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs text-zinc-500">
            <CalendarBlank size={14} />
            {project.date}
          </p>

          <p className="mt-4 max-w-[65ch] text-zinc-300">{project.description}</p>

          <ul className="mt-5 space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm text-zinc-400">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime-400" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-xs text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/30 font-display text-sm font-semibold text-zinc-200">
          {initials(project.title)}
        </div>
        <ProjectLinks project={project} />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-zinc-50">
        {project.title}
      </h3>
      <p className="text-sm text-zinc-500">{project.subtitle}</p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 font-mono text-[11px] text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const flagship = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <h2 className="max-w-[24ch] font-display text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Things I&apos;ve built
          </h2>
          <p className="mt-4 max-w-[60ch] text-zinc-400">
            A mix of AI infrastructure, full-stack products, and campus
            tools, each one solving a real problem I ran into.
          </p>
        </Reveal>

        {flagship && (
          <Reveal delay={0.1} className="mt-10">
            <FlagshipCard project={flagship} />
          </Reveal>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.title} delay={0.05 * i}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
