"use client"

import { motion } from "framer-motion"
import ContactForm from "../contact-form"
import { Mail, MapPin, Clock } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 opacity-70">Contact</p>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-5">
            Get in <span className="text-primary italic">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's build something great together.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr,1.6fr] gap-10 items-start">
          {/* Left Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
            className="space-y-4"
          >
            {[
              { icon: Mail, title: "Email", value: "abrhambest7@gmail.com", href: "mailto:abrhambest7@gmail.com" },
              { icon: MapPin, title: "Location", value: "Addis Ababa, Ethiopia", href: "#" },
              { icon: Clock, title: "Availability", value: "Open to new opportunities", href: "#" },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={idx}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-5 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
                      {item.title}
                    </p>
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3, delay: 0.1 }}
            className="border border-border bg-card rounded-2xl p-8"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
