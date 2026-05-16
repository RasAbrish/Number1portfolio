"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isDown, setIsDown] = useState(false)

  const x = useSpring(0, { stiffness: 500, damping: 40, mass: 0.4 })
  const y = useSpring(0, { stiffness: 500, damping: 40, mass: 0.4 })
  const ringX = useSpring(0, { stiffness: 260, damping: 28, mass: 0.7 })
  const ringY = useSpring(0, { stiffness: 260, damping: 28, mass: 0.7 })

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
        "a, button, input, textarea, select, [role='button'], [data-cursor='pointer']",
      )
      setIsPointer(Boolean(interactive))
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
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
  }, [ringX, ringY, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2.5 w-2.5 rounded-full bg-primary mix-blend-screen md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isDown ? 0.7 : isPointer ? 1.25 : 1,
          opacity: isDown ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full border border-primary/50 bg-primary/5 md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isDown ? 26 : isPointer ? 38 : 30,
          height: isDown ? 26 : isPointer ? 38 : 30,
          opacity: isDown ? 0.55 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </>
  )
}

