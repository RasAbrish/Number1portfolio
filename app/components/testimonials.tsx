"use client"

import { useRef, useState } from "react"
import { Quote } from "lucide-react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion"

const testimonials = [
  {
    name: "Mr. Biniyam",
    role: "Senior Developer",
    company: "Atlas Computer Technology",
    content:
      "Abrham is a very good developer. We have worked together where I was a team leader and he was a frontend developer. His attention to detail and ability to implement complex UI requirements is exceptional.",
  },
  {
    name: "Sebele Wengele",
    role: "Project Manager",
    company: "Gebyainc",
    content:
      "Abrham is a good, passionate developer who is competent at our company. He won 2nd place reward with the FuelFinder app. His dedication to excellence and innovative problem-solving made a real impact on our project.",
  },
  {
    name: "Samson Admasu",
    role: "Lead Senior Developer",
    company: "Unichash Team",
    content:
      "He has been good at collaborating and adapting to new technologies. He worked with us at Atlas Computer Technology for about 5 months as an internship and job, and he worked on the rent management system project. His technical skills and team-oriented approach are impressive.",
  },
]

export default function Testimonials() {
  const [isHovered, setIsHovered] = useState(false)
  const baseVelocity = -1 // px per frame
  const x = useMotionValue(0)

  // Duplicating a lot to avoid blank spaces
  const items = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials]

  useAnimationFrame((t, delta) => {
    // If hovered, slow down the velocity by 80%
    const velocity = isHovered ? baseVelocity * 0.15 : baseVelocity
    let moveBy = velocity * (delta / 16)
    
    // Reset position if it goes too far left
    // We assume each card + gap is roughly 350 + 24 = 374px
    // 3 items per original array = 1122px
    if (x.get() <= -1122) {
      x.set(0)
    } else {
      x.set(x.get() + moveBy)
    }
  })

  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden relative border-t border-border/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="container px-4 mx-auto relative z-10 mb-16">
        <h2 className="text-3xl md:text-5xl font-serif text-center tracking-tight mb-4">
          What People <span className="text-primary italic">Say</span>
        </h2>
        <p className="text-center text-muted-foreground text-lg">Trusted by industry professionals and colleagues</p>
      </div>

      <div className="relative flex w-full max-w-[100vw] overflow-hidden">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-6 px-3"
          style={{ x }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {items.map((testimonial, index) => (
            <div
              key={index}
              className="w-[350px] md:w-[450px] flex-shrink-0 bg-background/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border hover:border-primary/50 transition-colors group shadow-sm hover:shadow-md"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
              <blockquote className="text-base text-foreground/90 leading-relaxed mb-8 h-[120px] overflow-hidden text-ellipsis">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-foreground tracking-tight">{testimonial.name}</h4>
                  <p className="text-primary text-xs font-medium uppercase tracking-wider">{testimonial.role}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
