"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useTransform } from "motion/react"

const INTERACTIVE = "a, button, input, textarea, select, label, [role='button'], [data-cursor='pointer']"
const IDLE_SIZE = 30

/**
 * Bracket-targeting cursor: a precise gold block caret follows the pointer,
 * while four corner brackets lag behind on springs and snap around whatever
 * interactive element is hovered — like a HUD acquiring a target.
 */
export default function DevCursor() {
  const [enabled, setEnabled] = useState(false)
  const [locked, setLocked] = useState(false)
  const [idle, setIdle] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Exact caret position — stiff springs so it feels precise
  const caretX = useSpring(0, { stiffness: 900, damping: 50, mass: 0.2 })
  const caretY = useSpring(0, { stiffness: 900, damping: 50, mass: 0.2 })

  // Bracket frame — softer springs so it glides and snaps
  const frameX = useSpring(0, { stiffness: 260, damping: 24, mass: 0.5 })
  const frameY = useSpring(0, { stiffness: 260, damping: 24, mass: 0.5 })
  const frameW = useSpring(IDLE_SIZE, { stiffness: 260, damping: 24, mass: 0.5 })
  const frameH = useSpring(IDLE_SIZE, { stiffness: 260, damping: 24, mass: 0.5 })

  const frameLeft = useTransform([frameX, frameW] as const, ([x, w]: number[]) => x - w / 2)
  const frameTop = useTransform([frameY, frameH] as const, ([y, h]: number[]) => y - h / 2)

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isCoarse || reduceMotion) return

    setEnabled(true)
    document.documentElement.classList.add("os-cursor-active")

    let target: HTMLElement | null = null

    const onMove = (e: MouseEvent) => {
      caretX.set(e.clientX)
      caretY.set(e.clientY)

      setIdle(false)
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setIdle(true), 1400)

      const el = e.target instanceof HTMLElement ? (e.target.closest(INTERACTIVE) as HTMLElement | null) : null
      target = el

      if (el) {
        const r = el.getBoundingClientRect()
        // Don't lock onto elements bigger than a card — it stops reading as a cursor
        if (r.width < 480 && r.height < 240) {
          frameX.set(r.left + r.width / 2)
          frameY.set(r.top + r.height / 2)
          frameW.set(r.width + 14)
          frameH.set(r.height + 14)
          setLocked(true)
          return
        }
      }
      frameX.set(e.clientX)
      frameY.set(e.clientY)
      frameW.set(IDLE_SIZE)
      frameH.set(IDLE_SIZE)
      setLocked(false)
    }

    // Keep the lock glued to the element while scrolling
    const onScroll = () => {
      if (!target) return
      const r = target.getBoundingClientRect()
      frameX.set(r.left + r.width / 2)
      frameY.set(r.top + r.height / 2)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
      document.documentElement.classList.remove("os-cursor-active")
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [caretX, caretY, frameX, frameY, frameW, frameH])

  if (!enabled) return null

  const corner = "absolute w-[9px] h-[9px] border-primary transition-colors duration-200"

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      {/* Block caret */}
      <motion.div
        style={{ x: caretX, y: caretY }}
        className={`absolute -ml-[4px] -mt-[7px] h-[14px] w-[8px] bg-primary phosphor ${idle ? "caret-blink" : ""}`}
      />
      {/* Targeting brackets */}
      <motion.div style={{ left: frameLeft, top: frameTop, width: frameW, height: frameH }} className="absolute">
        <span className={`${corner} left-0 top-0 border-l-2 border-t-2 ${locked ? "" : "opacity-60"}`} />
        <span className={`${corner} right-0 top-0 border-r-2 border-t-2 ${locked ? "" : "opacity-60"}`} />
        <span className={`${corner} left-0 bottom-0 border-l-2 border-b-2 ${locked ? "" : "opacity-60"}`} />
        <span className={`${corner} right-0 bottom-0 border-r-2 border-b-2 ${locked ? "" : "opacity-60"}`} />
      </motion.div>
    </div>
  )
}
