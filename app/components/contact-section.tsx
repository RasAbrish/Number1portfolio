"use client"

import { motion } from "framer-motion"
import ContactForm from "../contact-form"
import { Mail, MapPin } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="bg-background py-24">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">Contact</p>
          <h2 className="mb-5 text-4xl font-serif tracking-tight md:text-6xl">
            Get in <span className="text-primary italic">Touch</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Have a project in mind? Send me a message.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-4"
          >
            {[
              { icon: Mail, title: "Email", value: "abrhambest7@gmail.com", href: "mailto:abrhambest7@gmail.com" },
              { icon: MapPin, title: "Location", value: "Addis Ababa, Ethiopia", href: "#" },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={idx}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  className="group flex min-h-[92px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="rounded-2xl border border-border bg-card p-6 md:p-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
