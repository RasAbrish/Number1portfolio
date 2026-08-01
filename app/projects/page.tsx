import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import OsNavbar from "../components/os/os-navbar"
import StatusFooter from "../components/os/status-footer"
import { projects } from "@/lib/data"

export const metadata: Metadata = {
  title: "Projects by Abrham Ababu | Full Stack Portfolio",
  description:
    "Explore full stack projects by Abrham Ababu, including SaaS platforms, enterprise systems, recruitment products, corporate websites, and cloud applications.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects by Abrham Ababu | Full Stack Portfolio",
    description: "Selected production web applications and software projects by Abrham Ababu.",
    url: "/projects",
  },
}

export default function ProjectsPage() {
  const orderedProjects = [...projects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))

  return (
    <div className="min-h-screen bg-background">
      <OsNavbar />
      <main className="pb-24 pt-28">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs uppercase text-primary">$ ls ~/projects --all</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl tracking-tight md:text-7xl">
              Projects by Abrham Ababu
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              A selection of production software I have designed, developed, or helped lead across
              SaaS, enterprise operations, recruitment, identity verification, and business websites.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16" aria-label="Portfolio projects">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {orderedProjects.map((project) => (
              <article key={project.id} className="os-window flex h-full flex-col overflow-hidden">
                <div className="os-window-bar">
                  <span className="os-dot" />
                  <span className="os-dot" />
                  <span className="os-dot" />
                  <span className="ml-3 truncate font-mono text-[11px] text-muted-foreground">~/projects/{project.slug}</span>
                </div>
                {project.image && (
                  <div className="relative aspect-video overflow-hidden border-b border-border">
                    <Image src={project.image} alt={`${project.title} project by Abrham Ababu`} fill className="object-cover object-top" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-2xl">{project.title}</h2>
                      <p className="mt-1 font-mono text-[11px] uppercase text-muted-foreground">{project.company} / {project.role}</p>
                    </div>
                    {project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-border text-muted-foreground hover:border-primary hover:text-primary">
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{project.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => <li key={tag} className="rounded border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-[10px] uppercase text-primary">{tag}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 border-t border-border pt-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-3xl">Have a project in mind?</h2>
              <p className="mt-2 text-muted-foreground">Tell me what you are building and where you need help.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
              Contact me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <StatusFooter />
    </div>
  )
}
