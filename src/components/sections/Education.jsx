import Reveal from "../common/Reveal";
import { EDUCATION } from "../../data/content";

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Education
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <a
            href={EDUCATION.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-lime-400/30 sm:flex-row sm:items-center md:p-10"
          >
            <img
              src={EDUCATION.logo}
              alt={`${EDUCATION.institution} logo`}
              width={72}
              height={72}
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-2xl border border-white/10 bg-white object-contain p-2"
            />
            <div>
              <h3 className="font-display text-lg font-semibold text-zinc-50 md:text-xl">
                {EDUCATION.institution}
              </h3>
              <p className="mt-1 text-zinc-400">{EDUCATION.degree}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-zinc-500">
                <span>{EDUCATION.duration}</span>
                <span>
                  CGPA <span className="font-mono text-zinc-300">{EDUCATION.cgpa}</span>
                </span>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
