import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import Reveal from "../common/Reveal";
import { SOCIAL_LINKS } from "../../data/content";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <Reveal className="mx-auto max-w-content px-6 text-center md:px-10">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Let&apos;s talk
        </h2>
        <p className="mx-auto mt-4 max-w-[50ch] text-zinc-400">
          Open to internships and interesting collaborations. I read every
          email that lands in my inbox.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-transform hover:-translate-y-0.5"
          >
            <EnvelopeSimple size={17} weight="bold" />
            Email me
          </a>
          <p className="font-mono text-sm text-zinc-500">{SOCIAL_LINKS.email}</p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-lime-300"
          >
            <GithubLogo size={18} />
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-lime-300"
          >
            <LinkedinLogo size={18} />
            LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  );
}
