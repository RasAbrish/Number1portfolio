"use client"

import OsNavbar from "./components/os/os-navbar"
import TerminalHero from "./components/os/terminal-hero"
import AboutCode from "./components/os/about-code"
import GitJourney from "./components/os/git-journey"
import RepoProjects from "./components/os/repo-projects"
import DepSkills from "./components/os/dep-skills"
import ReviewTestimonials from "./components/os/review-testimonials"
import TerminalContact from "./components/os/terminal-contact"
import StatusFooter from "./components/os/status-footer"
import AiChat from "./components/os/ai-chat"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <OsNavbar />
      <TerminalHero />

      <div className="hairline-gold mx-auto max-w-3xl" />
      <AboutCode />

      <div className="hairline-gold mx-auto max-w-3xl" />
      <GitJourney />

      <div className="hairline-gold mx-auto max-w-3xl" />
      <RepoProjects />

      <DepSkills />
      <ReviewTestimonials />

      <div className="hairline-gold mx-auto max-w-3xl" />
      <TerminalContact />

      <StatusFooter />

      <AiChat />
    </div>
  )
}
