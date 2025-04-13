"use client"

import type React from "react"

import type { ContactCardProps } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react"
import { SectionHeading } from "@/components/layout/section-heading"
import { MotionSection } from "@/components/layout/section"
import { contactInfo } from "@/data/contact"

interface ContactSectionProps {
  inView: boolean
  reference: React.RefObject<HTMLElement>
}

export function ContactSection({ inView, reference }: ContactSectionProps) {
  return (
    <MotionSection
      id="contact"
      ref={reference}
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(6,182,212,0.05),transparent)]"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="mx-auto flex max-w-[64rem] flex-col items-center justify-center gap-4 text-center">
        <SectionHeading
          title="Get In"
          highlight="Touch"
          description="Feel free to reach out for collaborations or just a friendly hello"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <Card className="border-none shadow-xl bg-gradient-to-br from-background to-background/80 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
                  Send Me a Message
                </h3>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium flex items-center">
                        <span className="mr-2 text-cyan-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </span>
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 outline-none"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium flex items-center">
                        <span className="mr-2 text-cyan-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </span>
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 outline-none"
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium flex items-center">
                      <span className="mr-2 text-cyan-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="4" y1="9" x2="20" y2="9"></line>
                          <line x1="4" y1="15" x2="20" y2="15"></line>
                          <line x1="10" y1="3" x2="8" y2="21"></line>
                          <line x1="16" y1="3" x2="14" y2="21"></line>
                        </svg>
                      </span>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 outline-none"
                      placeholder="Subject of your message"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium flex items-center">
                      <span className="mr-2 text-cyan-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </span>
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 outline-none resize-none"
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full py-6 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full space-y-6"
          >
            <Card className="border-none shadow-xl bg-gradient-to-br from-background to-background/80 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <ContactCard
                    icon={<Mail className="h-5 w-5 text-cyan-500" />}
                    title="Email"
                    value={contactInfo.email}
                    href={`mailto:${contactInfo.email}`}
                    index={0}
                    inView={inView}
                  />
                  <ContactCard
                    icon={<Phone className="h-5 w-5 text-cyan-500" />}
                    title="Phone"
                    value={contactInfo.phone}
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    index={1}
                    inView={inView}
                  />
                  <ContactCard
                    icon={<MapPin className="h-5 w-5 text-cyan-500" />}
                    title="Location"
                    value={contactInfo.location}
                    href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.location)}`}
                    index={2}
                    inView={inView}
                  />
                  <ContactCard
                    icon={<Linkedin className="h-5 w-5 text-cyan-500" />}
                    title="LinkedIn"
                    value="Abrham Ababu"
                    href={contactInfo.social.linkedin}
                    index={3}
                    inView={inView}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-gradient-to-br from-background to-background/80 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
                  Social Media
                </h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  <SocialLink href={contactInfo.social.github} icon={<Github className="h-5 w-5 text-cyan-500" />} />
                  <SocialLink
                    href={contactInfo.social.linkedin}
                    icon={<Linkedin className="h-5 w-5 text-cyan-500" />}
                  />
                  <SocialLink href={`mailto:${contactInfo.email}`} icon={<Mail className="h-5 w-5 text-cyan-500" />} />
                  <SocialLink
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    icon={<Phone className="h-5 w-5 text-cyan-500" />}
                  />
                  <SocialLink
                    href={contactInfo.social.telegram}
                    icon={
                      <svg
                        className="h-5 w-5 text-cyan-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21.5 4.5L2.5 12.5L21.5 20.5L21.5 4.5Z"></path>
                        <path d="M12 12.5L21.5 4.5"></path>
                        <path d="M2.5 12.5L12 12.5"></path>
                        <path d="M12 12.5L17 19.5"></path>
                      </svg>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  )
}

function ContactCard({ icon, title, value, href, index, inView }: ContactCardProps) {
  return (
    <motion.div
      className="flex items-start"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 mr-4">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-lg">{title}</h4>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="text-muted-foreground hover:text-cyan-500 transition-colors duration-200"
        >
          {value}
        </a>
        {title === "Email" && <p className="text-sm text-muted-foreground mt-1">Send me an email anytime!</p>}
        {title === "Phone" && <p className="text-sm text-muted-foreground mt-1">Available Monday-Friday, 9AM-5PM</p>}
        {title === "Location" && <p className="text-sm text-muted-foreground mt-1">Bole Sub-City</p>}
        {title === "LinkedIn" && <p className="text-sm text-muted-foreground mt-1">Let's connect professionally</p>}
      </div>
    </motion.div>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 hover:from-cyan-500/20 hover:to-emerald-500/20 transition-all duration-300"
      whileHover={{ y: -5, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  )
}
