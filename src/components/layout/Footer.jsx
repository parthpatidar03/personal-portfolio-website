import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { SOCIAL_LINKS } from "../../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between md:px-10">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Parth Patidar. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            aria-label="Email"
            className="text-zinc-400 transition-colors hover:text-lime-300"
          >
            <EnvelopeSimple size={19} />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-400 transition-colors hover:text-lime-300"
          >
            <GithubLogo size={19} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-400 transition-colors hover:text-lime-300"
          >
            <LinkedinLogo size={19} />
          </a>
        </div>
      </div>
    </footer>
  );
}
