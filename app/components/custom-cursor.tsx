"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "motion/react"

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isDown, setIsDown] = useState(false)

  const x = useSpring(0, { stiffness: 420, damping: 30, mass: 0.35 })
  const y = useSpring(0, { stiffness: 420, damping: 30, mass: 0.35 })

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnabled(!isCoarse && !reduceMotion)

    if (isCoarse || reduceMotion) return

    const updatePointerState = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        setIsPointer(false)
        return
      }
      const interactive = target.closest(
        "a, button, input, textarea, select, label, [role='button'], [data-cursor='pointer']",
      )
      setIsPointer(Boolean(interactive))
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      updatePointerState(e.target)
    }

    const onDown = () => setIsDown(true)
    const onUp = () => setIsDown(false)
    const onLeave = () => setEnabled(false)
    const onEnter = () => setEnabled(true)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isDown ? 20 : isPointer ? 34 : 26,
          height: isDown ? 20 : isPointer ? 34 : 26,
          borderColor: isPointer ? "hsl(var(--primary) / 0.9)" : "hsl(var(--foreground) / 0.75)",
          backgroundColor: isPointer ? "hsl(var(--primary) / 0.1)" : "transparent",
          opacity: isDown ? 0.55 : 0.95,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <div className="h-full w-full rounded-full border" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isDown ? 0.75 : isPointer ? 1.15 : 1,
          opacity: isDown ? 0.85 : 1,
          color: isPointer ? "hsl(var(--primary))" : "hsl(var(--foreground))",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <div className="relative h-3.5 w-3.5">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current/85" />
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current/85" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
        </div>
      </motion.div>
    </>
  )
}
