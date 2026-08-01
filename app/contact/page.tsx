import type { Metadata } from "next"
import OsNavbar from "../components/os/os-navbar"
import TerminalContact from "../components/os/terminal-contact"
import StatusFooter from "../components/os/status-footer"

export const metadata: Metadata = {
  title: "Contact Abrham Ababu | Full Stack Developer",
  description:
    "Contact Abrham Ababu for full stack development, Next.js, TypeScript, backend systems, SaaS products, and web application projects.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Abrham Ababu | Full Stack Developer",
    description: "Discuss a web application, SaaS platform, or software engineering project with Abrham Ababu.",
    url: "/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <OsNavbar />
      <main className="pt-12">
        <TerminalContact />
      </main>
      <StatusFooter />
    </div>
  )
}
