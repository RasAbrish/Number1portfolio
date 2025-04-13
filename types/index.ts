import type React from "react"
// Define types for the entire application

export interface SkillIcon {
  [key: string]: string
}

export interface SkillIcons {
  frontend: SkillIcon
  backend: SkillIcon
  tools: SkillIcon
}

export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  avatar: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  githubUrl: string
  liveUrl: string
  images: string[]
  tags: string[]
}

export interface NavLinkProps {
  href: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

export interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  index: number
  inView: boolean
  id: string
}

export interface ContactCardProps {
  icon: React.ReactNode
  title: string
  value: string
  href: string
  index: number
  inView: boolean
}

export interface SectionProps {
  children: React.ReactNode
  id: string
  className?: string
  ref?: React.RefObject<HTMLElement>
}
