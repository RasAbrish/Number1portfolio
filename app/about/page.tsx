import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Download, MapPin } from "lucide-react"
import OsNavbar from "../components/os/os-navbar"
import StatusFooter from "../components/os/status-footer"
import { milestones, person, stats } from "@/lib/data"

export const metadata: Metadata = {
  title: "About Abrham Ababu | Full Stack Developer",
  description:
    "Learn about Abrham Ababu, a full stack developer in Addis Ababa with experience in Next.js, TypeScript, NestJS, Laravel, ERP systems, and production web platforms.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Abrham Ababu | Full Stack Developer",
    description: "Background, experience, and professional journey of Abrham Ababu.",
    url: "/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <OsNavbar />
      <main className="pb-24 pt-28">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs uppercase text-primary">$ cat about-abrham.md</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl tracking-tight md:text-7xl">
              About Abrham Ababu
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              I am a full stack developer based in Addis Ababa, Ethiopia. I build reliable web products,
              enterprise systems, and customer-facing platforms with a focus on clean architecture,
              practical business value, and maintainable code.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded border border-border px-3 py-2">
                <MapPin className="h-3.5 w-3.5 text-primary" /> {person.location}
              </span>
              <span className="rounded border border-primary/30 bg-primary/10 px-3 py-2 text-primary">
                {person.availability}
              </span>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20" aria-labelledby="profile-heading">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h2 id="profile-heading" className="font-serif text-3xl md:text-4xl">Developer profile</h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
                {person.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <p>
                  I graduated from Hope University with a BSc in Computer Science and a CGPA of 3.85.
                  My work spans Next.js, React, TypeScript, Node.js, NestJS, Laravel, PostgreSQL,
                  cloud deployment, and ERP-focused software.
                </p>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card p-6">
                  <dt className="font-mono text-xs uppercase text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-2 font-serif text-4xl text-primary">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-y border-border bg-card/40 py-20" aria-labelledby="journey-heading">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <p className="font-mono text-xs uppercase text-primary">$ git log --career</p>
              <h2 id="journey-heading" className="mt-3 font-serif text-4xl md:text-5xl">Professional journey</h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {[...milestones].reverse().map((milestone) => (
                  <article key={milestone.hash} className="border-l border-primary/40 pl-5">
                    <p className="font-mono text-xs text-primary">{milestone.year} / {milestone.hash}</p>
                    <h3 className="mt-2 font-serif text-2xl">{milestone.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{milestone.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pt-20">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 border-b border-border pb-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-3xl">See what I have built</h2>
              <p className="mt-2 text-muted-foreground">Production products, platforms, and business systems.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                View projects <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={person.cv} download="Abrham-Ababu-CV.pdf" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm">
                <Download className="h-4 w-4" /> Download CV
              </a>
            </div>
          </div>
        </section>
      </main>
      <StatusFooter />
    </div>
  )
}
