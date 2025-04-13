"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { testimonials } from "@/data/testimonials"
import { SectionHeading } from "@/components/layout/section-heading"
import { MotionSection } from "@/components/layout/section"
import { useMobile } from "@/hooks/use-mobile"

interface TestimonialsSectionProps {
  inView: boolean
  reference: React.RefObject<HTMLElement>
}

export function TestimonialsSection({ inView, reference }: TestimonialsSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const isMobile = useMobile()

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <MotionSection
      id="testimonials"
      ref={reference}
      className="bg-muted/30"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center px-4">
        <SectionHeading title="Colleague" highlight="Testimonials" description="What people I work with say about me" />

        <div className="relative w-full max-w-4xl px-2 sm:px-4 py-6 sm:py-8">
          <div className="absolute top-0 left-4 sm:left-8 text-4xl sm:text-6xl opacity-20 text-cyan-500">
            <Quote />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-cyan-200 dark:border-cyan-800">
                  <Image
                    src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-lg sm:text-xl md:text-2xl font-medium mb-4 max-w-2xl px-4">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="text-center">
                  <p className="font-bold text-base sm:text-lg">{testimonials[currentTestimonial].name}</p>
                  <p className="text-muted-foreground text-sm sm:text-base">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6 sm:mt-8 space-x-3 sm:space-x-4">
            <Button
              variant="outline"
              size={isMobile ? "sm" : "icon"}
              onClick={prevTestimonial}
              className="rounded-full border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size={isMobile ? "sm" : "icon"}
              onClick={nextTestimonial}
              className="rounded-full border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                  currentTestimonial === index ? "bg-cyan-500" : "bg-cyan-200 dark:bg-cyan-800"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  )
}
