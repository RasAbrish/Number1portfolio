"use client"

import type React from "react"

import Link from "next/link"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { contactInfo } from "@/data/contact"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 md:py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
                Abrham Ababu
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md text-sm md:text-base">
                A passionate developer focused on creating impactful digital experiences with modern web technologies.
              </p>
              <div className="flex space-x-3 md:space-x-4 mt-4">
                <SocialIcon
                  href={contactInfo.social.github}
                  icon={<Github className="h-4 w-4 md:h-5 md:w-5" />}
                  label="GitHub"
                />
                <SocialIcon
                  href={contactInfo.social.linkedin}
                  icon={<Linkedin className="h-4 w-4 md:h-5 md:w-5" />}
                  label="LinkedIn"
                />
                <SocialIcon
                  href={`mailto:${contactInfo.email}`}
                  icon={<Mail className="h-4 w-4 md:h-5 md:w-5" />}
                  label="Email"
                />
                <SocialIcon
                  href={contactInfo.social.telegram}
                  icon={
                    <svg
                      className="h-4 w-4 md:h-5 md:w-5"
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
                  label="Telegram"
                />
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-cyan-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="text-muted-foreground hover:text-cyan-500 transition-colors">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-muted-foreground hover:text-cyan-500 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-cyan-500 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/resume" className="text-muted-foreground hover:text-cyan-500 transition-colors">
                    Resume
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-center text-muted-foreground">
                  <Mail className="h-3 w-3 md:h-4 md:w-4 mr-2 text-cyan-500" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-cyan-500 transition-colors">
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2 text-cyan-500" />
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="hover:text-cyan-500 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-start text-muted-foreground">
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
                    className="h-3 w-3 md:h-4 md:w-4 mr-2 mt-1 text-cyan-500"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>
                    {contactInfo.location}
                    <br />
                    {contactInfo.locationDetails}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-0 text-center md:text-left">
            © {currentYear} Abrham Ababu. All rights reserved.
          </p>
          <div className="flex items-center text-xs md:text-sm text-muted-foreground text-center md:text-right">
            <span>You can reach me through any of the contact methods above</span>
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
              className="mx-1 text-cyan-500"
            >
              <path d="M12 19l9 2-9-18-9 18 9-2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface SocialIconProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialIcon({ href, icon, label }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-cyan-100 hover:text-cyan-600 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-400 transition-colors"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  )
}
