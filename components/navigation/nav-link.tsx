"use client"

import type { NavLinkProps } from "@/types"
import { motion } from "framer-motion"

export function NavLink({ href, active, onClick, children }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 transition-colors duration-200 ${
        active ? "text-cyan-500 font-medium" : "hover:text-primary"
      }`}
    >
      {children}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500"
          layoutId="activeSection"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  )
}

export function MobileNavLink({ href, active, onClick, children }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-left transition-colors duration-200 ${
        active ? "text-cyan-500 font-medium" : "hover:text-primary"
      }`}
    >
      {children}
      {active && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"
          layoutId="activeMobileSection"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  )
}
