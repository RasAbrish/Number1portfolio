"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  /** e.g. "3+", "10+", "$380M+", "98%" — leading/trailing text is preserved. */
  value: string
  durationMs?: number
  className?: string
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Lightweight count-up: animates the numeric part from zero the first time it
 * scrolls into view (and on fresh loads). Non-numeric prefixes/suffixes ("$",
 * "+", "M", "%") and decimal precision are preserved.
 */
export function CountUp({ value, durationMs = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const match = value.match(/^(\D*)([\d,]*\.?\d+)(.*)$/)
    if (!match) {
      setDisplay(value)
      return
    }
    const [, prefix, rawNum, suffix] = match
    const target = parseFloat(rawNum.replace(/,/g, ""))
    const decimals = rawNum.includes(".") ? rawNum.split(".")[1].length : 0
    const hasComma = rawNum.includes(",")
    const format = (n: number) => {
      const num = hasComma
        ? Number(n.toFixed(decimals)).toLocaleString("en-US", { maximumFractionDigits: decimals })
        : n.toFixed(decimals)
      return `${prefix}${num}${suffix}`
    }

    setDisplay(format(0))

    let raf = 0
    const animate = () => {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(format(target))
        return
      }
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / durationMs)
        setDisplay(format(target * easeOutCubic(p)))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const el = ref.current
    if (!el) {
      animate()
      return () => cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, durationMs])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
