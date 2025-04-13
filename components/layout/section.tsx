"use client"

import type { SectionProps } from "@/types"
import { motion } from "framer-motion"
import { forwardRef } from "react"

export const Section = forwardRef<HTMLElement, SectionProps>(({ children, id, className = "", ...props }, ref) => {
  return (
    <section id={id} ref={ref} className={`container py-8 md:py-12 lg:py-24 ${className}`} {...props}>
      {children}
    </section>
  )
})

Section.displayName = "Section"

export const MotionSection = motion(Section)
