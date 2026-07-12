import Reveal from "../common/Reveal";

export default function About() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 lg:mx-0">
            <img
              src="/profile.jpg"
              alt="Parth Patidar"
              width={480}
              height={600}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            More than the resume
          </h2>
          <p className="mt-5 max-w-[58ch] text-zinc-400">
            I&apos;m Parth, and I build things people actually use: AI
            agents, SaaS products, customer-facing tools. I&apos;m
            actively looking for freelance work right now.
          </p>
          <p className="mt-4 max-w-[58ch] text-zinc-400">
            When I&apos;m not shipping for a client, I&apos;m contributing
            to open source or deep in a DSA sheet.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
