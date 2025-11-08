"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

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
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setIsPlaying(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsPlaying(false)
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">What People Say</h2>
        <p className="text-center text-muted-foreground mb-12">Testimonials from colleagues and clients</p>

        <div className="max-w-3xl mx-auto relative">
          {/* Main Testimonial Card */}
          <div className="relative" onMouseEnter={() => setIsPlaying(false)} onMouseLeave={() => setIsPlaying(true)}>
            <div
              className={`bg-background rounded-xl shadow-xl p-8 md:p-12 border border-muted transition-all duration-700 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-6" />

              {/* Content */}
              <div className="space-y-6">
                <blockquote className="text-lg md:text-xl italic text-foreground leading-relaxed">
                  "{testimonials[current].content}"
                </blockquote>

                {/* Author Info */}
                <div className="pt-6 border-t border-muted">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-2xl font-bold text-primary-foreground">
                      {testimonials[current].name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-foreground">{testimonials[current].name}</h4>
                      <p className="text-primary text-sm">{testimonials[current].role}</p>
                      <p className="text-muted-foreground text-xs">{testimonials[current].company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full hover:bg-muted transition-colors duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Progress Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index)
                    setIsPlaying(false)
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === current ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full hover:bg-muted transition-colors duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-6">
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-primary transition-all duration-200 ${
                  isPlaying ? "w-full animate-pulse" : "w-0"
                }`}
                style={{
                  animation: isPlaying ? "progress 6s linear infinite" : "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
